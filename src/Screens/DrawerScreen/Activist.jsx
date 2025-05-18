import { Text, View, FlatList, TouchableOpacity, TextInput, Modal, Linking, SafeAreaView, StatusBar, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import React, { useState, useCallback } from 'react';
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/ActivistStyle';
import Colors from '../../utils/Colors';
import { subCasteOptions } from '../../DummyData/DropdownData';
import Globalstyles from '../../utils/GlobalCss';
import Entypo from 'react-native-vector-icons/Entypo';
import { SH, SW, SF } from '../../utils/Dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { GET_ACTIVIST, GET_ACTIVIST_PROFILES } from '../../utils/BaseUrl';
import { DrawerActions, useFocusEffect } from '@react-navigation/native';
import ImageViewing from 'react-native-image-viewing';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { resetsetActivistdata, setActivistdata } from '../../ReduxStore/Slices/ActivistSlice';
import { useDispatch } from 'react-redux';

const Activist = ({ navigation }) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [activistData, setActivistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subcaste, setSubcaste] = useState('');
  const [locality, setLocality] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [listHeight, setListHeight] = useState(0);
  const [modalLocality, setModalLocality] = useState('');
  const [isImageVisible, setImageVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const MyActivistProfile = useSelector((state) => state.activist.activist_data) || {};
  const notifications = useSelector((state) => state.GetAllNotification.AllNotification);
  const notificationCount = notifications ? notifications.length : 0;
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activitData, setActivitData] = useState({});

  const openImageViewer = (imageUri) => {
    setSelectedImage(imageUri);
    setImageVisible(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log("MyActivistProfile", MyActivistProfile);
      setLocality('');
      setSubcaste('');
      setError(null);
      fetchActivistData("all");
      getActivistProfile();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLocality('');
      setSubcaste('');
      setError(null);
      fetchActivistData("all");
      getActivistProfile();
    }, 2000);
  }, []);


  const getActivistProfile = async () => {
    try {
      setActivitData({});
      setIsLoading(true);

      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(GET_ACTIVIST, { headers });
      console.log("Activist data", JSON.stringify(response.data));

      if (response.data && response.data.data) {
        const fetchedData = response.data.data;
        setActivitData(fetchedData);
        dispatch(setActivistdata(fetchedData));
      } else {
        setActivitData({});
        dispatch(setActivistdata({}));
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching activist data:", errorMsg);

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
      if (error.response && error.response.status === 400) {
        dispatch(resetsetActivistdata());
      }
    } finally {
      setIsLoading(false);
    }
  };


  const fetchActivistData = async (filterType = "search") => {
    try {
      setLoading(true);
      setActivistData([]);
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

      const url = queryParams.length > 0 ? `${GET_ACTIVIST_PROFILES}?${queryParams.join("&")}` : GET_ACTIVIST_PROFILES;

      console.log("Fetching Data from:", url);

      const response = await axios.get(url, { headers });

      console.log("Response Data:", JSON.stringify(response.data.data));

      if (response.data && response.data.data.length > 0) {
        setActivistData(response.data.data);
      } else {
        setActivistData([]);
        setError("No activist profiles found.");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching activist data:", errorMsg);

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
      setError(errorMsg || "Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleOpenFilter = () => {
    setModalVisible(true);
  };

  const handleCloseFilter = () => {
    setModalVisible(false);
    setLocality('');
    setModalLocality('');
    setSubcaste('');
    setActivistData([]);
    fetchActivistData("modal");
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

  const renderSkeleton = () => (
    <SkeletonPlaceholder>
      <View style={{ margin: SH(20) }}>
        {[1, 2, 3, 4].map((_, index) => (
          <View key={index} style={{ flexDirection: "row", marginBottom: SH(20) }}>
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
    return (
      <View style={styles.card}>
        <View style={styles.cardData}>
          <TouchableOpacity onPress={() => openImageViewer(item.profilePhoto)}>
            <Image
              source={item.profilePhoto ? { uri: item.profilePhoto } : require('../../Images/NoImage.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          {selectedImage && (
            <ImageViewing
              images={[{ uri: selectedImage }]}
              imageIndex={0}
              visible={isImageVisible}
              onRequestClose={() => setImageVisible(false)}
            />
          )}
          <View style={{ marginLeft: SW(10) }}>
            {item?.fullname && <Text style={styles.text}>{item.fullname}</Text>}

            {item?.subCaste && <Text style={styles.smalltext}>{item.subCaste}</Text>}

            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
              {item?.city && <Text style={styles.smalltext}>{item.city}</Text>}
              {item?.activistId && <Text style={styles.IDText}>Id : {item.activistId}</Text>}
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity style={styles.Button} onPress={() => Linking.openURL(`tel:${item.mobileNo}`)}>
            <Text style={styles.buttonText}>Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View>
        <View style={Globalstyles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <MaterialIcons name={'arrow-back-ios-new'} size={25} color={Colors.theme_color} />
            </TouchableOpacity>
            <Text style={Globalstyles.headerText}>Activist</Text>
          </View>
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
        <View>
          <View style={styles.searchbar}>
            <TextInput
              placeholder='Search in Your City'
              placeholderTextColor="gray"
              value={locality}
              onChangeText={(text) => {
                setLocality(text);
                fetchActivistData("search");
              }}
            />

            {locality.length > 0 ? (
              <AntDesign
                name={'close'}
                size={20}
                color={'gray'}
                onPress={() => {
                  setLocality('');
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Activist' }],
                  });
                }}
              />
            ) : (
              <AntDesign name={'search1'} size={20} color={'gray'} onPress={() => fetchActivistData("search")} />
            )}
          </View>

          <View style={styles.ButtonContainer}>
            <TouchableOpacity style={[styles.button, { paddingHorizontal: SW(20) }]} onPress={handleOpenFilter}>
              <Text style={styles.buttonText}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ActivistForm')}
            >
              <Text style={styles.buttonText}>
                {Object.keys(MyActivistProfile).length > 0 ? "Update Profile" : "Be an Activist"}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>

        {loading ? renderSkeleton() : (
          <FlatList
            data={activistData}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.ActivistDataList}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <FontAwesome name="user" size={60} color="#ccc" style={{ marginBottom: 15 }} />
                <Text style={styles.emptyText}>No Activist Data Available</Text>
                <Text style={styles.infoText}>Activist profiles will appear here once available.</Text>
              </View>
            }
          />
        )}

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
                        keyExtractor={(item) => item?.value}
                        style={[Globalstyles.suggestions, { marginBottom: 10 }]}
                        renderItem={({ item }) => (
                          <TouchableOpacity onPress={() => handleOptionSelect(item)}>
                            <Text style={styles.label}>{item?.label}</Text>
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
                    fetchActivistData();
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Activist;
