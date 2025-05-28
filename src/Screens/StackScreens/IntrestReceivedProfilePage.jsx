import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Linking, ActivityIndicator, Dimensions, Modal, Alert } from 'react-native';
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
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const IntrestReceivedProfilePage = ({ navigation, route }) => {
  const sliderRef = useRef(null);
  const topSliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slider, setSlider] = useState([]);
  const { userId } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingDecline, setLoadingDecline] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [userData, setUserData] = useState({});
  const [Save, setIsSaved] = useState(initialSavedState || false);
  const _id = userData?._id;
  const personalDetails = userData?.personalDetails || {};
  const partnerPreferences = userData?.partnerPreferences || {};
  const initialSavedState = profileData?.isSaved;
  const status = profileData?.requestStatus;
  const hideContact = userData?.hideContact === true && status === 'accepted'
    ? false
    : !!userData?.hideContact;

  const hideOptionalDetails = userData?.hideOptionalDetails === true && status === 'accepted'
    ? false
    : !!userData?.hideOptionalDetails;

  const requestId = profileData?.requestId;
  const isVisible = profileData?.isVisible;
  const isBlur = userData?.isBlur;
  const isBlurCondition = status === "accepted" ? !isVisible : isBlur;
  const MyprofileData = useSelector((state) => state.getBiodata);
  const [imageIndex, setImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const hasOtherDetails = personalDetails?.knowCooking || personalDetails?.dietaryHabit || personalDetails?.smokingHabit || personalDetails?.drinkingHabit || personalDetails?.tobaccoHabits || personalDetails?.hobbies;

  const formattedImages = [
    personalDetails?.closeUpPhoto,
    !hideOptionalDetails && personalDetails?.fullPhoto,
    !hideOptionalDetails && personalDetails?.bestPhoto
  ]
    .filter(Boolean)
    .map((url) => ({ uri: url }));

  const openImageViewer = (index) => {
    setImageIndex(index);
    setModalVisible(true);
  };

  const SliderrenderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => openImageViewer(index)}>
      <Image
        source={{ uri: item.uri }}
        style={styles.sliderImage}
        blurRadius={isBlurCondition ? 10 : 0}
      />
    </TouchableOpacity>
  );


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
    if (!formattedImages || formattedImages.length === 0) return;

    const duration = (formattedImages[currentIndex]?.duration || 2) * 1000;

    const timeout = setTimeout(() => {
      const nextIndex =
        currentIndex < formattedImages.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(nextIndex);
      topSliderRef.current?.goToSlide(nextIndex);
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentIndex, formattedImages]);


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
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching advertisement:", errorMsg);

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
      console.log("response", JSON.stringify(response.data));

      if (response.data.status) {
        setProfileData(response.data);
        setUserData(response?.data?.targetUserBioData);
      } else {
        setProfileData(null);
        setUserData(null);
        setLoading(false);
        Alert.alert("Error", "User account has been deleted or no biodata available.");
      }
    } catch (error) {
      console.error("❌ Error fetching profile");
      if (error.response) {
        const errorMsg = error.response?.data?.message || error.message;
        console.error("Error fetching profile:", errorMsg);

        if (errorMsg === "Target user has not set any biodata or personal details.") {
          setProfileData(null);
          setUserData(null);
          setLoading(false);
        }
      } else if (error.request) {
        console.error("📡 No response received from server.");
        console.error("Request Details:", error.request);
      } else {
        console.error("⚠️ Error Message:", error.message);
      }
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
        icon: "danger",
        duarion: 7000
      });
      return;
    }

    try {
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
          icon: "success",
          duarion: 7000
        });

        setIsSaved(response.data.message.includes("saved successfully"));
      } else {
        throw new Error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching biodata:", errorMsg);
      showMessage({
        type: "danger",
        message: "Error",
        description: errorMsg,
        icon: "danger",
        duarion: 7000
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
          duarion: 5000
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
          duarion: 7000
        });
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      } else {
        throw new Error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error in accept request:", errorMsg);

      showMessage({
        type: "danger",
        message: "Error",
        description: errorMsg,
        icon: "danger",
        duarion: 7000
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
          duarion: 5000
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
          icon: "success",
          duarion: 7000
        });
        setTimeout(() => {
          navigation.goBack();
        }, 7000);
      } else {
        throw new Error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error in reject request:", errorMsg);
      showMessage({
        type: "error",
        message: "Error",
        description: errorMsg,
        icon: "danger",
        duarion: 7000
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
      icon: "info",
      duarion: 7000
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


  if (!profileData && !userData) {
    return (
      <View style={styles.container}>
        <MaterialIcons name="person-off" size={60} color="#ccc" />
        <Text style={styles.title}>Profile Unavailable</Text>
        <Text style={styles.message}>
          The user's profile is currently unavailable. They may have deleted their account
        </Text>
      </View>
    );
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
        <View style={styles.sliderContainer}>
          <AppIntroSlider
            ref={topSliderRef}
            data={formattedImages}
            renderItem={SliderrenderItem}
            showNextButton={false}
            showDoneButton={false}
            dotStyle={Globalstyles.dot}
            activeDotStyle={Globalstyles.activeDot}
            onSlideChange={(index) => setCurrentIndex(index)}
          />

          {/* Modal for Full Image View */}
          <Modal visible={modalVisible} transparent={true} animationType="fade">
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentOffset={{ x: imageIndex * SCREEN_W, y: 0 }}
                onMomentumScrollEnd={(e) =>
                  setImageIndex(Math.round(e.nativeEvent.contentOffset.x / SCREEN_W))
                }
              >
                {formattedImages.map((img, idx) => (
                  <View
                    key={idx}
                    style={{
                      width: SCREEN_W,
                      height: SCREEN_H,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: SH(15)
                    }}
                  >
                    <Image
                      source={{ uri: img.uri }}
                      resizeMode="contain"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </View>
                ))}
              </ScrollView>

              <View style={{
                position: "absolute", top: SH(30), alignSelf: "center", backgroundColor: "rgba(0,0,0,0.6)",
                paddingHorizontal: SW(8), borderRadius: 5, paddingVertical: SH(8)
              }}>
                <Text style={{ color: "white", fontSize: SF(16), fontWeight: "bold" }}>{imageIndex + 1} / {formattedImages.length}</Text>
              </View>

              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: "absolute", top: SH(40), right: SW(20) }}>
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
        {personalDetails?.dob && (
          <View style={styles.familyDiv}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
                <MaterialIcons name="stars" size={25} color={Colors.theme_color} />
                <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Horoscope</Text>
              </View>

              {/* Displaying Date of Birth and Time of Birth */}
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>DOB :</Text>
                <Text style={styles.infoValue}>{moment(personalDetails.dob).format("DD-MM-YYYY")} / Time: {personalDetails?.timeOfBirth}</Text>
              </View>

              {/* Displaying Place of Birth */}
              {personalDetails?.placeofbirth && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Place of Birth :</Text>
                  <Text style={styles.infoValue}>{personalDetails?.placeofbirth}</Text>
                </View>
              )}

              {/* Optional Details for Horoscope */}
              <View>
                {!hideOptionalDetails && personalDetails?.nadi && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Nadi :</Text>
                    <Text style={styles.infoValue}>{personalDetails?.nadi}</Text>
                  </View>
                )}

                {!hideOptionalDetails && personalDetails?.gotraSelf && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Gotra (Self) :</Text>
                    <Text style={styles.infoValue}>{personalDetails?.gotraSelf}</Text>
                  </View>
                )}

                {personalDetails?.manglikStatus && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Manglik Status :</Text>
                    <Text style={styles.infoValue}>{personalDetails?.manglikStatus}</Text>
                  </View>
                )}

                {!hideOptionalDetails && personalDetails?.gotraMother && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Gotra (Mother) :</Text>
                    <Text style={styles.infoValue}>{personalDetails?.gotraMother}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        )}

        <View style={styles.familyDiv}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
              <MaterialCommunityIcons name="account-box-outline" size={25} color={Colors.theme_color} />
              <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>About Me</Text>
            </View>

            {personalDetails?.aboutMe?.trim() !== "" && (
              <Text style={styles.text}>{personalDetails?.aboutMe}</Text>
            )}

            <View style={{ marginVertical: SH(4) }}>
              <View style={styles.infoRow}>
                {personalDetails?.complexion && (
                  <>
                    <Text style={styles.infoLabel}>Complexion :</Text>
                    <Text style={styles.infoValue}>{personalDetails.complexion}</Text>
                  </>
                )}
              </View>

              <View style={styles.infoRow}>
                {personalDetails?.weight && (
                  <>
                    <Text style={styles.infoLabel}>Weight :</Text>
                    <Text style={styles.infoValue}>{personalDetails.weight} kg</Text>
                  </>
                )}
              </View>

              <View style={styles.infoRow}>
                {personalDetails?.livingStatus && (
                  <>
                    <Text style={styles.infoLabel}>Living with family :</Text>
                    <Text style={styles.infoValue}>{personalDetails.livingStatus}</Text>
                  </>
                )}
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.familyDiv]}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
              <FontAwesome name="group" size={20} color={Colors.theme_color} />
              <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Family Section</Text>
            </View>

            {personalDetails?.fatherName && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Father’s Name :</Text>
                <Text style={styles.infoValue}>{personalDetails.fatherName}</Text>
              </View>
            )}
            {personalDetails?.motherName && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Mother’s Name :</Text>
                <Text style={styles.infoValue}>{personalDetails.motherName}</Text>
              </View>
            )}
            {personalDetails?.fatherOccupation && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Father’s Occupation :</Text>
                <Text style={styles.infoValue}>{personalDetails.fatherOccupation}</Text>
              </View>
            )}
            {personalDetails?.fatherIncomeAnnually && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Father Income :</Text>
                <Text style={styles.infoValue}>{personalDetails.fatherIncomeAnnually}</Text>
              </View>
            )}
            {personalDetails?.motherOccupation && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Mother’s Occupation :</Text>
                <Text style={styles.infoValue}>{personalDetails.motherOccupation}</Text>
              </View>
            )}
            {personalDetails?.motherIncomeAnnually && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Mother’s Income :</Text>
                <Text style={styles.infoValue}>{personalDetails.motherIncomeAnnually}</Text>
              </View>
            )}
            {personalDetails?.siblings && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Siblings :</Text>
                <Text style={styles.infoValue}>{personalDetails.siblings}</Text>
              </View>
            )}
            {personalDetails?.familyType && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Family Type :</Text>
                <Text style={styles.infoValue}>{personalDetails.familyType}</Text>
              </View>
            )}
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
        {!hideContact && (
          <View style={styles.detailbox}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
              <AntDesign name="contacts" size={25} color={Colors.theme_color} />
              <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Contact Details</Text>
            </View>

            {personalDetails?.contactNumber1 && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Mobile No. 1 :</Text>
                <Text style={styles.infoValue}>{personalDetails.contactNumber1}</Text>
              </View>
            )}
            {personalDetails?.contactNumber2 && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Mobile No. 2 :</Text>
                <Text style={styles.infoValue}>{personalDetails.contactNumber2}</Text>
              </View>
            )}
            {personalDetails?.cityOrVillage && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>City :</Text>
                <Text style={styles.infoValue}>{personalDetails.cityOrVillage}</Text>
              </View>
            )}
            {personalDetails?.state && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>State :</Text>
                <Text style={styles.infoValue}>{personalDetails.state}</Text>
              </View>
            )}
          </View>
        )}
        {!hideOptionalDetails && hasOtherDetails && (
          <View style={styles.familyDiv}>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
                <MaterialIcons name="details" size={25} color={Colors.theme_color} />
                <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Other Details</Text>
              </View>

              {personalDetails?.knowCooking && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Cooking :</Text>
                  <Text style={styles.infoValue}>{personalDetails.knowCooking}</Text>
                </View>
              )}
              {personalDetails?.dietaryHabit && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Diet :</Text>
                  <Text style={styles.infoValue}>{personalDetails.dietaryHabit}</Text>
                </View>
              )}
              {personalDetails?.smokingHabit && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Smoke :</Text>
                  <Text style={styles.infoValue}>{personalDetails.smokingHabit}</Text>
                </View>
              )}
              {personalDetails?.drinkingHabit && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Drinking :</Text>
                  <Text style={styles.infoValue}>{personalDetails.drinkingHabit}</Text>
                </View>
              )}
              {personalDetails?.tobaccoHabits && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Tobacco :</Text>
                  <Text style={styles.infoValue}>{personalDetails.tobaccoHabits}</Text>
                </View>
              )}
              {personalDetails?.hobbies && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Hobbies :</Text>
                  <Text style={styles.infoValue}>{personalDetails.hobbies}</Text>
                </View>
              )}
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

      {status !== "accepted" && status !== "rejected" && (
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
                <Text style={styles.declineButtonText}>Decline</Text>
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
                <Text style={styles.acceptButtonText}>Accept</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}

    </SafeAreaView>
  );
};

export default IntrestReceivedProfilePage;
