import React, { useState } from 'react';
import { Text, View, Switch, TouchableOpacity, SafeAreaView, StatusBar, ToastAndroid } from 'react-native';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/NotificationSettingStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';
import { HIDE_CONTACT, HIDE_OPTIONAL_DETAILS,INACTIVE_ID } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { toggleBlurPhotos } from '../../ReduxStore/Slices/privacySlice';
import { useSelector,useDispatch } from 'react-redux';

const PrivacySettings = ({ navigation }) => {
     const dispatch = useDispatch();
    const blurPhotos = useSelector((state) => state.privacy.blurPhotos);
    const [inactivateId, setInactivateId] = useState(false);
    const [hideContactDetails, setHideContactDetails] = useState(false);
    // const [blurPhotos, setBlurPhotos] = useState(false);
    const [hideOptionalDetails, setHideOptionalDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // API to update privacy settings
    const togglePrivacySetting = async (settingType, currentValue, setter, apiUrl) => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem("userToken");

            if (!token) throw new Error("No token found");

            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            const newValue = !currentValue; // Toggle the value
            const response = await axios.patch(apiUrl, { status: newValue }, { headers });

            if (response.status === 200 || response.status === 201) {
                console.log("response",JSON.stringify(response.data));
                setter(newValue); // Update UI state only if API succeeds
                ToastAndroid.show(`${settingType} ${newValue ? 'enabled' : 'disabled'} successfully!`, ToastAndroid.SHORT);
            } else {
                throw new Error("Unexpected response from server");
            }
        } catch (error) {
            console.error(`Error updating ${settingType}:`, error?.response?.data || error.message);
            ToastAndroid.show(
                `Failed to update ${settingType}. Please try again!`,
                ToastAndroid.LONG
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Privacy Settings</Text>
                </View>
            </View>

            {/* Privacy Toggles */}
            <View style={styles.toggleContainer}>
                <View style={styles.toggleRow}>
                    <Text style={styles.toggleLabel}>Inactivate Id</Text>
                    <Switch
                        trackColor={{ false: Colors.gray, true: Colors.theme_color }}
                        thumbColor={inactivateId ? Colors.white : Colors.gray}
                        onValueChange={() => togglePrivacySetting("Inactivate ID", inactivateId, setInactivateId, INACTIVE_ID)}
                        value={inactivateId}
                        disabled={isLoading}
                    />
                </View>

                <View style={styles.toggleRow}>
                    <Text style={styles.toggleLabel}>Hide Contact Details</Text>
                    <Switch
                        trackColor={{ false: Colors.gray, true: Colors.theme_color }}
                        thumbColor={hideContactDetails ? Colors.white : Colors.gray}
                        onValueChange={() => togglePrivacySetting("Hide Contact Details", hideContactDetails, setHideContactDetails, HIDE_CONTACT)}
                        value={hideContactDetails}
                        disabled={isLoading}
                    />
                </View>
                <View style={styles.toggleRow}>
                    <Text style={styles.toggleLabel}>Blur Photos</Text>
                    <Switch
                        trackColor={{ false: Colors.gray, true: Colors.theme_color }}
                        thumbColor={blurPhotos ? Colors.white : Colors.gray}
                        onValueChange={() => {
                            dispatch(toggleBlurPhotos()); 
                            ToastAndroid.show(`Blur Photos ${!blurPhotos ? 'enabled' : 'disabled'} successfully!`, ToastAndroid.SHORT);
                        }}
                        value={blurPhotos}
                    />
                </View>
                <View style={styles.toggleRow}>
                    <Text style={styles.toggleLabel}>Hide Optional Details in Biodata Profile</Text>
                    <Switch
                        trackColor={{ false: Colors.gray, true: Colors.theme_color }}
                        thumbColor={hideOptionalDetails ? Colors.white : Colors.gray}
                        onValueChange={() => togglePrivacySetting("Hide Optional Details", hideOptionalDetails, setHideOptionalDetails, HIDE_OPTIONAL_DETAILS)}
                        value={hideOptionalDetails}
                        disabled={isLoading}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default PrivacySettings;
