import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Image, ActivityIndicator } from 'react-native';

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
import Toast from 'react-native-toast-message';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import { useSelector } from 'react-redux';
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
    if (MyActivistProfile) {
      setActivistData((prev) => ({
        ...prev,
        ...MyActivistProfile,
        dob: MyActivistProfile.dob ? new Date(MyActivistProfile.dob) : "",
      }));
    }
  }, [MyActivistProfile]);

  const handleImagePick = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 250,
      cropping: true,
      includeBase64: true,
      mediaType: "photo"
    })
      .then(image => {
        setActivistData(prev => ({
          ...prev,
          profilePhoto: `data:${image.mime};base64,${image.data}`,
        }));
      })
      .catch(error => {
        if (error.code !== "E_PICKER_CANCELLED") {
          console.error("Image Picking Error:", error);
        }
      });
  };

  const handleDateChange = (event, selectedDate) => {
    if (!selectedDate) return;

    setShowDatePicker(false);

    setActivistData((prevState) => ({
      ...prevState,
      dob: moment(selectedDate).format("YYYY-MM-DD"), // ✅ Store correctly
    }));
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
    setSubCasteInput(text);

    if (text) {
      const filtered = subCasteOptions
        .filter((item) => item?.label?.toLowerCase().includes(text.toLowerCase()))
        .map((item) => item.label);

      setFilteredSubCaste(filtered);
    } else {
      setFilteredSubCaste([]);
    }
    setActivistData((prevActivistData) => ({
      ...prevActivistData,
      subCaste: text,
    }));
  };

  const handleSubCasteSelect = (selectedItem) => {
    setSubCasteInput(selectedItem);
    setFilteredSubCaste([]);

    setActivistData((prevActivistData) => ({
      ...prevActivistData,
      subCaste: selectedItem,
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
      "mobileNo", "knownActivistIds", "engagedWithCommittee", "profilePhoto"
    ];

    const payload = {};
    for (const key of keys) {
      if (ActivistData[key] !== undefined && ActivistData[key] !== "") {
        payload[key] = ActivistData[key];
      } else if (isNew) {
        payload[key] = "";
      }
    }

    // ✅ Ensure DOB is in the correct format before sending to backend
    if (payload.dob && typeof payload.dob === "string") {
      let parsedDate;

      // 🟢 Check if dob is already in "YYYY-MM-DD" format
      if (moment(payload.dob, "YYYY-MM-DD", true).isValid()) {
        parsedDate = moment(payload.dob, "YYYY-MM-DD");
      }
      // 🔴 If dob is in "DD/MM/YYYY", convert it
      else if (moment(payload.dob, "DD/MM/YYYY", true).isValid()) {
        parsedDate = moment(payload.dob, "DD/MM/YYYY");
      }

      if (parsedDate && parsedDate.isValid()) {
        payload.dob = parsedDate.format("YYYY-MM-DD"); // ✅ Convert to correct format
      } else {
        console.error("Invalid DOB format received:", payload.dob);
        throw new Error("Invalid DOB format. Expected format is DD/MM/YYYY or YYYY-MM-DD.");
      }
    }

    // ✅ Convert profile photo to base64 if available
    if (ActivistData.profilePhoto) {
      try {
        payload.profilePhoto = await convertToBase64(ActivistData.profilePhoto);
        console.log("Converted Base64 Image:", payload.profilePhoto);
      } catch (error) {
        console.error("Base64 Conversion Error:", error);
      }
    }

    return payload;
  };



  const handleActivistSave = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Authorization token is missing.",
        });
        return;
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // ✅ Use `constructActivistPayload` to prepare payload
      const payload = await constructActivistPayload(ActivistData, !ActivistData?._id);
      console.log("Payload:", payload);

      // ✅ Decide whether to create or update
      const apiCall = ActivistData?._id ? axios.patch : axios.post;
      const endpoint = ActivistData?._id ? `${UPDATE_ACTIVIST}` : CREATE_ACTIVIST;

      const response = await apiCall(endpoint, payload, { headers });
      console.log("API Response:", response.data);

      // ✅ Ensure response is successful
      if (response.status === 200 || response.status === 201) {
        Toast.show({
          type: "success",
          text1: ActivistData?._id ? "Profile Updated Successfully" : "Activist Profile Created Successfully",
          text2: response.data.message || "Your changes have been saved!",
        });

        setIsEditing(false);

        // ✅ Store new activist ID if created
        if (!ActivistData?._id && response.data?.data?._id) {
          setActivistData((prev) => ({
            ...prev,
            _id: response.data.data._id,
          }));
        }

        return; // ✅ Success case handled
      }

      // ❌ If status is NOT success, throw an error
      throw new Error(response.data.message || "Something went wrong");

    } catch (error) {
      // ✅ Handle API errors properly
      if (error.response) {
        console.error("API Error:", error.response.data);
      } else {
        console.error("Unexpected Error:", error.message);
      }

      // ✅ Show error message if needed
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.response?.data?.message || "Failed to save activist data.",
      });

    } finally {
      setIsLoading(false);
    }
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
        <TextInput style={Globalstyles.input} placeholder="Enter your Full Name" value={ActivistData.fullname}
          onChangeText={(text) => setActivistData((prev) => ({ ...prev, fullname: text }))} placeholderTextColor={Colors.gray} />
        {/* Sub Caste Dropdown */}
        <Text style={Globalstyles.title}>Sub-Caste <Entypo name={'star'} color={'red'} size={12} /></Text>
        <TextInput
          style={Globalstyles.input}
          value={ActivistData?.subCaste} // `myBiodata?.subCaste` ki jagah `subCasteInput` use karein
          onChangeText={handleSubCasteInputChange}
          placeholder="Type your sub caste"
          placeholderTextColor={Colors.gray}
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
          <Text style={Globalstyles.title}>Date of Birth <Entypo name={'star'} color={'red'} size={12} /></Text>
          <TextInput
            style={[Globalstyles.input, !isEditing && styles.readOnly]}
            value={ActivistData.dob ? moment(ActivistData.dob, "YYYY-MM-DD").format("DD/MM/YYYY") : ""}
            editable={isEditing}
            onFocus={() => setShowDatePicker(true)}
            placeholder="Select your date of birth"
            placeholderTextColor={Colors.gray}
          />




          {showDatePicker && (
            <DateTimePicker
              value={ActivistData.dob ? new Date(ActivistData.dob) : new Date()} // Ensure it's a Date object
              mode="date"
              display="default"
              onChange={(event, selectedDate) => handleDateChange(event, selectedDate)}
            />
          )}
        </View>

        {/* State Dropdown */}
        <Text style={Globalstyles.title}>State <Entypo name={'star'} color={'red'} size={12} /></Text>
        <TextInput
          style={Globalstyles.input}
          value={ActivistData?.state} // `biodata?.state` ki jagah `stateInput` use karein
          onChangeText={handleStateInputChange}
          placeholder="Type your State"
          placeholderTextColor={Colors.gray}
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

        {/* City/Village Input */}
        <Text style={Globalstyles.title}>City/Village <Entypo name={'star'} color={'red'} size={12} /></Text>
        <TextInput
          style={Globalstyles.input}
          value={ActivistData?.city}
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

        {/* Contact Input */}
        <Text style={Globalstyles.title}>Contact <Entypo name={'star'} color={'red'} size={12} /></Text>
        <TextInput
          style={Globalstyles.input}
          placeholder="Enter contact number"
          keyboardType="numeric"
          maxLength={10}
          placeholderTextColor={Colors.gray}
          value={ActivistData.mobileNo} onChangeText={(text) => setActivistData((prev) => ({ ...prev, mobileNo: text }))}
        />
        <Text style={Globalstyles.title}>
          Known Activist ID No. <Entypo name={'star'} color={'red'} size={12} />
        </Text>
        <TextInput
          style={Globalstyles.input}
          placeholder="Enter ID"
          value={ActivistData.knownActivistIds.length > 0 ? ActivistData.knownActivistIds[0] : ""}
          onChangeText={(text) =>
            setActivistData((prev) => ({
              ...prev,
              knownActivistIds: text ? [text.trim()] : [], // Ensure it's an array of strings
            }))
          }
          placeholderTextColor={Colors.gray}
        />

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
      <Toast />
    </SafeAreaView>
  );
}
