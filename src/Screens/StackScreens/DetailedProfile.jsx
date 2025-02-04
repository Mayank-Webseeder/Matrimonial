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

import {
  OccupationData, QualificationData, maritalStatusData, ManglikStatusData, LivingData, ProfileCreatedData, CityData, Income,
  FamilyType, CookingStatus, DietHabit, smokingStatusData, DrinkingHabit, StateData, TobacooHabit, subCasteOptions,
  MyDisabilities, MyComplexionData
} from '../../DummyData/DropdownData';

const DetailedProfile = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(!myBiodata);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const MyprofileData = useSelector((state) => state.getBiodata);
  const myBiodata = MyprofileData?.Biodata?.personalDetails;
  const [errors, setErrors] = useState({});

  const [biodata, setBiodata] = useState({
    subCaste: myBiodata?.subCaste || "",
    fullname: myBiodata?.fullname || "",
    dob: myBiodata?.dob || "",
    placeofbirth: myBiodata?.placeofbirth || "",
    maritalStatus: myBiodata?.maritalStatus || "",
    disabilities: myBiodata?.disabilities || null,
    heightFeet: myBiodata?.heightFeet || 0,
    weight: myBiodata?.weight || 0,
    timeOfBirth: myBiodata?.timeOfBirth || "",
    complexion: myBiodata?.complexion || "",
    manglikStatus: myBiodata?.manglikStatus || "",
    nadi: myBiodata?.nadi || "",
    gotraSelf: myBiodata?.gotraSelf || "",
    gotraMother: myBiodata?.gotraMother || "",
    qualification: myBiodata?.qualification || "",
    occupation: myBiodata?.occupation || "",
    annualIncome: myBiodata?.annualIncome || 0,
    livingStatus: myBiodata?.livingStatus || "",
    currentCity: myBiodata?.currentCity || "",
    aboutMe: myBiodata?.aboutMe || "",
    mobileNo: myBiodata?.mobileNo || "",
    profileCreatedBy: myBiodata?.profileCreatedBy || "",
    fatherName: myBiodata?.fatherName || "",
    fatherOccupation: myBiodata?.fatherOccupation || "",
    motherName: myBiodata?.motherName || "",
    motherOccupation: myBiodata?.motherOccupation || "",
    fatherIncomeAnnually: myBiodata?.fatherIncomeAnnually || 0,
    motherIncomeAnnually: myBiodata?.motherIncomeAnnually || 0,
    familyType: myBiodata?.familyType || "",
    siblings: myBiodata?.siblings || "",
    otherFamilyMemberInfo: myBiodata?.otherFamilyMemberInfo || "",
    contactNumber1: myBiodata?.contactNumber1 || "",
    contactNumber2: myBiodata?.contactNumber2 || "",
    state: myBiodata?.state || "",
    cityOrVillage: myBiodata?.cityOrVillage || "",
    knowCooking: myBiodata?.knowCooking || false,
    dietaryHabit: myBiodata?.dietaryHabit || "",
    smokingHabit: myBiodata?.smokingHabit || "",
    drinkingHabit: myBiodata?.drinkingHabit || "",
    tobaccoHabits: myBiodata?.tobaccoHabits || "",
    hobbies: myBiodata?.hobbies || [],
    closeUpPhoto: myBiodata?.closeUpPhoto || null,
    fullPhoto: myBiodata?.fullPhoto || null,
    bestPhoto: myBiodata?.bestPhoto || null,
  });

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

  useEffect(() => {
    if (myBiodata) {
      setBiodata(myBiodata);
      setIsEditing(false);
    }
  }, [myBiodata]);


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

  const handleStateInputChange = (text) => {
    setStateInput(text);
    if (text) {
      const filtered = StateData.filter((item) =>
        item?.label?.toLowerCase().includes(text.toLowerCase())
      ).map(item => item.label);
      setFilteredStates(filtered);
    } else {
      setFilteredStates([]);
    }
    setBiodata(prevState => ({
      ...prevState,
      state: text,
    }));
  };
  const handleStateSelect = (item) => {
    setStateInput(item);
    setSelectedState(item);
    setBiodata(prevBiodata => ({
      ...prevBiodata,
      state: item, // Correct key
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
    setBiodata(prevBiodata => ({
      ...prevBiodata,
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
    const currentDate = selectedDate || biodata.dob;
    setShowDatePicker(false);
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

  const requiredFields = [
    'subCaste', 'fullname', 'dob', 'placeofbirth', 'maritalStatus',
    'disabilities', 'heightFeet', 'weight', 'timeOfBirth', 'complexion',
    'manglikStatus', 'qualification', 'occupation', 'annualIncome', 'livingStatus',
    'currentCity', 'aboutMe', 'mobileNo', 'profileCreatedBy', 'fatherName', 'fatherOccupation',
    'motherName', 'motherOccupation', 'fatherIncomeAnnually', 'motherIncomeAnnually',
    'familyType', 'siblings', 'contactNumber1', 'contactNumber2', 'state', 'cityOrVillage',
    'knowCooking', 'dietaryHabit', 'smokingHabit', 'drinkingHabit', 'tobaccoHabits', 'hobbies',
    'closeUpPhoto', 'fullPhoto', 'bestPhoto'
  ];

  const validateRequiredFields = (biodata) => {
    const newErrors = {};
    requiredFields.forEach(field => {
      if (!biodata[field] || biodata[field].trim() === '') {
        newErrors[field] = `${field} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const constructPayload = (biodata, originalBiodata, isNew = false) => {
    const keys = [
      'subCaste', 'fullname', 'dob', 'placeofbirth', 'maritalStatus',
      'disabilities', 'heightFeet', 'weight', 'timeOfBirth', 'complexion',
      'manglikStatus', 'nadi', 'gotraSelf', 'gotraMother', 'qualification',
      'occupation', 'annualIncome', 'livingStatus', 'currentCity', 'aboutMe',
      'mobileNo', 'profileCreatedBy', 'fatherName', 'fatherOccupation',
      'motherName', 'motherOccupation', 'fatherIncomeAnnually',
      'motherIncomeAnnually', 'familyType', 'siblings', 'otherFamilyMemberInfo',
      'contactNumber1', 'contactNumber2', 'state', 'cityOrVillage',
      'knowCooking', 'dietaryHabit', 'smokingHabit', 'drinkingHabit',
      'tobaccoHabits', 'hobbies', 'closeUpPhoto', 'fullPhoto', 'bestPhoto'
    ];

    const payload = {};
    keys.forEach((key) => {
      if (biodata[key] !== undefined && biodata[key] !== '' && biodata[key] !== originalBiodata[key]) {
        payload[key] = biodata[key];
      } else if (isNew) {
        payload[key] = '';
      }
    });

    return payload;
  };


  const handleSave = async () => {
    const isValid = validateRequiredFields(biodata);
    if (!isValid) return;

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const payload = biodata?._id
        ? constructPayload(biodata, myBiodata)
        : constructPayload(biodata, {}, true);

      if (Object.keys(payload).length === 0) {
        console.log("No changes detected, skipping API call.");
        return;
      }

      console.log("Final Payload", payload);

      const apiCall = biodata?._id ? axios.put : axios.post;
      const endpoint = biodata?._id ? UPDATE_PERSONAL_DETAILS : CREATE_PERSONAL_DETAILS;

      const response = await apiCall(endpoint, payload, { headers });
      console.log("Save response:", response.data);

      const message = response?.data?.data?.message;

      if (message.includes("successfully")) {
        Toast.show({
          type: "success",
          text1: message,
          text2: "Your details have been saved!",
          position: "top",
          visibilityTime: 5000,
          textStyle: { fontSize: 12, color: message.includes("created") ? "green" : "blue" },
        });
      }

      setIsEditing(false); // Save hone ke baad edit mode band ho jaye
      navigation.navigate("MainPartnerPrefrence");
    } catch (error) {
      console.error("Error saving biodata:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || error.message || "Something went wrong",
        position: "top",
        visibilityTime: 1000,
        textStyle: { fontSize: 12, color: "red" },
      });
    }
  };

  const handleInputChange = (field, value) => {
    setBiodata((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

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
            {!isEditing && (
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Text style={styles.detailText}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
          <View>
            {/* Sub-Caste Field */}
            <Text style={Globalstyles.title}>Sub-Caste</Text>
            <TextInput
              style={[Globalstyles.input, { borderColor: errors.subCaste ? 'red' : '#ccc' }]}
              value={biodata?.subCaste}
              onChangeText={handleSubCasteInputChange}
              placeholder="Enter your sub caste"
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
            {errors.subCaste && <Text style={{ color: 'red', fontSize: 12 }}>{errors.subCaste}</Text>}
          </View>

          <View>
            {/* Full Name Field */}
            <Text style={Globalstyles.title}>Full Name</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.fullname ? 'red' : '#ccc' }]}
              value={biodata?.fullname}
              editable={isEditing}
              onChangeText={(text) => handleInputChange("fullname", text)}
              placeholder="Enter Your Full Name"
              placeholderTextColor={Colors.gray}
            />
            {errors.fullname && <Text style={{ color: 'red', fontSize: 12 }}>{errors.fullname}</Text>}
          </View>

          <View>
            {/* Date of Birth Field */}
            <Text style={Globalstyles.title}>Date of Birth</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.dob ? 'red' : '#ccc' }]}
              value={biodata.dob ? formatDate(biodata.dob) : ""}
              editable={isEditing}
              onFocus={() => setShowDatePicker(true)}
              placeholder="Select your date of birth"
              placeholderTextColor={Colors.gray}
            />
            {errors.dob && <Text style={{ color: 'red', fontSize: 12 }}>{errors.dob}</Text>}

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
            {/* Time of Birth */}
            <Text style={Globalstyles.title}>Time of Birth</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.timeOfBirth ? 'red' : '#ccc' }]}
              value={biodata.timeOfBirth}
              editable={isEditing}
              onFocus={() => setShowTimePicker(true)}
              placeholder="HH:MM AM/PM"
              placeholderTextColor={Colors.gray}
            />
            {showTimePicker && (
              <DateTimePicker
                value={new Date()}
                mode="time"
                display="spinner"
                is24Hour={false}
                onChange={handleTimeChange}
              />
            )}
            {errors.timeOfBirth && <Text style={{ color: 'red', fontSize: 12 }}>{errors.timeOfBirth}</Text>}
          </View>

          <View>
            {/* Place of Birth */}
            <Text style={Globalstyles.title}>Place of Birth</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.placeofbirth ? 'red' : '#ccc' }]}
              value={biodata.placeofbirth}
              editable={isEditing}
              onChangeText={(text) => handleInputChange("placeofbirth", text)}
              placeholder="Enter Your Birth Place"
              placeholderTextColor={Colors.gray}
            />
            {errors.placeofbirth && <Text style={{ color: 'red', fontSize: 12 }}>{errors.placeofbirth}</Text>}
          </View>

          <View>
            {/* Marital Status */}
            <Text style={Globalstyles.title}>Marital Status</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.maritalStatus ? 'red' : '#ccc' }]}
              data={maritalStatusData}
              labelField="label"
              valueField="value"
              value={biodata.maritalStatus}
              editable={isEditing}
              onChange={(text) => handleInputChange("maritalStatus", text.value)}
              placeholder="Select marital status"
              placeholderStyle={{ color: '#E7E7E7' }}
            />
            {errors.maritalStatus && <Text style={{ color: 'red', fontSize: 12 }}>{errors.maritalStatus}</Text>}
          </View>

          <View>
            {/* Disabilities */}
            <Text style={Globalstyles.title}>Disabilities (physical, mental, etc.)</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.disabilities ? 'red' : '#ccc' }]}
              data={MyDisabilities}
              labelField="label"
              valueField="value"
              value={biodata.disabilities}
              editable={isEditing}
              onChange={(text) => handleInputChange("disabilities", text.value)}
              placeholder="Select disability"
              placeholderStyle={{ color: '#E7E7E7' }}
            />
            {errors.disabilities && <Text style={{ color: 'red', fontSize: 12 }}>{errors.disabilities}</Text>}
          </View>

          <View>
            <Text style={Globalstyles.title}>Height</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.heightFeet ? 'red' : '#ccc' }]}
              data={heightData}
              labelField="label"
              valueField="value"
              value={biodata.heightFeet}
              editable={isEditing}
              onChange={(text) => handleInputChange("heightFeet", text.value)}
              placeholder="Height"
              placeholderStyle={{ color: '#E7E7E7' }}
            />
            {errors.heightFeet && <Text style={{ color: 'red', fontSize: 12 }}>{errors.heightFeet}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Weight (in kg)</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.weight ? 'red' : '#ccc' }]}
              data={weightData}
              labelField="label"
              valueField="value"
              value={biodata.weight}
              editable={isEditing}
              onChange={(text) => handleInputChange("weight", text.value)}
              placeholder="Weight"
              placeholderStyle={{ color: '#E7E7E7' }}
            />
            {errors.weight && <Text style={{ color: 'red', fontSize: 12 }}>{errors.weight}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Complexion</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.complexion ? 'red' : '#ccc' }]}
              data={MyComplexionData}
              labelField="label"
              valueField="value"
              value={biodata.complexion}
              editable={isEditing}
              onChange={(text) => handleInputChange("complexion", text.value)}
              placeholder="Select Complexion"
              placeholderStyle={{ color: '#E7E7E7' }}
            />
            {errors.complexion && <Text style={{ color: 'red', fontSize: 12 }}>{errors.complexion}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Manglik Status</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
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
            <Text style={Globalstyles.title}>Qualification</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.qualification ? 'red' : '#ccc' }]}
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
            {errors.qualification && <Text style={{ color: 'red', fontSize: 12 }}>{errors.qualification}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Occupation</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.occupation ? 'red' : '#ccc' }]}
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
            {errors.occupation && <Text style={{ color: 'red', fontSize: 12 }}>{errors.occupation}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Income (Annually)</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.annualIncome ? 'red' : '#ccc' }]}
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
            {errors.annualIncome && <Text style={{ color: 'red', fontSize: 12 }}>{errors.annualIncome}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Are you living with Family</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.livingStatus ? 'red' : '#ccc' }]}
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
            {errors.annualIncome && <Text style={{ color: 'red', fontSize: 12 }}>{errors.livingStatus}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Which city do you currently live in?</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
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
            {errors.currentCity && <Text style={{ color: 'red', fontSize: 12 }}>{errors.currentCity}</Text>}
          </View>

          <View>
            <Text style={Globalstyles.title}>About Me</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
              multiline={true}
              numberOfLines={6}
              value={biodata.aboutMe}
              editable={isEditing}
              onChangeText={(text) => handleInputChange("aboutMe", text)}
              placeholder="Write about yourself..."
              placeholderTextColor={Colors.gray}
              textAlignVertical="top"
            />
            {errors.aboutMe && <Text style={{ color: 'red', fontSize: 12 }}>{errors.aboutMe}</Text>}
          </View>

          <View>
            <Text style={Globalstyles.title}>Mobile no.</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
              value={biodata.mobileNo}
              onChangeText={(text) => handleInputChange("mobileNo", text)}
              keyboardType="phone-pad"
              maxLength={10}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Mobile no.'
            />
          </View>
          {errors.mobileNo && <Text style={{ color: 'red', fontSize: 12 }}>{errors.mobileNo}</Text>}
          <View>
            <Text style={Globalstyles.title}>Profile created by</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
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
            {errors.profileCreatedBy && <Text style={{ color: 'red', fontSize: 12 }}>{errors.profileCreatedBy}</Text>}
          </View>
          <Text style={styles.headText}>Family details </Text>
          <View>
            <Text style={Globalstyles.title}>Father Full Name</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
              value={biodata.fatherName}
              onChangeText={(text) => handleInputChange("fatherName", text)}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Father Name'
            />
            {errors.fatherName && <Text style={{ color: 'red', fontSize: 12 }}>{errors.fatherName}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Mother Full Name</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
              value={biodata.motherName}
              onChangeText={(text) => handleInputChange("motherName", text)}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Mother Name'
            />
            {errors.motherName && <Text style={{ color: 'red', fontSize: 12 }}>{errors.motherName}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Father Occupation</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
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
            {errors.fatherOccupation && <Text style={{ color: 'red', fontSize: 12 }}>{errors.fatherOccupation}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Father Income (Annually)</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
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
            {errors.fatherIncomeAnnually && <Text style={{ color: 'red', fontSize: 12 }}>{errors.fatherIncomeAnnually}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Mother Occupation (If any)</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
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
            {errors.motherOccupation && <Text style={{ color: 'red', fontSize: 12 }}>{errors.motherOccupation}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Mother Income (Annually)</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
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
            {errors.motherIncomeAnnually && <Text style={{ color: 'red', fontSize: 12 }}>{errors.motherIncomeAnnually}</Text>}
          </View>

          <View>
            <Text style={Globalstyles.title}>Family Type</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
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
            {errors.familyType && <Text style={{ color: 'red', fontSize: 12 }}>{errors.familyType}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Siblings</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
              data={siblings}
              labelField="label"
              valueField="value"
              value={biodata?.siblings ? Number(biodata.siblings) : null}
              editable={isEditing}
              onChange={(text) => handleInputChange("siblings", text.value)}
              placeholder="Select Type"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
            />
            {errors.siblings && <Text style={{ color: 'red', fontSize: 12 }}>{errors.siblings}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Any family member info. (optinal)</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
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
            <Text style={Globalstyles.title}>Contact No. 1</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
              value={biodata.contactNumber1}
              onChangeText={(text) => handleInputChange("contactNumber1", text)}
              keyboardType="phone-pad"
              maxLength={10}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Contact No. 1'
            />
            {errors.contactNumber1 && <Text style={{ color: 'red', fontSize: 12 }}>{errors.contactNumber1}</Text>}
          </View>

          <View>
            <Text style={Globalstyles.title}>Contact No. 2</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
              value={biodata.contactNumber2}
              onChangeText={(text) => handleInputChange("contactNumber2", text)}
              keyboardType="phone-pad"
              maxLength={10}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Contact No. 2'
            />
            {errors.contactNumber2 && <Text style={{ color: 'red', fontSize: 12 }}>{errors.contactNumber2}</Text>}
          </View>
          <View>
            <Text style={styles.headText}> Address</Text>

            <Text style={Globalstyles.title}>State</Text>
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
            {errors.state && <Text style={{ color: 'red', fontSize: 12 }}>{errors.state}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>City/Village</Text>
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
            {errors.cityOrVillage && <Text style={{ color: 'red', fontSize: 12 }}>{errors.cityOrVillage}</Text>}
          </View>
          <Text style={styles.headText}>Other Personal Detail</Text>
          <View>
            <Text style={Globalstyles.title}>Do you know cooking</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
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
            {errors.knowCooking && <Text style={{ color: 'red', fontSize: 12 }}>{errors.knowCooking}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}> Dietary Habits</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
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
            {errors.dietaryHabit && <Text style={{ color: 'red', fontSize: 12 }}>{errors.dietaryHabit}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Smoking Habits</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
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
            {errors.smokingHabit && <Text style={{ color: 'red', fontSize: 12 }}>{errors.smokingHabit}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Drinking Habits</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
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
            {errors.drinkingHabit && <Text style={{ color: 'red', fontSize: 12 }}>{errors.drinkingHabit}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Tabacoo Habits</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
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
            {errors.tobaccoHabits && <Text style={{ color: 'red', fontSize: 12 }}>{errors.tobaccoHabits}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Your Hobbies</Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly, { borderColor: errors.currentCity ? 'red' : '#ccc' }]}
              value={biodata.hobbies}
              onChangeText={(text) => handleInputChange("hobbies", text)}
              multiline={true}
              numberOfLines={6}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Hobbies'
            />
            {errors.hobbies && <Text style={{ color: 'red', fontSize: 12 }}>{errors.hobbies}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Upload Your One Closeup Image</Text>
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
            {errors.closeUpPhoto && <Text style={{ color: 'red', fontSize: 12 }}>{errors.closeUpPhoto}</Text>}
          </View>

          <View>
            <Text style={Globalstyles.title}>Upload Your One Full Image</Text>
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
            {errors.fullPhoto && <Text style={{ color: 'red', fontSize: 12 }}>{errors.fullPhoto}</Text>}
          </View>

          <View>
            <Text style={Globalstyles.title}>Upload Your One Best Image</Text>
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
            {errors.bestPhoto && <Text style={{ color: 'red', fontSize: 12 }}>{errors.bestPhoto}</Text>}
          </View>

          {isEditing && (
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>{biodata?._id ? "Save" : "Continue"}</Text>
            </TouchableOpacity>
          )}

          {/* <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  )
}

export default DetailedProfile
