import { Text, View, Image, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Linking, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useState,useCallback } from 'react';
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
    
    useFocusEffect(
        useCallback(() => {
            fetchJyotishProfile();
            console.log("myRatings", JSON.stringify(myRatings));
            console.log("Save",Save)
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

            if (response.data.status === "success") {
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
    
        setIsSaved((prev) => !prev); // Optimistic UI Update
    
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
    
            if (response.status === 200 && response?.data?.message) {
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: response.data.message,
                    position: "top",
                });
    
                // ✅ Correct State Update
                setIsSaved(response.data.message.includes("saved successfully"));
            }
        } catch (error) {
            console.error("API Error:", error?.response ? JSON.stringify(error.response.data) : error.message);
    
            // Rollback State If API Fails
            setIsSaved((prev) => !prev);
    
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.response?.data?.message || "Something went wrong!",
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
    const calculateAverageRating = (ratings) => {
        if (!ratings || ratings.length === 0) return 0; // Agar koi rating na ho toh default 0 dikhaye
        const total = ratings.reduce((sum, review) => sum + review.rating, 0);
        return (total / ratings.length).toFixed(1); // Decimal me 1 place tak dikhane ke liye
    };

    const averageRating = calculateAverageRating(profileData?.ratings);

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
                    <Image source={{ uri: profileData?.profilePhoto }} style={styles.profileImage} />
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
                                startingValue={profileData?.ratings}
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
                        <TouchableOpacity style={styles.iconContainer} onPress={() => savedProfiles(profileData._id)}>
                            <FontAwesome
                                name={Save ? "bookmark" : "bookmark-o"}
                                size={19}
                                color={Colors.dark}
                            />
                            <Text style={styles.iconText}>{Save ? "Saved" : "Save"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconContainer} onPress={handleShare} >
                            <Feather name="send" size={20} color={Colors.dark} />
                            <Text style={styles.iconText}>Shares</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.Button} onPress={() => Linking.openURL(`tel:${profileData?.mobileNo}`)}>
                            <MaterialIcons name="call" size={20} color={Colors.light} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={() => navigation.navigate('ReportPage', { profileId: profileData?._id })}
                        >
                            <MaterialIcons name="error-outline" size={20} color={Colors.dark} />
                            <Text style={styles.iconText}>Report</Text>
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


                        </View>
                        <Text style={styles.rating}>{averageRating} (⭐ Star Rating)</Text>

                    </View>
                </View>
                {myRatings?.length > 0 && (
                    <View style={styles.reviewContainer}>
                        <View style={styles.FlexContainer}>
                            <View style={styles.FlexContainer}>
                                <Text style={styles.reviewName}>You</Text>
                            </View>
                            <Text style={styles.reviewDate}>
                                {moment(myRatings[0].createdAt).format("DD/MM/YYYY")}
                            </Text>
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
                                    <View style={styles.FlexContainer}>
                                        <View style={styles.FlexContainer}>
                                            <Text style={styles.reviewName}>{review?.userId?.username || "Unknown"}</Text>

                                        </View>

                                        <Text style={styles.reviewDate}>
                                            {moment(review.createdAt).format("DD/MM/YYYY")}
                                        </Text>
                                    </View>
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
            <Toast/>
        </SafeAreaView>
    );
};

export default jyotishDetailsPage;

