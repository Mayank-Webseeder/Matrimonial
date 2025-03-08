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
import Toast from 'react-native-toast-message';
import { SAVED_PROFILES } from '../../utils/BaseUrl';
const ShortMatrimonialProfile = ({ navigation, route }) => {
    const { userDetails } = route.params;
    useEffect(() => {
        console.log("userDetails", userDetails);
    }, [])
    const savedProfiles = async (_id) => {
        if (!_id) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "User ID not found!",
            });
            return;
        }

        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                throw new Error("No token found");
            }

            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.post(
                `${SAVED_PROFILES}/${_id}`,
                {},
                { headers }
            );

            console.log("Response Data:", JSON.stringify(response?.data));

            if (response?.data?.message) {
                Toast.show({
                    type: "success",
                    text2: response.data.message,
                    position: "top",
                    visibilityTime: 3000,
                    textStyle: { fontSize: 14, color: "green" },
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: response.data.message || "Something went wrong!",
                });
            }
        } catch (error) {
            console.error(
                "API Error:",
                error?.response ? JSON.stringify(error.response.data) : error.message
            );
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.response?.data?.message || "Failed to send interest!",
            });
        }
    };

    const renderProfileCard = ({ item }) => {
        return (
            <Pressable style={styles.card}>
                <Image
                    source={item.personalDetails.closeUpPhoto ? { uri: item.personalDetails.closeUpPhoto } : require('../../Images/NoImage.png')}
                    style={styles.ProfileImage}
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
                                {new Date().getFullYear() - new Date(item?.personalDetails?.dob).getFullYear()} Yrs. , {item?.personalDetails?.heightFeet}
                            </Text>
                            <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.subCaste}</Text>
                            <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.maritalStatus}</Text>
                            <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.manglikStatus}</Text>
                            <Text style={[styles.text, styles.rowItem]}>Disability: {item?.personalDetails?.disabilities}</Text>
                        </View>

                        {/* Right Column */}
                        <View style={styles.rightColumn}>
                            <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.currentCity}</Text>
                            <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.occupation}</Text>
                            <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.annualIncome} INR </Text>
                            <Text style={[styles.text, styles.rowItem]}>{item?.personalDetails?.qualification}</Text>
                        </View>
                    </View>
                    <View style={styles.sharecontainer}>
                        <TouchableOpacity style={styles.iconContainer} onPress={() => savedProfiles(item._id)}>
                            <FontAwesome
                                name={"bookmark-o"}
                                size={19}
                                color={Colors.dark}
                            />
                            <Text style={styles.iconText}>Save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconContainer} onPress={""}>
                            <Feather name="send" size={19} color={Colors.dark} />
                            <Text style={styles.iconText}>Share</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ReportPage', { profileId: item?._id })}>
                            <MaterialIcons name="error-outline" size={20} color={Colors.dark} />
                            <Text style={styles.iconText}>Report</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
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
            <Toast />
        </SafeAreaView>
    );
};

export default ShortMatrimonialProfile;
