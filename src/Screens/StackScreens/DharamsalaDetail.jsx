import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView, SafeAreaView, StatusBar, Linking, Modal, Dimensions } from 'react-native';
import styles from '../StyleScreens/DharamsalaDetailStyle';
import Colors from '../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AppIntroSlider from 'react-native-app-intro-slider';
import Globalstyles from '../../utils/GlobalCss';
import { DHARMSHALA_ADVERDISE_WINDOW, SAVED_PROFILES } from '../../utils/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SF, SH, SW } from '../../utils/Dimensions';
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
import { showMessage } from 'react-native-flash-message';
const { width, height } = Dimensions.get("window");
import { useSelector } from 'react-redux';
const DharamsalaDetail = ({ navigation, route }) => {
  const { DharamsalaData, _id, isSaved: initialSavedState } = route.params;
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullText, setShowFullText] = useState(false);
  const [Save, setIsSaved] = useState(initialSavedState || false);
  const description = DharamsalaData.description || "No description available.";
  const truncatedDescription = description.slice(0, 300) + "...";
  const [modalVisible, setModalVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
   const notifications = useSelector((state) => state.GetAllNotification.AllNotification);
       const notificationCount = notifications ? notifications.length : 0;
  const formattedImages = DharamsalaData.images.map(img => ({ uri: img }));
  const [slider, setSlider] = useState([]);
  
  const openImageViewer = (index) => {
    setImageIndex(index);
    setModalVisible(true);
  };

  useEffect(() => {
    console.log("DharamsalaData", DharamsalaData);
  }, [])

  // Automatically slide images every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < DharamsalaData.images.length - 1) {
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
    Advertisement_window();
  }, []);


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


  const Advertisement_window = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(DHARMSHALA_ADVERDISE_WINDOW, { headers });

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
          }))
        );

        setSlider(fullSliderData);
        console.log("Slider Data:", fullSliderData);
      } else {
        setSlider([]);
      }
    } catch (error) {
      console.error("Error fetching advertisement:", error);
    } finally {
      setLoading(false);
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
    showMessage({
      type: "info",
      message: "Under development",
      icon:"info"
    });
  };

  const savedProfiles = async () => {
    if (!_id) {
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

      console.log("API Request:", `${SAVED_PROFILES}/${_id}`);

      const response = await axios.post(`${SAVED_PROFILES}/${_id}`, {}, { headers });

      console.log("Response Data:", response?.data);

      // ✅ Ensure response is successful
      if (response.status === 200 && response.data.status === true) {
        showMessage({
          type: "success",
          message: "Success",
          description: response.data.message || "Profile saved successfully!",
        });

        // ✅ Update state correctly based on success message
        setIsSaved(response.data.message.toLowerCase().includes("saved successfully"));
      }
    } catch (error) {
      console.error("API Error:", error?.response ? JSON.stringify(error.response.data) : error.message);

      // ❌ Rollback State If API Fails
      setIsSaved((prev) => !prev);

      showMessage({
        type: "danger",
        message: "Error",
        description: error.response?.data?.message || "Something went wrong!",
        icon:"danger"
      });
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
          <Text style={Globalstyles.headerText}>{DharamsalaData.dharmshalaName}</Text>
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

        {/* Image Slider */}
        <View style={styles.sliderContainer}>
          <AppIntroSlider
            ref={sliderRef}
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
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)"}}>
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
        marginTop:SH(15)
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
                position: "absolute", top:SH(30), alignSelf: "center", backgroundColor: "rgba(0,0,0,0.6)",
                paddingHorizontal: SW(8), borderRadius: 5, paddingVertical: SH(8)
              }}>
                <Text style={{ color: "white", fontSize: SF(16), fontWeight: "bold" }}>{imageIndex + 1} / {formattedImages.length}</Text>
              </View>

              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ position: "absolute", top:SH(40), right:SW(20) }}>
                <Text style={{ color: "white", fontSize: SF(13), fontFamily: "Poppins-Regular" }}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        {/* Dharamsala Details */}
        <View style={styles.textContainer}>
          <View style={styles.TextView}>
            <Text style={[Globalstyles.title, { fontFamily: "Poppins-Bold" }]}>{DharamsalaData.dharmshalaName}</Text>
            <Text style={styles.Text}>{DharamsalaData.subCaste || "N/A"}</Text>
            <Text style={styles.smalltext}>{DharamsalaData.city}</Text>
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

          <TouchableOpacity style={styles.Button} onPress={() => Linking.openURL(`tel:${DharamsalaData.mobileNo}`)}>
            <MaterialIcons name="call" size={20} color={Colors.light} />
            <Text style={styles.RequestText}>Request for call</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.Bottomimage}>
              <AppIntroSlider
                    ref={sliderRef}
                    data={slider}
                    renderItem={({ item }) => {
                        const { width, height } = item.resolution;
                        return (
                            <Image
                                source={{ uri: item.image }}
                                style={{
                                    width,
                                    height,
                                }}
                            />
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
