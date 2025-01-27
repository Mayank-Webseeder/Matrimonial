import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Colors from "../../utils/Colors";
import Globalstyles from "../../utils/GlobalCss";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { SH, SW, SF } from "../../utils/Dimensions";
import { UPDATE_PROFILE } from "../../utils/BaseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

const UpdateProfile = ({ navigation }) => {
  const ProfileData = useSelector((state) => state.profile);
  const profileData = ProfileData?.profiledata || {};
  const [username, setUsername] = useState(profileData.username || "");
  const [mobileNo, setMobileNo] = useState(profileData.mobileNo || "");
  const [dob, setDob] = useState(profileData.dob ? new Date(profileData.dob) : new Date());
  const [city, setCity] = useState(profileData.city || "");
  const [gender, setGender] = useState(profileData.gender || "");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const update_profile = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("Authorization token is missing.");

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const payload = {
        mobileNo,
        username,
        dob,
        city,
        gender,
      };

      const response = await axios.put(UPDATE_PROFILE, payload, { headers });
      const message = response?.data?.message;
      console.log("message", message);
      if (message === `${username}, your profile has been updated successfully.`) {
        Toast.show({
          type: "success",
          text1: "Profile Updated Successfully",
          text2: "Your profile changes have been saved.",
          position: "top",
          visibilityTime: 3000,
          textStyle: { fontSize: 10, color: "green" },
        });
        navigation.navigate("MainApp");
      } else {
        Toast.show({
          type: "info",
          text1: "Profile Updated",
          text2: message || "Your profile has been updated.",
          position: "top",
          visibilityTime: 3000,
          textStyle: { fontSize: 10, color: "red" },
        });
      }

      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("API Error:", error.response.data);
        Toast.show({
          type: "error",
          text1: "Update Failed",
          text2: error.response.data.message || "Unable to update profile. Please try again.",
          position: "top",
          visibilityTime: 3000,
          textStyle: { fontSize: 10, color: "red" },
        });
      } else {
        console.error("Error updating profile:", error.message);
        Toast.show({
          type: "error",
          text1: "Update Failed",
          text2: "Something went wrong. Please try again later.",
          position: "top",
          visibilityTime: 3000,
          textStyle: { fontSize: 10, color: "red" },
        });
      }
    }
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
      <ScrollView contentContainerStyle={Globalstyles.form}>
        <Text style={Globalstyles.title}>Username</Text>
        <TextInput
          style={Globalstyles.input}
          placeholder="Enter your name"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={Colors.gray}
        />

        <Text style={Globalstyles.title}>Mobile Number</Text>
        <TextInput
          style={Globalstyles.input}
          placeholder="Enter your mobile number"
          keyboardType="phone-pad"
          value={mobileNo}
          onChangeText={setMobileNo}
          placeholderTextColor={Colors.gray}
        />

        <Text style={Globalstyles.title}>Date of Birth</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={Globalstyles.input}>
          <Text style={styles.dateText}>{moment(dob).format("DD MMMM YYYY")}</Text>
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
          placeholderTextColor={Colors.gray}
          value={city}
          onChangeText={setCity}
        />

        <Text style={Globalstyles.title}>Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[styles.genderButton, gender === "male" && styles.selectedGender]}
            onPress={() => setGender("male")}
          >
            <Text
              style={[styles.genderText, gender === "male" && styles.selectedGenderText]}
            >
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.genderButton, gender === "female" && styles.selectedGender]}
            onPress={() => setGender("female")}
          >
            <Text
              style={[styles.genderText, gender === "female" && styles.selectedGenderText]}
            >
              Female
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.updateButton} onPress={update_profile}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>
      <Toast />
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
    paddingTop: SH(8)
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SH(20),
    marginRight: SW(100)
  },
  genderButton: {
    flex: 1,
    marginHorizontal: SW(5),
    paddingVertical: SW(5),
    borderWidth: 1,
    borderColor: Colors.light_gray,
    borderRadius: 5,
    alignItems: 'center',
  },
  selectedGender: {
    backgroundColor: Colors.theme_color,
  },
  genderText: {
    fontSize: SF(14),
    color: Colors.dark_gray,
  },
  selectedGenderText: {
    color: 'white',
  },
  updateButton: {
    backgroundColor: Colors.theme_color,
    paddingVertical: SH(5),
    marginVertical: SH(30),
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontSize: SF(16),
    fontFamily: "Poppins-Medium"
  },
});
