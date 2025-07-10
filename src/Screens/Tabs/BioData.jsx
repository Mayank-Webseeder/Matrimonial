import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, SafeAreaView, StatusBar, ActivityIndicator, RefreshControl, Linking } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { slider } from '../../DummyData/DummyData';
import styles from '../StyleScreens/BioDataStyle';
import AppIntroSlider from 'react-native-app-intro-slider';
import HeadingWithViewAll from '../../Components/HeadingWithViewAll';
import { SavedProfileData } from '../../DummyData/DummyData';
import Globalstyles from '../../utils/GlobalCss';
import { BIODATA_ADVERTISE_WINDOW, BOTTOM_BIODATA_ADVERTISE_WINDOW, MATRIMONY_SUMMRARY, TOP_BIODATA_ADVERTISE_WINDOW } from '../../utils/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { SH, SW, SF } from '../../utils/Dimensions';
import { useFocusEffect } from '@react-navigation/native';
import { PHOTO_URL } from '../../utils/BaseUrl';
import { useSelector } from 'react-redux';
const BioData = ({ navigation }) => {
  const [currentIndexTop, setCurrentIndexTop] = useState(0); // For Top Slider
  const [currentIndexBottom, setCurrentIndexBottom] = useState(1); // For Bottom Slider (starts from index 1)
  const sliderRefTop = useRef(null);
  const sliderRefBottom = useRef(null);
  const [Topslider, TopsetSlider] = useState([]);
  const [Bottomslider, BottomsetSlider] = useState([]);
  const [all_profiles, setAllprofiles] = useState({});
  const [isLoading, setIsLoading] = useState("");
  const MatrimonialData = all_profiles?.metrimony || [];
  const savedProfiles = all_profiles?.savedProfiles || [];
  const interestedProfiles = all_profiles?.interestedProfiles || [];
  const allProfiles = all_profiles?.allProfiles || [];
  const notifications = useSelector((state) => state.GetAllNotification.AllNotification);
  const notificationCount = notifications ? notifications.length : 0;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    get_all_mixed_matrimony_profiles();
    Top_Advertisement_window();
    Bottom_Advertisement_window();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      get_all_mixed_matrimony_profiles();
      Top_Advertisement_window();
      Bottom_Advertisement_window();
    }, [])
  );

  useEffect(() => {
    Top_Advertisement_window();
    Bottom_Advertisement_window();
  }, []);


  const get_all_mixed_matrimony_profiles = async () => {
    try {
      setAllprofiles({});
      setIsLoading(true)
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(MATRIMONY_SUMMRARY, { headers });
      console.log("MATRIMONY_SUMMRARY", response.data)
      if (response.data) {
        const fetchedData = response.data;
        console.log("fetchedData", JSON.stringify(response.data))
        setAllprofiles(fetchedData);
        setIsLoading(false)
      } else {
        setAllprofiles({});
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
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (slider.length === 0) return;

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

  const Top_Advertisement_window = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(TOP_BIODATA_ADVERTISE_WINDOW, { headers });

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
            hyperlink: mediaItem.hyperlink,
          }))
        );

        TopsetSlider(fullSliderData);
        console.log("Slider Data:", fullSliderData);
      } else {
        TopsetSlider([]);
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

  const Bottom_Advertisement_window = async () => {
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
            image: `${PHOTO_URL}/${mediaItem.mediaUrl}`,
            resolution: mediaItem.resolution, // 👈 yeh add kiya
            mediaType: mediaItem.mediaUrl.includes('.mp4') ? 'video' : 'image', // Determine media type
            hyperlink: mediaItem.hyperlink,
          }))
        );

        BottomsetSlider(fullSliderData);
        console.log("Slider Data:", fullSliderData);
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

  const renderItem = ({ item }) => {
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
            style={{ width:"100%", height:SH(180) , resizeMode: 'contain' }}
        />
      </TouchableOpacity>
    );
  };

  const handleNavigateToProfile = (item) => {
    if (item?.connectionStatus === 'received') {
      navigation.navigate('IntrestReceivedProfilePage', {
        userId: item?.userId,
        isSaved: item?.isSaved,
      });
    } else {
      navigation.navigate('MatrimonyPeopleProfile', {
        userId: item?.userId,
        isSaved: item?.isSaved,
      });
    }
  };



  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = moment(dob);
    const currentDate = moment();
    return currentDate.diff(birthDate, "years");
  };


  const renderProfileData = ({ item }) => {
    const formattedHeight = item?.personalDetails?.heightFeet
      ?.replace(/\s*-\s*/, "")
      ?.replace(/\s+/g, "");
    const isBlur = item?.isBlur;
    const status = item?.status;
    const isVisible = item?.isVisible;
    const isBlurCondition = status === "accepted" ? !isVisible : isBlur;

    return (
      <TouchableOpacity style={styles.card} onPress={() => handleNavigateToProfile(item)}>
        <Image style={styles.image} source={{ uri: item?.personalDetails?.closeUpPhoto }}
          blurRadius={isBlurCondition ? 5 : 0} />

        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{item?.personalDetails?.fullname}</Text>

          <View style={styles.row2}>
            <Text style={styles.city}>{item?.personalDetails?.cityOrVillage}</Text>
            <Text style={styles.text}>{item?.personalDetails?.subCaste}</Text>
          </View>

          <View style={styles.row2}>
            <Text style={styles.text}>Height: {formattedHeight}</Text>
            <Text style={styles.text}>{calculateAge(item?.personalDetails?.dob)} Years</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.theme_color} />
      </View>
    );
  }

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: "row" }}>
          <MaterialIcons name={'arrow-back-ios-new'} size={25} color={Colors.theme_color} onPress={() => navigation.goBack()} />
          <Text style={Globalstyles.headerText}>Matrimony</Text>
        </View>
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
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={styles.sliderContainer}>
          <AppIntroSlider
            ref={sliderRefTop}
            data={Topslider}
            renderItem={renderItem}
            showNextButton={false}
            showDoneButton={false}
            dotStyle={Globalstyles.dot}
            activeDotStyle={Globalstyles.activeDot}
          />
        </View>

        {MatrimonialData.length > 0 ? (
          <View style={{ marginVertical: SH(5) }}>
            <HeadingWithViewAll heading={'Your Preferenced Profiles'} headingStyle={{ color: Colors.theme_color }} />

            <FlatList
              // data={showAllMatrimony ? MatrimonialData : MatrimonialData.slice(0, 2)}
              data={MatrimonialData}
              renderItem={renderProfileData}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.ProfileContainer}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            />

            {/* <TouchableOpacity style={styles.viewAll} onPress={() => setShowAllMatrimony(!showAllMatrimony)}>
              <Text style={styles.ViewAllText}>{showAllMatrimony ? 'Show Less' : 'View All'}</Text>
            </TouchableOpacity> */}
          </View>
        ) : (
          null
        )}

        {savedProfiles.length > 0 ? (
          <View style={{ marginVertical: SH(5) }}>
            <HeadingWithViewAll heading={'Saved Profile'} headingStyle={{ color: Colors.theme_color }} />

            <FlatList
              // data={showAllSaved ? savedProfiles : savedProfiles.slice(0, 2)}
              data={savedProfiles}
              renderItem={renderProfileData}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.ProfileContainer}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            />

            {/* <TouchableOpacity style={styles.viewAll} onPress={() => setShowAllSaved(!showAllSaved)}>
              <Text style={styles.ViewAllText}>{showAllSaved ? 'Show Less' : 'View All'}</Text>
            </TouchableOpacity> */}
          </View>
        ) : (
          null
        )}

        {interestedProfiles.length > 0 ? (
          <View style={{ marginVertical: SH(5) }}>
            <HeadingWithViewAll heading={'Interested Profile'} headingStyle={{ color: Colors.theme_color }} />

            <FlatList
              // data={showAllInterested ? interestedProfiles : interestedProfiles.slice(0, 2)}
              data={interestedProfiles}
              renderItem={renderProfileData}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.ProfileContainer}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            />

            {/* <TouchableOpacity style={styles.viewAll} onPress={() => setShowAllInterested(!showAllInterested)}>
              <Text style={styles.ViewAllText}>{showAllInterested ? 'Show Less' : 'View All'}</Text>
            </TouchableOpacity> */}
          </View>
        ) : (
          null
        )}

        {allProfiles.length > 0 ? (
          <View style={{ marginVertical: SH(5) }}>
            <HeadingWithViewAll heading={'All'} headingStyle={{ color: Colors.theme_color }} />

            <FlatList
              // data={showAllProfiles ? allProfiles : allProfiles.slice(0, 2)}
              data={allProfiles}
              renderItem={renderProfileData}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.ProfileContainer}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            />

            {/* <TouchableOpacity style={styles.viewAll} onPress={() => setShowAllProfiles(!showAllProfiles)}>
              <Text style={styles.ViewAllText}>{showAllProfiles ? 'Show Less' : 'View All'}</Text>
            </TouchableOpacity> */}
          </View>
        ) : (
          null
        )}
        <View style={Globalstyles.bottomImage}>
          <AppIntroSlider
            ref={sliderRefBottom}
            data={Bottomslider}
            renderItem={renderItem}
            showNextButton={false}
            showDoneButton={false}
            dotStyle={Globalstyles.dot}
            activeDotStyle={Globalstyles.activeDot}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BioData;
