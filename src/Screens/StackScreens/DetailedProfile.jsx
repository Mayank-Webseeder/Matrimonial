import { Text, View, Image, ImageBackground, TextInput, ScrollView, SafeAreaView, StatusBar, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/ProfileStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-element-dropdown';
import { CREATE_PERSONAL_DETAILS, UPDATE_PERSONAL_DETAILS, GET_BIODATA } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import moment from "moment";
import { launchImageLibrary } from 'react-native-image-picker';

import {
  OccupationData, QualificationData, maritalStatusData, ManglikStatusData, gotraData, MotherGotraData, LivingData, ComplexionData,
  ProfileCreatedData, CityData, Income, FamilyType, CookingStatus, DietHabit, smokingStatusData, DrinkingHabit, PeoplePosition,
  MotherOccupationData,
  MotherIncome,
  StateData,
  TobacooHabit, subCasteOptions,
  MyDisabilities,
  MyComplexionData
} from '../../DummyData/DropdownData';
import Globalstyles from '../../utils/GlobalCss';


const DetailedProfile = ({ navigation }) => {
  const [selectedButton, setSelectedButton] = useState('DetailedProfile');
  const [isEditing, setIsEditing] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [peoplePosition, setPeoplePosition] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [images, setImages] = useState({
    closeupImage: null,
    fullImage: null,
    bestImage: null,
  });

  const pickImage = async (field) => {
    const options = {
      mediaType: 'photo',
      includeBase64: false, // Set to true if you need base64 string
      quality: 1, // Set the image quality
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorCode);
      } else {
        const selectedImage = response.assets[0];
        setImages((prevState) => ({
          ...prevState,
          [field]: selectedImage,
        }));
      }
    });
  };

  const getFileName = (uri) => {
    if (!uri) return "";

    const splitUri = uri.split('/');
    const fullFileName = splitUri[splitUri.length - 1];
    const baseName = fullFileName.split('.')[0];
    const shortenedName = baseName.substring(0, 15);

    return shortenedName;
  };



  const profileData = useSelector((state) => state.profile);
  console.log("profileData", profileData);
  const formattedDate = moment(profileData?.profiledata?.dob).format("DD MMMM YYYY");
  const [biodata, setBiodata] = useState({
    subCaste: "",
    fullname: "",
    dob: "",
    placeofbirth: "",
    maritalStatus: "",
    minHeightFeet: 0,
    maxHeightFeet: 0,
    weight: 0,
    complexion: "",
    manglikStatus: "",
    specialAbility: "",
    nadi: "",
    gotraSelf: "",
    gotraMother: "",
    qualification: "",
    occupation: "",
    annualIncome: 0,
    livingStatus: "",
    currentCity: "",
    aboutMe: "",
    mobileNo: "",
    profileCreatedBy: "",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    fatherIncomeAnnually: 0,
    motherIncomeAnnually: 0,
    otherFamilyMemberOccupation: "",
    familyType: "",
    siblings: 0,
    otherFamilyMemberInfo: "",
    contact1: "",
    contact2: "",
    state: "",
    City_village: "",
    familyMemberMobileNo: "",
    permanentAddress: "",
    residentialAddress: "",
    knowCooking: false,
    partnerDietHabit: "",
    smokingHabit: "",
    drinkingHabit: "",
    hobbies: [],
    closeupImage: null,
    fullImage: null,
    bestImage: null,
  });

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

  const handleTimeChange = (event, selectedDate) => {
    setShowTimePicker(false); // Close the picker
    if (selectedDate) {
      const formattedTime = moment(selectedDate).format("hh:mm A"); // Format to "HH:MM AM/PM"
      setBiodata((prevState) => ({
        ...prevState,
        timeOfBirth: formattedTime, // Save to biodata
      }));
    }
  };



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

  const heightData = Array.from({ length: 4 }, (_, feetIndex) =>
    Array.from({ length: 12 }, (_, inchesIndex) => ({
      label: `${4 + feetIndex} ' ${inchesIndex} '' `,
      value: `${4 + feetIndex}-${inchesIndex}`,
    }))
  ).flat();

  const weightData = Array.from({ length: 60 }, (_, i) => ({
    label: `${40 + i} kg`,
    value: `${40 + i}`,
  }));

  const siblings = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} Sibling${i > 0 ? 's' : ''}`
  }));

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handlePress = (buttonName) => {
    setSelectedButton(buttonName);
    navigation.navigate(buttonName);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || biodata.dob;
    setShowDatePicker(false);

    // Only update if the date has changed
    if (currentDate !== biodata.dob) {
      setBiodata((prevState) => ({
        ...prevState,
        dob: currentDate instanceof Date ? currentDate : new Date(),
      }));
    }
  };


  const formatDate = (date) => {

    const validDate = new Date(date);
    if (isNaN(validDate)) {
      return "";
    }

    const day = validDate.getDate().toString().padStart(2, "0");
    const month = (validDate.getMonth() + 1).toString().padStart(2, "0");
    const year = validDate.getFullYear();
    return `${day}/${month}/${year}`;
  };


  const handleSave = () => {
    navigation.navigate('PartnersPreference')
  }
  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={Globalstyles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../../Images/menu.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Matrimony Profile</Text>
          <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownContainer}>
            <AntDesign name={'caretdown'} color={Colors.theme_color} size={15} />
          </TouchableOpacity>
          {dropdownVisible && (
            <Dropdown
              style={styles.heightinput}
              data={PeoplePosition}
              labelField="label"
              valueField="value"
              value={peoplePosition}
              onChange={(item) => {
                setPeoplePosition(item.value);
                setDropdownVisible(false);
              }}
              placeholder="Select"
            />
          )}
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
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
        <Text style={styles.RepostText}>Repost</Text>
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
              color={selectedButton === 'PhotoGallery' ? 'white' : Colors.theme_color}
              size={25}
              style={selectedButton === 'PhotoGallery' ? styles.Selectedicon : styles.icon}
            />
            <Text style={styles.logotext}>Photo Gallery</Text>
          </TouchableOpacity>
        </View>
        <View style={Globalstyles.form}>
          <View style={styles.detail}>
            <Text style={Globalstyles.title}>Personal Details</Text>
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text style={styles.detailText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <Text style={Globalstyles.title}>Sub-Caste</Text>
          <TextInput
            style={Globalstyles.input}
            value={subCasteInput}
            onChangeText={handleSubCasteInputChange}
            placeholder="Type your sub caste"
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

          <View>
            <Text style={Globalstyles.title}>Full Name</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.fullname}
              editable={isEditing}
              onChangeText={(text) => setBiodata({ ...biodata, fullname: text })}

            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Date of Birth</Text>
            <TextInput
              style={[styles.DobInput, !isEditing && styles.readOnly]}
              value={biodata.dob ? formatDate(biodata.dob) : ""}
              editable={isEditing}
              onFocus={() => setShowDatePicker(true)}
              placeholder="Select your date of birth"
            />

            {showDatePicker && (
              <DateTimePicker
                value={biodata.dob || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => handleDateChange(event, selectedDate)}
              />
            )}
          </View>
          <View>
            <Text style={Globalstyles.title}>Time of Birth</Text>
            <TextInput
              style={[styles.DobInput, !isEditing && styles.readOnly]}
              value={biodata.timeOfBirth}
              editable={isEditing}
              onFocus={() => setShowTimePicker(true)} // Open time picker
              placeholder="HH:MM AM/PM"
              placeholderTextColor="gray"
            />
            {showTimePicker && (
              <DateTimePicker
                value={new Date()} // Default to current time if not set
                mode="time" // Time picker mode
                display="spinner" // You can use "default", "spinner", or "clock"
                is24Hour={false} // Show 12-hour time format
                onChange={handleTimeChange} // Handle time changes
              />
            )}
          </View>
          <View>
            <Text style={Globalstyles.title}>Place of Birth</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.placeofbirth}
              editable={isEditing}
              onChangeText={(text) => setBiodata({ ...biodata, placeofbirth: text })}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Marital Status</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={maritalStatusData}
              labelField="label"
              valueField="value"
              value={biodata.maritalStatus}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, maritalStatus: item.value })}
              placeholder="Select marital status"
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>
              Disabilities (physical, mental, etc.)</Text>
            <Dropdown
              style={[styles.input, !isEditing && styles.readOnly]}
              data={MyDisabilities}
              labelField="label"
              valueField="value"
              value={biodata.specialAbility}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, specialAbility: item.value })}
              placeholder="Select disability"
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Height</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={heightData}
              labelField="label"
              valueField="value"
              value={biodata.minHeightFeet}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, minHeightFeet: item.value })}
              placeholder="Height"
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Weight (in kg)</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={weightData}
              labelField="label"
              valueField="value"
              value={biodata.weight}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, minWeight: item.value })}
              placeholder="Weight"
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Complexion</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={MyComplexionData}
              labelField="label"
              valueField="value"
              value={biodata.complexion}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, complexion: item.value })}
              placeholder="Select Complexion"
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Manglik Status</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={ManglikStatusData}
              labelField="label"
              valueField="value"
              value={biodata.manglikStatus}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, manglikStatus: item.value })}
              placeholder="Select status"
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Nadi (Optional)</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.nadi}
              editable={isEditing}
              onChangeText={(text) => setBiodata({ ...biodata, nadi: text })}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Self Gotra   (Optional)</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.gotraSelf}
              editable={isEditing}
              onChangeText={(text) => setBiodata({ ...biodata, gotraSelf: text })}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Mother Gotra   (Optional)</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.gotraMother}
              editable={isEditing}
              onChangeText={(text) => setBiodata({ ...biodata, gotraMother: text })}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Qualification</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={QualificationData}
              labelField="label"
              valueField="value"
              value={biodata.qualification}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, qualification: item.value })}
              placeholder="Select Qualification"
              disabled={!isEditing}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Occupation</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={OccupationData}
              labelField="label"
              valueField="value"
              value={biodata.occupation}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, occupation: item.value })}
              placeholder="Select occupation"
              disabled={!isEditing}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Income (Annually)</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={Income}
              labelField="label"
              valueField="value"
              value={biodata.annualIncome}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, annualIncome: item.value })}
              placeholder="Select Income"
              disabled={!isEditing}
            />

          </View>
          <View>
            <Text style={Globalstyles.title}>Are you living with Family</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={LivingData}
              labelField="label"
              valueField="value"
              value={biodata.livingStatus}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, livingStatus: item.value })}
              placeholder="Select Status"
              disabled={!isEditing}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Which city do you currently live in?</Text>
            <TextInput
              style={Globalstyles.input}
              value={cityInput}
              onChangeText={handleCityInputChange}
              placeholder="Type your city"
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
          </View>
          <View>
            <Text style={Globalstyles.title}>About Me</Text>
            <TextInput
              style={[Globalstyles.textInput, !isEditing && styles.readOnly]}
              multiline={true}
              numberOfLines={6}
              value={biodata.aboutMe}
              editable={isEditing}
              onChangeText={(text) => setBiodata({ ...biodata, aboutMe: text })}
              placeholder="Write about yourself..."
              placeholderTextColor="gray"
              textAlignVertical="top"
            />
          </View>

          <View>
            <Text style={Globalstyles.title}>Mobile no.</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.mobileNo}
              onChangeText={(text) => setBiodata({ ...biodata, mobileNo: text })}
              keyboardType="phone-pad"
              maxLength={10}
              editable={isEditing}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Profile created by</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={ProfileCreatedData}
              labelField="label"
              valueField="value"
              value={biodata.profileCreatedBy}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, profileCreatedBy: item.value })}
              placeholder="Select Person"
              disabled={!isEditing}
            />
          </View>
          <Text style={styles.headText}>Family details </Text>
          <View>
            <Text style={Globalstyles.title}>Father Full Name</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.fatherName}
              onChangeText={(text) => setBiodata({ ...biodata, fatherName: text })}
              editable={isEditing}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Mother Full Name</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.motherName}
              onChangeText={(text) => setBiodata({ ...biodata, motherName: text })}
              editable={isEditing}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Father Occupation</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={OccupationData}
              labelField="label"
              valueField="value"
              value={biodata.fatherOccupation}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, fatherOccupation: item.value })}
              placeholder="Select Occupation"
              disabled={!isEditing}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Father Income (Annually)</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={Income}
              labelField="label"
              valueField="value"
              value={biodata.fatherIncomeAnnually}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, fatherIncomeAnnually: item.value })}
              placeholder="Select Income"
              disabled={!isEditing}
            />

          </View>
          <View>
            <Text style={Globalstyles.title}>Mother Occupation (If any)</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={OccupationData}
              labelField="label"
              valueField="value"
              value={biodata.motherOccupation}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, motherOccupation: item.value })}
              placeholder="Select Occupation"
              disabled={!isEditing}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Mother Income (Annually)</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={Income}
              labelField="label"
              valueField="value"
              value={biodata.motherIncomeAnnually}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, motherIncomeAnnually: item.value })}
              placeholder="Select Income"
              disabled={!isEditing}
            />
          </View>

          <View>
            <Text style={Globalstyles.title}>Family Type</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={FamilyType}
              labelField="label"
              valueField="value"
              value={biodata.familyType}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, familyType: item.value })}
              placeholder="Select Type"
              disabled={!isEditing}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Siblings</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={siblings}
              labelField="label"
              valueField="value"
              value={biodata.siblings}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, siblings: item.value })}
              placeholder="Select Type"
              disabled={!isEditing}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Any family member info. (optinal)</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.otherFamilyMemberInfo}
              onChangeText={(text) => setBiodata({ ...biodata, otherFamilyMemberInfo: text })}
              multiline={true}
              numberOfLines={6}
              editable={isEditing}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Contact No. 1</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.fatherMobileNo}
              onChangeText={(text) => setBiodata({ ...biodata, fatherMobileNo: text })}
              keyboardType="phone-pad"
              maxLength={10}
              editable={isEditing}
            />
          </View>

          <View>
            <Text style={Globalstyles.title}>Contact No. 2</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.motherMobileNo}
              onChangeText={(text) => setBiodata({ ...biodata, motherMobileNo: text })}
              keyboardType="phone-pad"
              maxLength={10}
              editable={isEditing}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}> Address</Text>
            <TextInput
              style={Globalstyles.input}
              value={stateInput}
              onChangeText={handleStateInputChange}
              placeholder="Type your state"
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
          </View>
          <View>
            <Text style={Globalstyles.title}>City/Village</Text>
            <TextInput
              style={Globalstyles.input}
              value={cityInput}
              onChangeText={handleCityInputChange}
              placeholder="Type your city"
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
          </View>
          <Text style={styles.headText}>Other Personal Detail</Text>
          <View>
            <Text style={Globalstyles.title}>Do you know cooking</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={CookingStatus}
              labelField="label"
              valueField="value"
              value={biodata.knowCooking}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, knowCooking: item.value })}
              placeholder="Select Status"
              disabled={!isEditing}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}> Dietary Habits</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={DietHabit}
              labelField="label"
              valueField="value"
              value={biodata.partnerDietHabit}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, partnerDietHabit: item.value })}
              placeholder="Select Habit"
              disabled={!isEditing}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Smoking Habits</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={smokingStatusData}
              labelField="label"
              valueField="value"
              value={biodata.smokingHabit}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, smokingHabit: item.value })}
              placeholder="Select Status"
              disabled={!isEditing}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Drinking Habits</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={DrinkingHabit}
              labelField="label"
              valueField="value"
              value={biodata.drinkingHabit}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, drinkingHabit: item.value })}
              placeholder="Select Habit"
              disabled={!isEditing}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Tabacoo Habits</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={TobacooHabit}
              labelField="label"
              valueField="value"
              value={biodata.drinkingHabit}
              editable={isEditing}
              onChange={(item) => setBiodata({ ...biodata, drinkingHabit: item.value })}
              placeholder="Select Habit"
              disabled={!isEditing}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Your Hobbies</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.hobbies}
              onChangeText={(text) => setBiodata({ ...biodata, hobbies: text })}
              multiline={true}
              numberOfLines={6}
              editable={isEditing}
            />
          </View>
          <Text style={Globalstyles.title}>Upload Your One Closeup Image</Text>
          <View style={Globalstyles.input1}>
            <TextInput
              style={{ color: "#000" }}
              value={getFileName(images.closeupImage?.uri)}
              placeholder="Select an image"
              editable={false}
            />
            <TouchableOpacity onPress={() => pickImage("closeupImage")}>
              <MaterialIcons name="attach-file" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={Globalstyles.title}>Upload Your One Full Image</Text>
          <View style={Globalstyles.input1}>
            <TextInput
              style={styles.textInput}
              value={getFileName(images.fullImage?.uri)}
              placeholder="Select an image"
              editable={false}
            />
            <TouchableOpacity onPress={() => pickImage("fullImage")}>
              <MaterialIcons name="attach-file" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={Globalstyles.title}>Upload Your One Best Image</Text>
          <View style={Globalstyles.input1}>
            <TextInput
              style={styles.textInput}
              value={getFileName(images.bestImage?.uri)}
              placeholder="Select an image"
              editable={false}
            />
            <TouchableOpacity onPress={() => pickImage("bestImage")}>
              <MaterialIcons name="attach-file" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetailedProfile
