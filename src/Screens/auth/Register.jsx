import React, { useState } from "react";
import {
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    ScrollView,
    SafeAreaView,
    ActivityIndicator
} from "react-native";
import styles from "../StyleScreens/RegisterStyle";
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import Colors from "../../utils/Colors";
import axios from "axios";
import { SIGNUP_ENDPOINT } from "../../utils/BaseUrl";
import Toast from "react-native-toast-message";

const Register = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [gender, setGender] = useState(null);
    const [mobileNumber, setMobileNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmpassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false); // Loader state

    const validateFields = () => {
        const newErrors = {};
        if (!mobileNumber) newErrors.mobileNumber = "Mobile number is required.";
        else if (!/^\d{10}$/.test(mobileNumber)) newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
        if (!fullName) newErrors.fullName = "Full name is required.";
        if (!selectedDate) newErrors.selectedDate = "Date of Birth is required.";
        if (!selectedCity) newErrors.selectedCity = "City is required.";
        if (!gender) newErrors.gender = "Gender is required.";
        if (!password) newErrors.password = "Password is required.";
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const HandleSignup = async () => {
        if (!validateFields()) {
            return;
        }

        setIsLoading(true); // Start loader
        try {
            const formattedDate = selectedDate
                ? `${selectedDate.getDate().toString().padStart(2, "0")}/${(selectedDate.getMonth() + 1).toString().padStart(2, "0")
                }/${selectedDate.getFullYear()}`
                : null;

            const payload = {
                username: fullName.trim(),
                mobileNo: mobileNumber,
                password: password,
                gender: gender,
                dob: formattedDate,
                city: selectedCity,
            };

            const response = await axios.post(SIGNUP_ENDPOINT, payload);
            const message = response.data.message;

            if (message === "User already exists! Please sign in.") {
                Toast.show({
                    type: "success",
                    text1: "Sign Up Successful",
                    text2: "You have successfully signed up!",
                    position: 'top',
                    visibilityTime: 1000,
                    textStyle: { fontSize: 10, color: "green" },
                    onHide: () => navigation.navigate("Login")
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: "Sign Up Error",
                    text2: message,
                    position: 'top',
                    visibilityTime: 1000,
                    textStyle: { fontSize: 10, color: "red" },
                });
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Sign Up Error",
                text2: error.message,
                position: 'top',
                visibilityTime: 1000,
                textStyle: { fontSize: 10, color: "red" },
            });
        } finally {
            setIsLoading(false); // Stop loader
        }
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
                            maxLength={10}
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
                    <View>
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

                    {/* Create Password */}
                    <View>
                        <Text style={styles.title}>Create Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                secureTextEntry={!showPassword}
                                placeholder="Create a strong password"
                                value={password}
                                onChangeText={setPassword}
                                placeholderTextColor={'gray'}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <AntDesign
                                    name={showPassword ? "eye" : "eyeo"}
                                    size={20}
                                    style={styles.eyeIcon}
                                    color={Colors.dark}
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}
                    </View>

                    {/* Confirm Password */}
                    <View>
                        <Text style={styles.title}>Confirm Password</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                secureTextEntry={!showConfirmPassword}
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChangeText={setConfirmpassword}
                                placeholderTextColor={'gray'}
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <AntDesign
                                    name={showConfirmPassword ? "eye" : "eyeo"}
                                    size={20}
                                    style={styles.eyeIcon}
                                    color={Colors.dark}
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.confirmPassword && (
                            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                        )}
                    </View>

                    {/* Continue Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={HandleSignup}
                        disabled={isLoading} // Disable button when loading
                    >
                        {isLoading ? (
                            <ActivityIndicator  size={'large'} color={Colors.light} />
                        ) : (
                            <Text style={styles.buttonText}>Sign Up</Text>
                        )}
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
            <Toast />
        </SafeAreaView>
    );
};

export default Register;
