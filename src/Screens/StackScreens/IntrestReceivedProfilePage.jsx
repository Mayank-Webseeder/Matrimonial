import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Linking, ActivityIndicator, Dimensions, Modal } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AppIntroSlider from 'react-native-app-intro-slider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/LocationStyle';
import Globalstyles from '../../utils/GlobalCss';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MATCHED_PROFILE, ACCEPTED_API, REJECTED_API, SAVED_PROFILES, BOTTOM_BIODATA_ADVERTISE_WINDOW } from '../../utils/BaseUrl';
import { SH, SW, SF } from '../../utils/Dimensions';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
const { width, height } = Dimensions.get("window");

const IntrestReceivedProfilePage = ({ navigation, route }) => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slider, setSlider] = useState([]);
  const { userId } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingDecline, setLoadingDecline] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [userData, setUserData] = useState({});
  const [Save, setIsSaved] = useState(initialSavedState || false);
  const hideContact = !!(userData?.hideContact || userData?.hideContact);
  const hideOptionalDetails = !!(userData?.hideOptionalDetails || userData?.hideOptionalDetails)
  const _id = userData?._id;
  const personalDetails = userData?.personalDetails || {};
  const partnerPreferences = userData?.partnerPreferences || {};
  const initialSavedState = profileData?.isSaved;
  const status = profileData?.requestStatus;
  const requestId = profileData?.requestId;
  const isBlur = userData?.isBlur;
  const MyprofileData = useSelector((state) => state.getBiodata);
  const [imageIndex, setImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const hasOtherDetails = personalDetails?.knowCooking || personalDetails?.dietaryHabit || personalDetails?.smokingHabit || personalDetails?.drinkingHabit || personalDetails?.tobaccoHabits || personalDetails?.hobbies;

  const images = [
    personalDetails?.closeUpPhoto,
    !hideOptionalDetails && personalDetails?.fullPhoto,
    !hideOptionalDetails && personalDetails?.bestPhoto
  ].filter(Boolean);

  const openImageViewer = (index) => {
    setImageIndex(index);
    setModalVisible(true);
  };

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchUserProfile(userId);
      }

      setLoadingAccept(false);
      setLoadingDecline(false);
    }, [userId])
  );


  useEffect(() => {
    Advertisement_window();
    if (userId) {
      fetchUserProfile(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (slider.length === 0) return;

    const currentSlide = slider[currentIndex];
    const durationInSeconds = currentSlide?.duration || 2;
    const durationInMilliseconds = durationInSeconds * 1000;

    const timeout = setTimeout(() => {
      const nextIndex = currentIndex < slider.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(nextIndex);
      sliderRef.current?.goToSlide(nextIndex);
    }, durationInMilliseconds);

    return () => clearTimeout(timeout);
  }, [currentIndex, slider]);

  const Advertisement_window = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(BOTTOM_BIODATA_ADVERTISE_WINDOW, { headers });

      if (response.data) {
        const fetchedData = response.data.data;
        console.log("fetchedData", JSON.stringify(fetchedData));

        const fullSliderData = fetchedData.flatMap((item) =>
          item.media.map((mediaItem) => ({
            id: `${item._id}_${mediaItem._id}`,
            title: item.title,
            description: item.description,
            image: `https://api-matrimonial.webseeder.tech/${mediaItem.mediaUrl}`,
            resolution: mediaItem.resolution,
            hyperlink: mediaItem.hyperlink,
          }))
        );

        setSlider(fullSliderData);
        console.log("Slider Data:", fullSliderData);
      } else {
        setSlider([]);
      }
    } catch (error) {
      console.error("Error fetching advertisement:", error);
    }
  };

  const fetchUserProfile = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) throw new Error('No token found');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    try {
      setLoading(true);
      const response = await axios.get(`${MATCHED_PROFILE}/${id}`, { headers });
      console.log("response", JSON.stringify(response.data))
      if (response.data.status) {
        setProfileData(response.data);
        setUserData(response?.data?.targetUserBioData)
      }
    } catch (error) {
      console.error("❌ Error fetching profile");

      if (error.response) {
        console.error("🔻 Server Error:");
        console.error("Status Code:", error.response.status);
        console.error("Message:", error.response.data?.message || "No message");
        console.error("Data:", error.response.data);
      } else if (error.request) {
        console.error("📡 No response received from server.");
        console.error("Request Details:", error.request);
      } else {
        console.error("⚠️ Error Message:", error.message);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const savedProfiles = async () => {
    if (!_id) {
      showMessage({
        type: "danger",
        message: "User ID not found!",
        icon: "danger"
      });
      return;
    }

    try {
      setLoading(true)
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${SAVED_PROFILES}/${_id}`, {}, { headers });
      console.log("Response Data:", JSON.stringify(response?.data));

      if (response.status === 200 && response.data.status === true) {
        showMessage({
          type: "success",
          message: "Success",
          description: response.data.message || "Profile saved successfully!",
          icon: "success"
        });

        setIsSaved(response.data.message.includes("saved successfully"));
      } else {
        throw new Error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("API Error:", error?.response ? JSON.stringify(error.response.data) : error.message);

      let errorMessage = "Failed to save profile!";
      if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || "Bad request.";
      }

      showMessage({
        type: "danger",
        message: "Error",
        description: errorMessage,
        icon: "danger"
      });
    }
    finally {
      setLoading(false)
    }
  };

  // Accept Connection Request
  const acceptConnectionRequest = async (requestId) => {
    setLoadingAccept(true);
    if (!requestId) return;

    console.log("✅ Accepting request for userId:", requestId);

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        showMessage({
          type: "danger",
          message: "Error",
          description: "User token missing!",
        });
        return;
      }

      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
      const response = await axios.post(`${ACCEPTED_API}/${requestId}`, {}, { headers });

      console.log("🚀 Response Status:", response.status);

      if (response.status === 200 && response.data.status === true) {
        showMessage({
          type: "success",
          message: "Success",
          description: response.data.message || "Request accepted successfully!",
          icon: "success",
        });
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      } else {
        throw new Error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("🚨 API Error:", error?.response?.data?.message || error.message);

      let errorMessage = "Failed to accept request!";
      if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || "Bad request.";
      }

      showMessage({
        type: "danger",
        message: "Error",
        description: errorMessage,
        icon: "danger"
      });
      setLoadingAccept(false);
    }
    finally {
      setLoadingAccept(false);
    }
  };

  // Reject Connection Request
  const rejectConnectionRequest = async (requestId) => {
    setLoadingDecline(true);
    if (!requestId) return;

    console.log("❌ Rejecting request for userId:", requestId);

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        showMessage({
          type: "danger",
          message: "Error",
          description: "User token missing!",
        });
        return;
      }

      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
      const response = await axios.post(`${REJECTED_API}/${requestId}`, {}, { headers });

      console.log("🚀 Response Status:", response.status);

      if (response.status === 200 && response.data.status === true) {
        showMessage({
          type: "success",
          message: "Success",
          description: response.data.message || "Request rejected successfully!",
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

      let errorMessage = "Failed to reject request!";
      if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || "Bad request.";
      }

      showMessage({
        type: "error",
        message: "Error",
        description: errorMessage,
        icon: "danger"
      });
      setLoadingDecline(false);
    }
    finally {
      setLoadingDecline(false)
    }
  };


  const handleShare = async () => {
    showMessage({
      type: "info",
      message: "Info",
      description: "Under development",
      icon: "info"
    });
  };

  // Map API comparisonResults to UI labels
  const comparisonResults = profileData?.comparisonResults || {};
  const totalCriteria = Object.keys(comparisonResults).length;
  const matchedCount = Object.values(comparisonResults).filter(value => value).length;
  const matchPercentage = totalCriteria > 0 ? Math.round((matchedCount / totalCriteria) * 100) : 0;

  const formattedHeight = personalDetails?.heightFeet
    ?.replace(/\s*-\s*/, "")
    ?.replace(/\s+/g, "");

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.theme_color} />
      </View>
    );
  }

  if (!profileData) {
    return <Text style={{ padding: 20 }}>No Data Available</Text>;
  }

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>{personalDetails?.fullname || 'Raj Sharma'}</Text>
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
              // blurRadius={!isBlur ? 5 : 0}
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
                    // blurRadius={!isBlur ? 5 : 0}
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
        {(userData?.verified) && (
          <View style={styles.verifiedContainer}>
            <Image
              source={require("../../Images/verified.png")}
              style={styles.verifiedBadge}
            />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        )}
        <View style={styles.flexContainer}>
          <View style={styles.flex}>
            {/* <Text style={styles.Idtext}>ID NO. :- {userId}</Text> */}
            <Text style={styles.Idtext}>{"ID NO. :-".toUpperCase()} {userData?.bioDataId}</Text>
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
            <TouchableOpacity style={styles.iconContainer} onPress={handleShare}>
              <Feather name="send" size={19} color={Colors.theme_color} />
              <Text style={styles.iconText}>Shares</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.interestedButton}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={[styles.iconContainer, hideContact && { opacity: 0.5 }]} // Reduce opacity when hidden
              onPress={() => {
                if (!hideContact && personalDetails?.contactNumber1) {
                  Linking.openURL('tel:' + personalDetails?.contactNumber1);
                }
              }}
              disabled={hideContact} // Disable press functionality when hidden
            >
              <MaterialIcons name="call" size={19} color={Colors.theme_color} />
              <Text style={styles.iconText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ReportPage', { profileId: _id })}>
              <MaterialIcons name="error-outline" size={19} color={Colors.theme_color} />
              <Text style={styles.iconText}>Report</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.flexContainer1}>
          <View style={styles.leftContainer}>
            <Text style={styles.HeadingText}>{personalDetails?.fullname}</Text>
            {personalDetails?.dob && <Text style={styles.text}>{new Date().getFullYear() - new Date(personalDetails?.dob).getFullYear()} Yrs, {formattedHeight} </Text>}
            {personalDetails?.subCaste && <Text style={styles.text}>{personalDetails?.subCaste}</Text>}
            {personalDetails?.maritalStatus && <Text style={styles.text}>{personalDetails?.maritalStatus}</Text>}
            {personalDetails?.manglikStatus && <Text style={styles.text}>{personalDetails?.manglikStatus}</Text>}
            {personalDetails?.disabilities && <Text style={styles.text}>Disability: {personalDetails?.disabilities}</Text>}
            {personalDetails?.profileCreatedBy && <Text style={styles.text}>Profile created by: {personalDetails?.profileCreatedBy}</Text>}
          </View>
          <View style={styles.rightContainer}>
            {personalDetails?.currentCity && <Text style={styles.text}>{personalDetails?.currentCity}</Text>}
            {personalDetails?.occupation && <Text style={styles.text}>{personalDetails?.occupation}</Text>}
            {personalDetails?.annualIncome && <Text style={[styles.text, { textTransform: "none" }]}>{personalDetails?.annualIncome} </Text>}
            {personalDetails?.qualification && <Text style={styles.text}>{personalDetails?.qualification}</Text>}
          </View>
        </View >
        <View style={styles.flexContainer1}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
              <MaterialIcons name="stars" size={25} color={Colors.theme_color} />
              <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Horoscope</Text>
            </View>
            <Text style={styles.text}>DOB {moment(personalDetails?.dob).format("DD-MM-YYYY")} / Time: {personalDetails?.timeOfBirth}</Text>
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
        <View style={styles.flexContainer1}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
              <MaterialCommunityIcons name="account-box-outline" size={25} color={Colors.theme_color} />
              <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>About Me</Text>
            </View>
            {!hideOptionalDetails && (
              <>
                {personalDetails?.aboutMe && <Text style={styles.text}>{personalDetails?.aboutMe}</Text>}
              </>
            )}
            {personalDetails?.complexion && <Text style={styles.text}>Complexion: {personalDetails?.complexion}</Text>}
            {personalDetails?.weight && <Text style={styles.text}>Weight: {personalDetails?.weight}</Text>}
            {/* {personalDetails?.currentCity && <Text style={styles.text}>Currently in: {personalDetails?.currentCity}</Text>} */}
            {personalDetails?.livingStatus && <Text style={styles.text}>Living with family: {personalDetails?.livingStatus}</Text>}
          </View>
        </View>
        <View style={styles.flexContainer1}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
              <FontAwesome name="group" size={20} color={Colors.theme_color} />
              <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Family Section</Text>
            </View>
            {personalDetails?.fatherName && <Text style={styles.text}>Father’s Name: {personalDetails?.fatherName}</Text>}
            {personalDetails?.fatherOccupation && <Text style={styles.text}>Father’s Occupation: {personalDetails?.fatherOccupation}</Text>}
            {personalDetails?.motherName && <Text style={styles.text}>Mother’s Name: {personalDetails?.motherName}</Text>}
            {personalDetails?.motherOccupation && <Text style={styles.text}>Mother’s Occupation: {personalDetails?.motherOccupation}</Text>}
            {personalDetails?.fatherIncomeAnnually && <Text style={[styles.text, { textTransform: "none" }]}>Father Income: {personalDetails?.fatherIncomeAnnually}</Text>}
            {personalDetails?.motherIncomeAnnually && <Text style={[styles.text, { textTransform: "none" }]}>Mother Income: {personalDetails?.motherIncomeAnnually}</Text>}
            {personalDetails?.familyType && <Text style={styles.text}>Family Type: {personalDetails?.familyType}</Text>}
            {personalDetails?.siblings && <Text style={styles.text}>Siblings: {personalDetails?.siblings}</Text>}
          </View>
        </View>
        {
          !hideOptionalDetails && personalDetails?.otherFamilyMemberInfo && (
            <View style={styles.detailbox}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
                <FontAwesome name="group" size={20} color={Colors.theme_color} />
                <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Family's Other Details</Text>
              </View>
              {personalDetails?.otherFamilyMemberInfo && <Text style={styles.text}>Other Family Members: {personalDetails?.otherFamilyMemberInfo}</Text>}
            </View>
          )
        }
        {!hideContact && (
          <View style={styles.detailbox}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
              <AntDesign name="contacts" size={25} color={Colors.theme_color} />
              <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Contact Details</Text>
            </View>
            {personalDetails?.contactNumber1 && <Text style={styles.text}>Mobile No. 1: {personalDetails?.contactNumber1}</Text>}
            {personalDetails?.contactNumber2 && <Text style={styles.text}>Mobile No. 2: {personalDetails?.contactNumber2}</Text>}
            {personalDetails?.cityOrVillage && <Text style={styles.text}>City : {personalDetails?.cityOrVillage}</Text>}
            {personalDetails?.state && <Text style={styles.text}>State : {personalDetails?.state}</Text>}
          </View>
        )}
        {!hideOptionalDetails && hasOtherDetails && (
          <View style={styles.flexContainer1}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
                <MaterialIcons name="details" size={25} color={Colors.theme_color} />
                <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Other Details</Text>
              </View>
              {personalDetails?.knowCooking && <Text style={styles.text}>Cooking: {personalDetails?.knowCooking}</Text>}
              {personalDetails?.dietaryHabit && <Text style={styles.text}>Diet: {personalDetails?.dietaryHabit}</Text>}
              {personalDetails?.smokingHabit && <Text style={styles.text}>Smoke: {personalDetails?.smokingHabit}</Text>}
              {personalDetails?.drinkingHabit && <Text style={styles.text}>Drinking: {personalDetails?.drinkingHabit}</Text>}
              {personalDetails?.tobaccoHabits && <Text style={styles.text}>Tobacco: {personalDetails?.tobaccoHabits}</Text>}
              {personalDetails?.hobbies && <Text style={styles.text}>Hobby: {personalDetails?.hobbies}</Text>}
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
                {profileData?.comparisonResults[key] ? (
                  <MaterialIcons name="check" style={[styles.icon, styles.checkIcon]} />
                ) : (
                  <MaterialIcons name="close" style={[styles.icon, styles.crossIcon]} />
                )}
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.warningText}>
            To find better matches, please set your partner preferences.
          </Text>
        )}
        <View style={Globalstyles.bottomImage}>
          <AppIntroSlider
            ref={sliderRef}
            data={slider}
            renderItem={({ item }) => {
              const { width, height } = item.resolution;

              const handlePress = () => {
                if (item.hyperlink) {
                  Linking.openURL(item.hyperlink).catch(err =>
                    console.error("Failed to open URL:", err)
                  );
                }
              };

              return (
                <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width, height, resizeMode: 'cover' }}
                  />
                </TouchableOpacity>
              );
            }}
            showNextButton={false}
            showDoneButton={false}
            dotStyle={Globalstyles.dot}
            activeDotStyle={Globalstyles.activeDot}
          />
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.declineButton,
            (status === "rejected" || status === "accepted") && { backgroundColor: "#dbcccf" }
          ]}
          onPress={() => rejectConnectionRequest(requestId)}
          disabled={loadingDecline || status === "rejected" || status === "accepted"}
        >
          {loadingDecline ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Entypo name={"cross"} color={Colors.light} size={20} />
              <Text style={styles.declineButtonText}>
                {status === "rejected" ? "Rejected" : "Decline"}
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.acceptButton,
            (status === "accepted" || status === "rejected") && { backgroundColor: "#dbcccf" }
          ]}
          onPress={() => acceptConnectionRequest(requestId)}
          disabled={loadingAccept || status === "accepted" || status === "rejected"}
        >
          {loadingAccept ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Entypo name={"check"} color={Colors.light} size={20} />
              <Text style={styles.acceptButtonText}>
                {status === "accepted" ? "Accepted" : "Accept"}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default IntrestReceivedProfilePage;
