import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/ReportPageStyle';
import { REPORT } from '../../utils/BaseUrl';
import { showMessage } from 'react-native-flash-message';
import Globalstyles from '../../utils/GlobalCss';

const ReportPage = ({ navigation, route }) => {
  const { profileId } = route.params || {};
  console.log("profileId", profileId);
  const [selectedReason, setSelectedReason] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const reportOptions = [
    { label: 'Fake Profile', value: 'Fake Profile' },
    { label: 'Inappropriate Content', value: 'Inappropriate Content' },
    { label: 'Suspicious Activity', value: 'Suspicious Activity' },
    { label: 'Other', value: 'Other' },
  ];

  const validateForm = () => {
    let validationErrors = {};

    if (!selectedReason) {
      validationErrors.reason = 'Please select a reason for reporting.';
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true); 

      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const payload = {
        reportReason: selectedReason,
        additionalDetails: additionalDetails,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const API_URL = `${REPORT}/${profileId}`;
      console.log("Submitting Report to:", API_URL);
      console.log("Payload:", payload);

      const response = await axios.post(API_URL, payload, { headers });

      console.log("Response:", JSON.stringify(response.data));

      if (response.status === 200 && response.data.status === true) {
       showMessage({
          type: "success",
          message: response.data.message1,
          description: response.data.message2,
          icon:"success",
          duarion:5000
        });

        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      } else {
        throw new Error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("🚨 Error submitting report:", error.response?.data || error.message);

     showMessage({
        type: "danger",
        message:error.response?.data?.message1,
        description: error.response?.data?.message2,
        icon:"danger",
        duarion:5000
      });
    } finally {
      setIsLoading(false);  
    }
  };

  return (
    <View style={Globalstyles.container}>
      <View style={Globalstyles.header}>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Report</Text>
        </View>
        <View style={styles.righticons}>
          <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => navigation.navigate('Notification')} />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={Globalstyles.title}>Reason for Reporting</Text>
        <Dropdown
          style={[Globalstyles.input, isFocus && { borderColor: Colors.theme_color }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={reportOptions}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select a reason' : '...'}
          value={selectedReason}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setSelectedReason(item.value);
            setErrors(prev => ({ ...prev, reason: '' })); // Clear error
            setIsFocus(false);
          }}
        />
        {errors.reason && <Text style={styles.errorText}>{errors.reason}</Text>}

        <Text style={Globalstyles.title}>Additional Details (Optional)</Text>
        <TextInput
          style={Globalstyles.textInput}
          placeholder="Add more details about the issue..."
          placeholderTextColor={Colors.gray}
          multiline={true}
          value={additionalDetails}
          onChangeText={text => setAdditionalDetails(text)}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Report</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReportPage;
