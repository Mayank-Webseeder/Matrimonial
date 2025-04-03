
import { Text, View, FlatList, TouchableOpacity, TextInput, Modal, ScrollView, SafeAreaView, StatusBar, Linking, Pressable } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { slider } from '../../DummyData/DummyData';
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/CommunityStyle'
import Colors from '../../utils/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AppIntroSlider from 'react-native-app-intro-slider';
import { subCasteOptions } from '../../DummyData/DropdownData';
import Globalstyles from '../../utils/GlobalCss';
import Entypo from 'react-native-vector-icons/Entypo';
import { SH, SF } from '../../utils/Dimensions';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { GET_ALL_COMITTEE, GET_COMMIITEE, SAVED_PROFILES } from '../../utils/BaseUrl';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageViewing from 'react-native-image-viewing';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { SW } from '../../utils/Dimensions';
import _ from "lodash";

const Committee = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [locality, setLocality] = useState('');
  const [activeButton, setActiveButton] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [subcaste, setSubcaste] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listHeight, setListHeight] = useState(0);
  const MyActivistProfile = useSelector((state) => state.activist.activist_data);
  const [committeeData, setCommitteeData] = useState([]);
  const [MycommitteeData, setMyCommitteeData] = useState([]);
  const [modalLocality, setModalLocality] = useState('');
  const [error, setError] = useState(null);
  const [isImageVisible, setImageVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);

  const showToast = _.debounce((type, text1, text2) => {
    Toast.show({ type, text1, text2, position: "top" });
  }, 500);


  const openImageViewer = (imageUri) => {
    setSelectedImage(imageUri);
    setImageVisible(true);
  };

  const handleInputChange = (text) => {
    setSubcaste(text);
    if (text.trim() === '') {
      setFilteredOptions([]);
    } else {
      const filtered = subCasteOptions.filter((option) =>
        option.label.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  };

  const handleOptionSelect = (value) => {
    setSubcaste(value.label);
    setFilteredOptions([]);
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

  const SliderRenderItem = ({ item }) => {
    return (
      <View>
        <Image source={item.image} style={styles.sliderImage} />
      </View>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      setLocality('');
      setSubcaste('');
      fetchComitteeData("all");
      fetchMyCommitteeData();
    }, [])
  );
  const fetchMyCommitteeData = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("userToken");

      if (!token) throw new Error("Authorization token is missing");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      console.log("🔹 Fetching committees...");
      const response = await axios.get(GET_COMMIITEE, { headers });

      console.log("✅ Fetch Success:", response.data.data);

      if (response.status === 200 && response.data.status === true) {
        setMyCommitteeData(response.data.data);
      } else {
        throw new Error(response.data.message || "Failed to fetch data.");
      }
    } catch (error) {
      console.error("🚨 Error fetching committee data:", error?.response?.data || error.message);
      setMyCommitteeData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComitteeData = async (filterType = "search") => {
    try {
      setLoading(true);
      setCommitteeData([]);
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


      const url = filterType === "all" ? GET_ALL_COMITTEE : `${GET_ALL_COMITTEE}?${queryParams.join("&")}`;

      console.log("Fetching Data from:", url);

      const response = await axios.get(url, { headers });
      console.log("response", response.data);

      if (response.data && response.data.data.length > 0) {
        setCommitteeData(response.data.data);
      } else {
        setCommitteeData([]);
        setError("No Committee data found."); 
      }
    } catch (error) {
      console.error("Error fetching committee data:", error);
      setError(error.response ? error.response.data.message : "Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      navigation.navigate("CommitteeSubmissionPage");
    } else {
      Toast.show({
        type: "info",
        text1: "You are not an activist!",
        text2: "Create an activist profile if you want to upload a committee.",
        position: "bottom",
        visibilityTime: 4000,
        autoHide: true,
      });
    }
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
    setCommitteeData((prevProfiles) =>
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
        Toast.show({
          type: "success",
          text1: "Success",
          text2: response.data?.message || "Profile saved successfully!",
          position: "top",
        });
      } else {
        throw new Error(response.data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(
        "API Error:",
        error?.response ? JSON.stringify(error.response.data) : error.message
      );

      Toast.show({
        type: "error",
        text1: "Error",
        text2: error?.response?.data?.message || "Failed to save profile!",
        position: "top",
      });
      setCommitteeData((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile._id === _id ? { ...profile, isSaved: !profile.isSaved } : profile
        )
      );
    }
  };

  const handleShare = async () => {
    showToast("info", "Info", "Under development");
  };

  const renderItem = ({ item }) => {
    const isSaved = item.isSaved || false;

    return (
      <View style={styles.card}>
        <Pressable style={styles.cardData}>
          <TouchableOpacity onPress={() => openImageViewer(item.photoUrl)}>
            <Image
              source={item.photoUrl ? { uri: item.photoUrl } : require('../../Images/NoImage.png')}
              style={styles.image}
            />
          </TouchableOpacity>

          {/* Image Viewer Modal */}
          {selectedImage === item.photoUrl && (
            <ImageViewing
              images={[{ uri: selectedImage }]}
              imageIndex={0}
              visible={isImageVisible}
              onRequestClose={() => setImageVisible(false)}
            />
          )}

          <View style={styles.leftContainer}>
            <Text style={styles.title}>{item.committeeTitle}</Text>
            <Text style={styles.Nametext}>President - {item.presidentName}</Text>
            <View style={styles.CityArea}>
              <Text style={styles.text}>{item.city}</Text>
              <Text style={styles.text}>{item.subCaste}</Text>
            </View>
            <Text style={styles.text}>{item.area}</Text>
          </View>
        </Pressable>

        <View style={styles.sharecontainer}>
          {/* Bookmark Button */}
          <TouchableOpacity style={styles.iconContainer} onPress={() => savedProfiles(item._id)}>
            <FontAwesome
              name={item.isSaved ? "bookmark" : "bookmark-o"}
              size={19}
              color={Colors.dark}
            />
            <Text style={styles.iconText}>{item.isSaved ? "Saved" : "Save"}</Text>
          </TouchableOpacity>


          {/* Share Button */}
          <TouchableOpacity style={styles.iconContainer} onPress={handleShare}>
            <Feather name="send" size={18} color={Colors.dark} />
            <Text style={styles.iconText}>Share</Text>
          </TouchableOpacity>

          {/* Call Button */}
          <TouchableOpacity style={styles.Button} onPress={() => Linking.openURL(`tel:${item.mobileNo}`)}>
            <MaterialIcons name="call" size={17} color={Colors.light} />
            <Text style={styles.RequestText}>Request for call</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  const handleOpenFilter = () => {
    setModalVisible(true);
  };

  const handleCloseFilter = () => {
    setModalVisible(false);
    setLocality('');
    setModalLocality('');
    setSubcaste('');
    setCommitteeData([]);
    fetchComitteeData("modal");
  };

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
          <TouchableOpacity onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: "MainApp" }],
            });
          }}>
            <MaterialIcons
              name="arrow-back-ios-new"
              size={25}
              color={Colors.theme_color}
            />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Committee</Text>
        </View>
        <View style={styles.righticons}>
          <AntDesign
            name={'bells'}
            size={25}
            color={Colors.theme_color}
            onPress={() => {
              navigation.navigate('Notification');
            }}
          />
        </View>
      </View>
      <View style={styles.fixedHeader}>
        <View style={styles.searchbar}>
          <TextInput
            placeholder="Search in Your city"
            value={locality}
            onChangeText={(text) => setLocality(text)}
            onSubmitEditing={() => fetchComitteeData("search")}
            placeholderTextColor={"gray"}
            style={{ flex: 1 }}
            autoComplete="off"
            textContentType="none"
          />
          {locality.length > 0 ? (
            <AntDesign name={'close'} size={20} color={'gray'} onPress={() => {
              setLocality('');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Committee' }],
              });
            }} />
          ) : (
            <AntDesign name={'search1'} size={20} color={'gray'} onPress={() => fetchComitteeData("search")} />
          )}
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
          {MycommitteeData?.length > 0 && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('MyUploadedCommittees', { committeeData: MycommitteeData })}
            >
              <Text style={[activeButton === 3 ? styles.activeText : styles.inactiveText]}>Uploaded</Text>
            </TouchableOpacity>
          )}

        </View>

      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sliderContainer}>
          <AppIntroSlider
            ref={sliderRef}
            data={slider}
            renderItem={SliderRenderItem}
            showNextButton={false}
            showDoneButton={false}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            onSlideChange={(index) => setCurrentIndex(index)}
          />
        </View>
        {isLoading ? renderSkeleton() : (
          <FlatList
            data={committeeData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.panditListData}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No committeeData Available</Text>
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
                  autoComplete="off"
                  textContentType="none"
                />

              </View>
              <View>
                <Text style={Globalstyles.title}>Sub-Caste</Text>
                <View>
                  <TextInput
                    value={subcaste}
                    onChangeText={handleInputChange}
                    placeholder="Type your caste"
                    placeholderTextColor={Colors.gray}
                    style={Globalstyles.input}
                    autoComplete="off"
                    textContentType="none"
                  />
                  {filteredOptions.length > 0 && (
                    <FlatList
                      data={filteredOptions.slice(0, 2)}
                      scrollEnabled={false}
                      keyExtractor={(item) => item.value}
                      style={[Globalstyles.suggestions, { marginBottom: 10 }]}
                      renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleOptionSelect(item)}>
                          <Text style={styles.label}>{item.label}</Text>
                        </TouchableOpacity>
                      )}
                      onLayout={(event) => {
                        const height = event.nativeEvent.layout.height;
                        setListHeight(height);
                      }}
                    />
                  )}
                </View>
              </View>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => {
                  fetchComitteeData();
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
        </View>
      </Modal>
      <Toast />
    </SafeAreaView>
  );
};

export default Committee;

