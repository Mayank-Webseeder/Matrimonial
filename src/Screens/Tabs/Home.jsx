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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { GET_ALL_BIODATA_PROFILES, GET_BIODATA } from '../../utils/BaseUrl';
import { useDispatch } from 'react-redux';
import { setAllBiodata } from '../../ReduxStore/Slices/GetAllBiodataSlice';
import { setBioData } from '../../ReduxStore/Slices/BiodataSlice';
import { useFocusEffect } from '@react-navigation/native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { SH, SW } from '../../utils/Dimensions';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allbiodata, setallBiodata] = useState(null);
  const [mybiodata, setMybiodata] = useState(null);
  const [loading, setLoading] = useState(false);
  const GetAll_Biodata = async () => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };
      const res = await axios.get(GET_ALL_BIODATA_PROFILES, { headers });
      const biodata = res.data.feedUsers;
      console.log("biodata", biodata);
      dispatch(setAllBiodata(biodata));
      setallBiodata(biodata);
    } catch (error) {
      setLoading(false)
      console.error("Error fetching profile:", error);
    }
    finally {
      setLoading(false)
    }
  };

  const getBiodata = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');
      const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
      const response = await axios.get(GET_BIODATA, { headers });
      if (response.data && response.data.data) {
        const fetchedData = response.data.data;
        dispatch(setBioData(fetchedData));
        setMybiodata(fetchedData);
      }
    } catch (error) {
      console.error("Error fetching biodata:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      GetAll_Biodata();
      getBiodata();
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

        {loading ? (
          <SkeletonPlaceholder>
            <View style={{ flexDirection: "row", margin: SH(20) }}>
              {[1, 2, 3, 4].map((_, index) => (
                <View key={index} style={{ margin: 10 }}>
                  <View style={{ width: SW(100), height: SH(100), borderRadius: 50 }} />
                </View>
              ))}
            </View>
          </SkeletonPlaceholder>
        ) : allbiodata?.length > 0 ? (
          <FlatList
            data={allbiodata}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.imageWrapper}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("MatrimonyPeopleProfile", { userDetails: item, userId: item.userId })}
                >
                  <Image source={{ uri: item.personalDetails.closeUpPhoto }} style={styles.ProfileImages} />
                </TouchableOpacity>
              </View>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No profiles available </Text>
          </View>
        )}

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
