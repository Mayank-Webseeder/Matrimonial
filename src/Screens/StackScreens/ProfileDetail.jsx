import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Linking, ToastAndroid, Alert, Modal, Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../StyleScreens/ProfileDetailStyle';
import Colors from '../../utils/Colors';
import moment from 'moment';
import { Rating } from 'react-native-ratings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Globalstyles from '../../utils/GlobalCss';
import { SH, SW, SF } from '../../utils/Dimensions';
import ImageViewing from 'react-native-image-viewing';
import { PROFILE_TYPE, REPOST } from '../../utils/BaseUrl';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const ProfileDetail = ({ route, navigation }) => {
    const { profileType } = route.params || {};
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [postloading, setPostLoading] = useState(false);
    const images = profileData?.additionalPhotos || [];
    const [visible, setVisible] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const hasOtherDetails = profileData?.personalDetails?.knowCooking || profileData?.personalDetails?.dietaryHabit || profileData?.personalDetails?.smokingHabit ||
        profileData?.personalDetails?.drinkingHabit || profileData?.personalDetails?.tobaccoHabits || profileData?.personalDetails?.hobbies;
    const personalDetails = profileData?.personalDetails;

    const Myimages = [
        profileData?.personalDetails?.closeUpPhoto,
        profileData?.personalDetails?.fullPhoto,
        profileData?.personalDetails?.bestPhoto
    ].filter(Boolean);


    const profilePhoto = profileData?.profilePhoto
        ? { uri: profileData.profilePhoto }
        : require('../../Images/NoImage.png');

    const ProfileData = useSelector((state) => state.profile);
    const profile_data = ProfileData?.profiledata || {};

    const isBiodataExpired = profile_data?.serviceSubscriptions?.some(
        (sub) => sub.serviceType === "Biodata" && sub.status === "Expired"
    );

    const panditStatus = profile_data?.serviceSubscriptions?.find(
        (sub) => sub.serviceType === 'Pandit'
    )?.status;

    const JyotishStatus = profile_data?.serviceSubscriptions?.find(
        (sub) => sub.serviceType === 'Jyotish'
    )?.status;

    const KathavachakStatus = profile_data?.serviceSubscriptions?.find(
        (sub) => sub.serviceType === 'Kathavachak'
    )?.status;

    const openImageViewer = (index) => {
        setImageIndex(index);
        setModalVisible(true);
    };


    useEffect(() => {
        let isExpired = false;
        let expiredServiceName = '';

        switch (profileType) {
            case 'Biodata':
                isExpired = isBiodataExpired;
                expiredServiceName = 'Biodata';
                break;
            case 'Pandit':
                isExpired = panditStatus === 'Expired';
                expiredServiceName = 'Pandit';
                break;
            case 'Jyotish':
                isExpired = JyotishStatus === 'Expired';
                expiredServiceName = 'Jyotish';
                break;
            case 'Kathavachak':
                isExpired = KathavachakStatus === 'Expired';
                expiredServiceName = 'Kathavachak';
                break;
            default:
                break;
        }

        if (isExpired) {
            Alert.alert(
                'Subscription Expired',
                `Your ${expiredServiceName} subscription has expired. Please renew to continue using the service.`,
                [{ text: 'OK', style: 'default' }]
            );
        }
    }, [profileType, isBiodataExpired, panditStatus, JyotishStatus, KathavachakStatus]);

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.get(
                `${PROFILE_TYPE}/${profileType}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.data && Object.keys(response.data).length > 0) {
                setProfileData(response.data.data);
            } else {
                console.warn("Empty response received.");
            }
        } catch (error) {
            console.error("Error fetching details:", error.response?.data || error.message);
        }
        setLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [])
    );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={Colors.theme_color} />
            </View>
        );
    }

    if (!profileData) {
        return <Text style={{ padding: 20 }}>No Data Available</Text>;
    }

    const calculateAge = (dob) => {
        if (!dob) return "N/A";
        const birthDate = moment(dob);
        const currentDate = moment();
        return currentDate.diff(birthDate, "years");
    };

    const openLink = (url, platform) => {
        if (url) {
            Linking.openURL(url);
        } else {
            Alert.alert("Not Available", `${platform} link is not available.`);
        }
    };

    const showMessages = (message) => {
        showMessage({
            type: 'info',
            message: message,
            visibilityTime: 3000,
            autoHide: true,
            icon: "info"
        });
    };

    const renderImages = (images) => {
        if (!images || images.length === 0) {
            return (
                <View style={styles.noImagesContainer}>
                    <MaterialIcons name="hide-image" size={40} color={Colors.gray} style={styles.icon} />
                    <Text style={styles.noImagesText}>No additional photos available for this post</Text>
                </View>
            );
        }


        const rows = [];
        for (let i = 0; i < images.length; i += 2) {
            rows.push(
                <TouchableOpacity
                    style={styles.imageRow}
                    key={i}
                    onPress={() =>
                        navigation.navigate('ViewEntityImages', {
                            post: profileData,
                            images: images.filter(Boolean),
                            panditDetails: profileData,
                        })
                    }
                >
                    <Image source={{ uri: images[i] }} style={styles.image} />
                    {images[i + 1] && <Image source={{ uri: images[i + 1] }} style={styles.image} />}
                </TouchableOpacity>
            );
        }

        return <View style={styles.imageContainer}>{rows}</View>;
    };

    const formattedHeight = profileData?.personalDetails?.heightFeet
        ?.replace(/\s*-\s*/, "")
        ?.replace(/\s+/g, "");

    const Repost = async () => {
        setPostLoading(true);

        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            Alert.alert("Error", "No token found!");
            setPostLoading(false);
            return;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        try {
            const response = await axios.post(REPOST, {}, { headers });

            console.log("✅ Repost Data:", response.data);

            if (response.status === 200 && response.data.status === true) {
                Alert.alert("Success", response.data.message || 'Reposted successfully!');
                fetchData();
            } else {
                throw new Error(response.data.message || 'Something went wrong!');
            }
        } catch (error) {
            console.error("❌ Error fetching profile:", error?.response?.data || error);

            let errorMessage = "Something went wrong. Please try again later.";
            if (error?.response) {
                if (error?.response?.status === 400 && error?.response?.data?.status === false) {
                    errorMessage = error.response.data?.message || "Failed to repost. Please try again!";
                }
            }

            Alert.alert("Info", errorMessage);
        } finally {
            setPostLoading(false);
        }
    };



    return (
        <View style={Globalstyles.container}>
            <View style={Globalstyles.header}>
                <View style={{ flex: 1, flexDirection: 'row', alignContent: "center" }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("MainApp")}
                    >
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={[styles.HeadingText, { color: Colors.theme_color }]}>{profileType} Details</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {profileType === 'Biodata' && (
                    <>
                        {Myimages.length > 0 && (
                            <View style={{ alignItems: 'center' }}>
                                {/* Only show the first image outside */}
                                <TouchableOpacity onPress={() => openImageViewer(0)}>
                                    <Image
                                        source={{ uri: Myimages[0] }}
                                        style={{
                                            width: SW(350),
                                            height: SH(300),
                                            borderRadius: 10,
                                            resizeMode: 'cover',
                                            marginBottom: SH(10),
                                        }}
                                    />
                                </TouchableOpacity>

                                {/* Modal to show all images */}
                                <Modal visible={modalVisible} transparent animationType="fade">
                                    <View
                                        style={{
                                            flex: 1,
                                            backgroundColor: 'rgba(0,0,0,0.8)',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <ScrollView
                                            horizontal
                                            pagingEnabled
                                            showsHorizontalScrollIndicator={false}
                                            onMomentumScrollEnd={(e) =>
                                                setImageIndex(Math.round(e.nativeEvent.contentOffset.x / SCREEN_W))
                                            }
                                            contentOffset={{ x: imageIndex * SCREEN_W, y: 0 }}
                                            style={{ width: SCREEN_W, height: SCREEN_H }}
                                        >
                                            {Myimages.map((uri, idx) => (
                                                <View
                                                    key={idx}
                                                    style={{
                                                        width: SCREEN_W,
                                                        height: SCREEN_H,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Image
                                                        source={{ uri }}
                                                        resizeMode="contain"
                                                        style={{ width: '100%', height: '100%' }}
                                                    />
                                                </View>
                                            ))}
                                        </ScrollView>

                                        {/* Index Badge */}
                                        <View
                                            style={{
                                                position: 'absolute',
                                                top: SH(40),
                                                alignSelf: 'center',
                                                backgroundColor: 'rgba(0,0,0,0.6)',
                                                paddingHorizontal: SW(8),
                                                paddingVertical: SH(8),
                                                borderRadius: 5,
                                            }}
                                        >
                                            <Text style={{ color: '#fff' }}>
                                                {imageIndex + 1} / {Myimages.length}
                                            </Text>
                                        </View>

                                        {/* Close Button */}
                                        <TouchableOpacity
                                            onPress={() => setModalVisible(false)}
                                            style={{ position: 'absolute', top: 40, right: 20 }}
                                        >
                                            <Text style={{ color: '#fff' }}>Close</Text>
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </View>
                        )}

                        <View>
                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                <View>
                                    {isBiodataExpired ? (
                                        <TouchableOpacity
                                            style={styles.editButton}
                                            onPress={() => navigation.navigate("BuySubscription", { serviceType: profileType })}
                                        >
                                            <Text style={styles.editButtonText}>Buy Subscription</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={[styles.editButton, { backgroundColor: "#04AA6D" }]} disabled={true}>
                                            <Text style={[styles.editButtonText, { color: "#fff" }]}>Subscription Active</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center", alignSelf: "flex-end", }}>
                                    <Text
                                        style={[
                                            styles.RepostText,
                                            { backgroundColor: profileData?.repostStatus === "Yes" ? "red" : "green" }
                                        ]}
                                        onPress={() => !postloading && Repost()}
                                    >
                                        {postloading ? <ActivityIndicator color="white" /> : "Repost"}
                                    </Text>

                                    <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('MatrimonyPage', { profileData })}>
                                        <Text style={styles.editButtonText}>Edit Biodata</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <View style={styles.flexContainer1}>
                                    {/* Left Container */}
                                    <View style={styles.leftContainer}>
                                        <Text style={styles.HeadingText}>{profileData?.personalDetails?.fullname}</Text>
                                        <Text style={styles.text}>{calculateAge(profileData?.personalDetails?.dob)} Yrs, {formattedHeight} </Text>
                                        {profileData?.personalDetails?.subCaste && (
                                            <Text style={styles.text}>{profileData.personalDetails.subCaste}</Text>
                                        )}
                                        {profileData?.personalDetails?.maritalStatus && (
                                            <Text style={styles.text}>{profileData.personalDetails.maritalStatus}</Text>
                                        )}
                                        {profileData?.personalDetails?.manglikStatus && (
                                            <Text style={styles.text}>{profileData.personalDetails.manglikStatus}</Text>
                                        )}
                                        {profileData?.personalDetails?.disabilities && (
                                            <Text style={styles.text}>Disability: {profileData.personalDetails.disabilities}</Text>
                                        )}
                                        {profileData?.personalDetails?.profileCreatedBy && <Text style={styles.text}>Profile created by: {profileData?.personalDetails?.profileCreatedBy}</Text>}
                                    </View>

                                    {/* Right Container */}
                                    <View style={styles.rightContainer}>
                                        {profileData?.personalDetails?.currentCity && (
                                            <Text style={styles.text}>{profileData.personalDetails.currentCity}</Text>
                                        )}
                                        {profileData?.personalDetails?.occupation && (
                                            <Text style={[styles.text, { textTransform: "none" }]}>{profileData.personalDetails.occupation}</Text>
                                        )}
                                        {profileData?.personalDetails?.annualIncome && (
                                            <Text style={[styles.text, { textTransform: "none" }]}>{profileData.personalDetails.annualIncome}</Text>
                                        )}
                                        {profileData?.personalDetails?.qualification && (
                                            <Text style={[styles.text, { textTransform: "none" }]}>{profileData.personalDetails.qualification}</Text>
                                        )}
                                    </View>
                                </View>

                                {/* Horoscope Section */}
                                {personalDetails?.dob && (
                                    <View style={styles.familyDiv}>
                                        <View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
                                                <MaterialIcons name="stars" size={25} color={Colors.theme_color} />
                                                <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Horoscope</Text>
                                            </View>

                                            {/* Displaying Date of Birth and Time of Birth */}
                                            <View style={styles.infoRow}>
                                                <Text style={styles.infoLabel}>DOB :</Text>
                                                <Text style={styles.infoValue}>{moment(personalDetails.dob).format("DD-MM-YYYY")} / Time: {personalDetails?.timeOfBirth}</Text>
                                            </View>

                                            {/* Displaying Place of Birth */}
                                            {personalDetails?.placeofbirth && (
                                                <View style={styles.infoRow}>
                                                    <Text style={styles.infoLabel}>Place of Birth :</Text>
                                                    <Text style={styles.infoValue}>{personalDetails?.placeofbirth}</Text>
                                                </View>
                                            )}

                                            {/* Optional Details for Horoscope */}
                                            <View>
                                                {personalDetails?.nadi && (
                                                    <View style={styles.infoRow}>
                                                        <Text style={styles.infoLabel}>Nadi :</Text>
                                                        <Text style={styles.infoValue}>{personalDetails?.nadi}</Text>
                                                    </View>
                                                )}

                                                {personalDetails?.gotraSelf && (
                                                    <View style={styles.infoRow}>
                                                        <Text style={styles.infoLabel}>Gotra (Self) :</Text>
                                                        <Text style={styles.infoValue}>{personalDetails?.gotraSelf}</Text>
                                                    </View>
                                                )}

                                                {personalDetails?.manglikStatus && (
                                                    <View style={styles.infoRow}>
                                                        <Text style={styles.infoLabel}>Manglik Status :</Text>
                                                        <Text style={styles.infoValue}>{personalDetails?.manglikStatus}</Text>
                                                    </View>
                                                )}

                                                {personalDetails?.gotraMother && (
                                                    <View style={styles.infoRow}>
                                                        <Text style={styles.infoLabel}>Gotra (Mother) :</Text>
                                                        <Text style={styles.infoValue}>{personalDetails?.gotraMother}</Text>
                                                    </View>
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                )}
                            </View>
                        </View>

                        {/* About Me Section */}
                        <View style={styles.familyDiv}>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
                                    <MaterialCommunityIcons name="account-box-outline" size={25} color={Colors.theme_color} />
                                    <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>About Me</Text>
                                </View>

                                {personalDetails?.aboutMe?.trim() !== "" && (
                                    <Text style={styles.text}>{personalDetails?.aboutMe}</Text>
                                )}

                                <View style={{ marginVertical: SH(4) }}>
                                    <View style={styles.infoRow}>
                                        {personalDetails?.complexion && (
                                            <>
                                                <Text style={styles.infoLabel}>Complexion :</Text>
                                                <Text style={styles.infoValue}>{personalDetails.complexion}</Text>
                                            </>
                                        )}
                                    </View>

                                    <View style={styles.infoRow}>
                                        {personalDetails?.weight && (
                                            <>
                                                <Text style={styles.infoLabel}>Weight :</Text>
                                                <Text style={styles.infoValue}>{personalDetails.weight} kg</Text>
                                            </>
                                        )}
                                    </View>

                                    <View style={styles.infoRow}>
                                        {personalDetails?.livingStatus && (
                                            <>
                                                <Text style={styles.infoLabel}>Living with family :</Text>
                                                <Text style={styles.infoValue}>{personalDetails.livingStatus}</Text>
                                            </>
                                        )}
                                    </View>
                                </View>
                            </View>
                        </View>


                        {/* Family Section */}
                        <View style={[styles.familyDiv]}>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
                                    <FontAwesome name="group" size={20} color={Colors.theme_color} />
                                    <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Family Section</Text>
                                </View>

                                {personalDetails?.fatherName && (
                                    <View style={styles.infoRow}>
                                        <Text style={styles.infoLabel}>Father’s Name :</Text>
                                        <Text style={styles.infoValue}>{personalDetails.fatherName}</Text>
                                    </View>
                                )}
                                {personalDetails?.motherName && (
                                    <View style={styles.infoRow}>
                                        <Text style={styles.infoLabel}>Mother’s Name :</Text>
                                        <Text style={styles.infoValue}>{personalDetails.motherName}</Text>
                                    </View>
                                )}
                                {personalDetails?.fatherOccupation && (
                                    <View style={styles.infoRow}>
                                        <Text style={styles.infoLabel}>Father’s Occupation :</Text>
                                        <Text style={styles.infoValue}>{personalDetails.fatherOccupation}</Text>
                                    </View>
                                )}
                                {personalDetails?.fatherIncomeAnnually && (
                                    <View style={styles.infoRow}>
                                        <Text style={styles.infoLabel}>Father Income :</Text>
                                        <Text style={styles.infoValue}>{personalDetails.fatherIncomeAnnually}</Text>
                                    </View>
                                )}
                                {personalDetails?.motherOccupation && (
                                    <View style={styles.infoRow}>
                                        <Text style={styles.infoLabel}>Mother’s Occupation :</Text>
                                        <Text style={styles.infoValue}>{personalDetails.motherOccupation}</Text>
                                    </View>
                                )}
                                {personalDetails?.motherIncomeAnnually && (
                                    <View style={styles.infoRow}>
                                        <Text style={styles.infoLabel}>Mother’s Income :</Text>
                                        <Text style={styles.infoValue}>{personalDetails.motherIncomeAnnually}</Text>
                                    </View>
                                )}
                                {personalDetails?.siblings && (
                                    <View style={styles.infoRow}>
                                        <Text style={styles.infoLabel}>Siblings :</Text>
                                        <Text style={styles.infoValue}>{personalDetails.siblings}</Text>
                                    </View>
                                )}
                                {personalDetails?.familyType && (
                                    <View style={styles.infoRow}>
                                        <Text style={styles.infoLabel}>Family Type :</Text>
                                        <Text style={styles.infoValue}>{personalDetails.familyType}</Text>
                                    </View>
                                )}
                            </View>

                        </View>

                        {/* Contact Section */}
                        <View style={styles.detailbox}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
                                <AntDesign name="contacts" size={25} color={Colors.theme_color} />
                                <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Contact Details</Text>
                            </View>

                            {personalDetails?.contactNumber1 && (
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Mobile No. 1 :</Text>
                                    <Text style={styles.infoValue}>{personalDetails.contactNumber1}</Text>
                                </View>
                            )}
                            {personalDetails?.contactNumber2 && (
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Mobile No. 2 :</Text>
                                    <Text style={styles.infoValue}>{personalDetails.contactNumber2}</Text>
                                </View>
                            )}
                            {personalDetails?.cityOrVillage && (
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>City :</Text>
                                    <Text style={styles.infoValue}>{personalDetails.cityOrVillage}</Text>
                                </View>
                            )}
                            {personalDetails?.state && (
                                <View style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>State :</Text>
                                    <Text style={styles.infoValue}>{personalDetails.state}</Text>
                                </View>
                            )}
                        </View>

                        {/* Other Details */}
                        {hasOtherDetails && (
                            <View style={styles.familyDiv}>
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
                                        <MaterialIcons name="details" size={25} color={Colors.theme_color} />
                                        <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Other Details</Text>
                                    </View>

                                    {personalDetails?.knowCooking && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Cooking :</Text>
                                            <Text style={styles.infoValue}>{personalDetails.knowCooking}</Text>
                                        </View>
                                    )}
                                    {personalDetails?.dietaryHabit && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Diet :</Text>
                                            <Text style={styles.infoValue}>{personalDetails.dietaryHabit}</Text>
                                        </View>
                                    )}
                                    {personalDetails?.smokingHabit && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Smoke :</Text>
                                            <Text style={styles.infoValue}>{personalDetails.smokingHabit}</Text>
                                        </View>
                                    )}
                                    {personalDetails?.drinkingHabit && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Drinking :</Text>
                                            <Text style={styles.infoValue}>{personalDetails.drinkingHabit}</Text>
                                        </View>
                                    )}
                                    {personalDetails?.tobaccoHabits && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Tobacco :</Text>
                                            <Text style={styles.infoValue}>{personalDetails.tobaccoHabits}</Text>
                                        </View>
                                    )}
                                    {personalDetails?.hobbies && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Hobby :</Text>
                                            <Text style={styles.infoValue}>{personalDetails.hobbies}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        )}

                        {
                            personalDetails?.otherFamilyMemberInfo && (
                                <View style={styles.detailbox}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
                                        <FontAwesome name="group" size={20} color={Colors.theme_color} />
                                        <Text style={[styles.HeadingText, { marginLeft: SW(8) }]}>Family's Other Details</Text>
                                    </View>
                                    {personalDetails?.otherFamilyMemberInfo && <Text style={styles.text}>Other Family Members: {personalDetails.otherFamilyMemberInfo}</Text>}
                                </View>
                            )
                        }

                        {profileData?.partnerPreferences && Object.keys(profileData.partnerPreferences).length > 0 && (
                            <View style={styles.familyDiv}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: SH(5) }}>
                                    <MaterialCommunityIcons name="account-search" size={25} color={Colors.theme_color} />
                                    <Text style={[styles.HeadingText, { marginLeft: 8 }]}>My Partner Preferences</Text>
                                </View>
                                <View>
                                    {profileData.partnerPreferences.partnerBodyStructure && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Body Structure:</Text>
                                            <Text style={styles.infoValue}>{profileData.partnerPreferences.partnerBodyStructure}</Text>
                                        </View>
                                    )}

                                    {profileData.partnerPreferences.partnerDietaryHabits && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Diet:</Text>
                                            <Text style={styles.infoValue}>{profileData.partnerPreferences.partnerDietaryHabits}</Text>
                                        </View>
                                    )}

                                    {profileData.partnerPreferences.partnerSmokingHabits && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Smoke:</Text>
                                            <Text style={styles.infoValue}>{profileData.partnerPreferences.partnerSmokingHabits}</Text>
                                        </View>
                                    )}

                                    {profileData.partnerPreferences.partnerDrinkingHabits && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Drinking:</Text>
                                            <Text style={styles.infoValue}>{profileData.partnerPreferences.partnerDrinkingHabits}</Text>
                                        </View>
                                    )}

                                    {profileData.partnerPreferences.partnerDisabilities && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Disabilities:</Text>
                                            <Text style={styles.infoValue}>{profileData.partnerPreferences.partnerDisabilities}</Text>
                                        </View>
                                    )}

                                    {profileData.partnerPreferences.partnerManglikStatus && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Manglik Status:</Text>
                                            <Text style={styles.infoValue}>{profileData.partnerPreferences.partnerManglikStatus}</Text>
                                        </View>
                                    )}

                                    {profileData.partnerPreferences.partnerFamilyType && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Family Type:</Text>
                                            <Text style={styles.infoValue}>{profileData.partnerPreferences.partnerFamilyType}</Text>
                                        </View>
                                    )}

                                    {profileData.partnerPreferences.partnerMinAge && profileData.partnerPreferences.partnerMaxAge && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Age Range:</Text>
                                            <Text style={styles.infoValue}>
                                                {profileData.partnerPreferences.partnerMinAge} - {profileData.partnerPreferences.partnerMaxAge} yrs
                                            </Text>
                                        </View>
                                    )}

                                    {profileData.partnerPreferences.partnerMinHeightFeet && profileData.partnerPreferences.partnerMaxHeightFeet && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Height Range:</Text>
                                            <Text style={styles.infoValue}>
                                                {profileData.partnerPreferences.partnerMinHeightFeet} Min - {profileData.partnerPreferences.partnerMaxHeightFeet} Max
                                            </Text>
                                        </View>
                                    )}

                                    {profileData.partnerPreferences.partnerIncome && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Income:</Text>
                                            <Text style={styles.infoValue}>{profileData.partnerPreferences.partnerIncome}</Text>
                                        </View>
                                    )}

                                    {profileData.partnerPreferences.partnerOccupation && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Occupation:</Text>
                                            <Text style={styles.infoValue}>{profileData.partnerPreferences.partnerOccupation}</Text>
                                        </View>
                                    )}

                                    {profileData.partnerPreferences.partnerQualification && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Qualification:</Text>
                                            <Text style={styles.infoValue}>{profileData.partnerPreferences.partnerQualification}</Text>
                                        </View>
                                    )}

                                    {profileData.partnerPreferences.partnerState && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>State:</Text>
                                            <Text style={styles.infoValue}>{profileData.partnerPreferences.partnerState}</Text>
                                        </View>
                                    )}

                                    {profileData.partnerPreferences.partnerCity && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>City:</Text>
                                            <Text style={styles.infoValue}>{profileData.partnerPreferences.partnerCity}</Text>
                                        </View>
                                    )}

                                    {profileData.partnerPreferences.partnerExpectations && (
                                        <View style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Expectation with partner:</Text>
                                            <Text style={styles.infoValue}>{profileData.partnerPreferences.partnerExpectations}</Text>
                                        </View>
                                    )}
                                </View>
                            </View>
                        )}


                    </>
                )}
                {profileType === "Pandit" && (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.profileSection}>
                            <TouchableOpacity onPress={() => setVisible(true)}>
                                <Image source={profilePhoto} style={styles.profileImage} />
                            </TouchableOpacity>

                            <ImageViewing
                                images={[profileData?.profilePhoto ? { uri: profileData?.profilePhoto } : require('../../Images/NoImage.png')]}
                                imageIndex={0}
                                visible={visible}
                                onRequestClose={() => setVisible(false)}
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.name} numberOfLines={2}>{profileData?.fullName}</Text>

                                <View style={styles.FlexContainer}>
                                    <Text style={styles.city}>{profileData?.city}, </Text>
                                    <Text style={styles.city}>{profileData?.state}</Text>
                                </View>

                                <View style={styles.FlexContainer}>
                                    <Rating
                                        type="star"
                                        ratingCount={5}
                                        imageSize={15}
                                        startingValue={profileData?.averageRating}
                                        readonly
                                    />
                                    <Text style={styles.rating}>
                                        {profileData?.ratings?.length > 0 ? `${profileData?.ratings?.length} Reviews` : "No Ratings Yet"}
                                    </Text>
                                </View>
                                <Text style={styles.text} numberOfLines={1}>{profileData?.residentialAddress}</Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer}>
                            <View style={{ flex: 1, display: "flex", flexDirection: "row", justifyContent: "space-between", marginVertical: SH(5) }}>
                                {panditStatus === 'Expired' ? (
                                    <TouchableOpacity
                                        style={styles.editButton}
                                        onPress={() => navigation.navigate('BuySubscription', { serviceType: profileType })}
                                    >
                                        <Text style={styles.editButtonText}>Buy Subscription</Text>
                                    </TouchableOpacity>
                                ) : panditStatus === 'Pending' ? (
                                    <TouchableOpacity
                                        style={[styles.editButton, { backgroundColor: '#c4f2e4' }]}
                                        disabled={true}
                                    >
                                        <Text style={[styles.editButtonText, { color: "red" }]}>Subscription Pending</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={[styles.editButton, { backgroundColor: '#c4f2e4' }]}
                                        disabled={true}
                                    >
                                        <Text style={[styles.editButtonText, { color: 'green' }]}>Subscription Active</Text>
                                    </TouchableOpacity>
                                )}

                                <TouchableOpacity style={[styles.editButton]} onPress={() => navigation.navigate('UpdateProfileDetails', { profileData, profileType })}>
                                    <Text style={styles.editButtonText}>Edit Profile</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.section}>
                                {profileData?.description ? (
                                    <>
                                        <Text style={styles.sectionTitle}>Description</Text>
                                        <Text style={styles.text}>{profileData.description}</Text>
                                    </>
                                ) : null}
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Services List</Text>
                                <View style={styles.servicesGrid}>
                                    {profileData?.panditServices.map((service, index) => (
                                        <View key={index} style={styles.serviceContainer}>
                                            <Text style={styles.serviceText}>{service}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                            <View style={styles.ReviewPost}>
                                <View>
                                    <Text style={styles.sectionTitle}>Reviews & Rating</Text>
                                    <Text style={styles.rating}>{profileData?.averageRating} (⭐ Star Rating)</Text>
                                </View>

                            </View>
                            <View>
                                <Text style={[styles.sectionTitle, { textAlign: "center" }]}>Reviews</Text>

                                {profileData?.ratings?.length > 0 ? (
                                    <>
                                        {profileData?.ratings?.slice(0, 2).map((review, index) => (
                                            <View key={review._id || index} style={[styles.reviewContainer, { marginHorizontal: 0, width: "100%" }]}>
                                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                                    <View>
                                                        <Image
                                                            source={review?.userId?.photoUrl[0]
                                                                ? { uri: review.userId.photoUrl[0] }
                                                                : require("../../Images/NoImage.png") // Fallback image
                                                            }
                                                            style={{ width: SW(50), height: SH(50), borderRadius: 50 }}
                                                            resizeMode="cover"
                                                        />
                                                    </View>
                                                    <View style={{ flex: 1, marginHorizontal: SW(10) }}>
                                                        <Text style={styles.reviewName}>{review?.userId?.username || "Unknown"}</Text>
                                                        <View style={styles.reviewRating}>
                                                            <Rating
                                                                type="star"
                                                                ratingCount={5}
                                                                imageSize={15}
                                                                startingValue={review?.rating}
                                                                readonly
                                                            />
                                                        </View>
                                                        <Text style={styles.reviewText}>{review?.review}</Text>

                                                    </View>
                                                    <View style={{ alignSelf: "flex-end" }}>
                                                        <Text style={styles.reviewDate}>
                                                            {moment(review.createdAt).format("DD-MM-YYYY")}
                                                        </Text>
                                                        <Text style={styles.reviewDate}>
                                                            {moment(review.createdAt).format("hh:mm A")}
                                                        </Text>

                                                    </View>
                                                </View>
                                            </View>
                                        ))}

                                        {profileData?.ratings?.length > 2 && (
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('AllReviewsPage', { reviews: profileData?.ratings })}
                                                style={styles.viewMoreButton}>
                                                <Text style={styles.viewMoreText}>View More Reviews</Text>
                                            </TouchableOpacity>
                                        )}
                                    </>
                                ) : (
                                    <View style={styles.noReviewsContainer}>
                                        <Text style={styles.noReviewsTitle}>No Reviews Yet</Text>
                                        <Text style={styles.noReviewsSubtitle}>Newly uploaded reviews will appear here.</Text>
                                    </View>
                                )}

                            </View>

                        </View>
                        <View style={styles.container}>
                            {renderImages(images)}
                        </View>
                        <View style={styles.socialIcons}>
                            <TouchableOpacity onPress={() => profileData?.websiteUrl ? openLink(profileData.websiteUrl, "Website") : showMessages("Website link not available")}>
                                <Image source={require('../../Images/website.png')} style={styles.websiteIcon} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => profileData?.youtubeUrl ? openLink(profileData.youtubeUrl, "YouTube") : showMessages("YouTube link not available")}>
                                <MaterialCommunityIcons name="youtube" size={30} color="#FF0000" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => profileData?.whatsapp ? openLink(profileData.whatsapp, "WhatsApp") : showMessages("WhatsApp link not available")}>
                                <FontAwesome5 name="whatsapp" size={30} color="#25D366" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => profileData?.facebookUrl ? openLink(profileData.facebookUrl, "Facebook") : showMessages("Facebook link not available")}>
                                <FontAwesome5 name="facebook" size={30} color="#3b5998" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => profileData?.instagramUrl ? openLink(profileData.instagramUrl, "Instagram") : showMessages("Instagram link not available")}>
                                <FontAwesome5 name="instagram" size={30} color="#E4405F" />
                            </TouchableOpacity>
                        </View>
                        {/* <Image source={require('../../Images/slider.png')} style={styles.Bottomimage} /> */}
                    </ScrollView>
                )}

                {profileType === 'Kathavachak' && (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.profileSection}>
                            <TouchableOpacity onPress={() => setVisible(true)}>
                                <Image source={profilePhoto} style={styles.profileImage} />
                            </TouchableOpacity>

                            <ImageViewing
                                images={[profileData?.profilePhoto ? { uri: profileData?.profilePhoto } : require('../../Images/NoImage.png')]}
                                imageIndex={0}
                                visible={visible}
                                onRequestClose={() => setVisible(false)}
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.name} numberOfLines={2}>{profileData?.fullName}</Text>

                                <View style={styles.FlexContainer}>
                                    <Text style={styles.city}>{profileData?.city}, </Text>
                                    <Text style={styles.city}>{profileData?.state}</Text>
                                </View>

                                <View style={styles.FlexContainer}>
                                    <Rating
                                        type="star"
                                        ratingCount={5}
                                        imageSize={15}
                                        startingValue={profileData?.averageRating}
                                        readonly
                                    />
                                    <Text style={styles.rating}>
                                        {profileData?.ratings?.length > 0 ? `${profileData?.ratings?.length} Reviews` : "No Ratings Yet"}
                                    </Text>
                                </View>
                                <Text style={styles.text} numberOfLines={1}>{profileData?.residentialAddress}</Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer}>
                            <View style={{ flex: 1, display: "flex", flexDirection: "row", justifyContent: "space-between", marginVertical: SH(5) }}>
                                {KathavachakStatus === 'Expired' ? (
                                    <TouchableOpacity
                                        style={styles.editButton}
                                        onPress={() => navigation.navigate('BuySubscription', { serviceType: profileType })}
                                    >
                                        <Text style={styles.editButtonText}>Buy Subscription</Text>
                                    </TouchableOpacity>
                                ) : KathavachakStatus === 'Pending' ? (
                                    <TouchableOpacity
                                        style={[styles.editButton, { backgroundColor: '#c4f2e4' }]}
                                        disabled={true}
                                    >
                                        <Text style={[styles.editButtonText, { color: "red" }]}>Subscription Pending</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={[styles.editButton, { backgroundColor: '#04AA6D' }]}
                                        disabled={true}
                                    >
                                        <Text style={[styles.editButtonText, { color: '#fff' }]}>Subscription Active</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity style={[styles.editButton]} onPress={() => navigation.navigate('UpdateProfileDetails', { profileData, profileType })}>
                                    <Text style={styles.editButtonText}>Edit Profile</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.section}>
                                {profileData?.description ? (
                                    <>
                                        <Text style={styles.sectionTitle}>Description</Text>
                                        <Text style={styles.text}>{profileData?.description}</Text>
                                    </>
                                ) : null}
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Services List</Text>
                                <View style={styles.servicesGrid}>
                                    {profileData?.kathavachakServices.map((service, index) => (
                                        <View key={index} style={styles.serviceContainer}>
                                            <Text style={styles.serviceText}>{service}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                            <View style={styles.ReviewPost}>
                                <View>
                                    <Text style={styles.sectionTitle}>Reviews & Rating</Text>
                                    <Text style={styles.rating}>{profileData?.averageRating} (⭐ Star Rating)</Text>
                                </View>

                            </View>
                            <View>
                                <Text style={[styles.sectionTitle, { textAlign: "center" }]}>Reviews</Text>

                                {profileData?.ratings?.length > 0 ? (
                                    <>
                                        {profileData?.ratings?.slice(0, 2).map((review, index) => (
                                            <View key={review._id || index} style={[styles.reviewContainer, { marginHorizontal: 0, width: "100%" }]}>
                                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                                    <View>
                                                        <Image
                                                            source={review?.userId?.photoUrl[0]
                                                                ? { uri: review?.userId?.photoUrl[0] }
                                                                : require("../../Images/NoImage.png") // Fallback image
                                                            }
                                                            style={{ width: SW(50), height: SH(50), borderRadius: 50 }}
                                                            resizeMode="cover"
                                                        />
                                                    </View>
                                                    <View style={{ flex: 1, marginHorizontal: SW(10) }}>
                                                        <Text style={styles.reviewName}>{review?.userId?.username || "Unknown"}</Text>
                                                        <View style={styles.reviewRating}>
                                                            <Rating
                                                                type="star"
                                                                ratingCount={5}
                                                                imageSize={15}
                                                                startingValue={review?.rating}
                                                                readonly
                                                            />
                                                        </View>
                                                        <Text style={styles.reviewText}>{review?.review}</Text>

                                                    </View>
                                                    <View style={{ alignSelf: "flex-end" }}>
                                                        <Text style={styles.reviewDate}>
                                                            {moment(review.createdAt).format("DD-MM-YYYY")}
                                                        </Text>
                                                        <Text style={styles.reviewDate}>
                                                            {moment(review.createdAt).format("hh:mm A")}
                                                        </Text>

                                                    </View>
                                                </View>
                                            </View>
                                        ))}

                                        {profileData?.ratings?.length > 2 && (
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('AllReviewsPage', { reviews: profileData?.ratings })}
                                                style={styles.viewMoreButton}>
                                                <Text style={styles.viewMoreText}>View More Reviews</Text>
                                            </TouchableOpacity>
                                        )}
                                    </>
                                ) : (
                                    <View style={styles.noReviewsContainer}>
                                        <Text style={styles.noReviewsTitle}>No Reviews Yet</Text>
                                        <Text style={styles.noReviewsSubtitle}>Newly uploaded reviews will appear here.</Text>
                                    </View>
                                )}

                            </View>
                        </View>
                        <View style={styles.container}>
                            {renderImages(images)}
                        </View>
                        <View style={styles.socialIcons}>
                            <TouchableOpacity onPress={() => profileData?.websiteUrl ? openLink(profileData.websiteUrl, "Website") : showMessages("Website link not available")}>
                                <Image source={require('../../Images/website.png')} style={styles.websiteIcon} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => profileData?.youtubeUrl ? openLink(profileData.youtubeUrl, "YouTube") : showMessages("YouTube link not available")}>
                                <MaterialCommunityIcons name="youtube" size={30} color="#FF0000" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => profileData?.whatsapp ? openLink(profileData.whatsapp, "WhatsApp") : showMessages("WhatsApp link not available")}>
                                <FontAwesome5 name="whatsapp" size={30} color="#25D366" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => profileData?.facebookUrl ? openLink(profileData.facebookUrl, "Facebook") : showMessages("Facebook link not available")}>
                                <FontAwesome5 name="facebook" size={30} color="#3b5998" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => profileData?.instagramUrl ? openLink(profileData.instagramUrl, "Instagram") : showMessages("Instagram link not available")}>
                                <FontAwesome5 name="instagram" size={30} color="#E4405F" />
                            </TouchableOpacity>
                        </View>
                        {/* <Image source={require('../../Images/slider.png')} style={styles.Bottomimage} /> */}
                    </ScrollView>
                )}
                {profileType === 'Jyotish' && (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.profileSection}>
                            <TouchableOpacity onPress={() => setVisible(true)}>
                                <Image source={profilePhoto} style={styles.profileImage} />
                            </TouchableOpacity>

                            <ImageViewing
                                images={[profileData?.profilePhoto ? { uri: profileData?.profilePhoto } : require('../../Images/NoImage.png')]}
                                imageIndex={0}
                                visible={visible}
                                onRequestClose={() => setVisible(false)}
                            />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.name} numberOfLines={2}>{profileData?.fullName}</Text>

                                <View style={styles.FlexContainer}>
                                    <Text style={styles.city}>{profileData?.city}, </Text>
                                    <Text style={styles.city}>{profileData?.state}</Text>
                                </View>

                                <View style={styles.FlexContainer}>
                                    <Rating
                                        type="star"
                                        ratingCount={5}
                                        imageSize={15}
                                        startingValue={profileData?.averageRating}
                                        readonly
                                    />
                                    <Text style={styles.rating}>
                                        {profileData?.ratings?.length > 0 ? `${profileData?.ratings?.length} Reviews` : "No Ratings Yet"}
                                    </Text>
                                </View>
                                <Text style={styles.text} numberOfLines={1}>{profileData?.residentialAddress}</Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer}>
                            <View style={{ flex: 1, display: "flex", flexDirection: "row", justifyContent: "space-between", marginVertical: SH(5) }}>
                                {JyotishStatus === 'Expired' ? (
                                    <TouchableOpacity
                                        style={styles.editButton}
                                        onPress={() => navigation.navigate('BuySubscription', { serviceType: profileType })}
                                    >
                                        <Text style={styles.editButtonText}>Buy Subscription</Text>
                                    </TouchableOpacity>
                                ) : JyotishStatus === 'Pending' ? (
                                    <TouchableOpacity
                                        style={[styles.editButton, { backgroundColor: '#c4f2e4' }]}
                                        disabled={true}
                                    >
                                        <Text style={[styles.editButtonText, { color: "red" }]}>Subscription Pending</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        style={[styles.editButton, { backgroundColor: '#04AA6D' }]}
                                        disabled={true}
                                    >
                                        <Text style={[styles.editButtonText, { color: '#fff' }]}>Subscription Active</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity style={[styles.editButton]} onPress={() => navigation.navigate('UpdateProfileDetails', { profileData, profileType })}>
                                    <Text style={styles.editButtonText}>Edit Profile</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.section}>
                                {profileData?.description ? (
                                    <>
                                        <Text style={styles.sectionTitle}>Description</Text>
                                        <Text style={styles.text}>{profileData?.description}</Text>
                                    </>
                                ) : null}
                            </View>
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Services List</Text>
                                <View style={styles.servicesGrid}>
                                    {profileData?.jyotishServices.map((service, index) => (
                                        <View key={index} style={styles.serviceContainer}>
                                            <Text style={styles.serviceText}>{service}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                            <View style={styles.ReviewPost}>
                                <View>
                                    <Text style={styles.sectionTitle}>Reviews & Rating</Text>
                                    <Text style={styles.rating}>{profileData?.averageRating} (⭐ Star Rating)</Text>
                                </View>

                            </View>
                            <View>
                                <Text style={[styles.sectionTitle, { textAlign: "center" }]}>Reviews</Text>

                                {profileData?.ratings?.length > 0 ? (
                                    <>
                                        {profileData?.ratings?.slice(0, 2).map((review, index) => (
                                            <View key={review._id || index} style={[styles.reviewContainer, { marginHorizontal: 0, width: "100%" }]}>
                                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                                    <View>
                                                        <Image
                                                            source={review?.userId?.photoUrl[0]
                                                                ? { uri: review?.userId?.photoUrl[0] }
                                                                : require("../../Images/NoImage.png") // Fallback image
                                                            }
                                                            style={{ width: SW(50), height: SH(50), borderRadius: 50 }}
                                                            resizeMode="cover"
                                                        />
                                                    </View>
                                                    <View style={{ flex: 1, marginHorizontal: SW(10) }}>
                                                        <Text style={styles.reviewName}>{review?.userId?.username || "Unknown"}</Text>
                                                        <View style={styles.reviewRating}>
                                                            <Rating
                                                                type="star"
                                                                ratingCount={5}
                                                                imageSize={15}
                                                                startingValue={review?.rating}
                                                                readonly
                                                            />
                                                        </View>
                                                        <Text style={styles.reviewText}>{review?.review}</Text>

                                                    </View>
                                                    <View style={{ alignSelf: "flex-end" }}>
                                                        <Text style={styles.reviewDate}>
                                                            {moment(review.createdAt).format("DD-MM-YYYY")}
                                                        </Text>
                                                        <Text style={styles.reviewDate}>
                                                            {moment(review.createdAt).format("hh:mm A")}
                                                        </Text>

                                                    </View>
                                                </View>
                                            </View>
                                        ))}

                                        {profileData?.ratings?.length > 2 && (
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('AllReviewsPage', { reviews: profileData?.ratings })}
                                                style={styles.viewMoreButton}>
                                                <Text style={styles.viewMoreText}>View More Reviews</Text>
                                            </TouchableOpacity>
                                        )}
                                    </>
                                ) : (
                                    <View style={styles.noReviewsContainer}>
                                        <Text style={styles.noReviewsTitle}>No Reviews Yet</Text>
                                        <Text style={styles.noReviewsSubtitle}>Newly uploaded reviews will appear here.</Text>
                                    </View>
                                )}

                            </View>
                        </View>
                        <View style={styles.container}>
                            {renderImages(images)}
                        </View>
                        <View style={styles.socialIcons}>
                            <TouchableOpacity onPress={() => profileData?.websiteUrl ? openLink(profileData.websiteUrl, "Website") : showMessages("Website link not available")}>
                                <Image source={require('../../Images/website.png')} style={styles.websiteIcon} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => profileData?.youtubeUrl ? openLink(profileData.youtubeUrl, "YouTube") : showMessages("YouTube link not available")}>
                                <MaterialCommunityIcons name="youtube" size={30} color="#FF0000" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => profileData?.whatsapp ? openLink(profileData.whatsapp, "WhatsApp") : showMessages("WhatsApp link not available")}>
                                <FontAwesome5 name="whatsapp" size={30} color="#25D366" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => profileData?.facebookUrl ? openLink(profileData.facebookUrl, "Facebook") : showMessages("Facebook link not available")}>
                                <FontAwesome5 name="facebook" size={30} color="#3b5998" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => profileData?.instagramUrl ? openLink(profileData.instagramUrl, "Instagram") : showMessages("Instagram link not available")}>
                                <FontAwesome5 name="instagram" size={30} color="#E4405F" />
                            </TouchableOpacity>
                        </View>
                        {/* <Image source={require('../../Images/slider.png')} style={styles.Bottomimage} /> */}
                    </ScrollView>
                )}
            </ScrollView>
        </View>
    );
};

export default ProfileDetail;