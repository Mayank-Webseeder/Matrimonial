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

const Login = ({ navigation }) => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
   const dispatch=useDispatch();
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
                password: password,
            };
    
            console.log("Login payload:", payload);
    
            const response = await axios.post(LOGIN_ENDPOINT, payload);
            const LoginData = response.data;
            const token = LoginData.user.token;
    
            console.log("Token from response:", token);
    
            // Store the token in AsyncStorage
            await AsyncStorage.setItem("userToken", token);
    
            // Retrieve the token from AsyncStorage to confirm it was stored correctly
            const storedToken = await AsyncStorage.getItem("userToken");
            console.log("Retrieved token from AsyncStorage:", storedToken);
    
            console.log("LoginData:", LoginData);
    
            dispatch(setLoginData(LoginData));
            const message = response.data.message;
    
            if (response.status === 200 && message === "Login successful") {
                Toast.show({
                    type: "success",
                    text1: "Login Successful",
                    text2: "You have Logged in!",
                    position: "top",
                    visibilityTime: 1000,
                    textStyle: { fontSize: 10, color: "green" },
                    onHide: () => navigation.navigate("MainApp"),
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: "Login Failed",
                    text2: response.data.message || "Invalid credentials. Please try again.",
                    position: "top",
                    visibilityTime: 2000,
                    textStyle: { fontSize: 12, color: "red" },
                });
            }
        } catch (error) {
            setLoading(false);
    
            if (error.response && error.response.status === 401) {
                Toast.show({
                    type: "error",
                    text1: "Unauthorized",
                    text2: "Invalid mobile number or password. Please try again.",
                    position: "top",
                    visibilityTime: 1000,
                    textStyle: { fontSize: 10, color: "red" },
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Something went wrong. Please try again.",
                    position: "top",
                    visibilityTime: 1000,
                    textStyle: { fontSize: 10, color: "red" },
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
                    <Text style={styles.phoneText}>Phone Number</Text>
                    <TextInput
                        style={styles.inputText}
                        keyboardType="numeric"
                        placeholder="Enter your mobile number"
                        value={mobileNumber}
                        onChangeText={setMobileNumber}
                        placeholderTextColor={'gray'}
                    />
                    {errors.mobileNumber && (
                        <Text style={styles.errorText}>{errors.mobileNumber}</Text>
                    )}

                    {/* Password */}
                    <Text style={styles.password}>Password</Text>

                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            secureTextEntry={!passwordVisible}
                            placeholder="Create a strong password"
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor={'gray'}
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

                    {/* Login Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="large" color={Colors.light}/>
                        ) : (
                            <Text style={styles.buttonText}>Login</Text>
                        )}
                    </TouchableOpacity>

                   <Toast/>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Login;
