import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SH, SW, SF } from '../../utils/Dimensions';

const CustomDrawer = (props) => {
  const { navigation } = props;

  const menuItems = [
    { title: 'Partners Preference', screen: 'PartnersPreference' },
    { title: 'Interested Profile', screen: 'InterestedProfile' },
    { title: 'Saved Profile', screen: 'SavedProfile' },
    { title: 'Pandit/Jyotish', screen: 'PanditJyotish' },
    { title: 'Event/News', screen: 'EventNews' },
    { title: 'Dharmshala', screen: 'Dharmshala' },
    { title: 'Committees', screen: 'Committees' },
    { title: 'Be an Activist' },
    { title: 'Activist', screen: 'Activist' },
    { title: 'Advertise with Us', screen: 'AdvertiseWithUs' },
    { title: 'Success Stories', screen: 'SuccessStories' },
    { title: 'Account & Settings', screen: 'AccountSettings' },
    { title: 'Share App', screen: 'ShareApp' },
    { title: 'Feedback/Suggestion', screen: 'FeedbackSuggestion' },
    { title: 'About Us', screen: 'AboutUs' },
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
      <View style={styles.header}>
        <Image
          source={require('../../Images/Profile1.png')}
          style={styles.profileImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>Andrew Smith</Text>
          <Text style={styles.idText}>ID no: 98654785123</Text>
        </View>
        <TouchableOpacity style={styles.editIcon}>
          <AntDesign name="edit" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.drawerButton}
            onPress={() => handleNavigation(item.screen)}
          >
            <Text style={styles.buttonText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme_color || '#8B1C44', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:SH(5),
    paddingHorizontal: 15,
    borderBottomWidth: 0,
    position: 'relative',
  },
  profileImage: {
    width:SW(50),
    height:SH(50),
    borderRadius: 30,
  },
  userInfo: {
    marginLeft: SW(15),
  },
  name: {
    fontSize:SF(15),
    color: '#fff',
    fontWeight: 'bold',
    fontFamily:"Poppins-Regular"
  },
  idText: {
    fontSize:SF(10),
    color: '#ddd',
  },
  editIcon: {
    position: 'absolute',
    right: SW(10),
    top:SH(20),
  },
  drawerButton: {
    marginHorizontal:SW(10),
    marginVertical:SH(5),
    paddingVertical:SH(10),
    paddingHorizontal:SW(10),
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderColor:'#FF003F',
    borderWidth: 1,
    width:SW(150)
  },
  buttonText: {
    fontSize:SF(12),
    color: '#fff',
    fontWeight: '500',
    fontFamily:"Poppins-Regular"
  },
});

export default CustomDrawer;
