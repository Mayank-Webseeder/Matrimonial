import { View, Text, TouchableOpacity, FlatList, ScrollView, Image, SafeAreaView, StatusBar, ActivityIndicator } from "react-native";
import React, { useState, useRef, useCallback } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../StyleScreens/SavedProfileStyle";
import Colors from "../../utils/Colors";
import HeadingWithViewAll from "../../Components/HeadingWithViewAll";
import Globalstyles from "../../utils/GlobalCss";
import { SavedProfileData } from "../../DummyData/DummyData";
import { GET_SAVED__PROFILES } from "../../utils/BaseUrl";
import { useFocusEffect } from '@react-navigation/native';

const SavedProfile = ({ navigation }) => {
  const flatListRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("Biodata");
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      fetchSavedProfiles();
    }, []));

  const fetchSavedProfiles = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found");
      }

      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(GET_SAVED__PROFILES, { headers });
      console.log("response.data?.savedProfiles", JSON.stringify(response.data?.savedProfiles))
      setSavedProfiles(response.data?.savedProfiles || []);
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 100);

    } catch (error) {
      console.error("Error fetching saved profiles:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredData = () => {
    if (["Biodata", "Pandit", "Jyotish", "Kathavachak", "Dharmshala", "Committee"].includes(activeCategory)) {
      const filteredProfiles = savedProfiles.filter((item) => item.profileType === activeCategory);
      return filteredProfiles.length > 0 ? filteredProfiles : null; // Return null if no profiles found
    } else {
      const filteredProfiles = SavedProfileData.filter((item) => item.category === activeCategory);
      return filteredProfiles.length > 0 ? filteredProfiles : null; // Return null if no profiles found
    }
  };

  const renderItem = ({ item }) => {
    const { saveProfile, profileType } = item;

    return (
      <TouchableOpacity
        style={styles.card}
      // onPress={() => navigation.navigate("MatrimonyPeopleProfile", { userDetails: saveProfile, userId: saveProfile.userId })}
      >
        <View style={styles.detailsContainer}>
          {profileType === "Biodata" && (
            <>
              <Image source={{ uri: saveProfile.personalDetails?.closeUpPhoto || "https://via.placeholder.com/150" }} style={styles.image} />
              <View style={styles.detailscontent}>
                <Text style={styles.name}>{saveProfile.personalDetails?.fullname || "N/A"}</Text>
                <Text style={styles.text}>City: {saveProfile.personalDetails?.cityOrVillage || "N/A"}</Text>
                <Text style={styles.text}>Age: {saveProfile.personalDetails?.dob ? new Date().getFullYear() - new Date(saveProfile.personalDetails.dob).getFullYear() : "N/A"} Years</Text>
                <Text style={styles.text}>Marital Status: {saveProfile.personalDetails?.maritalStatus || "N/A"}</Text>
                <Text style={styles.text}>Sub Caste: {saveProfile.personalDetails?.subCaste || "N/A"}</Text>
              </View>
            </>
          )}

          {["Pandit", "Jyotish", "Kathavachak"].includes(profileType) && (
            <>
              <Image
                source={saveProfile.profilePhoto ? { uri: saveProfile.profilePhoto } : require('../../Images/NoImage.png')}
                style={styles.image}
              />
              <View style={styles.detailscontent}>
                <Text style={styles.name}>{saveProfile.fullName || "N/A"}</Text>
                <Text style={styles.text}>City: {saveProfile.city || "N/A"}</Text>
                <Text style={styles.text}>Experience: {saveProfile.experience || "N/A"} years</Text>
                <Text style={styles.text}>Sub Caste: {saveProfile.subCaste || "N/A"}</Text>
                <Text style={styles.text}>Area: {saveProfile.area || "N/A"}</Text>
              </View>
            </>
          )}

          {profileType === "Dharmshala" && (
            <>
              <Image
                source={{ uri: saveProfile?.images?.[0] || "https://via.placeholder.com/150" }}
                style={styles.image}
              />
              <View style={styles.detailscontent}>
                <Text style={styles.name}>{saveProfile?.dharmshalaName || "N/A"}</Text>
                <Text style={styles.text}>City: {saveProfile?.city || "N/A"}</Text>
                <Text style={styles.text}>Sub Caste: {saveProfile?.subCaste || "N/A"}</Text>
              </View>
            </>
          )}

          {profileType === "Committee" && (
            <>
              <Image
                source={{ uri: saveProfile?.photoUrl || "https://via.placeholder.com/150" }}
                style={styles.image}
              />
              <View style={styles.detailscontent}>
                <Text style={styles.name}>{saveProfile?.committeeTitle || "N/A"}</Text>
                <Text style={styles.text}>City: {saveProfile?.city || "N/A"}</Text>
                <Text style={styles.text}>Sub Caste: {saveProfile?.subCaste || "N/A"}</Text>
              </View>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View>
        <View style={Globalstyles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name={"arrow-back-ios-new"} size={25} color={Colors.theme_color} />
            </TouchableOpacity>
            <Text style={Globalstyles.headerText}>Saved</Text>
          </View>
          <View style={styles.righticons}>
            {/* <AntDesign name={"search1"} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} /> */}
            <AntDesign name={"bells"} size={25} color={Colors.theme_color} onPress={() => navigation.navigate("Notification")} />
          </View>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.tabContainer}>
            {["Biodata", "Pandit", "Jyotish", "Kathavachak", "Dharmshala", "Committee"].map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.tabButton, activeCategory === category && styles.activeTab]}
                onPress={() => {
                  setActiveCategory(category);
                  setTimeout(() => {
                    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
                  }, 100);
                }}
              >
                <Text style={[styles.tabText, activeCategory === category && styles.activeTabText]}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <HeadingWithViewAll heading={`${activeCategory} SAVED PROFILES`} />

        {loading && ["Biodata", "Pandit", "Jyotish", "Kathavachak", "Dharmshala", "Committee"].includes(activeCategory) ? (
          <ActivityIndicator size="large" color={Colors.theme_color} style={{ marginTop: 20 }} />
        ) : getFilteredData() === null ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>
              {`No ${activeCategory} profiles saved yet`}
            </Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={getFilteredData()}
            renderItem={renderItem}
            keyExtractor={(item) => (item.id ? item.id.toString() : item._id.toString())}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.ProfileContainer}
            showsVerticalScrollIndicator={false}
          />
        )}

      </View>

    </SafeAreaView>
  );
};

export default SavedProfile;
