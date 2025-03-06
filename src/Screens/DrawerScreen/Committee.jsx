
import { Text, View, FlatList, TouchableOpacity, TextInput, Modal, ScrollView, SafeAreaView, StatusBar, Linking, Pressable, ActivityIndicator } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { slider } from '../../DummyData/DummyData';
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/CommunityStyle';
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
import { GET_ALL_COMITTEE, SAVED_PROFILES } from '../../utils/BaseUrl';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageViewing from 'react-native-image-viewing';


const Committee = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [locality, setLocality] = useState('');
  const [activeButton, setActiveButton] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subcaste, setSubcaste] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listHeight, setListHeight] = useState(0);
  const MyActivistProfile = useSelector((state) => state.activist.activist_data);
  const [committeeData, setCommitteeData] = useState([]);
  const [modalLocality, setModalLocality] = useState('');
  const [error, setError] = useState(null);

  const [isImageVisible, setImageVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  useFocusEffect(
    React.useCallback(() => {
      setLocality('');
      setSubcaste('');
      setCommitteeData([]); // Reset previous data
      fetchComitteeData("all"); // Fetch full list when coming back
    }, [])
  );

  const fetchComitteeData = async (filterType = "search") => {
    try {
      setLoading(true);
      setCommitteeData([]); // Clear old data before fetching new data
      setError(null); // Reset error

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
        if (cleanedModalLocality) queryParams.push(`locality=${encodeURIComponent(cleanedModalLocality.toLowerCase())}`);
        if (cleanedModalSubCaste) {
          const isCustomSubCaste = !subCasteOptions.some(option => option.label.toLowerCase() === cleanedModalSubCaste.toLowerCase());
          queryParams.push(`subCaste=${encodeURIComponent(isCustomSubCaste ? cleanedModalSubCaste : '')}`);
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
        setError("No Committee data found."); // Set an error message when no data is found
      }
    } catch (error) {
      console.error("Error fetching committee data:", error);
      setError(error.response ? error.response.data.message : "Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const SliderRenderItem = ({ item }) => {
    return (
      <View>
        <Image source={item.image} style={styles.sliderImage} />
      </View>
    );
  };


  // const savedProfiles = async (_id) => {
  //   console.log("_id",_id);
  //   if (!_id) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Error",
  //       text2: "User ID not found!",
  //     });
  //     return;
  //   }

  //   try {
  //     const token = await AsyncStorage.getItem("userToken");
  //     if (!token) {
  //       throw new Error("No token found");
  //     }

  //     const headers = {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     };

  //     const response = await axios.post(
  //       `${SAVED_PROFILES}/${_id}`, 
  //       {}, 
  //       { headers }
  //     );

  //     console.log("Response Data:", JSON.stringify(response?.data));

  //     if (response?.data?.message) {
  //       Toast.show({
  //         type: "success",
  //         text2: response.data.message,
  //         position: "top",
  //         visibilityTime: 3000,
  //         textStyle: { fontSize: 14, color: "green" },
  //       });
  //     } else {
  //       Toast.show({
  //         type: "error",
  //         text1: "Error",
  //         text2: response.data.message || "Something went wrong!",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(
  //       "API Error:",
  //       error?.response ? JSON.stringify(error.response.data) : error.message
  //     );
  //     Toast.show({
  //       type: "error",
  //       text1: "Error",
  //       text2: error.response?.data?.message || "Failed to save profile!",
  //     });
  //   }
  // };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Pressable style={styles.cardData}>
        <TouchableOpacity onPress={() => openImageViewer(item.photoUrl)}>
          <Image
            source={item.photoUrl ? { uri: item.photoUrl } : require('../../Images/NoImage.png')}
            style={styles.image}
          />
        </TouchableOpacity>

        {/* Image Viewer Modal */}
        {selectedImage && (
          <ImageViewing
            images={[{ uri: selectedImage }]} // Now, it correctly updates per click
            imageIndex={0}
            visible={isImageVisible}
            onRequestClose={() => setImageVisible(false)}
          />
        )}
        <View style={styles.leftContainer}>
          <Text style={styles.title}>{item.committeeTitle}</Text>
          <Text style={styles.Nametext}>{item.presidentName}</Text>
          <View style={styles.CityArea}>
            <Text style={styles.text}>{item.city}</Text>
            <Text style={styles.text}>{item.subCaste}</Text>
          </View>
          <Text style={styles.text}>{item.area}</Text>
        </View>
      </Pressable>
      <View style={styles.sharecontainer}>
        {/* onPress={() => savedProfiles(item._id)} */}
        <TouchableOpacity style={styles.iconContainer}>
          <FontAwesome name="bookmark-o" size={18} color={Colors.dark} />
          <Text style={styles.iconText}>Save</Text>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <Feather name="send" size={18} color={Colors.dark} />
          <Text style={styles.iconText}>Shares</Text>
        </View>
        <TouchableOpacity style={styles.Button} onPress={() => Linking.openURL(`tel:${item.mobileNo}`)}>
          <MaterialIcons name="call" size={17} color={Colors.light} />
          <Text style={styles.RequestText}>Request for call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );


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
  const handleUploadButton = () => {
    if (MyActivistProfile && MyActivistProfile._id) {
      Toast.show(
        {
          type: "success",
          text1: "You have an activist account",
          text2: "You can upload your committee details"
        }
      )
      setActiveButton(2);
      navigation.navigate('CommitteeSubmissionPage');
    } else {
      Toast.show(
        {
          type: "error",
          text1: "Please create an activist profile first!"
        }
      )
    }
  };

  return (
    <SafeAreaView style={Globalstyles.container} showsVerticalScrollIndicator={false}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {/* Fixed Header */}
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
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

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.searchbar}>
            <TextInput
              placeholder='Search in Your City'
              placeholderTextColor="gray"
              value={locality}
              onChangeText={(text) => {
                setLocality(text);
                fetchComitteeData("search");
              }}
              style={{ fontSize: SF(13) }}
            />
            <AntDesign name={'search1'} size={20} color={'gray'} />
          </View>
          {/* Image Slider */}
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
        </View>

        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            style={[styles.button, activeButton === 1 ? styles.activeButton : styles.inactiveButton]}
            onPress={handleOpenFilter}
          >
            <Text style={activeButton === 1 ? styles.activeText : styles.inactiveText}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, MyActivistProfile?._id ? styles.activeButton : styles.inactiveButton]}
            onPress={handleUploadButton}
            disabled={!MyActivistProfile?._id}
          >
            <Text style={MyActivistProfile?._id ? styles.activeText : styles.inactiveText}>
              Upload
            </Text>
          </TouchableOpacity>

        </View>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.theme_color} style={{ marginTop: 20 }} />
        ) : error ? (
          <Text style={{
            textAlign: 'center', fontSize: SF(15),
            color: Colors.gray,
            fontFamily: 'Poppins-Regular', marginTop: SH(20)
          }}>
            {error} {/* This will show error messages */}
          </Text>
        ) : committeeData.length === 0 ? (
          <Text style={{
            textAlign: 'center', fontSize: SF(15),
            color: Colors.gray, marginTop: SH(20),
            fontFamily: 'Poppins-Regular',
          }}>
            No Committee data found.
          </Text>
        ) : (
          <FlatList
            data={committeeData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.DharamSalaList}
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
    </SafeAreaView>
  );
};

export default Committee;

