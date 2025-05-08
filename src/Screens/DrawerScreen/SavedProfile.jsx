import { View, Text, TouchableOpacity, FlatList, ScrollView, Image, SafeAreaView, StatusBar, ActivityIndicator, RefreshControl } from "react-native";
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
import { useSelector } from "react-redux";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SH, SF, SW } from "../../utils/Dimensions";
import { showMessage } from "react-native-flash-message";

const SavedProfile = ({ navigation }) => {
  const flatListRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("Biodata");
  const [savedProfiles, setSavedProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const MyprofileData = useSelector((state) => state.getBiodata);
  const partnerPreferences = MyprofileData?.Biodata?.partnerPreferences || {};
  const [refreshing, setRefreshing] = useState(false);
  const notifications = useSelector((state) => state.GetAllNotification.AllNotification);
  const notificationCount = notifications ? notifications.length : 0;
  const [deletingId, setDeletingId] = useState(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSavedProfiles();
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

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
    if (!_id || deletingId === _id) return;

    setDeletingId(_id);
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found. Please log in again.");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.delete(`${DELETE_SAVED_PROFILE}/${_id}`, { headers });

      if (response?.status === 200 && response?.data?.status === true) {
        showMessage({
          type: "success",
          message: "Success",
          description: "Saved profile deleted successfully!",
          icon: "success",
          duration: 5000,
        });
        setSavedProfiles(prev => prev.filter(p => p.saveProfile?._id !== _id));
        navigation.reset({
          index: 0,
          routes: [{ name: "SavedProfile" }],
        });
        fetchSavedProfiles();
      } else {
        throw new Error(response?.data?.message || "Something went wrong!");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching biodata:", errorMsg);

      showMessage({
        type: "danger",
        message: "Error",
        description: errorMsg || "Delete failed",
        icon: "danger",
        duration: 5000
      });

      const sessionExpiredMessages = [
        "User does not Exist....!Please login again",
        "Invalid token. Please login again",
        "Token has expired. Please login again"
      ];

      if (sessionExpiredMessages.includes(errorMsg)) {
        await AsyncStorage.removeItem("userToken");
        navigation.reset({
          index: 0,
          routes: [{ name: "AuthStack" }],
        });
      }
    } finally {
      setLoading(false);
      setDeletingId(null);
    }
  };

  const getFilteredData = () => {
    const validProfiles = savedProfiles.filter((item) => item?.saveProfile !== null) || {};

    if (["Biodata", "Pandit", "Jyotish", "Kathavachak", "Dharmshala", "Committee"].includes(activeCategory)) {
      const filteredProfiles = validProfiles.filter((item) => item?.profileType === activeCategory);
      return filteredProfiles.length > 0 ? filteredProfiles : null;
    } else {
      const filteredProfiles = validProfiles.filter((item) => item?.category === activeCategory);
      return filteredProfiles.length > 0 ? filteredProfiles : null;
    }
  };

  const renderItem = ({ item }) => {
    const { saveProfile, profileType } = item;

    return (
      <View style={styles.card}>
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
              <Image
                source={
                  saveProfile?.personalDetails?.closeUpPhoto && saveProfile?.personalDetails?.closeUpPhoto.startsWith("http")
                    ? { uri: saveProfile?.personalDetails?.closeUpPhoto }
                    : require("../../Images/NoImage.png")
                }
                style={styles.image}
              />
              <View style={styles.detailscontent}>
                <Text style={styles.name} numberOfLines={1}>
                  {saveProfile?.personalDetails?.fullname || "NA"}
                </Text>
                <Text style={styles.text} numberOfLines={1}>
                  City: {saveProfile?.personalDetails?.cityOrVillage || "NA"}
                </Text>
                <Text style={styles.text}>
                  Age:
                  {saveProfile?.personalDetails?.dob && !isNaN(new Date(saveProfile?.personalDetails?.dob).getTime())
                    ? ` ${new Date().getFullYear() - new Date(saveProfile?.personalDetails?.dob).getFullYear()} Years`
                    : " NA"}
                </Text>
                <Text style={styles.text} numberOfLines={1}>
                  Sub Caste: {saveProfile?.personalDetails?.subCaste || "NA"}
                </Text>
              </View>
            </>
          )}


          {["Pandit", "Jyotish", "Kathavachak"].includes(profileType) && (
            <>
              <Image
                source={
                  saveProfile?.profilePhoto && saveProfile.profilePhoto.startsWith("http")
                    ? { uri: saveProfile?.profilePhoto }
                    : require("../../Images/NoImage.png")
                }
                style={styles.image}
              />
              <View style={styles.detailscontent}>
                <Text style={styles.name} numberOfLines={1}>
                  {saveProfile?.fullName || "NA"}
                </Text>
                <Text style={styles.text} numberOfLines={1}>
                  City: {saveProfile?.city || "NA"}
                </Text>
                <Text style={styles.text}>
                  Experience: {saveProfile?.experience || "NA"}
                </Text>
                <Text style={styles.text} numberOfLines={1}>
                  Area: {saveProfile?.area || "NA"}
                </Text>
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
                <Text style={styles.name} numberOfLines={1}>{saveProfile?.dharmshalaName || "NA"}</Text>
                <Text style={styles.text} numberOfLines={1}>City: {saveProfile?.city || "NA"}</Text>
                <Text style={styles.text} numberOfLines={1}>Sub Caste: {saveProfile?.subCaste || "NA"}</Text>
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
                <Text style={styles.name} numberOfLines={1}>{saveProfile?.committeeTitle || "NA"}</Text>
                <Text style={styles.text} numberOfLines={1}>{saveProfile?.presidentName || "NA"}</Text>
                <Text style={styles.text} numberOfLines={1}>City: {saveProfile?.city || "NA"}</Text>
                <Text style={styles.text} numberOfLines={1}>Sub Caste: {saveProfile?.subCaste || "NA"}</Text>
              </View>
            </>
          )}
        </TouchableOpacity>
        <Text
          style={[styles.unsaveText, deletingId === saveProfile?._id && { opacity: 0.5 }]}
          onPress={() => {
            if (!deletingId) DeleteSaveProfile(saveProfile?._id);
          }}
        >
          {deletingId === saveProfile?._id ? "Removing..." : "Remove"}
        </Text>
      </View>
    );
  };

  {
    loading ? (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.theme_color} />
      </View>
    ) : null
  }

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View>
        <View style={Globalstyles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <MaterialIcons name={"arrow-back-ios-new"} size={25} color={Colors.theme_color} />
            </TouchableOpacity>
            <Text style={Globalstyles.headerText}>Saved</Text>
          </View>
          <View style={styles.righticons}>
            <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
              <AntDesign
                name="bells"
                size={25}
                color={Colors.theme_color}
              />
              {notificationCount > 0 && (
                <View
                  style={{
                    position: "absolute",
                    right: -5,
                    top: -5,
                    width: SW(16),
                    height: SW(16),
                    borderRadius: SW(16) / 2,
                    backgroundColor: "red",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: 'white', fontSize: SF(9), fontFamily: "Poppins-Bold" }}>
                    {notificationCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
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
            <FontAwesome
              name="user-circle"
              size={60}
              color={Colors.theme_color}
              style={{ marginBottom: SH(10) }}
            />
            <Text style={[styles.noDataText, { fontFamily: "POppins-Bold", fontSize: SF(16) }]}>
              No {activeCategory} profiles saved yet
            </Text>
            <Text style={{ color: 'gray', textAlign: 'center', marginTop: SH(5), paddingHorizontal: SW(20), fontFamily: "POppins-Medium" }}>
              Your saved profiles will appear here. You can easily revisit them anytime!
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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SavedProfile;

