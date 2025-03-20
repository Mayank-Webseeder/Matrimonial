
import { Text, View, Image, ImageBackground, TextInput, ScrollView, SafeAreaView, StatusBar, ActivityIndicator, FlatList, ToastAndroid } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import styles from '../StyleScreens/ProfileStyle';
import { TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CREATE_PERSONAL_DETAILS, UPDATE_PERSONAL_DETAILS } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import moment from "moment";
import Globalstyles from '../../utils/GlobalCss';
import ImageCropPicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SW } from '../../utils/Dimensions';
import { useFocusEffect } from '@react-navigation/native';
import {
  OccupationData, QualificationData, maritalStatusData, ManglikStatusData, LivingData, ProfileCreatedData, CityData, Income,
  FamilyType, CookingStatus, DietHabit, smokingStatusData, DrinkingHabit, StateData, TobacooHabit, subCasteOptions,
  MyDisabilities, MyComplexionData,
  MotherOccupationData,
  genderData
} from '../../DummyData/DropdownData';

const DetailedProfile = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const profileData = useSelector((state) => state.profile);
  const [isLoading, setIsLoading] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [stateInput, setStateInput] = useState("");
  const [subCasteInput, setSubCasteInput] = useState("");
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredSubCaste, setFilteredSubCaste] = useState([]);
  const [cityInput, setCityInput] = useState("");
  const [cityOrVillageInput, setCityOrVillageInput] = useState("");
  const [filteredCitiesOrVillages, setFilteredCitiesOrVillages] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  console.log("profileData", profileData);
  const MyprofileData = useSelector((state) => state.getBiodata);
  const myBiodata = MyprofileData?.Biodata?.personalDetails;
  console.log("myBiodata", myBiodata);
  const formattedDate = moment(profileData.dob).format("DD/MM/YYYY");

  const [biodata, setBiodata] = useState({
    subCaste: '',
    gender: '',
    fullname: '',
    dob:'',
    placeofbirth: '',
    maritalStatus: '',
    disabilities: '',
    heightFeet: '',
    weight: '',
    timeOfBirth: '',
    complexion: '',
    manglikStatus: '',
    nadi: '',
    gotraSelf: '',
    gotraMother: '',
    qualification: '',
    occupation: '',
    annualIncome: '',
    livingStatus: '',
    currentCity: '',
    aboutMe: '',
    profileCreatedBy: '',
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    fatherIncomeAnnually: '',
    motherIncomeAnnually: '',
    familyType: '',
    siblings: '',
    otherFamilyMemberInfo: '',
    contactNumber1: '',
    contactNumber2: '',
    state: '',
    cityOrVillage: '',
    knowCooking: '',
    dietaryHabit: '',
    smokingHabit: '',
    drinkingHabit: '',
    tobaccoHabits: '',
    hobbies: '',
    closeUpPhoto: '',
    fullPhoto: '',
    bestPhoto: '',
  });

  const [imageNames, setImageNames] = useState({
    closeupImageName: "Upload One Closeup Image",
    fullImageName: "Upload One Full Image",
    bestImageName: "Upload One Best Image",
  });

  useEffect(() => {
    if (myBiodata) {
      setBiodata((prev) => ({
        ...prev,
        ...myBiodata,
      }));
    }
  }, [myBiodata]);

  const handleTimeChange = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) {
      const formattedTime = moment(selectedDate).format("hh:mm A");
      setBiodata((prevState) => ({
        ...prevState,
        timeOfBirth: formattedTime,
      }));
    }
  };

  const handleImageSelection = (field) => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
      mediaType: "photo",
      compressImageQuality: 1
    })
      .then(image => {
        if (!image || !image.data) {
          console.error(`No image selected for ${field}`);
          return;
        }

        const base64Image = `data:${image.mime};base64,${image.data}`;

        setBiodata(prevState => ({
          ...prevState,
          [field]: base64Image,
        }));

        setImageNames(prevNames => ({
          ...prevNames,
          [field]: image.path.split('/').pop(),
        }));
      })
      .catch(error => {
        console.error(`Error picking ${field}:`, error);
      });
  };

  const handleStateInputChange = (text) => {
    setStateInput(text); // Input field ko update karein

    if (text) {
      const filtered = StateData.filter((item) =>
        item?.label?.toLowerCase().includes(text.toLowerCase())
      ).map(item => item.label);
      setFilteredStates(filtered);
    } else {
      setFilteredStates([]);
    }

    // User jo bhi likhega, vo biodata me save hoga
    setBiodata(prevState => ({
      ...prevState,
      state: text,
    }));
  };

  const handleStateSelect = (item) => {
    setStateInput(item);
    setSelectedState(item);
    setBiodata((prevBiodata) => ({
      ...prevBiodata,
      state: item,
    }));
    setFilteredStates([]);
  };

  const handleCityInputChange = (text) => {
    setCityInput(text);
    if (text) {
      const filtered = CityData.filter((item) =>
        item?.label?.toLowerCase().includes(text.toLowerCase())
      ).map(item => item.label);
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }

    setBiodata(prevState => ({
      ...prevState,
      currentCity: text, // Save in biodata
    }));
  };

  const handleCitySelect = (item) => {
    setCityInput(item);
    setBiodata(prevState => ({
      ...prevState,
      currentCity: item,
    }));
    setFilteredCities([]);
  };

  const handleCityOrVillageInputChange = (text) => {
    setCityOrVillageInput(text);
    if (text) {
      const filtered = CityData.filter((item) =>
        item?.label?.toLowerCase().includes(text.toLowerCase())
      ).map(item => item.label);
      setFilteredCitiesOrVillages(filtered);
    } else {
      setFilteredCitiesOrVillages([]);
    }

    setBiodata(prevState => ({
      ...prevState,
      cityOrVillage: text,
    }));
  };

  const handleCityOrVillageSelect = (item) => {
    setCityOrVillageInput(item);
    setBiodata(prevState => ({
      ...prevState,
      cityOrVillage: item,
    }));
    setFilteredCitiesOrVillages([]);
  };

  const handleSubCasteInputChange = (text) => {
    setSubCasteInput(text);

    if (text) {
      const filtered = subCasteOptions
        .filter((item) => item?.label?.toLowerCase().includes(text.toLowerCase()))
        .map((item) => item.label);

      setFilteredSubCaste(filtered);
    } else {
      setFilteredSubCaste([]);
    }
    setBiodata((prevState) => ({
      ...prevState,
      subCaste: text,
    }));
  };

  const handleSubCasteSelect = (selectedItem) => {
    setSubCasteInput(selectedItem);
    setFilteredSubCaste([]);

    setBiodata((prevState) => ({
      ...prevState,
      subCaste: selectedItem,
    }));
  };

  const heightData = Array.from({ length: 4 }, (_, feetIndex) =>
    Array.from({ length: 12 }, (_, inchesIndex) => ({
      label: `${4 + feetIndex} ' ${inchesIndex} '' `,
      value: `${4 + feetIndex} '-${inchesIndex} '' `,
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


  const handleDateChange = (event, selectedDate) => {
    if (!selectedDate) return;

    setShowDatePicker(false);

    setBiodata((prevState) => ({
      ...prevState,
      dob: selectedDate,
    }));
  };

  const formatDate = (date) => {
    if (!date) return "";

    const validDate = new Date(date);
    if (isNaN(validDate)) {
      return "";
    }

    const day = validDate.getDate().toString().padStart(2, "0");
    const month = (validDate.getMonth() + 1).toString().padStart(2, "0");
    const year = validDate.getFullYear();

    return `${day}/${month}/${year}`; // UI में "DD/MM/YYYY" दिखेगा
  };

  const convertToBase64 = async (imageUri) => {
    try {
      if (!imageUri || imageUri.startsWith("data:image")) {
        return imageUri.split(",")[1]; // ✅ Extract only Base64 part
      }

      const response = await fetch(imageUri);
      const blob = await response.blob();

      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1]; // ✅ Extract only Base64 data
          resolve(base64String);
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting image to Base64:", error);
      return imageUri; // ✅ Return original URI if error
    }
  };

  const constructPayload = async (biodata, isNew = false) => {
    const keys = [
      "subCaste", "gender", "fullname", "dob", "placeofbirth", "maritalStatus",
      "disabilities", "heightFeet", "weight", "timeOfBirth", "complexion",
      "manglikStatus", "nadi", "gotraSelf", "gotraMother", "qualification",
      "occupation", "annualIncome", "livingStatus", "currentCity", "aboutMe",
      "profileCreatedBy", "fatherName", "fatherOccupation",
      "motherName", "motherOccupation", "fatherIncomeAnnually",
      "motherIncomeAnnually", "familyType", "siblings", "otherFamilyMemberInfo",
      "contactNumber1", "contactNumber2", "state", "cityOrVillage",
      "knowCooking", "dietaryHabit", "smokingHabit", "drinkingHabit",
      "tobaccoHabits", "hobbies", "closeUpPhoto", "fullPhoto", "bestPhoto"
    ];

    const payload = {};
    for (const key of keys) {
      if (biodata[key] !== undefined && biodata[key] !== "") {
        payload[key] = biodata[key];
      } else if (isNew) {
        payload[key] = "";
      }
    }

    try {
      // ✅ Ensure Base64 conversion only if needed
      payload.closeUpPhoto = biodata.closeUpPhoto.startsWith("data:image")
        ? biodata.closeUpPhoto
        : await convertToBase64(biodata.closeUpPhoto);

      payload.fullPhoto = biodata.fullPhoto.startsWith("data:image")
        ? biodata.fullPhoto
        : await convertToBase64(biodata.fullPhoto);

      payload.bestPhoto = biodata.bestPhoto.startsWith("data:image")
        ? biodata.bestPhoto
        : await convertToBase64(biodata.bestPhoto);
    } catch (error) {
      console.error("Base64 Conversion Error:", error);
    }

    return payload;
  };

  const handleSave = async () => {
    try {
        setIsLoading(true);
        const token = await AsyncStorage.getItem("userToken");
        if (!token) throw new Error("No token found");

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        };

        const payload = await constructPayload(biodata, !biodata?._id);
        console.log("Payload:", payload);

        const isUpdating = Boolean(biodata?._id);
        const apiCall = isUpdating ? axios.put : axios.post;
        const endpoint = isUpdating ? UPDATE_PERSONAL_DETAILS : CREATE_PERSONAL_DETAILS;

        console.log(`🔹 Calling API: ${endpoint}`);

        const response = await apiCall(endpoint, payload, { headers });

        console.log("✅ API Response:", response.data);

        if (response.data?.status?.toLowerCase() === "success") {
            const successMessage = isUpdating 
                ? "Profile Updated Successfully!" 
                : "Detailed Profile Created Successfully!";
            
            ToastAndroid.show(successMessage, ToastAndroid.SHORT);

            setIsEditing(false);

            setTimeout(() => {
                if (isUpdating) {
                    navigation.navigate("MainApp");
                } else {
                    navigation.navigate("MainPartnerPrefrence");
                }
            }, 1000);

            return;
        }

        throw new Error(response.data.message || "Something went wrong");

    } catch (error) {
        console.error("🚨 API Error:", error.response?.data || error.message);

        if (!error.message.toLowerCase().includes("success")) {
            ToastAndroid.show(
                error.response?.data?.message || "Something went wrong!", 
                ToastAndroid.SHORT
            );
        }
    } finally {
        setIsLoading(false);
    }
};





  const handleInputChange = (field, value) => {
    setBiodata((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


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

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

        <View style={Globalstyles.form}>
          <View style={styles.detail}>
            <Text style={styles.Formtitle}>Personal Details</Text>
          </View>
          <Text style={Globalstyles.title}>Sub-Caste <Entypo name={'star'} color={'red'} size={12} /></Text>
          <TextInput
            style={Globalstyles.input}
            value={biodata?.subCaste} // `myBiodata?.subCaste` ki jagah `subCasteInput` use karein
            onChangeText={handleSubCasteInputChange}
            placeholder="Type your sub caste"
            placeholderTextColor={Colors.gray}
          s
          />

          {/* Agar user type karega toh list dikhegi */}
          {filteredSubCaste.length > 0 ? (
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
            <Text style={Globalstyles.title}>Gender <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={genderData}
              labelField="label"
              valueField="value"
              value={MyprofileData?.Biodata?.gender}
              editable={isEditing}
              onChange={(text) => handleInputChange("gender", text.value)}
              placeholder='Enter Gender For Create Biodata'
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>

          <View>
            <Text style={Globalstyles.title}>Full Name <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata?.fullname}
              editable={isEditing}
              onChangeText={(text) => handleInputChange("fullname", text)}
              placeholder='Enter Your Full Name'
              placeholderTextColor={Colors.gray}
              autoComplete="off"
              textContentType="none"

            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Date of Birth <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata?.dob ? formatDate(biodata.dob) : ""}
              editable={isEditing}
              onFocus={() => setShowDatePicker(true)}
              placeholder="Select your date of birth"
              placeholderTextColor={Colors.gray}
              autoComplete="off"
              textContentType="none"

            />


            {showDatePicker && (
              <DateTimePicker
                value={biodata.dob ? new Date(biodata.dob) : new Date()} // Ensure it's a Date object
                mode="date"
                display="default"
                onChange={(event, selectedDate) => handleDateChange(event, selectedDate)}
              />
            )}
          </View>
          <View>
            <Text style={Globalstyles.title}>Time of Birth <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata?.timeOfBirth}
              editable={isEditing}
              onFocus={() => setShowTimePicker(true)} // Open time picker
              placeholder="HH:MM AM/PM"
              placeholderTextColor={Colors.gray}
              autoComplete="off"
              textContentType="none"

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
            <Text style={Globalstyles.title}>Place of Birth <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata?.placeofbirth}
              editable={isEditing}
              onChangeText={(text) => handleInputChange("placeofbirth", text)}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Birth Place'
              autoComplete="off"
              textContentType="none"

            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Marital Status <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={maritalStatusData}
              labelField="label"
              valueField="value"
              value={biodata?.maritalStatus}
              editable={isEditing}
              onChange={(text) => handleInputChange("maritalStatus", text.value)}
              placeholder="Select marital status"
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>
              Disabilities (physical, mental, etc.) <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={MyDisabilities}
              labelField="label"
              valueField="value"
              value={biodata?.disabilities}
              editable={isEditing}
              onChange={(text) => handleInputChange("disabilities", text.value)}
              placeholder="Select disability"
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Height <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={heightData}
              labelField="label"
              valueField="value"
              value={biodata?.heightFeet}
              editable={isEditing}
              onChange={(text) => handleInputChange("heightFeet", text.value)}
              placeholder="Height"
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Weight (in kg) </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={weightData}
              labelField="label"
              valueField="value"
              value={biodata?.weight}
              editable={isEditing}
              onChange={(text) => handleInputChange("weight", text.value)}
              placeholder="Weight"
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Complexion</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={MyComplexionData}
              labelField="label"
              valueField="value"
              value={biodata?.complexion}
              editable={isEditing}
              onChange={(text) => handleInputChange("complexion", text.value)}
              placeholder="Select Complexion"
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Manglik Status <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={ManglikStatusData}
              labelField="label"
              valueField="value"
              value={biodata?.manglikStatus}
              editable={isEditing}
              onChange={(text) => handleInputChange("manglikStatus", text.value)}
              placeholder="Select status"
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Nadi</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata?.nadi}
              editable={isEditing}
              onChangeText={(text) => handleInputChange("nadi", text)}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Nadi'
              autoComplete="off"
              textContentType="none"

            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Self Gotra</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata?.gotraSelf}
              editable={isEditing}
              onChangeText={(text) => handleInputChange("gotraSelf", text)}
              placeholderTextColor={Colors.gray}
              placeholder={'Enter Your Self Gotra'}
              autoComplete="off"
              textContentType="none"

            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Mother Gotra</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata?.gotraMother}
              editable={isEditing}
              onChangeText={(text) => handleInputChange("gotraMother", text)}
              placeholderTextColor={Colors.gray}
              placeholder={'Enter Your Mother Gotra'}
              autoComplete="off"
              textContentType="none"

            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Qualification <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={QualificationData}
              labelField="label"
              valueField="value"
              value={biodata?.qualification}
              editable={isEditing}
              onChange={(text) => handleInputChange("qualification", text.value)}
              placeholder="Select Qualification"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Occupation <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={OccupationData}
              labelField="label"
              valueField="value"
              value={biodata?.occupation}
              editable={isEditing}
              onChange={(text) => handleInputChange("occupation", text.value)}
              placeholder="Select occupation"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Income (Annually) <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={Income}
              labelField="label"
              valueField="value"
              value={biodata?.annualIncome}
              editable={isEditing}
              onChange={(text) => handleInputChange("annualIncome", text.value)}
              placeholder="Select Income"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />

          </View>
          <View>
            <Text style={Globalstyles.title}>Are you living with Family <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={LivingData}
              labelField="label"
              valueField="value"
              value={biodata?.livingStatus}
              editable={isEditing}
              onChange={(text) => handleInputChange("livingStatus", text.value)}
              placeholder="Select Status"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Which city do you currently live in? <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={Globalstyles.input}
              value={biodata?.currentCity}
              onChangeText={handleCityInputChange}
              placeholder="Enter your city"
              placeholderTextColor={Colors.gray}
              autoComplete="off"
              textContentType="none"

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
            <Text style={Globalstyles.title}>About Me </Text>
            <TextInput
              style={[Globalstyles.textInput, !isEditing && styles.readOnly]}
              multiline={true}
              numberOfLines={6}
              value={biodata?.aboutMe}
              editable={isEditing}
              onChangeText={(text) => handleInputChange("aboutMe", text)}
              placeholder="Write about yourself..."
              placeholderTextColor={Colors.gray}
              textAlignVertical="top"
              autoComplete="off"
              textContentType="none"

            />
          </View>

          <View>
            <Text style={Globalstyles.title}>Profile created by <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={ProfileCreatedData}
              labelField="label"
              valueField="value"
              value={biodata?.profileCreatedBy}
              editable={isEditing}
              onChange={(text) => handleInputChange("profileCreatedBy", text.value)}
              placeholder="Select Person"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <Text style={styles.headText}>Family details </Text>
          <View>
            <Text style={Globalstyles.title}>Father Full Name <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata?.fatherName}
              onChangeText={(text) => handleInputChange("fatherName", text)}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Father Name'
              autoComplete="off"
              textContentType="none"

            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Mother Full Name <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata?.motherName}
              onChangeText={(text) => handleInputChange("motherName", text)}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Mother Name'
              autoComplete="off"
              textContentType="none"

            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Father Occupation <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={MotherOccupationData}
              labelField="label"
              valueField="value"
              value={biodata?.fatherOccupation}
              editable={isEditing}
              onChange={(text) => handleInputChange("fatherOccupation", text.value)}
              placeholder="Select Occupation"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Father Income (Annually) <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={Income}
              labelField="label"
              valueField="value"
              value={biodata?.fatherIncomeAnnually}
              editable={isEditing}
              onChange={(text) => handleInputChange("fatherIncomeAnnually", text.value)}
              placeholder="Select Income"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />

          </View>
          <View>
            <Text style={Globalstyles.title}>Mother Occupation <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={MotherOccupationData}
              labelField="label"
              valueField="value"
              value={biodata?.motherOccupation}
              editable={isEditing}
              onChange={(text) => handleInputChange("motherOccupation", text.value)}
              placeholder="Select Occupation"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Mother Income (Annually) <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={Income}
              labelField="label"
              valueField="value"
              value={biodata?.motherIncomeAnnually}
              editable={isEditing}
              onChange={(text) => handleInputChange("motherIncomeAnnually", text.value)}
              placeholder="Select Income"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>

          <View>
            <Text style={Globalstyles.title}>Family Type <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={FamilyType}
              labelField="label"
              valueField="value"
              value={biodata?.familyType}
              editable={isEditing}
              onChange={(text) => handleInputChange("familyType", text.value)}
              placeholder="Select Type"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Siblings <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={siblings}
              labelField="label"
              valueField="value"
              value={siblings.find((item) => item.value == biodata?.siblings)?.value || null}
              editable={isEditing}
              onChange={(text) => handleInputChange("siblings", String(text.value))}
              placeholder="Select Type"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Any family member info. </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata?.otherFamilyMemberInfo}
              onChangeText={(text) => handleInputChange("otherFamilyMemberInfo", text)}
              multiline={true}
              numberOfLines={6}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Family Info.'
              autoComplete="off"
              textContentType="none"

            />
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={Globalstyles.title}>Contact No. 1 </Text>
              <MaterialIcons name="call" color="#000" size={15} style={{ paddingVertical: SW(5) }} />
              <Entypo name="star" color="red" size={12} />
            </View>

            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata?.contactNumber1}
              onChangeText={(text) => handleInputChange("contactNumber1", text)}
              keyboardType="phone-pad"
              maxLength={10}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Contact No. 1'
              autoComplete="off"
              textContentType="none"

            />
          </View>

          <View>
            <Text style={Globalstyles.title}>Contact No. 2 <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata?.contactNumber2}
              onChangeText={(text) => handleInputChange("contactNumber2", text)}
              keyboardType="phone-pad"
              maxLength={10}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Contact No. 2'
              autoComplete="off"
              textContentType="none"
            />
          </View>
          <View>
            <Text style={styles.headText}> Address</Text>

            <Text style={Globalstyles.title}>State <Entypo name={'star'} color={'red'} size={12} /></Text>
            <TextInput
              style={Globalstyles.input}
              value={biodata?.state} // `biodata?.state` ki jagah `stateInput` use karein
              onChangeText={handleStateInputChange}
              placeholder="Type your State"
              placeholderTextColor={Colors.gray}
              autoComplete="off"
              textContentType="none"
            />

            {filteredStates.length > 0 ? (
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
            <Text style={Globalstyles.title}>City/Village <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={Globalstyles.input}
              value={biodata?.cityOrVillage}
              onChangeText={handleCityOrVillageInputChange}
              placeholder="Type your city/village"
              placeholderTextColor={Colors.gray}
              autoComplete="off"
              textContentType="none"

            />
            {filteredCitiesOrVillages.length > 0 && cityOrVillageInput ? (
              <FlatList
                data={filteredCitiesOrVillages.slice(0, 5)}
                scrollEnabled={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleCityOrVillageSelect(item)}>
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
              value={biodata?.knowCooking}
              editable={isEditing}
              onChange={(text) => handleInputChange("knowCooking", text.value)}
              placeholder="Select Status"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}> Dietary Habits  </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={DietHabit}
              labelField="label"
              valueField="value"
              value={biodata?.dietaryHabit}
              editable={isEditing}
              onChange={(text) => handleInputChange("dietaryHabit", text.value)}
              placeholder="Select Habit"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Smoking Habits  </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={smokingStatusData}
              labelField="label"
              valueField="value"
              value={biodata?.smokingHabit}
              editable={isEditing}
              onChange={(text) => handleInputChange("smokingHabit", text.value)}
              placeholder="Select Status"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Drinking Habits </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={DrinkingHabit}
              labelField="label"
              valueField="value"
              value={biodata?.drinkingHabit}
              editable={isEditing}
              onChange={(text) => handleInputChange("drinkingHabit", text.value)}
              placeholder="Select Habit"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Tabacoo Habits </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={TobacooHabit}
              labelField="label"
              valueField="value"
              value={biodata?.tobaccoHabits}
              editable={isEditing}
              onChange={(text) => handleInputChange("tobaccoHabits", text.value)}
              placeholder="Select Habit"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />

          </View>
          <View>
            <Text style={Globalstyles.title}>Your Hobbies  </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata?.hobbies}
              onChangeText={(text) => handleInputChange("hobbies", text)}
              multiline={true}
              numberOfLines={6}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Hobbies'
              autoComplete="off"
              textContentType="none"

            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Upload Your One Closeup Image <Entypo name={'star'} color={'red'} size={12} /> </Text>

            <View style={Globalstyles.input}>
              <TouchableOpacity onPress={() => handleImageSelection('closeUpPhoto')}>
                {biodata?.closeUpPhoto ? (
                  <Image
                    source={{ uri: biodata?.closeUpPhoto }}
                    style={styles.selectedImage}
                  />
                ) : (
                  <Text style={styles.imagePlaceholder}>Upload One Closeup Image</Text>
                )}
              </TouchableOpacity>
            </View>

          </View>

          <View>
            <Text style={Globalstyles.title}>Upload Your One Full Image</Text>

            <View style={Globalstyles.input}>
              <TouchableOpacity onPress={() => handleImageSelection('fullPhoto')}>
                {biodata?.fullPhoto ? (
                  <Image
                    source={{ uri: biodata?.fullPhoto }}
                    style={styles.selectedImage}
                  />
                ) : (
                  <Text style={styles.imagePlaceholder}>Upload One Full Image</Text>
                )}
              </TouchableOpacity>

            </View>
          </View>

          <View>
            <Text style={Globalstyles.title}>Upload Your One Best Image </Text>

            <View style={Globalstyles.input}>
              <TouchableOpacity onPress={() => handleImageSelection('bestPhoto')}>
                {biodata?.bestPhoto ? (
                  <Image
                    source={{ uri: biodata?.bestPhoto }}
                    style={styles.selectedImage}
                  />
                ) : (
                  <Text style={styles.imagePlaceholder}>Upload One Full Image</Text>
                )}
              </TouchableOpacity>
            </View>

          </View>

          {
            isLoading ? (
              <ActivityIndicator size="large" color={Colors.theme_color} />
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleSave} disabled={isLoading}>
                <Text style={styles.buttonText}>
                  {biodata?._id ? "Submit" : "Continue"}
                </Text>
              </TouchableOpacity>
            )
          }


        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetailedProfile
