import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, SafeAreaView, StatusBar } from 'react-native';
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

const BioData = ({ navigation }) => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [all_profiles, setAllprofiles] = useState({});
  const [isLoading, setIsLoading] = useState("");
  const MatrimonialData = all_profiles?.metrimony || [];
  const savedProfiles = all_profiles?.savedProfiles || [];
  const interestedProfiles = all_profiles?.interestedProfiles || [];
  const allProfiles = all_profiles?.allProfiles || [];
  const [showAllSaved, setShowAllSaved] = useState(false);
  const [showAllMatrimony, setShowAllMatrimony] = useState(false);
  const [showAllInterested, setShowAllInterested] = useState(false);
  const [showAllProfiles, setShowAllProfiles] = useState(false);


  useEffect(() => {
    console.log("savedProfiles", savedProfiles);
  }, [])
  const get_all_mixed_matrimony_profiles = async () => {
    try {
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

  useEffect(() => {
    get_all_mixed_matrimony_profiles();
  }, [])

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
      userId: item._id,
      isSaved: item.isSaved
    });
  };
  const handleNavigateToIntrestedProfile = (item) => {
    navigation.navigate("MatrimonyPeopleProfile", {
      userDetails: item.fromUserBioData,
      userId: item._id,
      isSaved: item.isSaved
    });
  };

  const renderProfileData = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleNavigateToProfile(item)}>
      <Image style={styles.image} source={{ uri: item?.personalDetails?.closeUpPhoto }} />

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item?.personalDetails?.fullname}</Text>

        <View style={styles.row2}>
          <Text style={styles.city}>{item?.personalDetails?.cityOrVillage}</Text>
          <Text style={styles.text}>{item?.personalDetails?.subCaste}</Text>
        </View>

        <Text style={styles.text}>Height: {item?.personalDetails?.heightFeet} ft</Text>
      </View>
    </TouchableOpacity>
  );

  const renderIntrestedProfileData = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleNavigateToIntrestedProfile(item)}>
      <Image style={styles.image} source={{ uri: item?.fromUserBioData?.personalDetails?.closeUpPhoto }} />

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item?.fromUserBioData?.personalDetails?.fullname}</Text>

        <View style={styles.row2}>
          <Text style={styles.city}>{item?.fromUserBioData?.personalDetails?.cityOrVillage}</Text>
          <Text style={styles.text}>{item?.fromUserBioData?.personalDetails?.subCaste}</Text>
        </View>

        <Text style={styles.text}>Height: {item?.fromUserBioData?.personalDetails?.heightFeet} ft</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSavedProfileData = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleNavigateToIntrestedProfile(item)}>
      <Image style={styles.image} source={{ uri: item?.saveProfile?.personalDetails?.closeUpPhoto }} />

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{item?.saveProfile?.personalDetails?.fullname}</Text>

        <View style={styles.row2}>
          <Text style={styles.city}>{item?.saveProfile?.personalDetails?.cityOrVillage}</Text>
          <Text style={styles.text}>{item?.saveProfile?.personalDetails?.subCaste}</Text>
        </View>

        <Text style={styles.text}>Height: {item?.saveProfile?.personalDetails?.heightFeet} ft</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: "row" }}>
          <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} onPress={() => navigation.goBack()} />
          <Text style={Globalstyles.headerText}>Matrimony</Text>
        </View>
        <View style={styles.righticons}>
          <AntDesign name={'bells'} size={20} color={Colors.theme_color} />
          {/* <AntDesign name={'search1'} size={20} color={Colors.theme_color} style={{ marginHorizontal: 10 }} /> */}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
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

        <View>
          <HeadingWithViewAll heading={'MATRIMONY'} headingStyle={{ color: Colors.theme_color }} />

          <FlatList
            data={showAllMatrimony ? MatrimonialData : MatrimonialData.slice(0, 2)} // Show only 2 initially
            renderItem={renderProfileData}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.ProfileContainer}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
          />

          <TouchableOpacity style={styles.viewAll} onPress={() => setShowAllMatrimony(!showAllMatrimony)}>
            <Text style={styles.ViewAllText}>{showAllMatrimony ? 'Show Less' : 'View All'}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <HeadingWithViewAll heading={'Saved Profile'} headingStyle={{ color: Colors.theme_color }} />

          <FlatList
            data={showAllSaved ? savedProfiles : savedProfiles.slice(0, 2)} // Show only 2 initially
            renderItem={renderSavedProfileData}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.ProfileContainer}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
          />

          <TouchableOpacity style={styles.viewAll} onPress={() => setShowAllSaved(!showAllSaved)}>
            <Text style={styles.ViewAllText}>{showAllSaved ? 'Show Less' : 'View All'}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <HeadingWithViewAll heading={'Interested Profile'} headingStyle={{ color: Colors.theme_color }} />

          <FlatList
            data={showAllInterested ? interestedProfiles : interestedProfiles.slice(0, 2)}
            renderItem={renderIntrestedProfileData}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.ProfileContainer}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
          />

          <TouchableOpacity style={styles.viewAll} onPress={() => setShowAllInterested(!showAllInterested)}>
            <Text style={styles.ViewAllText}>{showAllInterested ? 'Show Less' : 'View All'}</Text>
          </TouchableOpacity>
        </View>
        <Image source={require('../../Images/slider.png')} style={styles.Sliderimage} />
        <View>
          <HeadingWithViewAll heading={'All'} headingStyle={{ color: Colors.theme_color }} />

          <FlatList
            data={showAllProfiles ? allProfiles : allProfiles.slice(0, 2)}
            renderItem={renderProfileData}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.ProfileContainer}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
          />

          <TouchableOpacity style={styles.viewAll} onPress={() => setShowAllProfiles(!showAllProfiles)}>
            <Text style={styles.ViewAllText}>{showAllProfiles ? 'Show Less' : 'View All'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BioData;
