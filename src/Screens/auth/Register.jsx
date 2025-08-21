import React, { useState, useRef, useEffect } from 'react';
import {
    Text, View, ImageBackground, TouchableOpacity, TextInput, ScrollView, SafeAreaView,
    ActivityIndicator, FlatList, Pressable, Alert, KeyboardAvoidingView, BackHandler
} from 'react-native';
import styles from '../StyleScreens/RegisterStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import Colors from '../../utils/Colors';
import axios from 'axios';
import { SIGNUP_ENDPOINT, OTP_ENDPOINT } from '../../utils/BaseUrl';
import { CityData, genderData } from '../../DummyData/DropdownData';
import Globalstyles from '../../utils/GlobalCss';
import ImageCropPicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetBioData } from '../../ReduxStore/Slices/BiodataSlice';
import { useDispatch } from 'react-redux';
import { initializeSocket } from '../../../socket';
import { showMessage } from 'react-native-flash-message';

const Register = ({ navigation }) => {
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [cityInput, setCityInput] = useState('');
    const [filteredCities, setFilteredCities] = useState(CityData);
    const [selectedCity, setSelectedCity] = useState(null);
    const [gender, setGender] = useState(null);
    const [mobileNumber, setMobileNumber] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmpassword] = useState(null);
    const [otp, setOtp] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImageName, setSelectedImageName] = useState('Upload Image');
    const [selectedImage, setSelectedImage] = useState(null);
    const [otpSent, setOtpSent] = useState(false);
    const [isOtpLoading, setIsOtpLoading] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        const checkOtpTime = async () => {
            const storedTime = await AsyncStorage.getItem('otpSentAt');
            if (storedTime) {
                const elapsed = Math.floor((Date.now() - parseInt(storedTime)) / 1000);
                const remaining = otpValidityDuration - elapsed;
                if (remaining > 0) {
                    setOtpTimer(remaining);
                    startOtpCountdown(remaining);
                } else {
                    await AsyncStorage.removeItem('otpSentAt');
                    setOtpTimer(0);
                }
            }
        };

        checkOtpTime();

        return () => {
            if (timerRef.current) { clearInterval(timerRef.current); }
        };
    }, []);

    useEffect(() => {
        const backAction = () => {
            navigation.navigate('Splash');
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const handleCityInputChange = (text) => {
        const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
        setCityInput(filteredText);

        const filtered = CityData.filter((item) =>
            item.label.toLowerCase().includes(filteredText.toLowerCase())
        ).map((item) => item.label);

        setFilteredCities(filtered);

        const exactMatch = CityData.find(
            (item) => item.label.toLowerCase() === filteredText.toLowerCase()
        );
        setSelectedCity(exactMatch ? exactMatch.label : null);
    };


    const validateFields = () => {
        const newErrors = {};

        if (!mobileNumber) {
            newErrors.mobileNumber = 'Mobile number is required.';
        } else if (!/^\d{10}$/.test(mobileNumber)) {
            newErrors.mobileNumber = 'Enter a valid 10-digit mobile number.';
        }

        if (!fullName) {
            newErrors.fullName = 'Full name is required.';
        } else if (!/^[A-Za-z\s]+$/.test(fullName)) {
            newErrors.fullName = 'Name must contain only letters.';
        } else if (fullName.length > 30) {
            newErrors.fullName = 'Name cannot exceed 30 characters.';
        }

        if (!cityInput.trim()) {
            newErrors.selectedCity = 'City is required.';
        }

        if (!gender) {
            newErrors.gender = 'Gender is required.';
        }

        if (!password) {
            newErrors.password = 'Password is required.';
        }

        if (!otp) {
            newErrors.otp = 'OTP is required.';
        } else if (!/^\d{6}$/.test(otp)) {
            newErrors.otp = 'Enter a valid 6-digit OTP.';
        }

        setErrors(newErrors);
        return {
            isValid: Object.keys(newErrors).length === 0,
            newErrors,
        };
    };


    // const formattedDate = selectedDate
    //     ? `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`
    //     : null;


    const otpValidityDuration = 60;

    const startOtpCountdown = (duration) => {
        if (timerRef.current) { clearInterval(timerRef.current); }

        timerRef.current = setInterval(() => {
            setOtpTimer(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    AsyncStorage.removeItem('otpSentAt');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleSendOtp = async () => {
        if (!/^\d{10}$/.test(mobileNumber)) {
            showMessage({
                type: 'danger',
                message: 'Invalid Number',
                description: 'Enter a valid 10-digit mobile number',
                duration: 5000,
            });
            return;
        }

        try {
            setIsOtpLoading(true);
            const response = await axios.post(OTP_ENDPOINT, { mobileNo: mobileNumber });

            console.log('OTP Response:', response.data);

            if (response.status === 200 || response.data.status === true) {
                setOtpSent(true);
                showMessage({
                    type: 'success',
                    message: 'OTP Sent',
                    description: 'Check your SMS for the OTP',
                    icon: 'success',
                    duration: 5000,
                });
                const currentTimestamp = Date.now();
                await AsyncStorage.setItem('otpSentAt', currentTimestamp.toString());

                setOtpTimer(otpValidityDuration);
                startOtpCountdown(otpValidityDuration);
            } else {
                throw new Error(response.data.message || 'OTP request failed');
            }
        } catch (error) {
            console.error('OTP Error:', error);
            const message = error.response?.data?.message || error.message || 'Failed to send OTP';
            showMessage({
                type: 'danger',
                message: 'OTP Failed',
                description: message,
                icon: 'danger',
                duration: 5000,
            });
        } finally {
            setIsOtpLoading(false);
        }
    };


    const handleSignup = async () => {

        const payload = {
            username: fullName.trim(),
            dob: null,
            city: selectedCity || cityInput.trim(),
            gender: gender,
            password: password.trim(),
            photoUrl: selectedImage,
            mobileNo: mobileNumber.trim(),
            otp: otp.trim(),
        };

        const { isValid, newErrors } = validateFields();

        if (!isValid) {
            const errorDetails = Object.values(newErrors).join('\n');

            showMessage({
                type: 'danger',
                message: 'Validation Failed',
                description: errorDetails,
                duration: 5000,
                icon: 'danger',
            });
            console.log('❌ Validation failed. Errors:', newErrors);
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            console.log('SignUp Payload:', payload);

            const response = await axios.post(SIGNUP_ENDPOINT, payload);
            const RegisterData = response.data;

            console.log('Signup Response:', JSON.stringify(RegisterData));

            if (response.status === 200 && RegisterData.status === true) {
                dispatch(resetBioData());

                const token = RegisterData?.user?.token || null;
                const userId = RegisterData?.user?.user?.id;

                if (token && userId) {
                    await AsyncStorage.setItem('userToken', token);
                    await AsyncStorage.setItem('userId', userId);
                    console.log('Token saved:', token);
                }

                try {
                    initializeSocket(userId);
                    console.log(`✅ Socket initialized successfully for user: ${userId}`);
                } catch (socketError) {
                    console.error('🚨 Socket Initialization Failed:', socketError);
                }

                showMessage({
                    type: 'success',
                    message: 'Sign Up Successful',
                    description: 'You have successfully signed up!',
                    icon: 'success',
                    duration: 3000,
                });

                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AppStack' }],
                });
            } else {
                throw new Error(RegisterData.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Sign Up Error:', error);

            let errorMessage = 'An unexpected error occurred.';
            let errorDescription = '';

            if (error.response) {
                errorMessage = error.response.data.message || 'Server error';
                errorDescription = error.response.data.error || 'Please check your input.';
            } else if (error.request) {
                errorMessage = 'Network Error';
                errorDescription = 'Check your internet connection.';
            } else {
                errorDescription = error.message;
            }

            showMessage({
                type: 'danger',
                message: errorMessage,
                description: errorDescription,
                icon: 'danger',
                duration: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <SafeAreaView style={styles.container} >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
            // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ImageBackground
                    source={require('../../Images/Signup.png')}
                    style={styles.image}
                >
                    <TouchableOpacity
  style={styles.backArrow}
 onPress={() => navigation.navigate('Splash')}
>
  <AntDesign name="arrowleft" size={20} color="white" />
</TouchableOpacity>
                    <ScrollView style={styles.contentContainer} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                        showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                        <View style={{ flex: 1 }}>
                            <Text style={styles.text}>Sign Up</Text>

                            <View style={Globalstyles.form}>
                                <Text style={Globalstyles.title}>Full Name <Entypo name={'star'} color={'red'} size={12} /></Text>
                                <TextInput
                                    style={Globalstyles.input}
                                    placeholder="Enter your full name"
                                    value={fullName}
                                    onChangeText={(text) => {
                                        const cleanText = text.replace(/[^A-Za-z\s]/g, '');
                                        setFullName(cleanText);
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
                                {/* <View>
                                    <Text style={Globalstyles.title}>
                                        Date of Birth <Entypo name="star" color="red" size={12} />
                                    </Text>

                                    <View
                                        style={[
                                            Globalstyles.inputContainer,
                                            {
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            },
                                        ]}
                                    >
                                        <TouchableOpacity
                                            style={{ flex: 1 }}
                                            onPress={() => setShowDatePicker(true)}
                                            activeOpacity={0.8}
                                        >
                                            <Text style={[styles.dateText]}>
                                                {selectedDate ? formatDate(selectedDate) : 'Select Date'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    {errors.selectedDate && (
                                        <Text style={styles.errorText}>{errors.selectedDate}</Text>
                                    )}
                                </View>

                                {showDatePicker && (
                                    <DateTimePicker
                                        value={selectedDate || new Date(2000, 0, 1)}
                                        mode="date"
                                        display="default"
                                        onChange={handleDateChange}
                                        maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))}
                                        themeVariant="light"
                                    />
                                )} */}


                                {/* City */}
                                <Text style={Globalstyles.title}>City <Entypo name={'star'} color={'red'} size={12} /></Text>
                                <TextInput
                                    style={Globalstyles.input}
                                    value={cityInput}
                                    onChangeText={handleCityInputChange}
                                    placeholder="Enter your city"
                                    placeholderTextColor={Colors.gray}
                                    autoComplete="off"
                                    textContentType="none"
                                    importantForAutofill="no"
                                    autoCorrect={false}
                                    maxLength={30}
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
                                    />
                                )}


                                {errors.selectedCity && (
                                    <Text style={styles.errorText}>{errors.selectedCity}</Text>
                                )}


                                {/* Gender */}
                                <Text style={Globalstyles.title}>Gender  <Entypo name={'star'} color={'red'} size={12} /> </Text>
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
                                    <Text style={Globalstyles.title}>Create Password  <Entypo name={'star'} color={'red'} size={12} /> </Text>
                                    <View style={styles.passwordContainer}>
                                        <TextInput
                                            style={styles.passwordInput}
                                            secureTextEntry={!showPassword}
                                            value={password}
                                            onChangeText={setPassword}
                                            placeholder="Create a strong password"
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

                                {/* Confirm Password */}
                                {/* <View>
                                    <Text style={Globalstyles.title}>Confirm Password <Entypo name={'star'} color={'red'} size={12} /> </Text>
                                    <View style={styles.passwordContainer}>
                                        <TextInput
                                            style={styles.passwordInput}
                                            secureTextEntry={!showConfirmPassword}
                                            value={confirmPassword}
                                            onChangeText={setConfirmpassword}
                                            placeholder="Confirm your password"
                                            placeholderTextColor={Colors.gray}
                                            autoComplete="off"
                                            textContentType="none"
                                            importantForAutofill="no"
                                            autoCorrect={false}
                                        />
                                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                            <AntDesign
                                                name={showConfirmPassword ? 'eye' : 'eyeo'}
                                                size={20}
                                                style={styles.eyeIcon}
                                                color={Colors.dark}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {errors.confirmPassword && (
                                        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                                    )}
                                </View> */}
                                {/* <Text style={Globalstyles.title}>Upload Your Profile Image</Text>
                                <View style={Globalstyles.input}>
                                    <TouchableOpacity onPress={handleImageUpload}>
                                        <Text style={styles.imagePlaceholder}>{selectedImageName}</Text>
                                    </TouchableOpacity>
                                </View> */}

                                {/* Mobile Number */}
                                <Text style={Globalstyles.title}>Mobile Number <Entypo name={'star'} color={'red'} size={12} /></Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <TextInput
                                        style={[Globalstyles.input, { flex: 1 }]}
                                        keyboardType="phone-pad"
                                        placeholder="Enter your mobile number"
                                        value={mobileNumber}
                                        onChangeText={(text) => setMobileNumber(text.replace(/[^0-9]/g, ''))}
                                        maxLength={10}
                                        placeholderTextColor={Colors.gray}
                                        editable={!otpSent}
                                        autoComplete="off"
                                        textContentType="none"
                                        importantForAutofill="no"
                                        autoCorrect={false}
                                    />
                                    <TouchableOpacity
                                        style={styles.otpButton}
                                        onPress={handleSendOtp}
                                        disabled={isOtpLoading || otpTimer > 0}
                                    >
                                        {isOtpLoading ? (
                                            <ActivityIndicator size="small" color={Colors.theme_color} />
                                        ) : (
                                            <Text
                                                style={[
                                                    styles.otpButtonText,
                                                    otpTimer > 0 && { color: 'red', fontFamily: 'Poppins-Medium' },
                                                ]}
                                            >
                                                {otpTimer > 0
                                                    ? `Resend OTP  ${Math.floor(otpTimer / 60)}:${(otpTimer % 60)
                                                        .toString()
                                                        .padStart(2, '0')}`
                                                    : 'Send OTP'}
                                            </Text>
                                        )}
                                    </TouchableOpacity>

                                </View>
                                {errors.mobileNumber && (
                                    <Text style={styles.errorText}>{errors.mobileNumber}</Text>
                                )}
                                {/* Mobile Number */}
                                <Text style={Globalstyles.title}>OTP <Entypo name={'star'} color={'red'} size={12} /></Text>

                                <TextInput style={Globalstyles.input}
                                    keyboardType="phone-pad"
                                    placeholder="Enter Your Otp"
                                    placeholderTextColor={Colors.gray}
                                    value={otp}
                                    onChangeText={setOtp} maxLength={6}
                                    autoComplete="off"
                                    textContentType="none"
                                    importantForAutofill="no"
                                    autoCorrect={false} />

                                {errors.otp && (
                                    <Text style={styles.errorText}>{errors.otp}</Text>
                                )}
                            </View>
                            {/* Continue Button */}
                            <Pressable
                                style={styles.button}
                                onPress={handleSignup}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator size={'large'} color={Colors.light} />
                                ) : (
                                    <Text style={styles.buttonText}>Sign Up</Text>
                                )}
                            </Pressable>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Register;
