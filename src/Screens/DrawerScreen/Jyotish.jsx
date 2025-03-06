import React, { useState, useRef, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput, Image, Modal, ScrollView, SafeAreaView, StatusBar, Linking, Pressable,Animated } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Rating } from 'react-native-ratings';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Dropdown } from 'react-native-element-dropdown';
import styles from '../StyleScreens/PanditJyotishKathavachakStyle';
import Colors from '../../utils/Colors';
import { ExperienceData, RatingData, jyotishServices } from '../../DummyData/DropdownData';
import Globalstyles from '../../utils/GlobalCss';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { slider } from '../../DummyData/DummyData';
import { GET_ALL_JYOTISH, SAVED_PROFILES } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { SH, SW } from '../../utils/Dimensions';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Jyotish = ({ navigation }) => {
  const sliderRef = useRef(null);
  const [activeButton, setActiveButton] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [services, setServices] = useState('');
  const [locality, setLocality] = useState('');
  const [rating, setRating] = useState(null);
  const [experience, setExperience] = useState(null);
  const [JyotishData, setJyotishData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [modalLocality, setModalLocality] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200], 
    outputRange: [SH(200), 0], 
    extrapolate: "clamp",
  });

  const handleOpenFilter = () => {
    setModalVisible(true);
    setActiveButton(1);
  };

  const handleCloseFilter = () => {
    setModalVisible(false);
    JyotishDataAPI("modal");
  };

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

  const JyotishDataAPI = async (filterType = "search") => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let queryParams = [];

      if (filterType === "search") {
        if (locality.trim()) queryParams.push(`locality=${encodeURIComponent(locality.toLowerCase())}`);
      } else if (filterType === "modal") {
        if (modalLocality.trim()) queryParams.push(`locality=${encodeURIComponent(modalLocality.toLowerCase())}`);
        if (services) queryParams.push(`services=${encodeURIComponent(services)}`);
        if (rating && rating.trim()) queryParams.push(`rating=${encodeURIComponent(rating)}`);
        if (experience && experience.trim()) queryParams.push(`experience=${encodeURIComponent(experience)}`);
      }

      // ⚡️ Construct URL only with valid params
      const url = queryParams.length > 0
        ? `${GET_ALL_JYOTISH}?${queryParams.join("&")}`
        : GET_ALL_JYOTISH;

      console.log("Fetching Data from:", url);

      const response = await axios.get(url, { headers });
      console.log("response.data?.data", response.data?.data);
      setJyotishData(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching Pandit data:", error);
    } finally {
      setLoading(false);
    }
  };

  const savedProfiles = async (_id) => {
    if (!_id) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User ID not found!",
      });
      return;
    }

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `${SAVED_PROFILES}/${_id}`,
        {},
        { headers }
      );

      console.log("Response Data:", JSON.stringify(response?.data));

      if (response?.data?.message) {
        Toast.show({
          type: "success",
          text2: response.data.message,
          position: "top",
          visibilityTime: 3000,
          textStyle: { fontSize: 14, color: "green" },
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.data.message || "Something went wrong!",
        });
      }
    } catch (error) {
      console.error(
        "API Error:",
        error?.response ? JSON.stringify(error.response.data) : error.message
      );
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Failed to save profile!",
      });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setLocality('');
      setModalLocality('')
      setRating(' ')
      setExperience(' ')
      setServices('')
      setJyotishData([]);
      JyotishDataAPI("all");
    }, [])
  );


  const renderSkeleton = () => (
    <SkeletonPlaceholder>
      <View style={{ margin: SH(20) }}>
        {[1, 2, 3, 4].map((_, index) => (
          <View key={index} style={{ flexDirection: "row", marginBottom: 20 }}>
            <View style={{ width: SW(80), height: SH(80), borderRadius: 40, marginRight: SW(10) }} />
            <View>
              <View style={{ width: SW(150), height: SH(20), borderRadius: 4 }} />
              <View style={{ width: SW(100), height: SH(15), borderRadius: 4, marginTop: SH(6) }} />
              <View style={{ width: SW(80), height: SH(15), borderRadius: 4, marginTop: SH(6) }} />
            </View>
          </View>
        ))}
      </View>
    </SkeletonPlaceholder>
  );

  const renderItem = ({ item }) => {
    const rating = item.averageRating || 0;
    const isSaved=item.isSaved || null;
    return (
      <View style={styles.card}>
         <View style={styles.cardData}>
          <Image
            source={item.profilePhoto ? { uri: item.profilePhoto } : require('../../Images/NoImage.png')}
            style={styles.image}
          />
          <View>
          <Pressable style={styles.leftContainer}  
          onPress={() => navigation.navigate('JyotishDetailsPage', { jyotish_id: item._id,isSaved:isSaved })}>
            <Text style={styles.name}>{item?.fullName}</Text>
            <View style={styles.rating}>
              <Rating type="star" ratingCount={5} imageSize={15} startingValue={rating} readonly />
              <Text style={[styles.text, { fontFamily: 'Poppins-Regular' }]}> {rating} Star Rating</Text>
            </View>
            <View style={styles.CityArea}>
              <Text style={styles.text}>{item?.city}</Text>
              <Text style={styles.text}>    {item?.state}</Text>
            </View>
            <Text style={styles.text}>{item?.residentialAddress}</Text>
          </Pressable>
          <View style={styles.sharecontainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={savedProfiles}>
            <FontAwesome
              name={isSaved ? "bookmark" : "bookmark-o"}
              size={19}
              color={Colors.dark}
            />
            {/* <Text style={styles.iconText}>{isSaved ? "Saved" : "Save"}</Text> */}
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            <Feather name="send" size={18} color={Colors.dark} />
            {/* <Text style={styles.iconText}>Shares</Text> */}
          </View>

          <TouchableOpacity style={styles.Button} onPress={() => Linking.openURL(`tel:${item.mobileNo}`)}>
            <MaterialIcons name="call" size={17} color={Colors.light} />
          </TouchableOpacity>
        </View>
          </View>
        </View>
      </View>
    );
  };


  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={Globalstyles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Jyotish</Text>
        </View>
        <View style={styles.headerContainer}>
          <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => navigation.navigate('Notification')} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
      {/* Animated Advertise Window */}
      <Animated.View style={[styles.animatedAdvertise, { height: headerHeight }]}>
        <AppIntroSlider
          data={slider}
          renderItem={({ item }) => (
            <View>
              <Image source={item.image} style={Globalstyles.sliderImage} />
            </View>
          )}
          showNextButton={false}
          showDoneButton={false}
          dotStyle={Globalstyles.dot}
          activeDotStyle={Globalstyles.activeDot}
        />
      </Animated.View>

      {/* Fixed Header - Filter & Search Bar */}
      <View style={styles.fixedHeader}>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            style={[styles.button, activeButton === 1 ? styles.activeButton : styles.inactiveButton]}
            onPress={handleOpenFilter}
          >
            <Text style={activeButton === 1 ? styles.activeText : styles.inactiveText}>Filter</Text>
          </TouchableOpacity>

          <View style={styles.searchbar}>
            <TextInput 
              placeholder="Search in Your city" 
              value={locality}
              onChangeText={(text) => setLocality(text)} 
              onSubmitEditing={() => JyotishDataAPI("search")} 
              placeholderTextColor={"gray"} 
              style={{ flex: 1 }} 
            />
            {locality.length > 0 ? (
              <AntDesign name={'close'} size={20} color={'gray'} onPress={() => setLocality('')} />
            ) : (
              <AntDesign name={'search1'} size={20} color={'gray'} onPress={() => JyotishDataAPI("search")} />
            )}
          </View>
        </View>
      </View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {isLoading ? renderSkeleton() : (
          <FlatList
            data={JyotishData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.panditListData}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No Jyotish Data Available</Text>
              </View>
            }
          />
          
        )}
      </Animated.ScrollView>
    </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseFilter}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.Filterheader}>
              <TouchableOpacity onPress={handleCloseFilter} style={{ flexDirection: 'row' }}>
                <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                <Text style={Globalstyles.headerText}>Filter</Text>
              </TouchableOpacity>
            </View>

            <View style={Globalstyles.form}>
              <Text style={Globalstyles.title}>Locality</Text>
              <View>
                <TextInput
                  style={Globalstyles.input}
                  value={modalLocality}
                  onChangeText={(text) => setModalLocality(text)}
                  placeholder="Enter Locality"
                  placeholderTextColor={Colors.gray}
                />
              </View>

              <Text style={Globalstyles.title}>Services</Text>
              <View>
                <Dropdown
                  data={jyotishServices}
                  labelField="label"
                  valueField="value"
                  value={services}
                  onChange={(item) => setServices(item.value)}
                  placeholder="Select Services"
                  style={Globalstyles.input}
                  placeholderStyle={{ color: '#E7E7E7' }}
                />
              </View>

              <Text style={Globalstyles.title}>Rating</Text>
              <View>
                <Dropdown
                  style={Globalstyles.input}
                  data={RatingData}
                  labelField="label"
                  valueField="value"
                  value={rating}
                  onChange={(item) => setRating(item.value)}
                  placeholder="Select Rating"
                  placeholderStyle={{ color: '#E7E7E7' }}
                />
              </View>

              <Text style={Globalstyles.title}>Experience</Text>
              <View>
                <Dropdown
                  style={Globalstyles.input}
                  data={ExperienceData}
                  labelField="label"
                  valueField="value"
                  value={experience}
                  onChange={(item) => setExperience(item.value)}
                  placeholder="Select Experience"
                  placeholderStyle={{ color: '#E7E7E7' }}
                />
              </View>
              <TouchableOpacity style={styles.applyButton} onPress={handleCloseFilter}>
                <Text style={styles.applyButtonText}>See results</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.crossButton}>
                <View style={styles.circle}>
                  <Entypo name="cross" size={25} color={Colors.light} />
                </View>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Jyotish;
