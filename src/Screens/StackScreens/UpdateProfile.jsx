import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, FlatList } from "react-native";
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
import { showMessage } from "react-native-flash-message";
import { CityData } from "../../DummyData/DropdownData";

const UpdateProfile = ({ navigation }) => {
  const ProfileData = useSelector((state) => state.profile);
  const profileData = ProfileData?.profiledata || {};
  const [username, setUsername] = useState(profileData.username || "");
  const [mobileNo, setMobileNo] = useState(profileData.mobileNo || "");
  const [dob, setDob] = useState(profileData.dob ? new Date(profileData.dob) : new Date());
  const [gender, setGender] = useState(profileData.gender || "");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [city, setCity] = useState(profileData.city || "");
  const [filteredCities, setFilteredCities] = useState([]);

  const handleCityInputChange = (text) => {
    setCity(text);

    if (text) {
      const filtered = CityData.filter((item) =>
        item?.label?.toLowerCase().includes(text.toLowerCase())
      ).map(item => item.label);
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  };

  const handleCitySelect = (item) => {
    setCity(item);
    setFilteredCities([]);
  };


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

      console.log("🔹 Sending Profile Update Request to:", UPDATE_PROFILE);
      console.log("🔹 Payload:", payload);

      const response = await axios.put(UPDATE_PROFILE, payload, { headers });

      console.log("✅ Profile Update Response:", JSON.stringify(response.data));

      if (response.status === 200 || response.data.status === true) {
        showMessage({
          type: "success",
          message: "Success",
          description: "Profile Updated Successfully!",
          icon: "none",
          duarion: 5000
        });

        navigation.navigate("MainApp");
      } else {
        throw new Error(response.data.message || "Your profile has been updated, but there was an issue.");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching biodata:", errorMsg);
      showMessage({
        type: "danger",
        message: errorMsg,
        icon: "danger",
        duarion: 5000
      });
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

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === "set" && selectedDate) {
      const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
      setDob(formattedDate);
    }
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
            value={dob ? new Date(dob) : new Date(2000, 0, 1)}
            mode="date"
            display="default"
            maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))} // Prevents age < 18
            onChange={handleDateChange}
            themeVariant="light"
          />
        )}
        <Text style={Globalstyles.title}>City</Text>
        <TextInput
          style={Globalstyles.input}
          value={city}
          onChangeText={handleCityInputChange}
          placeholder="Enter your city"
          placeholderTextColor={Colors.gray}
          autoComplete="off"
          textContentType="none"
        />
        {filteredCities.length > 0 && city.length > 0 ? (
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
    backgroundColor: Colors.theme_color,
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
    textTransform: "capitalize"
  },
});
