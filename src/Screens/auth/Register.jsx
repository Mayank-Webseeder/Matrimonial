import React, { useState } from "react";
import { Text, View, ImageBackground, TouchableOpacity, TextInput, ScrollView, SafeAreaView } from "react-native";
import styles from "../StyleScreens/RegisterStyle";
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import Colors from "../../utils/Colors";
import axios from "axios";
import { SIGNUP_ENDPOINT } from "../../utils/BaseUrl";

const Register = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [gender, setGender] = useState(null);
    const [mobileNumber, setMobileNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmpassword] = useState("");

    const [errors, setErrors] = useState({}); 

    const validateFields = () => {
        const newErrors = {};
        if (!mobileNumber) newErrors.mobileNumber = "Mobile number is required.";
        if (!fullName) newErrors.fullName = "Full name is required.";
        if (!selectedDate) newErrors.selectedDate = "Date of Birth is required.";
        if (!selectedCity) newErrors.selectedCity = "City is required.";
        if (!gender) newErrors.gender = "Gender is required.";
        // if (!otp) newErrors.otp = "OTP is required.";
        if (!password) newErrors.password = "Password is required.";
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const HandleLogin = async () => {
        // if (!validateFields()) {
        //     return;
        // }
    
        // try {
        //     const formattedDate = selectedDate
        //         ? `${selectedDate.getDate().toString().padStart(2, "0")}/${
        //               (selectedDate.getMonth() + 1).toString().padStart(2, "0")
        //           }/${selectedDate.getFullYear()}`
        //         : null;
    
        //     const payload = {
        //         username: fullName.trim(),
        //         mobileNo: mobileNumber,
        //         password: password,
        //         gender: gender,
        //         dob: formattedDate,
        //         city: selectedCity,
        //     };

        //     console.log("payload",payload);
    
        //     const response = await axios.post(SIGNUP_ENDPOINT, payload);
        //     console.log("Sign up Data", JSON.stringify(response.data));
    
        //     navigation.navigate("LoginSuccess");
        // } catch (error) {
        //     console.error("Sign up error:", error.message);
        // }
        navigation.navigate("LoginSuccess");
    };
    

    const handleDateChange = (event, date) => {
        if (date) setSelectedDate(date);
        setShowDatePicker(false);
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const cityData = [
        { label: "Indore", value: "Indore" },
        { label: "Bhopal", value: "Bhopal" },
        { label: "Gwalior", value: "Gwalior" },
    ];

    const genderData = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require("../../Images/InformationBackground.png")}
                style={styles.image}
            >
                <AntDesign
                    name={"arrowleft"}
                    size={25}
                    style={styles.backArrow}
                    color={Colors.light}
                    onPress={() => navigation.navigate("Splash")}
                />
                <ScrollView style={styles.contentContainer}>
                    <Text style={styles.text}>Sign Up</Text>

                    {/* Mobile Number */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Mobile Number</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Enter your mobile number"
                            value={mobileNumber}
                            onChangeText={setMobileNumber}
                            placeholderTextColor={Colors.gray}
                        />
                        {errors.mobileNumber && (
                            <Text style={styles.errorText}>{errors.mobileNumber}</Text>
                        )}
                    </View>

                    {/* Full Name */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your full name"
                            value={fullName}
                            onChangeText={setFullName}
                            placeholderTextColor={Colors.gray}
                        />
                        {errors.fullName && (
                            <Text style={styles.errorText}>{errors.fullName}</Text>
                        )}
                    </View>

                    {/* Date of Birth */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Date of Birth</Text>
                        <View style={styles.date}>
                            <Text style={styles.dateText}>
                                {selectedDate ? formatDate(selectedDate) : " "}
                            </Text>
                            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                <AntDesign name={"down"} size={20} style={styles.arrow} />
                            </TouchableOpacity>
                        </View>
                        {errors.selectedDate && (
                            <Text style={styles.errorText}>{errors.selectedDate}</Text>
                        )}
                    </View>

                    {/* City */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>City</Text>
                        <Dropdown
                            data={cityData}
                            labelField="label"
                            valueField="value"
                            placeholder=" "
                            value={selectedCity}
                            onChange={(item) => setSelectedCity(item.value)}
                            style={styles.dropdown}
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownSelectedText}
                        />
                        {errors.selectedCity && (
                            <Text style={styles.errorText}>{errors.selectedCity}</Text>
                        )}
                    </View>

                    {/* Gender */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Gender</Text>
                        <Dropdown
                            data={genderData}
                            labelField="label"
                            valueField="value"
                            placeholder=" "
                            value={gender}
                            onChange={(item) => setGender(item.value)}
                            style={styles.dropdown}
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownSelectedText}
                        />
                        {errors.gender && (
                            <Text style={styles.errorText}>{errors.gender}</Text>
                        )}
                    </View>

                    {/* Enter OTP */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Enter OTP</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Enter the OTP sent to your mobile"
                            value={otp}
                            onChangeText={setOtp}
                            placeholderTextColor={Colors.gray}
                        />
                        {/* {errors.otp && (
                            <Text style={styles.errorText}>{errors.otp}</Text>
                        )} */}
                    </View>

                    {/* Create Password */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Create Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            placeholder="Create a strong password"
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor={Colors.gray}
                        />
                        {errors.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}
                    </View>

                    {/* Confirm Password */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Confirm Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChangeText={setConfirmpassword}
                            placeholderTextColor={Colors.gray}
                        />
                        {errors.confirmPassword && (
                            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                        )}
                    </View>

                    {/* Continue Button */}
                    <TouchableOpacity style={styles.button} onPress={HandleLogin}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>

            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
        </SafeAreaView>
    );
};

export default Register;
