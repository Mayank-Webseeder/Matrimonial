import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView, SafeAreaView, StatusBar, Linking, Modal, Dimensions, Share, BackHandler } from 'react-native';
import styles from '../StyleScreens/DharamsalaDetailStyle';
import Colors from '../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppIntroSlider from 'react-native-app-intro-slider';
import Globalstyles from '../../utils/GlobalCss';
import { BOTTOM_DHARMSHALA_ADVERDISE_WINDOW, SAVED_PROFILES, VIEW_DHARAMSALA } from '../../utils/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SF, SH, SW } from '../../utils/Dimensions';
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
import { showMessage } from 'react-native-flash-message';
const { width, height } = Dimensions.get("window");
import { useSelector } from 'react-redux';
import { CommonActions, useFocusEffect } from '@react-navigation/native';

const DharamsalaDetail = ({ navigation, route }) => {
  const { _id, isSaved: initialSavedState, id } = route.params;
  const profileId = _id || id;
  const [dharamsalaData, SetDharamsalaData] = useState('');
  const sliderRef = useRef(null);
  const topSliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullText, setShowFullText] = useState(false);
  const [Save, setIsSaved] = useState(initialSavedState || false);
  const description = dharamsalaData?.description || "No description available.";
  const truncatedDescription = description.slice(0, 300) + "...";
  const [modalVisible, setModalVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const notifications = useSelector((state) => state.GetAllNotification.AllNotification);
  const notificationCount = notifications ? notifications.length : 0;
  const formattedImages =
    (dharamsalaData?.images?.length ? dharamsalaData.images.map(img => ({ uri: img })) : []);
  const [slider, setSlider] = useState([]);
  const [Loading, setLoading] = useState(false);
  const dharmshalaName = dharamsalaData?.dharmshalaName ?? "Unnamed";
  const subCaste = dharamsalaData?.subCaste ?? "Not specified";
  const city = dharamsalaData?.city ?? "Unknown";
  const openImageViewer = (index) => {
    setImageIndex(index);
    setModalVisible(true);
  };

  useEffect(() => {
    fetchDharamsalaProfile();
    console.log("dharamsalaData", dharamsalaData);
    console.log("profileId", profileId);
  }, [])


   useFocusEffect(
              React.useCallback(() => {
                  const onBackPress = () => {
                      navigation.dispatch(
                          CommonActions.reset({
                              index: 0,
                              routes: [
                                  {
                                      name: 'MainApp',
                                      state: {
                                          index: 0,
                                          routes: [{ name: 'Dharmshala' }],
                                      },
                                  },
                              ],
                          })
                      );
                      return true;
                  };
      
                  BackHandler.addEventListener('hardwareBackPress', onBackPress);
      
                  return () =>
                      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
              }, [navigation])
          );

  const fetchDharamsalaProfile = async () => {
  setLoading(true);

  const profileId = _id || id;

  if (!profileId) {
    showMessage({
      type: "danger",
      message: "Dharamsala ID not found!",
      icon: "danger",
      duration: 5000
    });
    console.error("[fetchDharamsalaProfile] ❌ No valid ID provided. _id:", _id, " | id:", id);
    setLoading(false);
    return;
  }

  const token = await AsyncStorage.getItem('userToken');
  if (!token) {
    showMessage({
      type: "danger",
      message: "Authentication Error",
      description: "No token found. Please log in again.",
      duration: 5000
    });
    console.error("[fetchDharamsalaProfile] ❌ No token found.");
    setLoading(false);
    return;
  }

  const url = `${VIEW_DHARAMSALA}/${profileId}`;
  console.log("[fetchDharamsalaProfile] ✅ Fetching data...");
  console.log("🔗 URL:", url);
  console.log("🔐 Token:", token.substring(0, 20) + "...");

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    console.log("📦 Raw API Response:", JSON.stringify(response.data, null, 2));

    if (response.data.status) {
      console.log("✅ Profile Fetched:", response.data.data);
      SetDharamsalaData(response.data.data);
    } else {
      showMessage({
        type: "danger",
        message: "No Profile Found",
        description: response.data.message || "Something went wrong!",
        duration: 5000
      });
      console.warn("⚠️ API returned false status:", response.data.message);
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message;
    console.error("❌ Error fetching profile:", errorMsg);

    showMessage({
      type: "danger",
      message: errorMsg,
      description: "Failed to load profile data",
      duration: 5000
    });

    const sessionExpiredMessages = [
      "User does not Exist....!Please login again",
      "Invalid token. Please login again",
      "Token has expired. Please login again"
    ];

    if (sessionExpiredMessages.includes(errorMsg)) {
      console.warn("⚠️ Session expired, clearing token...");
      await AsyncStorage.removeItem("userToken");
      navigation.reset({
        index: 0,
        routes: [{ name: "AuthStack" }],
      });
    }
  } finally {
    setLoading(false);
  }
};



  useEffect(() => {
    if (!formattedImages || formattedImages.length === 0) return;

    const duration = (formattedImages[currentIndex]?.duration || 1) * 1000;

    const timeout = setTimeout(() => {
      const nextIndex =
        currentIndex < formattedImages.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(nextIndex);
      topSliderRef.current?.goToSlide(nextIndex);
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentIndex, formattedImages]);


  useEffect(() => {
    if (slider.length === 0) return;

    const currentSlide = slider[currentIndex];
    const durationInSeconds = currentSlide?.duration || 2;
    const durationInMilliseconds = durationInSeconds * 1000;

    const timeout = setTimeout(() => {
      const nextIndex = currentIndex < slider.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(nextIndex);
      sliderRef.current?.goToSlide(nextIndex);
    }, durationInMilliseconds);

    return () => clearTimeout(timeout);
  }, [currentIndex, slider]);



  useEffect(() => {
    Advertisement_window();
  }, []);

  const Advertisement_window = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(BOTTOM_DHARMSHALA_ADVERDISE_WINDOW, { headers });

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


  const SliderrenderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => openImageViewer(index)}>
      <Image
        source={{ uri: item.uri }}
        style={styles.sliderImage}
      />
    </TouchableOpacity>
  );

  const handleShare = async () => {
    const profileId = DharamsalaData?._id || dharamsalaData._id;
    console.log("profileId", profileId);

    try {
      if (!profileId) throw new Error("Missing profile ID");

      const directLink = `https://brahmin-milan.vercel.app/app/profile/dharamsala-detial/${profileId}`;

      await Share.share({
        message: `Check this profile in Brahmin Milan app:\n${directLink}`
      });
    } catch (error) {
      console.error("Sharing failed:", error?.message || error);
    }
  };

  const savedProfiles = async () => {
    if (!profileId) {
      showMessage({
        type: "danger",
        message: "Error",
        description: "User ID not found!",
      });
      return;
    }

    setIsSaved((prev) => !prev);

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      console.log("API Request:", `${SAVED_PROFILES}/${profileId}`);

      const response = await axios.post(`${SAVED_PROFILES}/${profileId}`, {}, { headers });

      console.log("Response Data:", response?.data);
      if (response.status === 200 && response.data.status === true) {
        showMessage({
          type: "success",
          message: "Success",
          description: response.data.message || "Profile saved successfully!",
        });
        setIsSaved(response.data.message.toLowerCase().includes("saved successfully"));
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching biodata:", errorMsg);
      setIsSaved((prev) => !prev);

      showMessage({
        type: "danger",
        message: "Error",
        description: errorMsg || "Something went wrong!",
        icon: "danger"
      });
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

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      {/* Header */}
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>{dharmshalaName}</Text>
        </View>
        <View style={styles.righticons}>
          <TouchableOpacity style={{ position: 'relative' }} onPress={() => navigation.navigate('Notification')}>
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

      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.sliderContainer}>
          <AppIntroSlider
            ref={topSliderRef}
            data={formattedImages}
            renderItem={SliderrenderItem}
            showNextButton={false}
            showDoneButton={false}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            onSlideChange={(index) => setCurrentIndex(index)}
          />

          {/* Modal for Full Image View */}
          <Modal visible={modalVisible} transparent={true} animationType="fade">
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentOffset={{ x: imageIndex * SCREEN_W, y: 0 }}
                onMomentumScrollEnd={(e) =>
                  setImageIndex(Math.round(e.nativeEvent.contentOffset.x / SCREEN_W))
                }
              >
                {formattedImages.map((img, idx) => (
                  <View
                    key={idx}
                    style={{
                      width: SCREEN_W,
                      height: SCREEN_H,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: SH(15)
                    }}
                  >
                    <Image
                      source={{ uri: img.uri }}
                      resizeMode="contain"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </View>
                ))}
              </ScrollView>

              <View style={{
                position: "absolute", top: SH(30), alignSelf: "center", backgroundColor: "rgba(0,0,0,0.6)",
                paddingHorizontal: SW(8), borderRadius: 5, paddingVertical: SH(8)
              }}>
                <Text style={{ color: "white", fontSize: SF(16), fontWeight: "bold" }}>{imageIndex + 1} / {formattedImages.length}</Text>
              </View>

              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: "absolute", top: SH(40), right: SW(20) }}>
                <Text style={{ color: "white", fontSize: SF(13), fontFamily: "Poppins-Regular" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        {/* Dharamsala Details */}
        <View style={styles.textContainer}>
          <View style={styles.TextView}>
            <Text style={[Globalstyles.title, { fontFamily: "Poppins-Bold" }]}>{dharmshalaName || 'NA'}</Text>
            <Text style={styles.Text}>{subCaste || "N/A"}</Text>
            <Text style={styles.smalltext}>{city || 'NA'}</Text>
          </View>

          {/* Description with Read More / Read Less */}
          <View style={styles.TextView}>
            <Text style={Globalstyles.title}>Description</Text>
            <Text style={styles.descriptionText}>
              {showFullText ? description : truncatedDescription}
            </Text>
            {description.length > 300 && (
              <TouchableOpacity onPress={() => setShowFullText(!showFullText)}>
                <Text style={styles.viewMore}>
                  {showFullText ? 'Read Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Share & Call Section */}
        <View style={styles.sharecontainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={savedProfiles}>
            <FontAwesome
              name={Save ? "bookmark" : "bookmark-o"}
              size={19}
              color={Colors.dark}
            />
            <Text style={styles.iconText}>{Save ? "Saved" : "Save"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={handleShare}>
            <Feather name="send" size={20} color={Colors.dark} />
            <Text style={styles.iconText}>Share</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.Button} onPress={() => Linking.openURL(`tel:${dharamsalaData.mobileNo}`)}>
            <MaterialIcons name="call" size={18} color={Colors.light} />
            <Text style={styles.RequestText}>  call</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.Bottomimage}>
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
                    style={{ width, height, resizeMode: 'cover' }}
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

      </ScrollView>
    </SafeAreaView>
  );
};

export default DharamsalaDetail;
