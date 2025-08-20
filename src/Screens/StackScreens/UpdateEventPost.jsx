import { Text, View, TouchableOpacity, Image, TextInput, SafeAreaView, StatusBar, ActivityIndicator, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/CreatePostStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import { UPDATE_EVENT_NEWS } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import Entypo from 'react-native-vector-icons/Entypo';

// import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary } from 'react-native-image-picker';


const UpdateEventPost = ({ navigation, route }) => {
    const { eventData: initialEventData } = route.params || {};
    const [loading, setLoading] = useState(false);
    const MyActivistProfile = useSelector((state) => state.activist.activist_data);
    const [eventData, setEventData] = useState(initialEventData || { title: '', description: '', images: [] });
    const [photos, setPhotos] = useState([]);

    const MAX_PHOTOS = 4;

    const pickerOptions = {
        selectionLimit: MAX_PHOTOS,
        mediaType: "photo",
        includeBase64: true,
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 1,
    };

    // 🔹 On mount, agar eventData.images hai toh photos me set kar do
    useEffect(() => {
        if (eventData?.images?.length > 0 && photos.length === 0) {
            setPhotos(eventData.images);
        }
    }, [eventData]);

    // ✅ Upload new images (append, not overwrite)
    const handleImageUpload = () => {
        launchImageLibrary(
            { ...pickerOptions, selectionLimit: MAX_PHOTOS - photos.length },
            (response) => {
                if (response.didCancel) return;
                if (response.errorCode) {
                    console.log("ImagePicker Error:", response.errorMessage);
                    return;
                }

                const assets = response.assets || [];
                const newPhotos = assets.map(
                    (asset) => `data:image/jpeg;base64,${asset.base64}`
                );

                setPhotos((prev) => {
                    const merged = [...prev, ...newPhotos];
                    return merged.slice(0, MAX_PHOTOS);
                });
            }
        );
    };

    // ✅ Replace ek hi image
    const handleReplacePhoto = (index) => {
        launchImageLibrary({ ...pickerOptions, selectionLimit: 1 }, (response) => {
            if (response.didCancel) return;
            if (response.errorCode) {
                console.log("ImagePicker Error:", response.errorMessage);
                return;
            }

            const newImg = response.assets?.[0]?.base64;
            if (!newImg) return;

            setPhotos((prev) => {
                const updated = [...prev];
                updated[index] = `data:image/jpeg;base64,${newImg}`;
                return updated;
            });
        });
    };

    // ✅ Delete specific photo
    const handleDeletePhoto = (index) => {
        setPhotos((prev) => prev.filter((_, i) => i !== index));
    };


    const convertToBase64 = async (imageUri) => {
        try {
            if (!imageUri) { return null; }

            // If already in Base64 format, return directly ✅
            if (imageUri.startsWith('data:image')) {
                return imageUri;
            }

            // Fetch image and convert to blob ✅
            const response = await fetch(imageUri);
            const blob = await response.blob();

            const mimeType = blob.type || 'image/jpeg'; // Default JPEG ✅

            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result) {
                        resolve(`data:${mimeType};base64,${reader.result.split(',')[1]}`);
                    } else {
                        reject('Error reading Base64 data.');
                    }
                };
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error('Error converting image to Base64:', error);
            return null;
        }
    };


    const handleSubmit = async () => {
        try {
            setLoading(true);

            const token = await AsyncStorage.getItem('userToken');
            if (!token) { throw new Error('No token found'); }

            if (!eventData?._id) {
                throw new Error('Event ID is missing, update cannot proceed.');
            }

            // Convert images to Base64 format before sending
            const base64Images = await Promise.all(
                (photos.length > 0 ? photos : eventData?.images || []).map(convertToBase64)
            );

            const payload = {
                postId: eventData._id,
                title: eventData?.title,
                description: eventData?.description,
                images: base64Images,
            };

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            console.log('🔹 API Request to:', UPDATE_EVENT_NEWS);
            console.log('🔹 Payload:', JSON.stringify(payload));

            const response = await axios.patch(UPDATE_EVENT_NEWS, payload, { headers });

            console.log('✅ Event Updated Response:', JSON.stringify(response.data));

            if (response.status === 200 && response.data.status === true) {
                showMessage({
                    type: 'success',
                    message: 'Success',
                    description: response.data.message || 'Event updated successfully!',
                    icon: 'success',
                    duarion: 5000,
                });

                if (navigation && navigation.replace) {
                    navigation.replace('ViewMyEventPost');
                } else {
                    console.warn('⚠️ Navigation is not available');
                }

                // setTimeout(() => navigation.navigate("EventNews"), 2000);
                return;
            }

            throw new Error(response.data.message || 'Something went wrong');
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error('Error fetching biodata:', errorMsg);
            showMessage({
                type: 'danger',
                message: errorMsg,
                icon: 'danger',
                duarion: 5000,
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
            setLoading(false); // Stop Loader
        }
    };


    return (
        <SafeAreaView style={Globalstyles.container} edges={['top', 'bottom']}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />

            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Update Post</Text>
                </View>
            </View>

            <View style={styles.postHeader}>
                <Image source={{ uri: MyActivistProfile?.profilePhoto }} style={styles.profileImage} resizeMode="cover" />

                <View style={styles.postTextContainer}>
                    <Text style={styles.postText}>{MyActivistProfile?.fullname}</Text>
                    <Text style={styles.postText}>ID no. {MyActivistProfile?.activistId}</Text>
                </View>
            </View>

            <View style={styles.textContainer}>
                {/* <TextInput
                    style={Globalstyles.input}
                    placeholder='Title'
                    placeholderTextColor={Colors.gray}
                    value={eventData?.title}
                    onChangeText={(text) => setEventData((prev) => ({ ...prev, title: text }))}
                /> */}
                <TextInput
                    style={Globalstyles.textInput}
                    placeholder="What’s on your mind?"
                    placeholderTextColor={Colors.gray}
                    textAlignVertical="top"
                    multiline={true}
                    value={eventData?.description}
                    onChangeText={(text) => setEventData((prev) => ({ ...prev, description: text }))}
                />
            </View>

            {photos.length > 0 && (
                <View style={styles.photosContainer}>
                    <Text style={Globalstyles.title}>Uploaded Photos:</Text>

                    <FlatList
                        data={photos}
                        keyExtractor={(_, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <View style={{ marginRight: 10 }}>
                                <TouchableOpacity onPress={() => handleReplacePhoto(index)}>
                                    <Image source={{ uri: item }} style={styles.photo} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        position: "absolute",
                                        top: 3,
                                        right: 3,
                                        backgroundColor: "rgba(0,0,0,0.6)",
                                        borderRadius: 12,
                                        padding: 2,
                                    }}
                                    onPress={() => handleDeletePhoto(index)}
                                >
                                    <Entypo name="cross" size={18} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        )}
                        contentContainerStyle={{ alignItems: "center" }}
                    />
                </View>
            )}

            <TouchableOpacity
                style={styles.PostButton}
                onPress={handleSubmit}
                disabled={loading} 
            >
                {loading ? (
                    <ActivityIndicator size="large" color={Colors.light} />
                ) : (
                    <Text style={styles.PostText}>Update Post</Text>
                )}
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default UpdateEventPost;
