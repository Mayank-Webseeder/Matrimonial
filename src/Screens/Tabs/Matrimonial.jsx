import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView, SafeAreaView, StatusBar, FlatList, Pressable, TextInput, Linking, ToastAndroid } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../StyleScreens/ExploreStyle';
import Colors from '../../utils/Colors';
import Globalstyles from '../../utils/GlobalCss';
import { FEMALE_FILTER_API, MALE_FILTER_API, SAVED_PROFILES } from '../../utils/BaseUrl';
import { slider } from '../../DummyData/DummyData';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { SW } from '../../utils/Dimensions';

const Matrimonial = ({ navigation }) => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeButton, setActiveButton] = useState(1);
  const [boysProfiles, setboysProfiles] = useState([]);
  const [girlsProfiles, setgirlsProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const MyprofileData = useSelector((state) => state.getBiodata);
  const partnerPreferences = MyprofileData?.Biodata?.partnerPreferences || null;

  // console.log("MyprofileData", MyprofileData);
  useEffect(() => {
    if (searchQuery.length > 0) {
      fetchProfiles(searchQuery);
    } else {
      setProfiles([]);
    }
  }, [searchQuery]);

  useFocusEffect(
    useCallback(() => {
      setSearchMode(false);
      fetchProfiles();
      setActiveButton(1)
    }, [])
  );

  const fetchProfiles = async (query) => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'No token found!' });
      return;
    }

    setLoading(true);
    setProfiles([])

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    try {
      const queryString = new URLSearchParams({ searchTerm: query }).toString();
      const finalURL = `https://api-matrimonial.webseeder.tech/api/v1/user/feed?${queryString}`;

      console.log("🛠 Final API URL:", finalURL);
      const finalResponse = await axios.get(finalURL, { headers });
      console.log("📥 Filtered Data:", JSON.stringify(finalResponse.data));

      setProfiles(finalResponse.data.feedUsers || []);
    } catch (error) {
      console.error("❌ Error fetching profiles:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View>
      <Image source={item.image} style={styles.sliderImage} />
    </View>
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

  useEffect(() => {
    if (activeButton === 1) fetchGirlsFilterData();
    if (activeButton === 2) fetchBoysFilterData();
  }, [activeButton]);

  const fetchBoysFilterData = async () => {
    try {
      setboysProfiles([])
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
      const res = await axios.get(MALE_FILTER_API, { headers });
      setboysProfiles(res.data.feedUsers);
    } catch (error) {
      console.error("Error fetching profiles:", error.message);
    }
  };

  const fetchGirlsFilterData = async () => {
    try {
      setgirlsProfiles([])
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
      const res = await axios.get(FEMALE_FILTER_API, { headers });
      setgirlsProfiles(res.data.feedUsers);
    } catch (error) {
      console.error("Error fetching profiles:", error.message);
    }
  };

  const handleShare = async () => {
    ToastAndroid.show("Under development", ToastAndroid.SHORT);
  };

  const popop = async () => {
    ToastAndroid.show(
      "Please create biodata to see full information of this profile",
      ToastAndroid.SHORT
    );
  
    setTimeout(() => {
      if (!MyprofileData) {
        navigation.navigate("MatrimonyPage");
      } else if (!partnerPreferences) {
        navigation.navigate("MainPartnerPrefrence");
      }
    }, 2000); 
  };
  


  const savedProfiles = async (_id) => {
    if (!_id) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User ID not found!",
        position: "top",
      });
      return;
    }

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      setgirlsProfiles((prev) =>
        prev.map((profile) =>
          profile._id === _id ? { ...profile, isSaved: !profile.isSaved } : profile
        )
      );

      setboysProfiles((prev) =>
        prev.map((profile) =>
          profile._id === _id ? { ...profile, isSaved: !profile.isSaved } : profile
        )
      );

      // **Make API Request**
      const response = await axios.post(`${SAVED_PROFILES}/${_id}`, {}, { headers });

      console.log("✅ Response Data:", JSON.stringify(response?.data));

      if (response.status !== 200 || response.data.status !== true) {
        throw new Error(response.data.message || "Something went wrong!");
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2: response.data.message || "Profile saved successfully!",
        position: "top",
        visibilityTime: 3000,
        textStyle: { fontSize: 14, color: "green" },
      });
    } catch (error) {
      console.error("🚨 API Error:", error?.response?.data || error.message);

      let errorMessage = "Failed to save profile!";
      if (error.response?.status === 400) {
        errorMessage = error.response.data?.message || "Bad request.";
      }

      // **Revert UI Update if API fails**
      setgirlsProfiles((prev) =>
        prev.map((profile) =>
          profile._id === _id ? { ...profile, isSaved: !profile.isSaved } : profile
        )
      );

      setboysProfiles((prev) =>
        prev.map((profile) =>
          profile._id === _id ? { ...profile, isSaved: !profile.isSaved } : profile
        )
      );

      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
        position: "top",
      });
    }
  };



  const handleSearch = () => {
    if (searchQuery.trim().length > 0) {
      console.log("Searching for:", searchQuery);
    }
  };

  const renderProfileCard = ({ item }) => {

    const formattedHeight = item?.personalDetails?.heightFeet
    ?.replace(/\s*-\s*/, "")
    ?.replace(/\s+/g, "");

    return (
      <View style={styles.card}>
        <Pressable onPress={popop}>
          <Image
            source={item.personalDetails.closeUpPhoto ? { uri: item.personalDetails.closeUpPhoto } : require('../../Images/NoImage.png')}
            style={styles.ProfileImage}
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

          <View style={styles.profileData}>
            {/* Full Name at the Top */}
            <Text style={[styles.text, styles.boldText]}>{item?.personalDetails?.fullname}</Text>

            {/* Two Column Layout */}
            <View style={styles.columnsContainer}>
              {/* Left Column */}
              <View style={styles.leftColumn}>
                <Text style={[styles.text, styles.rowItem]}>
                  {new Date().getFullYear() - new Date(item?.personalDetails?.dob).getFullYear()} Yrs. , {formattedHeight}
                </Text>
                <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.subCaste}</Text>
                <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.maritalStatus}</Text>
                <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.manglikStatus}</Text>
                <Text style={[styles.text, styles.rowItem]}>Disability: {item?.personalDetails?.disabilities}</Text>
              </View>

              {/* Right Column */}
              <View style={styles.rightColumn}>
                <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.currentCity}</Text>
                <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.occupation}</Text>
                <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.annualIncome} </Text>
                <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.qualification}</Text>
              </View>
            </View>
          </View>
        </Pressable>
        <View style={[styles.sharecontainer, { paddingHorizontal: SW(20) }]}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => savedProfiles(item._id)}>
            <FontAwesome
              name={item?.isSaved ? "bookmark" : "bookmark-o"}
              size={19}
              color={Colors.dark}
            />
            <Text style={styles.iconText}>{item?.isSaved ? "Saved" : "Save"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={handleShare}>
            <Feather name="send" size={19} color={Colors.dark} />
            <Text style={styles.iconText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ReportPage', { profileId: item?._id })}>
            <MaterialIcons name="error-outline" size={20} color={Colors.dark} />
            <Text style={styles.iconText}>Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const dataToDisplay = searchMode ? profiles : (activeButton === 1 ? girlsProfiles : activeButton === 2 ? boysProfiles : null);

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={Globalstyles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={require('../../Images/menu.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Matrimony</Text>
        </View>
        <View style={styles.righticons}>
          <TouchableOpacity onPress={() => setSearchMode(!searchMode)}>
            <AntDesign name={'search1'} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} />
          </TouchableOpacity>
          <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => navigation.navigate('Notification')} />
        </View>
      </View>
      <View style={styles.ButtonContainer}>
              <View style={styles.leftButtons}>
                <TouchableOpacity
                  style={[styles.button, activeButton === 1 ? styles.activeButton : styles.inactiveButton, { width: "30%" }]}
                  onPress={() => setActiveButton(1)}
                >
                  <Text style={activeButton === 1 ? styles.activeText : styles.inactiveText}>Girls</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, activeButton === 2 ? styles.activeButton : styles.inactiveButton, { width: "30%" }]}
                  onPress={() => setActiveButton(2)}
                >
                  <Text style={activeButton === 2 ? styles.activeText : styles.inactiveText}>Boys</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[styles.button, activeButton === 3 ? styles.activeButton : styles.inactiveButton]}
                onPress={() => {
                  setActiveButton(3);
                  navigation.navigate("MainPartnerPrefrence");
                }}
              >
                <Text style={activeButton === 3 ? styles.activeText : styles.inactiveText}>
                  Set Preferences
                </Text>
              </TouchableOpacity>

            </View>


      {searchMode && (
        <View style={Globalstyles.inputContainer}>
          <TextInput
            style={{ color: "#000" }}
            placeholder="Search by Name, ID, Occupation, City"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            placeholderTextColor={Colors.gray}
            onSubmitEditing={handleSearch}
          />
          {searchQuery.length > 0 ? (
            <AntDesign name={'close'} size={20} color={'gray'} onPress={() => {
              setSearchQuery('');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Matrimonial' }],
              });
            }}
            />
          ) : (
            <AntDesign name={'search1'} size={20} color={'gray'} onPress={() => setSearchMode(!searchMode)} />
          )}
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {!searchMode && (
          <>
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
          </>
        )}
        <FlatList data={dataToDisplay} renderItem={renderProfileCard} keyExtractor={(item) => item._id} scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No Profiles Available</Text>
            </View>
          } />
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default Matrimonial;
