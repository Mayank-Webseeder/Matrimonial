import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Linking, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/LocationStyle';
import Globalstyles from '../../utils/GlobalCss';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MATCHED_PROFILE } from '../../utils/BaseUrl';
import { ACCEPTED_API, REJECTED_API } from '../../utils/BaseUrl';
import Toast from 'react-native-toast-message';
const IntrestReceivedProfilePage = ({ navigation, route }) => {
  const { userId, biodata, requestId } = route.params;
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  const MyprofileData = useSelector((state) => state.getBiodata);

  useEffect(() => {
    if (userId) {
      fetchUserProfile(userId);
    }
  }, [userId]);

  const fetchUserProfile = async (id) => {
    setLoading(true);
    const token = await AsyncStorage.getItem('userToken');
    if (!token) throw new Error('No token found');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    try {
      const response = await axios.get(`${MATCHED_PROFILE}/${id}`, { headers });

      if (response.data.status === "success") {
        setProfileData(response.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.theme_color} />;
  }

  if (!profileData) {
    return <Text>No data found!</Text>;
  }

  const acceptConnectionRequest = async (requestId) => {
    if (!requestId) {
      console.error("Error: requestId is undefined");
      return;
    }

    console.log("Accepting request for userId:", requestId);

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
      const response = await axios.post(`${ACCEPTED_API}/${requestId}`, {}, { headers });

      console.log("Response Data:", JSON.stringify(response?.data));

      if (response.data.status === "success") {
        Toast.show({ type: 'success', text1: 'Success', text2: 'Request accepted successfully!' });
      } else {
        Toast.show({ type: 'error', text1: 'Error', text2: response.data.message || 'Something went wrong!' });
      }
    } catch (error) {
      console.error("API Error:", error?.response ? JSON.stringify(error.response.data) : error.message);
      Toast.show({ type: 'error', text1: 'Error', text2: error.response?.data?.message || 'Failed to accept request!' });
    }
  };

  const rejectConnectionRequest = async (requestId) => {
    if (!requestId) {
      console.error("Error: requestId is undefined");
      return;
    }

    console.log("Rejecting request for userId:", requestId);

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` };
      const response = await axios.post(`${REJECTED_API}/${requestId}`, {}, { headers });

      console.log("Response Data:", JSON.stringify(response?.data));

      if (response.data.status === "success") {
        Toast.show({ type: 'success', text1: 'Success', text2: 'Request rejected successfully!' });
      } else {
        Toast.show({ type: 'error', text1: 'Error', text2: response.data.message || 'Something went wrong!' });
      }
    } catch (error) {
      console.error("API Error:", error?.response ? JSON.stringify(error.response.data) : error.message);
      Toast.show({ type: 'error', text1: 'Error', text2: error.response?.data?.message || 'Failed to reject request!' });
    }
  };


  // Map API comparisonResults to UI labels
  const comparisonResults = profileData?.comparisonResults || {};
  const totalCriteria = Object.keys(comparisonResults).length;
  const matchedCount = Object.values(comparisonResults).filter(value => value).length;

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>{biodata?.user?.username || 'Raj Sharma'}</Text>
        </View>
        <View style={styles.righticons}>
          <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => { navigation.navigate('Notification') }} />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sliderCotainer}>
          <Swiper
            style={styles.wrapper}
            showsButtons={true}
            autoplay={true}
            autoplayTimeout={2.5}
            loop={true}
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.activeDot} />}
            prevButton={<MaterialIcons name="chevron-left" size={50} color={'gray'} />}
            nextButton={<MaterialIcons name="chevron-right" size={50} color={'gray'} />}
          >
            <View style={styles.slide}>
              <Image source={{ uri: biodata?.personalDetails?.closeUpPhoto }} style={styles.image} />
            </View>
            <View style={styles.slide}>
              <Image source={{ uri: biodata?.personalDetails?.fullPhoto }} style={styles.image} />
            </View>
            <View style={styles.slide}>
              <Image source={{ uri: biodata?.personalDetails?.bestPhoto }} style={styles.image} />
            </View>
          </Swiper>
        </View>
        <View style={styles.flexContainer}>
          <View style={styles.flex}>
            {/* <Text style={styles.Idtext}>ID NO. :- {userId}</Text> */}
            <Text style={styles.Idtext}>ID NO. :- 12345</Text>
            <Text style={styles.toptext}>92% Compatible according to your preference</Text>
          </View>
          <View style={styles.sharecontainer}>
            <View style={styles.iconContainer}>
              <FontAwesome name="bookmark-o" size={24} color={Colors.dark} />
              <Text style={styles.iconText}>Save</Text>
            </View>
            <View style={styles.iconContainer}>
              <Feather name="send" size={24} color={Colors.dark} />
              <Text style={styles.iconText}>Shares</Text>
            </View>
            {/* <TouchableOpacity style={styles.interestedButton}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.iconContainer} onPress={() => Linking.openURL('tel:' + biodata?.personalDetails?.mobileNo)}>
              <MaterialIcons name="call" size={24} color={Colors.dark} />
              <Text style={styles.iconText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ReportPage')}>
              <MaterialIcons name="error-outline" size={24} color={Colors.dark} />
              <Text style={styles.iconText}>Report</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.flexContainer1}>
          <View style={styles.leftContainer}>
            <Text style={styles.HeadingText}>{biodata?.user?.username || 'Raj Sharma'}</Text>
            {biodata?.personalDetails?.dob && <Text style={styles.text}>Age: {new Date().getFullYear() - new Date(biodata?.personalDetails?.dob).getFullYear()} / Height: {biodata?.personalDetails?.heightFeet} feet</Text>}
            {biodata?.personalDetails?.subCaste && <Text style={styles.text}>Sub-caste: {biodata?.personalDetails?.subCaste}</Text>}
            {biodata?.personalDetails?.maritalStatus && <Text style={styles.text}>Marital Status: {biodata?.personalDetails?.maritalStatus}</Text>}
            {biodata?.personalDetails?.manglikStatus && <Text style={styles.text}>Manglik Status: {biodata?.personalDetails?.manglikStatus}</Text>}
            {biodata?.personalDetails?.disabilities && <Text style={styles.text}>Disability: {biodata?.personalDetails?.disabilities}</Text>}
            {biodata?.personalDetails?.profileCreatedBy && <Text style={styles.text}>Profile created by: {biodata?.personalDetails?.profileCreatedBy}</Text>}
          </View>
          <View style={styles.rightContainer}>
            {biodata?.personalDetails?.currentCity && <Text style={styles.text}>Location: {biodata?.personalDetails?.currentCity}</Text>}
            {biodata?.personalDetails?.occupation && <Text style={styles.text}>Occupation: {biodata?.personalDetails?.occupation}</Text>}
            {biodata?.personalDetails?.annualIncome && <Text style={styles.text}>Income: {biodata?.personalDetails?.annualIncome}</Text>}
            {biodata?.personalDetails?.qualification && <Text style={styles.text}>Qualification: {biodata?.personalDetails?.qualification}</Text>}
          </View>
        </View >
        <View style={styles.flexContainer1}>
          <View>
            <Text style={styles.HeadingText}>Horoscope</Text>
            {biodata?.personalDetails?.dob && <Text style={styles.text}>Date of Birth: {new Date(biodata?.personalDetails?.dob).toLocaleDateString()} / Time: {biodata?.personalDetails?.timeOfBirth}</Text>}
            {biodata?.personalDetails?.placeofbirth && <Text style={styles.text}>Place of Birth: {biodata?.personalDetails?.placeofbirth}</Text>}
            {biodata?.personalDetails?.nadi && <Text style={styles.text}>Nadi: {biodata?.personalDetails?.nadi}</Text>}
            {biodata?.personalDetails?.gotraSelf && <Text style={styles.text}>Gotra (self): {biodata?.personalDetails?.gotraSelf}</Text>}
            {biodata?.personalDetails?.gotraMother && <Text style={styles.text}>Gotra (Mother): {biodata?.personalDetails?.gotraMother}</Text>}
          </View>
        </View>
        <View style={styles.flexContainer1}>
          <View>
            <Text style={styles.HeadingText}>About Me</Text>
            {biodata?.personalDetails?.aboutMe && <Text style={styles.text}>{biodata?.personalDetails?.aboutMe}</Text>}
            {biodata?.personalDetails?.complexion && <Text style={styles.text}>Complexion: {biodata?.personalDetails?.complexion}</Text>}
            {biodata?.personalDetails?.weight && <Text style={styles.text}>Weight: {biodata?.personalDetails?.weight}</Text>}
            {biodata?.personalDetails?.livingStatus && <Text style={styles.text}>Currently Living city: {biodata?.personalDetails?.livingStatus}</Text>}
            {biodata?.personalDetails?.familyType && <Text style={styles.text}>Living with family: {biodata?.personalDetails?.familyType}</Text>}
          </View>
        </View>
        <View style={styles.flexContainer1}>
          <View>
            <Text style={styles.HeadingText}>Family Section</Text>
            {biodata?.personalDetails?.fatherName && <Text style={styles.text}>Father’s Name: {biodata?.personalDetails?.fatherName}</Text>}
            {biodata?.personalDetails?.fatherOccupation && <Text style={styles.text}>Father’s Occupation: {biodata?.personalDetails?.fatherOccupation}</Text>}
            {biodata?.personalDetails?.motherName && <Text style={styles.text}>Mother’s Name: {biodata?.personalDetails?.motherName}</Text>}
            {biodata?.personalDetails?.motherOccupation && <Text style={styles.text}>Mother’s Occupation: {biodata?.personalDetails?.motherOccupation}</Text>}
            {biodata?.personalDetails?.familyIncome && <Text style={styles.text}>Family Income (Annually): {biodata?.personalDetails?.familyIncome}</Text>}
            {biodata?.personalDetails?.familyType && <Text style={styles.text}>Family Type: {biodata?.personalDetails?.familyType}</Text>}
            {biodata?.personalDetails?.siblings && <Text style={styles.text}>Siblings: {biodata?.personalDetails?.siblings}</Text>}
            {biodata?.personalDetails?.otherFamilyMemberInfo && <Text style={styles.text}>Other Family Members: {biodata?.personalDetails?.otherFamilyMemberInfo}</Text>}
          </View>
        </View>
        <View style={styles.flexContainer1}>
          <View>
            <Text style={styles.HeadingText}>Contact Details:</Text>
            {biodata?.personalDetails?.contactNumber1 && <Text style={styles.text}>Mobile No. 1: {biodata?.personalDetails?.contactNumber1}</Text>}
            {biodata?.personalDetails?.contactNumber2 && <Text style={styles.text}>Mobile No. 2: {biodata?.personalDetails?.contactNumber2}</Text>}
            {biodata?.personalDetails?.emailId && <Text style={styles.text}>Email ID: {biodata?.personalDetails?.emailId}</Text>}
            {biodata?.personalDetails?.permanentAddress && <Text style={styles.text}>Permanent Address: {biodata?.personalDetails?.permanentAddress}</Text>}
          </View>
        </View>
        <View style={styles.flexContainer1}>
          <View>
            <Text style={styles.HeadingText}>Other Details:</Text>
            {biodata?.personalDetails?.knowCooking && <Text style={styles.text}>Cooking: {biodata?.personalDetails?.knowCooking ? 'Yes' : 'No'}</Text>}
            {biodata?.personalDetails?.dietaryHabit && <Text style={styles.text}>Diet: {biodata?.personalDetails?.dietaryHabit}</Text>}
            {biodata?.personalDetails?.smokingHabit && <Text style={styles.text}>Smoke: {biodata?.personalDetails?.smokingHabit}</Text>}
            {biodata?.personalDetails?.drinkingHabit && <Text style={styles.text}>Drink: {biodata?.personalDetails?.drinkingHabit}</Text>}
          </View>
        </View>
        <View style={styles.flexContainer3}>
          <Text style={styles.HeadingText}>Expectation with partner</Text>
          {biodata?.partnerPreferences?.partnerExpectations && <Text style={styles.text}>{biodata?.partnerPreferences?.partnerExpectations}</Text>}
        </View>
        <View style={styles.flexContainer3}>
          <Text style={styles.HeadingText}>Matches</Text>
          <View style={styles.flex}>
            <Image source={{ uri: MyprofileData?.Biodata?.personalDetails?.closeUpPhoto }} style={styles.smallImage} />
            <Text style={styles.text}>{matchedCount}/{totalCriteria}</Text>
            <Image source={{ uri: profileData?.data?.photoUrl?.[0] }} style={styles.smallImage} />
          </View>

          {/* Comparison List */}
          {Object.keys(profileData?.comparisonResults || {}).map((key, index) => (
            <View key={index} style={styles.flexContainer5}>
              <Text style={styles.label}>{key.replace(/([A-Z])/g, " $1").trim()}</Text>
              {profileData.comparisonResults[key] ? (
                <MaterialIcons name="check" style={[styles.icon, styles.checkIcon]} />
              ) : (
                <MaterialIcons name="close" style={[styles.icon, styles.crossIcon]} />
              )}
            </View>
          ))}
        </View>
        <Image source={require('../../Images/slider.png')} style={Globalstyles.bottomImage} />
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.declineButton} onPress={() => rejectConnectionRequest(requestId)}>
          <Entypo name={'cross'} color={Colors.light} size={20} />
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.acceptButton} onPress={() => acceptConnectionRequest(requestId)}>
          <Entypo name={'check'} color={Colors.light} size={20} />
          <Text style={styles.acceptButtonText}>Accept</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

export default IntrestReceivedProfilePage;
