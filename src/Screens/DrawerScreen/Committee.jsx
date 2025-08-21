
import { Text, View, FlatList, TouchableOpacity, TextInput, Modal, ScrollView, SafeAreaView, StatusBar, Linking, Pressable, RefreshControl, BackHandler, Share } from 'react-native';
import React, { useState, useRef, useEffect, useCallback } from 'react';
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
import { DeepLink, GET_ALL_COMITTEE, GET_COMMIITEE, SAVED_PROFILES, TOP_COMMITTEE_ADVERDISE_WINDOW } from '../../utils/BaseUrl';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { SW } from '../../utils/Dimensions';
import _ from 'lodash';
import { showMessage } from 'react-native-flash-message';
import { Dropdown } from 'react-native-element-dropdown';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

const Committee = ({ navigation, route }) => {
  const { id } = route.params || {};
  const insets = useSafeAreaInsets();
  const flatListRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [locality, setLocality] = useState('');
  const [activeButton, setActiveButton] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [subcaste, setSubcaste] = useState('');
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
  const [selectedImage, setSelectedImage] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const notifications = useSelector((state) => state.GetAllNotification.AllNotification);
  const notificationCount = notifications ? notifications.length : 0;
  const [slider, setSlider] = useState([]);


  useEffect(() => {
    fetchComitteeData('all');
    Advertisement_window();
  }, []);

  useEffect(() => {
    if (committeeData?.isSaved !== undefined) {
      setIsSaved(committeeData.isSaved);
    }
  }, [committeeData?.isSaved]);

  useEffect(() => {
    if (id && committeeData?.length) {
      const index = committeeData.findIndex((item) => item._id === id);
      if (index !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({ index, animated: true });
      }
    }
  }, [id, committeeData]);

  const clearFiltersAndFetch = () => {
    setLocality('');
    setSubcaste('');
    fetchComitteeData('all');
    fetchMyCommitteeData();
    Advertisement_window();
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      clearFiltersAndFetch();
    }, 2000);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchMyCommitteeData();
      Advertisement_window();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
          clearFiltersAndFetch();
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainApp' }],
          });
          clearFiltersAndFetch();
        }
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation])
  );

  const fetchMyCommitteeData = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('userToken');

      if (!token) {
        showMessage({
          type: 'danger',
          message: 'Authentication Error',
          description: 'No token found. Please log in again.',
          duration: 5000,
        });

        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthStack' }],
        });
        return;
      }
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      console.log('🔹 Fetching committees...');
      const response = await axios.get(GET_COMMIITEE, { headers });

      console.log('✅ Fetch Success:', response.data.data);

      if (response.status === 200 && response.data.status === true) {
        setMyCommitteeData(response.data.data);
      } else {
        throw new Error(response.data.message || 'Failed to fetch data.');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error('Error fetching committee data:', errorMsg);

      const sessionExpiredMessages = [
        'User does not Exist....!Please login again',
        'Invalid token. Please login again',
        'Token has expired. Please login again',
      ];

      if (sessionExpiredMessages.includes(errorMsg)) {
        await AsyncStorage.removeItem('userToken');
        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthStack' }],
        });
      }
      setMyCommitteeData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComitteeData = async (filterType = 'search') => {
    try {
      setLoading(true);
      setCommitteeData([]);
      setError(null);

      const token = await AsyncStorage.getItem('userToken');
      if (!token) { throw new Error('No token found'); }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      let queryParams = [];

      if (filterType === 'search') {
        const cleanedLocality = locality.trim();
        const cleanedSubCaste = subcaste.trim();

        if (cleanedLocality) { queryParams.push(`locality=${encodeURIComponent(cleanedLocality.toLowerCase())}`); }
        if (cleanedSubCaste) { queryParams.push(`subCaste=${encodeURIComponent(cleanedSubCaste.toLowerCase())}`); }
      } else if (filterType === 'modal') {
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


      const url = filterType === 'all' ? GET_ALL_COMITTEE : `${GET_ALL_COMITTEE}?${queryParams.join('&')}`;

      console.log('Fetching Data from:', url);

      const response = await axios.get(url, { headers });
      console.log('response', response.data);

      if (response.data && response.data.data.length > 0) {

        setCommitteeData(response.data.data);

      } else {
        setCommitteeData([]);
        setError('No Committee data found.');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error('Error fetching committee data:', errorMsg);

      const sessionExpiredMessages = [
        'User does not Exist....!Please login again',
        'Invalid token. Please login again',
        'Token has expired. Please login again',
      ];

      if (sessionExpiredMessages.includes(errorMsg)) {
        await AsyncStorage.removeItem('userToken');
        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthStack' }],
        });
      }
      setError(errorMsg || 'Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Advertisement_window = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) { throw new Error('No token found'); }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(TOP_COMMITTEE_ADVERDISE_WINDOW, { headers });

      if (response.data) {
        const fetchedData = response.data.data;
        console.log('fetchedData', JSON.stringify(fetchedData));

        const fullSliderData = fetchedData.flatMap((item) =>
          item.media.map((mediaItem) => ({
            id: `${item._id}_${mediaItem._id}`,
            title: item.title,
            description: item.description,
            image: `https://api-matrimonial.webseeder.tech/${mediaItem.mediaUrl}`,
            resolution: mediaItem.resolution,
            hyperlink: mediaItem.hyperlink,
            duration: mediaItem.duration || 4,
          }))
        );

        setSlider(fullSliderData);
        console.log('Slider Data:', fullSliderData);
      } else {
        setSlider([]);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error('Error fetching advertisement:', errorMsg);

      const sessionExpiredMessages = [
        'User does not Exist....!Please login again',
        'Invalid token. Please login again',
        'Token has expired. Please login again',
      ];

      if (sessionExpiredMessages.includes(errorMsg)) {
        await AsyncStorage.removeItem('userToken');
        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthStack' }],
        });
      }
    }
  };

  const openImageViewer = (imageUri) => {
    if (imageUri) {
      setSelectedImage([{ url: imageUri }]);
      setImageVisible(true);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === 'subCaste') {
      setSubcaste(value);
    }
  };


  useEffect(() => {
    if (slider.length === 0) { return; }

    const currentSlide = slider[currentIndex];
    const durationInSeconds = Number(currentSlide?.duration) || 4;
    const bufferMs = 800;
    const durationInMilliseconds = durationInSeconds * 1000 + bufferMs;
    console.log('durationInSeconds', durationInSeconds);
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
          <View key={index} style={{ flexDirection: 'row', marginBottom: 20 }}>
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
      navigation.navigate('CommitteeSubmissionPage');
    } else {
      showMessage({
        type: 'info',
        message: 'You are not an activist!',
        description: 'Create an activist profile if you want to upload a committee.',
        duarion: 5000,
        autoHide: true,
        icon: 'info',
      });
    }
  };



  const savedProfiles = async (_id) => {
    if (!_id) {
      showMessage({
        type: 'danger',
        message: 'Error',
        description: 'User ID not found!',
        icon: 'danger',
        duarion: 5000,
      });
      return;
    }
    const toggleIsSaved = (prev) =>
      prev.map((profile) =>
        profile._id === _id ? { ...profile, isSaved: !profile.isSaved } : profile
      );
    setCommitteeData(toggleIsSaved);

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('No token found');
      }

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${SAVED_PROFILES}/${_id}`, {}, { headers });

      console.log('Response Data:', JSON.stringify(response?.data));

      if (response.status === 200 && response.data.status === true) {
        showMessage({
          type: 'success',
          message: 'Success',
          description: response.data?.message || 'Profile saved successfully!',
          icon: 'success',
          duarion: 5000,
        });
      } else {
        throw new Error(response.data?.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error(
        'API Error:',
        error?.response ? JSON.stringify(error.response.data) : error.message
      );

      showMessage({
        type: 'danger',
        message: 'Error',
        description: error?.response?.data?.message || 'Failed to save profile!',
        icon: 'danger',
        duarion: 5000,
      });

      const revertToggle = (prev) =>
        prev.map((profile) =>
          profile._id === _id ? { ...profile, isSaved: !profile.isSaved } : profile
        );

      setCommitteeData(revertToggle)

    }
  };

  const handleShare = async (profileId) => {
    const profileType = 'committee';

    console.log('profileId:', profileId);

    try {
      if (!profileId) { throw new Error('Missing profile ID'); }

      const directLink = `${DeepLink}/${profileType}/${profileId}`;

      await Share.share({
        message: `Check this profile in Brahmin Milan app:\n${directLink}`,
      });
    } catch (error) {
      console.error('Sharing failed:', error?.message || error);
    }
  };


  const renderItem = ({ item }) => {
    const isHighlighted = item._id === id;

    return (
      <View style={[styles.card, isHighlighted && styles.highlightedCard]}>
        <Pressable style={styles.cardData}>
          <TouchableOpacity onPress={() => openImageViewer(item.photoUrl)}>
            <FastImage
              style={styles.image}
              source={
                item?.photoUrl
                  ? {
                    uri: item.photoUrl,
                    priority: FastImage.priority.normal,
                    cache: FastImage.cacheControl.immutable,
                  }
                  : require('../../Images/NoImage.png')
              }
              resizeMode={FastImage.resizeMode.cover}
            />
          </TouchableOpacity>
          <View style={styles.leftContainer}>
            <Text style={styles.title}>{item?.committeeTitle}</Text>
            <Text style={styles.Nametext}>President - {item?.presidentName}</Text>
            <View style={styles.CityArea}>
              <Text style={[styles.text, { fontFamily: 'Poppins-Bold' }]}>{item?.city}</Text>
              <Text style={styles.text}>{item?.subCaste}</Text>
            </View>
            <Text style={styles.text}>{item?.area}</Text>
          </View>
        </Pressable>

        <View style={styles.sharecontainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={() => savedProfiles(item._id || id)}>
            <FontAwesome
              name={item?.isSaved ? 'bookmark' : 'bookmark-o'}
              size={19}
              color={Colors.dark}
            />
            <Text style={styles.iconText}>{item?.isSaved ? 'Saved' : 'Save'}</Text>
          </TouchableOpacity>


          {/* Share Button */}
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => handleShare(item._id || id)}
          >
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
    fetchComitteeData('modal');
  };

  const resetFilter = () => {
    clearFiltersAndFetch();
  };

  return (
    <SafeAreaView style={Globalstyles.container} edges={['top', 'bottom']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {/* Fixed Header */}
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
                clearFiltersAndFetch();
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'MainApp' }],
                });
                clearFiltersAndFetch();
              }
            }}
          >
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Committee</Text>
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
                  position: 'absolute',
                  right: -5,
                  top: -5,
                  width: SW(16),
                  height: SW(16),
                  borderRadius: SW(16) / 2,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: 'white', fontSize: SF(9), fontFamily: 'Poppins-Bold' }}>
                  {notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fixedHeader}>
        <View style={styles.searchbar}>
          <TextInput
            placeholder="Search in Your city"
            value={locality}
            onChangeText={(text) => setLocality(text)}
            onSubmitEditing={() => fetchComitteeData('search')}
            placeholderTextColor={'gray'}
            style={{ flex: 1 }}
            autoComplete="off"
            textContentType="none"
          />
          {locality.length > 0 ? (
            <AntDesign name={'close'} size={20} color={'gray'} onPress={() => {
              clearFiltersAndFetch();
            }} />
          ) : (
            <AntDesign name={'search1'} size={20} color={'gray'} onPress={() => fetchComitteeData('search')} />
          )}
        </View>
        <View style={styles.ButtonContainer}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
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
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <View>
          <View style={Globalstyles.sliderContainer}>
            <AppIntroSlider
              ref={sliderRef}
              data={slider}
              renderItem={({ item }) => {
                const { width, height } = item.resolution;

                const handlePress = () => {
                  if (item.hyperlink) {
                    Linking.openURL(item.hyperlink).catch(err =>
                      console.error('Failed to open URL:', err)
                    );
                  }
                };

                return (
                  <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
                    <Image
                      source={{ uri: item?.image }}
                      style={{ width: '100%', height: SH(180), resizeMode: 'contain' }}
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
          {isLoading ? renderSkeleton() : (
            <>
              <FlatList
                ref={flatListRef}
                data={committeeData}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.panditListData}
                onScrollToIndexFailed={(info) => {
                  setTimeout(() => {
                    flatListRef.current?.scrollToIndex({
                      index: info.index,
                      animated: true,
                    });
                  }, 500);
                }}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <FontAwesome name="users" size={60} color="#ccc" style={{ marginBottom: 15 }} />
                    <Text style={styles.emptyText}>No Committee Data Available</Text>
                    <Text style={styles.infoText}>Committee member profiles will appear here once available.</Text>
                  </View>
                }
              />
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
            </>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseFilter}
      >
        <SafeAreaView style={styles.modalOverlay}>
          <SafeAreaView style={styles.modalContent}>
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
                  autoComplete="off"
                  textContentType="none"
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
                    onChange={(text) => handleInputChange('subCaste', text.value)}
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
                onPress={() => {
                  setModalVisible(false);
                  clearFiltersAndFetch();
                }}
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
          </SafeAreaView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default Committee;
