import React, { useState } from "react";
import {
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    ScrollView,
    SafeAreaView,
    ActivityIndicator, FlatList
} from "react-native";
import styles from "../StyleScreens/RegisterStyle";
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import Colors from "../../utils/Colors";
import axios from "axios";
import { SIGNUP_ENDPOINT } from "../../utils/BaseUrl";
import Toast from "react-native-toast-message";
import { CityData, genderData } from "../../DummyData/DropdownData";
import Globalstyles from "../../utils/GlobalCss";
const Register = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [cityInput, setCityInput] = useState('');
    const [filteredCities, setFilteredCities] = useState(CityData);
    const [selectedCity, setSelectedCity] = useState(null);
    const [gender, setGender] = useState(null);
    const [mobileNumber, setMobileNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmpassword] = useState("");
    const [otp, setOtp] = useState("");
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
    };

    const handleDateChange = (event, date) => {
        if (date && date !== selectedDate) {
            setSelectedDate(date); // Only update if date has changed
        }
        setShowDatePicker(false);
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

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
                <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
                    <Text style={styles.text}>Sign Up</Text>

                    <View style={Globalstyles.form}>
                        <Text style={Globalstyles.title}>Full Name</Text>
                        <TextInput
                            style={Globalstyles.input}
                            placeholder="Enter your full name"
                            value={fullName}
                            onChangeText={setFullName}
                            placeholderTextColor={Colors.gray}
                        />
                        {errors.fullName && (
                            <Text style={styles.errorText}>{errors.fullName}</Text>
                        )}
                        {/* Date of Birth */}
                        <View>
                            <Text style={styles.title}>Date of Birth</Text>
                            <View style={Globalstyles.inputContainer}>
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
                        <Text style={Globalstyles.title}>City</Text>
                        <TextInput
                            style={Globalstyles.input}
                            value={cityInput}
                            onChangeText={handleCityInputChange}
                            placeholder="Type your city"
                        />
                        {filteredCities.length > 0 && cityInput ? (
                            <FlatList
                                data={filteredCities}
                                scrollEnabled={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setCityInput(item);
                                            setSelectedCity(item);
                                            setFilteredCities([]);
                                        }}
                                    >
                                        <Text style={Globalstyles.listItem}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                                style={Globalstyles.suggestions}
                            />
                        ) : null}

                        {errors.selectedCity && (
                            <Text style={styles.errorText}>{errors.selectedCity}</Text>
                        )}


                        {/* Gender */}
                        <Text style={Globalstyles.title}>Gender</Text>
                        <Dropdown
                            data={genderData}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Gender"
                            value={gender}
                            onChange={(item) => setGender(item.value)}
                            style={Globalstyles.input}
                        />

                        {errors.gender && (
                            <Text style={styles.errorText}>{errors.gender}</Text>
                        )}

                        {/* Create Password */}
                        <View>
                            <Text style={Globalstyles.title}>Create Password</Text>
                            <View style={Globalstyles.inputContainer}>
                                <TextInput
                                   style={Globalstyles.input1}
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
                            <Text style={Globalstyles.title}>Confirm Password</Text>
                            <View style={Globalstyles.inputContainer}>
                                <TextInput
                                    style={Globalstyles.input1}
                                    secureTextEntry={!showConfirmPassword}
                                    placeholder="Create a strong password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmpassword}
                                    placeholderTextColor={'gray'}
                                />
                                <TouchableOpacity onPress={() => setShowConfirmPassword(!confirmPassword)}>
                                    <AntDesign
                                        name={showPassword ? "eye" : "eyeo"}
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

                        {/* Mobile Number */}
                        <Text style={Globalstyles.title}>Mobile Number</Text>
                        <TextInput
                            style={Globalstyles.input}
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
                        {/* Mobile Number */}
                        <Text style={Globalstyles.title}>Otp</Text>
                        <TextInput
                            style={Globalstyles.input}
                            keyboardType="numeric"
                            placeholder="Enter your otp"
                            value={otp}
                            onChangeText={setOtp}
                            maxLength={6}
                            placeholderTextColor={Colors.gray}
                        />

                        {/* {errors.Otp && (
                            <Text style={styles.errorText}>{errors.Otp}</Text>
                        )} */}
                    </View>
                    {/* Continue Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={HandleSignup}
                        disabled={isLoading} // Disable button when loading
                    >
                        {isLoading ? (
                            <ActivityIndicator size={'large'} color={Colors.light} />
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
