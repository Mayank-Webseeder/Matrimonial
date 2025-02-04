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
import { MATCHED_PROFILE,SEND_REQUEST } from '../../utils/BaseUrl';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
const MatrimonyPeopleProfile = ({ navigation }) => {
  const route = useRoute();
  const { userDetails, userId } = route.params || {};
  console.log("userDetails",userDetails,"userId",userId)
  const user = userDetails.user || {};
  console.log("user",user);
  const id=user?._id;
  console.log("id",id);
  const userpersonalDetails = userDetails.personalDetails || {};
  // console.log("user", userpersonalDetails)
  const partnerPreferences = userDetails.partnerPreferences || {};
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const MyprofileData = useSelector((state) => state.getBiodata);

  // console.log("MyprofileData", MyprofileData);

  // useEffect(() => {
  //   if (userId) {
  //     fetchUserProfile(userId);
  //   }
  // }, [userId]);

  // Function to fetch profile details

// const fetchUserProfile = async (id) => {
//     setLoading(true);
//     const token = await AsyncStorage.getItem('userToken');
//     if (!token) throw new Error('No token found');

//     const headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     };

//     try {
//       const response = await axios.get(`${MATCHED_PROFILE}/${id}`, { headers });
//       if (response.data.status === "success") {
//         setProfileData(response.data);
//       }
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//     } finally {
//       setLoading(false);
//     }
// };

const sendInterestRequest = async () => {
  if (!id) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'User ID not found!',
    });
    return;
  }

  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('No token found');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const response = await axios.post(`${SEND_REQUEST}/${id}`, {}, { headers });

    console.log("Response Data:", JSON.stringify(response?.data));

    if (response.data.status === "success") {
      Toast.show({
        type: 'success',
        text1: 'Interest Sent',
        text2: 'Request sent successfully!',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response.data.message || 'Something went wrong!',
      });
    }
  } catch (error) {
    console.error("API Error:", error?.response ? JSON.stringify(error.response.data) : error.message);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: error.response?.data?.message || 'Failed to send interest!',
    });
  }
};



