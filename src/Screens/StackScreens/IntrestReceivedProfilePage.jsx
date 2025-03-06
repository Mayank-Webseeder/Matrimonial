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
import { ACCEPTED_API, REJECTED_API , SAVED_PROFILES } from '../../utils/BaseUrl';
import Toast from 'react-native-toast-message';
const IntrestReceivedProfilePage = ({ navigation, route }) => {
  const { userId, biodata, requestId } = route.params;
  const _id=biodata?._id;
  const personalDetails = biodata?.personalDetails;
  console.log(userId, biodata, requestId)
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  const MyprofileData = useSelector((state) => state.getBiodata);
  console.log("MyprofileData", biodata);
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
      console.log("response", JSON.stringify(response.data))
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

  const savedProfiles = async () => {
    if (!_id) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "User ID not found!",
      });
      return;
    }
  
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        throw new Error("No token found");
      }
  
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
  
      const response = await axios.post(
        `${SAVED_PROFILES}/${_id}`,
        {}, 
        { headers }
      );
  
      console.log("Response Data:", JSON.stringify(response?.data));
  
      if (response?.data?.message) {
        Toast.show({
          type: "success",
          text2: response.data.message,
          position: "top",
          visibilityTime: 3000,
          textStyle: { fontSize: 14, color: "green" },
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: response.data.message || "Something went wrong!",
        });
      }
    } catch (error) {
      console.error(
        "API Error:",
        error?.response ? JSON.stringify(error.response.data) : error.message
      );
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Failed to send interest!",
      });
    }
  };

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
        Toast.show({ type: "success", text1: 'Success', text2: 'Request accepted successfully!' });
      } else {
        Toast.show({ type: "error", text1: 'Error', text2: response.data.message || 'Something went wrong!' });
      }
    } catch (error) {
      console.error("API Error:", error?.response ? JSON.stringify(error.response.data) : error.message);
      Toast.show({ type: "error", text1: 'Error', text2: error.response?.data?.message || 'Failed to accept request!' });
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
  const matchPercentage = totalCriteria > 0 ? Math.round((matchedCount / totalCriteria) * 100) : 0;

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>{personalDetails.fullname || 'Raj Sharma'}</Text>
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
              <Image source={{ uri: personalDetails?.closeUpPhoto }} style={styles.image} />
            </View>
            <View style={styles.slide}>
              <Image source={{ uri: personalDetails?.fullPhoto }} style={styles.image} />
            </View>
            <View style={styles.slide}>
              <Image source={{ uri: personalDetails?.bestPhoto }} style={styles.image} />
            </View>
          </Swiper>
        </View>
        <View style={styles.flexContainer}>
          <View style={styles.flex}>
            {/* <Text style={styles.Idtext}>ID NO. :- {userId}</Text> */}
            <Text style={styles.Idtext}>ID NO. :- {biodata?.bioDataId}</Text>
            <Text style={styles.toptext}>{matchPercentage}% Compatible according to your preference</Text>
          </View>
          <View style={styles.sharecontainer}>
            <TouchableOpacity style={styles.iconContainer} onPress={savedProfiles}>
              <FontAwesome name="bookmark-o" size={19} color={Colors.dark} />
              <Text style={styles.iconText}>Save</Text>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <Feather name="send" size={19} color={Colors.dark} />
              <Text style={styles.iconText}>Shares</Text>
            </View>
            {/* <TouchableOpacity style={styles.interestedButton}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.iconContainer} onPress={() => Linking.openURL('tel:' + personalDetails?.mobileNo)}>
              <MaterialIcons name="call" size={19} color={Colors.dark} />
              <Text style={styles.iconText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ReportPage', { profileId: _id })}>
              <MaterialIcons name="error-outline" size={19} color={Colors.dark} />
              <Text style={styles.iconText}>Report</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.flexContainer1}>
          <View style={styles.leftContainer}>
            <Text style={styles.HeadingText}>{personalDetails.fullname}</Text>
            {personalDetails?.dob && <Text style={styles.text}>{new Date().getFullYear() - new Date(personalDetails?.dob).getFullYear()} Yrs, {personalDetails?.heightFeet}</Text>}
            {personalDetails?.subCaste && <Text style={styles.text}>{personalDetails?.subCaste}</Text>}
            {personalDetails?.maritalStatus && <Text style={styles.text}>{personalDetails?.maritalStatus}</Text>}
            {personalDetails?.manglikStatus && <Text style={styles.text}>{personalDetails?.manglikStatus}</Text>}
            {personalDetails?.disabilities && <Text style={styles.text}>Disability: {personalDetails?.disabilities}</Text>}
            {/* {personalDetails?.profileCreatedBy && <Text style={styles.text}>Profile created by: {personalDetails?.profileCreatedBy}</Text>} */}
          </View>
          <View style={styles.rightContainer}>
            {personalDetails?.currentCity && <Text style={styles.text}>{personalDetails?.currentCity}</Text>}
            {personalDetails?.occupation && <Text style={styles.text}>{personalDetails?.occupation}</Text>}
            {personalDetails?.annualIncome && <Text style={styles.text}>{personalDetails?.annualIncome} INR </Text>}
            {personalDetails?.qualification && <Text style={styles.text}>{personalDetails?.qualification}</Text>}
          </View>
        </View >
        <View style={styles.flexContainer1}>
          <View>
            <Text style={styles.HeadingText}>Horoscope</Text>
            {personalDetails?.dob && <Text style={styles.text}>DOB {new Date(personalDetails?.dob).toLocaleDateString()} / Time: {personalDetails?.timeOfBirth}</Text>}
            {personalDetails?.placeofbirth && <Text style={styles.text}>Place of Birth: {personalDetails?.placeofbirth}</Text>}
            {personalDetails?.nadi && <Text style={styles.text}>Nadi: {personalDetails?.nadi}</Text>}
            {personalDetails?.gotraSelf && <Text style={styles.text}>Gotra (self): {personalDetails?.gotraSelf}</Text>}
            {personalDetails?.gotraMother && <Text style={styles.text}>Gotra (Mother): {personalDetails?.gotraMother}</Text>}
          </View>
        </View>
        <View style={styles.flexContainer1}>
          <View>
            <Text style={styles.HeadingText}>About Me</Text>
            {personalDetails?.aboutMe && <Text style={styles.text}>{personalDetails?.aboutMe}</Text>}
            {personalDetails?.complexion && <Text style={styles.text}>Complexion: {personalDetails?.complexion}</Text>}
            {personalDetails?.weight && <Text style={styles.text}>Weight: {personalDetails?.weight}</Text>}
            {personalDetails?.livingStatus && <Text style={styles.text}>Currently Living city: {personalDetails?.livingStatus}</Text>}
            {personalDetails?.familyType && <Text style={styles.text}>Living with family: {personalDetails?.familyType}</Text>}
          </View>
        </View>
        <View style={styles.flexContainer1}>
          <View>
            <Text style={styles.HeadingText}>Family Section</Text>
            {personalDetails?.fatherName && <Text style={styles.text}>Father’s Name: {personalDetails?.fatherName}</Text>}
            {personalDetails?.fatherOccupation && <Text style={styles.text}>Father’s Occupation: {personalDetails?.fatherOccupation}</Text>}
            {personalDetails?.motherName && <Text style={styles.text}>Mother’s Name: {personalDetails?.motherName}</Text>}
            {personalDetails?.motherOccupation && <Text style={styles.text}>Mother’s Occupation: {personalDetails?.motherOccupation}</Text>}
            {personalDetails?.familyIncome && <Text style={styles.text}>Family Income (Annually): {personalDetails?.familyIncome}</Text>}
            {personalDetails?.familyType && <Text style={styles.text}>Family Type: {personalDetails?.familyType}</Text>}
            {personalDetails?.siblings && <Text style={styles.text}>Siblings: {personalDetails?.siblings}</Text>}
            {personalDetails?.otherFamilyMemberInfo && <Text style={styles.text}>Other Family Members: {personalDetails?.otherFamilyMemberInfo}</Text>}
          </View>
        </View>
        <View style={styles.flexContainer1}>
          <View>
            <Text style={styles.HeadingText}>Contact Details:</Text>
            {personalDetails?.contactNumber1 && <Text style={styles.text}>Mobile No. 1: {personalDetails?.contactNumber1}</Text>}
            {personalDetails?.contactNumber2 && <Text style={styles.text}>Mobile No. 2: {personalDetails?.contactNumber2}</Text>}
            {personalDetails?.emailId && <Text style={styles.text}>Email ID: {personalDetails?.emailId}</Text>}
            {personalDetails?.permanentAddress && <Text style={styles.text}>Permanent Address: {personalDetails?.permanentAddress}</Text>}
          </View>
        </View>
        <View style={styles.flexContainer1}>
          <View>
            <Text style={styles.HeadingText}>Other Details:</Text>
            {personalDetails?.knowCooking && <Text style={styles.text}>Cooking: {personalDetails?.knowCooking ? 'Yes' : 'No'}</Text>}
            {personalDetails?.dietaryHabit && <Text style={styles.text}>Diet: {personalDetails?.dietaryHabit}</Text>}
            {personalDetails?.smokingHabit && <Text style={styles.text}>Smoke: {personalDetails?.smokingHabit}</Text>}
            {personalDetails?.drinkingHabit && <Text style={styles.text}>Drink: {personalDetails?.drinkingHabit}</Text>}
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
