import { Text, View, Image, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
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
import { JYOTISH_DESCRIPTION } from '../../utils/BaseUrl';

const jyotishDetailsPage = ({ navigation, item, route }) => {
    const { jyotish_id } = route.params || {};
    const [profileData, setProfileData] = useState(null);
    const [userRating, setUserRating] = useState(0);
    const images = profileData?.additionalPhotos || [];
    const profileType = profileData?.profileType;

    console.log("profileData", profileData);
    console.log("jyotish_id", jyotish_id);

    useEffect(() => {
        fetchJyotishProfile();
    }, []);

    const fetchJyotishProfile = async () => {
        if (!jyotish_id) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Pandit ID not found!",
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
            const response = await axios.get(`${JYOTISH_DESCRIPTION}/${jyotish_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data.status === "success") {
                console.log("response.data.data", response.data.data);
                setProfileData(response.data.data);
            } else {
                Toast.show({
                    type: "error",
                    text1: "No Profile Found",
                    text2: response.data.message || "Something went wrong!",
                });
            }
        } catch (error) {
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

    const openLink = (url, platform) => {
        if (url) {
            Linking.openURL(url);
        } else {
            Alert.alert("Not Available", `${platform} link is not available.`);
        }
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
                            post: profileData, // Pass pandit details
                            images: images.filter(Boolean), // Ensure this is a valid array of images
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
                    <View>
                        <Text style={styles.name}>{profileData?.fullName}</Text>
                        <View style={styles.FlexContainer}>
                            <Text style={styles.city}>{profileData?.city}</Text>
                            <Text style={styles.surname}>{profileData?.state}</Text>
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
                        <Text style={styles.surname}>{profileData?.subCaste}</Text>
                    </View>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.text}>{profileData?.description}</Text>
                    </View>

                    <View style={styles.sharecontainer}>
                        <View style={styles.iconContainer}>
                            <FontAwesome name="bookmark-o" size={20} color={Colors.dark} />
                            <Text style={styles.iconText}>Save</Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <Feather name="send" size={20} color={Colors.dark} />
                            <Text style={styles.iconText}>Shares</Text>
                        </View>
                        <TouchableOpacity style={styles.Button} onPress={() => Linking.openURL(`tel:${profileData?.mobileNo}`)}>
                            <MaterialIcons name="call" size={20} color={Colors.light} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate('ReportPage')} >
                            <MaterialIcons name="error-outline" size={20} color={Colors.dark} />
                            <Text style={styles.iconText}>Report</Text>
                        </TouchableOpacity>
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
                    <View style={styles.section}>
                        <View style={styles.ReviewPost}>
                            <View>
                                <Text style={styles.sectionTitle}>Reviews & Rating</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.postReviewButton}
                                onPress={() => navigation.navigate('PostReview', { jyotish_id: jyotish_id, entityType: profileType })}
                            >
                                <Text style={styles.postReviewText}>Post Review</Text>
                            </TouchableOpacity>

                        </View>
                        <Text style={styles.rating}>{profileData?.rating} (100 star Rating)</Text>
                        <View style={styles.ratingCount}>
                            <Rating
                                type="star"
                                ratingCount={5}
                                imageSize={15}
                                startingValue={profileData?.rating}
                                readonly
                            />
                        </View>

                        <Text style={styles.reviewLabel}>Your Review</Text>
                        <View style={styles.ratingCount}>
                            <Rating
                                type='star'
                                ratingCount={5}
                                imageSize={15}
                                startingValue={userRating}
                                onFinishRating={(rating) => setUserRating(rating)}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { textAlign: "center" }]}>Reviews</Text>

                    {profileData?.ratings?.length > 0 ? (
                        <>
                            {profileData?.ratings?.slice(0, 2).map((review, index) => (
                                <View key={review._id || index} style={styles.reviewContainer}>
                                    <View style={styles.FlexContainer}>
                                        <Text style={styles.reviewName}>User ID: {review.userId}</Text>
                                        <Text style={styles.reviewDate}>
                                            {new Date(review.createdAt).toLocaleDateString()}
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

                            {profileData?.ratings?.length > 2 && (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('AllReviewsPage', { reviews: profileData?.ratings })}
                                    style={styles.viewMoreButton}>
                                    <Text style={styles.viewMoreText}>View More Reviews ({profileData?.ratings?.length - 2} more)</Text>
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
                    {profileData?.websiteUrl && (
                        <TouchableOpacity onPress={() => openLink(profileData?.websiteUrl, "Website")}>
                            <Image source={require('../../Images/website.png')} style={styles.websiteIcon} />
                        </TouchableOpacity>
                    )}
                    {profileData?.youtubeUrl && (
                        <TouchableOpacity onPress={() => openLink(profileData?.youtubeUrl, "YouTube")}>
                            <MaterialCommunityIcons name="youtube" size={30} color="#FF0000" />
                        </TouchableOpacity>
                    )}
                    {profileData?.whatsapp && (
                        <TouchableOpacity onPress={() => openLink(profileData?.whatsapp, "WhatsApp")}>
                            <FontAwesome5 name="whatsapp" size={30} color="#25D366" />
                        </TouchableOpacity>
                    )}
                    {profileData?.facebookUrl && (
                        <TouchableOpacity onPress={() => openLink(profileData?.facebookUrl, "Facebook")}>
                            <FontAwesome5 name="facebook" size={30} color="#3b5998" />
                        </TouchableOpacity>
                    )}
                    {profileData?.instagramUrl && (
                        <TouchableOpacity onPress={() => openLink(profileData?.instagramUrl, "Instagram")}>
                            <FontAwesome5 name="instagram" size={30} color="#E4405F" />
                        </TouchableOpacity>
                    )}
                </View>
                <Image source={require('../../Images/slider.png')} style={styles.Bottomimage} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default jyotishDetailsPage;
