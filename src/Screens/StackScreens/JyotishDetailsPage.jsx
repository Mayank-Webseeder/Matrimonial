import { Text, View, Image, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Linking, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useState, useCallback } from 'react';
import styles from '../StyleScreens/PanditDetailPageStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { Rating } from 'react-native-ratings';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Globalstyles from '../../utils/GlobalCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { JYOTISH_DESCRIPTION, SAVED_PROFILES } from '../../utils/BaseUrl';
import Toast from 'react-native-toast-message';
import moment from "moment";
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ImageViewing from 'react-native-image-viewing';
import { SH, SW } from '../../utils/Dimensions';

const jyotishDetailsPage = ({ navigation, item, route }) => {
    const { jyotish_id, isSaved: initialSavedState } = route.params || {};
    const [Save, setIsSaved] = useState(initialSavedState || false);
    const [profileData, setProfileData] = useState(null);
    const images = profileData?.additionalPhotos || [];
    const profileType = profileData?.profileType;
    const ProfileData = useSelector((state) => state.profile);
    const my_id = ProfileData?.profiledata?._id || null;
    const rating = ProfileData?.ratings;
    const [Loading, setLoading] = useState(false);
    const [myRatings, setMyRatings] = useState([]);
    const [otherRatings, setOtherRatings] = useState([]);
    const [visible, setVisible] = useState(false);

    const profilePhoto = profileData?.profilePhoto
        ? { uri: profileData.profilePhoto }
        : require('../../Images/NoImage.png');

    useFocusEffect(
        useCallback(() => {
            fetchJyotishProfile();
            console.log("myRatings", JSON.stringify(myRatings));
            console.log("Save", Save)
        }, [])
    );

    const fetchJyotishProfile = async () => {
        setLoading(true)
        if (!jyotish_id) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Jyotish ID not found!",
            });
            return;
        }

        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            Toast.show({
                type: "error",
                text1: "Authentication Error",
                text2: "No token found. Please log in again.",
            });
            return;
        }

        try {
            setLoading(true)
            const response = await axios.get(`${JYOTISH_DESCRIPTION}/${jyotish_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200 && response.data.status === true) {
                console.log("response.data.data", JSON.stringify(response.data.data));
                setProfileData(response.data.data);
                setMyRatings(response.data.data.ratings.filter(rating => rating.userId._id === my_id));
                setOtherRatings(response.data.data.ratings.filter(rating => rating.userId._id !== my_id));
            } else {
                Toast.show({
                    type: "error",
                    text1: "No Profile Found",
                    text2: response.data.message || "Something went wrong!",
                });
            }
        } catch (error) {
            setLoading(false)
            console.error("Error fetching profile:", error);
            Toast.show({
                type: "error",
                text1: "Network Error",
                text2: "Failed to load profile data",
            });
        } finally {
            setLoading(false);
        }
    };

    const savedProfiles = async () => {
        if (!jyotish_id) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "User ID not found!",
                position: "top",
            });
            return;
        }

        setIsSaved((prev) => !prev); // ✅ Optimistic UI Update

        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) throw new Error("No token found");

            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            console.log("API Request:", `${SAVED_PROFILES}/${jyotish_id}`);

            const response = await axios.post(`${SAVED_PROFILES}/${jyotish_id}`, {}, { headers });

            console.log("Response Data:", response?.data);

            if (response.status === 200 && response.data.status === true) {
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: response.data.message || "Profile saved successfully!",
                    position: "top",
                });

                // ✅ API response ke hisaab se state update karo
                setIsSaved(response.data.message.includes("saved successfully"));
            } else {
                throw new Error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("API Error:", error?.response ? JSON.stringify(error.response.data) : error.message);

            // ❌ Rollback state if API fails
            setIsSaved((prev) => !prev);

            let errorMessage = "Something went wrong!";
            if (error.response?.status === 400) {
                errorMessage = error.response.data?.message || "Bad request.";
            }

            Toast.show({
                type: "error",
                text1: "Error",
                text2: errorMessage,
                position: "top",
            });
        }
    };


    const openLink = (url, platform) => {
        if (url) {
            Linking.openURL(url);
        } else {
            Alert.alert("Not Available", `${platform} link is not available.`);
        }
    };

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    };

    const renderImages = (images) => {
        if (!images || images.length === 0) {
            return <Text style={styles.noReviewsText}>No images available for this post</Text>;
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
                            jyotishDetails: profileData,
                        })
                    }
                >
                    {/* Ensure the image has a valid source format */}
                    <Image source={{ uri: images[i] }} style={styles.image} />

                    {/* If there's an image next to it, show it */}
                    {images[i + 1] && <Image source={{ uri: images[i + 1] }} style={styles.image} />}
                </TouchableOpacity>
            );
        }

        return <View style={styles.imageContainer}>{rows}</View>;
    };

    const handleShare = async () => {
        Toast.show({
            type: "info",
            text1: "Info",
            text2: "Under development",
            position: "top",
        });
    };

    if (Loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={Colors.theme_color} />
            </View>
        );
    }

    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>{profileData?.fullName}</Text>
                </View>
                <View style={styles.righticons}>
                    {/* <AntDesign name={'search1'} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} /> */}
                    <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => { navigation.navigate('Notification') }} />
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.profileSection}>
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <Image source={profilePhoto} style={styles.profileImage} />
                    </TouchableOpacity>

                    <ImageViewing
                        images={[profileData?.profilePhoto ? { uri: profileData.profilePhoto } : require('../../Images/NoImage.png')]}
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
                                {profileData?.ratings?.length > 0 ? `${profileData.ratings.length} Reviews` : "No Ratings Yet"}
                            </Text>
                        </View>

                        <Text style={styles.text} numberOfLines={1}>{profileData?.residentialAddress}</Text>
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.text}>{profileData?.description}</Text>
                    <View style={styles.sharecontainer}>
    <TouchableOpacity 
        style={[styles.iconContainer, my_id === profileData?.userId]} 
        onPress={() => savedProfiles(profileData._id)}
        disabled={my_id === profileData?.userId} // ✅ Disable button for self
    >
        <FontAwesome
            name={Save ? "bookmark" : "bookmark-o"}
            size={19}
            color={my_id === profileData?.userId ? Colors.gray : Colors.dark} // ✅ Gray if disabled
        />
        <Text style={[styles.iconText, my_id === profileData?.userId && styles.disabledText]}>
            {Save ? "Saved" : "Save"}
        </Text>
    </TouchableOpacity>

    {/* ✅ Share button (Always Active) */}
    <TouchableOpacity style={styles.iconContainer} onPress={handleShare}>
        <Feather name="send" size={20} color={Colors.dark} />
        <Text style={styles.iconText}>Shares</Text>
    </TouchableOpacity>

    {/* ✅ Call Button (Disabled for self profile) */}
    <TouchableOpacity 
        style={[styles.Button, my_id === profileData?.userId && styles.disabledButton]} 
        onPress={() => Linking.openURL(`tel:${profileData?.mobileNo}`)}
        disabled={my_id === profileData?.userId} // ✅ Disable button
    >
        <MaterialIcons 
            name="call" 
            size={20} 
            color={my_id === profileData?.userId ? Colors.gray : Colors.light} // ✅ Gray if disabled
        />
    </TouchableOpacity>

    {/* ✅ Report Button (Disabled for self profile) */}
    <TouchableOpacity 
        style={[styles.iconContainer, my_id === profileData?.userId]} 
        onPress={() => navigation.navigate('ReportPage', { profileId: profileData?._id })}
        disabled={my_id === profileData?.userId} // ✅ Disable button
    >
        <MaterialIcons 
            name="error-outline" 
            size={20} 
            color={my_id === profileData?.userId ? Colors.gray : Colors.dark} // ✅ Gray if disabled
        />
        <Text style={[styles.iconText, my_id === profileData?.userId && styles.disabledText]}>
            Report
        </Text>
    </TouchableOpacity>
</View>
                    <View>
                        <Text style={styles.sectionTitle}>Services List</Text>
                        <View style={styles.servicesGrid}>
                            {profileData?.jyotishServices.map((service, index) => (
                                <View key={index} style={styles.serviceContainer}>
                                    <Text style={styles.serviceText}>{service}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <View>
                        <View style={styles.ReviewPost}>
                            <View>
                                <Text style={styles.sectionTitle}>Reviews & Rating</Text>
                            </View>
                            {
                                    my_id !== profileData?.userId && (
                                        <TouchableOpacity
                                            style={styles.postReviewButton}
                                            onPress={() => navigation.navigate('PostReview', {
                                                jyotish_id: jyotish_id,
                                                entityType: profileType,
                                                myReview: myRatings.length > 0 ? myRatings[0] : null
                                            })}
                                        >
                                            <Text style={styles.postReviewText}>
                                                {myRatings.length > 0 ? "Edit Review" : "Post Review"}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }
                        </View>
                        <Text style={styles.rating}>{profileData?.averageRating} (⭐ Star Rating)</Text>

                    </View>
                </View>
                {myRatings?.length > 0 && (
                    <View style={styles.reviewContainer}>
                        <View style={styles.FlexContainer}>
                            <View style={styles.FlexContainer}>
                                <Text style={styles.reviewName}>You</Text>
                            </View>
                            <View>
                                            <Text style={styles.reviewDate}>
                                                {moment(myRatings.createdAt).format("DD-MM-YYYY")}
                                            </Text>
                                            <Text style={styles.reviewDate}>
                                                {moment(myRatings.createdAt).format("hh:mm A")}
                                            </Text>

                                        </View>
                        </View>
                        <View style={styles.reviewRating}>
                            <Rating
                                type="star"
                                ratingCount={5}
                                imageSize={15}
                                startingValue={myRatings[0]?.rating}
                                readonly
                            />
                        </View>
                        <Text style={styles.reviewText}>{myRatings[0]?.review}</Text>
                    </View>
                )}
                <View>
                    <Text style={[styles.sectionTitle, { textAlign: "center" }]}>Reviews</Text>

                    {otherRatings?.length > 0 ? (
                        <>
                            {otherRatings?.slice(0, 2).map((review, index) => (
                                <View key={review._id || index} style={styles.reviewContainer}>
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
                                        <View style={{ alignSelf:"flex-start" }}>
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

                            {otherRatings.length > 2 && (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('AllReviewsPage', { reviews: otherRatings })}
                                    style={styles.viewMoreButton}>
                                    <Text style={styles.viewMoreText}>View More Reviews</Text>
                                </TouchableOpacity>
                            )}
                        </>
                    ) : (
                        <Text style={styles.noReviewsText}>No reviews yet</Text>
                    )}

                </View>

                <View style={styles.container}>
                    {renderImages(images)}
                </View>
                <View style={styles.socialIcons}>
                    <TouchableOpacity onPress={() => profileData?.websiteUrl ? openLink(profileData.websiteUrl, "Website") : showToast("Website link not available")}>
                        <Image source={require('../../Images/website.png')} style={styles.websiteIcon} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => profileData?.youtubeUrl ? openLink(profileData.youtubeUrl, "YouTube") : showToast("YouTube link not available")}>
                        <MaterialCommunityIcons name="youtube" size={30} color="#FF0000" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => profileData?.whatsapp ? openLink(profileData.whatsapp, "WhatsApp") : showToast("WhatsApp link not available")}>
                        <FontAwesome5 name="whatsapp" size={30} color="#25D366" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => profileData?.facebookUrl ? openLink(profileData.facebookUrl, "Facebook") : showToast("Facebook link not available")}>
                        <FontAwesome5 name="facebook" size={30} color="#3b5998" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => profileData?.instagramUrl ? openLink(profileData.instagramUrl, "Instagram") : showToast("Instagram link not available")}>
                        <FontAwesome5 name="instagram" size={30} color="#E4405F" />
                    </TouchableOpacity>
                </View>
                <Image source={require('../../Images/slider.png')} style={styles.Bottomimage} />
            </ScrollView>
            <Toast />
        </SafeAreaView>
    );
};

export default jyotishDetailsPage;

