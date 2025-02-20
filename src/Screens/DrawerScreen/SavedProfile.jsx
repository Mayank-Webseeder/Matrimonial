import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView, Image, SafeAreaView, StatusBar, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
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
      console.log("response.data?.savedProfiles", response.data?.savedProfiles)
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
    if (activeCategory === "Biodata") {
      return savedProfiles.filter((item) => item.profileType === "Biodata");
    } else {
      return SavedProfileData.filter((item) => item.category === activeCategory);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("MatrimonyPeopleProfile", { userDetails: item.saveProfile, userId: item.saveProfile.userId })}>
        <View style={styles.detailsContainer}>
          <Image
            style={styles.image}
            source={
              activeCategory === "Biodata"
                ? { uri: item.saveProfile?.personalDetails?.bestPhoto || "https://via.placeholder.com/150" }
                : item.image
            }
          />
          <Text style={styles.name}>
            {activeCategory === "Biodata" ? item.saveProfile.personalDetails.fullname : item.name || "N/A"}
          </Text>

          <Text style={styles.text}>
            City: {activeCategory === "Biodata" ? item.saveProfile.personalDetails.currentCity : item.city || "N/A"}
          </Text>

          {activeCategory === "Biodata" ? (
            <>
              <View style={styles.row2}>
                <Text style={styles.text}>
                  Age: {new Date().getFullYear() - new Date(item.saveProfile.personalDetails.dob).getFullYear()} /
                </Text>
                <Text style={styles.text}>Height: {item.saveProfile.personalDetails.heightFeet}'</Text>
              </View>
              <Text style={styles.text}>{item.saveProfile.personalDetails.subCaste}</Text>
            </>
          ) : (
            <>
              {item.area && <Text style={styles.text}>Area: {item.area}</Text>}
              {item.contact && <Text style={styles.text}>Contact: {item.contact}</Text>}
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
            <TouchableOpacity onPress={() => navigation.navigate("Tabs")}>
              <MaterialIcons name={"arrow-back-ios-new"} size={25} color={Colors.theme_color} />
            </TouchableOpacity>
            <Text style={Globalstyles.headerText}>Saved</Text>
          </View>
          <View style={styles.righticons}>
            <AntDesign name={"search1"} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} />
            <AntDesign name={"bells"} size={25} color={Colors.theme_color} onPress={() => navigation.navigate("Notification")} />
          </View>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.tabContainer}>
            {["Biodata", "Pandit", "Dharmshala", "Committee"].map((category, index) => (
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

        {loading && activeCategory === "Biodata" ? (
          <ActivityIndicator size="large" color={Colors.theme_color} style={{ marginTop: 20 }} />
        ) : getFilteredData().length === 0 ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>
              {activeCategory === "Biodata" ? "No Biodata profiles saved yet" : "No profiles found"}
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
