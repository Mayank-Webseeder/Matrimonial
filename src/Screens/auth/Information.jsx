import { Text, View, ImageBackground, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../StyleScreens/InformationStyle";
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';

const Information = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(null);  // Initially, no date selected
    const [showDatePicker, setShowDatePicker] = useState(false); // State to toggle the DatePicker

    useEffect(() => {
        console.log("selectedDate:", selectedDate);
        console.log("showDatePicker:", showDatePicker);
    }, [selectedDate, showDatePicker]);  // Monitor these states

    const HandleLogin = () => {
        navigation.navigate("MainApp");
    };

    const handleDateChange = (event, date) => {
        if (date) {
            setSelectedDate(date); // Update the selected date
        }
        setShowDatePicker(false); // Hide the DatePicker after selection
    };

    // Format the date as DD/MM/YYYY
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');  // Ensure two digits for day
        const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Ensure two digits for month
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../Images/InformationBackground.png")}
                style={styles.image}
            >
                <View style={styles.contentContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Name</Text>
                        <TextInput style={styles.inputContain} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Email</Text>
                        <TextInput style={styles.input} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Password</Text>
                        <TextInput style={styles.input} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Date of Birth</Text>
                        <View style={styles.date}>
                            <Text style={styles.dateText}>
                                {selectedDate ? formatDate(selectedDate) : ' '}
                            </Text>
                            <TouchableOpacity onPress={() => {
                                console.log("Icon clicked");
                                setShowDatePicker(true)
                            }}>
                                <AntDesign name={'down'} size={20} style={styles.arrow} />
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.title}>Country/Region</Text>
                        <TextInput style={styles.input} />
                    </View>

                    <TouchableOpacity style={styles.button} onPress={HandleLogin}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            {showDatePicker && (
                <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                />
            )}
        </View>
    );
};

export default Information;