import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView, SafeAreaView, StatusBar, FlatList, Pressable, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../StyleScreens/ExploreStyle';
import Colors from '../../utils/Colors';
import Globalstyles from '../../utils/GlobalCss';
import { FEMALE_FILTER_API, MALE_FILTER_API, SET_PREFRENCE_FILTER_API } from '../../utils/BaseUrl';
import { slider } from '../../DummyData/DummyData';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const Matrimonial = ({ navigation }) => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeButton, setActiveButton] = useState(1);
  const [preferenceProfiles, setPreferenceProfiles] = useState([]);
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
      setSearchQuery('');
    }, [])
  );

  const fetchProfiles = async (query) => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'No token found!' });
      return;
    }

    setLoading(true);

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
    if (activeButton === 3) fetchSetPreferenceFilterData();
  }, [activeButton]);

  const fetchSetPreferenceFilterData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
      const res = await axios.get(SET_PREFRENCE_FILTER_API, { headers });
      setPreferenceProfiles(res.data.profiles);
    } catch (error) {
      console.error("Error fetching profiles:", error.message);
    }
  };

  const fetchBoysFilterData = async () => {
    try {
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
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
      const res = await axios.get(FEMALE_FILTER_API, { headers });
      setgirlsProfiles(res.data.feedUsers);
    } catch (error) {
      console.error("Error fetching profiles:", error.message);
    }
  };

  const renderProfileCard = ({ item }) => {
    const isPressable = partnerPreferences !== null && partnerPreferences !== undefined; // Only check global partnerPreferences

    return (
        <Pressable 
            style={styles.card} 
            onPress={isPressable ? () => navigation.navigate('MatrimonyPeopleProfile', { details: item, details_userId: item?.userId }) : null}
            disabled={!isPressable} // Disable press if global partnerPreferences is missing
        >
            <Image
                source={item.personalDetails.closeUpPhoto ? { uri: item.personalDetails.closeUpPhoto } : require('../../Images/NoImage.png')}
                style={styles.ProfileImage}
            />

            <View style={styles.profileData}>
                {/* Full Name at the Top */}
                <View style={styles.nameContainer}>
                    <Text style={[styles.text, styles.boldText]}>{item?.personalDetails?.fullname}</Text>
                </View>

                {/* Two Column Layout */}
                <View style={styles.columnsContainer}>
                    {/* Left Column */}
                    <View style={styles.leftColumn}>
                        <Text style={[styles.text, styles.rowItem]}>
                            {new Date().getFullYear() - new Date(item?.personalDetails?.dob).getFullYear()} Yrs. , {item?.personalDetails?.heightFeet}
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
                        <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.annualIncome} INR </Text>
                        <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.qualification}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};
  const dataToDisplay = searchMode ? profiles : (activeButton === 1 ? girlsProfiles : activeButton === 2 ? boysProfiles : preferenceProfiles);
 useEffect(()=>{
  console.log("dataToDisplay",dataToDisplay);
 },[])

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

      {searchMode && (
        <View style={Globalstyles.inputContainer}>
          <TextInput
            style={{ color: "#000" }}
            placeholder="Search by Name, ID, Occupation, City"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            placeholderTextColor={Colors.gray}
          />
          <AntDesign name={'search1'} size={20} color={Colors.gray} />
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
            <View style={styles.ButtonContainer}>
              <TouchableOpacity style={[styles.button, activeButton === 1 ? styles.activeButton : styles.inactiveButton, { width: "25%" }]} onPress={() => setActiveButton(1)}>
                <Text style={activeButton === 1 ? styles.activeText : styles.inactiveText}>Girls</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, activeButton === 2 ? styles.activeButton : styles.inactiveButton, { width: "25%" }]} onPress={() => setActiveButton(2)}>
                <Text style={activeButton === 2 ? styles.activeText : styles.inactiveText}>Boys</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, activeButton === 3 ? styles.activeButton : styles.inactiveButton]} onPress={() => setActiveButton(3)}>
                <Text style={activeButton === 3 ? styles.activeText : styles.inactiveText}>Set Preferences</Text>
              </TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default Matrimonial;
