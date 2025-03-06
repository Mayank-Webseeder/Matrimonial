import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Linking, ActivityIndicator, Share } from 'react-native';
import Swiper from 'react-native-swiper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/LocationStyle';
import Globalstyles from '../../utils/GlobalCss';
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import axios from 'axios';
import { MATCHED_PROFILE, SAVED_PROFILES, SEND_REQUEST, SHARED_PROFILES } from '../../utils/BaseUrl';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import ImageViewing from 'react-native-image-viewing';
import { SH, SW } from '../../utils/Dimensions';


const MatrimonyPeopleProfile = ({ navigation }) => {
  const route = useRoute();
  const { userDetails, details, details_userId, userId, isSaved } = route.params || {};
  console.log("userDetails", userDetails);
  const User_Id = userDetails?.userId || details_userId;
  console.log("userId", isSaved);
  const _id = userDetails?._id;
  console.log("_id", _id);
  const personalDetails = details?.personalDetails || userDetails?.personalDetails || {};
  const partnerPreferences = details?.partnerPreferences || userDetails?.partnerPreferences || {};
  const [profileData, setProfileData] = useState([]);
  const MyprofileData = useSelector((state) => state.getBiodata);
  const [isImageVisible, setImageVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  // Available images ko filter karo jo null na ho
  const images = [
    personalDetails?.closeUpPhoto,
    personalDetails?.fullPhoto,
    personalDetails?.bestPhoto,
  ].filter(Boolean); // Null values hata do

  const openImageViewer = (index) => {
    setImageIndex(index);
    setImageVisible(true);
  };

  // console.log("MyprofileData", MyprofileData);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Function to fetch profile details

  const fetchUserProfile = async () => {
    if (!User_Id) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User ID not found!",
      });
      return;
    }

    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      Toast.show({
        type: "error",
        text1: "Authentication Error",
        text2: "No token found. Please log in again.",
      });
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    try {
      const response = await axios.get(`${MATCHED_PROFILE}/${User_Id}`, { headers });
      console.log("matched profile data ", JSON.stringify(response.data))
      if (response.data.status === "success") {
        setProfileData(response.data);
      } else {
        Toast.show({
          type: "error",
          text1: "No Profile Found",
          text2: response.data.message || "Something went wrong!",
        });
      }
    } catch (error) {
      // console.error("Error fetching profile:", error);

      if (error.response && error.response.status === 404) {
        Toast.show({
          type: "error",
          text1: "Please set your biodata first.",
          text2: "If You want to Match Your Profile",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.response?.data?.message || "Something went wrong!",
        });
      }
    }
  };

  const sendInterestRequest = async () => {
    if (!User_Id) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User ID not found!",
      });
      return;
    }

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${SEND_REQUEST}/${User_Id}`, {}, { headers });

      console.log("Response Data:", JSON.stringify(response?.data));

      if (response?.data?.message) {
        Toast.show({
          type: "success",
          text1: "Interest Sent",
          text2: response.data.message,
          position: "top",
          visibilityTime: 3000,
          textStyle: { fontSize: 14, color: "green" },
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.data.message || "Something went wrong!",
        });
      }
    } catch (error) {
      console.error(
        "API Error:",
        error?.response ? JSON.stringify(error.response.data) : error.message
      );
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Failed to send interest!",
      });
    }
  };

  const savedProfiles = async () => {
    if (!_id) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User ID not found!",
      });
      return;
    }

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `${SAVED_PROFILES}/${_id}`,
        {},
        { headers }
      );

      console.log("Response Data:", JSON.stringify(response?.data));

      if (response?.data?.message) {
        Toast.show({
          type: "success",
          text2: response.data.message,
          position: "top",
          visibilityTime: 3000,
          textStyle: { fontSize: 14, color: "green" },
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.data.message || "Something went wrong!",
        });
      }
    } catch (error) {
      console.error(
        "API Error:",
        error?.response ? JSON.stringify(error.response.data) : error.message
      );
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Failed to send interest!",
      });
    }
  };

  const shareProfiles = async () => {
    if (!userId) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User ID not found!",
      });
      return;
    }

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      console.log("headers", headers)

      const response = await axios.get(`${SHARED_PROFILES}/${userId}`, { headers });

      console.log("Response Data:", JSON.stringify(response?.data));

      const shareableUrl = response?.data?.shareableLink;

      if (shareableUrl) {
        await Share.share({
          message: `Check out this profile: ${shareableUrl}`,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "No shareable link found!",
        });
      }
    } catch (error) {
      console.error(
        "API Error:",
        error?.response ? JSON.stringify(error.response.data) : error.message
      );
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Failed to share profile!",
      });
    }
  };

  // Map API comparisonResults to UI labels
  const comparisonResults = profileData?.comparisonResults || {};
  const totalCriteria = Object.keys(comparisonResults).length;
  const matchedCount = Object.values(comparisonResults).filter(value => value).length;
  const matchPercentage = totalCriteria > 0 ? Math.round((matchedCount / totalCriteria) * 100) : 0;

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = moment(dob);
    const currentDate = moment();
    return currentDate.diff(birthDate, "years");
  };

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity
            // onPress={() => navigation.goBack()}
            onPress={() => navigation.pop()}
          >
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>{personalDetails?.fullname}</Text>
        </View>
        <View style={styles.righticons}>
          <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => { navigation.navigate('Notification') }} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ alignItems: "center" }}>
      {/* First Image Display */}
      {images.length > 0 && (
        <TouchableOpacity onPress={() => openImageViewer(0)}>
          <Image source={{ uri: images[0] }} style={styles.image} />
        </TouchableOpacity>
      )}

      {/* Image Viewer Modal */}
      <ImageViewing
        images={images.map((img) => ({ uri: img }))}
        imageIndex={imageIndex}
        visible={isImageVisible}
        onRequestClose={() => setImageVisible(false)}
        onImageIndexChange={(index) => setImageIndex(index)}
        FooterComponent={() => (
          <View style={{ position: "absolute", bottom:SH(20), alignSelf: "center", flexDirection: "row" }}>
            {images.map((_, index) => (
              <View
                key={index}
                style={{
                  width:SH(8),
                  height:SH(8),
                  borderRadius: 4,
                  marginHorizontal:SW(5),
                  backgroundColor: imageIndex === index ? "white" : "gray",
                }}
              />
            ))}
          </View>
        )}
      />
    </View>
        {(userDetails?.verified || details?.verified) && (
          <View style={styles.verifiedContainer}>
            <Image
              source={require("../../Images/verified.png")}
              style={styles.verifiedBadge}
            />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        )}

        {/* Profile Info Section */}
        <View style={styles.flexContainer}>
          <View style={styles.flex}>
            {/* <Text style={styles.Idtext}>ID NO. :- {user?._id}</Text> */}
            <Text style={styles.Idtext}>ID NO. :- {userDetails?.bioDataId || details?.bioDataId}</Text>
            <Text style={styles.toptext}>{matchPercentage}% Compatible according to your preference</Text>
          </View>
          <View style={styles.sharecontainer}>
            <TouchableOpacity style={styles.iconContainer} onPress={savedProfiles}>
              <FontAwesome
                name={isSaved ? "bookmark" : "bookmark-o"}
                size={19}
                color={Colors.dark}
              />
              <Text style={styles.iconText}>{isSaved ? "Saved" : "Save"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={shareProfiles}>
              <Feather name="send" size={19} color={Colors.dark} />
              <Text style={styles.iconText}>Share</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.interestedButton} onPress={sendInterestRequest}>
              <Text style={styles.buttonText}>Interested</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={() => Linking.openURL('tel:' + personalDetails?.mobileNo)}>
              <MaterialIcons name="call" size={19} color={Colors.dark} />
              <Text style={styles.iconText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ReportPage', { profileId: _id })}>
              <MaterialIcons name="error-outline" size={20} color={Colors.dark} />
              <Text style={styles.iconText}>Report</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Personal Details Section */}
        <View style={styles.flexContainer1}>
          {/* Left Container */}
          <View style={styles.leftContainer}>
            {/* Fullname at the top */}
            <Text style={styles.HeadingText}>{personalDetails?.fullname}</Text>

            {/* Other details */}
            <Text style={styles.text}>{calculateAge(personalDetails.dob)} Yrs, {personalDetails?.heightFeet} </Text>
            {personalDetails?.subCaste && <Text style={styles.text}>{personalDetails?.subCaste}</Text>}
            {personalDetails?.maritalStatus && <Text style={styles.text}>{personalDetails?.maritalStatus}</Text>}
            {personalDetails?.manglikStatus && <Text style={styles.text}>{personalDetails?.manglikStatus}</Text>}
            {personalDetails?.disabilities && <Text style={styles.text}>Disability: {personalDetails?.disabilities}</Text>}
            {/* {personalDetails?.profileCreatedBy && <Text style={styles.text}>Profile Created By: {personalDetails?.profileCreatedBy}</Text>} */}
          </View>

          {/* Right Container */}
          <View style={styles.rightContainer}>
            {/* Right-side details */}
            {personalDetails?.currentCity && <Text style={styles.text}>{personalDetails?.currentCity}</Text>}
            {personalDetails?.occupation && <Text style={styles.text}>{personalDetails?.occupation}</Text>}
            {personalDetails?.annualIncome && <Text style={styles.text}>{personalDetails?.annualIncome} INR </Text>}
            {personalDetails?.qualification && <Text style={styles.text}>{personalDetails?.qualification}</Text>}
          </View>
        </View>

        {/* Horoscope Section */}
        {personalDetails?.dob && (
          <View style={styles.flexContainer1}>
            <View>
              <Text style={styles.HeadingText}>Horoscope</Text>
              <Text style={styles.text}>DOB {moment(personalDetails.dob).format("DD-MM-YYYY")} / Time: {personalDetails?.timeOfBirth}</Text>
              {personalDetails?.placeofbirth && <Text style={styles.text}>Place of Birth: {personalDetails?.placeofbirth}</Text>}

              <View style={styles.flexContainer2}>
                {personalDetails?.nadi && <Text style={styles.text}>Nadi: {personalDetails?.nadi}</Text>}
                {personalDetails?.gotraSelf && <Text style={styles.text}>Gotra (Self): {personalDetails?.gotraSelf}</Text>}
              </View>

              <View style={styles.flexContainer2}>
                {personalDetails?.manglikStatus && <Text style={styles.text}>{personalDetails?.manglikStatus}</Text>}
                {personalDetails?.gotraMother && <Text style={styles.text}>Gotra (Mother): {personalDetails?.gotraMother}</Text>}
              </View>
            </View>
          </View>
        )}

        {/* About Me Section */}
        {personalDetails?.aboutMe && (
          <View style={styles.flexContainer1}>
            <View>
              <Text style={styles.HeadingText}>About Me</Text>
              <Text style={styles.text}>{personalDetails?.aboutMe}</Text>
              <View style={styles.flexContainer2}>
                {personalDetails?.complexion && <Text style={styles.text}>Completion: {personalDetails?.complexion}</Text>}
                {personalDetails?.weight && <Text style={styles.text}>Weight: {personalDetails?.weight} kg </Text>}
              </View>
              <View style={styles.flexContainer2}>
                {personalDetails?.currentCity && <Text style={styles.text}>Currently in: {personalDetails?.currentCity}</Text>}
                {personalDetails?.livingStatus && <Text style={styles.text}>Living with family: {personalDetails?.livingStatus}</Text>}
              </View>
            </View>
          </View>
        )}

        {/* Family Section */}
        {personalDetails?.fatherName && (
          <View style={styles.flexContainer1}>
            <View>
              <Text style={styles.HeadingText}>Family Section</Text>
              {personalDetails?.fatherName && <Text style={styles.text}>Father’s Name: {personalDetails.fatherName}</Text>}
              {personalDetails?.fatherOccupation && <Text style={styles.text}>Father’s Occupation: {personalDetails.fatherOccupation}</Text>}
              {personalDetails?.motherName && <Text style={styles.text}>Mother’s Name: {personalDetails.motherName}</Text>}
              {personalDetails?.fatherIncomeAnnually && <Text style={styles.text}>Family Income: {personalDetails.fatherIncomeAnnually}</Text>}
              {personalDetails?.familyType && <Text style={styles.text}>Family Type: {personalDetails.familyType}</Text>}
              <Text style={styles.HeadingText}>About My family</Text>
              {personalDetails?.otherFamilyMemberInfo && <Text style={styles.text}>{personalDetails.otherFamilyMemberInfo}</Text>}
            </View>
          </View>
        )}

        {/* Contact Section */}
        {personalDetails?.contactNumber1 && (
          <View style={styles.flexContainer1}>
            <View>
              <Text style={styles.HeadingText}>Contact Details:</Text>
              {personalDetails?.contactNumber1 && <Text style={styles.text}>Mobile No. 1: {personalDetails.contactNumber1}</Text>}
              {personalDetails?.contactNumber2 && <Text style={styles.text}>Mobile No. 2: {personalDetails.contactNumber2}</Text>}
            </View>
          </View>
        )}

        {/* Other Details */}
        {personalDetails?.knowCooking && (
          <View style={styles.flexContainer1}>
            <View>
              <Text style={styles.HeadingText}>Other Details:</Text>
              {personalDetails?.knowCooking && <Text style={styles.text}>Cooking: {personalDetails.knowCooking}</Text>}
              {personalDetails?.dietaryHabit && <Text style={styles.text}>Diet: {personalDetails.dietaryHabit}</Text>}
              {personalDetails?.smokingHabit && <Text style={styles.text}>Smoke: {personalDetails.smokingHabit}</Text>}
              {personalDetails?.drinkingHabit && <Text style={styles.text}>Drinking: {personalDetails.drinkingHabit}</Text>}
              {personalDetails?.tobaccoHabits && <Text style={styles.text}>Tobacco: {personalDetails.tobaccoHabits}</Text>}
            </View>
          </View>
        )}

        {partnerPreferences?.partnerExpectations &&
          <View style={styles.flexContainer3}>
            <Text style={styles.HeadingText}>
              Expectation with partner</Text>
            <Text>{partnerPreferences?.partnerExpectations}</Text>
          </View>
        }


        <View style={styles.flexContainer3}>
          <Text style={styles.HeadingText}>Matches</Text>
          <View style={styles.flex}>
            <Image source={{ uri: MyprofileData?.Biodata?.personalDetails?.closeUpPhoto }} style={styles.smallImage} />
            <Text style={styles.text}>{matchedCount}/{totalCriteria}</Text>
            <Image source={{ uri: profileData?.data?.photoUrl?.[0] }} style={styles.smallImage} />
          </View>

          {/* Comparison List */}
          {Object.keys(profileData?.comparisonResults || {}).map((key, index) => (
            <View key={index} style={styles.flexContainer5}>
              <Text style={styles.label}>{key.replace(/([A-Z])/g, " $1").trim()}</Text>
              {profileData.comparisonResults[key] ? (
                <MaterialIcons name="check" style={[styles.icon, styles.checkIcon]} />
              ) : (
                <MaterialIcons name="close" style={[styles.icon, styles.crossIcon]} />
              )}
            </View>
          ))}
        </View>
        <Image source={require('../../Images/slider.png')} style={Globalstyles.bottomImage} />
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default MatrimonyPeopleProfile;
