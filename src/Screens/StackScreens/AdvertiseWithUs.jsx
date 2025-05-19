import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, Image, Linking, ActivityIndicator } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Globalstyles from "../../utils/GlobalCss";
import Colors from "../../utils/Colors";
import styles from "../StyleScreens/AdvertiseWithUsStyle";
import { ImageBackground } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ADVERTISE_WITH_US } from "../../utils/BaseUrl";
import { showMessage } from "react-native-flash-message";

const AdvertiseWithUs = ({ navigation }) => {
    const [fullName, setFullname] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateFields = () => {
        const newErrors = {};

        if (!mobileNo) newErrors.mobileNo = "Mobile number is required.";
        else if (!/^\d{10}$/.test(mobileNo)) newErrors.mobileNo = "Enter a valid 10-digit mobile number.";

        if (!fullName) {
            newErrors.fullName = "fullName is required.";
        } else if (!/^[A-Za-z\s]+$/.test(fullName)) {
            newErrors.fullName = "fullName must contain only letters.";
        } else if (fullName.length > 15) {
            newErrors.fullName = "fullName cannot exceed 15 characters.";
        }
        if (!email.trim()) newErrors.email = "email is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            if (!validateFields()) return;
            const token = await AsyncStorage.getItem('userToken'); // ✅ Fetch Token
            if (!token) throw new Error('No token found');

            const payload = {
                fullName,
                email,
                phoneNumber: mobileNo,
                message
            };

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            console.log('Payload:', payload);

            const response = await axios.post(ADVERTISE_WITH_US, payload, { headers });
            console.log("Feedback response:", JSON.stringify(response.data));

            // ✅ Ensure response is successful
            if (response.status === 200 && response.data.status === true) {
                showMessage({
                    type: 'success',
                    message: 'Success',
                    description: response.data.message || 'Your Advertise Request has been submitted successfully!',
                    icon: "success",
                    duarion: 7000
                });

                setTimeout(() => {
                    navigation.navigate('MainApp');
                }, 2000);
                return;
            }

            // ❌ If response is not successful, throw an error
            throw new Error(response.data.message || "Something went wrong");

        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error("Error fetching biodata:", errorMsg);
            showMessage({
                type: 'danger',
                message: 'Error',
                description: errorMsg,
                icon: "danger",
                duarion: 7000
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
            setIsLoading(false)
        }
        finally {
            setIsLoading(false)

        }
    };


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light }}>
            {/* Header */}
            <View style={Globalstyles.header}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Advertise with Us</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground source={require('../../Images/advertiseBackground.png')} style={styles.background}>

                    {/* Contact Info Section */}
                    <View style={styles.overlay}>
                        <View style={styles.contactCard}>
                            <Text style={styles.title}>Contact Information</Text>
                            <Text style={styles.subtitle}>Say something to start a live chat!</Text>
                            <View style={styles.iconContainer}>
                                <View style={styles.iconContainer}>
                                    <MaterialIcons name="phone" size={22} color={Colors.light} />
                                    <Text
                                        style={styles.contactText}
                                        onPress={() => Linking.openURL("tel:8871186630")}
                                    >
                                        8871186630
                                    </Text>
                                </View>
                                <View style={styles.iconContainer}>
                                    <MaterialIcons name="phone" size={22} color={Colors.light} />
                                    <Text
                                        style={styles.contactText}
                                        onPress={() => Linking.openURL("tel:8871186630")}
                                    >
                                        8966930727
                                    </Text>
                                </View>
                            </View>

                            {/* <View style={styles.iconContainer}>
                                <MaterialIcons name="phone" size={22} color={Colors.light} />
                                <Text
                                    style={styles.contactText}
                                    onPress={() => Linking.openURL("tel:YOUR_SECOND_NUMBER")}
                                >
                                    YOUR_SECOND_NUMBER
                                </Text>
                            </View> */}

                            <View style={styles.iconContainer}>
                                <MaterialIcons name="email" size={22} color={Colors.light} />
                                <Text
                                    style={styles.contactText}
                                    onPress={() => Linking.openURL("mailto:brahminmilan.in@gmail.com")}
                                >
                                    brahminmilan.in@gmail.com
                                </Text>
                            </View>

                            <View style={styles.iconContainer}>
                                <MaterialIcons name="email" size={22} color={Colors.light} />
                                <Text
                                    style={styles.contactText}
                                    onPress={() => Linking.openURL("mailto:appwin.in@gmail.com")}
                                >
                                    appwin.in@gmail.com
                                </Text>
                            </View>

                            {/* <View style={styles.iconContainer}>
                                <MaterialIcons name="location-on" size={22} color={Colors.light} />
                                <Text style={styles.contactText}>132 Dartmouth Street Boston, MA</Text>
                            </View> */}

                            {/* Social Media Icons */}
                            {/* <View style={styles.socialContainer}>
                                <AntDesign name="twitter" size={20} color={Colors.light} style={styles.socialIcon} />
                                <AntDesign name="instagram" size={20} color={Colors.light} style={styles.socialIcon} />
                                <MaterialIcons name="discord" size={20} color={Colors.light} style={styles.socialIcon} />
                            </View> */}
                        </View>
                    </View>

                </ImageBackground>
                <View style={Globalstyles.form}>
                    <Text style={Globalstyles.title}>Full Name</Text>
                    <TextInput style={[Globalstyles.input, errors.fullName && styles.errorInput]} placeholder="Enter Full Name"
                        value={fullName}
                        onChangeText={(text) => {
                            const cleanText = text.replace(/[^A-Za-z\s]/g, '');
                            setFullname(cleanText);
                        }}
                        placeholderTextColor={Colors.gray}
                        autoComplete="off"
                        textContentType="none"
                        importantForAutofill="no"
                    />

                    {errors.fullName && (
                        <Text style={styles.errorText}>{errors.fullName}</Text>
                    )}
                    <Text style={Globalstyles.title}>Email</Text>
                    <TextInput style={[Globalstyles.input, errors.email && styles.errorInput]} placeholder="Enter Email" value={email} onChangeText={setEmail} keyboardType="email-address"
                        placeholderTextColor={Colors.gray}
                        autoComplete="off"
                        textContentType="none"
                        importantForAutofill="no"
                    />
                    {errors.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                    )}

                    <Text style={Globalstyles.title}>Phone No</Text>
                    <TextInput style={[Globalstyles.input, errors.email && styles.errorInput]} placeholder="Enter Mobile Number" value={mobileNo}
                        onChangeText={(text) => setMobileNo(text.replace(/[^0-9]/g, ''))}
                        keyboardType="numeric" maxLength={10}
                        placeholderTextColor={Colors.gray} />

                    {errors.mobileNo && (
                        <Text style={styles.errorText}>{errors.mobileNo}</Text>
                    )}

                    <Text style={Globalstyles.title}>Message</Text>
                    <TextInput style={[Globalstyles.textInput]} placeholder="Write your message..." value={message}
                        textAlignVertical='top'
                        placeholderTextColor={Colors.gray}
                        onChangeText={setMessage} multiline
                        autoComplete="off"
                        textContentType="none"
                        importantForAutofill="no" />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#ffffff" />
                        ) : (
                            <Text style={styles.buttonText}>Send Message</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AdvertiseWithUs;
