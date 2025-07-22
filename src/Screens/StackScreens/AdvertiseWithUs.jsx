import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Linking, ActivityIndicator, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/AdvertiseWithUsStyle';
import { ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ADVERTISE_WITH_US } from '../../utils/BaseUrl';
import { showMessage } from 'react-native-flash-message';
import { SF, SH, SW } from '../../utils/Dimensions';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AdvertiseWithUs = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [fullName, setFullname] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateFields = () => {
        const newErrors = {};

        if (!mobileNo) {newErrors.mobileNo = 'Mobile number is required.';}
        else if (!/^\d{10}$/.test(mobileNo)) {newErrors.mobileNo = 'Enter a valid 10-digit mobile number.';}

        if (!fullName) {
            newErrors.fullName = 'fullName is required.';
        } else if (!/^[A-Za-z\s]+$/.test(fullName)) {
            newErrors.fullName = 'fullName must contain only letters.';
        } else if (fullName.length > 15) {
            newErrors.fullName = 'fullName cannot exceed 15 characters.';
        }
        if (!email.trim()) {newErrors.email = 'email is required.';}
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            if (!validateFields()) {return;}
            const token = await AsyncStorage.getItem('userToken'); // ✅ Fetch Token
            if (!token) {throw new Error('No token found');}

            const payload = {
                fullName,
                email,
                phoneNumber: mobileNo,
                message,
            };

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            console.log('Payload:', payload);

            const response = await axios.post(ADVERTISE_WITH_US, payload, { headers });
            console.log('Feedback response:', JSON.stringify(response.data));

            // ✅ Ensure response is successful
            if (response.status === 200 && response.data.status === true) {
                showMessage({
                    type: 'success',
                    message: 'Success',
                    description: response.data.message || 'Your Advertise Request has been submitted successfully!',
                    icon: 'success',
                    duarion: 7000,
                });

                setTimeout(() => {
                    navigation.navigate('MainApp');
                }, 2000);
                return;
            }

            // ❌ If response is not successful, throw an error
            throw new Error(response.data.message || 'Something went wrong');

        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error('Error fetching biodata:', errorMsg);
            showMessage({
                type: 'danger',
                message: 'Error',
                description: errorMsg,
                icon: 'danger',
                duarion: 7000,
            });
            const sessionExpiredMessages = [
                'User does not Exist....!Please login again',
                'Invalid token. Please login again',
                'Token has expired. Please login again',
            ];

            if (sessionExpiredMessages.includes(errorMsg)) {
                await AsyncStorage.removeItem('userToken');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AuthStack' }],
                });
            }
            setIsLoading(false);
        }
        finally {
            setIsLoading(false);

        }
    };

    const handleTextChange = (text) => {
        const wordArray = text.trim().split(/\s+/); // splits by whitespace
        if (wordArray.length <= 300) {
            setMessage(text);
        } else {
            const trimmedText = wordArray.slice(0, 300).join(' ');
            setMessage(trimmedText);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light }}>
            {/* Header */}
            <View style={Globalstyles.header}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../Images/menu.png')} style={{ width: SW(30), height: SH(30) }} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Advertise with Us</Text>
                </View>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
                >

                <ScrollView showsVerticalScrollIndicator={false} removeClippedSubviews={true} keyboardShouldPersistTaps="handled">
                    <View>
                        <ImageBackground
                            source={require('../../Images/Advertisement.jpeg')}
                            style={styles.background}
                            resizeMode="contain"
                        >

                            {/* Contact Info Section */}
                            <View style={styles.overlay}>
                                <View style={styles.contactCard1}>
                                    <View style={styles.iconContainer}>
                                        <MaterialIcons name="phone" size={11} color={Colors.dark} />
                                        <Text
                                            style={[styles.contactText, { color: Colors.dark, fontSize: SF(9.5), fontFamily: 'Poppins-Bold' }]}
                                            onPress={() => Linking.openURL('tel:8871186630')}
                                        >
                                            8871186630 🤙
                                        </Text>
                                    </View>
                                    <View style={styles.iconContainer}>
                                        <MaterialIcons name="phone" size={11} color={Colors.dark} />
                                        <Text
                                            style={[styles.contactText, { color: Colors.dark, fontSize: SF(9.5), fontFamily: 'Poppins-Bold' }]}
                                            onPress={() => Linking.openURL('tel:8602210689')}
                                        >
                                            8602210689 🤙
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.contactCard}>
                                    <View style={styles.iconContainer}>
                                        {/* <MaterialIcons name="email" size={11} color={Colors.light} /> */}
                                        <Text
                                            style={styles.contactText}
                                            onPress={() => Linking.openURL('mailto:brahminmilan.in@gmail.com')}
                                        >
                                            brahminmilan.in@gmail.com
                                        </Text>
                                    </View>

                                    <View style={styles.iconContainer}>
                                        {/* <MaterialIcons name="email" size={11} color={Colors.light} /> */}
                                        <Text
                                            style={styles.contactText}
                                            onPress={() => Linking.openURL('mailto:appwin.in@gmail.com')}
                                        >
                                            appwin.in@gmail.com
                                        </Text>
                                    </View>
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
                                autoCorrect={false}
                            />

                            {errors.fullName && (
                                <Text style={styles.errorText}>{errors.fullName}</Text>
                            )}
                            <Text style={Globalstyles.title}>Email</Text>
                            <TextInput style={[Globalstyles.input, errors.email && styles.errorInput]} placeholder="Enter Email" value={email} onChangeText={setEmail} keyboardType="email-address"
                                placeholderTextColor={Colors.gray}
                                autoComplete="off"
                                textContentType="email"
                                importantForAutofill="no"
                                autoCorrect={false}
                            />
                            {errors.email && (
                                <Text style={styles.errorText}>{errors.email}</Text>
                            )}

                            <Text style={Globalstyles.title}>Phone No</Text>
                            <TextInput style={[Globalstyles.input, errors.email && styles.errorInput]} placeholder="Enter Mobile Number" value={mobileNo}
                                onChangeText={(text) => setMobileNo(text.replace(/[^0-9]/g, ''))}
                                keyboardType="phone-pad" maxLength={10}
                                placeholderTextColor={Colors.gray}
                                autoComplete="off"
                                textContentType="none"
                                importantForAutofill="no"
                                autoCorrect={false}
                            />

                            {errors.mobileNo && (
                                <Text style={styles.errorText}>{errors.mobileNo}</Text>
                            )}

                            <Text style={Globalstyles.title}>Message</Text>
                            <TextInput
                                style={[Globalstyles.textInput]}
                                placeholder="Write your message..."
                                value={message}
                                textAlignVertical="top"
                                placeholderTextColor={Colors.gray}
                                onChangeText={handleTextChange}
                                multiline
                                autoComplete="off"
                                textContentType="none"
                                importantForAutofill="no"
                                autoCorrect={false}
                            />
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
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default AdvertiseWithUs;
