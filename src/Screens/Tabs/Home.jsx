import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Image, SafeAreaView, Text, StatusBar, ActivityIndicator, Alert, RefreshControl, Linking } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/HomeStyle';
import Colors from '../../utils/Colors';
import HeadingWithViewAll from '../../Components/HeadingWithViewAll';
import { Category, communityData, slider } from '../../DummyData/DummyData';
import AppIntroSlider from 'react-native-app-intro-slider';
import Globalstyles from '../../utils/GlobalCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { GET_ACTIVIST, GET_ALL_BIODATA_PROFILES, GET_BIODATA, PROFILE_ENDPOINT, NOTIFICATION, HOME_ADVERDISE_WINDOW, PHOTO_URL, BOTTOM_HOME_ADVERDISE_WINDOW, TOP_HOME_ADVERDISE_WINDOW } from '../../utils/BaseUrl';
import { useDispatch } from 'react-redux';
import { setAllBiodata } from '../../ReduxStore/Slices/GetAllBiodataSlice';
import { setBioData } from '../../ReduxStore/Slices/BiodataSlice';
import { useFocusEffect } from '@react-navigation/native';
import { resetsetActivistdata, setActivistdata } from '../../ReduxStore/Slices/ActivistSlice';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { setProfiledata } from '../../ReduxStore/Slices/ProfileSlice';
import { reseAllNotification, setAllNotification } from '../../ReduxStore/Slices/GetAllNotificationSlice';
import { SF, SW, SH } from '../../utils/Dimensions';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Video from 'react-native-video';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const sliderRefTop = useRef(null);
  const sliderRefBottom = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [currentIndexTop, setCurrentIndexTop] = useState(0);
  const [currentIndexBottom, setCurrentIndexBottom] = useState(1);
  const [biodata, setBiodata] = useState("");
  const [mybiodata, setMybiodata] = useState("");
  const [allbiodata, setallBiodata] = useState("");
  const [profiledata, setProfileData] = useState({});
  const MyprofileData = useSelector((state) => state.getBiodata);
  const ProfileData = useSelector((state) => state.profile);
  const profile_data = ProfileData?.profiledata || {};
  const [Topslider, TopsetSlider] = useState([]);
  const [Bottomslider, BottomsetSlider] = useState([]);
  const [activitData, setActivitData] = useState({});
  const isBiodataMissing = Object.keys(MyprofileData?.Biodata || {}).length > 0;
  const isBiodataExpired = profile_data?.serviceSubscriptions?.some(
    (sub) => sub.serviceType === "Biodata" && sub.status === "Expired"
  );

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.GetAllNotification.AllNotification);
  const notificationCount = notifications ? notifications.length : 0;
  const [NotificationData, setNotificationData] = useState({});
  const [isVideoPaused, setIsVideoPaused] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mutedMap, setMutedMap] = useState({}); // Per video mute state
  const isBiodataEmpty = Object.keys(MyprofileData?.Biodata || {}).length === 0;

  const sections = ["dummy"];


  useFocusEffect(
    React.useCallback(() => {
      setIsVideoPaused(false);
      return () => setIsVideoPaused(true);
    }, [])
  );

  // Helper to get mute state for current slide
  const isMuted = mutedMap[currentSlide] ?? true;

  const toggleMute = (index) => {
    setMutedMap(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setNotificationData({})
      setMybiodata("")
      setallBiodata("")
      setRefreshing(false);
      getBiodata();
      GetAll_Notification();
      GetAll_Biodata();
      fetchProfile();
      Top_Advertisement_window();
      Bottom_Advertisement_window();
      getActivistProfile();
    }, 2000);
  }, []);


  useEffect(() => {
    if (Topslider.length === 0) return;

    const currentSlideTop = Topslider[currentIndexTop];
    const durationInSecondsTop = Number(currentSlideTop?.duration) || 4;
    const bufferMs = 800;
    const durationInMillisecondsTop = durationInSecondsTop * 1000 + bufferMs;

    console.log("⏱️ Top Duration (sec):", durationInSecondsTop);

    const timeoutTop = setTimeout(() => {
      const nextIndexTop = currentIndexTop < Topslider.length - 1 ? currentIndexTop + 1 : 0;
      setCurrentIndexTop(nextIndexTop);
      sliderRefTop.current?.goToSlide(nextIndexTop);
    }, durationInMillisecondsTop);

    return () => clearTimeout(timeoutTop);
  }, [currentIndexTop, Topslider]);


  useEffect(() => {
    if (Bottomslider.length === 0) return;

    const currentSlideBottom = Bottomslider[currentIndexBottom];
    const durationInSecondsBottom = Number(currentSlideBottom?.duration) || 4;
    const bufferMs = 800;
    const durationInMillisecondsBottom = durationInSecondsBottom * 1000 + bufferMs;
    console.log("⏱️ Bottom Duration (sec):", durationInSecondsBottom);

    const timeoutBottom = setTimeout(() => {
      const nextIndexBottom = currentIndexBottom < Bottomslider.length - 1 ? currentIndexBottom + 1 : 0;
      setCurrentIndexBottom(nextIndexBottom);
      sliderRefBottom.current?.goToSlide(nextIndexBottom);
    }, durationInMillisecondsBottom);

    return () => clearTimeout(timeoutBottom);
  }, [currentIndexBottom, Bottomslider]);

  useFocusEffect(
    React.useCallback(() => {
      getBiodata();
      GetAll_Notification();
      GetAll_Biodata();
      fetchProfile();
      getActivistProfile();
    }, [])
  );

  useEffect(() => {
    Top_Advertisement_window();
    Bottom_Advertisement_window();
    GetAll_Notification();
  }, []);

  const GetAll_Notification = async () => {
    try {
      setIsLoading(true);
      setNotificationData({});
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const res = await axios.get(NOTIFICATION, { headers });
      const notificationData = res.data.data;

      if (notificationData && notificationData.length > 0) {
        setNotificationData(notificationData);
        dispatch(setAllNotification(notificationData));
      } else {
        setNotificationData({});
        dispatch(reseAllNotification());
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching notifications:", errorMsg);

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
      } else {
        setNotificationData({});
        dispatch(reseAllNotification());
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProfile = async () => {
    setProfileData({});
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      console.log("headers in profile", headers);
      const res = await axios.get(PROFILE_ENDPOINT, { headers });
      console.log("API Response:", JSON.stringify(res.data));

      setProfileData(res.data.data);
      dispatch(setProfiledata(res.data.data));

    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching profile:", errorMsg);

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

  const getBiodata = async () => {
    try {
      setLoading(true)
      setMybiodata("")
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(GET_BIODATA, { headers });
      if (response.data) {
        const fetchedData = response.data.data;
        console.log("My bio data in home page", fetchedData);
        setMybiodata(fetchedData);
        dispatch(setBioData(fetchedData));
        setLoading(false)
      } else {
        setBiodata({});
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching biodata:", errorMsg);

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
    finally {
      setLoading(false)
    }
  };


  const Top_Advertisement_window = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(TOP_HOME_ADVERDISE_WINDOW, { headers });

      if (response.data) {
        const fetchedData = response.data.data;
        console.log("fetchedData", JSON.stringify(fetchedData));

        const fullSliderData = fetchedData.flatMap((item) =>
          item.media.map((mediaItem) => ({
            id: `${item._id}_${mediaItem._id}`,
            title: item.title,
            description: item.description,
            image: `${PHOTO_URL}/${mediaItem.mediaUrl}`,
            resolution: mediaItem.resolution,
            mediaType: mediaItem.mediaUrl.includes('.mp4') ? 'video' : 'image',
            hyperlink: mediaItem.hyperlink,
            duration: Number(mediaItem.duration) || 4,
          }))
        );

        TopsetSlider(fullSliderData);
        console.log("top Slider Data:", fullSliderData);
      } else {
        TopsetSlider([]);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching advertisement :", errorMsg);

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

  const Bottom_Advertisement_window = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(BOTTOM_HOME_ADVERDISE_WINDOW, { headers });

      if (response.data) {
        const fetchedData = response.data.data;
        console.log("fetchedData", JSON.stringify(fetchedData));

        const fullSliderData = fetchedData.flatMap((item) =>
          item.media.map((mediaItem) => ({
            id: `${item._id}_${mediaItem._id}`,
            title: item.title,
            description: item.description,
            image: `${PHOTO_URL}/${mediaItem.mediaUrl}`,
            resolution: mediaItem.resolution,
            mediaType: mediaItem.mediaUrl.includes('.mp4') ? 'video' : 'image',
            hyperlink: mediaItem.hyperlink,
            duration: Number(mediaItem.duration) || 4,
          }))
        );

        BottomsetSlider(fullSliderData);
        console.log("Bottom Slider Data:", fullSliderData);
      } else {
        BottomsetSlider([]);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching advertisement :", errorMsg);

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

  const getActivistProfile = async () => {
    try {
      setActivitData({});
      setIsLoading(true);

      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(GET_ACTIVIST, { headers });
      console.log("Activist data", JSON.stringify(response.data));

      if (response.data && response.data.data) {
        const fetchedData = response.data.data;
        setActivitData(fetchedData);
        dispatch(setActivistdata(fetchedData));
      } else {
        setActivitData({});
        dispatch(setActivistdata({}));
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching activist data:", errorMsg);

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
      if (error.response && error.response.status === 400) {
        dispatch(resetsetActivistdata());
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToProfile = (item) => {
    console.log("item?.connectionStatus", item?.connectionStatus);
    if (!navigation.isFocused()) return;

    if (!isBiodataMissing || isBiodataExpired) {
      console.log("Navigating to ShortMatrimonialProfile because Biodata is missing or expired");
      navigation.navigate("ShortMatrimonialProfile", {
        userDetails: item,
        userId: item.userId,
      });
    } else if (item?.connectionStatus === 'received') {
      console.log("Navigating to IntrestReceivedProfilePage");
      navigation.navigate("IntrestReceivedProfilePage", {
        userId: item?.userId,
        isSaved: item?.isSaved,
      });
    } else {
      console.log("Navigating to MatrimonyPeopleProfile");
      navigation.navigate("MatrimonyPeopleProfile", {
        userDetails: item,
        userId: item?.userId,
        isSaved: item?.isSaved,
      });
    }
  };


  const GetAll_Biodata = async () => {
    try {
      setLoading(true)
      setallBiodata("")
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      console.log("headers in profile", headers);
      const res = await axios.get(GET_ALL_BIODATA_PROFILES, { headers });
      const biodata = res.data.feedUsers;
      console.log("res.data.feedUsers", JSON.stringify(res.data.feedUsers))
      setallBiodata(biodata);
      // console.log("biodata", biodata);
      dispatch(setAllBiodata(biodata));
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching biodata:", errorMsg);

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
      setLoading(false)
    }
    finally {
      setLoading(false)
    }
  }

  const TAB_SCREENS = ["Home", "Pandit", "Matrimonial", "BioData", "EventNews", "MyProfile"];
  const DRAWER_SCREENS = ["MainPartnerPrefrence", "Interested Profile", "Saved Profile", "Pandit", "EventNews", "Dharmshala", "Committee", "Activist", "FeedBack", "Jyotish", "Kathavachak", "SuccessStories", "NotificationSettings", "ChangePassword", "PrivacySettings", "InActiveDelete", "AboutUs", "PrivacyPolicy", "TermsConditions", "SubscriptionPolicy", "MyProfile", "SubscriptionHistory", "MySuccessStory"];

  const renderSkeleton = () => (
    <SkeletonPlaceholder>
      <View style={{ marginVertical: SH(20) }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: SW(10) }}>
          {[1, 2, 3, 4].map((_, index) => (
            <View key={index} style={{ width: SW(118), height: SH(115), resizeMode: "cover", borderRadius: 10, }} />
          ))}
        </View>
      </View>
    </SkeletonPlaceholder>
  );

  if (isLoading) {
    return <View style={styles.loading}>
      <ActivityIndicator size={'large'} color={Colors.theme_color} />
    </View>;
  }

  return (
    <SafeAreaView style={Globalstyles.container} edges={['top', 'bottom']} >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={Globalstyles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={require('../../Images/menu.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Home</Text>
        </View>
        <TouchableOpacity style={styles.righticons} onPress={() => navigation.navigate('Notification')}>
          {/* <AntDesign name={'search1'} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} /> */}
          <View style={{ position: 'relative' }}>
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
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sections}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View style={styles.sliderContainer}>
              <AppIntroSlider
                ref={sliderRefTop}
                data={Topslider}
                showPagination={Topslider.length > 1}
                onSlideChange={(index) => {
                  setCurrentSlide(index);
                  setMutedMap(prev => ({ ...prev, [index]: true }));
                }}
                renderItem={({ item, index }) => {
                  const handlePress = () => {
                    if (item.mediaType === 'video') {
                    }
                    if (item.hyperlink) {
                      Linking.openURL(item.hyperlink).catch(err =>
                        console.error("Failed to open URL:", err)
                      );
                    }
                  };

                  return (
                    <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
                      {item.mediaType === 'video' ? (
                        <View style={{ position: 'relative' }}>
                          <Video
                            source={{ uri: item.image }}
                            style={{ width: '100%', height: SH(200)}}
                            resizeMode="contain"
                            repeat
                            muted={isMuted}
                            paused={isVideoPaused}
                            controls={false}
                            ignoreSilentSwitch="ignore"
                          />
                          <TouchableOpacity
                            onPress={() => toggleMute(index)}
                            style={{
                              position: 'absolute',
                              bottom: SH(10),
                              right: SW(20),
                              backgroundColor: 'rgba(0,0,0,0.5)',
                              borderRadius: 20,
                              paddingHorizontal:SW(8),
                              paddingVertical:SH(8)
                            }}
                          >
                            <Ionicons
                              name={isMuted ? 'volume-mute' : 'volume-high'}
                              size={12}
                              color="#fff"
                            />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <Image
                          source={{ uri: item.image }}
                          style={{ width: '100%', height: SH(180) }}
                          resizeMode="cover"
                        />
                      )}
                    </TouchableOpacity>
                  );
                }}
                showNextButton={false}
                showDoneButton={false}
                {...(Topslider.length > 1 && {
                  dotStyle: styles.dot,
                  activeDotStyle: styles.activeDot,
                })}
              />
            </View>
            <View style={{marginTop:-SH(10)}}>
              <HeadingWithViewAll
                heading="MATRIMONY"
                showViewAll={true}
                onViewAllPress={() => {
                  if (isBiodataExpired || isBiodataEmpty) {
                    navigation.navigate('Matrimonial');
                  } else {
                    navigation.navigate('BioData');
                  }
                }}
              />
              {loading ? renderSkeleton() : (
                <FlatList
                  data={allbiodata}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <View style={styles.imageWrapper}>
                      <TouchableOpacity onPress={() => handleNavigateToProfile(item)}>
                        <Image
                          source={
                            item?.personalDetails?.closeUpPhoto
                              ? { uri: item.personalDetails.closeUpPhoto }
                              : require("../../Images/NoImage.png")
                          }
                          style={[styles.ProfileImages]}
                        />
                        {item.verified && (
                          <View style={styles.verifiedContainer}>
                            <Image
                              source={require("../../Images/verified.png")}
                              style={styles.verifiedBadge}
                            />
                            <Text style={styles.verifiedText}>Verified</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                  )}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ flexGrow: 1 }}
                  ListEmptyComponent={
                    <View style={styles.emptyWrapper}>
                      <View style={styles.emptyContainer}>
                        <FontAwesome name="heart-o" size={SW(30)} color={Colors.theme_color} style={{ marginBottom: SH(5) }} />
                        <Text style={styles.emptyText}>No Matrimonial Profile Created Yet</Text>
                        <Text style={styles.infoText}>Create your profile to start finding your perfect match.</Text>
                      </View>
                    </View>
                  }
                />
              )}
            </View>

            {/* PANDIT / JOYTISH / KATHAVACHAK */}
            <View>
              <HeadingWithViewAll heading="PANDIT / JOYTISH / KATHAVACHAK" showViewAll={false} />
              <FlatList
                data={Category}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity
                      style={styles.CategoryContainer}
                      onPress={() => {
                        if (!item?.screen) {
                          console.warn("Screen not specified for this category.");
                          return;
                        }

                        if (TAB_SCREENS.includes(item.screen)) {
                          navigation.navigate("MainApp", {
                            screen: "Tabs",
                            params: { screen: item.screen },
                          });
                        } else if (DRAWER_SCREENS.includes(item.screen)) {
                          navigation.navigate(item.screen);
                        } else {
                          navigation.navigate(item.screen);
                        }
                      }}
                    >
                      <Image source={item.image} style={styles.images} />
                      <Text style={styles.text}>{item.text}</Text>
                    </TouchableOpacity>
                  </View>
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />

            </View>

            {/* BRAHMIN COMMUNITY */}
            <View>
              <HeadingWithViewAll heading="BRAHMIN COMMUNITY" showViewAll={false} />
              <FlatList
                data={communityData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity
                      style={styles.CategoryContainer}
                      onPress={() => {
                        if (item.screen) navigation.navigate(item.screen);
                        else console.warn("Screen not specified");
                      }}
                    >
                      <Image source={item.image} style={styles.images} />
                      <Text style={styles.text}>{item.text}</Text>
                    </TouchableOpacity>
                  </View>
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.bottomSlider}>
              <AppIntroSlider
                ref={sliderRefBottom}
                data={Bottomslider}
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
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
              />
            </View>
          </>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;