import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Colors from '../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/ReportPageStyle';
import Globalstyles from '../../utils/GlobalCss';

const ReportPage = ({ navigation, route }) => {
  const { profileName, profilePhoto } = route.params || {};
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

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const reportData = {
      profileName,
      profilePhoto,
      reason: selectedReason,
      details: additionalDetails,
    };

    console.log('Report Data:', reportData);

    Alert.alert('Success', 'Your report has been submitted!');
    navigation?.goBack();
  };

  return (
    <View style={Globalstyles.container}>
      <View style={Globalstyles.header}>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Post a Review</Text>
        </View>
        <View style={styles.righticons}>
          <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => { navigation.navigate('Notification') }} />
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
            setErrors((prev) => ({ ...prev, reason: '' })); // Clear error
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
          onChangeText={(text) => setAdditionalDetails(text)}
          textAlignVertical='top'
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReportPage;
