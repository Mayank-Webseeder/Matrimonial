import React, { useRef, useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Image, Text, ScrollView, SafeAreaView, StatusBar, FlatList, Pressable, TextInput, Linking } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../StyleScreens/ExploreStyle';
import Colors from '../../utils/Colors';
import Globalstyles from '../../utils/GlobalCss';
import { SAVED_PROFILES } from '../../utils/BaseUrl';
import { SW } from '../../utils/Dimensions';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

const ShortMatrimonialProfile = ({ navigation, route }) => {
    const { userDetails, isSaved: initialSavedState } = route.params;
    const [Save, setIsSaved] = useState(initialSavedState || false);
    const ProfileData = useSelector((state) => state.profile);
    const profile_data = ProfileData?.profiledata || {};
    const MyprofileData = useSelector((state) => state.getBiodata);

    useEffect(() => {
        console.log("userDetails", userDetails);
    }, [])

    const savedProfiles = async (_id) => {
        if (!_id) {
            showMessage({
                message: 'User ID not found!',
                type: 'danger',
                icon: "danger",
                duration: 3000,
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
                    duration: 3000,
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
                    duration: 3000,
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
                duration: 3000,
            });
        }
    };

    const handleShare = async () => {
        showMessage({
            type: "info",
            message: "Under development",
            icon: "info"
        });
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
                duration: 3000,
            });
            navigation.navigate('MatrimonyPage')
        } else if (isBiodataExpired) {
            showMessage({
                message: 'Subscription Expired',
                description: 'Please activate your subscription to see full information of this profile.',
                type: 'warning',
                duration: 3000,
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
                        source={item.personalDetails.closeUpPhoto ? { uri: item.personalDetails.closeUpPhoto } : require('../../Images/NoImage.png')}
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

                    <TouchableOpacity style={styles.iconContainer} onPress={handleShare}>
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
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View style={Globalstyles.header}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../Images/menu.png')} style={styles.menuIcon} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Matrimony</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={Array.isArray(userDetails) ? userDetails : [userDetails]}
                    renderItem={renderProfileCard}
                    keyExtractor={(item) => item._id || Math.random().toString()}
                    scrollEnabled={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No Profiles Available</Text>
                        </View>
                    }
                />

            </ScrollView>
        </SafeAreaView>
    );
};

export default ShortMatrimonialProfile;
