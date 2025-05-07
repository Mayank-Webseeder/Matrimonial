import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/ActivistFormStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Globalstyles from '../../utils/GlobalCss';
import ImageCropPicker from 'react-native-image-crop-picker';
import { subCasteOptions, StateData, CityData } from '../../DummyData/DropdownData';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CREATE_ACTIVIST, UPDATE_ACTIVIST } from '../../utils/BaseUrl';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ActivistForm({ navigation }) {
  const [subCasteInput, setSubCasteInput] = useState('');
  const [stateInput, setStateInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredSubCaste, setFilteredSubCaste] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const MyActivistProfile = useSelector((state) => state.activist.activist_data);
  const [tempId, setTempId] = useState("");
  const [errors, setErrors] = useState({});
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [ActivistData, setActivistData] = useState({
    fullname: '',
    subCaste: '',
    dob: '',
    state: '',
    city: '',
    mobileNo: '',
    knownActivistIds: [],
    engagedWithCommittee: '',
    profilePhoto: '',
  });

  useEffect(() => {
    console.log("MyActivistProfile", MyActivistProfile);
    if (MyActivistProfile) {
      setActivistData((prev) => ({
        ...prev,
        ...MyActivistProfile,
        dob: MyActivistProfile.dob ? new Date(MyActivistProfile.dob) : "",
      }));
    }
  }, [MyActivistProfile]);


  const handleImagePick = async () => {
    try {
      const image = await ImageCropPicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        includeBase64: true,
        mediaType: "any",
        compressImageQuality: 1,
      });

      console.log("📷 Selected Image:", image);

      if (!image.data) {
        console.error("❌ Base64 data is missing!");
        return;
      }
      setActivistData((prev) => ({
        ...prev,
        profilePhoto: `data:${image.mime};base64,${image.data}`,
      }));

    } catch (error) {
      if (error.code !== "E_PICKER_CANCELLED") {
        console.error("❌ Image Picking Error:", error.message || error);
      }
    }
  };


  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Always close the picker

    if (event.type === "set" && selectedDate) {
      setActivistData((prevState) => ({
        ...prevState,
        dob: moment(selectedDate).format("YYYY-MM-DD"),
      }));
    }
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

    setActivistData(prevActivistData => ({
      ...prevActivistData,
      state: text,
    }));
  };

  const handleStateSelect = (item) => {
    setStateInput(item);
    setSelectedState(item);
    setActivistData((prevActivistData) => ({
      ...prevActivistData,
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

    setActivistData(prevActivistData => ({
      ...prevActivistData,
      city: text,
    }));
  };

  const handleCitySelect = (item) => {
    setCityInput(item);
    setActivistData(prevActivistData => ({
      ...prevActivistData,
      city: item,
    }));
    setFilteredCities([]);
  };

  const handleSubCasteInputChange = (text) => {
    // Set the input text
    setSubCasteInput(text);

    // Filter subCasteOptions based on the input
    const filtered = subCasteOptions
      .filter((item) => item?.label?.toLowerCase().includes(text.toLowerCase()))
      .map((item) => item.label);

    // If matches are found, update filtered options
    if (filtered.length > 0) {
      setFilteredSubCaste(filtered);
    } else {
      // If no matches, only show "Other"
      setFilteredSubCaste(['Other']);
    }

    // Update the activist data with the current input text
    setActivistData((prevActivistData) => ({
      ...prevActivistData,
      subCaste: text,
    }));
  };

  const handleSubCasteSelect = (selectedItem) => {
    const finalValue = selectedItem === 'Other' ? 'Other' : selectedItem;
    setSubCasteInput(finalValue);
    setFilteredSubCaste([]);
    setActivistData((prevActivistData) => ({
      ...prevActivistData,
      subCaste: finalValue,
    }));
  };


  const convertToBase64 = async (imageUri) => {
    try {
      if (!imageUri) return null;
      if (imageUri.startsWith("data:image")) {
        return imageUri;
      }

      const response = await fetch(imageUri);
      const blob = await response.blob();

      const mimeType = blob.type || "image/jpeg";

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            resolve(`data:${mimeType};base64,${reader.result.split(",")[1]}`);
          } else {
            reject("Error reading Base64 data.");
          }
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting image to Base64:", error);
      return null;
    }
  };

  const constructActivistPayload = async (ActivistData, isNew = false) => {
    const keys = [
      "fullname", "subCaste", "dob", "state", "city",
      "mobileNo", "knownActivistIds", "engagedWithCommittee", "profilePhoto",
    ];
  
    const payload = {};
    for (const key of keys) {
      if (ActivistData[key] !== undefined && ActivistData[key] !== "") {
        payload[key] = ActivistData[key];
      } else if (isNew) {
        payload[key] = "";
      }
    }
    if (payload.dob) {
      let parsedDate;
  
      if (moment(payload.dob, moment.ISO_8601, true).isValid()) {
        parsedDate = moment(payload.dob);
      } else if (moment(payload.dob, "DD/MM/YYYY", true).isValid()) {
        parsedDate = moment(payload.dob, "DD/MM/YYYY");
      }
  
      if (parsedDate && parsedDate.isValid()) {
        payload.dob = parsedDate.format("DD/MM/YYYY");
      } else {
        console.error("❌ Invalid DOB format received:", payload.dob);
        throw new Error("Invalid DOB format. Expected format is YYYY-MM-DD.");
      }
    }
  
    // Constructing knownActivistIds array with objects like { "activistId": "AA0002" }
    if (payload.knownActivistIds) {
      if (!Array.isArray(payload.knownActivistIds)) {
        try {
          payload.knownActivistIds = JSON.parse(payload.knownActivistIds);
        } catch (error) {
          console.error("❌ Invalid knownActivistIds format:", payload.knownActivistIds);
          throw new Error("Invalid knownActivistIds format. Expected an array.");
        }
      }
  
      // Ensure that each ID is an object with "activistId"
      payload.knownActivistIds = payload.knownActivistIds.map((id) => {
        if (typeof id === "string") {
          return { activistId: id };
        }
        return id;  // Keep it as is if it's already in the correct object format
      });
  
      const invalidIds = payload.knownActivistIds.filter(
        (obj) => !/^[A-Z]{2}[0-9]{4}$/.test(obj.activistId)
      );
  
      if (invalidIds.length > 0) {
        throw new Error(
          `Invalid activistIds found: ${invalidIds.map(obj => obj.activistId).join(", ")}. Each should be in the format 'XX0001' to 'ZZ9999'.`
        );
      }
    }
  
    if (ActivistData.profilePhoto) {
      try {
        payload.profilePhoto = await convertToBase64(ActivistData.profilePhoto);
        console.log("📸 Converted Base64 Image:", payload.profilePhoto);
      } catch (error) {
        console.error("❌ Base64 Conversion Error:", error);
      }
    }
  
    return payload;
  };
  

  const validateFields = () => {
    const newErrors = {};
    if (!ActivistData.mobileNo) {
      newErrors.mobileNo = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(ActivistData.mobileNo)) {
      newErrors.mobileNo = "Enter a valid 10-digit mobile number.";
    }
    if (!ActivistData.fullname) {
      newErrors.fullname = "Full name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(ActivistData.fullname)) {
      newErrors.fullname = "Name must contain only letters.";
    } else if (ActivistData.fullname.length > 30) {
      newErrors.fullname = "Name cannot exceed 30 characters.";
    }
    if (!ActivistData.dob) {
      newErrors.dob = "Date of Birth is required.";
    } else {
      const today = new Date();
      const birthDate = new Date(ActivistData.dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        newErrors.dob = "Age must be 18 or older.";
      }
    }
    if (!ActivistData.city?.trim()) {
      newErrors.city = "City is required.";
    }
    if (!ActivistData.subCaste?.trim()) {
      newErrors.subCaste = "Sub caste is required.";
    }
    if (!ActivistData.state?.trim()) {
      newErrors.state = "state is required.";
    }
    if (!ActivistData.profilePhoto?.trim()) {
      newErrors.profilePhoto = "profilePhoto is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setActivistData(prev => ({
      ...prev,
      [field]: value,
    }));
  };


  const handleActivistSave = async () => {
    try {
      let payload;
      if (!validateFields()) {
        return;
      }

      setIsLoading(true);
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        Alert.alert("Error", "Authorization token is missing.");
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        payload = await constructActivistPayload(ActivistData, !ActivistData?._id);
        console.log("🧾 Final Payload:", JSON.stringify(payload, null, 2));
      } catch (err) {
        console.error("🚨 Payload construction failed:", err.message);
        Alert.alert("Payload Error", err.message);
        return;
      }
      const apiCall = ActivistData?._id ? axios.patch : axios.post;
      const endpoint = ActivistData?._id ? UPDATE_ACTIVIST : CREATE_ACTIVIST;

      const response = await apiCall(endpoint, payload, { headers });
      console.log("API Response:", response.data);

      if (response.status === 200 && response.data.status === true) {
        showMessage({
          type: "success",
          message: ActivistData?._id
            ? "Activist Profile Updated Successfully"
            : "Your activist approval request is on its way! Stay tuned.",
          description: response.data.message || "Your changes have been saved!",
          icon: "success",
          duration: 5000, // shows for 3 seconds
        });

        setIsEditing(false);

        if (!ActivistData?._id && response.data?.data?._id) {
          setActivistData((prev) => ({
            ...prev,
            _id: response.data.data._id,
          }));
        }

        navigation.goBack();
        return;
      }

      throw new Error(response.data.message || "Something went wrong");

    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error saving activist data:", errorMsg);
  
      const sessionExpiredMessages = [
        "User does not Exist....!Please login again",
        "Invalid token. Please login again",
        "Token has expired. Please login again"
      ];
  
      if (sessionExpiredMessages.includes(errorMsg)) {
        await AsyncStorage.removeItem("userToken");
        navigation.reset({
          index: 0,
          routes: [{ name: "AuthStack" }],
        });
      }
      
      Alert.alert("Error", errorMsg);

    } finally {
      setIsLoading(false);
    }
  };

  const handleAddActivistId = (text) => {
    if (text.trim() !== "") {
      setActivistData((prev) => ({
        ...prev,
        knownActivistIds: [...prev.knownActivistIds, { activistId: text.trim() }],
      }));
    }
  };
  const handleRemoveActivistId = (index) => {
    setActivistData((prev) => ({
      ...prev,
      knownActivistIds: prev.knownActivistIds.filter((_, i) => i !== index),
    }));
  };

  const handleChangeText = (text) => {
    setTempId(text);
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        if (text.trim()) {
          handleAddActivistId(text.trim());
          setTempId("");
        }
      }, 5000)
    );
  };

  return (
    <SafeAreaView style={Globalstyles.container}>
      <View style={Globalstyles.header}>
        <View style={{ display: "flex", flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Activist</Text>
        </View>

      </View>
      <ScrollView style={Globalstyles.form} showsVerticalScrollIndicator={false}>
        <Text style={Globalstyles.title}>Full Name <Entypo name={'star'} color={'red'} size={12} /></Text>
        <TextInput style={Globalstyles.input}
          placeholder="Enter your Full Name"
          value={ActivistData.fullname}
          onChangeText={(text) => {
            const cleanText = text.replace(/[^A-Za-z\s]/g, '');
            setActivistData((prev) => ({ ...prev, fullname: cleanText }));
          }}
          placeholderTextColor={Colors.gray}
          autoComplete="off"
          textContentType="none" />
        {errors?.fullname && (
          <Text style={styles.errorText}>
            {errors.fullname}
          </Text>
        )}
        <Text style={Globalstyles.title}>Sub-Caste <Entypo name={'star'} color={'red'} size={12} /></Text>
        <Dropdown
          style={[Globalstyles.input, !isEditing && styles.readOnly]}
          data={subCasteOptions}
          labelField="label"
          valueField="value"
          value={ActivistData?.subCaste}
          editable={isEditing}
          onChange={(item) => handleInputChange("subCaste", item.value)}
          placeholder="Select subCaste"
          placeholderStyle={{ color: '#E7E7E7' }}
          autoScroll={false}
          showsVerticalScrollIndicator={false}
        />
        {/* <TextInput
          style={Globalstyles.input}
          value={ActivistData?.subCaste}
          onChangeText={handleSubCasteInputChange}
          placeholder="Type your sub caste"
          placeholderTextColor={Colors.gray}
          autoComplete="off"
          textContentType="none"
        />

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
        ) : null} */}

        {errors?.subCaste && (
          <Text style={styles.errorText}>
            {errors.subCaste}
          </Text>
        )}

<View>
  <Text style={Globalstyles.title}>
    Date of Birth <Entypo name={'star'} color={'red'} size={12} />
  </Text>

  <TouchableOpacity
    onPress={() => isEditing && setShowDatePicker(true)}
    activeOpacity={0.8}
  >
    <View style={[
      Globalstyles.inputContainer,
      {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      }
    ]}>
      <Text style={styles.dateText}>
        {ActivistData?.dob
          ? moment(ActivistData.dob, "YYYY-MM-DD").format("DD/MM/YYYY")
          : "Select your date of birth"}
      </Text>
    </View>
  </TouchableOpacity>

  {errors?.dob && (
    <Text style={styles.errorText}>{errors.dob}</Text>
  )}

  {showDatePicker && (
    <DateTimePicker
      value={
        ActivistData?.dob
          ? new Date(ActivistData.dob)
          : new Date(2000, 0, 1)
      }
      mode="date"
      display="default"
      maximumDate={new Date()}
      themeVariant="light"
      onChange={(event, selectedDate) => {
        setShowDatePicker(false);
        if (event.type === "set" && selectedDate) {
          setActivistData((prevState) => ({
            ...prevState,
            dob: moment(selectedDate).format("YYYY-MM-DD"),
          }));
        }
      }}
    />
  )}
</View>


        {errors?.dob && (
          <Text style={styles.errorText}>
            {errors.dob}
          </Text>
        )}

        {/* State Dropdown */}
        <Text style={Globalstyles.title}>State <Entypo name={'star'} color={'red'} size={12} /></Text>
        <TextInput
          style={Globalstyles.input}
          value={ActivistData?.state} // `biodata?.state` ki jagah `stateInput` use karein
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

        {errors?.state && (
          <Text style={styles.errorText}>
            {errors.state}
          </Text>
        )}

        {/* City/Village Input */}
        <Text style={Globalstyles.title}>City/Village <Entypo name={'star'} color={'red'} size={12} /></Text>
        <TextInput
          style={Globalstyles.input}
          value={ActivistData?.city}
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

        {errors?.city && (
          <Text style={styles.errorText}>
            {errors.city}
          </Text>
        )}

        {/* Contact Input */}
        <Text style={Globalstyles.title}>Contact <Entypo name={'star'} color={'red'} size={12} /></Text>
        <TextInput
          style={Globalstyles.input}
          placeholder="Enter contact number"
          keyboardType="numeric"
          maxLength={10}
          placeholderTextColor={Colors.gray}
          value={ActivistData.mobileNo} onChangeText={(text) => setActivistData((prev) => ({ ...prev, mobileNo: text.replace(/[^0-9]/g, '') }))}
          autoComplete="off"
          textContentType="none"
        />
        {errors?.mobileNo && (
          <Text style={styles.errorText}>
            {errors.mobileNo}
          </Text>
        )}
        <Text style={Globalstyles.title}>
          Known Activist ID No.
        </Text>
        <TextInput
          style={Globalstyles.input}
          placeholder="Enter Activist ID (e.g., XX0001)"
          value={tempId}
          onChangeText={handleChangeText}
          onSubmitEditing={() => {
            handleAddActivistId(tempId);
            setTempId("");
          }}
          placeholderTextColor={Colors.gray}
          autoComplete="off"
          textContentType="none"
        />

        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
          {ActivistData.knownActivistIds.map((item, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{item.activistId}</Text>
              <TouchableOpacity onPress={() => handleRemoveActivistId(index)}>
                <Text style={styles.removeTag}>✖</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Text style={Globalstyles.title}>Are you engaged with any Brahmin committee? </Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              ActivistData.engagedWithCommittee === "Yes" && styles.radioSelected,
            ]}
            onPress={() =>
              setActivistData((prev) => ({
                ...prev,
                engagedWithCommittee: "Yes",
              }))
            }
          >
            <Text style={styles.radioText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioButton,
              ActivistData.engagedWithCommittee === "No" && styles.radioSelected,
            ]}
            onPress={() =>
              setActivistData((prev) => ({
                ...prev,
                engagedWithCommittee: "No",
              }))
            }
          >
            <Text style={styles.radioText}>No</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Picture Upload */}
        <View>
          <Text>Profile Picture <Entypo name={'star'} color={'red'} size={12} /></Text>

          <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
            <Text>{ActivistData.profilePhoto ? "Change Image" : "Upload Image"}</Text>
          </TouchableOpacity>

          {ActivistData.profilePhoto ? (
            <Image
              source={{ uri: ActivistData.profilePhoto }}
              style={styles.imagePreviewContainer}
            />
          ) : null}
        </View>

        {errors?.profilePhoto && (
          <Text style={styles.errorText}>
            {errors.profilePhoto}
          </Text>
        )}

        <TouchableOpacity
          style={[styles.submitButton, isLoading && { opacity: 0.7 }]}
          onPress={handleActivistSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text style={styles.submitText}>Submit</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
