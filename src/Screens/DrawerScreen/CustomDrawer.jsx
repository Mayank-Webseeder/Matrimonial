import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView ,Modal} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SH, SW, SF } from '../../utils/Dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDrawer = (props) => {
  const { navigation } = props;
  const [openDropdown, setOpenDropdown] = useState(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const ProfileData = useSelector((state) => state.profile);
  const name = ProfileData?.profiledata?.username || 'userName';
  const Id = ProfileData?.profiledata?._id || 'user id';

  const menuItems = [
    { title: 'Partners Preference', screen: 'MainPartnerPrefrence' },
    { title: 'Interested Profile', screen: 'Interested Profile' },
    { title: 'Saved Profile', screen: 'Saved Profile' },
    { title: 'Pandit/Jyotish' },
    { title: 'Event/News', screen: 'EventNews' },
    { title: 'Dharmshala', screen: 'Dharmshala' },
    { title: 'Committees', screen: 'Committee' },
    { title: 'Activist', screen: 'Activist' },
    { title: 'Advertise with Us' },
    { title: 'Success Stories', screen: 'SuccessStories' },
    { title: 'Account & Settings' },
    { title: 'About Us' },
    { title: 'Feedback/Suggestion', screen: 'FeedBack' },
    { title: 'Share App' },
  ];

  const panditOptions = [
    { title: 'Pandit', screen: 'Pandit' },
    { title: 'Jyotish', screen: 'Jyotish' },
    { title: 'Kathavachak', screen: 'Kathavachak' },
  ];

  const accountSettingsOptions = [
    { title: 'Notification Settings', screen: 'NotificationSettings' },
    { title: 'Privacy Settings', screen: 'PrivacySettings' },
    { title: 'Inactive or Delete Profile', screen: 'InActiveDelete' },
    { title: 'Change Password', screen: 'ChangePassword' },
  ];

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      navigation.navigate('Login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const handleNavigation = (screen) => {
    if (screen) {
      navigation.navigate(screen);
    } else {
      console.log('Screen not available');
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
        onPress={() => navigation.goBack()}
      />
      <View style={styles.header}>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center",justifyContent:"space-between" }}>
          <Image
            source={require('../../Images/Profile1.png')}
            style={styles.profileImage}
          />
          <View style={{marginHorizontal:SW(10)}}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center",justifyContent:"space-between" }}>
            <Text style={styles.name}>{name}</Text>
            <TouchableOpacity
          onPress={() => navigation.navigate('DetailedProfile')}
        >
          <AntDesign name="edit" size={20} color={Colors.theme_color} />
        </TouchableOpacity>
          </View>
          <Text style={styles.idText}>ID no: {Id}</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
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
            <AntDesign name={'logout'} size={25} color={Colors.theme_color} style={{marginHorizontal:SW(10)}} />
          </TouchableOpacity>
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
    justifyContent: "space-between"
  },
  profileImage: {
    width: SW(45),
    height: SH(45),
    borderRadius: 30,
  },
  userInfo: {
    marginHorizontal: SW(10),
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
    marginVertical:SH(5)
  },
  drawerButton: {
    marginVertical: SH(1),
    paddingVertical: SH(11),
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
    borderBottomWidth: 1
  },
  subOptionText: {
    fontSize: SF(13),
    color: Colors.theme_color,
    fontFamily: 'Poppins-Regular',
  },
  logoutContainer: {
    display: "flex",
    flexDirection: "row",
    marginVertical: SH(20),
    marginHorizontal: SW(10),
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutText:{
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
    backgroundColor:Colors.light,
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
  confirmButtonText:{
    fontSize: SF(13),
    color: Colors.light,
    textAlign: 'center',
  }
});

export default CustomDrawer;
