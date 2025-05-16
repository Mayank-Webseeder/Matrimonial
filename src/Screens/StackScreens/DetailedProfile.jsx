
import {
  Text, View, Image, ImageBackground, TextInput, ScrollView, SafeAreaView, StatusBar, ActivityIndicator, FlatList,
  Modal, Alert
} from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import styles from '../StyleScreens/ProfileStyle';
import { TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  CREATE_PERSONAL_DETAILS, FREE_TRIAL, MATRIMONIALFETCH_PLAN,
  PAID_URL, PAYMENT_VERIFICATION, RAZORPAY, UPDATE_PERSONAL_DETAILS, GET_BIODATA
} from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux';
import moment from "moment";
import Globalstyles from '../../utils/GlobalCss';
import ImageCropPicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SW } from '../../utils/Dimensions';
import { useFocusEffect } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import { setBioData } from '../../ReduxStore/Slices/BiodataSlice';
import { useDispatch } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  OccupationData, QualificationData, maritalStatusData, ManglikStatusData, LivingData, ProfileCreatedData, CityData, Income,
  FamilyType, CookingStatus, DietHabit, smokingStatusData, DrinkingHabit, StateData, TobacooHabit, subCasteOptions,
  MyDisabilities, MyComplexionData,
  MotherOccupationData,
  genderData
} from '../../DummyData/DropdownData';
import { showMessage } from 'react-native-flash-message';

