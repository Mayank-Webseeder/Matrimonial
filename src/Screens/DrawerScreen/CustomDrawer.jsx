import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SH, SW, SF } from '../../utils/Dimensions';
import Entypo from 'react-native-vector-icons/Entypo';

const CustomDrawer = (props) => {
  const { navigation } = props;
  const [isAccountSettingsOpen, setAccountSettingsOpen] = useState(false);
  const [isPanditOptionsOpen, setPanditOptionsOpen] = useState(false);

  const menuItems = [
    { title: 'Partners Preference', screen: 'PartnersPreference' },
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
    { title: 'Share App' },
    { title: 'Feedback/Suggestion', screen: 'FeedBack' },
    { title: 'About Us' },
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
        onPress={() => navigation.navigate('Tabs')}
      />
      <View style={styles.header}>
        <Image
          source={require('../../Images/Profile1.png')}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>Andrew Smith</Text>
          <Text style={styles.idText}>ID no: 98654785123</Text>
        </View>
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => navigation.navigate('Profile')}
        >
          <AntDesign name="edit" size={20} color={Colors.theme_color} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {menuItems.map((item, index) => {
          if (item.title === 'Account & Settings') {
            return (
              <View key={index}>
                <TouchableOpacity
                  style={styles.drawerButton}
                  onPress={() => setAccountSettingsOpen(!isAccountSettingsOpen)}
                >
                  <Text style={styles.buttonText}>{item.title}</Text>
                  <AntDesign
                    name={isAccountSettingsOpen ? 'up' : 'down'}
                    size={20}
                    color={Colors.theme_color}
                  />
                </TouchableOpacity>
                {isAccountSettingsOpen &&
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
                  onPress={() => setPanditOptionsOpen(!isPanditOptionsOpen)}
                >
                  <Text style={styles.buttonText}>{item.title}</Text>
                  <AntDesign
                    name={isPanditOptionsOpen ? 'up' : 'down'}
                    size={20}
                    color={Colors.theme_color}
                  />
                </TouchableOpacity>
                {isPanditOptionsOpen &&
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
      </ScrollView>
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
  },
  profileImage: {
    width: SW(45),
    height: SH(45),
    borderRadius: 30,
  },
  userInfo: {
    marginHorizontal: SW(9),
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
  },
  editIcon: {
    marginHorizontal:SW(10)
  },
  drawerButton: {
    marginVertical: SH(1),
    paddingVertical: SH(10),
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
    fontSize: SF(12),
    color: Colors.theme_color,
    fontFamily: 'Poppins-Medium',
  },
  subOption: {
    marginHorizontal:0,
    borderWidth: 0,
    backgroundColor: Colors.light_theme,
    marginVertical:SH(6)
  },
  subOptionText: {
    fontSize: SF(13),
    color: Colors.theme_color,
    fontFamily: 'Poppins-Regular',
  },
});

export default CustomDrawer;
