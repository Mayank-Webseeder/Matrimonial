import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Linking, ActivityIndicator, Share, Switch, ToastAndroid } from 'react-native';
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
import { MATCHED_PROFILE, SAVED_PROFILES, SEND_REQUEST, SHARED_PROFILES, VERIFY_PROFILE } from '../../utils/BaseUrl';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageViewing from 'react-native-image-viewing';
import { SH, SW } from '../../utils/Dimensions';

const MatrimonyPeopleProfile = ({ navigation }) => {
  const route = useRoute();
  const MyActivistProfile = useSelector((state) => state.activist.activist_data);
  const { userDetails, isSaved ,userId } = route.params || {};
  const Biodata_id = userDetails?.bioDataId || null;
  const hideContact = !!(userDetails?.hideContact);
  const hideOptionalDetails = !!(userDetails?.hideOptionalDetails)
  const isActivist = MyActivistProfile?._id;
  const activistId = MyActivistProfile?._id;
  const isVerified = userDetails?.verified;
  const verifiedBy = userDetails?.verifiedBy;
  
  useEffect(() => {
    console.log("userDetails", userId);
  }, [])

  // const User_Id = userDetails?.userId || details_userId;
  // console.log("userId", hideOptionalDetails);
  const _id = userDetails?._id;
  // console.log("_id", User_Id);
  const personalDetails = userDetails?.personalDetails || {};
  const partnerPreferences = userDetails?.partnerPreferences || {};
  const [profileData, setProfileData] = useState([]);
  const MyprofileData = useSelector((state) => state.getBiodata);
  const [isImageVisible, setImageVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const [isSwitchOn, setIsSwitchOn] = useState(isVerified);

  const handleToggle = async () => {
    const newValue = !isSwitchOn;
    setIsSwitchOn(newValue);

    const responseMessage = await VerifiedProfiles(Biodata_id);

    if (responseMessage.includes("verified")) {
      setIsSwitchOn(true);
    } else if (responseMessage.includes("disapproved")) {
      setIsSwitchOn(false);
    }
  };

  const VerifiedProfiles = async (Biodata_id) => {
    if (!Biodata_id) {
      ToastAndroid.show("Error: User ID not found!", ToastAndroid.SHORT);
      return "";
    }

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${VERIFY_PROFILE}/${Biodata_id}`, {}, { headers });

      console.log("Response Data:", JSON.stringify(response?.data));

      const message = response?.data?.message || "";

      // ✅ Success Message
      if (message.toLowerCase().includes("verified")) {
        ToastAndroid.show("Matrimonial Profile Approved ✅", ToastAndroid.SHORT);
      }
      // ❌ Disapproved Message
      else if (message.toLowerCase().includes("disapproved")) {
        ToastAndroid.show("Matrimonial Profile Disapproved ❌", ToastAndroid.SHORT);
      }
      // ⚠️ Default Message (Agar kuch match nahi hota)
      else {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }

      return message;
    } catch (error) {
      console.error(
        "API Error:",
        error?.response ? JSON.stringify(error.response.data) : error.message
      );
      ToastAndroid.show(
        error.response?.data?.message || "Failed to send interest!",
        ToastAndroid.LONG
      );
      return "";
    }
  };

  // Available images ko filter karo jo null na ho
  const images = [
    personalDetails?.closeUpPhoto,
    !hideOptionalDetails && personalDetails?.fullPhoto,
    !hideOptionalDetails && personalDetails?.bestPhoto
  ].filter(Boolean); // Removes null/undefined values


  const openImageViewer = (index) => {
    setImageIndex(index);
    setImageVisible(true);
  };

  // console.log("MyprofileData", MyprofileData);

 
  useEffect(() => {
    console.log("userId in profile function:", userId); // Debugging step

    if (!userId) {
        console.log("⚠️ userId is missing!");
        return;
    }

    const fetchUserProfile = async () => {
        console.log("✅ FetchUserProfile Function Called");

        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('userToken');
            console.log("🔑 Token from AsyncStorage:", token);

            if (!token) {
                console.log("❌ No token found!");
                return;
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };

            // const apiUrl = `${MATCHED_PROFILE}/${userId}`;
            console.log("🌍 API URL:", apiUrl);

            const response = await axios.get(`${MATCHED_PROFILE}/${userId}`, { headers });
            console.log("📥 API Response:", JSON.stringify(response.data));

            if (response.data.status === "success") {
                console.log("🎯 Profile Data Fetched Successfully!");
                setProfileData(response.data);
            } else {
                console.log("⚠️ API Response Status Not Success:", response.data);
            }
        } catch (error) {
            console.error("❌ Error fetching profile:", error?.response?.data || error.message);
        } finally {
            setLoading(false);
            console.log("🔄 Loading state set to false");
        }
    };

    fetchUserProfile();
}, [userId]);


  const sendInterestRequest = async () => {
    if (!userId) {
      ToastAndroid.show("Error: User ID not found!", ToastAndroid.SHORT);
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
  
      const response = await axios.post(`${SEND_REQUEST}/${userId}`, {}, { headers });
  
      console.log("Response Data:", JSON.stringify(response?.data));
  
      if (response?.data?.message) {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error(
        "API Error:",
        error?.response ? JSON.stringify(error.response.data) : error.message
      );
  
      ToastAndroid.show(
        error.response?.data?.message || "Failed to send interest!",
        ToastAndroid.SHORT
      );
    }
  };
  
  const savedProfiles = async () => {
    if (!_id) {
      ToastAndroid.show("Error: User ID not found!", ToastAndroid.SHORT);
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
  
      const response = await axios.post(`${SAVED_PROFILES}/${_id}`, {}, { headers });
  
      console.log("Response Data:", JSON.stringify(response?.data));
  
      if (response?.data?.message) {
        ToastAndroid.show(response.data.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error(
        "API Error:",
        error?.response ? JSON.stringify(error.response.data) : error.message
      );
  
      ToastAndroid.show(
        error.response?.data?.message || "Failed to save profile!",
        ToastAndroid.SHORT
      );
    }
  };

  const shareProfiles = async () => {
   ToastAndroid.show("Under development", ToastAndroid.SHORT);
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
              <View style={{ position: "absolute", bottom: SH(20), alignSelf: "center", flexDirection: "row" }}>
                {images.map((_, index) => (
                  <View
                    key={index}
                    style={{
                      width: SH(8),
                      height: SH(8),
                      borderRadius: 4,
                      marginHorizontal: SW(5),
                      backgroundColor: imageIndex === index ? "white" : "gray",
                    }}
                  />
                ))}
              </View>
            )}
          />
        </View>
        <View style={styles.verifiedContainer}>
          <Image
            source={require("../../Images/verified.png")}
            style={styles.verifiedBadge}
          />
          {isActivist ? (
            isVerified ? (
              verifiedBy === activistId ? (
                //  Agar current activist ne verify kiya hai, to toggle bhi dikhega (disapprove karne ke liye)
                <>
                  <Text style={styles.verifiedText}>Verified</Text>
                  <Switch
                    value={isSwitchOn}
                    onValueChange={handleToggle}
                    thumbColor={isSwitchOn ? "#4CAF50" : "#767577"} // Green when ON, Gray when OFF
                    trackColor={{ false: "#f4f3f4", true: "#4CAF50" }} // Background color
                  />
                </>
              ) : (
                // Agar kisi aur activist ne verify kiya hai, to sirf "Verified" likha aaye (toggle nahi)
                <Text style={styles.verifiedText}>Verified</Text>
              )
            ) : (
              //  Agar profile verify nahi hai, to toggle dikhega verify karne ke liye
              <>
                <Text style={styles.verifiedText}>Verify Profile</Text>
                <Switch
                  value={isSwitchOn}
                  onValueChange={handleToggle}
                  thumbColor={isSwitchOn ? "#4CAF50" : "#767577"} // Green when ON, Gray when OFF
                  trackColor={{ false: "#f4f3f4", true: "#4CAF50" }} // Background color
                />
              </>
            )
          ) : (
            // 🚫 Non-activist ke liye sirf "Verified" text dikhana hai
            isVerified && <Text style={styles.verifiedText}>Verified</Text>
          )}
        </View>

        {/* Profile Info Section */}
        <View style={styles.flexContainer}>
          <View style={styles.flex}>
            {/* <Text style={styles.Idtext}>ID NO. :- {user?._id}</Text> */}
            <Text style={styles.Idtext}>ID NO. :- {userDetails?.bioDataId || details?.bioDataId}</Text>
            <Text style={styles.toptext}>{matchPercentage > 0 && (
              <Text style={styles.toptext}>
                {matchPercentage}% Compatible according to your preference
              </Text>
            )}
            </Text>
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

            <TouchableOpacity
              style={[styles.iconContainer, hideContact && { opacity: 0.5 }]} // Reduce opacity when hidden
              onPress={() => {
                if (!hideContact && personalDetails?.contactNumber1) {
                  Linking.openURL('tel:' + personalDetails?.contactNumber1);
                }
              }}
              disabled={hideContact} // Disable press functionality when hidden
            >
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

          {/** Right Container */}
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
                {!hideOptionalDetails && (
                  <>
                    {personalDetails?.nadi && <Text style={styles.text}>Nadi: {personalDetails?.nadi}</Text>}
                    {personalDetails?.gotraSelf && <Text style={styles.text}>Gotra (Self): {personalDetails?.gotraSelf}</Text>}
                  </>
                )}
              </View>

              <View style={styles.flexContainer2}>
                {personalDetails?.manglikStatus && <Text style={styles.text}>{personalDetails?.manglikStatus}</Text>}
                {!hideOptionalDetails && (
                  <>
                    {personalDetails?.gotraMother && <Text style={styles.text}>Gotra (Mother): {personalDetails?.gotraMother}</Text>}
                  </>
                )}
              </View>
            </View>
          </View>
        )}

        {/* About Me Section */}
        {personalDetails?.aboutMe && (
          <View style={styles.flexContainer1}>
            <View>
              <Text style={styles.HeadingText}>About Me</Text>
              {!hideOptionalDetails && (
                <>
                  {personalDetails?.aboutMe && <Text style={styles.text}>{personalDetails?.aboutMe}</Text>}
                </>
              )}
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
              {!hideOptionalDetails && (
                <>
                  <Text style={styles.HeadingText}>About My family</Text>
                  {personalDetails?.otherFamilyMemberInfo && <Text style={styles.text}>Other Family Members: {personalDetails.otherFamilyMemberInfo}</Text>}
                </>
              )}
            </View>
          </View>
        )}

        {/* Contact Section */}
        {!hideContact && personalDetails?.contactNumber1 && (
          <View style={styles.flexContainer1}>
            <View>
              <Text style={styles.HeadingText}>Contact Details:</Text>
              {personalDetails?.contactNumber1 && <Text style={styles.text}>Mobile No. 1: {personalDetails.contactNumber1}</Text>}
              {personalDetails?.contactNumber2 && <Text style={styles.text}>Mobile No. 2: {personalDetails.contactNumber2}</Text>}
            </View>
          </View>
        )}

        {/* Other Details */}
        {!hideOptionalDetails && personalDetails?.knowCooking && (
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

        {matchedCount > 0 && totalCriteria > 0 && profileData?.data ? (
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
        ) : null}

        <Image source={require('../../Images/slider.png')} style={Globalstyles.bottomImage} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MatrimonyPeopleProfile;
