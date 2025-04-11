import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, SafeAreaView, StatusBar, ActivityIndicator, RefreshControl } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { slider } from '../../DummyData/DummyData';
import styles from '../StyleScreens/BioDataStyle';
import AppIntroSlider from 'react-native-app-intro-slider';
import HeadingWithViewAll from '../../Components/HeadingWithViewAll';
import { SavedProfileData } from '../../DummyData/DummyData';
import Globalstyles from '../../utils/GlobalCss';
import { MATRIMONY_SUMMRARY } from '../../utils/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { SH } from '../../utils/Dimensions';
import { useFocusEffect } from '@react-navigation/native';

const BioData = ({ navigation }) => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [all_profiles, setAllprofiles] = useState({});
  const [isLoading, setIsLoading] = useState("");
  const MatrimonialData = all_profiles?.metrimony || [];
  const savedProfiles = all_profiles?.savedProfiles || [];
  const interestedProfiles = all_profiles?.interestedProfiles || [];
  const allProfiles = all_profiles?.allProfiles || [];

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    get_all_mixed_matrimony_profiles();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
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
      console.error("Error fetching biodata:", error);
    }
    finally {
      setIsLoading(false)
    }
  };

  useFocusEffect(
    useCallback(() => {
      get_all_mixed_matrimony_profiles();
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

  const renderItem = ({ item }) => {
    return (
      <View>
        <Image source={item.image} style={styles.sliderImage} />
      </View>
    );
  };


  const handleNavigateToProfile = (item) => {
    navigation.navigate("MatrimonyPeopleProfile", {
      userDetails: item,
      userId: item?.userId,
      isSaved: item.isSaved,
      isBlur: item?.isBlur,
      isVisible: item?.isVisible,
      status: item?.status,
      requestId: item?.requestId,
    });
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

  const IntrestProfileData = ({ item }) => {
    const formattedHeight = item?.personalDetails?.heightFeet
      ?.replace(/\s*-\s*/, "")
      ?.replace(/\s+/g, "");
    const isBlur = item?.isBlur;
    const status = item?.status;
    const isVisible = item?.isVisible;
    const isBlurCondition = status === "accepted" ? !isVisible : isBlur;

    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("IntrestReceivedProfilePage", {
        userId: item?.userId,
        requestId: item?.requestId,
        biodata: item
      })}>
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
        <TouchableOpacity style={styles.righticons} onPress={() => navigation.navigate("Notification")}>
          <AntDesign name={'bells'} size={25} color={Colors.theme_color} />
          {/* <AntDesign name={'search1'} size={20} color={Colors.theme_color} style={{ marginHorizontal: 10 }} /> */}
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View style={styles.sliderContainer}>
          <AppIntroSlider
            ref={sliderRef}
            data={slider}
            renderItem={renderItem}
            showNextButton={false}
            showDoneButton={false}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            onSlideChange={(index) => setCurrentIndex(index)}
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
              renderItem={IntrestProfileData}
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
        <Image source={require('../../Images/slider.png')} style={styles.Sliderimage} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BioData;
