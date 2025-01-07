import { Text, View, ImageBackground, TouchableOpacity, TextInput, ScrollView, SafeAreaView,StatusBar } from "react-native";
import React, { useState } from "react";
import styles from "../StyleScreens/RegisterStyle";
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import Colors from "../../utils/Colors";
const Register = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [gender, setGender] = useState(null);
    const [mobileNumber, setMobileNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmpassword] = useState("");

    const HandleLogin = () => {
        // if (mobileNumber && fullName && selectedDate && selectedCity && gender && otp && password) {
        //     navigation.navigate("LoginSuccess");
        // } else {
        //     alert("Please fill all fields.");
        // }
        navigation.navigate("LoginSuccess");
    };

    const handleDateChange = (event, date) => {
        if (date) {
            setSelectedDate(date);
        }
        setShowDatePicker(false);
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const cityData = [
        { label: 'Indore', value: 'Indore' },
        { label: 'Bhopal', value: 'Bhopal' },
        { label: 'Gwalior', value: 'Gwalior' },
    ];

    const genderData = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require("../../Images/InformationBackground.png")}
                style={styles.image}
            >
                 <AntDesign name={'arrowleft'} size={25} style={styles.backArrow} color={Colors.light}
                 onPress={()=>navigation.navigate('Splash')} />
                <ScrollView style={styles.contentContainer}>
                    <Text style={styles.text}>Sign Up</Text>

                    {/* Mobile Number */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Mobile Number</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Enter your mobile number"
                            value={mobileNumber}
                            onChangeText={setMobileNumber}
                            placeholderTextColor={Colors.gray}
                        />
                    </View>

                    {/* Full Name */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your full name"
                            value={fullName}
                            onChangeText={setFullName}
                            placeholderTextColor={Colors.gray}
                        />
                    </View>

                    {/* Date of Birth */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Date of Birth</Text>
                        <View style={styles.date}>
                            <Text style={styles.dateText}>
                                {selectedDate ? formatDate(selectedDate) : ' '}
                            </Text>
                            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                <AntDesign name={'down'} size={20} style={styles.arrow} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* City */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>City</Text>
                        <Dropdown
                            data={cityData}
                            labelField="label"
                            valueField="value"
                            placeholder=" "
                            value={selectedCity}
                            onChange={item => setSelectedCity(item.value)}
                            style={styles.dropdown}
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownSelectedText}
                        />
                    </View>

                    {/* Gender */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Gender</Text>
                        <Dropdown
                            data={genderData}
                            labelField="label"
                            valueField="value"
                            placeholder=" "
                            value={gender}
                            onChange={item => setGender(item.value)}
                            style={styles.dropdown}
                            placeholderStyle={styles.dropdownPlaceholder}
                            selectedTextStyle={styles.dropdownSelectedText}
                        />
                    </View>

                    {/* Enter OTP */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Enter OTP</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Enter the OTP sent to your mobile"
                            value={otp}
                            onChangeText={setOtp}
                            placeholderTextColor={Colors.gray}
                        />
                    </View>

                    {/* Create Password */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Create Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            placeholder="Create a strong password"
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor={Colors.gray}
                        />
                    </View>

                    {/* Create Password */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Confirm Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            placeholder="Create a strong password"
                            value={confirmPassword}
                            onChangeText={setConfirmpassword}
                            placeholderTextColor={Colors.gray}
                        />
                    </View>

                    {/* Continue Button */}
                    <TouchableOpacity style={styles.button} onPress={HandleLogin}>
                        <Text style={styles.buttonText}>Sign Up</Text>
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
        </SafeAreaView>
    );
};

export default Register;
