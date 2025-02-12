import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Linking, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/LocationStyle';
import Globalstyles from '../../utils/GlobalCss';
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import axios from 'axios';
import { MATCHED_PROFILE,SAVED_MATRIMONIAL_PROFILES,SEND_REQUEST } from '../../utils/BaseUrl';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
const MatrimonyPeopleProfile = ({ navigation }) => {
  const route = useRoute();
  const { userDetails, userId ,details,details_userId } = route.params || {};
  console.log("userDetails",userDetails);
  console.log("userId",userId);
  const User_Id=userId || details_userId || null;
  const savedDetials=userDetails?.saveProfile;
  console.log("user", savedDetials)
  const _id=userDetails?._id;
  console.log("_id",_id);
  const personalDetails = details?.personalDetails || userDetails?.personalDetails  || {};
  const partnerPreferences = details?.partnerPreferences || userDetails?.partnerPreferences  || {};
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const MyprofileData = useSelector((state) => state.getBiodata);

  // console.log("MyprofileData", MyprofileData);

  useEffect(() => {
    if (User_Id) {
      fetchUserProfile(User_Id);
    }
  }, [User_Id]);

  // Function to fetch profile details

const fetchUserProfile = async (userId) => {
    setLoading(true);
    const token = await AsyncStorage.getItem('userToken');
    if (!token) throw new Error('No token found');

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    try {
      const response = await axios.get(`${MATCHED_PROFILE}/${userId}`, { headers });
      if (response.data.status === "success") {
        setProfileData(response.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
};

const sendInterestRequest = async () => {
  if (!userId) {
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

    const response = await axios.post(`${SEND_REQUEST}/${userId}`, {}, { headers });

    console.log("Response Data:", JSON.stringify(response?.data));

    if (response?.data?.message) {
      Toast.show({
        type: "success",
        text1: "Interest Sent",
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
      `${SAVED_MATRIMONIAL_PROFILES}/${_id}`,
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


if (loading) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={Colors.theme_color} />
    </View>
  );
}


  if (!profileData) {
    return <Text>No data found!</Text>;
  }

  // Map API comparisonResults to UI labels
  const comparisonResults = profileData?.comparisonResults || {};
  const totalCriteria = Object.keys(comparisonResults).length;
  const matchedCount = Object.values(comparisonResults).filter(value => value).length;
  const matchPercentage = totalCriteria > 0 ? Math.round((matchedCount / totalCriteria) * 100) : 0;

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = moment(dob);
    const currentDate = moment();
    return currentDate.diff(birthDate, "years");
  };

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>{personalDetails?.fullname}</Text>
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
              <Image source={{ uri:personalDetails?.closeUpPhoto }} style={styles.image} />
            </View>
            <View style={styles.slide}>
              <Image source={{ uri: personalDetails?.fullPhoto }} style={styles.image} />
            </View>
            <View style={styles.slide}>
              <Image source={{ uri: personalDetails?.bestPhoto }} style={styles.image} />
            </View>
          </Swiper>
        </View>

        {/* Profile Info Section */}
        <View style={styles.flexContainer}>
          <View style={styles.flex}>
            {/* <Text style={styles.Idtext}>ID NO. :- {user?._id}</Text> */}
            <Text style={styles.Idtext}>ID NO. :- {userDetails?.bioDataId}</Text>
            <Text style={styles.toptext}>{matchPercentage}% Compatible according to your preference</Text>
          </View>
          <View style={styles.sharecontainer}>
            <TouchableOpacity style={styles.iconContainer} onPress={savedProfiles}>
              <FontAwesome name="bookmark-o" size={24} color={Colors.dark} />
              <Text style={styles.iconText}>Save</Text>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <Feather name="send" size={24} color={Colors.dark} />
              <Text style={styles.iconText}>Shares</Text>
            </View>

            <TouchableOpacity style={styles.interestedButton} onPress={sendInterestRequest}>
              <Text style={styles.buttonText}>Interested</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={() => Linking.openURL('tel:9893458940')}>
              <MaterialIcons name="call" size={24} color={Colors.dark} />
              <Text style={styles.iconText}>Call</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ReportPage')}>
              <MaterialIcons name="error-outline" size={24} color={Colors.dark} />
              <Text style={styles.iconText}>Report</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Personal Details Section */}
        <View style={styles.flexContainer1}>
          {/* Left Container */}
          <View style={styles.leftContainer}>
            {/* Fullname at the top */}
            <Text style={styles.HeadingText}>{personalDetails?.fullname}</Text>

            {/* Other details */}
            <Text style={styles.text}>Age: {calculateAge(personalDetails.dob)} / Height: {personalDetails?.heightFeet} feet</Text>
            {personalDetails?.subCaste && <Text style={styles.text}>SubCaste: {personalDetails?.subCaste}</Text>}
            {personalDetails?.maritalStatus && <Text style={styles.text}>Marital Status: {personalDetails?.maritalStatus}</Text>}
            {personalDetails?.manglikStatus && <Text style={styles.text}>Manglik Status: {personalDetails?.manglikStatus}</Text>}
            {personalDetails?.disabilities && <Text style={styles.text}>Disability: {personalDetails?.disabilities}</Text>}
            {personalDetails?.profileCreatedBy && <Text style={styles.text}>Profile Created By: {personalDetails?.profileCreatedBy}</Text>}
          </View>

          {/* Right Container */}
          <View style={styles.rightContainer}>
            {/* Right-side details */}
            {personalDetails?.currentCity && <Text style={styles.text}>{personalDetails?.currentCity}</Text>}
            {personalDetails?.occupation && <Text style={styles.text}>{personalDetails?.occupation}</Text>}
            {personalDetails?.annualIncome && <Text style={styles.text}>Income: {personalDetails?.annualIncome}</Text>}
            {personalDetails?.qualification && <Text style={styles.text}>{personalDetails?.qualification}</Text>}
          </View>
        </View>



        {/* Horoscope Section */}
        {personalDetails?.dob && (
          <View style={styles.flexContainer1}>
            <View>
              <Text style={styles.HeadingText}>Horoscope</Text>
              <Text style={styles.text}>Date of Birth: {moment(personalDetails.dob).format("DD-MM-YYYY")} / Time: {personalDetails?.timeOfBirth}</Text>
              {personalDetails?.placeofbirth && <Text style={styles.text}>Place of Birth: {personalDetails?.placeofbirth}</Text>}

              <View style={styles.flexContainer2}>
                {personalDetails?.nadi && <Text style={styles.text}>Nadi: {personalDetails?.nadi}</Text>}
                {personalDetails?.gotraSelf && <Text style={styles.text}>Gotra (Self): {personalDetails?.gotraSelf}</Text>}
              </View>

              <View style={styles.flexContainer2}>
                {personalDetails?.manglikStatus && <Text style={styles.text}>Manglik Status: {personalDetails?.manglikStatus}</Text>}
                {personalDetails?.gotraMother && <Text style={styles.text}>Gotra (Mother): {personalDetails?.gotraMother}</Text>}
              </View>
            </View>
          </View>
        )}

        {/* About Me Section */}
        {personalDetails?.aboutMe && (
          <View style={styles.flexContainer1}>
            <View>
              <Text style={styles.HeadingText}>About Me</Text>
              <Text style={styles.text}>{personalDetails?.aboutMe}</Text>
              <View style={styles.flexContainer2}>
                {personalDetails?.complexion && <Text style={styles.text}>Completion: {personalDetails?.complexion}</Text>}
                {personalDetails?.weight && <Text style={styles.text}>Weight: {personalDetails?.weight} kg </Text>}
              </View>
              <View style={styles.flexContainer2}>
                {personalDetails?.currentCity && <Text style={styles.text}>Currently in: {personalDetails?.currentCity}</Text>}
                {personalDetails?.livingStatus && <Text style={styles.text}>Living with family: {personalDetails?.livingStatus}</Text>}
              </View>
            </View>
          </View>
        )}

        {/* Family Section */}
        {personalDetails?.fatherName && (
          <View style={styles.flexContainer1}>
            <View>
              <Text style={styles.HeadingText}>Family Section</Text>
              {personalDetails?.fatherName && <Text style={styles.text}>Father’s Name: {personalDetails.fatherName}</Text>}
              {personalDetails?.fatherOccupation && <Text style={styles.text}>Father’s Occupation: {personalDetails.fatherOccupation}</Text>}
              {personalDetails?.motherName && <Text style={styles.text}>Mother’s Name: {personalDetails.motherName}</Text>}
              {personalDetails?.fatherIncomeAnnually && <Text style={styles.text}>Family Income: {personalDetails.fatherIncomeAnnually}</Text>}
              {personalDetails?.familyType && <Text style={styles.text}>Family Type: {personalDetails.familyType}</Text>}
              <Text style={styles.HeadingText}>About My family</Text>
              {personalDetails?.otherFamilyMemberInfo && <Text style={styles.text}>{personalDetails.otherFamilyMemberInfo}</Text>}
            </View>
          </View>
        )}

        {/* Contact Section */}
        {personalDetails?.contactNumber1 && (
          <View style={styles.flexContainer1}>
            <View>
              <Text style={styles.HeadingText}>Contact Details:</Text>
              {personalDetails?.contactNumber1 && <Text style={styles.text}>Mobile No. 1: {personalDetails.contactNumber1}</Text>}
              {personalDetails?.contactNumber2 && <Text style={styles.text}>Mobile No. 2: {personalDetails.contactNumber2}</Text>}
            </View>
          </View>
        )}

        {/* Other Details */}
        {personalDetails?.knowCooking && (
          <View style={styles.flexContainer1}>
            <View>
              <Text style={styles.HeadingText}>Other Details:</Text>
              {personalDetails?.knowCooking && <Text style={styles.text}>Cooking: {personalDetails.knowCooking}</Text>}
              {personalDetails?.dietaryHabit && <Text style={styles.text}>Diet: {personalDetails.dietaryHabit}</Text>}
              {personalDetails?.smokingHabit && <Text style={styles.text}>Smoke: {personalDetails.smokingHabit}</Text>}
              {personalDetails?.drinkingHabit && <Text style={styles.text}>Drinking: {personalDetails.drinkingHabit}</Text>}
              {personalDetails?.tobaccoHabits && <Text style={styles.text}>Tobacco: {personalDetails.tobaccoHabits}</Text>}
            </View>
          </View>
        )}

        {partnerPreferences?.partnerExpectations &&
          <View style={styles.flexContainer3}>
            <Text style={styles.HeadingText}>
              Expectation with partner</Text>
            <Text>{partnerPreferences?.partnerExpectations}</Text>
          </View>
        }


{MyprofileData?.Biodata && (
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
)}

        <Image source={require('../../Images/slider.png')} style={Globalstyles.bottomImage} />
      </ScrollView>
      <Toast/>
    </SafeAreaView>
  );
};

export default MatrimonyPeopleProfile;
