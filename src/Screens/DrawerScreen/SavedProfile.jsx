import { View, Text, TouchableOpacity, FlatList, ScrollView, Image, SafeAreaView, StatusBar, ActivityIndicator, ToastAndroid } from "react-native";
import React, { useState, useRef, useCallback } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../StyleScreens/SavedProfileStyle";
import Colors from "../../utils/Colors";
import HeadingWithViewAll from "../../Components/HeadingWithViewAll";
import Globalstyles from "../../utils/GlobalCss";
import { DELETE_SAVED_PROFILE, GET_SAVED__PROFILES } from "../../utils/BaseUrl";
import { DrawerActions, useFocusEffect } from '@react-navigation/native';
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

const SavedProfile = ({ navigation }) => {
  const flatListRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("Biodata");
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const MyprofileData = useSelector((state) => state.getBiodata);
  const partnerPreferences = MyprofileData?.Biodata?.partnerPreferences || null;

  useFocusEffect(
    useCallback(() => {
      fetchSavedProfiles();
    }, [])
  );
  
  const fetchSavedProfiles = async () => {
    try {
      setLoading(true);
      setSavedProfiles([]);
  
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found");
      }
  
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.get(GET_SAVED__PROFILES, { headers });
  
      console.log("Fetched saved profiles:", JSON.stringify(response.data?.savedProfiles));

      setSavedProfiles(response.data?.savedProfiles || []);
  
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      }, 100);
    } catch (error) {
      console.error("❌ Error fetching saved profiles:", error?.response?.data || error);
    } finally {
      setLoading(false);
    }
  };
  
  const DeleteSaveProfile = async (_id) => {
    if (!_id) {
      console.warn("Invalid ID: Cannot delete profile without a valid _id");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Profile ID is missing!",
      });
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        throw new Error("No token found. Please log in again.");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      console.log("Deleting saved profile with ID:", _id);
      console.log("Headers:", headers);

      const response = await axios.delete(`${DELETE_SAVED_PROFILE}/${_id}`, { headers });
      console.log("response", JSON.stringify(response.data))

      if (response.status === 200 && response.data.status === true) {
        console.log("Profile deleted successfully:", response.data);

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Saved profile deleted successfully!",
        });

        // ✅ Refresh saved profiles after deletion
        fetchSavedProfiles();
      } else {
        throw new Error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error deleting profile:", error?.response?.data || error.message);

      let errorMessage = "Failed to delete profile. Please try again!";
      if (error.response && error.response.status === 400) {
        errorMessage = error.response.data?.message || "Invalid request!";
      }

      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const getFilteredData = () => {
    if (["Biodata", "Pandit", "Jyotish", "Kathavachak", "Dharmshala", "Committee"].includes(activeCategory)) {
      const filteredProfiles = savedProfiles.filter((item) => item.profileType === activeCategory);
      return filteredProfiles.length > 0 ? filteredProfiles : null;
    } else {
      const filteredProfiles = savedProfiles.filter((item) => item.category === activeCategory);
      return filteredProfiles.length > 0 ? filteredProfiles : null;
    }
  };

  const renderItem = ({ item }) => {
    const { saveProfile, profileType } = item;

    return (
      <View
        style={styles.card}
      // onPress={() => navigation.navigate("MatrimonyPeopleProfile", { userDetails: saveProfile, userId: saveProfile.userId })}
      >
        <TouchableOpacity style={styles.detailsContainer}
          onPress={() => {
            if (profileType === "Biodata") {
              if (!partnerPreferences) {
                  navigation.navigate("ShortMatrimonialProfile", {
                      userDetails: saveProfile,
                      isSaved: true
                  });
              } else {
                  navigation.navigate("MatrimonyPeopleProfile", {
                      userDetails: saveProfile,
                      userId: saveProfile?.userId,
                      isSaved: true
                  });
              }
          }
           else if (profileType === "Pandit") {
              navigation.navigate("PanditDetailPage", { pandit_id: saveProfile._id, isSaved: true });
            } else if (profileType === "Jyotish") {
              navigation.navigate("JyotishDetailsPage", { jyotish_id: saveProfile._id, isSaved: true });
            } else if (profileType === "Kathavachak") {
              navigation.navigate("KathavachakDetailsPage", { kathavachak_id: saveProfile._id, isSaved: true });
            } else if (profileType === "Dharmshala") {
              navigation.navigate("DharamsalaDetail", { DharamsalaData: saveProfile, isSaved: true, _id: saveProfile._id });
            }
          }}>
          {profileType === "Biodata" && (
            <>
              <Image source={{ uri: saveProfile.personalDetails?.closeUpPhoto || "https://via.placeholder.com/150" }} style={styles.image} />
              <View style={styles.detailscontent}>
                <Text style={styles.name} numberOfLines={1}>{saveProfile.personalDetails?.fullname || "N/A"}</Text>
                <Text style={styles.text} numberOfLines={1} >City: {saveProfile.personalDetails?.cityOrVillage || "N/A"}</Text>
                <Text style={styles.text} >Age: {saveProfile.personalDetails?.dob ? new Date().getFullYear() - new Date(saveProfile.personalDetails.dob).getFullYear() : "N/A"} Years</Text>
                {/* <Text style={styles.text}>{saveProfile.personalDetails?.maritalStatus || "N/A"}</Text> */}
                <Text style={styles.text} numberOfLines={1}>Sub Caste: {saveProfile.personalDetails?.subCaste || "N/A"}</Text>
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
                <Text style={styles.name} numberOfLines={1}>{saveProfile?.fullName || "N/A"}</Text>
                <Text style={styles.text} numberOfLines={1}>City: {saveProfile?.city || "N/A"}</Text>
                {saveProfile?.experience && <Text style={styles.text}>Experience: {saveProfile?.experience}</Text>}
                {/* <Text style={styles.text}>Experience: {saveProfile?.experience || "N/A"} years</Text> */}
                {/* <Text style={styles.text}>Sub Caste: {saveProfile.subCaste || "N/A"}</Text> */}
                {saveProfile?.area && <Text style={styles.text} numberOfLines={1}>Area: {saveProfile?.area}</Text>}
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
                <Text style={styles.name} numberOfLines={1}>{saveProfile?.dharmshalaName || "N/A"}</Text>
                <Text style={styles.text} numberOfLines={1}>City: {saveProfile?.city || "N/A"}</Text>
                <Text style={styles.text} numberOfLines={1}>Sub Caste: {saveProfile?.subCaste || "N/A"}</Text>
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
                <Text style={styles.name} numberOfLines={1}>{saveProfile?.committeeTitle || "N/A"}</Text>
                <Text style={styles.text} numberOfLines={1}>{saveProfile?.presidentName || "N/A"}</Text>
                <Text style={styles.text} numberOfLines={1}>City: {saveProfile?.city || "N/A"}</Text>
                <Text style={styles.text} numberOfLines={1}>Sub Caste: {saveProfile?.subCaste || "N/A"}</Text>
              </View>
            </>
          )}
        </TouchableOpacity>
        <Text style={styles.unsaveText} onPress={() => DeleteSaveProfile(saveProfile?._id)}>Remove</Text>
      </View>
    );
  };

  {loading ? (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color={Colors.theme_color} />
    </View>
  ) : null}
  


  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View>
        <View style={Globalstyles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity  onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
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
      <Toast />
    </SafeAreaView>
  );
};

export default SavedProfile;

