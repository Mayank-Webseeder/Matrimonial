import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView, Image, Linking } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Globalstyles from "../../utils/GlobalCss";
import Colors from "../../utils/Colors";
import styles from "../StyleScreens/AdvertiseWithUsStyle";
import { ImageBackground } from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ADVERTISE_WITH_US } from "../../utils/BaseUrl";

const AdvertiseWithUs = ({ navigation }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");


    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken'); // ✅ Fetch Token
            if (!token) throw new Error('No token found');

            const payload = {
                firstName,
                lastName,
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
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: response.data.message || 'Your Advertise Request has been submitted successfully!',
                });

                setTimeout(() => {
                    navigation.navigate('MainApp');
                }, 2000);
                return;
            }

            // ❌ If response is not successful, throw an error
            throw new Error(response.data.message || "Something went wrong");

        } catch (error) {
            console.error('Error submitting Advertise:', error?.response?.data || error.message);

            let errorMessage = 'Failed to submit Advertise. Please try again later.';
            if (error.response && error.response.status === 400) {
                errorMessage = error.response.data?.message || "Invalid request!";
            }

            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: errorMessage,
            });

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
                                <MaterialIcons name="phone" size={22} color={Colors.light} />
                                <Text
                                    style={styles.contactText}
                                    onPress={() => Linking.openURL("tel:8871186630")}
                                >
                                    8871186630
                                </Text>
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

                {/* Form Fields */}
                <View style={Globalstyles.form}>
                    <Text style={Globalstyles.title}>First Name</Text>
                    <TextInput style={Globalstyles.input} placeholder="Enter First Name" value={firstName} onChangeText={setFirstName}
                        placeholderTextColor={Colors.gray} />

                    <Text style={Globalstyles.title}>Last Name</Text>
                    <TextInput style={Globalstyles.input} placeholder="Enter Last Name" value={lastName} onChangeText={setLastName}
                        placeholderTextColor={Colors.gray} />

                    <Text style={Globalstyles.title}>Email</Text>
                    <TextInput style={Globalstyles.input} placeholder="Enter Email" value={email} onChangeText={setEmail} keyboardType="email-address"
                        placeholderTextColor={Colors.gray} />

                    <Text style={Globalstyles.title}>Phone No</Text>
                    <TextInput style={Globalstyles.input} placeholder="Enter Mobile Number" value={mobileNo} onChangeText={setMobileNo}
                        keyboardType="numeric" maxLength={10}
                        placeholderTextColor={Colors.gray} />

                    <Text style={Globalstyles.title}>Message</Text>
                    <TextInput style={[Globalstyles.textInput]} placeholder="Write your message..." value={message}
                        textAlignVertical='top'
                        placeholderTextColor={Colors.gray}
                        onChangeText={setMessage} multiline />

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Send Message</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Toast />
        </SafeAreaView>
    );
};

export default AdvertiseWithUs;
