import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, FlatList, Image, SafeAreaView, Text, StatusBar, ActivityIndicator } from 'react-native';
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
import { GET_ALL_BIODATA_PROFILES, GET_BIODATA, GET_ACTIVIST } from '../../utils/BaseUrl';
import { useDispatch } from 'react-redux';
import { setAllBiodata } from '../../ReduxStore/Slices/GetAllBiodataSlice';
import { setActivistdata } from '../../ReduxStore/Slices/ActivistSlice';
import { setBioData } from '../../ReduxStore/Slices/BiodataSlice';
import { useFocusEffect } from '@react-navigation/native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { SH, SW } from '../../utils/Dimensions';
import { useSelector } from 'react-redux';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allbiodata, setallbiodata] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const [loading, setLoading] = useState(false);
  // const allBiodata = useSelector((state) => state.getAllBiodata.allBiodata) || [];
  // console.log("allbiodata", allBiodata);


  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      setIsMounted(true);

      const fetchAllData = async () => {
        try {
          setLoading(true);
          const token = await AsyncStorage.getItem("userToken");
          if (!token) throw new Error("No token found");

          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          };

          // Fetch Biodata Profiles
          const biodataRes = await axios.get(GET_ALL_BIODATA_PROFILES, { headers });
          if (biodataRes.data && isActive) {
            setallbiodata(biodataRes.data.feedUsers || []);
          }

          // Fetch User Biodata (Redux State Update)
          const userBiodataRes = await axios.get(GET_BIODATA, { headers });
          if (userBiodataRes.data && isActive) {
            dispatch(setBioData(userBiodataRes.data.data));
          }

          // Fetch Activist Data (Redux State Update)
          const activistRes = await axios.get(GET_ACTIVIST, { headers });
          if (activistRes.data && isActive) {
            dispatch(setActivistdata(activistRes.data.data));
          }

        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          if (isActive) setLoading(false);
        }
      };

      fetchAllData();

      return () => {
        isActive = false;
        setIsMounted(false);
      };
    }, [dispatch])
  );



  useEffect(() => {
    let isActive = true;
    setIsMounted(true);

    return () => {
      isActive = false;
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    return () => setallbiodata([]); 
  }, []);


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


  const handleNavigateToProfile = (item) => {
    if (!navigation.isFocused()) return;
    navigation.navigate("MatrimonyPeopleProfile", {
      userDetails: item,
      userId: item.userId,
    });
  };


  const renderItem = useCallback(({ item }) => (
    <View style={styles.imageWrapper}>
      <TouchableOpacity onPress={() => handleNavigateToProfile(item)}>
        <Image
          source={
            item.personalDetails?.closeUpPhoto
              ? { uri: item.personalDetails.closeUpPhoto }
              : require("../../Images/profile3.png")
          }
          style={styles.ProfileImages}
        />
      </TouchableOpacity>
    </View>
  ), [isMounted, navigation]);

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={Globalstyles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={require('../../Images/menu.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Home</Text>
        </View>
        <View style={styles.righticons}>
          <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => navigation.navigate('Notification')} />
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

        <HeadingWithViewAll
          heading="MATRIMONY"
          showViewAll={true}
          onViewAllPress={() => navigation.navigate('Matrimonial')}
        />
        <View>
          {loading ? (
            <ActivityIndicator size="large" color={Colors.theme_color} />
          ) : (
            <View style={{ flex: 1 }}>
              <FlatList
                data={allbiodata.length > 0 ? allbiodata : []} 
                keyExtractor={(item) => item?._id?.toString() || Math.random().toString()} 
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                removeClippedSubviews={false}
              />
            </View>
          )}
        </View>

        <View>
          <HeadingWithViewAll
            heading="PANDIT / JOYTISH / KATHAVACHAK"
            showViewAll={false}
          />
          <View style={{ flex: 1 }}>
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
        </View>
        <View>
          <HeadingWithViewAll
            heading="BRAHMIN COMMUNITY"
            showViewAll={false}
          />
          <View style={{ flex: 1 }}>
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
        </View>
        <Image source={require('../../Images/slider.png')} style={Globalstyles.bottomImage} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;