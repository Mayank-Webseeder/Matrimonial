import React, { useState, useEffect } from 'react';
import { Text, View, Switch, TouchableOpacity, SafeAreaView, StatusBar, ToastAndroid } from 'react-native';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/NotificationSettingStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';
import { HIDE_CONTACT, HIDE_OPTIONAL_DETAILS, INACTIVE_ID } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { toggleBlurPhotos, setBlurPhotosState } from '../../ReduxStore/Slices/privacySlice';
import { useSelector, useDispatch } from 'react-redux';

const PrivacySettings = ({ navigation }) => {
    const dispatch = useDispatch();
    const blurPhotos = useSelector((state) => state.privacy.blurPhotos);
    const MyprofileData = useSelector((state) => state.getBiodata);
    const hideContact = MyprofileData?.Biodata?.hideContact ?? false;
    const hideOptionalDetails = MyprofileData?.Biodata?.hideOptionalDetails ?? false;
    const isActive = MyprofileData?.Biodata?.activityStatus === "Active";
    const [inactivateId, setInactivateId] = useState(isActive);
    const [hideContactDetails, setHideContactDetails] = useState(hideContact);
    const [hideOptionalDetailsState, setHideOptionalDetailsState] = useState(hideOptionalDetails);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("MyprofileData", MyprofileData);
        dispatch(setBlurPhotosState(blurPhotos)); 
    }, []);

    const togglePrivacySetting = async (settingType, currentValue, setter, apiUrl) => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem("userToken");
            if (!token) throw new Error("No token found");

            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            const newValue = !currentValue;

            setter(newValue);
            setTimeout(async () => {
                const response = await axios.patch(apiUrl, { status: newValue }, { headers });

                if (response.status === 200 || response.status === 201) {
                    console.log("response", JSON.stringify(response.data));
                    ToastAndroid.show(`${settingType} ${newValue ? 'enabled' : 'disabled'} successfully!`, ToastAndroid.SHORT);
                } else {
                    throw new Error("Unexpected response from server");
                }
            }, 300);

        } catch (error) {
            console.error(`Error updating ${settingType}:`, error?.response?.data || error.message);
            ToastAndroid.show(`Failed to update ${settingType}. Please try again!`, ToastAndroid.LONG);
        } finally {
            setTimeout(() => setIsLoading(false), 300);
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
                        trackColor={{ false: Colors.gray, true: Colors.gray }}
                        thumbColor={inactivateId ? Colors.theme_color : Colors.theme_color}
                        onValueChange={() => togglePrivacySetting("Inactivate ID", inactivateId, setInactivateId, INACTIVE_ID)}
                        value={inactivateId}
                        disabled={isLoading}
                        animated
                    />
                </View>

                <View style={styles.toggleRow}>
                    <Text style={styles.toggleLabel}>Hide Contact Details</Text>
                    <Switch
                        trackColor={{ false: Colors.gray, true: Colors.gray }}
                        thumbColor={hideContactDetails ? Colors.theme_color : Colors.theme_color}
                        onValueChange={() => togglePrivacySetting("Hide Contact Details", hideContactDetails, setHideContactDetails, HIDE_CONTACT)}
                        value={hideContactDetails}
                        disabled={isLoading}
                        animated
                    />
                </View>

                <View style={styles.toggleRow}>
                    <Text style={styles.toggleLabel}>Blur Photos</Text>
                    <Switch
                        trackColor={{ false: Colors.gray, true: Colors.gray }}
                        thumbColor={blurPhotos ? Colors.theme_color : Colors.theme_color}
                        onValueChange={() => {
                            dispatch(toggleBlurPhotos());
                            ToastAndroid.show(`Blur Photos ${!blurPhotos ? 'enabled' : 'disabled'} successfully!`, ToastAndroid.SHORT);
                        }}
                        value={blurPhotos}
                        animated
                    />
                </View>

                <View style={styles.toggleRow}>
                    <Text style={styles.toggleLabel}>Hide Optional Details in Biodata Profile</Text>
                    <Switch
                        trackColor={{ false: Colors.gray, true: Colors.gray }}
                        thumbColor={hideOptionalDetailsState ? Colors.theme_color : Colors.theme_color}
                        onValueChange={() => togglePrivacySetting("Hide Optional Details", hideOptionalDetailsState, setHideOptionalDetailsState, HIDE_OPTIONAL_DETAILS)}
                        value={hideOptionalDetailsState}
                        disabled={isLoading}
                        animated
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default PrivacySettings;
