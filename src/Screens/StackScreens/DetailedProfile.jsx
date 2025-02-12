
import { Text, View, Image, ImageBackground, TextInput, ScrollView, SafeAreaView, StatusBar, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../utils/Colors';
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
import {
  OccupationData, QualificationData, maritalStatusData, ManglikStatusData, LivingData, ProfileCreatedData, CityData, Income,
  FamilyType, CookingStatus, DietHabit, smokingStatusData, DrinkingHabit, StateData, TobacooHabit, subCasteOptions,
  MyDisabilities, MyComplexionData
} from '../../DummyData/DropdownData';

const DetailedProfile = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const profileData = useSelector((state) => state.profile);
  const [isLoading, setIsLoading] = useState(false);
  console.log("profileData", profileData);
  const MyprofileData = useSelector((state) => state.getBiodata);
  const myBiodata = MyprofileData?.Biodata?.personalDetails;
  console.log("myBiodata", myBiodata);
  const formattedDate = moment(profileData.dob).format("DD/MM/YYYY");

  const [biodata, setBiodata] = useState({
    subCaste: ' ',
    fullname: ' ',
    dob: ' ',
    placeofbirth: ' ',
    maritalStatus: ' ',
    disabilities: ' ',
    heightFeet: ' ',
    weight: ' ',
    timeOfBirth: ' ',
    complexion: ' ',
    manglikStatus: ' ',
    nadi: ' ',
    gotraSelf: ' ',
    gotraMother: ' ',
    qualification: ' ',
    occupation: ' ',
    annualIncome: ' ',
    livingStatus: ' ',
    currentCity: ' ',
    aboutMe: ' ',
    mobileNo: ' ',
    profileCreatedBy: ' ',
    fatherName: ' ',
    fatherOccupation: ' ',
    motherName: ' ',
    motherOccupation: ' ',
    fatherIncomeAnnually: ' ',
    motherIncomeAnnually: ' ',
    familyType: ' ',
    siblings: ' ',
    otherFamilyMemberInfo: ' ',
    contactNumber1: ' ',
    contactNumber2: ' ',
    state: ' ',
    cityOrVillage: ' ',
    knowCooking: ' ',
    dietaryHabit: ' ',
    smokingHabit: ' ',
    drinkingHabit: ' ',
    tobaccoHabits: ' ',
    hobbies: ' ',
    closeUpPhoto: ' ',
    fullPhoto: ' ',
    bestPhoto: ' ',
  });

  useEffect(() => {
    if (myBiodata) {
      setBiodata((prev) => ({
        ...prev,
        ...myBiodata,
      }));
    }
  }, [myBiodata]);

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
  const [selectedSubCaste, setSelectedSubCaste] = useState("");

  const [imageNames, setImageNames] = useState({
    closeupImageName: "Upload One Closeup Image",
    fullImageName: "Upload One Full Image",
    bestImageName: "Upload One Best Image",
  });

  // const handleSave = () => {
  //   navigation.navigate("MainPartnerPrefrence")
  // };

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

  const handleImageSelection = (field) => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      mediaType: "photo",
      includeBase64: true,  // Ensure base64 data
    })
      .then(image => {
        if (!image || !image.data) {
          console.error(`No image selected for ${field}`);
          return;
        }

        const base64Image = `data:${image.mime};base64,${image.data}`;

        setBiodata(prevState => ({
          ...prevState,
          [field]: base64Image, // Store as base64
        }));

        setImageNames(prevNames => ({
          ...prevNames,
          [field]: image.path.split('/').pop(),  // Show image name
        }));
      })
      .catch(error => {
        console.error(`Error picking ${field}:`, error);
      });
  };



  useEffect(() => {
    if (myBiodata) {
      setBiodata((prev) => ({
        ...prev,
        ...myBiodata,
      }));
    }
  }, [myBiodata]);

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
      currentCity: item, // Save selected city
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
      const filtered = subCasteOptions.filter((item) =>
        item?.label?.toLowerCase().includes(text.toLowerCase())
      ).map(item => item.label);
      setFilteredSubCaste(filtered);
    } else {
      setFilteredSubCaste([]);
    }
    setBiodata(prevState => ({
      ...prevState,
      subCaste: text,
    }));
  };


  // Sub Caste input handler
  const handleSubCasteSelect = (item) => {
    setSubCasteInput(item);
    setSelectedSubCaste(item);
    setBiodata(prevState => ({
      ...prevState,
      subCaste: item, // Correct key
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


  const handleDateChange = (event, selectedDate) => {
    if (!selectedDate) return;

    setShowDatePicker(false);

    const formattedDate = selectedDate.toISOString().split("T")[0];

    setBiodata((prevState) => ({
      ...prevState,
      dob: formattedDate,
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
      "subCaste", "fullname", "dob", "placeofbirth", "maritalStatus",
      "disabilities", "heightFeet", "weight", "timeOfBirth", "complexion",
      "manglikStatus", "nadi", "gotraSelf", "gotraMother", "qualification",
      "occupation", "annualIncome", "livingStatus", "currentCity", "aboutMe",
      "mobileNo", "profileCreatedBy", "fatherName", "fatherOccupation",
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

      const apiCall = biodata?._id ? axios.put : axios.post;
      const endpoint = biodata?._id ? UPDATE_PERSONAL_DETAILS : CREATE_PERSONAL_DETAILS;

      const response = await apiCall(endpoint, payload, { headers });
      console.log("API Response:", response.data);

      if (response.status === 200 && response.data.status === "success") {
        Toast.show({
          type: "success",
          text1: biodata?._id ? "Profile Updated Successfully" : "Detailed Profile Created Successfully",
          text2: "Your changes have been saved!",
          position: "top",
        });

        setIsEditing(false);
        // ✅ Navigate to MainApp after update
        setTimeout(() => {
          navigation.navigate("MainApp");
        }, 1000);
      } else {
        throw new Error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error saving biodata:", error.response?.data || error.message);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || error.message || "Something went wrong",
        position: "top",
        visibilityTime: 1000,
        textStyle: { fontSize: 10, color: "red" },
      });
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


  if (isLoading) {
    return <View style={styles.loading}>
      <ActivityIndicator size={'large'} color={Colors.theme_color} />
    </View>;
  }

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
            <Text style={Globalstyles.title}>Personal Details</Text>
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <Text style={styles.detailText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <Text style={Globalstyles.title}>Sub-Caste <Entypo name={'star'} color={'red'} size={12} /></Text>
          <TextInput
            style={Globalstyles.input}
            value={myBiodata?.subCaste}
            onChangeText={handleSubCasteInputChange}
            placeholder="Type your sub caste"
            placeholderTextColor={Colors.gray}
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
            <Text style={Globalstyles.title}>Full Name <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata?.fullname}
              editable={isEditing}
              onChangeText={(text) => handleInputChange("fullname", text)}
              placeholder='Enter Your Full Name'
              placeholderTextColor={Colors.gray}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Date of Birth <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.dob ? formatDate(biodata.dob) : ""}
              editable={isEditing}
              onFocus={() => setShowDatePicker(true)}
              placeholder="Select your date of birth"
              placeholderTextColor={Colors.gray}
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
            <Text style={Globalstyles.title}>Time of Birth <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.timeOfBirth}
              editable={isEditing}
              onFocus={() => setShowTimePicker(true)} // Open time picker
              placeholder="HH:MM AM/PM"
              placeholderTextColor={Colors.gray}
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
              value={biodata.placeofbirth}
              editable={isEditing}
              onChangeText={(text) => handleInputChange("placeofbirth", text)}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Birth Place'
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Marital Status <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={maritalStatusData}
              labelField="label"
              valueField="value"
              value={biodata.maritalStatus}
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
              value={biodata.disabilities}
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
              value={biodata.heightFeet}
              editable={isEditing}
              onChange={(text) => handleInputChange("heightFeet", text.value)}
              placeholder="Height"
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Weight (in kg) <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={weightData}
              labelField="label"
              valueField="value"
              value={biodata.weight}
              editable={isEditing}
              onChange={(text) => handleInputChange("weight", text.value)}
              placeholder="Weight"
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Complexion <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={MyComplexionData}
              labelField="label"
              valueField="value"
              value={biodata.complexion}
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
              value={biodata.manglikStatus}
              editable={isEditing}
              onChange={(text) => handleInputChange("manglikStatus", text.value)}
              placeholder="Select status"
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Nadi (Optional)</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.nadi}
              editable={isEditing}
              onChangeText={(text) => handleInputChange("nadi", text)}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Nadi'
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Self Gotra   (Optional)</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.gotraSelf}
              editable={isEditing}
              onChangeText={(text) => handleInputChange("gotraSelf", text)}
              placeholderTextColor={Colors.gray}
              placeholder={'Enter Your Self Gotra'}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Mother Gotra   (Optional)</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.gotraMother}
              editable={isEditing}
              onChangeText={(text) => handleInputChange("gotraMother", text)}
              placeholderTextColor={Colors.gray}
              placeholder={'Enter Your Mother Gotra'}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Qualification <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={QualificationData}
              labelField="label"
              valueField="value"
              value={biodata.qualification}
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
              value={biodata.occupation}
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
              value={biodata.annualIncome}
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
              value={biodata.livingStatus}
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
            <Text style={Globalstyles.title}>About Me <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.textInput, !isEditing && styles.readOnly]}
              multiline={true}
              numberOfLines={6}
              value={biodata.aboutMe}
              editable={isEditing}
              onChangeText={(text) => handleInputChange("aboutMe", text)}
              placeholder="Write about yourself..."
              placeholderTextColor={Colors.gray}
              textAlignVertical="top"
            />
          </View>

          <View>
            <Text style={Globalstyles.title}>Mobile no. <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.mobileNo}
              onChangeText={(text) => handleInputChange("mobileNo", text)}
              keyboardType="phone-pad"
              maxLength={10}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Mobile no.'
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Profile created by <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={ProfileCreatedData}
              labelField="label"
              valueField="value"
              value={biodata.profileCreatedBy}
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
              value={biodata.fatherName}
              onChangeText={(text) => handleInputChange("fatherName", text)}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Father Name'
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Mother Full Name <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.motherName}
              onChangeText={(text) => handleInputChange("motherName", text)}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Mother Name'
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Father Occupation <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={OccupationData}
              labelField="label"
              valueField="value"
              value={biodata.fatherOccupation}
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
              value={biodata.fatherIncomeAnnually}
              editable={isEditing}
              onChange={(text) => handleInputChange("fatherIncomeAnnually", text.value)}
              placeholder="Select Income"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />

          </View>
          <View>
            <Text style={Globalstyles.title}>Mother Occupation (If any) <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={OccupationData}
              labelField="label"
              valueField="value"
              value={biodata.motherOccupation}
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
              value={biodata.motherIncomeAnnually}
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
              value={biodata.familyType}
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
              value={siblings.find((item) => item.value == biodata.siblings)?.value || null}
              editable={isEditing}
              onChange={(text) => handleInputChange("siblings", String(text.value))}
              placeholder="Select Type"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Any family member info. (optinal)</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.otherFamilyMemberInfo}
              onChangeText={(text) => handleInputChange("otherFamilyMemberInfo", text)}
              multiline={true}
              numberOfLines={6}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Family Info.'
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Contact No. 1 <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.contactNumber1}
              onChangeText={(text) => handleInputChange("contactNumber1", text)}
              keyboardType="phone-pad"
              maxLength={10}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Contact No. 1'
            />
          </View>

          <View>
            <Text style={Globalstyles.title}>Contact No. 2 <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.contactNumber2}
              onChangeText={(text) => handleInputChange("contactNumber2", text)}
              keyboardType="phone-pad"
              maxLength={10}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Contact No. 2'
            />
          </View>
          <View>
            <Text style={styles.headText}> Address</Text>

            <Text style={Globalstyles.title}>State <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={Globalstyles.input}
              value={biodata?.state}
              onChangeText={handleStateInputChange}
              placeholder="Type your State"
              placeholderTextColor={Colors.gray}
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
            <Text style={Globalstyles.title}>City/Village <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={Globalstyles.input}
              value={biodata?.cityOrVillage}
              onChangeText={handleCityOrVillageInputChange}
              placeholder="Type your city/village"
              placeholderTextColor={Colors.gray}
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
            <Text style={Globalstyles.title}>Do you know cooking <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={CookingStatus}
              labelField="label"
              valueField="value"
              value={biodata.knowCooking}
              editable={isEditing}
              onChange={(text) => handleInputChange("knowCooking", text.value)}
              placeholder="Select Status"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}> Dietary Habits <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={DietHabit}
              labelField="label"
              valueField="value"
              value={biodata.dietaryHabit}
              editable={isEditing}
              onChange={(text) => handleInputChange("dietaryHabit", text.value)}
              placeholder="Select Habit"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Smoking Habits <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={smokingStatusData}
              labelField="label"
              valueField="value"
              value={biodata.smokingHabit}
              editable={isEditing}
              onChange={(text) => handleInputChange("smokingHabit", text.value)}
              placeholder="Select Status"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Drinking Habits <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={DrinkingHabit}
              labelField="label"
              valueField="value"
              value={biodata.drinkingHabit}
              editable={isEditing}
              onChange={(text) => handleInputChange("drinkingHabit", text.value)}
              placeholder="Select Habit"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Tabacoo Habits <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={TobacooHabit}
              labelField="label"
              valueField="value"
              value={biodata.tobaccoHabits}
              editable={isEditing}
              onChange={(text) => handleInputChange("tobaccoHabits", text.value)}
              placeholder="Select Habit"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />

          </View>
          <View>
            <Text style={Globalstyles.title}>Your Hobbies <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              value={biodata.hobbies}
              onChangeText={(text) => handleInputChange("hobbies", text)}
              multiline={true}
              numberOfLines={6}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Hobbies'
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Upload Your One Closeup Image <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TouchableOpacity onPress={() => handleImageSelection('closeUpPhoto')} style={Globalstyles.input}>
              {biodata.closeUpPhoto ? (
                <Image
                  source={{ uri: biodata.closeUpPhoto }}
                  style={styles.selectedImage}
                />
              ) : (
                <Text style={styles.imagePlaceholder}>
                  {imageNames.closeUpPhoto ? imageNames.closeUpPhoto : "Upload One Closeup Image"}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View>
            <Text style={Globalstyles.title}>Upload Your One Full Image <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TouchableOpacity onPress={() => handleImageSelection('fullPhoto')} style={Globalstyles.input}>
              {biodata.fullPhoto ? (
                <Image
                  source={{ uri: biodata.fullPhoto }}
                  style={styles.selectedImage}
                />
              ) : (
                <Text style={styles.imagePlaceholder}>
                  {imageNames.fullPhoto || "Upload One Full Image"}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View>
            <Text style={Globalstyles.title}>Upload Your One Best Image <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TouchableOpacity onPress={() => handleImageSelection('bestPhoto')} style={Globalstyles.input}>
              {biodata.bestPhoto ? (
                <Image
                  source={{ uri: biodata.bestPhoto }}
                  style={styles.selectedImage}
                />
              ) : (
                <Text style={styles.imagePlaceholder}>
                  {imageNames.bestPhoto || "Upload One Best Image"}
                </Text>
              )}
            </TouchableOpacity>
          </View>


          {/* {isEditing && (
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          )} */}

          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetailedProfile
