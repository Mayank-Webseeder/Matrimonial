import React, { useState } from "react";
import { Text, View, ImageBackground, TouchableOpacity, TextInput, ScrollView, SafeAreaView, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import styles from "../StyleScreens/LoginStyle";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";
import { LOGIN_ENDPOINT } from "../../utils/BaseUrl";
import Colors from "../../utils/Colors";
import { useDispatch } from "react-redux";
import { setLoginData } from "../../ReduxStore/Slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { SH } from "../../utils/Dimensions";
// import { SafeAreaView } from 'react-native-safe-area-context';

const Login = ({ navigation }) => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const validateFields = () => {
        const newErrors = {};

        if (!mobileNumber?.trim()) {
            newErrors.mobileNumber = "Mobile number is required.";
        } else if (!/^[0-9]{10}$/.test(mobileNumber.trim())) {
            newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
        }

        if (!password?.trim()) {
            newErrors.password = "Password is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validateFields()) {
            return;
        }
        setLoading(true);

        try {
            const payload = {
                mobileNo: mobileNumber.trim(),
                password: password.trim(),
            };

            console.log("📤 Login payload:", payload);

            const response = await axios.post(LOGIN_ENDPOINT, payload);
            const LoginData = response.data;
            console.log("🔑 LoginData:", LoginData);
            console.log("🟢 Response Status:", response.status);
            console.log("🟢 Response Data Success:", response.data.success);

            if (response.status === 200 && response.data.status === true) {
                const token = LoginData?.user?.token;
                const userId = LoginData?.user?.user?.id;

                if (!token || !userId) {
                    throw new Error("❌ Invalid response structure");
                }

                await AsyncStorage.setItem("userToken", token);
                await AsyncStorage.setItem("userId", userId);

                // initializeSocket(userId);

                console.log("🔐 Token Saved:", token);
                console.log("🆔 User ID Saved:", userId);

                dispatch(setLoginData(LoginData));

                showMessage({
                    type: "success",
                    message: "Login Successful",
                    description: "You have logged in!",
                    visibilityTime: 1000,
                    icon: "success",
                    duration: 3000,
                    textStyle: { fontSize: 14, color: "white" },
                    onHide: () => {
                        console.log("🟢 Navigating to AppStack...");
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "AppStack" }],
                        });
                    },
                });
            } else {
                console.log("❌ Login failed: Invalid credentials.");
                showMessage({
                    type: "danger",
                    message: "Login Failed",
                    description: LoginData.message || "Invalid credentials. Please try again.",
                    duration: 5000,
                    textStyle: { fontSize: 14, color: "white" },
                    icon: "danger"
                });
            }
        } catch (error) {
            console.error("🚨 Login Error:", error);

            if (error.response?.status === 400) {
                console.error("❌ Unauthorized:", error.response.data);
                showMessage({
                    type: "error",
                    message: "Unauthorized",
                    description: error.response.data.message || "Invalid mobile number or password.",
                    duration: 5000,
                    textStyle: { fontSize: 14, color: "white" },
                    backgroundColor: "red",
                });
            } else {
                showMessage({
                    type: "danger",
                    message: "Error",
                    description: "Something went wrong. Please try again.",
                    duration: 5000,
                    textStyle: { fontSize: 14, color: "white" },
                    backgroundColor: "red",
                });
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View>
                        <ImageBackground
                            source={require("../../Images/LoginBackground.png")}
                            style={styles.image}
                        >
                            <View style={{ paddingTop: SH(85) }}>
                                <Text style={styles.text}>Login</Text>
                                <Text style={styles.passwordText}>
                                    Enter phone number to send one time Password
                                </Text>

                                {/* Mobile Number */}
                                <View>
                                    <Text style={styles.HeadingText}>Phone Number</Text>
                                    <TextInput
                                        style={styles.inputText}
                                        keyboardType='phone-pad'
                                        placeholder="Enter your mobile number"
                                        value={mobileNumber}
                                        onChangeText={(text) => setMobileNumber(text.replace(/[^0-9]/g, ''))}
                                        placeholderTextColor={Colors.gray}
                                        maxLength={10}
                                        autoComplete="off"
                                        textContentType="none"
                                        importantForAutofill="no"
                                        autoCorrect={false}
                                    />
                                    {errors.mobileNumber && (
                                        <Text style={styles.errorText}>{errors.mobileNumber}</Text>
                                    )}
                                </View>

                                {/* Password */}
                                <View>
                                    <Text style={styles.HeadingText}>Password</Text>

                                    <View style={styles.passwordContainer}>
                                        <TextInput
                                            style={styles.passwordInput}
                                            secureTextEntry={!passwordVisible}
                                            placeholder="Enter Your Password"
                                            value={password}
                                            onChangeText={setPassword}
                                            placeholderTextColor={Colors.gray}
                                            autoComplete="off"
                                            textContentType="none"
                                            importantForAutofill="no"
                                            autoCorrect={false}
                                        />
                                        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                            <AntDesign
                                                name={passwordVisible ? "eye" : "eyeo"}
                                                size={20}
                                                style={styles.eyeIcon}
                                                color={Colors.theme_color}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {errors.password && (
                                        <Text style={styles.errorText}>{errors.password}</Text>
                                    )}

                                </View>
                                <View>
                                    <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => navigation.navigate('ForgotScreen')}>
                                        <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                                    </TouchableOpacity>
                                </View>
                                {/* Login Button */}
                                <View>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={handleLogin}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <ActivityIndicator size="large" color={Colors.light} />
                                        ) : (
                                            <Text style={styles.buttonText}>Login</Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Login;
