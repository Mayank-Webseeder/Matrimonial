import React, { useState } from "react";
import { Text, View, ImageBackground, TouchableOpacity, TextInput, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import styles from "../StyleScreens/LoginStyle";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";
import { LOGIN_ENDPOINT } from "../../utils/BaseUrl";
import Colors from "../../utils/Colors";
import { useDispatch } from "react-redux";
import { setLoginData } from "../../ReduxStore/Slices/authSlice";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeSocket } from "../../../socket";

const Login = ({ navigation }) => {

    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const validateFields = () => {
        const newErrors = {};
        if (!mobileNumber) newErrors.mobileNumber = "Mobile number is required.";
        if (!password) newErrors.password = "Password is required.";

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
    
            // ✅ Debugging Response Status
            console.log("🟢 Response Status:", response.status);
            console.log("🟢 Response Data Success:", response.data.success);
    
            if (response.status === 200 && response.data.status === true) {
                // ✅ Extract and store token & userId
                const token = LoginData?.user?.token;
                const userId = LoginData?.user?.user?.id;
    
                if (!token || !userId) {
                    throw new Error("❌ Invalid response structure");
                }
    
                await AsyncStorage.setItem("userToken", token);
                await AsyncStorage.setItem("userId", userId);
    
                console.log("🔐 Token Saved:", token);
                console.log("🆔 User ID Saved:", userId);
    
                dispatch(setLoginData(LoginData));
    
                // ✅ Initialize Socket after login
                try {
                    initializeSocket(userId);
                    console.log(`✅ Socket initialized successfully for user: ${userId}`);
                } catch (socketError) {
                    console.error("🚨 Socket Initialization Failed:", socketError);
                }
    
                Toast.show({
                    type: "success",
                    text1: "Login Successful",
                    text2: "You have logged in!",
                    position: "top",
                    visibilityTime: 1000,
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
                Toast.show({
                    type: "error",
                    text1: "Login Failed",
                    text2: LoginData.message || "Invalid credentials. Please try again.",
                    position: "top",
                    visibilityTime: 2000,
                    textStyle: { fontSize: 14, color: "white" },
                    backgroundColor: "red",
                });
            }
        } catch (error) {
            console.error("🚨 Login Error:", error);
    
            if (error.response?.status === 400) {
                console.error("❌ Unauthorized:", error.response.data);
                Toast.show({
                    type: "error",
                    text1: "Unauthorized",
                    text2: error.response.data.message || "Invalid mobile number or password.",
                    position: "top",
                    visibilityTime: 2000,
                    textStyle: { fontSize: 14, color: "white" },
                    backgroundColor: "red",
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Something went wrong. Please try again.",
                    position: "top",
                    visibilityTime: 2000,
                    textStyle: { fontSize: 14, color: "white" },
                    backgroundColor: "red",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require("../../Images/LoginBackground.png")}
                style={styles.image}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.text}>Login</Text>
                    <Text style={styles.passwordText}>
                        Enter phone number to send one time Password
                    </Text>

                    {/* Mobile Number */}
                    <Text style={styles.HeadingText}>Phone Number</Text>
                    <TextInput
                        style={styles.inputText}
                        keyboardType="numeric"
                        placeholder="Enter your mobile number"
                        value={mobileNumber}
                        onChangeText={setMobileNumber}
                        placeholderTextColor={Colors.gray}
                        maxLength={10}
                        autoComplete="off"
                        textContentType="none"
                    />
                    {errors.mobileNumber && (
                        <Text style={styles.errorText}>{errors.mobileNumber}</Text>
                    )}

                    {/* Password */}
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

                    <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => navigation.navigate('ForgotScreen')}>
                        <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                    </TouchableOpacity>
                    {/* Login Button */}
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

                </ScrollView>
            </ImageBackground>
            <Toast />
        </SafeAreaView>
    );
};

export default Login;
