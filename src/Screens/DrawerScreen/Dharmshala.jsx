import { Text, View, FlatList, TouchableOpacity, TextInput, Modal, ScrollView, SafeAreaView, StatusBar, Linking, Pressable, RefreshControl, BackHandler, Share } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { slider } from '../../DummyData/DummyData';
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/DharmshalaStyle';
import Colors from '../../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-element-dropdown';
import AppIntroSlider from 'react-native-app-intro-slider';
import { subCasteOptions } from '../../DummyData/DropdownData';
import Globalstyles from '../../utils/GlobalCss';
import Entypo from 'react-native-vector-icons/Entypo';
import { SH, SF, SW } from '../../utils/Dimensions';
import { DeepLink, GET_ALL_DHARAMSALA, GET_DHARAMSALA, SAVED_PROFILES, TOP_DHARMSHALA_ADVERDISE_WINDOW } from '../../utils/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import _ from "lodash";
import { showMessage } from 'react-native-flash-message';
import { useCallback } from 'react';
import { CommonActions } from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';
const Dharmshala = ({ route }) => {
  const { id } = route.params || {};
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [locality, setLocality] = useState('');
  const [activeButton, setActiveButton] = useState(null);
  const [subcaste, setSubcaste] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listHeight, setListHeight] = useState(0);
  const [dharamsalaData, setDharamsalaData] = useState([]);
  const [MydharamsalaData, setMyDharamsalaData] = useState([]);
  const [modalLocality, setModalLocality] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const MyActivistProfile = useSelector((state) => state.activist.activist_data);
  const [isImageVisible, setImageVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const notifications = useSelector((state) => state.GetAllNotification.AllNotification);
  const notificationCount = notifications ? notifications.length : 0;
  const [slider, setSlider] = useState([]);

  const fetchDharamsalaData = async (filterType = "search") => {
    try {
      setLoading(true);
      setDharamsalaData([]);
      setError(null);

      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let queryParams = [];

      if (filterType === "search") {
        const cleanedLocality = locality.trim();
        const cleanedSubCaste = subcaste.trim();

        if (cleanedLocality) queryParams.push(`locality=${encodeURIComponent(cleanedLocality.toLowerCase())}`);
        if (cleanedSubCaste) queryParams.push(`subCaste=${encodeURIComponent(cleanedSubCaste.toLowerCase())}`);
      } else if (filterType === "modal") {
        const cleanedModalLocality = modalLocality.trim();
        const cleanedModalSubCaste = subcaste.trim();

        if (cleanedModalLocality && cleanedModalSubCaste) {
          queryParams.push(`locality=${encodeURIComponent(cleanedModalLocality.toLowerCase())}`);
          queryParams.push(`subCaste=${encodeURIComponent(cleanedModalSubCaste.toLowerCase())}`);
        } else if (cleanedModalLocality) {
          queryParams.push(`locality=${encodeURIComponent(cleanedModalLocality.toLowerCase())}`);
        } else if (cleanedModalSubCaste) {
          queryParams.push(`subCaste=${encodeURIComponent(cleanedModalSubCaste.toLowerCase())}`);
        }
      }

      const url = filterType === "all" ? GET_ALL_DHARAMSALA : `${GET_ALL_DHARAMSALA}?${queryParams.join("&")}`;

      console.log("Fetching Data from:", url);

      const response = await axios.get(url, { headers });

      // Log the complete response
      console.log("Response Data:", JSON.stringify(response.data));

      if (response.data && response.data.data && response.data.data.length > 0) {
        setDharamsalaData(response.data.data);
      } else {
        setDharamsalaData([]);
        setError("No Dharamsala profiles found.");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching Dharamsala data:", errorMsg);

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
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };


  const GetMyDharamsalaData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        showMessage({
          message: 'warning',
          description: 'Authorization token is missing.',
          type: 'warning',
          icon: 'warning',
          duarion: 5000
        });
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(GET_DHARAMSALA, { headers });

      if (response.status === 200 && response.data.status === true) {
        console.log("dharamsala view data", JSON.stringify(response.data?.data))
        setMyDharamsalaData(response.data.data);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching dharamsala data:", errorMsg);

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

  const Advertisement_window = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(TOP_DHARMSHALA_ADVERDISE_WINDOW, { headers });

      if (response.data) {
        const fetchedData = response.data.data;
        console.log("fetchedData", JSON.stringify(fetchedData));

        const fullSliderData = fetchedData.flatMap((item) =>
          item.media.map((mediaItem) => ({
            id: `${item._id}_${mediaItem._id}`,
            title: item.title,
            description: item.description,
            image: `https://api-matrimonial.webseeder.tech/${mediaItem.mediaUrl}`,
            resolution: mediaItem.resolution, // 👈 yeh add kiya
            hyperlink: mediaItem.hyperlink,
            duration: mediaItem.duration || 4,
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

  useFocusEffect(
    React.useCallback(() => {
      // setLocality('');
      // setSubcaste('');
      // setDharamsalaData([]);
      // fetchDharamsalaData("all");
      GetMyDharamsalaData();
      Advertisement_window();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // setLocality('');
      // setSubcaste('');
      setDharamsalaData([]);
      fetchDharamsalaData("all");
      GetMyDharamsalaData();
      Advertisement_window();
    }, 2000);
  }, []);


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'MainApp' }],
          })
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );


  const openImageViewer = (imageUri) => {
    if (imageUri) {
      setSelectedImage([{ url: imageUri }]); // Important: `url` key is used by ImageViewer
      setImageVisible(true);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "subCaste") {
      setSubcaste(value);
    }
  };

  useEffect(() => {
    fetchDharamsalaData("all");
    Advertisement_window();
  }, []);


  useEffect(() => {
    if (slider.length === 0) return;

    const currentSlide = slider[currentIndex];
    const durationInSeconds = Number(currentSlide?.duration) || 4;
    const bufferMs = 800;
    const durationInMilliseconds = durationInSeconds * 1000 + bufferMs;
    const timeout = setTimeout(() => {
      const nextIndex = currentIndex < slider.length - 1 ? currentIndex + 1 : 0;
      setCurrentIndex(nextIndex);
      sliderRef.current?.goToSlide(nextIndex);
    }, durationInMilliseconds);

    return () => clearTimeout(timeout);
  }, [currentIndex, slider]);

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

  const handleUploadButton = () => {
    if (MyActivistProfile && MyActivistProfile._id) {
      navigation.navigate("DharamsalaSubmissionPage");
    } else {
      showMessage({
        type: "info",
        message: "You are not an activist!",
        description: "Create an activist profile if you want to upload Dharamsala.",
        position: "bottom",
        duarion: 5000,
        autoHide: true,
      });
    }
  };


  const savedProfiles = async (_id) => {
    if (!_id) {
      showMessage({
        type: "danger",
        message: "Error",
        description: "User ID not found!",
        icon: "danger",
        duarion: 5000
      });
      return;
    }
    setDharamsalaData((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile._id === _id ? { ...profile, isSaved: !profile.isSaved } : profile
      )
    );

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${SAVED_PROFILES}/${_id}`, {}, { headers });

      console.log("Response Data:", JSON.stringify(response?.data));

      if (response.status === 200 && response.data.status === true) {
        showMessage({
          type: "success",
          message: "Success",
          description: response.data?.message || "Profile saved successfully!",
          icon: "success",
          duarion: 5000
        });
      } else {
        throw new Error(response.data?.message || "Something went wrong!");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching biodata:", errorMsg);

      showMessage({
        type: "danger",
        message: "Error",
        description: errorMsg || "Failed to save profile!",
        icon: "danger",
        duarion: 5000
      });
      setDharamsalaData((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile._id === _id ? { ...profile, isSaved: !profile.isSaved } : profile
        )
      );

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

  const handleShare = async (profileId) => {
    const profileType = "dharamsala-detial";

    console.log("profileId", profileId);

    try {
      if (!profileId) throw new Error("Missing profile ID");

      const directLink = `${DeepLink}/${profileType}/${profileId}`;
      console.log("directLink", directLink);

      await Share.share({
        message: `Check this profile in Brahmin Milan app:\n${directLink}`
      });
    } catch (error) {
      console.error("Sharing failed:", error?.message || error);
    }
  };

  const renderItem = ({ item }) => {
    const isSaved = item?.isSaved || null;
    return (
      <View style={styles.card}
      >
        <Pressable style={styles.cardData} onPress={() => navigation.navigate("DharamsalaDetail", { DharamsalaData: item, isSaved: isSaved, _id: item?._id, fromScreen: "Dharmshala" })} >
          <TouchableOpacity onPress={() => openImageViewer(item?.images?.[0])}>
            <Image
              source={item?.images?.[0] ? { uri: item?.images?.[0] } : require('../../Images/NoImage.png')}
              style={styles.image}
            />
          </TouchableOpacity>

          {selectedImage && (
            <Modal visible={isImageVisible} transparent={true} onRequestClose={() => setImageVisible(false)}>
              <ImageViewer
                imageUrls={selectedImage}
                enableSwipeDown={true}
                onSwipeDown={() => setImageVisible(false)}
                onCancel={() => setImageVisible(false)}
                enablePreload={true}
                saveToLocalByLongPress={false}
                renderIndicator={() => null}
              />
            </Modal>
          )}
          <View style={styles.leftContainer}>
            {item?.dharmshalaName && (
              <Text style={styles.text}>
                {item.dharmshalaName.length > 25
                  ? item.dharmshalaName.substring(0, 25) + '...'
                  : item.dharmshalaName}
              </Text>
            )}

            {item?.subCaste && (
              <Text style={[styles.smalltext, { fontFamily: 'Poppins-Medium' }]}>
                {item.subCaste}
              </Text>
            )}

            {item?.city && (
              <Text style={styles.smalltext}>{item.city}</Text>
            )}
          </View>
        </Pressable>
        <View style={styles.sharecontainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => savedProfiles(item._id || id)}>
            <FontAwesome
              name={item.isSaved ? "bookmark" : "bookmark-o"}
              size={19}
              color={Colors.dark}
            />
            <Text style={styles.iconText}>{item.isSaved ? "Saved" : "Save"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconContainer} onPress={() => handleShare(item._id || id)}>
            <Feather name="send" size={18} color={Colors.dark} />
            <Text style={styles.iconText}>Shares</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button} onPress={() => Linking.openURL(`tel:${item?.mobileNo}`)}>
            <MaterialIcons name="call" size={17} color={Colors.light} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleOpenFilter = () => {
    setModalVisible(true);
    setActiveButton(1);
    console.log("Modal opened:", modalVisible);
  };


  const handleCloseFilter = () => {
    setModalVisible(false);
    setDharamsalaData([]);
    fetchDharamsalaData("modal");
  };

  const resetFilter = () => {
    setLocality('');
    setModalLocality('');
    setSubcaste('');
    fetchDharamsalaData("all");
  }


  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {/* Fixed Header */}
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'MainApp' }],
                })
              );
            }}
          >
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Dharmshala</Text>
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

      <View>
        {/* Search and Filter Section */}
        <View style={styles.searchContainer}>
          <View style={styles.searchbar}>
            <TextInput
              placeholder="Search in Your city"
              value={locality}
              onChangeText={(text) => setLocality(text)}
              onSubmitEditing={() => fetchDharamsalaData("search")}
              placeholderTextColor={"gray"}
              style={{ flex: 1 }}
              autoComplete="off"
              textContentType="none"
            />
            {locality.length > 0 ? (
              <AntDesign name={'close'} size={20} color={'gray'}
                onPress={() => {
                  setLocality('');
                  fetchDharamsalaData("all");
                }} />
            ) : (
              <AntDesign name={'search1'} size={20} color={'gray'} onPress={() => fetchDharamsalaData("search")} />
            )}
          </View>
        </View>

        <View style={styles.ButtonContainer}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <TouchableOpacity
              style={[styles.button, { width: SW(80) }, activeButton === 1 ? styles.activeButton : styles.inactiveButton]}
              onPress={handleOpenFilter}
            >
              <Text style={activeButton === 1 ? styles.activeText : styles.inactiveText}>Filter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { width: SW(80) }, activeButton === 2 ? styles.activeButton : styles.inactiveButton]}
              onPress={handleUploadButton}
            >
              <Text style={activeButton === 2 ? styles.activeText : styles.inactiveText}>Upload</Text>
            </TouchableOpacity>
          </View>
          {MydharamsalaData?.length > 0 && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('MyuploadedDharamsala', { DharmshalaData: MydharamsalaData })}
            >
              <Text style={[activeButton === 3 ? styles.activeText : styles.inactiveText]}>Uploaded</Text>
            </TouchableOpacity>
          )}

        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        {/* Image Slider */}
        <View style={styles.sliderContainer}>
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
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
          />
        </View>

        {loading ? renderSkeleton() : (
          <FlatList
            data={dharamsalaData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.DharamSalaList}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <FontAwesome name="building" size={60} color="#ccc" style={{ marginBottom: 15 }} />
                <Text style={styles.emptyText}>No Dharamsala Data Available</Text>
                <Text style={styles.infoText}>Dharamsala listings will appear here once available.</Text>
              </View>
            }
          />
        )}

      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseFilter}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.Filterheader}>
              <TouchableOpacity onPress={handleCloseFilter} style={{ flexDirection: 'row' }}>
                <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                <Text style={Globalstyles.headerText}>Filter</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={resetFilter}>
                <Text style={Globalstyles.headerText}>Reset Filter</Text>
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
              <View>
                <Text style={Globalstyles.title}>Sub-Caste</Text>
                <View>
                  <Dropdown
                    style={[Globalstyles.input]}
                    data={subCasteOptions}
                    labelField="label"
                    valueField="value"
                    value={subcaste}
                    onChange={(text) => handleInputChange("subCaste", text.value)}
                    placeholder="Select Your subCaste"
                    placeholderStyle={{ color: '#E7E7E7' }}
                    autoScroll={false}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => {
                  handleCloseFilter();
                }}
              >
                <Text style={styles.applyButtonText}>See Results</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[
                  styles.crossButton,
                  { top: SH(200) + listHeight + 100 },
                ]}
              >
                <View style={styles.circle}>
                  <Entypo name="cross" size={25} color={Colors.light} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default Dharmshala;