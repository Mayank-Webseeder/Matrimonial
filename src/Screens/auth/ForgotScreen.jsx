import React, { useState } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, TextInput, ActivityIndicator, SafeAreaView, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import styles from '../StyleScreens/RegisterStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import axios from 'axios';
import { FORGOT_PASSWORD, FORGOT_PASSWORD_OTP } from '../../utils/BaseUrl';
import Globalstyles from '../../utils/GlobalCss';
import Entypo from 'react-native-vector-icons/Entypo';
import { SH, SW, SF } from '../../utils/Dimensions';
import { showMessage } from 'react-native-flash-message';
// import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotScreen = ({ navigation }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [isOtpLoading, setIsOtpLoading] = useState(false);

    const validateFields = () => {
        const newErrors = {};

        if (!mobileNumber?.trim()) {
            newErrors.mobileNumber = 'Mobile number is required.';
        } else if (!/^\d{10}$/.test(mobileNumber.trim())) {
            newErrors.mobileNumber = 'Enter a valid 10-digit mobile number.';
        }

        if (!newPassword?.trim()) {
            newErrors.newPassword = 'Password is required.';
        }
        if (!otp?.trim()) {
            newErrors.otp = 'OTP is required.';
        } else if (!/^\d{6}$/.test(otp.trim())) {
            newErrors.otp = 'Enter a valid 6-digit OTP.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSendOtp = async () => {
        if (!/^\d{10}$/.test(mobileNumber)) {
            showMessage({ type: 'danger', message: 'Invalid Number', description: 'Enter a valid 10-digit mobile number', icon: 'danger' });
            return;
        }

        try {
            setIsOtpLoading(true);
            const response = await axios.post(FORGOT_PASSWORD_OTP, { mobileNo: mobileNumber });

            console.log('OTP Response:', response.data);

            if (response.status === 200 && response.data.status === true) {
                setOtpSent(true);
                showMessage({
                    type: 'success',
                    message: 'OTP Sent',
                    description: 'Check your SMS for the OTP',
                    icon: 'success',
                    duration: 5000,
                });
            } else {
                throw new Error(response.data.message || 'OTP request failed');
            }
        } catch (error) {
            console.error('OTP Error:', error);

            if (error.response?.status === 400) {
                showMessage({ type: 'danger', message: 'Invalid Request', description: error.response.data.message || 'Mobile number is required', duration: 5000 });
            } else {
                showMessage({ type: 'danger', message: 'OTP Failed', description: error.message || 'Failed to send OTP. Try again.', icon: 'danger', duration: 5000 });
            }
        } finally {
            setIsOtpLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!validateFields()) { return; }

        setIsLoading(true);
        try {
            const payload = {
                mobileNo: mobileNumber.trim(),
                newPassword: newPassword.trim(),
                otp: otp.trim(),
            };

            console.log('Forgot Password Payload:', payload);

            const response = await axios.post(FORGOT_PASSWORD, payload);

            console.log('Forgot Password Response:', response.data);
            if (response.status === 200 || response.data.status === true) {
                showMessage({
                    type: 'success',
                    message: 'Password Reset Successful',
                    description: response.data.message || 'You can now log in with your new password.',
                    icon: 'success',
                    duration: 5000,
                });
                setTimeout(() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                }, 1000);
                return;
            }

            throw new Error(response.data.message || 'Password reset failed.');
        } catch (error) {
            console.error('Forgot Password Error:', error);
            showMessage({
                type: 'danger',
                message: 'Password Reset Failed',
                description: error.response?.data?.message || error.message || 'Something went wrong. Please try again.',
                icon: 'danger',
                duration: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View>
                        <ImageBackground
                            source={require('../../Images/LoginBackground.png')}
                            style={styles.image}
                        >
                            <AntDesign
                                name={'arrowleft'}
                                size={25}
                                style={styles.backArrow}
                                color={Colors.light}
                                onPress={() => navigation.navigate('Splash')}
                            />
                            <View style={{ marginTop: SH(320), marginHorizontal: SW(20) }}>
                                <Text style={[styles.text, { textAlign: 'left', fontSize: SF(17) }]}>Reset Your Password</Text>
                                <View style={{ marginTop: SH(20) }}>
                                    <Text style={Globalstyles.title}>Mobile Number <Entypo name={'star'} color={'red'} size={12} /></Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TextInput
                                            style={[Globalstyles.input, { flex: 1 }]}
                                            keyboardType="phone-pad"
                                            placeholder="Enter your mobile number"
                                            value={mobileNumber}
                                            onChangeText={setMobileNumber}
                                            maxLength={10}
                                            placeholderTextColor={Colors.gray}
                                            editable={!otpSent}
                                            autoComplete="off"
                                            textContentType="none"
                                            importantForAutofill="no"
                                            autoCorrect={false}
                                        />
                                        <TouchableOpacity style={styles.otpButton} onPress={handleSendOtp} disabled={isOtpLoading}>
                                            {isOtpLoading ? <ActivityIndicator size="small" color={Colors.theme_color} /> : <Text style={styles.otpButtonText}>Send OTP</Text>}
                                        </TouchableOpacity>

                                    </View>
                                </View>
                                {/* Mobile Number */}
                                <Text style={Globalstyles.title}>Otp <Entypo name={'star'} color={'red'} size={12} /></Text>

                                <TextInput style={Globalstyles.input}
                                    placeholder="Enter Your OTP"
                                    value={otp} onChangeText={setOtp} maxLength={6}
                                    placeholderTextColor={Colors.gray}
                                    keyboardType="phone-pad"
                                    autoComplete="off"
                                    textContentType="none"
                                    importantForAutofill="no"
                                    autoCorrect={false}
                                />

                                {errors.otp && (
                                    <Text style={styles.errorText}>{errors.otp}</Text>
                                )}
                                <View>
                                    <Text style={Globalstyles.title}>New Password  <Entypo name={'star'} color={'red'} size={12} /> </Text>
                                    <View style={styles.passwordContainer}>
                                        <TextInput
                                            style={[styles.passwordInput, { paddingVertical: Platform.OS === 'ios' ? SH(10) : SH(10) }]}
                                            secureTextEntry={!showPassword}
                                            placeholder="Enter Your New password"
                                            value={newPassword}
                                            onChangeText={setNewPassword}
                                            placeholderTextColor={Colors.gray}
                                            autoComplete="off"
                                            textContentType="none"
                                            importantForAutofill="no"
                                            autoCorrect={false}
                                        />
                                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                            <AntDesign
                                                name={showPassword ? 'eye' : 'eyeo'}
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
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ForgotScreen;
