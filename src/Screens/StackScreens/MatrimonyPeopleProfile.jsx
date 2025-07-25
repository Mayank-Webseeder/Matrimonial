import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Linking, ActivityIndicator, Share, Switch,
  Modal, Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/LocationStyle';
import Globalstyles from '../../utils/GlobalCss';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios';
import { BOTTOM_BIODATA_ADVERTISE_WINDOW, DeepLink, DELETE_SEND_REQUEST, MATCHED_PROFILE, SAVED_PROFILES, SEND_REQUEST, VERIFY_PROFILE } from '../../utils/BaseUrl';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SF, SH, SW } from '../../utils/Dimensions';
import { showMessage } from 'react-native-flash-message';
import AppIntroSlider from 'react-native-app-intro-slider';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MatrimonyPeopleProfile = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const sliderRef = useRef(null);
  const topSliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slider, setSlider] = useState([]);
  const route = useRoute();
  const { userId, isSaved, id } = route.params || {};
  const profile_id = userId || id || null;
  const [loading, setLoading] = useState(false);
  const [loadingIntrest, setLoadingIntrest] = useState(false);
  const [intrestLoading, setIntrestLoading] = useState(false);
  const MyActivistProfile = useSelector((state) => state.activist.activist_data);
  const [profileData, setProfileData] = useState([]);
  const [userData, setUserData] = useState({});
  const [imageIndex, setImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(isVerified);
  const _id = userData?._id;
  const Biodata_id = userData?.bioDataId || null;
  const notifications = useSelector((state) => state.GetAllNotification.AllNotification);
  const notificationCount = notifications ? notifications.length : 0;
  const isActivist = MyActivistProfile?._id;
  const activistId = MyActivistProfile?._id;
  const isVerified = userData?.verified;
  const verifiedBy = userData?.verifiedBy;
  // console.log("_id", _id);
  const personalDetails = userData?.personalDetails || {};
  const partnerPreferences = userData?.partnerPreferences || {};
  const initialSavedState = profileData?.isSaved || isSaved;
  const [requestId, setRequestId] = useState(null);
  const [status, setStatus] = useState(null);
  const hideContact = userData?.hideContact === true && status === 'accepted'
    ? false
    : !!userData?.hideContact;

  const hideOptionalDetails = userData?.hideOptionalDetails === true && status === 'accepted'
    ? false
    : !!userData?.hideOptionalDetails;
  const isVisible = profileData?.isVisible;
  const isBlur = userData?.isBlur;
  const isBlurCondition = status === 'accepted' ? !isVisible : isBlur;
  const [Save, setIsSaved] = useState(initialSavedState || false);
  const hasOtherDetails = personalDetails?.knowCooking || personalDetails?.dietaryHabit || personalDetails?.smokingHabit || personalDetails?.drinkingHabit || personalDetails?.tobaccoHabits || personalDetails?.hobbies;

  const formattedImages = [
    personalDetails?.closeUpPhoto,
    !hideOptionalDetails && personalDetails?.fullPhoto,
    !hideOptionalDetails && personalDetails?.bestPhoto,
  ]
    .filter(Boolean)
    .map((url) => ({ uri: url }));

  const handleToggle = async () => {
    const newValue = !isSwitchOn;
    setIsSwitchOn(newValue);

    const responseMessage = await VerifiedProfiles(Biodata_id);

    if (responseMessage.includes('verified')) {
      setIsSwitchOn(true);
    } else if (responseMessage.includes('disapproved')) {
      setIsSwitchOn(false);
    }
  };


  useEffect(() => {
    console.log('formattedImages', formattedImages);
    Advertisement_window();
  }, []);


  useEffect(() => {
    if (!formattedImages || formattedImages.length === 0) {return;}

    const bufferMs = 800;
    const duration = (formattedImages[currentIndex]?.duration || 4) * 1000 + bufferMs;

    const timeout = setTimeout(() => {
      const nextIndex =
        currentIndex < formattedImages.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(nextIndex);
      topSliderRef.current?.goToSlide(nextIndex);
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentIndex, formattedImages]);


  useEffect(() => {
    if (slider.length === 0) {return;}

    const currentSlide = slider[currentIndex];
    const durationInSeconds = Number(currentSlide?.duration) || 4;
    const bufferMs = 1000;
    const durationInMilliseconds = durationInSeconds * 1000 + bufferMs;
    console.log('durationInSeconds', durationInSeconds);
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
      if (!token) {
        showMessage({
          type: 'danger',
          message: 'Authentication Error',
          description: 'No token found. Please log in again.',
          duration: 5000,
        });

        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthStack' }],
        });
        return;
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(BOTTOM_BIODATA_ADVERTISE_WINDOW, { headers });

      if (response.data) {
        const fetchedData = response.data.data;
        console.log('fetchedData', JSON.stringify(fetchedData));

        const fullSliderData = fetchedData.flatMap((item) =>
          item.media.map((mediaItem) => ({
            id: `${item._id}_${mediaItem._id}`,
            title: item.title,
            description: item.description,
            image: `https://api-matrimonial.webseeder.tech/${mediaItem.mediaUrl}`,
            resolution: mediaItem.resolution,
            hyperlink: mediaItem.hyperlink,
            duration: mediaItem.duration || 4,
          }))
        );

        setSlider(fullSliderData);
        console.log('Slider Data:', fullSliderData);
      } else {
        setSlider([]);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error('failed to fetch plans :', errorMsg);

      const sessionExpiredMessages = [
        'User does not Exist....!Please login again',
        'Invalid token. Please login again',
        'Token has expired. Please login again',
      ];

      if (sessionExpiredMessages.includes(errorMsg)) {
        await AsyncStorage.removeItem('userToken');
        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthStack' }],
        });
      }
    }
  };

  const VerifiedProfiles = async (Biodata_id) => {
    if (!Biodata_id) {
      showMessage({
        message: 'Error: User ID not found!',
        type: 'danger',
        icon: 'danger',
        duarion: 5000,
      });
      return '';
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {throw new Error('No token found');}

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${VERIFY_PROFILE}/${Biodata_id}`, {}, { headers });

      console.log('Response Data:', JSON.stringify(response?.data));

      const message = response?.data?.message || '';
      if (message.toLowerCase().includes('verified')) {
        showMessage({
          message: 'Matrimonial Profile Approved ✅',
          type: 'success',
          icon: 'success',
          duarion: 5000,
        });
      }
      else if (message.toLowerCase().includes('disapproved')) {
        showMessage({
          message: 'Matrimonial Profile Disapproved ❌',
          type: 'danger',
          icon: 'danger',
          duarion: 5000,
        });
      }
      else {
        showMessage({
          message: message,
          type: 'success',
          icon: 'success',
          duarion: 5000,
        });
      }

      return message;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error('Error fetching biodata:', errorMsg);
      showMessage({
        message: errorMsg,
        type: 'danger',
        icon: 'danger',
        duarion: 5000,
      });
      const sessionExpiredMessages = [
        'User does not Exist....!Please login again',
        'Invalid token. Please login again',
        'Token has expired. Please login again',
      ];

      if (sessionExpiredMessages.includes(errorMsg)) {
        await AsyncStorage.removeItem('userToken');
        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthStack' }],
        });
      }
      return '';
    }
  };
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


  // console.log("MyprofileData", MyprofileData);

  useFocusEffect(
    useCallback(() => {
      // console.log("====== Profile Data Debug ======");
      // console.log("isVerified:", userData?.verified);
      // console.log("verifiedBy:", userData?.verifiedBy);
      // console.log("initialSavedState:", profileData?.isSaved);
      // console.log("status:", profileData?.requestStatus);
      // console.log("requestId:", profileData?.requestId);
      // console.log("isBlur:", userData?.isBlur);
      // console.log("userId:", userData?.userId);
      // console.log("userData?.personalDetails", userData?.personalDetails);
      if (profile_id) {
        console.log('profile_id', profile_id);
        fetchUserProfile(profile_id);
      }
    }, [profile_id, isBlur])
  );

  const fetchUserProfile = async (id) => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {throw new Error('No token found');}

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    try {
      setLoading(true);
      const response = await axios.get(`${MATCHED_PROFILE}/${id}`, { headers });
      console.log('response', JSON.stringify(response.data));

      if (response.data.status) {
        setUserData(response?.data?.targetUserBioData);
        setProfileData(response.data);
        setStatus(profileData?.requestStatus || null);
        setRequestId(response.data?.requestId || null);
      } else {
        setProfileData(null);
        setUserData(null);
        setLoading(false);
        Alert.alert('Error', 'User account has been deleted or no biodata available.');
      }
    } catch (error) {
      console.error('❌ Error fetching profile');

      if (error.response) {
        const errorMsg = error.response?.data?.message || error.message;
        console.error('Error fetching biodata:', errorMsg);
        if (errorMsg === 'Target user has not set any biodata or personal details.') {
          setProfileData(null);
          setUserData(null);
          setLoading(false);
        }
      } else if (error.request) {
        console.error('📡 No response received from server.');
        console.error('Request Details:', error.request);
      } else {
        console.error('⚠️ Error Message:', error.message);
      }
      const sessionExpiredMessages = [
        'User does not Exist....!Please login again',
        'Invalid token. Please login again',
        'Token has expired. Please login again',
      ];

      if (sessionExpiredMessages.includes(errorMsg)) {
        await AsyncStorage.removeItem('userToken');
        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthStack' }],
        });
      }

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };


  const sendInterestRequest = async () => {
    setLoadingIntrest(true);

    if (!userId) {
      showMessage({
        type: 'danger',
        message: 'Error',
        description: 'User ID not found!',
        duration: 5000,
      });
      setLoadingIntrest(false);
      return;
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {throw new Error('No token found');}

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.post(`${SEND_REQUEST}/${userId}`, {}, { headers });

      if (response.status === 200 && response.data.status === true) {
        const newRequestId = response.data?.data?._id;

        setRequestId(newRequestId);
        setStatus('pending');

        showMessage({
          type: 'success',
          message: 'Success',
          description: response.data.message,
          duration: 3000,
        });
      } else {
        throw new Error('Unexpected response from server!');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      showMessage({
        type: 'danger',
        message: 'Error',
        description: errorMsg || 'Failed to send interest!',
      });

      const sessionExpiredMessages = [
        'User does not Exist....!Please login again',
        'Invalid token. Please login again',
        'Token has expired. Please login again',
      ];
      if (sessionExpiredMessages.includes(errorMsg)) {
        await AsyncStorage.removeItem('userToken');
        navigation.reset({ index: 0, routes: [{ name: 'AuthStack' }] });
      }
    } finally {
      setLoadingIntrest(false);
    }
  };

  const DeleteIntrest = async (requestId) => {
    setIntrestLoading(true);
    if (!requestId) {return;}

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {throw new Error('No token found');}

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.delete(`${DELETE_SEND_REQUEST}/${requestId}`, { headers });

      if (response.status === 200 && response.data.status === true) {
        setRequestId(null);
        setStatus(null);

        showMessage({
          type: 'success',
          message: 'Interest removed successfully!',
          duration: 3000,
        });
      } else {
        throw new Error(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      showMessage({
        type: 'danger',
        message: 'Error',
        description: errorMsg,
      });

      const sessionExpiredMessages = [
        'User does not Exist....!Please login again',
        'Invalid token. Please login again',
        'Token has expired. Please login again',
      ];
      if (sessionExpiredMessages.includes(errorMsg)) {
        await AsyncStorage.removeItem('userToken');
        navigation.reset({ index: 0, routes: [{ name: 'AuthStack' }] });
      }
    } finally {
      setIntrestLoading(false);
    }
  };

  const savedProfiles = async () => {
    if (!_id) {
      showMessage({
        message: 'Error: User ID not found!',
        type: 'danger',
        icon: 'danger',
        duarion: 5000,
      });
      return;
    }

    setIsSaved((prev) => !prev);

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found');
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${SAVED_PROFILES}/${_id}`, {}, { headers });

      console.log('Response Data:', JSON.stringify(response?.data));

      if (response?.data?.message) {
        showMessage({
          message: response.data.message,
          type: 'success',
          icon: 'success',
          duarion: 5000,
        });
        if (response.data.message === 'Profile saved successfully.') {
          setIsSaved(true);
        } else {
          setIsSaved(false);
        }
      } else {
        showMessage({
          message: 'Something went wrong!',
          type: 'danger',
          icon: 'danger',
          duarion: 5000,
        });
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error('Error fetching biodata:', errorMsg);

      const sessionExpiredMessages = [
        'User does not Exist....!Please login again',
        'Invalid token. Please login again',
        'Token has expired. Please login again',
      ];

      if (sessionExpiredMessages.includes(errorMsg)) {
        await AsyncStorage.removeItem('userToken');
        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthStack' }],
        });
      }
      showMessage({
        message: errorMsg,
        type: 'danger',
        icon: 'danger',
        duarion: 5000,
      });
    }
  };

  const shareProfiles = async () => {
    const profileType = 'Biodata';

    console.log('userId', userId);

    try {
      if (!userId) {throw new Error('Missing profile ID');}

      const directLink = `${DeepLink}/${profileType}/${userId}`;

      await Share.share({
        message: `Check this profile in Brahmin Milan app:\n${directLink}`,
      });
    } catch (error) {
      console.error('Sharing failed:', error?.message || error);
    }
  };

  // Map API comparisonResults to UI labels
  const comparisonResults = profileData?.comparisonResults || {};
  const totalCriteria = Object.keys(comparisonResults).length;
  const matchedCount = Object.values(comparisonResults).filter(value => value).length;
  const matchPercentage = totalCriteria > 0 ? Math.round((matchedCount / totalCriteria) * 100) : 0;

  const calculateAge = (dob) => {
    if (!dob) {return 'N/A';}
    const birthDate = moment(dob);
    const currentDate = moment();
    return currentDate.diff(birthDate, 'years');
  };


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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

  const formattedHeight = personalDetails?.heightFeet
    ?.replace(/\s*-\s*/, '')
    ?.replace(/\s+/g, '');


  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.reset({
            index: 0,
            routes: [{ name: 'MainApp' }],
          })}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>{personalDetails?.fullname}</Text>
        </View>
        <View style={styles.righticons}>
          <TouchableOpacity style={{ position: 'relative' }} onPress={() => navigation.navigate('Notification')}>
            <AntDesign
              name="bells"
              size={25}
              color={Colors.theme_color}
            />
            {notificationCount > 0 && (
              <View
                style={{
                  position: 'absolute',
                  right: -5,
                  top: -5,
                  width: SW(16),
                  height: SW(16),
                  borderRadius: SW(16) / 2,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontSize: SF(9), fontFamily: 'Poppins-Bold' }}>
                  {notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={Globalstyles.sliderContainer}>
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
            <Modal visible={modalVisible} transparent={true} animationType="fade" onRequestClose={() => setModalVisible(false)}>
              <ImageViewer
                imageUrls={formattedImages.map(img => ({ url: img.uri }))}
                index={imageIndex}
                onSwipeDown={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
                enableSwipeDown={true}
                enablePreload={true}
                saveToLocalByLongPress={false}
                renderIndicator={(currentIndex, allSize) => (
                  <View style={{
                    position: 'absolute',
                    top: SH(30),
                    alignSelf: 'center',
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    paddingHorizontal: SW(8),
                    borderRadius: 5,
                    paddingVertical: SH(8),
                    zIndex: 999,
                  }}>
                    <Text style={{ color: 'white', fontSize: SF(16), fontWeight: 'bold' }}>
                      {currentIndex} / {allSize}
                    </Text>
                  </View>
                )}
                renderImage={(props) => (
                  <Image
                    {...props}
                    resizeMode="contain"
                    style={{ width: '100%', height: '100%' }}
                    blurRadius={isBlurCondition ? 10 : 0} // 👈 Add blur here conditionally
                  />
                )}
                backgroundColor="rgba(0,0,0,0.95)"
              />
            </Modal>

          </View>


          {isActivist ? (
            <View style={styles.verifiedContainer}>
              {isVerified ? (
                <>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Image
                      source={require('../../Images/verified.png')}
                      style={styles.verifiedBadge}
                    />
                    <Text style={[styles.verifiedText, { paddingHorizontal: SW(5), paddingVertical: SH(3) }]}> Already Verified</Text>
                  </View>

                  {verifiedBy === activistId && (
                    <Switch
                      value={isSwitchOn}
                      onValueChange={handleToggle}
                      thumbColor={isSwitchOn ? '#4CAF50' : '#767577'}
                      trackColor={{ false: '#f4f3f4', true: '#4CAF50' }}
                    />
                  )}
                </>
              ) : (
                <>
                  <Text style={styles.verifiedText}>Verify Profile</Text>
                  <Switch
                    value={isSwitchOn}
                    onValueChange={handleToggle}
                    thumbColor={isSwitchOn ? '#4CAF50' : '#767577'}
                    trackColor={{ false: '#f4f3f4', true: '#4CAF50' }}
                  />
                </>
              )}
            </View>
          ) : (
            isVerified && (
              <View style={[styles.verifiedContainer, { top: SH(320), left: SW(275), width: SW(80) }]}>
                <Image
                  source={require('../../Images/verified.png')}
                  style={styles.verifiedBadge}
                />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )
          )}
          <View style={styles.flexContainer}>
            <View style={styles.flex}>
              <Text style={styles.Idtext}>
                {'ID NO. :-'.toUpperCase()} {userData?.bioDataId}
              </Text>

              {matchPercentage > 0 && (
                <Text style={styles.toptext}>
                  {matchPercentage}% Compatible according to your preference
                </Text>
              )}
            </View>
            <View style={styles.sharecontainer}>
              <TouchableOpacity style={styles.iconContainer} onPress={() => savedProfiles()}>
                <FontAwesome
                  name={Save ? 'bookmark' : 'bookmark-o'}
                  size={19}
                  color={Colors.theme_color}
                />
                <Text style={styles.iconText}>{Save ? 'Saved' : 'Save'}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconContainer} onPress={shareProfiles}>
                <Feather name={'send'} size={19} color={Colors.theme_color} />
                <Text style={styles.iconText}>Share</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.interestedButton}
                onPress={requestId ? () => DeleteIntrest(requestId) : sendInterestRequest}
                disabled={
                  status === 'accepted' ||
                  status === 'rejected' ||
                  (requestId ? intrestLoading : loadingIntrest)
                }
              >
                {(requestId ? intrestLoading : loadingIntrest) ? (
                  <ActivityIndicator size="small" color={Colors.theme_color} />
                ) : (
                  <Text style={styles.buttonText}>
                    {status === 'accepted' || status === 'rejected' ? (
                      status.charAt(0).toUpperCase() + status.slice(1)
                    ) : requestId ? (
                      'Cancel Interest'
                    ) : (
                      'Send Interest'
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
                <MaterialIcons name={'call'} size={19} color={Colors.theme_color} />
                <Text style={styles.iconText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ReportPage', { profileId: _id })}>
                <MaterialIcons name={'error-outline'} size={20} color={Colors.theme_color} />
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
              <Text style={styles.text}>{calculateAge(personalDetails?.dob)} Yrs, {formattedHeight} </Text>
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
              {personalDetails?.occupation && <Text style={[styles.text, { textTransform: 'none' }]}>{personalDetails?.occupation}</Text>}
              {personalDetails?.annualIncome && <Text style={[styles.text, { textTransform: 'none' }]}>{personalDetails?.annualIncome} </Text>}
              {personalDetails?.qualification && <Text style={[styles.text, { textTransform: 'none' }]}>{personalDetails?.qualification}</Text>}
            </View>
          </View>

          {/* Horoscope Section */}
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
                  <Text style={styles.infoValue}>{moment(personalDetails.dob).format('DD-MM-YYYY')} / Time: {personalDetails?.timeOfBirth}</Text>
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

          {/* About Me Section */}
          {!hideOptionalDetails && (
            <View style={styles.familyDiv}>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
                  <MaterialCommunityIcons name="account-box-outline" size={25} color={Colors.theme_color} />
                  <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>About Me</Text>
                </View>

                {personalDetails?.aboutMe?.trim() !== '' && (
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
          )}

          {/* Family Section */}
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

          {/* Contact Section */}
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


          {/* Other Details */}
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
                  <Text style={styles.label}>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
                  {profileData.comparisonResults[key] ? (
                    <MaterialIcons name={'check'} style={[styles.icon, styles.checkIcon]} />
                  ) : (
                    <MaterialIcons name={'close'} style={[styles.icon, styles.crossIcon]} />
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
                      console.error('Failed to open URL:', err)
                    );
                  }
                };

                return (
                  <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
                    <Image
                      source={{ uri: item.image }}
                      style={{ width: '100%', height: SH(180), resizeMode: 'contain' }}
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MatrimonyPeopleProfile;
