import { Text, View, Image, ScrollView, TouchableOpacity, StatusBar, SafeAreaView, Linking, ActivityIndicator, Share, BackHandler, Modal } from 'react-native';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
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
import { PANDIT_DESCRIPTION, SAVED_PROFILES, PANDIT_ADVERDISE_WINDOW, BOTTOM_PANDIT_ADVERDISE_WINDOW, DeepLink } from '../../utils/BaseUrl';
import moment from 'moment';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import { SH, SW, SF } from '../../utils/Dimensions';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PanditDetailPage = ({ navigation, item, route }) => {
      const insets = useSafeAreaInsets();
    const sliderRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slider, setSlider] = useState([]);
    const { id, pandit_id, isSaved: initialSavedState } = route.params || {};
    const finalId = pandit_id || id;
    const [Save, setIsSaved] = useState(initialSavedState || false);
    const [profileData, setProfileData] = useState(null);
    const images = profileData?.additionalPhotos || [];
    const profileType = profileData?.profileType;
    const ProfileData = useSelector((state) => state.profile);
    const my_id = ProfileData?.profiledata?._id || null;
    const [Loading, setLoading] = useState(false);
    const [myRatings, setMyRatings] = useState([]);
    const [otherRatings, setOtherRatings] = useState([]);
    const [visible, setVisible] = useState(false);
    const notifications = useSelector((state) => state.GetAllNotification.AllNotification);
    const notificationCount = notifications ? notifications.length : 0;
    const profilePhoto = profileData?.profilePhoto
        ? { uri: profileData.profilePhoto }
        : require('../../Images/NoImage.png');
    const validSlides = slider.filter(item => !!item.image);
    const fromScreen = route.params?.fromScreen;


    const [modalVisible, setModalVisible] = useState(false);
    const [formattedImages, setFormattedImages] = useState([]);
    const [imageIndex, setImageIndex] = useState(0);


    const openImageViewer = (index) => {
        const imageObjects = images.map(uri => ({ url: uri }));
        setFormattedImages(imageObjects);
        setImageIndex(index);
        setModalVisible(true);
    };

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (fromScreen === 'Pandit') {
                    navigation.goBack();
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'MainApp',
                                state: {
                                    routes: [
                                        {
                                            name: 'Tabs',
                                            state: {
                                                routes: [{ name: 'Pandit' }],
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                    });
                }
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [navigation, fromScreen])
    );

    useFocusEffect(
        useCallback(() => {
            fetchPanditProfile();
        }, [])
    );

    const fetchPanditProfile = async () => {
        setLoading(true);

        if (!finalId) {
            showMessage({
                type: 'danger',
                message: 'Pandit ID not found!',
                icon: 'danger',
                duration: 5000,
            });
            return;
        }

        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
            showMessage({
                type: 'danger',
                message: 'Authentication Error',
                description: 'No token found. Please log in again.',
                duration: 5000,
            });

            navigation.reset({
                index: 0,
                routes: [{ name: 'AuthStack' }],
            });
            return;
        }

        try {
            const response = await axios.get(`${PANDIT_DESCRIPTION}/${finalId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data.status) {
                setProfileData(response.data.data);
                setMyRatings(response.data.data.ratings.filter(rating => rating.userId._id === my_id));
                setOtherRatings(response.data.data.ratings.filter(rating => rating.userId._id !== my_id));
            } else {
                showMessage({
                    type: 'danger',
                    message: 'No Profile Found',
                    description: response.data.message || 'Something went wrong!',
                    duration: 5000,
                });
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error('Error fetching pandit data:', errorMsg);

            showMessage({
                type: 'danger',
                message: errorMsg,
                description: 'Failed to load profile data',
                duration: 5000,
            });

            const sessionExpiredMessages = [
                'User does not Exist....!Please login again',
                'Invalid token. Please login again',
                'Token has expired. Please login again',
            ];

            if (sessionExpiredMessages.includes(errorMsg)) {
                await AsyncStorage.removeItem('userToken');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AuthStack' }],
                });
            }
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        Advertisement_window();
    }, []);


    useEffect(() => {
        if (slider.length === 0) {return;}

        const currentSlide = slider[currentIndex];
        const durationInSeconds = Number(currentSlide?.duration) || 4;
        const durationInMilliseconds = durationInSeconds * 1000;
        console.log('durationInSeconds', durationInSeconds);
        const timeout = setTimeout(() => {
            const nextIndex = currentIndex < slider.length - 1 ? currentIndex + 1 : 0;
            setCurrentIndex(nextIndex);
            sliderRef.current?.goToSlide(nextIndex);
        }, durationInMilliseconds);

        return () => clearTimeout(timeout);
    }, [currentIndex, slider]);


    const Advertisement_window = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {throw new Error('No token found');}

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };

            const response = await axios.get(BOTTOM_PANDIT_ADVERDISE_WINDOW, { headers });

            if (response.data) {
                const fetchedData = response.data.data;
                console.log('fetchedData', JSON.stringify(fetchedData));

                const fullSliderData = fetchedData.flatMap((item) =>
                    item.media.map((mediaItem) => ({
                        id: `${item._id}_${mediaItem._id}`,
                        title: item.title,
                        description: item.description,
                        image: `https://api-matrimonial.webseeder.tech/${mediaItem.mediaUrl}`,
                        resolution: mediaItem.resolution,
                        hyperlink: mediaItem.hyperlink,
                        duration: mediaItem.duration || 4,
                    }))
                );

                setSlider(fullSliderData);
                console.log('Slider Data:', fullSliderData);
            } else {
                setSlider([]);
            }
        } catch (error) {
            console.error('Error fetching advertisement:', error);
        } finally {
            setLoading(false);
        }
    };


    const savedProfiles = async () => {
        if (!finalId) {
            showMessage({
                type: 'danger',
                message: 'Error',
                description: 'User ID not found!',
                duarion: 5000,
            });
            return;
        }

        setIsSaved((prev) => !prev); // ✅ Optimistic UI Update

        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {throw new Error('No token found');}

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            console.log('API Request:', `${SAVED_PROFILES}/${finalId}`);

            const response = await axios.post(`${SAVED_PROFILES}/${finalId}`, {}, { headers });

            console.log('Response Data:', response?.data);

            if (response.status === 200 && response.data.status === true) { // ✅ Corrected check
                showMessage({
                    type: 'success',
                    message: 'Success',
                    description: response.data.message || 'Profile saved successfully!',
                    icon: 'success',
                    duarion: 5000,
                });

                // ✅ API response ke hisaab se state update karo
                setIsSaved(response.data.message.includes('saved successfully'));
            } else {
                throw new Error(response.data.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('API Error:', error?.response ? JSON.stringify(error.response.data) : error.message);

            // ❌ Rollback state if API fails
            setIsSaved((prev) => !prev);

            let errorMessage = 'Something went wrong!';
            if (error.response?.status === 400) {
                errorMessage = error.response.data?.message || 'Bad request.';
            }

            showMessage({
                type: 'error',
                message: 'Error',
                description: errorMessage,
                icon: 'danger',
                duarion: 5000,
            });
        }
    };

    const openLink = (url, platform) => {
        if (url) {
            Linking.openURL(url);
        } else {
            Alert.alert('Not Available', `${platform} link is not available.`);
        }
    };

    const showMessages = (message) => {
        showMessage({
            type: 'info',
            message: message,
            duarion: 5000,
            autoHide: true,
            icon: 'info',
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
                <View style={styles.imageRow} key={i}>
                    <TouchableOpacity onPress={() => openImageViewer(i)} style={styles.image}>
                        <Image source={{ uri: images[i] }} style={styles.image} />
                    </TouchableOpacity>

                    {images[i + 1] && (
                        <TouchableOpacity onPress={() => openImageViewer(i + 1)} style={styles.image}>
                            <Image source={{ uri: images[i + 1] }} style={styles.image} />
                        </TouchableOpacity>
                    )}
                </View>
            );
        }

        return <View style={styles.imageContainer}>{rows}</View>;
    };

    const handleShare = async () => {
        const profileId = profileData?._id;
        const profileType = 'pandit-detail';

        console.log('profileId', profileId);

        try {
            if (!profileId) {throw new Error('Missing profile ID');}

            const directLink = `${DeepLink}/${profileType}/${profileId}`;

            await Share.share({
                message: `Check this profile in Brahmin Milan app:\n${directLink}`,
            });
        } catch (error) {
            console.error('Sharing failed:', error?.message || error);
        }
    };


    if (Loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.theme_color} />
            </View>
        );
    }

    return (
        <SafeAreaView style={Globalstyles.container} edges={['top', 'bottom']}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (fromScreen === 'Pandit') {
                                navigation.goBack();
                            } else {
                                navigation.reset({
                                    index: 0,
                                    routes: [
                                        {
                                            name: 'MainApp',
                                            state: {
                                                routes: [
                                                    {
                                                        name: 'Tabs',
                                                        state: {
                                                            routes: [{ name: 'Pandit' }],
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                });
                            }
                        }}
                    >
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>

                    <Text style={Globalstyles.headerText}>{profileData?.fullName}</Text>
                </View>
                <View style={styles.righticons}>
                    <TouchableOpacity style={{ position: 'relative' }} onPress={() => navigation.navigate('Notification')}>
                        <AntDesign
                            name="bells"
                            size={25}
                            color={Colors.theme_color}
                        />
                        {notificationCount > 0 && (
                            <View
                                style={{
                                    position: 'absolute',
                                    right: -5,
                                    top: -5,
                                    width: SW(16),
                                    height: SW(16),
                                    borderRadius: SW(16) / 2,
                                    backgroundColor: 'red',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <Text style={{ color: 'white', fontSize: SF(9), fontFamily: 'Poppins-Bold' }}>
                                    {notificationCount}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: insets.bottom + SH(5), flexGrow: 1}}>
                <View>
                    <View style={styles.profileSection}>
                        <TouchableOpacity onPress={() => setVisible(true)}>
                            <Image source={profilePhoto} style={styles.profileImage} />
                        </TouchableOpacity>

                        {visible && (
                            <Modal
                                visible={visible}
                                transparent={true}
                                onRequestClose={() => setVisible(false)}
                            >
                                <ImageViewer
                                    imageUrls={[
                                        profileData?.profilePhoto
                                            ? { url: profileData.profilePhoto }
                                            : { url: Image.resolveAssetSource(require('../../Images/NoImage.png')).uri },
                                    ]}
                                    index={0}
                                    onSwipeDown={() => setVisible(false)}
                                    onCancel={() => setVisible(false)}
                                    enableSwipeDown={true}
                                    enablePreload={true}
                                    saveToLocalByLongPress={false}
                                    renderIndicator={() => null}
                                />
                            </Modal>
                        )}

                        <View style={{ flex: 1 }}>
                            <Text style={styles.name} numberOfLines={2}>{profileData?.fullName}</Text>

                            <View style={styles.FlexContainer}>
                                <Text style={[styles.city, { fontFamily: 'Poppins-Bold' }]}>{profileData?.city}</Text>
                                <Text style={styles.city}>{profileData?.state}</Text>
                            </View>
                            {profileData?.residentialAddress ? (
                                <Text style={styles.text} numberOfLines={1}>
                                    {profileData.residentialAddress}
                                </Text>
                            ) : null}
                            <View style={styles.FlexContainer}>
                                <Rating
                                    type="star"
                                    ratingCount={5}
                                    imageSize={15}
                                    startingValue={profileData?.averageRating}
                                    readonly
                                />
                                <Text style={styles.rating}>
                                    {profileData?.ratings?.length > 0 ? `${profileData?.ratings?.length} Reviews` : 'No Ratings Yet'}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.contentContainer}>
                        {profileData?.description ? (
                            <>
                                <Text style={styles.sectionTitle}>Description</Text>
                                <Text style={styles.text}>{profileData.description}</Text>
                            </>
                        ) : null}
                        <View style={styles.sharecontainer}>
                            <TouchableOpacity
                                style={[styles.iconContainer, my_id === profileData?.userId]}
                                onPress={() => savedProfiles(profileData._id)}
                                disabled={my_id === profileData?.userId}
                            >
                                <FontAwesome
                                    name={Save ? 'bookmark' : 'bookmark-o'}
                                    size={19}
                                    color={my_id === profileData?.userId ? Colors.gray : Colors.dark}
                                />
                                <Text style={[styles.iconText, my_id === profileData?.userId && styles.disabledText]}>
                                    {Save ? 'Saved' : 'Save'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.iconContainer} onPress={handleShare}>
                                <Feather name="send" size={20} color={Colors.dark} />
                                <Text style={styles.iconText}>Shares</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.Button, my_id === profileData?.userId && styles.disabledButton]}
                                onPress={() => Linking.openURL(`tel:${profileData?.mobileNo}`)}
                                disabled={my_id === profileData?.userId}
                            >
                                <MaterialIcons
                                    name="call"
                                    size={20}
                                    color={my_id === profileData?.userId ? Colors.gray : Colors.light}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.iconContainer, my_id === profileData?.userId]}
                                onPress={() => navigation.navigate('ReportPage', { profileId: profileData?._id })}
                                disabled={my_id === profileData?.userId}
                            >
                                <MaterialIcons
                                    name="error-outline"
                                    size={20}
                                    color={my_id === profileData?.userId ? Colors.gray : Colors.dark}
                                />
                                <Text style={[styles.iconText, my_id === profileData?.userId && styles.disabledText]}>
                                    Report
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {profileData?.experience ? (
                            <>
                                <Text style={styles.sectionTitle}>Experience </Text>
                                <Text style={styles.text}>{profileData?.experience ? `${profileData.experience}+ years of experience` : ''}</Text>
                            </>
                        ) : null}

                        <View>
                            <Text style={styles.sectionTitle}>Services List</Text>
                            <View style={styles.servicesGrid}>
                                {profileData?.panditServices.map((service, index) => (
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
                                <View>
                                    {
                                        my_id !== profileData?.userId && (
                                            <TouchableOpacity
                                                style={styles.postReviewButton}
                                                onPress={() => navigation.navigate('PostReview', {
                                                    pandit_id: finalId,
                                                    entityType: profileType,
                                                    myReview: myRatings.length > 0 ? myRatings[0] : null,
                                                })}
                                            >
                                                <Text style={styles.postReviewText}>
                                                    {myRatings.length > 0 ? 'Edit Review' : 'Post Review'}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    }

                                </View>


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
                                        {moment(myRatings.createdAt).format('DD-MM-YYYY')}
                                    </Text>
                                    <Text style={styles.reviewDate}>
                                        {moment(myRatings.createdAt).format('hh:mm A')}
                                    </Text>

                                </View>
                            </View>
                            <View style={styles.reviewRating}>
                                <Rating
                                    type="star"
                                    ratingCount={5}
                                    imageSize={18}
                                    startingValue={myRatings[0]?.rating}
                                    readonly
                                />
                            </View>
                            <Text style={styles.reviewText}>{myRatings[0]?.review}</Text>
                        </View>
                    )}
                    <View>
                        <Text style={[styles.sectionTitle, { textAlign: 'center' }]}>Reviews</Text>

                        {otherRatings?.length > 0 ? (
                            <>
                                {otherRatings?.slice(0, 3).map((review, index) => (
                                    <View key={review._id || index} style={styles.reviewContainer}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View>
                                                <Image
                                                    source={review?.userId?.photoUrl[0]
                                                        ? { uri: review.userId.photoUrl[0] }
                                                        : require('../../Images/NoImage.png')
                                                    }
                                                    style={{
                                                        width: SW(50),
                                                        height: SW(50),
                                                        borderRadius: SW(25),
                                                        marginRight: SW(10),
                                                    }}
                                                    resizeMode="cover"
                                                />
                                            </View>
                                            <View style={{ flex: 1, marginHorizontal: SW(10) }}>
                                                <Text style={styles.reviewName}>{review?.userId?.username || 'Unknown'}</Text>
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
                                            <View style={{ alignSelf: 'flex-start' }}>
                                                <Text style={styles.reviewDate}>
                                                    {moment(review.createdAt).format('DD-MM-YYYY')}
                                                </Text>
                                                <Text style={styles.reviewDate}>
                                                    {moment(review.createdAt).format('hh:mm A')}
                                                </Text>

                                            </View>
                                        </View>

                                    </View>
                                ))}

                                {otherRatings.length > 3 && (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('AllReviewsPage', { reviews: otherRatings })}
                                        style={styles.viewMoreButton}>
                                        <Text style={styles.viewMoreText}>View More Reviews</Text>
                                    </TouchableOpacity>
                                )}
                            </>
                        ) : (
                            <View style={styles.noReviewsContainer}>
                                <Text style={styles.noReviewsTitle}>Reviews will show up here</Text>
                                <Text style={styles.noReviewsSubtitle}>You'll see others' feedback once they post it.</Text>
                            </View>
                        )}

                    </View>

                    <View style={styles.container}>
                        {renderImages(images)}
                    </View>
                    <View style={styles.socialIcons}>
                        <TouchableOpacity onPress={() => profileData?.websiteUrl ? openLink(profileData.websiteUrl, 'Website') : showMessages('Website link not available')}>
                            <Image source={require('../../Images/website.png')} style={styles.websiteIcon} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => profileData?.youtubeUrl ? openLink(profileData.youtubeUrl, 'YouTube') : showMessages('YouTube link not available')}>
                            <MaterialCommunityIcons name="youtube" size={30} color="#FF0000" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => profileData?.whatsapp ? openLink(profileData.whatsapp, 'WhatsApp') : showMessages('WhatsApp link not available')}>
                            <FontAwesome5 name="whatsapp" size={30} color="#25D366" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => profileData?.facebookUrl ? openLink(profileData.facebookUrl, 'Facebook') : showMessages('Facebook link not available')}>
                            <FontAwesome5 name="facebook" size={30} color="#3b5998" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => profileData?.instagramUrl ? openLink(profileData.instagramUrl, 'Instagram') : showMessages('Instagram link not available')}>
                            <FontAwesome5 name="instagram" size={30} color="#E4405F" />
                        </TouchableOpacity>
                    </View>
                    {validSlides.length > 0 && (
                        <View style={styles.Bottomimage}>
                            <AppIntroSlider
                                ref={sliderRef}
                                data={validSlides}
                                renderItem={({ item }) => {
                                    const { width = 300, height = 150 } = item.resolution || {};

                                    const handlePress = () => {
                                        if (item.hyperlink) {
                                            Linking.openURL(item.hyperlink).catch(err =>
                                                console.error('Failed to open URL:', err)
                                            );
                                        }
                                    };

                                    return (
                                        <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
                                            <Image
                                                source={{ uri: item.image }}
                                                style={{ width, height, resizeMode: 'cover' }}
                                            />
                                        </TouchableOpacity>
                                    );
                                }}
                                showNextButton={false}
                                showDoneButton={false}
                                dotStyle={Globalstyles.dot}
                                activeDotStyle={Globalstyles.activeDot}
                            />
                        </View>
                    )}

                </View>
            </ScrollView>
            <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
                <ImageViewer
                    imageUrls={formattedImages}
                    index={imageIndex}
                    onSwipeDown={() => setModalVisible(false)}
                    onCancel={() => setModalVisible(false)}
                    enableSwipeDown={true}
                    enablePreload={true}
                    saveToLocalByLongPress={false}
                    backgroundColor="rgba(0,0,0,0.95)"
                    renderIndicator={(currentIndex, allSize) => (
                        <View style={{
                            position: 'absolute',
                            top: 30,
                            alignSelf: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            paddingHorizontal: 10,
                            paddingVertical: 6,
                            borderRadius: 5,
                            zIndex: 999,
                        }}>
                            <Text style={{ color: '#fff' }}>{currentIndex} / {allSize}</Text>
                        </View>
                    )}
                    renderImage={(props) => (
                        <Image
                            {...props}
                            resizeMode="contain"
                            style={{ width: '100%', height: '100%' }}
                        />
                    )}
                />
            </Modal>

        </SafeAreaView>
    );
};

export default PanditDetailPage;
