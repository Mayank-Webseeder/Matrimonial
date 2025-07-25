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
import { BOTTOM_KATHAVACHAK_ADVERDISE_WINDOW, DeepLink, KATHAVACHAK_DESCRIPTION, SAVED_PROFILES } from '../../utils/BaseUrl';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { CommonActions, useFocusEffect } from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { SH, SW, SF } from '../../utils/Dimensions';
import { showMessage } from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const kathavachakDetailsPage = ({ navigation, item, route }) => {
    const insets = useSafeAreaInsets();
    const sliderRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slider, setSlider] = useState([]);
    const { id, kathavachak_id, isSaved: initialSavedState } = route.params || {};
    const finalId = kathavachak_id || id;
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
    const notifications = useSelector((state) => state.GetAllNotification.AllNotification);
    const notificationCount = notifications ? notifications.length : 0;
    const fromScreen = route.params?.fromScreen;


    const [modalVisible, setModalVisible] = useState(false);
    const [formattedImages, setFormattedImages] = useState([]);
    const [imageIndex, setImageIndex] = useState(0);


    const profilePhoto = profileData?.profilePhoto
        ? { uri: profileData.profilePhoto }
        : require('../../Images/NoImage.png');

    const validSlides = slider.filter(item => !!item.image);

    const openImageViewer = (index) => {
        const imageObjects = images.map(uri => ({ url: uri }));
        setFormattedImages(imageObjects);
        setImageIndex(index);
        setModalVisible(true);
    };

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (fromScreen === 'Kathavachak') {
                    navigation.goBack();
                } else {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'MainApp',
                                    state: {
                                        index: 0,
                                        routes: [{ name: 'Kathavachak' }],
                                    },
                                },
                            ],
                        })
                    );
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
            fetchkathavachakProfile();
            console.log('myRatings', JSON.stringify(myRatings));
        }, [])
    );

    const fetchkathavachakProfile = async () => {
        setLoading(true);
        if (!finalId) {
            showMessage({
                type: 'danger',
                message: 'Kathavachak ID not found!',
                icon: 'danger',
                duarion: 5000,
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
            setLoading(true);
            const response = await axios.get(`${KATHAVACHAK_DESCRIPTION}/${finalId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200 && response.data.status === true) {
                console.log('response.data.data', JSON.stringify(response.data.data));
                setProfileData(response.data.data);
                setMyRatings(response.data.data.ratings.filter(rating => rating.userId._id === my_id));
                setOtherRatings(response.data.data.ratings.filter(rating => rating.userId._id !== my_id));
            } else {
                showMessage({
                    type: 'danger',
                    message: 'No Profile Found',
                    description: response.data.message || 'Something went wrong!',
                    icon: 'danger',
                });
            }
        } catch (error) {
            setLoading(false);
            const errorMsg = error.response?.data?.message || error.message;
            console.error('Error fetching kathavachak detials :', errorMsg);
            showMessage({
                type: 'danger',
                message: errorMsg,
                description: 'Failed to load profile data',
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
        if (slider.length === 0) { return; }

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
            if (!token) { throw new Error('No token found'); }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };

            const response = await axios.get(BOTTOM_KATHAVACHAK_ADVERDISE_WINDOW, { headers });

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
            const errorMsg = error.response?.data?.message || error.message;
            console.error('Error fetching advertisement:', errorMsg);

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


    const savedProfiles = async () => {
        if (!finalId) {
            showMessage({
                type: 'danger',
                message: 'User ID not found!',
                icon: 'danger',
                duarion: 5000,
            });
            return;
        }

        setIsSaved((prev) => !prev);

        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) { throw new Error('No token found'); }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            console.log('API Request:', `${SAVED_PROFILES}/${finalId}`);

            const response = await axios.post(`${SAVED_PROFILES}/${finalId}`, {}, { headers });

            console.log('Response Data:', response?.data);

            if (response.status === 200 && response.data.status === true) {
                showMessage({
                    type: 'success',
                    message: response.data.message || 'Profile saved successfully!',
                    icon: 'success',
                    duarion: 7000,
                });

                // ✅ API response ke hisaab se state update karo
                setIsSaved(response.data.message.includes('saved successfully'));
            } else {
                throw new Error(response.data.message || 'Something went wrong');
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error('Error fetching biodata:', errorMsg);
            setIsSaved((prev) => !prev);

            showMessage({
                type: 'danger',
                message: errorMsg,
                icon: 'danger',
                duarion: 7000,
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
            duarion: 7000,
            autoHide: true,
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
        const profileType = 'kathavachak-detail';

        console.log('profileId', profileId);

        try {
            if (!profileId) { throw new Error('Missing profile ID'); }

            const directLink = `${DeepLink}/${profileType}/${profileId}`;
            console.log('directLink', directLink);

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
                            if (fromScreen === 'Kathavachak') {
                                navigation.goBack();
                            } else {
                                navigation.dispatch(
                                    CommonActions.reset({
                                        index: 0,
                                        routes: [
                                            {
                                                name: 'MainApp',
                                                state: {
                                                    index: 0,
                                                    routes: [{ name: 'Kathavachak' }],
                                                },
                                            },
                                        ],
                                    })
                                );
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
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + SH(10), flexGrow: 1 }}>
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
                                    imageSize={18}
                                    startingValue={profileData?.averageRating}
                                    readonly
                                />
                                <Text style={styles.rating}>
                                    {profileData?.ratings?.length > 0 ? `${profileData.ratings.length} Reviews` : 'No Ratings Yet'}
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
                                disabled={my_id === profileData?.userId} // ✅ Disable button for self
                            >
                                <FontAwesome
                                    name={Save ? 'bookmark' : 'bookmark-o'}
                                    size={19}
                                    color={my_id === profileData?.userId ? Colors.gray : Colors.dark} // ✅ Gray if disabled
                                />
                                <Text style={[styles.iconText, my_id === profileData?.userId && styles.disabledText]}>
                                    {Save ? 'Saved' : 'Save'}
                                </Text>
                            </TouchableOpacity>

                            {/* ✅ Share button (Always Active) */}
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
                                {profileData?.kathavachakServices.map((service, index) => (
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
                                                kathavachak_id: finalId,
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
                                    imageSize={15}
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
                                                    style={{ width: SW(50), height: SH(50), borderRadius: 50 }}
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
                        <View style={[styles.Bottomimage, { paddingBottom: SH(15) }]}>
                            <AppIntroSlider
                                ref={sliderRef}
                                data={slider}
                                renderItem={({ item }) => {
                                    const { width, height } = item.resolution;

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
                                                style={{ width: '100%', height: SH(180), resizeMode: 'contain' }}
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

export default kathavachakDetailsPage;