// if (loading) {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <ActivityIndicator size="large" color={Colors.theme_color} />
//     </View>
//   );
// }


  // if (!profileData) {
  //   return <Text>No data found!</Text>;
  // }

  // Map API comparisonResults to UI labels
  const comparisonResults = profileData?.comparisonResults || {};
  const totalCriteria = Object.keys(comparisonResults).length;
  const matchedCount = Object.values(comparisonResults).filter(value => value).length;



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
          <Text style={Globalstyles.headerText}>{userpersonalDetails?.fullname}</Text>
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
              <Image source={{ uri:userpersonalDetails?.closeUpPhoto }} style={styles.image} />
            </View>
            <View style={styles.slide}>
              <Image source={{ uri: userpersonalDetails?.fullPhoto }} style={styles.image} />
            </View>
            <View style={styles.slide}>
              <Image source={{ uri: userpersonalDetails?.bestPhoto }} style={styles.image} />
            </View>
          </Swiper>
        </View>

        {/* Profile Info Section */}
        <View style={styles.flexContainer}>
          <View style={styles.flex}>
            {/* <Text style={styles.Idtext}>ID NO. :- {user?._id}</Text> */}
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
            <Text style={styles.HeadingText}>{userpersonalDetails?.fullname}</Text>

            {/* Other details */}
            <Text style={styles.text}>Age: {calculateAge(userpersonalDetails.dob)} / Height: {userpersonalDetails?.heightFeet} feet</Text>
            {userpersonalDetails?.subCaste && <Text style={styles.text}>SubCaste: {userpersonalDetails?.subCaste}</Text>}
            {userpersonalDetails?.maritalStatus && <Text style={styles.text}>Marital Status: {userpersonalDetails?.maritalStatus}</Text>}
            {userpersonalDetails?.manglikStatus && <Text style={styles.text}>Manglik Status: {userpersonalDetails?.manglikStatus}</Text>}
            {userpersonalDetails?.disabilities && <Text style={styles.text}>Disability: {userpersonalDetails?.disabilities}</Text>}
            {userpersonalDetails?.profileCreatedBy && <Text style={styles.text}>Profile Created By: {userpersonalDetails?.profileCreatedBy}</Text>}
          </View>

          {/* Right Container */}
          <View style={styles.rightContainer}>
            {/* Right-side details */}
            {userpersonalDetails?.cityOrVillage && <Text style={styles.text}>{userpersonalDetails?.cityOrVillage}</Text>}
            {userpersonalDetails?.occupation && <Text style={styles.text}>{userpersonalDetails?.occupation}</Text>}
            {userpersonalDetails?.annualIncome && <Text style={styles.text}>Income: {userpersonalDetails?.annualIncome}</Text>}
            {userpersonalDetails?.qualification && <Text style={styles.text}>{userpersonalDetails?.qualification}</Text>}
          </View>
        </View>



        {/* Horoscope Section */}
        {userpersonalDetails?.dob && (
          <View style={styles.flexContainer1}>
            <View>
              <Text style={styles.HeadingText}>Horoscope</Text>
              <Text style={styles.text}>Date of Birth: {moment(userpersonalDetails.dob).format("DD-MM-YYYY")} / Time: {userpersonalDetails?.timeOfBirth}</Text>
              {userpersonalDetails?.placeofbirth && <Text style={styles.text}>Place of Birth: {userpersonalDetails?.placeofbirth}</Text>}

              <View style={styles.flexContainer2}>
                {userpersonalDetails?.nadi && <Text style={styles.text}>Nadi: {userpersonalDetails?.nadi}</Text>}
                {userpersonalDetails?.gotraSelf && <Text style={styles.text}>Gotra (Self): {userpersonalDetails?.gotraSelf}</Text>}
              </View>

              <View style={styles.flexContainer2}>
                {userpersonalDetails?.manglikStatus && <Text style={styles.text}>Manglik Status: {userpersonalDetails?.manglikStatus}</Text>}
                {userpersonalDetails?.gotraMother && <Text style={styles.text}>Gotra (Mother): {userpersonalDetails?.gotraMother}</Text>}
              </View>
            </View>
          </View>
        )}

        {/* About Me Section */}
        {userpersonalDetails?.aboutMe && (
          <View style={styles.flexContainer1}>
            <View>
              <Text style={styles.HeadingText}>About Me</Text>
              <Text style={styles.text}>{userpersonalDetails?.aboutMe}</Text>
              <View style={styles.flexContainer2}>
                {userpersonalDetails?.complexion && <Text style={styles.text}>Completion: {userpersonalDetails?.complexion}</Text>}
                {userpersonalDetails?.weight && <Text style={styles.text}>Weight: {userpersonalDetails?.weight} kg </Text>}
              </View>
              <View style={styles.flexContainer2}>
                {userpersonalDetails?.currentCity && <Text style={styles.text}>Currently in: {userpersonalDetails?.currentCity}</Text>}
                {userpersonalDetails?.livingStatus && <Text style={styles.text}>Living with family: {userpersonalDetails?.livingStatus}</Text>}
              </View>
            </View>
          </View>
        )}

        {/* Family Section */}
        {userpersonalDetails?.fatherName && (
          <View style={styles.flexContainer1}>
            <View>
              <Text style={styles.HeadingText}>Family Section</Text>
              {userpersonalDetails?.fatherName && <Text style={styles.text}>Father’s Name: {userpersonalDetails.fatherName}</Text>}
              {userpersonalDetails?.fatherOccupation && <Text style={styles.text}>Father’s Occupation: {userpersonalDetails.fatherOccupation}</Text>}
              {userpersonalDetails?.motherName && <Text style={styles.text}>Mother’s Name: {userpersonalDetails.motherName}</Text>}
              {userpersonalDetails?.fatherIncomeAnnually && <Text style={styles.text}>Family Income: {userpersonalDetails.fatherIncomeAnnually}</Text>}
              {userpersonalDetails?.familyType && <Text style={styles.text}>Family Type: {userpersonalDetails.familyType}</Text>}
              <Text style={styles.HeadingText}>About My family</Text>
              {userpersonalDetails?.otherFamilyMemberInfo && <Text style={styles.text}>{userpersonalDetails.otherFamilyMemberInfo}</Text>}
            </View>
          </View>
        )}

        {/* Contact Section */}
        {userpersonalDetails?.contactNumber1 && (
          <View style={styles.flexContainer1}>
            <View>
              <Text style={styles.HeadingText}>Contact Details:</Text>
              {userpersonalDetails?.contactNumber1 && <Text style={styles.text}>Mobile No. 1: {userpersonalDetails.contactNumber1}</Text>}
              {userpersonalDetails?.contactNumber2 && <Text style={styles.text}>Mobile No. 2: {userpersonalDetails.contactNumber2}</Text>}
            </View>
          </View>
        )}

        {/* Other Details */}
        {userpersonalDetails?.knowCooking && (
          <View style={styles.flexContainer1}>
            <View>
              <Text style={styles.HeadingText}>Other Details:</Text>
              {userpersonalDetails?.knowCooking && <Text style={styles.text}>Cooking: {userpersonalDetails.knowCooking}</Text>}
              {userpersonalDetails?.dietaryHabit && <Text style={styles.text}>Diet: {userpersonalDetails.dietaryHabit}</Text>}
              {userpersonalDetails?.smokingHabit && <Text style={styles.text}>Smoke: {userpersonalDetails.smokingHabit}</Text>}
              {userpersonalDetails?.drinkingHabit && <Text style={styles.text}>Drinking: {userpersonalDetails.drinkingHabit}</Text>}
              {userpersonalDetails?.tobaccoHabits && <Text style={styles.text}>Tobacco: {userpersonalDetails.tobaccoHabits}</Text>}
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
