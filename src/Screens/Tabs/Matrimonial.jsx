import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView, SafeAreaView, StatusBar, FlatList, Pressable, BackHandler, TextInput, Linking, ActivityIndicator, Share } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../StyleScreens/ExploreStyle';
import Colors from '../../utils/Colors';
import Globalstyles from '../../utils/GlobalCss';
import { DeepLink, FEMALE_FILTER_API, GET_ALL_BIODATA_PROFILES, MALE_FILTER_API, SAVED_PROFILES, TOP_BIODATA_ADVERTISE_WINDOW } from '../../utils/BaseUrl';
import { slider } from '../../DummyData/DummyData';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useSelector } from 'react-redux';
import { SW, SF, SH } from '../../utils/Dimensions';
import { showMessage } from 'react-native-flash-message';
import { useFocusEffect, CommonActions } from '@react-navigation/native';
const Matrimonial = ({ navigation }) => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slider, setSlider] = useState([]);
  const MyprofileData = useSelector((state) => state.getBiodata);
  const gender = MyprofileData?.Biodata?.gender || null;

  const [activeButton, setActiveButton] = useState(() => {
    if (gender?.toLowerCase() === "male") return 1;
    if (gender?.toLowerCase() === "female") return 2;
    return 1;
  });

  const [boysProfiles, setboysProfiles] = useState([]);
  const [girlsProfiles, setgirlsProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [profiles, setProfiles] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const ProfileData = useSelector((state) => state.profile);
  const profile_data = ProfileData?.profiledata || {};
  const notifications = useSelector((state) => state.GetAllNotification.AllNotification);
  const notificationCount = notifications ? notifications.length : 0;

  useEffect(() => {
    console.log("MyprofileData", MyprofileData);
    console.log("gender", gender);
    console.log("profile_data", profile_data);
  }, [])

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
      fetchProfiles("");
      fetchGirlsFilterData();
      fetchBoysFilterData();
    }, [])
  );


  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.openDrawer();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );

  useEffect(() => {
    Advertisement_window();
  }, []);


  useEffect(() => {
    if (slider.length === 0) return;

    const currentSlide = slider[currentIndex];
    const durationInSeconds = Number(currentSlide?.duration) || 4;
    const bufferMs = 800;
    const durationInMilliseconds = durationInSeconds * 1000 + bufferMs;
    console.log("durationInSeconds", durationInSeconds);
    const timeout = setTimeout(() => {
      const nextIndex = currentIndex < slider.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(nextIndex);
      sliderRef.current?.goToSlide(nextIndex);
    }, durationInMilliseconds);

    return () => clearTimeout(timeout);
  }, [currentIndex, slider]);



  const Advertisement_window = async () => {
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
            image: `https://api-matrimonial.webseeder.tech/${mediaItem.mediaUrl}`,
            resolution: mediaItem.resolution,
            hyperlink: mediaItem.hyperlink,
            duration: Number(mediaItem.duration) || 4,
          }))
        );

        setSlider(fullSliderData);
        console.log("Slider Data:", fullSliderData);
      } else {
        setSlider([]);
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

  useEffect(() => {
    if (activeButton === 1) fetchGirlsFilterData();
    else if (activeButton === 2) fetchBoysFilterData();
  }, [activeButton]);


  const fetchProfiles = async (query = "") => {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      showMessage({
        type: "danger",
        message: "Authentication Error",
        description: "No token found. Please log in again.",
        duration: 5000
      });

      navigation.reset({
        index: 0,
        routes: [{ name: "AuthStack" }],
      });
      return;
    }
    setProfiles([])

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    try {
      const queryString = new URLSearchParams({ searchTerm: query }).toString();
      const finalURL = `${GET_ALL_BIODATA_PROFILES}?${queryString}`;

      console.log("🛠 Final API URL:", finalURL);
      const finalResponse = await axios.get(finalURL, { headers });
      console.log("📥 Filtered Data:", JSON.stringify(finalResponse.data));

      setProfiles(finalResponse.data.feedUsers || []);
    } catch (error) {
      console.error("❌ Error fetching profiles:", error.response?.data || error);
    }
  };

  useEffect(() => {
    if (activeButton === 1) fetchGirlsFilterData();
    else if (activeButton === 2) fetchBoysFilterData();
  }, [activeButton]);

  const fetchBoysFilterData = async () => {
    try {
      setboysProfiles([])
      setProfileLoading(true)
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
      const res = await axios.get(MALE_FILTER_API, { headers });
      console.log("res.data.Girls", JSON.stringify(res.data.feedUsers));
      setboysProfiles(res.data.feedUsers);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching profiles:", errorMsg);

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
      setProfileLoading(false)
    }
    finally {
      setProfileLoading(false)
    }
  };

  const fetchGirlsFilterData = async () => {
    try {
      setgirlsProfiles([])
      setProfileLoading(true)
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
      const res = await axios.get(FEMALE_FILTER_API, { headers });
      console.log("res.data.Boys", JSON.stringify(res.data.feedUsers));
      setgirlsProfiles(res.data.feedUsers);
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching female biodata:", errorMsg);
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
      setProfileLoading(false)
    }
    finally {
      setProfileLoading(false)
    }
  };

  const shareProfiles = async (profileId) => {
    const profileType = "Matrimonial";

    console.log("profileId", profileId);

    try {
      if (!profileId) throw new Error("Missing profile ID");

      const directLink = `${DeepLink}/${profileType}/${profileId}`;

      await Share.share({
        message: `Check this profile in Brahmin Milan app:\n${directLink}`
      });
    } catch (error) {
      console.error("Sharing failed:", error?.message || error);
    }
  };

  const popop = async () => {
    const isBiodataExpired = profile_data?.serviceSubscriptions?.some(
      (sub) => sub.serviceType === "Biodata" && sub.status === "Expired"
    );

    const isBiodataEmpty = !MyprofileData.Biodata || Object.keys(MyprofileData.Biodata).length === 0;

    if (isBiodataEmpty) {
      showMessage({
        message: "Create Biodata",
        description: "Please create biodata to see full information of this profile.",
        type: "info",
        duration: 3000,
      });

      setTimeout(() => {
        navigation.navigate("MatrimonyPage");
      }, 2000);
    } else if (isBiodataExpired) {
      showMessage({
        message: "Subscription Required",
        description: "Please activate your subscription to see full information of this profile.",
        type: "info",
        icon: "info",
        duration: 3000,
      });

      setTimeout(() => {
        navigation.navigate("BuySubscription", { serviceType: "Biodata" });
      }, 2000);
    } else {
      navigation.navigate("MatrimonyPage");
    }
  };

  const savedProfiles = async (_id) => {
    if (!_id) {
      showMessage({
        type: "danger",
        message: "Error",
        description: "User ID not found!",
        icon: "info"
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

      showMessage({
        type: "success",
        message: "Success",
        description: response.data.message || "Profile saved successfully!",
        visibilityTime: 3000,
        icon: "success"
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

      showMessage({
        type: "danger",
        message: "Error",
        description: errorMessage,
        icon: "danger"
      });
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim().length > 0) {
      fetchProfiles(searchQuery.trim());
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
            blurRadius={item?.isBlur ? 5 : 0}
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
                  {new Date().getFullYear() - new Date(item?.personalDetails?.dob).getFullYear()} Yrs, {formattedHeight}
                </Text>
                <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.subCaste}</Text>
                <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.maritalStatus}</Text>
                <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.manglikStatus}</Text>
                <Text style={[styles.text, styles.rowItem]}>Disability: {item?.personalDetails?.disabilities}</Text>
              </View>

              {/* Right Column */}
              <View style={styles.rightColumn}>
                <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.currentCity}</Text>
                <Text style={[styles.text, styles.rowItem, { textTransform: "none" }]}>{item?.personalDetails?.occupation}</Text>
                <Text style={[styles.text, styles.rowItem, { textTransform: "none" }]}>{item?.personalDetails?.annualIncome} </Text>
                <Text style={[styles.text, styles.rowItem, { textTransform: "none" }]}>{item?.personalDetails?.qualification}</Text>
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

          <TouchableOpacity style={styles.iconContainer} onPress={() => shareProfiles(item?._id)}>
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

  if (profileLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.theme_color} />
      </View>
    );
  }

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
      </View>
      <View style={styles.ButtonContainer}>
        <View style={styles.leftButtons}>
          {gender?.toLowerCase() === "male" ? (
            <TouchableOpacity
              style={[
                styles.button,
                styles.activeButton,
                { width: "36%" },
              ]}
              onPress={() => setActiveButton(1)}
            >
              <Text style={styles.activeText}>Girls</Text>
            </TouchableOpacity>
          ) : gender?.toLowerCase() === "female" ? (
            <TouchableOpacity
              style={[
                styles.button,
                styles.activeButton,
                { width: "36%" },
              ]}
              onPress={() => setActiveButton(2)}
            >
              <Text style={styles.activeText}>Boys</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={[
                  styles.button,
                  activeButton === 1 ? styles.activeButton : styles.inactiveButton,
                  { width: "30%" },
                ]}
                onPress={() => setActiveButton(1)}
              >
                <Text style={activeButton === 1 ? styles.activeText : styles.inactiveText}>
                  Girls
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  activeButton === 2 ? styles.activeButton : styles.inactiveButton,
                  { width: "30%" },
                ]}
                onPress={() => setActiveButton(2)}
              >
                <Text style={activeButton === 2 ? styles.activeText : styles.inactiveText}>
                  Boys
                </Text>
              </TouchableOpacity>
            </>
          )}
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
            style={{ color: "#000", flex: 1 }}
            placeholder="Search by Name, ID, Occupation, City"
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              if (!searchMode) setSearchMode(true);
            }}
            autoFocus
            placeholderTextColor={Colors.gray}
          />
          {searchQuery.length > 0 ? (
            <View>
              <AntDesign name={'close'} size={20} color={'gray'} onPress={() => {
                setSearchQuery('');
                fetchProfiles();
              }}
              />
            </View>
          ) : (
            <AntDesign name={'search1'} size={20} color={'gray'} onPress={() => setSearchMode(!searchMode)} />
          )}
        </View>
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        {!searchMode && (
          <>
            <View style={[styles.sliderContainer, { paddingBottom: SH(10) }]}>
              <AppIntroSlider
                ref={sliderRef}
                data={slider}
                renderItem={({ item }) => {
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
                        style={{ width: "100%", height: SH(180), resizeMode: 'contain' }}
                      />
                    </TouchableOpacity>
                  );
                }}
                showNextButton={false}
                showDoneButton={false}
                dotStyle={Globalstyles.dot}
                activeDotStyle={Globalstyles.activeDot}
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
    </SafeAreaView>
  );
};

export default Matrimonial;
