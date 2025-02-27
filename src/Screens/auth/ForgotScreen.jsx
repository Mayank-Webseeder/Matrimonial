import React, { useState } from "react";
import { Text, View, ImageBackground, TouchableOpacity, TextInput, SafeAreaView, ActivityIndicator } from "react-native";
import styles from "../StyleScreens/RegisterStyle";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from "../../utils/Colors";
import axios from "axios";
import {FORGOT_PASSWORD, OTP_ENDPOINT } from "../../utils/BaseUrl";
import Toast from "react-native-toast-message";
import Globalstyles from "../../utils/GlobalCss";
import Entypo from 'react-native-vector-icons/Entypo';
import { SH,SW,SF } from "../../utils/Dimensions";

const ForgotScreen = ({ navigation }) => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [isOtpLoading, setIsOtpLoading] = useState(false);

    const validateFields = () => {
        const newErrors = {};

        if (!mobileNumber?.trim()) {
            newErrors.mobileNumber = "Mobile number is required.";
        } else if (!/^\d{10}$/.test(mobileNumber.trim())) {
            newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
        }

        if (!newPassword?.trim()) {
            newErrors.newPassword = "Password is required.";
        }
        if (!otp?.trim()) {
            newErrors.otp = "OTP is required.";
        } else if (!/^\d{6}$/.test(otp.trim())) {
            newErrors.otp = "Enter a valid 6-digit OTP.";
        }
    
        // Set errors & return validation status
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
                setOtpSent(true);  
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

    const handleForgotPassword = async () => {
        if (!validateFields()) return; // Validate user inputs
    
        setIsLoading(true);
        try {
            const payload = {
                mobileNo: mobileNumber.trim(),
                newPassword: newPassword.trim(),
                otp: otp.trim()
            };
    
            console.log("Forgot Password Payload:", payload);
    
            const response = await axios.post(FORGOT_PASSWORD, payload);
    
            console.log("Forgot Password Response:", response.data);
    
            // ✅ Check if the response contains a success message
            if (response.status === 200 && response.data?.message?.toLowerCase().includes("password is reset successfully")) {
                Toast.show({
                    type: "success",
                    text1: "Password Reset Successful",
                    text2: response.data.message || "You can now log in with your new password.",
                });
    
                // ✅ Redirect user to login screen after reset
                setTimeout(() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }], // Ensure this is the correct screen name
                    });
                }, 1000);
                return; // ✅ Exit function early
            }
    
            throw new Error(response.data.message || "Password reset failed.");
        } catch (error) {
            console.error("Forgot Password Error:", error);
    
            // ✅ Show appropriate error messages
            Toast.show({
                type: "error",
                text1: "Password Reset Failed",
                text2: error.response?.data?.message || error.message || "Something went wrong. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require("../../Images/Signup.png")}
                style={styles.image}
            >
                <AntDesign
                    name={"arrowleft"}
                    size={25}
                    style={styles.backArrow}
                    color={Colors.light}
                    onPress={() => navigation.navigate("Splash")}
                />
                <View style={{marginTop:SH(190),marginHorizontal:SW(20)}}>
            <Text style={[styles.text,{textAlign:"left",fontSize:SF(17)}]}>Reset Your Password</Text>
                    {/* Mobile Number */}
                    <View style={{marginTop:SH(20)}}>
                        <Text style={Globalstyles.title}>Mobile Number <Entypo name={'star'} color={'red'} size={12} /></Text>
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
                                {isOtpLoading ? <ActivityIndicator size="small" color={Colors.theme_color} /> : <Text style={styles.otpButtonText}>Send OTP</Text>}
                            </TouchableOpacity>

                        </View>
                    </View>
                    {/* Mobile Number */}
                    <Text style={Globalstyles.title}>Otp <Entypo name={'star'} color={'red'} size={12} /></Text>

                    <TextInput style={Globalstyles.input} keyboardType="numeric"
                     placeholder="Enter Your OTP" value={otp} onChangeText={setOtp} maxLength={6}
                     placeholderTextColor={Colors.gray} />

                    {errors.Otp && (
                        <Text style={styles.errorText}>{errors.Otp}</Text>
                    )}
                    <View>
                        <Text style={Globalstyles.title}>New Password  <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <View style={Globalstyles.inputContainer}>
                            <TextInput
                                style={Globalstyles.input1}
                                secureTextEntry={!showPassword}
                                placeholder="Enter Your New password"
                                value={newPassword}
                                onChangeText={setNewPassword}
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
                    {/* Continue Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleForgotPassword}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator size={'large'} color={Colors.light} />
                        ) : (
                            <Text style={styles.buttonText}>Reset Password</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <Toast />
        </SafeAreaView>
    );
};

export default ForgotScreen;
