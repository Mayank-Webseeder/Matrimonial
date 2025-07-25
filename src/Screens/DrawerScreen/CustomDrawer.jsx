import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, Share } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SH, SW, SF } from '../../utils/Dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetBioData } from '../../ReduxStore/Slices/BiodataSlice';
import { resetsetActivistdata } from '../../ReduxStore/Slices/ActivistSlice';
import { resetAllBiodata } from '../../ReduxStore/Slices/GetAllBiodataSlice';
import { reseAllNotification } from '../../ReduxStore/Slices/GetAllNotificationSlice';
import { resetProfiledata } from '../../ReduxStore/Slices/ProfileSlice';

const CustomDrawer = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const [openDropdown, setOpenDropdown] = useState(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const ProfileData = useSelector((state) => state.profile);
  const isMatrimonial = ProfileData?.profiledata?.isMatrimonial || false;
  const image = ProfileData?.profiledata?.photoUrl?.[0];
  const name = ProfileData?.profiledata?.username || 'userName';
  const Id = ProfileData?.profiledata?.userId || 'user id';
  const isBiodataExpired = ProfileData?.profiledata?.serviceSubscriptions?.some(
    (sub) => sub.serviceType === 'Biodata' && sub.status === 'Expired'
  );
  const showPartnersPreference = isMatrimonial || isBiodataExpired;
  const showInterestedProfile = isMatrimonial && !isBiodataExpired;


  useEffect(() => {
    console.log('isBiodataExpired', isBiodataExpired);
  }, []);

  const menuItems = [
    ...(showPartnersPreference
      ? [{ title: 'Partners Preference', screen: 'MainPartnerPrefrence' }]
      : []
    ),
    ...(showInterestedProfile
      ? [{ title: 'Interested Profile', screen: 'Interested Profile' }]
      : []
    ),
    { title: 'Saved Profile', screen: 'Saved Profile' },
    { title: 'Pandit/Jyotish' },
    { title: 'Event/News', screen: 'EventNews' },
    { title: 'Dharmshala', screen: 'Dharmshala' },
    { title: 'Committees', screen: 'Committee' },
    { title: 'Activist', screen: 'Activist' },
    { title: 'Advertise with Us', screen: 'AdvertiseWithUs' },
    { title: 'Success Stories', screen: 'SuccessStories' },
    { title: 'Account & Settings' },
    { title: 'About Us' },
    { title: 'Feedback/Suggestion', screen: 'FeedBack' },
    { title: 'Share App' },
    { title: 'SubscriptionHistory', screen: 'SubscriptionHistory' },
  ];

  const panditOptions = [
    { title: 'Pandit', screen: 'Pandit' },
    { title: 'Jyotish', screen: 'Jyotish' },
    { title: 'Kathavachak', screen: 'Kathavachak' },
  ];

  const AboutusOptions = [
    { title: 'About Us', screen: 'AboutUs' },
    { title: 'Privacy Policy', screen: 'PrivacyPolicy' },
    { title: 'Terms & Conditions', screen: 'TermsConditions' },
    { title: 'Subscription Policy', screen: 'SubscriptionPolicy' },
  ];

  const accountSettingsOptions = [
    { title: 'Notification Settings', screen: 'NotificationSettings' },
    { title: 'Privacy Settings', screen: 'PrivacySettings' },
    { title: 'Inactive or Delete Profile', screen: 'InActiveDelete' },
    { title: 'Change Password', screen: 'ChangePassword' },
  ];

  const handleLogout = async () => {
    console.log('🔒 Logging out...');

    try {

      await AsyncStorage.multiRemove([
        'userToken',
        'userId',
        'profileInterest',
        'newsEvents',
      ]);

      dispatch(resetProfiledata());
      dispatch(resetBioData());
      dispatch(resetsetActivistdata());
      dispatch(resetAllBiodata());
      dispatch(reseAllNotification());

      console.log('🔄 Resetting navigation to AuthStack...');
      
      setTimeout(() => {
        navigation.navigate('AuthStack');
        console.log('✅ Logged out successfully');
      }, 100);

    } catch (error) {
      console.error('❌ Error during logout:', error);
    }
  };

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const TAB_SCREENS = ['Home', 'Pandit', 'Matrimonial', 'BioData', 'EventNews', 'MyProfile'];
  const DRAWER_SCREENS = ['MainPartnerPrefrence', 'Interested Profile', 'Saved Profile', 'Dharmshala', 'Committee', 'Activist', 'AdvertiseWithUs', 'SuccessStories', 'FeedBack', 'SubscriptionHistory', 'AboutUs', 'PrivacyPolicy', 'TermsConditions', 'SubscriptionPolicy'];

  const handleNavigation = (screen) => {
    setOpenDropdown(null);

    if (!screen) {
      console.log('Screen not available');
      return;
    }

    if (TAB_SCREENS.includes(screen)) {
      navigation.navigate('MainApp', {
        screen: 'Tabs',
        params: { screen },
      });
    }
    else if (DRAWER_SCREENS.includes(screen)) {
      navigation.navigate(screen);
    }
    else {
      navigation.navigate(screen);
    }
  };



  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: 'Install Brahmin Milan App from Play Store:\nhttps://play.google.com/store/apps/details?id=com.brahminmilanbyappwin.app&pcampaignid=web_share',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.log('Error while sharing:', error.message);
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Entypo
        name="cross"
        size={30}
        color={Colors.theme_color}
        onPress={() => {
          navigation.goBack();
          setOpenDropdown(null);
        }}

      />
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: '100%' }}>

          {/* Profile Image on the Left */}
          <Image
            source={image ? { uri: image } : require('../../Images/Profile.png')}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.idText}>ID Number: {Id}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('MainApp', {
            screen: 'Tabs',
            params: {
              screen: 'MyProfile',
            },
          })}>
            <AntDesign name="edit" size={20} color={Colors.theme_color} />
          </TouchableOpacity>

        </View>
      </View>


      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          {menuItems.map((item, index) => {
            if (item.title === 'Account & Settings') {
              return (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.drawerButton}
                    onPress={() => handleDropdownToggle('accountSettings')}
                  >
                    <Text style={styles.buttonText}>{item.title}</Text>
                    <AntDesign
                      name={openDropdown === 'accountSettings' ? 'up' : 'down'}
                      size={20}
                      color={Colors.theme_color}
                    />
                  </TouchableOpacity>
                  {openDropdown === 'accountSettings' &&
                    accountSettingsOptions.map((option, subIndex) => (
                      <TouchableOpacity
                        key={subIndex}
                        style={styles.subOption}
                        onPress={() => handleNavigation(option.screen)}
                      >
                        <Text style={styles.subOptionText}>{option.title}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              );
            } else if (item.title === 'Pandit/Jyotish') {
              return (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.drawerButton}
                    onPress={() => handleDropdownToggle('panditOptions')}
                  >
                    <Text style={styles.buttonText}>{item.title}</Text>
                    <AntDesign
                      name={openDropdown === 'panditOptions' ? 'up' : 'down'}
                      size={20}
                      color={Colors.theme_color}
                    />
                  </TouchableOpacity>
                  {openDropdown === 'panditOptions' &&
                    panditOptions.map((option, subIndex) => (
                      <TouchableOpacity
                        key={subIndex}
                        style={styles.subOption}
                        onPress={() => handleNavigation(option.screen)}
                      >
                        <Text style={styles.subOptionText}>{option.title}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              );
            }
            else if (item.title === 'About Us') {
              return (
                <View key={index}>
                  <TouchableOpacity
                    style={styles.drawerButton}
                    onPress={() => handleDropdownToggle('AboutusOptions')}
                  >
                    <Text style={styles.buttonText}>{item.title}</Text>
                    <AntDesign
                      name={openDropdown === 'AboutusOptions' ? 'up' : 'down'}
                      size={20}
                      color={Colors.theme_color}
                    />
                  </TouchableOpacity>
                  {openDropdown === 'AboutusOptions' &&
                    AboutusOptions.map((option, subIndex) => (
                      <TouchableOpacity
                        key={subIndex}
                        style={styles.subOption}
                        onPress={() => handleNavigation(option.screen)}
                      >
                        <Text style={styles.subOptionText}>{option.title}</Text>
                      </TouchableOpacity>
                    ))}
                </View>
              );
            }
            else if (item.title === 'Share App') {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.drawerButton}
                  onPress={handleShare}
                >
                  <Text style={styles.buttonText}>{item.title}</Text>
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity
                key={index}
                style={styles.drawerButton}
                onPress={() => handleNavigation(item.screen)}
              >
                <Text style={styles.buttonText}>{item.title}</Text>
              </TouchableOpacity>
            );
          })}
          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => setLogoutModalVisible(true)}
            >
              <Text style={styles.logoutText}>Logout</Text>
              <AntDesign name={'logout'} size={25} color={Colors.theme_color} style={{ marginHorizontal: SW(10) }} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        visible={logoutModalVisible}
        animationType="slide"
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalText}>Are you sure you want to log out?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  setLogoutModalVisible(false);
                  handleLogout();
                }}
              >
                <Text style={styles.confirmButtonText}>Yes, Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light_theme,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SH(10),
    borderBottomWidth: 0,
    position: 'relative',
    justifyContent: 'space-between',
    paddingHorizontal: SW(10),
    marginLeft: -SW(10),
  },
  profileImage: {
    width: SW(40),
    height: SH(40),
    borderRadius: 20,
    resizeMode: 'cover',
  },
  name: {
    fontSize: SF(13),
    color: Colors.theme_color,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  idText: {
    fontSize: SF(10),
    color: Colors.theme_color,
    fontFamily: 'Poppins-Regular',
    marginTop: SH(2),
  },

  drawerButton: {
    marginVertical: SH(1),
    paddingVertical: SH(10.3),
    paddingHorizontal: SW(10),
    borderRadius: 5,
    backgroundColor: '#c4a5b0',
    borderColor: Colors.theme_color,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: SF(13),
    color: Colors.theme_color,
    fontFamily: 'Poppins-Medium',
  },
  subOption: {
    marginHorizontal: SW(10),
    borderWidth: 0,
    backgroundColor: Colors.light_theme,
    marginVertical: SH(6),
    borderBottomColor: '#dbc5cd',
    borderBottomWidth: 1,
  },
  subOptionText: {
    fontSize: SF(13),
    color: Colors.theme_color,
    fontFamily: 'Poppins-Regular',
  },
  logoutContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: SH(20),
    marginHorizontal: SW(10),
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: SF(16),
    color: Colors.theme_color,
    fontFamily: 'Poppins-Bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: SW(280),
    padding: SH(20),
    backgroundColor: Colors.light_theme,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: SF(16),
    fontWeight: 'bold',
    color: Colors.theme_color,
    marginBottom: SH(10),
  },
  modalText: {
    fontSize: SF(14),
    color: Colors.theme_color,
    textAlign: 'center',
    marginBottom: SH(20),
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    marginHorizontal: SW(10),
    paddingHorizontal: SW(20),
    paddingVertical: SH(10),
    backgroundColor: Colors.light,
    borderRadius: 5,
  },
  confirmButton: {
    marginHorizontal: SW(10),
    paddingHorizontal: SW(20),
    paddingVertical: SH(10),
    backgroundColor: Colors.theme_color,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: SF(13),
    color: Colors.theme_color,
    textAlign: 'center',
  },
  confirmButtonText: {
    fontSize: SF(13),
    color: Colors.light,
    textAlign: 'center',
  },
});

export default CustomDrawer;
