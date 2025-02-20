import React, { useState } from "react";
import { Text, View, ImageBackground, TouchableOpacity, TextInput, ScrollView, SafeAreaView, ActivityIndicator, FlatList } from "react-native";
import styles from "../StyleScreens/RegisterStyle";
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import Colors from "../../utils/Colors";
import axios from "axios";
import { SIGNUP_ENDPOINT, OTP_ENDPOINT } from "../../utils/BaseUrl";
import Toast from "react-native-toast-message";
import { CityData, genderData } from "../../DummyData/DropdownData";
import Globalstyles from "../../utils/GlobalCss";
import ImageCropPicker from 'react-native-image-crop-picker';
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
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImageName, setSelectedImageName] = useState("Upload Image");
    const [selectedImage, setSelectedImage] = useState(null);
    const [otpSent, setOtpSent] = useState(false);
    const [isOtpLoading, setIsOtpLoading] = useState(false);

    const handleImageUpload = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 250,
            cropping: true,
            includeBase64: true,
            mediaType:"any"
        })
        .then(image => {
            console.log('Selected Image:', image); // Check the image object
            if (!image.data) {
                console.error("Base64 data is missing!");
                return;
            }
            setSelectedImage(image.data); // Ensure this is set correctly
            setSelectedImageName(image.path.split('/').pop());
        })
        .catch(error => {
            console.error('Image Picking Error:', error);
        });
        
    };

    const handleCityInputChange = (text) => {
        setCityInput(text);
        const filtered = CityData.filter((item) =>
            item.label.toLowerCase().includes(text.toLowerCase())
        ).map((item) => item.label);

        setFilteredCities(filtered);
        const exactMatch = CityData.find((item) => item.label.toLowerCase() === text.toLowerCase());
        setSelectedCity(exactMatch ? exactMatch.label : null);
    };

    const validateFields = () => {
        const newErrors = {};

        if (!mobileNumber) newErrors.mobileNumber = "Mobile number is required.";
        else if (!/^\d{10}$/.test(mobileNumber)) newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";

        if (!fullName) newErrors.fullName = "Full name is required.";
        if (!selectedDate) newErrors.selectedDate = "Date of Birth is required.";
        if (!cityInput.trim()) newErrors.selectedCity = "City is required.";
        if (!gender) newErrors.gender = "Gender is required.";
        if (!password) newErrors.password = "Password is required.";
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
        if (!otp) newErrors.otp = "OTP is required.";
        else if (!/^\d{6}$/.test(otp)) newErrors.otp = "Enter a valid 6-digit OTP.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSendOtp = async () => {
        if (!/^\d{10}$/.test(mobileNumber)) {
            Toast.show({ type: "error", text1: "Invalid Number", text2: "Enter a valid 10-digit mobile number" });
            return;
        }

        try {
            setIsOtpLoading(true);
            const response = await axios.post(OTP_ENDPOINT, { mobileNo: mobileNumber });
            console.log("OTP Response:", response.data);

            if (response.status === 200 && response.data.success) {
                setOtpSent(true);  // Mark OTP as sent
                Toast.show({ type: "success", text1: "OTP Sent", text2: "Check your SMS for the OTP" });
            } else {
                throw new Error(response.data.message || "OTP request failed");
            }
        } catch (error) {
            console.error("OTP Error:", error);
            Toast.show({ type: "error", text1: "OTP Error", text2: "Failed to send OTP. Try again." });
        } finally {
            setIsOtpLoading(false);
        }
    };

    const handleSignup = async () => {
        if (!validateFields()) return;

        // Manually entered OTP
        if (!otp || otp.length !== 6) {
            Toast.show({ type: "error", text1: "Invalid OTP", text2: "Please enter the correct OTP." });
            return;
        }

        setIsLoading(true);
        try {
            const formattedDate = selectedDate ?
                `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`
                : null;

            const payload = {
                username: fullName.trim(),
                dob: formattedDate,
                city: selectedCity || cityInput.trim(),
                gender: gender,
                password: password,
                photoUrl:selectedImage,
                mobileNo: mobileNumber,
                otp: otp,  
            };

            console.log("SignUp Payload:", payload);
            const response = await axios.post(SIGNUP_ENDPOINT, payload);
            console.log("Signup Response:", response.data);

            if (response.status === 200 && response.data.message === "User account created successfully.") {
                Toast.show({
                    type: "success",
                    text1: "Sign Up Successful",
                    text2: "You have successfully signed up!",
                    onHide: () => navigation.navigate("Login"),
                });
            } else {
                throw new Error(response.data.message || "Signup failed");
            }
        } catch (error) {
            console.error("Sign Up Error:", error);
            Toast.show({ type: "error", text1: "Sign Up Error", text2: error.message || "An error occurred. Please try again." });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDateChange = (event, date) => {
        if (date && date !== selectedDate) {
            setSelectedDate(date);
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
                            <Text style={Globalstyles.title}>Date of Birth</Text>
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
                            placeholder="Enter your city"
                            placeholderTextColor={Colors.gray}
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
                        ) : cityInput && (
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedCity(cityInput);
                                    setFilteredCities([]);
                                }}
                            >
                            </TouchableOpacity>
                        )}


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
                            placeholderStyle={{ color: '#E7E7E7' }}
                        />

                        {errors.gender && (
                            <Text style={styles.errorText}>{errors.gender}</Text>
                        )}

                        <View>
                            <Text style={Globalstyles.title}>Create Password</Text>
                            <View style={Globalstyles.inputContainer}>
                                <TextInput
                                    style={Globalstyles.input1}
                                    secureTextEntry={!showPassword}
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholderTextColor={Colors.gray}
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
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmpassword}
                                    placeholderTextColor={Colors.gray}
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
                        <Text style={Globalstyles.title}>Upload Your Profile Image</Text>
                        <View style={Globalstyles.input}>
                            <TouchableOpacity onPress={handleImageUpload}>
                                <Text style={styles.imagePlaceholder}>{selectedImageName}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Mobile Number */}
                        <Text style={Globalstyles.title}>Mobile Number</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TextInput
                                style={[Globalstyles.input, { flex: 1 }]}
                                keyboardType="numeric"
                                placeholder="Enter your mobile number"
                                value={mobileNumber}
                                onChangeText={setMobileNumber}
                                maxLength={10}
                                placeholderTextColor={Colors.gray}
                                editable={!otpSent}
                            />
                            <TouchableOpacity style={styles.otpButton} onPress={handleSendOtp} disabled={isOtpLoading}>
                                {isOtpLoading ? <ActivityIndicator size="small" color={Colors.theme_color}/> : <Text style={styles.otpButtonText}>Send OTP</Text>}
                            </TouchableOpacity>

                        </View>
                        {/* Mobile Number */}
                        <Text style={Globalstyles.title}>Otp</Text>

                        <TextInput style={Globalstyles.input} keyboardType="numeric" placeholder="Enter OTP" value={otp} onChangeText={setOtp} maxLength={6} />

                        {errors.Otp && (
                            <Text style={styles.errorText}>{errors.Otp}</Text>
                        )}
                    </View>
                    {/* Continue Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSignup}
                        disabled={isLoading}
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
