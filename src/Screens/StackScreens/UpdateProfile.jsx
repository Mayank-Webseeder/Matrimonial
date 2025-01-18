import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView,StatusBar,SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Colors from '../../utils/Colors';
import Globalstyles from '../../utils/GlobalCss';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SH,SW,SF } from '../../utils/Dimensions';

const UpdateProfile = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [dob, setDob] = useState(new Date());
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleUpdate = () => {
    if (!username || !mobileNo || !city || !gender) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    // Add your API call here to update the profile
    console.log({
      username,
      mobileNo,
      dob: moment(dob).format('YYYY-MM-DD'),
      city,
      gender,
    });

    Alert.alert('Success', 'Profile updated successfully!');
    navigation.goBack(); // Navigate back to the profile screen
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(false);
    setDob(currentDate);
  };

  return (
    <SafeAreaView style={Globalstyles.container}>
         <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <View style={Globalstyles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Update Profile</Text>
        </View>
       
      </View>
      <View style={Globalstyles.form}>
        <Text style={Globalstyles.title}>Username</Text>
        <TextInput
          style={Globalstyles.input}
          placeholder="Enter your name"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={Globalstyles.title}>Mobile Number</Text>
        <TextInput
          style={Globalstyles.input}
          placeholder="Enter your mobile number"
          keyboardType="phone-pad"
          value={mobileNo}
          onChangeText={setMobileNo}
        />

        <Text style={Globalstyles.title}>Date of Birth</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={Globalstyles.input}>
          <Text style={styles.dateText}>{moment(dob).format('DD MMMM YYYY')}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        <Text style={Globalstyles.title}>City</Text>
        <TextInput
          style={Globalstyles.input}
          placeholder="Enter your city"
          value={city}
          onChangeText={setCity}
        />

        <Text style={Globalstyles.title}>Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'Male' && styles.selectedGender]}
            onPress={() => setGender('Male')}
          >
            <Text style={[styles.genderText, gender === 'Male' && styles.selectedGenderText]}>
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'Female' && styles.selectedGender]}
            onPress={() => setGender('Female')}
          >
            <Text style={[styles.genderText, gender === 'Female' && styles.selectedGenderText]}>
              Female
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderButton, gender === 'Other' && styles.selectedGender]}
            onPress={() => setGender('Other')}
          >
            <Text style={[styles.genderText, gender === 'Other' && styles.selectedGenderText]}>
              Other
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateText: {
    fontSize: 14,
    color: Colors.dark_gray,
    paddingTop:SH(8)
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:SH(20),
  },
  genderButton: {
    flex: 1,
    marginHorizontal:SW(5),
    paddingVertical:SW(5),
    borderWidth: 1,
    borderColor: Colors.light_gray,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedGender: {
    backgroundColor: Colors.theme_color,
  },
  genderText: {
    fontSize:SF(14),
    color: Colors.dark_gray,
  },
  selectedGenderText: {
    color: 'white',
  },
  updateButton: {
    backgroundColor: Colors.theme_color,
    paddingVertical:SH(5),
    marginVertical:SH(30),
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontSize:SF(16),
    fontFamily:"Poppins-Medium"
  },
});
