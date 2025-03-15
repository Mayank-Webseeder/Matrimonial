import { Text, View, FlatList, TouchableOpacity, TextInput, Modal, ScrollView, SafeAreaView, StatusBar, Linking, Pressable, ActivityIndicator,
  ToastAndroid
 } from 'react-native';
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
import { GET_ALL_DHARAMSALA } from '../../utils/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import ImageViewing from 'react-native-image-viewing';

const Dharmshala = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [locality, setLocality] = useState('');
  const [activeButton, setActiveButton] = useState(null);
  const [subcaste, setSubcaste] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listHeight, setListHeight] = useState(0);
  const [daramsalaData, setDharamsalaData] = useState([]);
  const [modalLocality, setModalLocality] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const MyActivistProfile = useSelector((state) => state.activist.activist_data);
  const [isImageVisible, setImageVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openImageViewer = (imageUri) => {
    setSelectedImage(imageUri);
    setImageVisible(true);
  };

  const handleInputChange = (text) => {
    setSubcaste(text);
    if (text.trim() === '') {
      setFilteredOptions([]); // Clear suggestions if input is empty
    } else {
      const filtered = subCasteOptions.filter((option) =>
        option.label.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  };

  const handleOptionSelect = (value) => {
    setSubcaste(value.label);
    setFilteredOptions([]); // Clear suggestions after selection
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


  const fetchDharamsalaData = async (filterType = "search") => {
    try {
      setLoading(true);
      setDharamsalaData([]); // Clear old data before fetching new data
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

      const url = filterType === "all" ? GET_ALL_DHARAMSALA : `${GET_ALL_DHARAMSALA}?${queryParams.join("&")}`;

      console.log("Fetching Data from:", url);

      const response = await axios.get(url, { headers });

      console.log("Response Data:", JSON.stringify(response.data.data));

      if (response.data && response.data.data.length > 0) {
        setDharamsalaData(response.data.data);
      } else {
        setDharamsalaData([]);
        setError("No Dharamsala profiles found."); // Set the error message when no data is found
      }
    } catch (error) {
      console.error("Error fetching Dharamsala data:", error);
      setError(error.response ? error.response.data.message : "Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  useFocusEffect(
    React.useCallback(() => {
      setLocality('');
      setSubcaste('');
      setDharamsalaData([]);  // Reset data before fetching
      fetchDharamsalaData("all"); // Fetch full list by default
    }, [])
  );


  const handleUploadButton = () => {
    if (MyActivistProfile && MyActivistProfile._id) {
      ToastAndroid.show(
        "You can fill details!", 
        ToastAndroid.SHORT
      );
      setActiveButton(2);
      navigation.navigate('DharamsalaSubmissionPage');
    } else {
      ToastAndroid.show(
        "Only activists can fill details!", 
        ToastAndroid.SHORT
      );
    }
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.card}
      >
        <Pressable style={styles.cardData} onPress={() => navigation.navigate("DharamsalaDetail", { DharamsalaData: item })} >
          <TouchableOpacity onPress={() => openImageViewer(item.images?.[0])}>
            <Image
              source={item.images?.[0] ? { uri: item.images?.[0] } : require('../../Images/NoImage.png')}
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
            <Text style={styles.text}>{item.dharmshalaName}</Text>
            <Text style={[styles.smalltext, { fontFamily: 'Poppins-Medium' }]}>
              {item.subCaste}
            </Text>
            <Text style={styles.smalltext}>{item.city}</Text>
          </View>
        </Pressable>
        <View style={styles.sharecontainer}>
          <View style={styles.iconContainer}>
            <FontAwesome name="bookmark-o" size={18} color={Colors.dark} />
            <Text style={styles.iconText}>Save</Text>
          </View>

          <View style={styles.iconContainer}>
            <Feather name="send" size={18} color={Colors.dark} />
            <Text style={styles.iconText}>Shares</Text>
          </View>
          <TouchableOpacity style={styles.Button} onPress={() => Linking.openURL(`tel:${item.mobileNo}`)}>
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
    setLocality('');
    setModalLocality('');
    setSubcaste('');
    setDharamsalaData([]);
    fetchDharamsalaData("modal");
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons
              name="arrow-back-ios-new"
              size={25}
              color={Colors.theme_color}
            />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Dharmshala</Text>
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

      <View>
        {/* Search and Filter Section */}
        <View style={styles.searchContainer}>
          <View style={styles.searchbar}>
            <TextInput
              placeholder='Search in Your City'
              placeholderTextColor="gray"
              value={locality}
              onChangeText={(text) => {
                setLocality(text);
                fetchDharamsalaData("search");
              }}
              style={{ fontSize: SF(13) }}
            />
            {locality.length > 0 ? (
              <AntDesign name={'close'} size={20} color={'gray'} onPress={() => {
                setLocality('');
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Dharmshala' }],
                });
              }} />
            ) : (
              <AntDesign name={'search1'} size={20} color={'gray'} onPress={() => fetchDharamsalaData("search")} />
            )}
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
            style={[styles.button, activeButton === 2 ? styles.activeButton : styles.inactiveButton]}
            onPress={handleUploadButton}
          >
            <Text style={activeButton === 2 ? styles.activeText : styles.inactiveText}>Upload</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
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
        {/* Dharamsala List */}
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
        ) : daramsalaData.length === 0 ? (
          <Text style={{
            textAlign: 'center', fontSize: SF(15),
            color: Colors.gray, marginTop: SH(20),
            fontFamily: 'Poppins-Regular',
          }}>
            No Dharamsala profiles found.
          </Text>
        ) : (
          <FlatList
            data={daramsalaData}
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
                  fetchDharamsalaData();
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

export default Dharmshala;