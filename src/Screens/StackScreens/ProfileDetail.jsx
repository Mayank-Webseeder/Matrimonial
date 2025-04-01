import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Linking, ToastAndroid } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../StyleScreens/ProfileDetailStyle';
import Colors from '../../utils/Colors';
import moment from 'moment';
import { Rating } from 'react-native-ratings';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Globalstyles from '../../utils/GlobalCss';
import { SH, SW } from '../../utils/Dimensions';
import ImageViewing from 'react-native-image-viewing';
import { REPOST } from '../../utils/BaseUrl';
import Toast from 'react-native-toast-message';

const ProfileDetail = ({ route, navigation }) => {
    const { profileType } = route.params;
    const [profileData, setProfileData] = useState(null);
    console.log("profileData", profileData);
    const [loading, setLoading] = useState(true);
    const [postloading, setPostLoading] = useState(false);
    const images = profileData?.additionalPhotos || [];
    const [visible, setVisible] = useState(false);
    const [isImageViewVisible, setImageViewVisible] = useState(false);
    const imageUri = profileData?.personalDetails?.closeUpPhoto;
    const profilePhoto = profileData?.profilePhoto
        ? { uri: profileData.profilePhoto }
        : require('../../Images/NoImage.png');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const response = await axios.get(
                    `https://api-matrimonial.webseeder.tech/api/v1/user/profiles/${profileType}`,
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

        fetchData();
    }, [profileType]);

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
                            post: profileData, // Pass pandit details
                            images: images.filter(Boolean), // Ensure this is a valid array of images
                            panditDetails: profileData,
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

    const formattedHeight = profileData?.personalDetails?.heightFeet
        ?.replace(/\s*-\s*/, "")
        ?.replace(/\s+/g, "");

        const Repost = async () => {
            setPostLoading(true);
        
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'No token found!',
                });
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
                    Toast.show({
                        type: 'success',
                        text1: 'Success',
                        text2: response.data.message || 'Reposted successfully!',
                    });
                    // ToastAndroid.show(response.data.message || 'Reposted successfully!', ToastAndroid.SHORT);
                } else {
                    throw new Error(response.data.message || 'Something went wrong!');
                }
            } catch (error) {
                console.error("❌ Error fetching profile:", error?.response?.data || error);
        
                // ✅ Error message को हैंडल करने के लिए default वैल्यू सेट करें
                let errorMessage = "Something went wrong. Please try again later.";
        
                if (error?.response) {
                    if (error?.response?.status === 400 && error?.response?.data?.status === false) {
                        errorMessage = error.response.data?.message || "Failed to repost. Please try again!";
                    }
                }
                Toast.show({
                    type: 'info',
                    position: 'bottom',
                    text2: errorMessage,
                });
        
                // ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
            } finally {
                setPostLoading(false); // Stop loading
            }
        };
        
        

    return (
        <View style={Globalstyles.container}>
            <View style={Globalstyles.header}>
                <View style={{ flex: 1, flexDirection: 'row', alignContent: "center" }}>
                    <TouchableOpacity
                        // onPress={() => navigation.goBack()}
                        onPress={() => navigation.pop()}
                    >
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={styles.HeadingText}>{profileType} Details</Text>
                </View>
            </View>
           <ScrollView showsVerticalScrollIndicator={false}>
           {profileType === 'Biodata' && (
                <>
                    {imageUri && (
                <View>
                    {/* Clickable Image */}
                    <TouchableOpacity onPress={() => setImageViewVisible(true)}>
                        <Image
                            source={{ uri: imageUri }}
                            style={styles.matrimonyImage}
                        />
                    </TouchableOpacity>

                    {/* Full-Screen Image Viewer */}
                    <ImageViewing
                        images={[{ uri: imageUri }]}
                        imageIndex={0}
                        visible={isImageViewVisible}
                        onRequestClose={() => setImageViewVisible(false)}
                    />
                </View>
            )}

                    <View>
                      <View style={{display:"flex",flexDirection:"row",alignItems:"center", alignSelf: "flex-end",}}>
                      <Text style={styles.RepostText} onPress={() => !postloading && Repost()}>
                            {postloading ? <ActivityIndicator color="white" /> : "Repost"}
                        </Text>

                        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('MatrimonyPage')}>
                            <Text style={styles.editButtonText}>Edit Biodata</Text>
                        </TouchableOpacity>
                      </View>
                        {/* Full Name at the top */}
                        <Text style={styles.biodataname}>{profileData?.personalDetails?.fullname}</Text>
                        {/* Two-column Layout */}
                        <View style={styles.flexContainer2}>
                            {/* Left Column */}
                            <View style={styles.column}>
                                <Text style={styles.text}>{calculateAge(profileData?.personalDetails?.dob)} Yrs, {formattedHeight}</Text>
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
                            </View>

                            {/* Right Column */}
                            <View style={styles.column}>
                                {profileData?.personalDetails?.currentCity && (
                                    <Text style={styles.text}>City: {profileData.personalDetails.currentCity}</Text>
                                )}
                                {profileData?.personalDetails?.occupation && (
                                    <Text style={styles.text}>Occupation: {profileData.personalDetails.occupation}</Text>
                                )}
                                {profileData?.personalDetails?.annualIncome && (
                                    <Text style={styles.text}>Income: {profileData.personalDetails.annualIncome} INR</Text>
                                )}
                                {profileData?.personalDetails?.qualification && (
                                    <Text style={styles.text}>Qualification: {profileData.personalDetails.qualification}</Text>
                                )}
                                {profileData?.personalDetails?.profileCreatedBy && (
                                    <Text style={styles.text}>Profile Created By: {profileData.personalDetails.profileCreatedBy}</Text>
                                )}
                            </View>
                        </View>
                    </View>

                    {/* About Me Section */}
                    {profileData?.personalDetails?.aboutMe && (
                        <View style={styles.flexContainer1}>
                            <View>
                                <Text style={styles.HeadingText}>About Me</Text>
                                <Text style={styles.text}>{profileData?.personalDetails?.aboutMe}</Text>
                                <View style={styles.flexContainer4}>
                                    {profileData?.personalDetails?.complexion && <Text style={styles.text}>Completion: {profileData?.personalDetails?.complexion}</Text>}
                                    {profileData?.personalDetails?.weight && <Text style={styles.text}>Weight: {profileData?.personalDetails?.weight} kg </Text>}
                                </View>
                                <View style={styles.flexContainer4}>
                                    {profileData?.personalDetails?.currentCity && <Text style={styles.text}>Currently in: {profileData?.personalDetails?.currentCity}</Text>}
                                    {profileData?.personalDetails?.livingStatus && <Text style={styles.text}>Living with family: {profileData?.personalDetails?.livingStatus}</Text>}
                                </View>
                            </View>
                        </View>
                    )}

                    {/* Family Section */}
                    {profileData?.personalDetails?.fatherName && (
                        <View style={styles.flexContainer1}>
                            <View>
                                <Text style={styles.HeadingText}>Family Section</Text>
                                {profileData?.personalDetails?.fatherName && <Text style={styles.text}>Father’s Name: {profileData?.personalDetails.fatherName}</Text>}
                                {profileData?.personalDetails?.fatherOccupation && <Text style={styles.text}>Father’s Occupation: {profileData?.personalDetails.fatherOccupation}</Text>}
                                {profileData?.personalDetails?.motherName && <Text style={styles.text}>Mother’s Name: {profileData?.personalDetails.motherName}</Text>}
                                {profileData?.personalDetails?.fatherIncomeAnnually && <Text style={styles.text}>Family Income: {profileData?.personalDetails.fatherIncomeAnnually}</Text>}
                                {profileData?.personalDetails?.familyType && <Text style={styles.text}>Family Type: {profileData?.personalDetails.familyType}</Text>}
                                {
                                    profileData?.personalDetails?.otherFamilyMemberInfo &&
                                    <View>
                                        <Text style={styles.HeadingText}>About My family</Text>
                                        <Text style={styles.text}>{profileData?.personalDetails.otherFamilyMemberInfo}</Text>
                                    </View>

                                }
                            </View>
                        </View>
                    )}

                    {/* Contact Section */}
                    {profileData?.personalDetails?.contactNumber1 && (
                        <View style={styles.flexContainer1}>
                            <View>
                                <Text style={styles.HeadingText}>Contact Details:</Text>
                                {profileData?.personalDetails?.contactNumber1 && <Text style={styles.text}>Mobile No. 1: {profileData?.personalDetails.contactNumber1}</Text>}
                                {profileData?.personalDetails?.contactNumber2 && <Text style={styles.text}>Mobile No. 2: {profileData?.personalDetails.contactNumber2}</Text>}
                            </View>
                        </View>
                    )}

                    {/* Other Details */}
                    {profileData?.personalDetails?.knowCooking && (
                        <View style={styles.flexContainer1}>
                            <View>
                                <Text style={styles.HeadingText}>Other Details:</Text>
                                {profileData?.personalDetails?.knowCooking && <Text style={styles.text}>Cooking: {profileData?.personalDetails.knowCooking}</Text>}
                                {profileData?.personalDetails?.dietaryHabit && <Text style={styles.text}>Diet: {profileData?.personalDetails.dietaryHabit}</Text>}
                                {profileData?.personalDetails?.smokingHabit && <Text style={styles.text}>Smoke: {profileData?.personalDetails.smokingHabit}</Text>}
                                {profileData?.personalDetails?.drinkingHabit && <Text style={styles.text}>Drinking: {profileData?.personalDetails.drinkingHabit}</Text>}
                                {profileData?.personalDetails?.tobaccoHabits && <Text style={styles.text}>Tobacco: {profileData?.personalDetails.tobaccoHabits}</Text>}
                            </View>
                        </View>
                    )}
                    {profileData?.partnerPreferences && Object.keys(profileData.partnerPreferences).length > 0 && (
                        <View style={styles.flexContainer1}>
                            <Text style={styles.HeadingText}>My PartnerPreferences</Text>

                            {/* Left & Right Columns */}
                            <View style={[styles.flexContainer1, { borderWidth: 0, paddingHorizontal: 0, paddingVertical: 0 }]}>

                                {/* Left Column */}
                                <View style={styles.column}>
                                    {profileData.partnerPreferences.partnerBodyStructure && (
                                        <Text style={styles.text}>Body Structure: {profileData.partnerPreferences.partnerBodyStructure}</Text>
                                    )}
                                    {profileData.partnerPreferences.partnerDietaryHabits && (
                                        <Text style={styles.text}>Diet: {profileData.partnerPreferences.partnerDietaryHabits}</Text>
                                    )}
                                    {profileData.partnerPreferences.partnerSmokingHabits && (
                                        <Text style={styles.text}>Smoke: {profileData.partnerPreferences.partnerSmokingHabits}</Text>
                                    )}
                                    {profileData.partnerPreferences.partnerDrinkingHabits && (
                                        <Text style={styles.text}>Drinking: {profileData.partnerPreferences.partnerDrinkingHabits}</Text>
                                    )}
                                    {profileData.partnerPreferences.partnerDisabilities && (
                                        <Text style={styles.text}>Disabilities: {profileData.partnerPreferences.partnerDisabilities}</Text>
                                    )}
                                    {profileData.partnerPreferences.partnerManglikStatus && (
                                        <Text style={styles.text}>{profileData.partnerPreferences.partnerManglikStatus}</Text>
                                    )}
                                    {profileData.partnerPreferences.partnerFamilyType && (
                                        <Text style={styles.text}>Family Type: {profileData.partnerPreferences.partnerFamilyType}</Text>
                                    )}
                                </View>

                                {/* Right Column */}
                                <View style={styles.column}>
                                    {profileData.partnerPreferences.partnerMinAge && profileData.partnerPreferences.partnerMaxAge && (
                                        <Text style={styles.text}>Age Range: {profileData.partnerPreferences.partnerMinAge} - {profileData.partnerPreferences.partnerMaxAge} yrs</Text>
                                    )}
                                    {profileData.partnerPreferences.partnerMinHeightFeet && profileData.partnerPreferences.partnerMaxHeightFeet && (
                                        <Text style={styles.text}>Height Range: {profileData.partnerPreferences.partnerMinHeightFeet} - {profileData.partnerPreferences.partnerMaxHeightFeet} ft</Text>
                                    )}
                                    {profileData.partnerPreferences.partnerIncome && (
                                        <Text style={styles.text}>Income: {profileData.partnerPreferences.partnerIncome} INR</Text>
                                    )}
                                    {profileData.partnerPreferences.partnerOccupation && (
                                        <Text style={styles.text}>Occupation: {profileData.partnerPreferences.partnerOccupation}</Text>
                                    )}
                                    {profileData.partnerPreferences.partnerQualification && (
                                        <Text style={styles.text}>Qualification: {profileData.partnerPreferences.partnerQualification}</Text>
                                    )}
                                    {profileData.partnerPreferences.partnerState && (
                                        <Text style={styles.text}>State: {profileData.partnerPreferences.partnerState}</Text>
                                    )}
                                    {profileData.partnerPreferences.partnerCity && (
                                        <Text style={styles.text}>City: {profileData.partnerPreferences.partnerCity}</Text>
                                    )}
                                </View>

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
                        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('UpdateProfileDetails', { profileData, profileType })}>
                            <Text style={styles.editButtonText}>Edit Profile</Text>
                        </TouchableOpacity>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Description</Text>
                            <Text style={styles.text}>{profileData?.description}</Text>
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
                                <Text style={styles.noReviewsText}>No reviews yet</Text>
                            )}

                        </View>

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
                        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('UpdateProfileDetails', { profileData, profileType })}>
                            <Text style={styles.editButtonText}>Edit Profile</Text>
                        </TouchableOpacity>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Description</Text>
                            <Text style={styles.text}>{profileData?.description}</Text>
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
                                <Text style={styles.noReviewsText}>No reviews yet</Text>
                            )}

                        </View>
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
                        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('UpdateProfileDetails', { profileData, profileType })}>
                            <Text style={styles.editButtonText}>Edit Profile</Text>
                        </TouchableOpacity>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Description</Text>
                            <Text style={styles.text}>{profileData?.description}</Text>
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
                                <Text style={styles.noReviewsText}>No reviews yet</Text>
                            )}

                        </View>
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
                    {/* <Image source={require('../../Images/slider.png')} style={styles.Bottomimage} /> */}
                </ScrollView>
            )}
           </ScrollView>
            <Toast/>
        </View>
    );
};

export default ProfileDetail;