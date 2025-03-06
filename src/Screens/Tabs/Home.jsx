import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Image, SafeAreaView, Text, StatusBar, ActivityIndicator } from 'react-native';
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
import { GET_ACTIVIST, GET_ALL_BIODATA_PROFILES, GET_BIODATA } from '../../utils/BaseUrl';
import { useDispatch } from 'react-redux';
import { setAllBiodata } from '../../ReduxStore/Slices/GetAllBiodataSlice';
import { setBioData } from '../../ReduxStore/Slices/BiodataSlice';
import { useFocusEffect } from '@react-navigation/native';
import { setActivistdata } from '../../ReduxStore/Slices/ActivistSlice';

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [biodata, setBiodata] = useState("");
  const [allbiodata, setallBiodata] = useState("");
  const [mybiodata, setMybiodata] = useState("");
  const partnerPreferences = mybiodata?.partnerPreferences;
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigateToProfile = (item) => {
    if (!navigation.isFocused()) return;

    console.log("Current Partner Preferences:", mybiodata?.partnerPreferences);

    if (!mybiodata || !mybiodata.partnerPreferences) {
      // Partner preferences nahi hai, toh "Matrimonial" screen par bhejo
      console.log("Navigating to Matrimonial because Partner Preferences are missing");
      navigation.navigate("ShortMatrimonialProfile", {
        userDetails: item,
      });
    } else {
      // Partner preferences hai, toh "MatrimonyPeopleProfile" screen par bhejo
      console.log("Navigating to MatrimonyPeopleProfile");
      navigation.navigate("MatrimonyPeopleProfile", {
        userDetails: item,
        userId: item._id,
        isSaved: item.isSaved
      });
    }
  };

  const GetAll_Biodata = async () => {
    setIsLoading(true)
    try {
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
      console.log("biodata", biodata);
      dispatch(setAllBiodata(biodata));
    } catch (error) {
      console.error(
        "Error fetching profile:",
        error.response ? error.response.data : error.message
      );
      setIsLoading(false)
    }
    finally {
      setIsLoading(false)
    }
  }

  const getBiodata = async () => {
    try {
      setIsLoading(true)
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(GET_BIODATA, { headers });
      if (response.data) {
        const fetchedData = response.data.data;
        console.log("My bio data", fetchedData);
        setMybiodata(fetchedData);
        dispatch(setBioData(fetchedData));
        setIsLoading(false)
      } else {
        setBiodata({});
      }
    } catch (error) {
      console.error("Error fetching biodata:", error);
    }
    finally {
      setIsLoading(false)
    }
  };

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
      console.error("Error fetching biodata:", error);
    }
    finally {
      setIsLoading(false)
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      GetAll_Biodata();
      getBiodata();
      getActivistProfile();
      console.log("mybiodata", mybiodata);
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
                    style={styles.ProfileImages}
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