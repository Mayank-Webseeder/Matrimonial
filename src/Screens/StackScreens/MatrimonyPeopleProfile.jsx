import React, { useCallback, useEffect, useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Linking, ActivityIndicator, Share, Switch,
  Modal, Dimensions
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/LocationStyle';
import Globalstyles from '../../utils/GlobalCss';
import { useFocusEffect, useRoute } from "@react-navigation/native";
import moment from "moment";
import axios from 'axios';
import { DELETE_SEND_REQUEST, MATCHED_PROFILE, SAVED_PROFILES, SEND_REQUEST, SHARED_PROFILES, VERIFY_PROFILE } from '../../utils/BaseUrl';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SF, SH, SW } from '../../utils/Dimensions';
import { showMessage } from 'react-native-flash-message';
const { width, height } = Dimensions.get("window");

const MatrimonyPeopleProfile = ({ navigation }) => {
  const route = useRoute();
  const { userId } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [loadingIntrest, setLoadingIntrest] = useState(false);
  const [intrestLoading, setIntrestLoading] = useState(false);
  const MyActivistProfile = useSelector((state) => state.activist.activist_data);
  const [profileData, setProfileData] = useState([]);
  const [userData, setUserData] = useState({});
  const MyprofileData = useSelector((state) => state.getBiodata);
  const partnerPreferenceData = MyprofileData?.Biodata?.partnerPreferences || null;
  const [isImageVisible, setImageVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(isVerified);
  const _id = userData?._id;
  const Biodata_id = userData?.bioDataId || null;
  const hideContact = !!(userData?.hideContact);
  const hideOptionalDetails = !!(userData?.hideOptionalDetails)
  const isActivist = MyActivistProfile?._id;
  const activistId = MyActivistProfile?._id;
  const isVerified = userData?.verified;
  const verifiedBy = userData?.verifiedBy;
  // console.log("_id", User_Id);
  const personalDetails = userData?.personalDetails || {};
  const partnerPreferences = userData?.partnerPreferences || {};
  const initialSavedState = profileData?.isSaved;
  const status = profileData?.requestStatus;
  const requestId = profileData?.requestId;
  const isVisible = profileData?.isVisible;
  const isBlur = userData?.isBlur;
  const isBlurCondition = status === "accepted" ? !isVisible : isBlur;
  const [Save, setIsSaved] = useState(initialSavedState || false);
  const hasOtherDetails = personalDetails?.knowCooking || personalDetails?.dietaryHabit || personalDetails?.smokingHabit || personalDetails?.drinkingHabit || personalDetails?.tobaccoHabits || personalDetails?.hobbies;
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

  const DeleteIntrest = async (requestId) => {
    setIntrestLoading(true);
    if (!requestId) return;

    console.log("✅ Accepting request for userId:", requestId);

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        showMessage({
          type: "error",
          message: "User token missing!",
          icon: "danger"
        });
        return;
      }

      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
      const response = await axios.delete(`${DELETE_SEND_REQUEST}/${requestId}`, { headers });

      console.log("🚀 Response Status:", response.status);

      if (response.status === 200 && response.data.status === true) {
        showMessage({
          type: "success",
          message: "Success",
          description: response.data.message || "Intrest Deleted successfully!",
          icon: "success"
        });
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      } else {
        throw new Error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("🚨 API Error:", error?.response?.data?.message || error.message);

      let errorMessage = "Failed to delete intrest!";
      if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || "Bad request.";
      }

      showMessage({
        type: "danger",
        message: errorMessage,
        icon: "danger"
      });
    }
    finally {
      setIntrestLoading(false);
    }
  };

  const VerifiedProfiles = async (Biodata_id) => {
    if (!Biodata_id) {
      showMessage({
        message: "Error: User ID not found!",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
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
      if (message.toLowerCase().includes("verified")) {
        showMessage({
          message: "Matrimonial Profile Approved ✅",
          type: "success",
          icon: "success",
          duration: 3000,
        });
      }
      else if (message.toLowerCase().includes("disapproved")) {
        showMessage({
          message: "Matrimonial Profile Disapproved ❌",
          type: "danger",
          icon: "danger",
          duration: 3000,
        });
      }
      else {
        showMessage({
          message: message,
          type: "success",
          icon: "success",
          duration: 3000,
        });
      }

      return message;
    } catch (error) {
      console.error(
        "API Error:",
        error?.response ? JSON.stringify(error.response.data) : error.message
      );
      showMessage({
        message: error.response?.data?.message,
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
      return "";
    }
  };

  const images = [
    personalDetails?.closeUpPhoto,
    !hideOptionalDetails && personalDetails?.fullPhoto,
    !hideOptionalDetails && personalDetails?.bestPhoto
  ].filter(Boolean);


  const openImageViewer = (index) => {
    setImageIndex(index);
    setModalVisible(true);
  };

  // console.log("MyprofileData", MyprofileData);

  useFocusEffect(
    useCallback(() => {
      console.log("====== Profile Data Debug ======");
      console.log("isVerified:", userData?.verified);
      console.log("verifiedBy:", userData?.verifiedBy);
      console.log("initialSavedState:", profileData?.isSaved);
      console.log("status:", profileData?.requestStatus);
      console.log("requestId:", profileData?.requestId);
      console.log("isBlur:", userData?.isBlur);
      console.log("userId:", userData?.userId);
      console.log("userData?.personalDetails", userData?.personalDetails);
      if (userId) {
        fetchUserProfile(userId);
      }
    }, [userId, isBlur])
  );

  const fetchUserProfile = async (id) => {
    console.log("id", id);
    setLoading(true);
    const token = await AsyncStorage.getItem('userToken');
    if (!token) throw new Error('No token found');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    try {
      const response = await axios.get(`${MATCHED_PROFILE}/${id}`, { headers });
      console.log("response", JSON.stringify(response.data))
      if (response.data.status) {
        setProfileData(response.data);
        setUserData(response?.data?.targetUserBioData)
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };


  const sendInterestRequest = async () => {
    setLoadingIntrest(true);

    if (!userId) {
      showMessage({
        type: "danger",
        message: "Error",
        description: "User ID not found!",
        visibilityTime: 3000,
        autoHide: true
      });
      setLoadingIntrest(false);
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

      if (response.status === 200 && response.data.status === true) {
        showMessage({
          type: "success",
          message: "Success",
          description: response.data.message,
          visibilityTime: 2000,
          autoHide: true,
          onHide: () => {
            setTimeout(() => {
              navigation.goBack();
            }, 500);
          }
        });
      } else {
        throw new Error("Unexpected response from server!");
      }
    } catch (error) {
      console.error("API Error:", error?.response ? JSON.stringify(error.response.data) : error.message);

      showMessage({
        type: "danger",
        message: "Error",
        description: error.response?.data?.message || "Failed to send interest!",
        icon: "danger"
      });
    } finally {
      setLoadingIntrest(false); // ✅ Hide Loader
    }
  };

  const savedProfiles = async () => {
    if (!_id) {
      showMessage({
        message: "Error: User ID not found!",
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
      return;
    }

    setIsSaved((prev) => !prev);

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
        showMessage({
          message: response.data.message,
          type: "success",
          icon: "success",
          duration: 3000,
        });
        if (response.data.message === "Profile saved successfully.") {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      } else {
        showMessage({
          message: "Something went wrong!",
          type: "danger",
          icon: "danger",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error(
        "API Error:",
        error?.response ? JSON.stringify(error.response.data) : error.message
      );
      showMessage({
        message: error.response?.data?.message,
        type: "danger",
        icon: "danger",
        duration: 3000,
      });
    }
  };

  const shareProfiles = async () => {
    showMessage({
      message: "Under development",
      type: "info",
      icon: "info",
      duration: 3000,
    });
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


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.theme_color} />
      </View>
    );
  }

  const formattedHeight = personalDetails?.heightFeet
    ?.replace(/\s*-\s*/, "")
    ?.replace(/\s+/g, "");

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
          {images.length > 0 && (
            <TouchableOpacity onPress={() => openImageViewer(0)}>
              <Image
                source={{ uri: images[0] }}
                style={{ width: SW(350), height: SH(330), borderRadius: 10 }}
                blurRadius={isBlurCondition ? 5 : 0}
              />
            </TouchableOpacity>
          )}
          <Modal visible={modalVisible} transparent={true} animationType="fade">
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)", justifyContent: "center", alignItems: "center" }}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                  const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                  setImageIndex(newIndex);
                }}
                style={{ width, height }}
              >
                {images.map((img, idx) => (
                  <View key={idx} style={{ width, height, justifyContent: "center", alignItems: "center" }}>
                    <Image
                      source={{ uri: img }}
                      style={{ width: width * 0.9, height: height * 0.8, borderRadius: 10, resizeMode: "contain" }}
                      blurRadius={isBlurCondition ? 5 : 0}
                    />
                  </View>
                ))}
              </ScrollView>
              <View style={{ position: "absolute", top: 40, alignSelf: "center", backgroundColor: "rgba(0,0,0,0.6)", padding: 8, borderRadius: 5 }}>
                <Text style={{ color: "white", fontSize: SF(13), fontFamily: "Poppins-Regular" }}>{imageIndex + 1} / {images.length}</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: "absolute", top: 40, right: 20 }}>
                <Text style={{ color: "white", fontSize: SF(13), fontFamily: "Poppins-Regular" }}>Close</Text>
              </TouchableOpacity>

            </View>
          </Modal>
        </View>
        {isActivist && (
          <View style={styles.verifiedContainer}>
            {isVerified && (
              <Image
                source={require("../../Images/verified.png")}
                style={styles.verifiedBadge}
              />
            )}

            {isVerified ? (
              verifiedBy === activistId ? (
                <>
                  <Text style={styles.verifiedText}>Verified</Text>
                  <Switch
                    value={isSwitchOn}
                    onValueChange={handleToggle}
                    thumbColor={isSwitchOn ? "#4CAF50" : "#767577"}
                    trackColor={{ false: "#f4f3f4", true: "#4CAF50" }}
                  />
                </>
              ) : (
                <Text style={styles.verifiedText}>Verified</Text>
              )
            ) : (
              <>
                <Text style={styles.verifiedText}>Verify Profile</Text>
                <Switch
                  value={isSwitchOn}
                  onValueChange={handleToggle}
                  thumbColor={isSwitchOn ? "#4CAF50" : "#767577"}
                  trackColor={{ false: "#f4f3f4", true: "#4CAF50" }}
                />
              </>
            )}
          </View>
        )}

        <View style={styles.flexContainer}>
          <View style={styles.flex}>
            <Text style={styles.Idtext}>
              {"ID NO. :-".toUpperCase()} {userData?.bioDataId}
            </Text>

            <Text style={styles.toptext}>{matchPercentage > 0 && (
              <Text style={styles.toptext}>
                {matchPercentage}% Compatible according to your preference
              </Text>
            )}
            </Text>
          </View>
          <View style={styles.sharecontainer}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => savedProfiles()}>
              <FontAwesome
                name={Save ? "bookmark" : "bookmark-o"}
                size={19}
                color={Colors.theme_color}
              />
              <Text style={styles.iconText}>{Save ? "Saved" : "Save"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={shareProfiles}>
              <Feather name={"send"} size={19} color={Colors.theme_color} />
              <Text style={styles.iconText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.interestedButton}
              onPress={requestId ? () => DeleteIntrest(requestId) : sendInterestRequest}
              disabled={requestId ? intrestLoading : loadingIntrest}
            >
              {(requestId ? intrestLoading : loadingIntrest) ? (
                <ActivityIndicator size="small" color={Colors.theme_color} />
              ) : (
                <Text style={styles.buttonText}>
                  {(status === "accepted" || status === "rejected") ? (
                    <Text style={[styles.buttonText, { color: '#fff' }]}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Text>
                  ) : (
                    <Text style={styles.buttonText}>
                      {requestId ? "Cancel Interest" : status ? status : "Send Interest"}
                    </Text>
                  )}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconContainer, hideContact && { opacity: 0.5 }]}
              onPress={() => {
                if (!hideContact && personalDetails?.contactNumber1) {
                  Linking.openURL('tel:' + personalDetails?.contactNumber1);
                }
              }}
              disabled={hideContact} // Disable press functionality when hidden
            >
              <MaterialIcons name={"call"} size={19} color={Colors.theme_color} />
              <Text style={styles.iconText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ReportPage', { profileId: _id })}>
              <MaterialIcons name={"error-outline"} size={20} color={Colors.theme_color} />
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
            <Text style={styles.text}>{calculateAge(personalDetails.dob)} Yrs, {formattedHeight} </Text>
            {personalDetails?.subCaste && <Text style={styles.text}>{personalDetails?.subCaste}</Text>}
            {personalDetails?.maritalStatus && <Text style={styles.text}>{personalDetails?.maritalStatus}</Text>}
            {personalDetails?.manglikStatus && <Text style={styles.text}>{personalDetails?.manglikStatus}</Text>}
            {personalDetails?.disabilities && <Text style={styles.text}>Disability: {personalDetails?.disabilities}</Text>}
            {personalDetails?.profileCreatedBy && <Text style={styles.text}>Profile Created By: {personalDetails?.profileCreatedBy}</Text>}
          </View>

          {/** Right Container */}
          <View style={styles.rightContainer}>
            {/* Right-side details */}
            {personalDetails?.currentCity && <Text style={styles.text}>{personalDetails?.currentCity}</Text>}
            {personalDetails?.occupation && <Text style={[styles.text, { textTransform: "none" }]}>{personalDetails?.occupation}</Text>}
            {personalDetails?.annualIncome && <Text style={[styles.text, { textTransform: "none" }]}>{personalDetails?.annualIncome} </Text>}
            {personalDetails?.qualification && <Text style={[styles.text, { textTransform: "none" }]}>{personalDetails?.qualification}</Text>}
          </View>
        </View>

        {/* Horoscope Section */}
        {personalDetails?.dob && (
          <View style={styles.flexContainer1}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
                <MaterialIcons name="stars" size={25} color={Colors.theme_color} />
                <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Horoscope</Text>
              </View>
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
        {!hideOptionalDetails && (
          <View style={styles.flexContainer1}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
                <MaterialCommunityIcons name="account-box-outline" size={25} color={Colors.theme_color} />
                <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>About Me</Text>
              </View>


              {personalDetails?.aboutMe && <Text style={styles.text}>{personalDetails?.aboutMe}</Text>}

              <View style={{ marginVertical: SH(4) }}>
                <View style={styles.flexContainer2}>
                  {personalDetails?.complexion && (
                    <Text style={styles.text}>Complexion: {personalDetails?.complexion}</Text>
                  )}
                  {personalDetails?.weight && (
                    <Text style={styles.text}>Weight: {personalDetails?.weight} kg</Text>
                  )}
                </View>

                <View style={styles.flexContainer2}>
                  {personalDetails?.currentCity && (
                    <Text style={styles.text}>Currently in: {personalDetails?.currentCity}</Text>
                  )}
                  {personalDetails?.livingStatus && (
                    <Text style={styles.text}>Living with family: {personalDetails?.livingStatus}</Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Family Section */}
        <View style={styles.flexContainer1}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
              <FontAwesome name="group" size={20} color={Colors.theme_color} />
              <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Family Section</Text>
            </View>
            {personalDetails?.fatherName && <Text style={styles.text}>Father’s Name: {personalDetails.fatherName}</Text>}
            {personalDetails?.fatherOccupation && <Text style={styles.text}>Father’s Occupation: {personalDetails.fatherOccupation}</Text>}
            {personalDetails?.motherName && <Text style={styles.text}>Mother’s Name: {personalDetails.motherName}</Text>}
            {personalDetails?.fatherIncomeAnnually && <Text style={[styles.text, { textTransform: "none" }]}>Father Income: {personalDetails.fatherIncomeAnnually}</Text>}
            {personalDetails?.motherIncomeAnnually && <Text style={[styles.text, { textTransform: "none" }]}>Mother Income: {personalDetails.motherIncomeAnnually}</Text>}
            {personalDetails?.familyType && <Text style={styles.text}>Family Type: {personalDetails.familyType}</Text>}
          </View>
        </View>

        {
          !hideOptionalDetails && personalDetails?.otherFamilyMemberInfo && (
            <View style={styles.detailbox}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
                <FontAwesome name="group" size={20} color={Colors.theme_color} />
                <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Family's Other Details</Text>
              </View>
              {personalDetails?.otherFamilyMemberInfo && <Text style={styles.text}>Other Family Members: {personalDetails.otherFamilyMemberInfo}</Text>}
            </View>
          )
        }

        {/* Contact Section */}
        {!hideContact && (
          <View style={styles.detailbox}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
              <AntDesign name="contacts" size={25} color={Colors.theme_color} />
              <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Contact Details</Text>
            </View>
            {personalDetails?.contactNumber1 && <Text style={styles.text}>Mobile No. 1: {personalDetails.contactNumber1}</Text>}
            {personalDetails?.contactNumber2 && <Text style={styles.text}>Mobile No. 2: {personalDetails.contactNumber2}</Text>}
            {personalDetails?.cityOrVillage && <Text style={styles.text}>City : {personalDetails.cityOrVillage}</Text>}
            {personalDetails?.state && <Text style={styles.text}>State : {personalDetails.state}</Text>}
          </View>
        )}

        {/* Other Details */}
        {!hideOptionalDetails && hasOtherDetails && (
          <View style={styles.flexContainer1}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
                <MaterialIcons name="details" size={25} color={Colors.theme_color} />
                <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Other Details</Text>
              </View>
              {personalDetails?.knowCooking && <Text style={styles.text}>Cooking: {personalDetails.knowCooking}</Text>}
              {personalDetails?.dietaryHabit && <Text style={styles.text}>Diet: {personalDetails.dietaryHabit}</Text>}
              {personalDetails?.smokingHabit && <Text style={styles.text}>Smoke: {personalDetails.smokingHabit}</Text>}
              {personalDetails?.drinkingHabit && <Text style={styles.text}>Drinking: {personalDetails.drinkingHabit}</Text>}
              {personalDetails?.tobaccoHabits && <Text style={styles.text}>Tobacco: {personalDetails.tobaccoHabits}</Text>}
              {personalDetails?.hobbies && <Text style={styles.text}>Hobby: {personalDetails.hobbies}</Text>}
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

        {Object.keys(profileData?.comparisonResults || {}).length > 0 ? (
          <View style={styles.flexContainer3}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
              <MaterialCommunityIcons name="heart-half-full" size={25} color={Colors.theme_color} />
              <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Your Similarities</Text>
            </View>
            <View style={styles.flex}>
              <Image
                source={{ uri: profileData?.loggedInUserBiodata?.personalDetails?.closeUpPhoto }}
                style={styles.smallImage}
              />
              <Text style={styles.text}>{matchedCount}/{totalCriteria}</Text>
              <Image
                source={{ uri: profileData?.targetUserBioData?.personalDetails?.closeUpPhoto }}
                style={styles.smallImage}
              />
            </View>

            {/* Comparison List */}
            {Object.keys(profileData?.comparisonResults).map((key, index) => (
              <View key={index} style={styles.flexContainer5}>
                <Text style={styles.label}>{key.replace(/([A-Z])/g, " $1").trim()}</Text>
                {profileData.comparisonResults[key] ? (
                  <MaterialIcons name={"check"} style={[styles.icon, styles.checkIcon]} />
                ) : (
                  <MaterialIcons name={"close"} style={[styles.icon, styles.crossIcon]} />
                )}
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.warningText}>
            To find better matches, please set your partner preferences.
          </Text>
        )}

        <Image source={require('../../Images/slider.png')} style={Globalstyles.bottomImage} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MatrimonyPeopleProfile;
