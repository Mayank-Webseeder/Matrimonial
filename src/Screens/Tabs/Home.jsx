import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Image, SafeAreaView, Text, StatusBar } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/HomeStyle';
import Colors from '../../utils/Colors';
import HeadingWithViewAll from '../../Components/HeadingWithViewAll';
import { profileImages, Category, communityData, slider } from '../../DummyData/DummyData';
import { ScrollView } from 'react-native-gesture-handler';
import AppIntroSlider from 'react-native-app-intro-slider';
import Globalstyles from '../../utils/GlobalCss';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { PROFILE_ENDPOINT } from '../../utils/BaseUrl';
import { setProfiledata } from '../../ReduxStore/Slices/ProfileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {

  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      console.log("headers in profile", headers);
      const res = await axios.get(PROFILE_ENDPOINT, { headers });
      const ProfileData = res.data.data;

      dispatch(setProfiledata(ProfileData));
      console.log("ProfileData", ProfileData);
    } catch (error) {
      console.error(
        "Error fetching profile:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [])

  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
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
        <View style={styles.righticons}>
          {/* <AntDesign name={'search1'} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} /> */}
          <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => { navigation.navigate('Notification') }} />
        </View>
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
            onViewAllPress={() => navigation.navigate('Matrimonial')}
          />

          <FlatList
            data={profileImages}
            keyExtractor={(item) => item.id} a
            renderItem={({ item }) => (
              <View style={styles.imageWrapper}>
                <TouchableOpacity onPress={() => {
                  if (item.screen) {
                    navigation.navigate(item.screen);
                  } else {
                    console.warn("Screen not specified for this category.");
                  }
                }}
                >
                  <Image source={item.image} style={styles.ProfileImages} />
                </TouchableOpacity>
              </View>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
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
    </SafeAreaView>
  );
};

export default Home;