const DetailedProfile = ({ navigation, profileData }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [stateInput, setStateInput] = useState("");
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [cityInput, setCityInput] = useState("");
  const [cityOrVillageInput, setCityOrVillageInput] = useState("");
  const [filteredCitiesOrVillages, setFilteredCitiesOrVillages] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [errors, setErrors] = useState({});
  // const MyprofileData = useSelector((state) => state.getBiodata);
  const [plans, setPlans] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [trialLoading, setTrialLoading] = useState(false);
  const [buyLoading, setBuyLoading] = useState(false);
  const ProfileData = useSelector((state) => state.profile);
  const profile_data = ProfileData?.profiledata || {};
  const [buyingPlanId, setBuyingPlanId] = useState(null);
  const [TrialPlanId, setTrialPlanId] = useState(null);
  const [mybiodata, setMyBiodata] = useState({});
  const hasTrial = profile_data.serviceSubscriptions?.some(
    (sub) => sub.subscriptionType === "Trial" && sub.serviceType === "Biodata"
  );
  const myBiodata = profileData?.personalDetails || mybiodata?.personalDetails;

  const [biodata, setBiodata] = useState({
    subCaste: '',
    gender: '',
    fullname: '',
    dob: '',
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

  const [subCasteInput, setSubCasteInput] = useState(biodata.subCaste || '');
  const [filteredSubCaste, setFilteredSubCaste] = useState([]);

  useEffect(() => {
    getBiodata();
    console.log("profile_data", JSON.stringify(profile_data));
  }, [])


  const getBiodata = async () => {
    try {
      setMyBiodata("")
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(GET_BIODATA, { headers });
      if (response.data) {
        const fetchedData = response.data.data;
        console.log("My bio data in home page", fetchedData);
        setMyBiodata(fetchedData);
        dispatch(setBioData(fetchedData));
      } else {
        setMyBiodata({});
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error in creating personal detials :", errorMsg);

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
    }
  };

  // subscription part 
  const fetchPlans = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(MATRIMONIALFETCH_PLAN, { headers });
      if (response.data?.status) {
        setPlans(response.data.plans);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("failed to fetch plans :", errorMsg);

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
    }
  };

  const openModal = () => {
    fetchPlans();
    setModalVisible(true);
  };

  useFocusEffect(
    useCallback(() => {
      if (myBiodata) {
        setBiodata((prev) => ({
          ...prev,
          ...myBiodata,
          gender: profileData?.gender || mybiodata?.gender,
        }));
      }
    }, [myBiodata, profileData?.gender])
  );


  const handleImageSelection = (field) => {
    ImageCropPicker.openPicker({
      width: 1000,
      height: 1000,
      cropping: true,
      compressImageQuality: 1,
      includeBase64: true,
      mediaType: "photo",
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


  const heightData = Array.from({ length: 4 }, (_, feetIndex) =>
    Array.from({ length: 12 }, (_, inchesIndex) => ({
      label: `${4 + feetIndex}' ${inchesIndex}'' `,
      value: `${4 + feetIndex}' ${inchesIndex}'' `,
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
    setShowDatePicker(false);
    if (event.type === "set" && selectedDate) {
      setBiodata((prevState) => ({
        ...prevState,
        dob: selectedDate,
      }));
    }
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
      if (key === "dob") {
        payload[key] = biodata[key] || "";
      } else if (biodata[key] !== undefined && biodata[key] !== "") {
        payload[key] = biodata[key];
      } else if (isNew) {
        payload[key] = "";
      }
    }

    try {
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

  const OPTIONAL_FIELDS = [
    "weight", "complexion", "nadi", "gotraSelf", "gotraMother", "aboutMe", "otherFamilyMemberInfo",
    "knowCooking", "dietaryHabit", "smokingHabit", "drinkingHabit",
    "tobaccoHabits", "hobbies", "fullPhoto", "bestPhoto"
  ];

  const validateForm = (biodata) => {
    let errors = {};

    const allFields = Object.keys(biodata);
    const MANDATORY_FIELDS = allFields.filter(field => !OPTIONAL_FIELDS.includes(field));

    MANDATORY_FIELDS.forEach((field) => {
      const value = String(biodata[field] || "").trim();

      if (!value) {
        errors[field] = `${field} is required`;
      } else {
        // Full Name Validation
        if (field === "fullname") {
          if (!/^[A-Za-z\s]+$/.test(value)) {
            errors.fullname = "Full name must contain only letters and spaces.";
          } else if (value.length > 25) {
            errors.fullname = "Full name cannot exceed 25 characters.";
          }
        }
        if (field === "fatherName") {
          if (!/^[A-Za-z\s]+$/.test(value)) {
            errors.fatherName = "fatherName must contain only letters and spaces.";
          } else if (value.length > 25) {
            errors.fatherName = "fatherName cannot exceed 25 characters.";
          }
        }
        if (field === "motherName") {
          if (!/^[A-Za-z\s]+$/.test(value)) {
            errors.motherName = "motherName must contain only letters and spaces.";
          } else if (value.length > 25) {
            errors.motherName = "motherName cannot exceed 25 characters.";
          }
        }

        // DOB Validation
        if (field === "dob") {
          const birthDate = new Date(value);
          if (isNaN(birthDate.getTime())) {
            errors.dob = "Enter a valid date of birth.";
          } else {
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();

            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
              age--;
            }

            if (age < 18) {
              errors.dob = "Age must be 18 or older.";
            }
          }
        }

        // Contact Number Validation
        if (field === "contactNumber1" || field === "contactNumber2") {
          if (!/^\d{10}$/.test(value)) {
            errors[field] = "Enter a valid 10-digit mobile number.";
          }
        }
      }
    });

    return errors;
  };

  const handleSave = async () => {
    console.log("🟢 handleSave triggered");

    try {
      setIsLoading(true);

      const isUpdating = Boolean(biodata?._id);
      if (!isUpdating) {
        const errors = validateForm(biodata);
        console.log("🚀 Validation Errors:", errors);

        if (Object.keys(errors).length > 0) {
          const errorMessages = Object.values(errors).join('\n');
          // showMessage({
          //   message: errorMessages,
          //   type: "danger",
          //   duration: 5000,
          //   icon: "danger"
          // });
          console.log("❌ Validation failed. Errors:", errors);
          setErrors(errors);
          setIsLoading(false);
          return;
        }
        console.log("✅ Validation Passed. Proceeding...");
      }

      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const payload = await constructPayload(biodata, !isUpdating);
      console.log("📩 Constructed Payload:", payload);

      const apiCall = isUpdating ? axios.put : axios.post;
      const endpoint = isUpdating ? UPDATE_PERSONAL_DETAILS : CREATE_PERSONAL_DETAILS;
      console.log(`🔹 Calling API: ${endpoint}`);

      const response = await apiCall(endpoint, payload, { headers });

      console.log("✅ API Response:", response.data);

      if (response.status === 200 || response.data.status === true) {
        const successMessage = isUpdating
          ? "Profile Updated Successfully!"
          : "Detailed Profile Created Successfully!";

        showMessage({
          message: successMessage,
          type: "success",
          duarion: 5000,
          icon: "success"
        });

        setBiodata((prev) => ({
          ...prev,
          gender: biodata.gender,
        }));
        setIsEditing(false);
        setErrors({});

        setTimeout(() => {
          if (isUpdating) {
            navigation.navigate("MainApp", {
              screen: "Tabs",
              params: {
                screen: "MyProfile",
              },
            });
          } else {
            navigation.navigate("MainPartnerPrefrence");
          }
        }, 5000);

        return;
      }

      throw new Error(response.data.message || "Something went wrong");

    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching biodata:", errorMsg);
      Alert.alert(
        "Error",
        errorMsg,
        [
          {
            text: "OK",
            onPress: () => {
              if (errorMsg === "You do not have an active subscription for Biodata service.") {
                openModal();
              }
            }
          }
        ],
        { cancelable: true }
      );
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleFreeTrial = async (plan) => {
    try {
      setTrialLoading(true);
      setTrialPlanId(plan._id)
      const payload = {
        serviceType: plan.profileType,
        trialPeriod: String(plan.trialPeriod),
      };
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      console.log("payload", payload);

      const response = await axios.post(
        FREE_TRIAL,
        payload,
        { headers }
      );

      if (response.data?.status) {
        Alert.alert(
          'Free Trial Started',
          response.data.message || `Trial started for ${plan.profileType}`,
          [
            {
              text: "OK",
              onPress: () => {
                setModalVisible(false);
                handleSave();
              },
            },
          ]
        );
      } else {
        throw new Error(response.data?.message || 'Something went wrong!');
      }

    } catch (err) {
      const errorMessage = err?.response?.data?.message || err.message || 'Please try again later.';
      console.error('Error starting trial:', err?.response?.data || err.message);

      Alert.alert(
        'Failed to Start Trial',
        errorMessage,
        [
          {
            text: "OK",
            onPress: () => {
              if (errorMessage === "Trial already requested or activated for Biodata") {
                setModalVisible(false);
                handleSave(); // ✅ Still proceed
              }
            }
          }
        ]
      );
    } finally {
      setTrialLoading(false);
      setTrialPlanId(null)
    }
  };

  const handleBuyNow = async (plan) => {
    try {
      setBuyLoading(true)
      setBuyingPlanId(plan._id)
      const token = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      if (!token || !userId) throw new Error("Missing user token or ID");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const keyResponse = await axios.get(
        RAZORPAY,
        { headers }
      );

      const razorpayKey = keyResponse.data?.key;
      if (!razorpayKey) throw new Error("Failed to fetch Razorpay Key");

      const payload = {
        userId,
        profileType: plan.profileType
      };
      console.log("📦 [Payload to /buy]:", payload);

      const orderResponse = await axios.post(
        PAID_URL,
        payload,
        { headers }
      );

      console.log("🧾 [Order API Response]:", orderResponse.data);

      let orderId, amount, currency;

      // Case 1: New order created
      if (orderResponse.data?.razorpayOrder) {
        const razorpayOrder = orderResponse.data.razorpayOrder;
        orderId = razorpayOrder.id;
        amount = razorpayOrder.amount;
        currency = razorpayOrder.currency;
      }
      // Case 2: Old subscription exists (and message says 'Subscription created...')
      else if (orderResponse.data?.razorpayOrderId) {
        orderId = orderResponse.data.razorpayOrderId;
        amount = orderResponse.data.services?.[0]?.amount * 100 || 50000;
        currency = "INR";
      }

      if (!orderId || !amount || !currency) {
        throw new Error("Incomplete Razorpay order data received from server");
      }

      const options = {
        description: `Subscription for ${plan.profileType}`,
        image: 'https://yourapp.com/logo.png',
        currency,
        key: razorpayKey,
        amount,
        name: 'Matrimonial',
        order_id: orderId,
        theme: { color: '#3399cc' },
      };

      RazorpayCheckout.open(options)
        .then(async (paymentData) => {
          console.log("💸 [Payment Success]:", paymentData);

          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = paymentData;

          if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            Alert.alert("Error", "Missing payment details from Razorpay.");
            return;
          }

          const verifyPayload = {
            razorpay_payment_id: razorpay_payment_id,
            razorpay_order_id: razorpay_order_id,
            razorpay_signature: razorpay_signature,
          };

          console.log("📨 [Payload to /verifyPayment]:", verifyPayload);

          try {
            const verifyResponse = await axios.post(
              PAYMENT_VERIFICATION,
              verifyPayload,
              { headers }
            );

            console.log("✅ [Verify Payment Response]:", verifyResponse.data);

            if (verifyResponse.status === 200 || verifyResponse.data?.status) {
              Alert.alert(
                "Success",
                verifyResponse.data?.message || "Payment verified successfully!",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      setModalVisible(false);
                      setTimeout(() => {
                        handleSave();
                      }, 300);
                    },
                  },
                ]
              );
            }
            else {
              Alert.alert("Warning", verifyResponse.data?.message || "Verification failed!");
            }

          } catch (verifyError) {
            console.error("❌ [Verification Error]:", verifyError.response?.data || verifyError.message);
            Alert.alert("Error", "Payment done, but verification failed.");
          }
        })
        .catch((error) => {
          console.log("❌ [Payment Failed]:", error);
          Alert.alert("Payment Failed", error.description || "Try again later.");
        });

    } catch (error) {
      const errorMsg = error?.response?.data?.message || error.message || "Please try again later.";

      console.error("❌ [Error in buying subscription]:", error?.response?.data || error.message);
      Alert.alert(
        "Subscription Info",
        errorMsg
      );
      setBuyLoading(false)
      setBuyingPlanId(false)
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
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        <View style={Globalstyles.form}>
          <View style={styles.detail}>
            <Text style={styles.Formtitle}>Create Biodata</Text>
          </View>
          <Text style={Globalstyles.title}>Sub-Caste <Entypo name={'star'} color={'red'} size={12} /></Text>
          <Dropdown
            style={[Globalstyles.input, !isEditing && styles.readOnly,errors.subCaste && styles.errorInput]}
            data={subCasteOptions}
            labelField="label"
            valueField="value"
            value={
              subCasteOptions.find(item => item.label === biodata?.subCaste)?.value || ''
            }
            editable={isEditing}
            onChange={(text) => handleInputChange("subCaste", text.value)}
            placeholder="Select subCaste"
            placeholderStyle={{ color: '#E7E7E7' }}
            autoScroll={false}
            showsVerticalScrollIndicator={false}
          />
          {errors.subCaste && (
            <Text style={styles.errorText}>{errors.subCaste}</Text>
          )}

          {/* {filteredSubCaste.length > 0 ? (
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

          <View>
            <Text style={Globalstyles.title}>Gender <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.gender && styles.errorInput]}
              data={genderData}
              labelField="label"
              valueField="value"
              value={biodata?.gender}
              editable={isEditing}
              onChange={(text) => handleInputChange("gender", text.value)}
              placeholder="Select Gender"
              placeholderStyle={{ color: "#E7E7E7" }}
            />

          </View>

          <View>
            <Text style={Globalstyles.title}>Full Name <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.fullname && styles.errorInput]}
              value={biodata?.fullname}
              editable={isEditing}
              onChangeText={(text) => {
                handleInputChange("fullname", text);
              }}
              placeholder="Enter Your Full Name"
              placeholderTextColor={Colors.gray}
              autoComplete="off"
              textContentType="none"
            />

            {errors.fullname && <Text style={styles.errorText}>{errors.fullname}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>
              Date of Birth <Entypo name="star" color="red" size={12} />
            </Text>

            <View
              style={[
                Globalstyles.input,errors.dob && styles.errorInput,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }
              ]}
            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => isEditing && setShowDatePicker(true)}
                activeOpacity={0.8}

              >
                <Text style={[styles.dateText]}>
                  {biodata?.dob ? formatDate(biodata.dob) : "Select Your Date"}
                </Text>
              </TouchableOpacity>
            </View>

            {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}

            {showDatePicker && (
              <DateTimePicker
                value={biodata?.dob ? new Date(biodata?.dob) : new Date(2000, 0, 1)}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (event.type === "set" && selectedDate) {
                    setBiodata((prev) => ({
                      ...prev,
                      dob: selectedDate,
                    }));
                  }
                }}
                maximumDate={new Date()}
                themeVariant="light"
              />
            )}
          </View>

          <View>
            <Text style={Globalstyles.title}>
              Time of Birth <Entypo name={'star'} color={'red'} size={12} />
            </Text>

            <TouchableOpacity
              onPress={() => isEditing && setShowTimePicker(true)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  Globalstyles.input,errors.dob && styles.errorInput,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }
                ]}
              >
                <Text style={styles.dateText}>
                  {biodata?.timeOfBirth ? biodata.timeOfBirth : "HH:MM AM/PM"}
                </Text>
              </View>
            </TouchableOpacity>

            {errors.timeOfBirth && (
              <Text style={styles.errorText}>{errors.timeOfBirth}</Text>
            )}

            {showTimePicker && (
              <DateTimePicker
                value={
                  biodata?.timeOfBirth
                    ? new Date(`1970-01-01T${biodata.timeOfBirth}:00`)
                    : new Date()
                }
                mode="time"
                display="spinner"
                is24Hour={false}
                onChange={(event, selectedTime) => {
                  setShowTimePicker(false);
                  if (event.type === "set" && selectedTime) {
                    const hours = selectedTime.getHours();
                    const minutes = selectedTime.getMinutes();
                    const formattedTime = moment({ hour: hours, minute: minutes }).format("hh:mm A");

                    setBiodata((prev) => ({
                      ...prev,
                      timeOfBirth: formattedTime,
                    }));
                  }
                }}
                themeVariant="light"
              />
            )}

          </View>



          <View>
            <Text style={Globalstyles.title}>Place of Birth <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.placeofbirth && styles.errorInput]}
              value={biodata?.placeofbirth}
              editable={isEditing}
              onChangeText={(text) => handleInputChange("placeofbirth", text)}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Birth Place'
              autoComplete="off"
              textContentType="none"
            />
            {errors.placeofbirth && <Text style={styles.errorText}>{errors.placeofbirth}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Marital Status <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.maritalStatus && styles.errorInput]}
              data={maritalStatusData}
              labelField="label"
              valueField="value"
              value={
                maritalStatusData.find(item => item.label === biodata?.maritalStatus)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("maritalStatus", text.value)}
              placeholder="Select marital status"
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
          {errors.maritalStatus && <Text style={styles.errorText}>{errors.maritalStatus}</Text>}
          <View>
            <Text style={Globalstyles.title}>
              Disabilities (physical, mental, etc.) <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.disabilities && styles.errorInput]}
              data={MyDisabilities}
              labelField="label"
              valueField="value"
              value={
                MyDisabilities.find(item => item.label === biodata?.disabilities)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("disabilities", text.value)}
              placeholder="Select disability"
              placeholderStyle={{ color: '#E7E7E7' }}
            />
            {errors.disabilities && <Text style={styles.errorText}>{errors.disabilities}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Height <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.heightFeet && styles.errorInput]}
              data={heightData}
              labelField="label"
              valueField="value"
              value={
                heightData.find(item => item.label === biodata?.heightFeet)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("heightFeet", text.value)}
              placeholder="Height"
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
          {errors.heightFeet && <Text style={styles.errorText}>{errors.heightFeet}</Text>}
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
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Complexion</Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={MyComplexionData}
              labelField="label"
              valueField="value"
              value={
                MyComplexionData.find(item => item.label === biodata?.complexion)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("complexion", text.value)}
              placeholder="Select Complexion"
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Manglik Status <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.manglikStatus && styles.errorInput]}
              data={ManglikStatusData}
              labelField="label"
              valueField="value"
              value={
                ManglikStatusData.find(item => item.label === biodata?.manglikStatus)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("manglikStatus", text.value)}
              placeholder="Select status"
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
            {errors.manglikStatus && <Text style={styles.errorText}>{errors.manglikStatus}</Text>}
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
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.qualification && styles.errorInput]}
              data={QualificationData}
              labelField="label"
              valueField="value"
              value={
                QualificationData.find(item => item.label === biodata?.qualification)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("qualification", text.value)}
              placeholder="Select Qualification"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
            {errors.qualification && <Text style={styles.errorText}>{errors.qualification}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Occupation <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.occupation && styles.errorInput]}
              data={OccupationData}
              labelField="label"
              valueField="value"
              value={
                OccupationData.find(item => item.label === biodata?.occupation)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("occupation", text.value)}
              placeholder="Select occupation"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
            {errors.occupation && <Text style={styles.errorText}>{errors.occupation}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Income (Annually) <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.annualIncome && styles.errorInput]}
              data={Income}
              labelField="label"
              valueField="value"
              value={
                Income.find(item => item.label === biodata?.annualIncome)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("annualIncome", text.value)}
              placeholder="Select Income"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
            {errors.annualIncome && <Text style={styles.errorText}>{errors.annualIncome}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Are you living with Family <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.livingStatus && styles.errorInput]}
              data={LivingData}
              labelField="label"
              valueField="value"
              value={
                LivingData.find(item => item.label === biodata?.livingStatus)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("livingStatus", text.value)}
              placeholder="Select Status"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
            {errors.livingStatus && <Text style={styles.errorText}>{errors.livingStatus}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Which city do you currently live in? <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input,errors.currentCity && styles.errorInput]}
              value={biodata?.currentCity}
              onChangeText={handleCityInputChange}
              placeholder="Enter your city"
              placeholderTextColor={Colors.gray}
              autoComplete="off"
              textContentType="none"
            />
            {errors.currentCity && <Text style={styles.errorText}>{errors.currentCity}</Text>}
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
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.profileCreatedBy && styles.errorInput]}
              data={ProfileCreatedData}
              labelField="label"
              valueField="value"
              value={
                ProfileCreatedData.find(item => item.label === biodata?.profileCreatedBy)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("profileCreatedBy", text.value)}
              placeholder="Select Person"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
            {errors.profileCreatedBy && <Text style={styles.errorText}>{errors.profileCreatedBy}</Text>}
          </View>
          <Text style={styles.headText}>Family details </Text>
          <View>
            <Text style={Globalstyles.title}>Father Full Name <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.fatherName && styles.errorInput]}
              value={biodata?.fatherName}
              onChangeText={(text) => {
                handleInputChange("fatherName", text);
              }}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Father Name'
              autoComplete="off"
              textContentType="none"
            />
            {errors.fatherName && <Text style={styles.errorText}>{errors.fatherName}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Mother Full Name <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.motherName && styles.errorInput]}
              value={biodata?.motherName}
              onChangeText={(text) => {
                handleInputChange("motherName", text);
              }}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Mother Name'
              autoComplete="off"
              textContentType="none"
            />
            {errors.motherName && <Text style={styles.errorText}>{errors.motherName}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Father Occupation <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.fatherOccupation && styles.errorInput]}
              data={MotherOccupationData}
              labelField="label"
              valueField="value"
              value={
                MotherOccupationData.find(item => item.label === biodata?.fatherOccupation)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("fatherOccupation", text.value)}
              placeholder="Select Occupation"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
            {errors.fatherOccupation && <Text style={styles.errorText}>{errors.fatherOccupation}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Father Income (Annually) <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.fatherIncomeAnnually && styles.errorInput]}
              data={Income}
              labelField="label"
              valueField="value"
              value={
                Income.find(item => item.label === biodata?.fatherIncomeAnnually)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("fatherIncomeAnnually", text.value)}
              placeholder="Select Income"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
            {errors.fatherIncomeAnnually && <Text style={styles.errorText}>{errors.fatherIncomeAnnually}</Text>}

          </View>
          <View>
            <Text style={Globalstyles.title}>Mother Occupation <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.motherOccupation && styles.errorInput]}
              data={MotherOccupationData}
              labelField="label"
              valueField="value"
              value={
                MotherOccupationData.find(item => item.label === biodata?.motherOccupation)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("motherOccupation", text.value)}
              placeholder="Select Occupation"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
            {errors.motherOccupation && <Text style={styles.errorText}>{errors.motherOccupation}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Mother Income (Annually) <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.motherIncomeAnnually && styles.errorInput]}
              data={Income}
              labelField="label"
              valueField="value"
              value={
                Income.find(item => item.label === biodata?.motherIncomeAnnually)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("motherIncomeAnnually", text.value)}
              placeholder="Select Income"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
            {errors.motherIncomeAnnually && <Text style={styles.errorText}>{errors.motherIncomeAnnually}</Text>}
          </View>

          <View>
            <Text style={Globalstyles.title}>Family Type <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.familyType && styles.errorInput]}
              data={FamilyType}
              labelField="label"
              valueField="value"
              value={
                FamilyType.find(item => item.label === biodata?.familyType)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("familyType", text.value)}
              placeholder="Select Type"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
            {errors.familyType && <Text style={styles.errorText}>{errors.familyType}</Text>}
          </View>
          <View>
            <Text style={Globalstyles.title}>Siblings <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.siblings && styles.errorInput]}
              data={siblings}
              labelField="label"
              valueField="value"
              value={siblings.find((item) => item.value == biodata?.siblings)?.value || null}
              editable={isEditing}
              onChange={(text) => handleInputChange("siblings", String(text.value))}
              placeholder="Select Type"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
            {errors.siblings && <Text style={styles.errorText}>{errors.siblings}</Text>}
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
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.contactNumber1 && styles.errorInput]}
              value={biodata?.contactNumber1}
              onChangeText={(text) => {
                const cleanText = text.replace(/[^0-9]/g, '');
                handleInputChange("contactNumber1", cleanText);
              }}
              keyboardType="phone-pad"
              maxLength={10}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Contact No. 1'
              autoComplete="off"
              textContentType="none"
            />
            {errors.contactNumber1 && <Text style={styles.errorText}>{errors.contactNumber1}</Text>}
          </View>

          <View>
            <Text style={Globalstyles.title}>Contact No. 2 <Entypo name={'star'} color={'red'} size={12} /> </Text>
            <TextInput
              style={[Globalstyles.input, !isEditing && styles.readOnly,errors.contactNumber2 && styles.errorInput]}
              value={biodata?.contactNumber2}
              onChangeText={(text) => {
                const cleanText = text.replace(/[^0-9]/g, '');
                handleInputChange("contactNumber2", cleanText);
              }}
              keyboardType="phone-pad"
              maxLength={10}
              editable={isEditing}
              placeholderTextColor={Colors.gray}
              placeholder='Enter Your Contact No. 2'
              autoComplete="off"
              textContentType="none"
            />
            {errors.contactNumber2 && <Text style={styles.errorText}>{errors.contactNumber2}</Text>}
          </View>
          <View>
            <Text style={styles.headText}> Address</Text>

            <Text style={Globalstyles.title}>State <Entypo name={'star'} color={'red'} size={12} /></Text>
            <TextInput
              style={[Globalstyles.input,errors.state && styles.errorInput]}
              value={biodata?.state} // `biodata?.state` ki jagah `stateInput` use karein
              onChangeText={handleStateInputChange}
              placeholder="Type your State"
              placeholderTextColor={Colors.gray}
              autoComplete="off"
              textContentType="none"
            />
            {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}
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
              style={[Globalstyles.input,errors.cityOrVillage && styles.errorInput]}
              value={biodata?.cityOrVillage}
              onChangeText={handleCityOrVillageInputChange}
              placeholder="Type your city/village"
              placeholderTextColor={Colors.gray}
              autoComplete="off"
              textContentType="none"
            />
            {errors.cityOrVillage && <Text style={styles.errorText}>{errors.cityOrVillage}</Text>}
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
              value={
                CookingStatus.find(item => item.label === biodata?.knowCooking)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("knowCooking", text.value)}
              placeholder="Select Status"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}> Dietary Habits  </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={DietHabit}
              labelField="label"
              valueField="value"
              value={
                DietHabit.find(item => item.label === biodata?.dietaryHabit)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("dietaryHabit", text.value)}
              placeholder="Select Habit"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Smoking Habits  </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={smokingStatusData}
              labelField="label"
              valueField="value"
              value={
                smokingStatusData.find(item => item.label === biodata?.smokingHabit)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("smokingHabit", text.value)}
              placeholder="Select Status"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Drinking Habits </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={DrinkingHabit}
              labelField="label"
              valueField="value"
              value={
                DrinkingHabit.find(item => item.label === biodata?.drinkingHabit)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("drinkingHabit", text.value)}
              placeholder="Select Habit"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Tabacoo Habits </Text>
            <Dropdown
              style={[Globalstyles.input, !isEditing && styles.readOnly]}
              data={TobacooHabit}
              labelField="label"
              valueField="value"
              value={
                TobacooHabit.find(item => item.label === biodata?.tobaccoHabits)?.value || ''
              }
              editable={isEditing}
              onChange={(text) => handleInputChange("tobaccoHabits", text.value)}
              placeholder="Select Habit"
              disabled={!isEditing}
              placeholderStyle={{ color: '#E7E7E7' }}
              autoScroll={false}
              showsVerticalScrollIndicator={false}
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
              autoScroll={false}
              showsVerticalScrollIndicator={false}

            />
          </View>
          <View>
            <Text style={Globalstyles.title}>Upload Your One Closeup Image <Entypo name={'star'} color={'red'} size={12} /> </Text>

            <View style={[Globalstyles.input,errors.closeUpPhoto && styles.errorInput]}>
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
            {errors.closeUpPhoto && <Text style={styles.errorText}>{errors.closeUpPhoto}</Text>}
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
          <TouchableOpacity
            style={styles.button}
            onPress={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color={Colors.light} />
            ) : (
              <Text style={styles.buttonText}>
                {biodata?._id ? "Submit" : "Continue"}
              </Text>
            )}
          </TouchableOpacity>
          <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.cardContainer}>
                    {plans.map((plan) => (
                      <View key={plan._id} style={styles.card}>
                        <Text style={styles.title}>{plan.profileType}</Text>
                        <Text style={styles.Text}>Trial Period: {plan.trialPeriod} days</Text>
                        <Text style={styles.Text}>Duration: {plan.duration} months</Text>
                        <Text style={styles.Text}>Amount: ₹{plan.amount}</Text>
                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                          <Text style={styles.description}>{plan.description}</Text>

                          <View style={styles.buttonRowAligned}>
                            {!hasTrial && (
                              <TouchableOpacity style={styles.trialButton} onPress={() => handleFreeTrial(plan)}>
                                <Text style={styles.trialText}>
                                  {TrialPlanId === plan._id ? 'Starting...' : 'Start Free Trial'}
                                </Text>
                              </TouchableOpacity>
                            )}
                            <TouchableOpacity style={styles.buyButton} onPress={() => handleBuyNow(plan)}>
                              <Text style={styles.buyButtonText}>
                                {buyingPlanId === plan._id ? 'Buying...' : 'Buy Now'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>

                      </View>
                    ))}
                  </View>
                </ScrollView>

                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetailedProfile
