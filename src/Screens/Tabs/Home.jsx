import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Image, SafeAreaView, Text, StatusBar, ActivityIndicator, ToastAndroid, Alert } from 'react-native';
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
import { GET_ACTIVIST, GET_ALL_BIODATA_PROFILES, GET_BIODATA, PROFILE_ENDPOINT, NOTIFICATION } from '../../utils/BaseUrl';
import { useDispatch } from 'react-redux';
import { setAllBiodata } from '../../ReduxStore/Slices/GetAllBiodataSlice';
import { setBioData } from '../../ReduxStore/Slices/BiodataSlice';
import { useFocusEffect } from '@react-navigation/native';
import { setActivistdata } from '../../ReduxStore/Slices/ActivistSlice';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { setProfiledata } from '../../ReduxStore/Slices/ProfileSlice';
import Toast from 'react-native-toast-message';
import { setAllNotification } from '../../ReduxStore/Slices/GetAllNotificationSlice';
import { SF, SW, SH } from '../../utils/Dimensions';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [biodata, setBiodata] = useState("");
  const [mybiodata, setMybiodata] = useState("");
  const [allbiodata, setallBiodata] = useState("");
  // const [mybiodata, setMybiodata] = useState("");
  const MyprofileData = useSelector((state) => state.getBiodata);
  const hasBiodata = Object.keys(MyprofileData?.Biodata || {}).length > 0;
  const partnerPreferences = MyprofileData?.Biodata?.partnerPreferences || null;
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profiledata, setProfileData] = useState('');
  const notifications = useSelector((state) => state.GetAllNotification.AllNotification);
  const notificationCount = notifications ? notifications.length : 0;
  // const ProfileData = useSelector((state) => state.profile);
  // const profile_data = ProfileData?.profiledata || {};
  const [connReqNotification,setconnReqNotification] = useState("");
  const [eventPostNotification,seteventPostNotification] =useState("");

  const GetAll_Notification = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const res = await axios.get(NOTIFICATION, { headers });
      const notificationData = res.data.data;
      // console.log("notificationData", JSON.stringify(notificationData));
      dispatch(setAllNotification(notificationData));
    } catch (error) {
      console.error("Error fetching notifications:", error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("MyprofileData", MyprofileData)
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      getBiodata();
      GetAll_Notification();
    }, [])
  );
  
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
  const handleNavigateToProfile = (item) => {
    console.log("item", item);
    if (!navigation.isFocused()) return;
  
    if (!hasBiodata) {
      console.log("Navigating to ShortMatrimonialProfile because Biodata is missing");
      navigation.navigate("ShortMatrimonialProfile", {
        userDetails: item,
      });
    } else {
      console.log("Navigating to MatrimonyPeopleProfile");
      navigation.navigate("MatrimonyPeopleProfile", {
        userDetails: item,
        userId: item?.userId,
        isSaved: item?.isSaved,
        isBlur: item?.isBlur
      });
    }
  };


  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      console.log("headers in profile", headers);
      const res = await axios.get(PROFILE_ENDPOINT, { headers });
      const profiledata=res.data.data;

      console.log("Profile Response:",profiledata);
      setProfileData(profiledata);
      setconnReqNotification(profiledata?.connReqNotification)
      seteventPostNotification(profiledata?.eventPostNotification)
      dispatch(setProfiledata(profiledata));

    } catch (error) {
      console.error("Error fetching profile:", error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const GetAll_Biodata = async () => {
    setLoading(true)
    setallBiodata("")
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      console.log("headers in profile", headers);
      const res = await axios.get(GET_ALL_BIODATA_PROFILES, { headers });
      const biodata = res.data.feedUsers;
      // console.log("res.data.feedUsers", JSON.stringify(res.data.feedUsers))
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

  useFocusEffect(
    React.useCallback(() => {
      GetAll_Biodata();
      getActivistProfile();
    }, [])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < slider.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        sliderRef.current?.goToSlide(currentIndex + 1);
      } else {
        setCurrentIndex(0);
        sliderRef.current?.goToSlide(0);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);


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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sliderContainer}>
          <AppIntroSlider
            ref={sliderRef}
            data={slider}
            renderItem={({ item }) => (
              <View>
                <Image source={item.image} style={styles.sliderImage} />
              </View>
            )}
            showNextButton={false}
            showDoneButton={false}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
          />
        </View>


        <View>
          <HeadingWithViewAll
            heading="MATRIMONY"
            showViewAll={true}
            onViewAllPress={() => {
              if (partnerPreferences) {
                navigation.navigate("BioData");
              } else {
                navigation.navigate("Matrimonial");
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
                      // blurRadius={blurEnabled ? 10 : 0}
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
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No Matrimonial Profile Created Yet</Text>
                </View>
              }
            />

          )}
        </View>

        <View>
          <HeadingWithViewAll
            heading="PANDIT / JOYTISH / KATHAVACHAK"
            showViewAll={false}
          />
          <FlatList
            data={Category}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.CategoryContainer} onPress={() => {
                if (item.screen) {
                  navigation.navigate(item.screen);
                } else {
                  console.warn("Screen not specified for this category.");
                }
              }}
              >
                <Image source={item.image} style={styles.images} />
                <Text style={styles.text}>{item.text}</Text>
              </TouchableOpacity>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <HeadingWithViewAll
            heading="BRAHMIN COMMUNITY"
            showViewAll={false}
          />
          <FlatList
            data={communityData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.CategoryContainer} onPress={() => {
                if (item.screen) {
                  navigation.navigate(item.screen)
                }
                else {
                  console.warn("Screen not specified")
                }
              }}>
                <Image source={item.image} style={styles.images} />
                <Text style={styles.text}>{item.text}</Text>
              </TouchableOpacity>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Image source={require('../../Images/slider.png')} style={Globalstyles.bottomImage} />
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default Home;