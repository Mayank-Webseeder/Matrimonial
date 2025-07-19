import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView, SafeAreaView, StatusBar, FlatList, Pressable, TextInput, Linking, Share, BackHandler } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../StyleScreens/ExploreStyle';
import Colors from '../../utils/Colors';
import Globalstyles from '../../utils/GlobalCss';
import { SAVED_PROFILES, GET_BIODATA_BY_ID, DeepLink } from '../../utils/BaseUrl';
import { SW } from '../../utils/Dimensions';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { CommonActions, useFocusEffect } from '@react-navigation/native';

const ShortMatrimonialProfile = ({ navigation, route }) => {
    const { userId, isSaved: initialSavedState, id } = route.params;
    const profileId = userId || id || null;
    const [Save, setIsSaved] = useState(initialSavedState || false);
    const ProfileData = useSelector((state) => state.profile);
    const profile_data = ProfileData?.profiledata || {};
    const MyprofileData = useSelector((state) => state.getBiodata);
    const [Loading, setLoading] = useState(false);
    const [Biodata, SetBiodataData] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'MainApp' }],
                    })
                );
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    useEffect(() => {
        fetchBiodataProfile();
        console.log("Biodata", Biodata);
    }, [userId, id])

    const fetchBiodataProfile = async () => {
        setLoading(true);

        const profileId = userId || id;
        console.log("profileId", profileId);

        if (!profileId) {
            showMessage({
                type: "danger",
                message: "Biodata ID not found!",
                icon: "danger",
                duration: 5000
            });
            console.error("[fetchBiodataProfile] ❌ No valid ID provided. _id:", profileId, " | id:", id);
            setLoading(false);
            return;
        }

        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            showMessage({
                type: "danger",
                message: "Authentication Error",
                description: "No token found. Please log in again.",
                duration: 5000
            });

            navigation.reset({
                index: 0,
                routes: [{ name: "AuthStack" }],
            });
            return;
        }
        const url = `${GET_BIODATA_BY_ID}/${profileId}`;
        console.log("[fetchBiodataProfile] ✅ Fetching data...");
        console.log("🔗 URL:", url);
        console.log("🔐 Token:", token.substring(0, 20) + "...");

        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log("📦 Raw API Response:", JSON.stringify(response.data, null, 2));

            if (response.data.status) {
                console.log("✅ Biodata Profile Fetched:", response.data.data);
                SetBiodataData(response.data.data.biodata); // <- update your state setter accordingly
            } else {
                showMessage({
                    type: "danger",
                    message: "No Biodata Found",
                    description: response.data.message || "Something went wrong!",
                    duration: 5000
                });
                console.warn("⚠️ API returned false status:", response.data.message);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error("❌ Error fetching biodata profile:", errorMsg);

            showMessage({
                type: "danger",
                message: errorMsg,
                description: "Failed to load biodata profile",
                duration: 5000
            });

            const sessionExpiredMessages = [
                "User does not Exist....!Please login again",
                "Invalid token. Please login again",
                "Token has expired. Please login again"
            ];

            if (sessionExpiredMessages.includes(errorMsg)) {
                console.warn("⚠️ Session expired, clearing token...");
                await AsyncStorage.removeItem("userToken");
                navigation.reset({
                    index: 0,
                    routes: [{ name: "AuthStack" }],
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const savedProfiles = async (_id) => {
        if (!_id) {
            showMessage({
                message: 'User ID not found!',
                type: 'danger',
                icon: "danger",
                duarion: 5000
            });
            return;
        }

        setIsSaved((prev) => !prev);

        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                throw new Error("No token found");
            }

            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.post(`${SAVED_PROFILES}/${_id}`, {}, { headers });

            console.log("Response Data:", JSON.stringify(response?.data));

            if (response?.data?.message) {
                showMessage({
                    message: 'Success',
                    description: response.data.message,
                    type: "success",
                    duarion: 5000,
                    icon: "success"
                });

                if (response.data.message === "Profile saved successfully.") {
                    setIsSaved(true);
                } else {
                    setIsSaved(false);
                }
            } else {
                showMessage({
                    message: 'Something went wrong!',
                    type: 'danger',
                    duarion: 5000,
                    icon: "danger"
                });
            }
        } catch (error) {
            console.error(
                "API Error:",
                error?.response ? JSON.stringify(error.response.data) : error.message
            );

            showMessage({
                message: error.response?.data?.message || "Failed to save profile!",
                type: 'danger',
                duarion: 5000
            });
        }
    };


    const shareProfiles = async (profileId) => {
        const profileType = "short-matrimonial-profile";

        console.log("profileId", profileId);

        try {
            if (!profileId) throw new Error("Missing profile ID");

            const directLink = `${DeepLink}/${profileType}/${profileId}`;

            await Share.share({
                message: `Check this profile in Brahmin Milan app:\n${directLink}`
            });
        } catch (error) {
            console.error("Sharing failed:", error?.message || error);
        }
    };

    const popop = async () => {
        const isBiodataExpired = profile_data?.serviceSubscriptions?.some(
            (sub) => sub.serviceType === 'Biodata' && sub.status === 'Expired'
        );

        const isBiodataEmpty = !MyprofileData.Biodata || Object.keys(MyprofileData.Biodata).length === 0;

        if (isBiodataEmpty) {
            showMessage({
                message: 'Biodata Missing',
                description: 'Please create biodata to see full information of this profile.',
                type: 'warning',
                duarion: 5000
            });
            navigation.navigate('MatrimonyPage')
        } else if (isBiodataExpired) {
            showMessage({
                message: 'Subscription Expired',
                description: 'Please activate your subscription to see full information of this profile.',
                type: 'warning',
                duarion: 5000,
                onPress: () => navigation.navigate('BuySubscription', { serviceType: 'Biodata' }),
            });
        } else {
            navigation.navigate('MatrimonyPage');
        }
    };

    const renderProfileCard = ({ item }) => {
        const formattedHeight = item?.personalDetails?.heightFeet
            ?.replace(/\s*-\s*/, "")
            ?.replace(/\s+/g, "");

        return (
            <View style={styles.card}>
                <Pressable onPress={popop}>
                    <Image
                        source={item?.personalDetails?.closeUpPhoto ? { uri: item?.personalDetails?.closeUpPhoto } : require('../../Images/NoImage.png')}
                        style={styles.ProfileImage}
                        blurRadius={item?.isBlur ? 5 : 0}
                    />
                    {item.verified && (
                        <View style={styles.verifiedContainer}>
                            <Image
                                source={require("../../Images/verified.png")}
                                style={styles.verifiedBadge}
                            />
                            <Text style={styles.verifiedText}>Verified</Text>
                        </View>
                    )}

                    <View style={styles.profileData}>
                        {/* Full Name at the Top */}
                        <Text style={[styles.text, styles.boldText]}>{item?.personalDetails?.fullname}</Text>

                        {/* Two Column Layout */}
                        <View style={styles.columnsContainer}>
                            {/* Left Column */}
                            <View style={styles.leftColumn}>
                                <Text style={[styles.text, styles.rowItem]}>
                                    {new Date().getFullYear() - new Date(item?.personalDetails?.dob).getFullYear()} Yrs, {formattedHeight}
                                </Text>
                                <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.subCaste}</Text>
                                <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.maritalStatus}</Text>
                                <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.manglikStatus}</Text>
                                <Text style={[styles.text, styles.rowItem]}>Disability: {item?.personalDetails?.disabilities}</Text>
                            </View>

                            {/* Right Column */}
                            <View style={styles.rightColumn}>
                                <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.currentCity}</Text>
                                <Text style={[styles.text, styles.rowItem, { textTransform: "none" }]}>{item?.personalDetails?.occupation}</Text>
                                <Text style={[styles.text, styles.rowItem, { textTransform: "none" }]}>{item?.personalDetails?.annualIncome}</Text>
                                <Text style={[styles.text, styles.rowItem, { textTransform: "none" }]}>{item?.personalDetails?.qualification}</Text>
                            </View>
                        </View>
                    </View>
                </Pressable>
                <View style={[styles.sharecontainer, { paddingHorizontal: SW(20) }]}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => savedProfiles(item._id)}>
                        <FontAwesome
                            name={Save ? "bookmark" : "bookmark-o"}
                            size={19}
                            color={Colors.dark}
                        />
                        <Text style={styles.iconText}>{Save ? "Saved" : "Save"}</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.iconContainer} onPress={() => shareProfiles(item?._id)}>
                        <Feather name="send" size={19} color={Colors.dark} />
                        <Text style={styles.iconText}>Share</Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity style={styles.iconContainer} onPress={() => shareProfiles(item?.userId)}>
                        <Feather name="send" size={19} color={Colors.dark} />
                        <Text style={styles.iconText}>Share</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ReportPage', { profileId: item?._id })}>
                        <MaterialIcons name="error-outline" size={20} color={Colors.dark} />
                        <Text style={styles.iconText}>Report</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    return (
        <SafeAreaView style={Globalstyles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View style={Globalstyles.header}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: "MainApp" }],
                    })}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Matrimony</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <FlatList
                        data={Array.isArray(Biodata) ? Biodata : [Biodata]}
                        renderItem={renderProfileCard}
                        keyExtractor={(item) => item._id || Math.random().toString()}
                        scrollEnabled={false}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>No Profiles Available</Text>
                            </View>
                        }
                    />

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ShortMatrimonialProfile;
