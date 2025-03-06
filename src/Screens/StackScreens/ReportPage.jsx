import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios'; // ✅ Import Axios
import AsyncStorage from '@react-native-async-storage/async-storage'; // ✅ Import AsyncStorage for Token Storage
import Colors from '../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/ReportPageStyle';
import Globalstyles from '../../utils/GlobalCss';
import Toast from 'react-native-toast-message';
import { REPORT } from '../../utils/BaseUrl';

const ReportPage = ({ navigation, route }) => {
  const { profileId} = route.params || {};
  console.log("profileId",profileId);
  const [selectedReason, setSelectedReason] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [errors, setErrors] = useState({});

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

    return Object.keys(validationErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
  
    try {
      const token = await AsyncStorage.getItem('userToken'); // ✅ Fetch Token
      if (!token) throw new Error('No token found');
  
      const payload = {
        reportReason: selectedReason,
        additionalDetails: additionalDetails,
      };
  
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
  
      const API_URL = `${REPORT}/${profileId}`; // ✅ Append profileId
  
      console.log('Submitting Report to:', API_URL);
      console.log('Payload:',payload);
  
      const response = await axios.post(API_URL, payload, { headers });
      console.log('response:',JSON.stringify(response.data));
  
      if (response.status === 200 || response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response.data.message || 'Your report has been submitted successfully!',
        });
  
        setTimeout(() => {
          navigation.navigate('MainApp');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting report:', error);
  
      let errorMessage = 'Failed to submit report. Please try again later.';
      
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // ✅ Show API error message
      }
  
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
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

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReportPage;
