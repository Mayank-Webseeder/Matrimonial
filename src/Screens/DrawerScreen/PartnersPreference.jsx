import { StyleSheet, Text, View, Image, ImageBackground, TextInput, ScrollView, SafeAreaView, StatusBar, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/PartnerPreferenceStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-element-dropdown';
import { DrawerActions } from '@react-navigation/native';
import { CREATE_PARTNER_PERFRENCES, UPDATE_PARTNER_PERFRENCES, GET_BIODATA } from '../../utils/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Globalstyles from '../../utils/GlobalCss';
import { useSelector } from 'react-redux';
import moment from "moment";
import Toast from 'react-native-toast-message';

import {
  OccupationData, QualificationData, FamilyTypeData,
  FamilyFinancialStatusData, PartnersLiveinData, BodyStructureData, ComplexionData, DietHabit, Disabilities, subCasteOptions,
  PartnermaritalStatusData, PartnersmokingStatusData, PartnerDrinkingHabit, PartnerManglikStatusData, Income, CityData, StateData
} from '../../DummyData/DropdownData';

const PartnersPreference = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState('PartnersPreference');
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const profileData = useSelector((state) => state.profile);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [stateInput, setStateInput] = useState('');
  const [subCasteInput, setSubCasteInput] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredSubCaste, setFilteredSubCaste] = useState([]);
  const [cityInput, setCityInput] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSubCaste, setSelectedSubCaste] = useState('');
  console.log("profileData", profileData);

   const formattedDate = moment(profileData.dob).format("DD/MM/YYYY");

  const [biodata, setBiodata] = useState({
    partnerSubCaste: '',
    partnerMinAge: '',
    partnerMaxAge: '',
    partnerMinHeightFeet: '',
    partnerMaxHeightFeet: '',
    partnerMaritalStatus: '',
    partnerIncome: '',
    partnerOccupation: '',
    partnerQualification: '',
    partnerDisabilities: '',
    partnerManglikStatus: '',
    partnersLivingStatus: '',
    partnerState: '',
    partnerCity: '',
    partnerBodyStructure: '',
    partnerComplexion: '',
    partnerDietaryHabits: '',
    partnerSmokingHabits: '',
    partnerDrinkingHabits: '',
    partnerExpectations: '',
    partnerFamilyType: '',
    partnerFamilyFinancialStatus: '',
    partnerFamilyIncome: ''
  });

  const handleStateInputChange = (text) => {
    setStateInput(text);
    if (text) {
      // Filter the StateData based on the input
      const filtered = StateData.filter((item) =>
        item?.label?.toLowerCase().includes(text.toLowerCase())
      ).map(item => item.label);
      setFilteredStates(filtered);
    } else {
      setFilteredStates([]);
    }
  };

  // Handle state selection to update both the input field and biodata.partnerState
  const handleStateSelect = (item) => {
    setStateInput(item);  // Set input value to the selected state
    setSelectedState(item);  // Optionally store selected state if needed
    setBiodata((prevBiodata) => ({
      ...prevBiodata,
      partnerState: item,  // Update biodata with selected state
    }));
    setFilteredStates([]);  // Clear suggestions after selection
  };

  const handleCityInputChange = (text) => {
    setCityInput(text);
    if (text) {
      // Filter the CityData based on the input
      const filtered = CityData.filter((item) =>
        item?.label?.toLowerCase().includes(text.toLowerCase())
      ).map(item => item.label);
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  // Handle city selection to update both the input field and biodata.partnerCity
  const handleCitySelect = (item) => {
    setCityInput(item);  // Set input value to the selected city
    setSelectedCity(item);  // Optionally store selected city if needed
    setBiodata((prevBiodata) => ({
      ...prevBiodata,
      partnerCity: item,  // Update biodata with selected city
    }));
    setFilteredCities([]);  // Clear suggestions after selection
  };

  const handleSubCasteInputChange = (text) => {
    setSubCasteInput(text);
    if (text) {
      const filtered = subCasteOptions.filter((item) =>
        item?.label?.toLowerCase().includes(text.toLowerCase())
      ).map(item => item.label);
      setFilteredSubCaste(filtered);
    } else {
      setFilteredSubCaste([]);
    }
  };

  // Sub Caste input handler
  const handleSubCasteSelect = (item) => {
    setSubCasteInput(item);
    setSelectedSubCaste(item);
    setBiodata((prevBiodata) => ({
      ...prevBiodata,
      partnerSubCaste: item,
    }));
    setFilteredSubCaste([]);
  };

  const ageData = Array.from({ length: 82 }, (_, i) => ({
    label: `${18 + i}`,
    value: `${18 + i}`,
  }));


  const heightData = Array.from({ length: 4 }, (_, feetIndex) =>
    Array.from({ length: 12 }, (_, inchesIndex) => ({
      label: `${4 + feetIndex} ' ${inchesIndex} '' `,
      value: `${4 + feetIndex}-${inchesIndex}`,
    }))
  ).flat();


  const handlePress = (buttonName) => {
    setSelectedButton(buttonName);
    navigation.navigate(buttonName);
  };

  const handleSave = () => {
    navigation.navigate('PhotoGallery')
  }

  // const getBiodata = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('userToken');
  //     if (!token) throw new Error('No token found');

  //     const headers = {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`,
  //     };

  //     const response = await axios.get(GET_BIODATA, { headers });
  //     setBiodata(response.data.data.partnerPreferences);
  //     console.log("data", JSON.stringify(biodata))
  //     setIsEditable(true);

  //   } catch (error) {
  //     setIsLoading(false);
  //     setIsEditable(true);
  //     console.error("Error fetching biodata:", error);

  //   }
  // };

  // useEffect(() => {
  //   getBiodata()
  // }, [])

  // const handleSave = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('userToken');
  //     if (!token) throw new Error('No token found');

  //     const headers = {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`,
  //     };

  //     // Construct the payload dynamically for CREATE or UPDATE
  //     const payload = biodata?._id
  //       ? {
  //         ...(biodata.partnerSubCaste && { partnerSubCaste: biodata.partnerSubCaste }),
  //         ...(biodata.partnerMinAge && { partnerMinAge: biodata.partnerMinAge }),
  //         ...(biodata.partnerMaxAge && { partnerMaxAge: biodata.partnerMaxAge }),
  //         ...(biodata.partnerMinHeightFeet && { partnerMinHeightFeet: biodata.partnerMinHeightFeet }),
  //         ...(biodata.partnerMaxHeightFeet && { partnerMaxHeightFeet: biodata.partnerMaxHeightFeet }),
  //         ...(biodata.partnerMaritalStatus && { partnerMaritalStatus: biodata.partnerMaritalStatus }),
  //         ...(biodata.partnerIncome && { partnerIncome: biodata.partnerIncome }),
  //         ...(biodata.partnerOccupation && { partnerOccupation: biodata.partnerOccupation }),
  //         ...(biodata.partnerQualification && { partnerQualification: biodata.partnerQualification }),
  //         ...(biodata.partnerDisabilities && { partnerDisabilities: biodata.partnerDisabilities }),
  //         ...(biodata.partnerManglikStatus && { partnerManglikStatus: biodata.partnerManglikStatus }),
  //         ...(biodata.partnersLivingStatus && { partnersLivingStatus: biodata.partnersLivingStatus }),
  //         ...(biodata.partnerState && { partnerState: biodata.partnerState }),
  //         ...(biodata.partnerCity && { partnerCity: biodata.partnerCity }),
  //         ...(biodata.partnerBodyStructure && { partnerBodyStructure: biodata.partnerBodyStructure }),
  //         ...(biodata.partnerComplexion && { partnerComplexion: biodata.partnerComplexion }),
  //         ...(biodata.partnerDietaryHabits && { partnerDietaryHabits: biodata.partnerDietaryHabits }),
  //         ...(biodata.partnerSmokingHabits && { partnerSmokingHabits: biodata.partnerSmokingHabits }),
  //         ...(biodata.partnerDrinkingHabits && { partnerDrinkingHabits: biodata.partnerDrinkingHabits }),
  //         ...(biodata.partnerExpectations && { partnerExpectations: biodata.partnerExpectations }),
  //         ...(biodata.partnerFamilyType && { partnerFamilyType: biodata.partnerFamilyType }),
  //         ...(biodata.partnerFamilyFinancialStatus && { partnerFamilyFinancialStatus: biodata.partnerFamilyFinancialStatus }),
  //         ...(biodata.partnerFamilyIncome && { partnerFamilyIncome: biodata.partnerFamilyIncome }),
  //       }
  //       : {
  //         partnerSubCaste: biodata.partnerSubCaste || "",
  //         partnerMinAge: biodata.partnerMinAge || "",
  //         partnerMaxAge: biodata.partnerMaxAge || "",
  //         partnerMinHeightFeet: biodata.partnerMinHeightFeet || "",
  //         partnerMaxHeightFeet: biodata.partnerMaxHeightFeet || "",
  //         partnerMaritalStatus: biodata.partnerMaritalStatus || "",
  //         partnerIncome: biodata.partnerIncome || "",
  //         partnerOccupation: biodata.partnerOccupation || "",
  //         partnerQualification: biodata.partnerQualification || "",
  //         partnerDisabilities: biodata.partnerDisabilities || "",
  //         partnerManglikStatus: biodata.partnerManglikStatus || "",
  //         partnersLivingStatus: biodata.partnersLivingStatus || "",
  //         partnerState: biodata.partnerState || "",
  //         partnerCity: biodata.partnerCity || "",
  //         partnerBodyStructure: biodata.partnerBodyStructure || "",
  //         partnerComplexion: biodata.partnerComplexion || "",
  //         partnerDietaryHabits: biodata.partnerDietaryHabits || "",
  //         partnerSmokingHabits: biodata.partnerSmokingHabits || "",
  //         partnerDrinkingHabits: biodata.partnerDrinkingHabits || "",
  //         partnerExpectations: biodata.partnerExpectations || "",
  //         partnerFamilyType: biodata.partnerFamilyType || "",
  //         partnerFamilyFinancialStatus: biodata.partnerFamilyFinancialStatus || "",
  //         partnerFamilyIncome: biodata.partnerFamilyIncome || "",
  //       };

  //     console.log("payload", payload);
  //     const apiCall = biodata?._id ? axios.put : axios.post;
  //     const endpoint = biodata?._id ? UPDATE_PARTNER_PERFRENCES : CREATE_PARTNER_PERFRENCES;

  //     const response = await apiCall(endpoint, payload, { headers });
  //     console.log("Save response:", response.data);

  //     Toast.show({
  //       type: "success",
  //       text1: biodata?._id ? "Partner preferences updated successfully." : "Partner preferences added successfully.",
  //       text2: "Your changes have been saved!",
  //       position: 'top',
  //       visibilityTime: 1000,
  //       textStyle: { fontSize: 10, color: "green" },
  //     });

  //     setIsEditing(false);
  //   } catch (error) {
  //     console.error("Error saving biodata:", error);
  //     Toast.show({
  //       type: "error",
  //       text1: "Error",
  //       text2: error.response?.data?.message || error.message || "Something went wrong",
  //       position: 'top',
  //       visibilityTime: 1000,
  //       textStyle: { fontSize: 10, color: "red" },
  //     });
  //   }
  // };

  // if (isLoading) {
  //   return <View style={styles.loading}>
  //     <ActivityIndicator size={'large'} color={Colors.theme_color} />
  //   </View>;
  // }

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={Globalstyles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={require('../../Images/menu.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <View>
            <Text style={Globalstyles.headerText}>Matrimony Profile</Text>
          </View>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <ImageBackground source={require('../../Images/profile3.png')} style={styles.image}>
          <View style={styles.smallHeader}>
            <MaterialIcons
              name="add-a-photo"
              color={Colors.theme_color}
              size={40}
              style={styles.cameraIcon}
            />
          </View>
        </ImageBackground>
        <Text style={styles.editText} onPress={() => navigation.navigate('UpdateProfile')}>Edit Profile</Text>
        <View style={styles.userDeatil}>
          <View style={styles.userData}>
            <Text style={styles.text}>{profileData?.profiledata?.username || 'NA'}</Text>
            <Text style={styles.text}>{profileData?.profiledata?.mobileNo}</Text>
          </View>
          <View style={styles.userData}>
            <Text style={styles.text}>DOB: {formattedDate || 'NA'}</Text>
            <Text style={styles.text}>City: {profileData?.profiledata?.city || 'NA'}</Text>
          </View>
          <View style={styles.userData}>

            <Text style={styles.text}>Gender: {profileData?.profiledata?.gender || 'NA'}</Text>
          </View>
        </View>

        <View style={styles.IconFlex}>
          <TouchableOpacity
            style={styles.IconsButton}
            onPress={() => handlePress('DetailedProfile')}
          >
            <AntDesign
              name={'user'}
              color={selectedButton === 'DetailedProfile' ? 'white' : Colors.theme_color}
              size={25}
              style={selectedButton === 'DetailedProfile' ? styles.Selectedicon : styles.icon}
            />
            <Text style={styles.logotext}>Detailed Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.IconsButton}
            onPress={() => handlePress('PartnersPreference')}
          >
            <FontAwesome5
              name={'user-friends'}
              color={selectedButton === 'PartnersPreference' ? 'white' : Colors.theme_color}
              size={25}
              style={selectedButton === 'PartnersPreference' ? styles.Selectedicon : styles.icon}
            />
            <Text style={styles.logotext}>Partner Preference</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.IconsButton}
            onPress={() => handlePress('PhotoGallery')}
          >
            <MaterialIcons
              name={'insert-photo'}
              color={selectedButton === 'PhotoGallery' ? 'white' : Colors.theme_color} // Icon color change
              size={25}
              style={selectedButton === 'PhotoGallery' ? styles.Selectedicon : styles.icon}
            />
            <Text style={styles.logotext}>Photo Gallery</Text>
          </TouchableOpacity>
        </View>
        <View style={Globalstyles.form}>
          <Text style={styles.detailText}>Preferences</Text>
          <Text style={Globalstyles.title}>Sub-Caste</Text>
          <TextInput
            style={Globalstyles.input}
            value={subCasteInput}
            onChangeText={handleSubCasteInputChange}
            placeholder="Type Your Sub Caste"
            placeholderTextColor={'gray'}
          />
          {filteredSubCaste.length > 0 && subCasteInput ? (
            <FlatList
              data={filteredSubCaste.slice(0, 5)}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSubCasteSelect(item)}>
                  <Text style={Globalstyles.listItem}>{item}</Text>
                </TouchableOpacity>
              )}
              style={Globalstyles.suggestions}
            />
          ) : null}

          <Text style={Globalstyles.title}>Age Criteria</Text>
          <View style={styles.row}>
            <Dropdown
              style={[styles.dropdown, !isEditing && styles.readOnly]}
              data={ageData}
              labelField="label"
              valueField="value"
              value={biodata.partnerMinAge}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, partnerMinAge: item.value })}
              placeholder="Min Age"
            />
            <Dropdown
              style={[styles.dropdown, !isEditing && styles.readOnly]}
              data={ageData}
              labelField="label"
              valueField="value"
              value={biodata.partnerMaxAge}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, partnerMaxAge: item.value })}
              placeholder="Min Age"
            />
          </View>
          <Text style={Globalstyles.title}>Height Criteria</Text>
          <View style={styles.row}>
            <Dropdown
              style={[styles.dropdown, !isEditing && styles.readOnly]}
              data={heightData}
              labelField="label"
              valueField="value"
              value={biodata.partnerMinHeightFeet}
              editable={isEditing}
              onChange={(item) => {
                setBiodata({
                  ...biodata,
                  partnerMinHeightFeet: item.value,
                });
              }}
              placeholder="Min Height"
            />
            <Dropdown
              style={[styles.dropdown, !isEditing && styles.readOnly]}
              data={heightData}
              labelField="label"
              valueField="value"
              value={biodata.partnerMaxHeightFeet}
              editable={isEditing}
              onChange={(item) => {
                setBiodata({
                  ...biodata,
                  partnerMaxHeightFeet: item.value,
                });
              }}
              placeholder="Max Height"
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Partners Marital Status</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={PartnermaritalStatusData}
              labelField="label"
              valueField="value"
              value={biodata.partnerMaritalStatus}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, partnerMaritalStatus: item.value })}
              placeholder="Select status"
            />
            <Text style={Globalstyles.title}>Income Range (in INR)</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={Income}
              labelField="label"
              valueField="value"
              value={biodata.partnerIncome}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, partnerIncome: item.value })}
              placeholder="Income"
            />
            <Text style={Globalstyles.title}>Occupation</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={OccupationData}
              labelField="label"
              valueField="value"
              value={biodata.partnerOccupation}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, partnerOccupation: item.value })}
              placeholder="Select occupdation"
            />

            <Text style={styles.inputHeading}>Qualification</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={QualificationData}
              labelField="label"
              valueField="value"
              value={biodata.partnerQualification}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, partnerQualification: item.value })}
              placeholder="Select Qualification"
            />
            <Text style={Globalstyles.title}>Disabilities (Physical/Mental)</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={Disabilities}
              labelField="label"
              valueField="value"
              value={biodata.partnerDisabilities}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, partnerDisabilities: item.value })}
              placeholder="Select disability"
            />
            <Text style={Globalstyles.title}>Manglik Status</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={PartnerManglikStatusData}
              labelField="label"
              valueField="value"
              value={biodata.partnerManglikStatus}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, partnerManglikStatus: item.value })}
              placeholder="Select status"
            />
            <Text style={Globalstyles.title}>Partners Livein</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={PartnersLiveinData}
              labelField="label"
              valueField="value"
              value={biodata.partnersLivingStatus}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, partnersLivingStatus: item.value })}
              placeholder="Select Livein"
            />
            <Text style={Globalstyles.title}>State</Text>
            <TextInput
              style={Globalstyles.input}
              value={stateInput}
              onChangeText={handleStateInputChange}
              placeholder="Type your state"
              placeholderTextColor={'gray'}
            />
            {filteredStates.length > 0 && stateInput ? (
              <FlatList
                data={filteredStates.slice(0, 5)}
                scrollEnabled={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleStateSelect(item)}>
                    <Text style={Globalstyles.listItem}>{item}</Text>
                  </TouchableOpacity>
                )}
                style={Globalstyles.suggestions}
              />
            ) : null}

            <Text style={Globalstyles.title}>City / Village</Text>
            <TextInput
              style={Globalstyles.input}
              value={cityInput}
              onChangeText={handleCityInputChange}
              placeholder="Type your city"
              placeholderTextColor={'gray'}
            />
            {filteredCities.length > 0 && cityInput ? (
              <FlatList
                data={filteredCities.slice(0, 5)}
                scrollEnabled={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleCitySelect(item)}>
                    <Text style={Globalstyles.listItem}>{item}</Text>
                  </TouchableOpacity>
                )}
                style={Globalstyles.suggestions}
              />
            ) : null}
            <Text style={Globalstyles.title}>Partners body Structure</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={BodyStructureData}
              labelField="label"
              valueField="value"
              value={biodata.partnerBodyStructure}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, partnerBodyStructure: item.value })}
              placeholder="Select structure"
            />
            <Text style={Globalstyles.title}>Complexion</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={ComplexionData}
              labelField="label"
              valueField="value"
              value={biodata.partnerComplexion}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, partnerComplexion: item.value })}
              placeholder="Select Complexion"
            />
            <Text style={Globalstyles.title}>Partner Dietary Habits</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={DietHabit}
              labelField="label"
              valueField="value"
              value={biodata.partnerDietaryHabits}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, partnerDietaryHabits: item.value })}
              placeholder="Select Diet"
            />
            <Text style={Globalstyles.title}>Smoking Habits</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={PartnersmokingStatusData}
              labelField="label"
              valueField="value"
              value={biodata.partnerSmokingHabits}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, partnerSmokingHabits: item.value })}
              placeholder="Select smoking"
            />
            <Text style={Globalstyles.title}>Drinking Habits</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={PartnerDrinkingHabit}
              labelField="label"
              valueField="value"
              value={biodata.partnerDrinkingHabits}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, partnerDrinkingHabits: item.value })}
              placeholder="Select Habit"
            />
            <Text style={Globalstyles.title}>Family Type</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={FamilyTypeData}
              labelField="label"
              valueField="value"
              placeholder="Select Family Type"
              value={biodata.partnerFamilyType}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, partnerFamilyType: item.value })}
            />
            <Text style={Globalstyles.title}>Family Financial Status</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={FamilyFinancialStatusData}
              labelField="label"
              valueField="value"
              placeholder="Select Family Financial Status"
              value={biodata.partnerFamilyFinancialStatus}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, partnerFamilyFinancialStatus: item.value })}
            />
            <Text style={Globalstyles.title}>Family Income</Text>
            <Dropdown
              style={Globalstyles.input}
              data={Income}
              labelField="label"
              valueField="value"
              placeholder="Select Family Income"
              value={biodata.partnerFamilyIncome}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, partnerFamilyIncome: item.value })}
            />
            <Text style={Globalstyles.title}>Expectations from Partner</Text>
            <TextInput style={Globalstyles.textInput}
              multiline={true} numberOfLines={6}
              value={biodata.partnerExpectations}
              editable={isEditing}
              placeholder='Type Your Expectations '
              placeholderTextColor={'gray'}
              onChangeText={(text) =>
                setBiodata({ ...biodata, partnerExpectations: text })
              }
              textAlignVertical='top' />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PartnersPreference