import {StyleSheet,Text,View,TextInput,TouchableOpacity,ScrollView,StatusBar,SafeAreaView,ToastAndroid} from "react-native";
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
            username,
            dob,
            city,
            gender,
        };

        const response = await axios.put(UPDATE_PROFILE, payload, { headers });
        const message = response?.data?.message;
        console.log("Profile update response:", response.data);

        if (message && message.includes("User profile updated successfully.")) {
            ToastAndroid.show("Profile Updated Successfully!", ToastAndroid.SHORT);
            navigation.navigate("MainApp");
        } else {
            ToastAndroid.show(message || "Your profile has been updated.", ToastAndroid.SHORT);
        }

    } catch (error) {
        if (error.response) {
            console.error("API Error:", error.response.data);
            ToastAndroid.show(error.response.data.message || "Unable to update profile. Please try again.", ToastAndroid.SHORT);
        } else {
            console.error("Error updating profile:", error.message);
            ToastAndroid.show("Something went wrong. Please try again later.", ToastAndroid.SHORT);
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

        {/* <Text style={Globalstyles.title}>Mobile Number</Text>
        <TextInput
          style={Globalstyles.input}
          placeholder="Enter your mobile number"
          keyboardType="phone-pad"
          value={mobileNo}
          onChangeText={setMobileNo}
          placeholderTextColor={Colors.gray}
        /> */}

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
    backgroundColor:Colors.theme_color,
        paddingVertical: SH(5),
        borderRadius: 5,
        alignItems: 'center',
        marginTop: SH(20),
        marginBottom: SH(80)
  },
  updateButtonText: {
    color: Colors.light,
    fontSize: SF(15),
    fontWeight: 'Poppins-Bold',
    textTransform:"capitalize"
  },
});
