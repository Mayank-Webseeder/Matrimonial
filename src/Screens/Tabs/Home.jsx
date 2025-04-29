import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Image, SafeAreaView, Text, StatusBar, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/HomeStyle';
import Colors from '../../utils/Colors';
import HeadingWithViewAll from '../../Components/HeadingWithViewAll';
import { Category, communityData, slider } from '../../DummyData/DummyData';
import { ScrollView } from 'react-native-gesture-handler';
import AppIntroSlider from 'react-native-app-intro-slider';
import Globalstyles from '../../utils/GlobalCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { GET_ACTIVIST, GET_ALL_BIODATA_PROFILES, GET_BIODATA, PROFILE_ENDPOINT, NOTIFICATION, HOME_ADVERDISE_WINDOW, PHOTO_URL, BOTTOM_HOME_ADVERDISE_WINDOW, TOP_HOME_ADVERDISE_WINDOW } from '../../utils/BaseUrl';
import { useDispatch } from 'react-redux';
import { setAllBiodata } from '../../ReduxStore/Slices/GetAllBiodataSlice';
import { setBioData } from '../../ReduxStore/Slices/BiodataSlice';
import { useFocusEffect } from '@react-navigation/native';
import { setActivistdata } from '../../ReduxStore/Slices/ActivistSlice';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { setProfiledata } from '../../ReduxStore/Slices/ProfileSlice';
import { reseAllNotification, setAllNotification } from '../../ReduxStore/Slices/GetAllNotificationSlice';
import { SF, SW, SH } from '../../utils/Dimensions';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Video from 'react-native-video';

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
  const isBiodataMissing = Object.keys(MyprofileData?.Biodata || {}).length > 0;
  const isBiodataExpired = profile_data?.serviceSubscriptions?.some(
    (sub) => sub.serviceType === "Biodata" && sub.status === "Expired"
  );

  const isPanditExpired = profile_data?.serviceSubscriptions?.some(
    (sub) => sub.serviceType === "Pandit" && sub.status === "Expired"
  );
  const isJyotishExpired = profile_data?.serviceSubscriptions?.some(
    (sub) => sub.serviceType === "Jyotish" && sub.status === "Expired"
  );
  const isKathavachakExpired = profile_data?.serviceSubscriptions?.some(
    (sub) => sub.serviceType === "Kathavachak" && sub.status === "Expired"
  );

  const partnerPreferences = MyprofileData?.Biodata?.partnerPreferences || null;
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const notifications = useSelector((state) => state.GetAllNotification.AllNotification);
  const notificationCount = notifications ? notifications.length : 0;
  const [NotificationData, setNotificationData] = useState({});

  const isBiodataEmpty = Object.keys(MyprofileData?.Biodata || {}).length === 0;

  const sections = ["dummy"];

  useEffect(() => {
    const expiredServices = [];

    if (isBiodataExpired) expiredServices.push('Biodata');
    if (isPanditExpired) expiredServices.push('Pandit');
    if (isJyotishExpired) expiredServices.push('Jyotish');
    if (isKathavachakExpired) expiredServices.push('Kathavachak');

    if (expiredServices.length > 0) {
      Alert.alert(
        'Subscription Expired',
        `Your ${expiredServices.join(', ')} subscription(s) have expired. Please renew to continue using the services.`,
        [{ text: 'OK', style: 'default' }]
      );
    }
  }, [isBiodataExpired, isPanditExpired, isJyotishExpired, isKathavachakExpired]);


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
      getActivistProfile();
      fetchProfile();
      Top_Advertisement_window();
      Bottom_Advertisement_window();
    }, 2000);
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
      console.error("Error fetching notifications:", error.response ? error.response.data : error.message);
      dispatch(reseAllNotification());
    } finally {
      setIsLoading(false);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      getBiodata();
      GetAll_Notification();
      GetAll_Biodata();
      getActivistProfile();
      fetchProfile();
    }, [])
  );

  useEffect(() => {
    Top_Advertisement_window();
    Bottom_Advertisement_window();
  }, []);


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
      console.error("Error fetching profile:", error.response ? error.response.data : error.message);
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
      console.error("Error fetching biodata:", error);
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
            resolution: mediaItem.resolution, // 👈 yeh add kiya
            mediaType: mediaItem.mediaUrl.includes('.mp4') ? 'video' : 'image', // Determine media type
          }))
        );

        TopsetSlider(fullSliderData);
        console.log("Slider Data:", fullSliderData);
      } else {
        TopsetSlider([]);
      }
    } catch (error) {
      console.error("Error fetching advertisement:", error);
    } finally {
      setLoading(false);
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
            resolution: mediaItem.resolution, // 👈 yeh add kiya
            mediaType: mediaItem.mediaUrl.includes('.mp4') ? 'video' : 'image', // Determine media type
          }))
        );

        BottomsetSlider(fullSliderData);
        console.log("Slider Data:", fullSliderData);
      } else {
        BottomsetSlider([]);
      }
    } catch (error) {
      console.error("Error fetching advertisement:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToProfile = (item) => {
    console.log("item", item);
    if (!navigation.isFocused()) return;

    if (!isBiodataMissing || isBiodataExpired) {
      console.log("Navigating to ShortMatrimonialProfile because Biodata is missing or expired");
      navigation.navigate("ShortMatrimonialProfile", {
        userDetails: item,
      });
    }
    else {
      console.log("Navigating to MatrimonyPeopleProfile");
      navigation.navigate("MatrimonyPeopleProfile", {
        // userDetails: item,
        userId: item?.userId,
        // isSaved: item?.isSaved,
        // isBlur: item?.isBlur
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
      console.error(
        "Error fetching profile:",
        error.response ? error.response.data : error.message
      );
      setLoading(false)
    }
    finally {
      setLoading(false)
    }
  }

  const getActivistProfile = async () => {
    try {
      setIsLoading(true)
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(GET_ACTIVIST, { headers });
      console.log("Activist data", response.data)
      if (response.data && response.data.data && response.data.data) {
        const fetchedData = response.data.data;
        dispatch(setActivistdata(fetchedData));
        setIsLoading(false)
      } else {
        setActivistdata({});
      }
    } catch (error) {
      console.error("Error fetching Activist data:", error);
    }
    finally {
      setIsLoading(false)
    }
  };


  useEffect(() => {
    if (slider.length === 0) return;

    // Handling the top slider change
    const currentSlideTop = slider[currentIndexTop];
    const durationInSecondsTop = currentSlideTop?.duration || 2;
    const durationInMillisecondsTop = durationInSecondsTop * 1000;

    const timeoutTop = setTimeout(() => {
      const nextIndexTop = currentIndexTop < slider.length - 1 ? currentIndexTop + 1 : 0;
      setCurrentIndexTop(nextIndexTop);  // Move top slider
      sliderRefTop.current?.goToSlide(nextIndexTop);
    }, durationInMillisecondsTop);

    return () => clearTimeout(timeoutTop);
  }, [currentIndexTop, slider]);

  useEffect(() => {
    if (slider.length === 0) return;
    const currentSlideBottom = slider[currentIndexBottom];
    const durationInSecondsBottom = currentSlideBottom?.duration || 2;
    const durationInMillisecondsBottom = durationInSecondsBottom * 1000;

    const timeoutBottom = setTimeout(() => {
      const nextIndexBottom = currentIndexBottom < slider.length - 1 ? currentIndexBottom + 1 : 0;
      setCurrentIndexBottom(nextIndexBottom);
      sliderRefBottom.current?.goToSlide(nextIndexBottom);
    }, durationInMillisecondsBottom);

    return () => clearTimeout(timeoutBottom);
  }, [currentIndexBottom, slider]);


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
    <SafeAreaView style={Globalstyles.container}>
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
        ListHeaderComponent={
          <>
            <View style={styles.sliderContainer}>
              <View style={styles.topSlider}>
                <AppIntroSlider
                  ref={sliderRefTop}
                  data={Topslider}
                  renderItem={({ item }) => {
                    const { width, height } = item.resolution;

                    return (
                      <>
                        {item.mediaType === 'video' ? (
                          <Video
                            source={{ uri: item.image }}
                            style={{ width, height }}
                            resizeMode="cover"
                            repeat
                            muted={false}
                            controls={true}
                            paused={false} // autoplay
                          />
                        ) : (
                          <Image
                            source={{ uri: item.image }}
                            style={{ width, height }}
                            resizeMode="cover"
                          />
                        )}
                      </>
                    );
                  }}
                  showNextButton={false}
                  showDoneButton={false}
                  dotStyle={styles.dot}
                  activeDotStyle={styles.activeDot}
                />
              </View>
            </View>
            <View>
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
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>No Matrimonial Profile Created Yet</Text>
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
                  <TouchableOpacity
                    style={styles.CategoryContainer}
                    onPress={() => {
                      if (item.screen) navigation.navigate(item.screen);
                      else console.warn("Screen not specified for this category.");
                    }}
                  >
                    <Image source={item.image} style={styles.images} />
                    <Text style={styles.text}>{item.text}</Text>
                  </TouchableOpacity>
                )}
                horizontal
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
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.bottomSlider}>
              <AppIntroSlider
                ref={sliderRefBottom}
                data={Bottomslider}
                renderItem={({ item }) => {
                  const { width, height } = item.resolution;
                  return (
                    <Image
                      source={{ uri: item.image }}
                      style={{ width, height }}
                    />
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