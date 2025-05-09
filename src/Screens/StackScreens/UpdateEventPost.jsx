import { Text, View, TouchableOpacity, Image, TextInput, SafeAreaView, StatusBar, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
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

const UpdateEventPost = ({ navigation, route }) => {
    const { eventData: initialEventData } = route.params || {};
    const [loading, setLoading] = useState(false);
    const MyActivistProfile = useSelector((state) => state.activist.activist_data);
    const [eventData, setEventData] = useState(initialEventData || { title: '', description: '', images: [] });
    const [photos, setPhotos] = useState([]);
    const MAX_PHOTOS = 5;

    // useEffect(() => {
    //     console.log("eventData", eventData);
    // }, [eventData]);

    const handleImageUpload = () => {
        ImageCropPicker.openPicker({
            multiple: true,
            cropping: true,
            width: 400,
            height: 400,
            includeBase64: true,
            compressImageQuality: 1,
        })
            .then((images) => {
                const newPhotos = images.map(
                    (img) => `data:image/jpeg;base64,${img.data}` // keep data‑URI prefix
                );

                if (newPhotos.length > MAX_PHOTOS) {
                    alert(`You can only upload up to ${MAX_PHOTOS} photos.`);
                    return;
                }

                setPhotos(newPhotos);
                setEventData((prev) => ({ ...prev, images: [] }));
            })
            .catch((err) => console.log('Crop Picker Error:', err));
    };

    const convertToBase64 = async (imageUri) => {
        try {
            if (!imageUri) return null;

            // If already in Base64 format, return directly ✅
            if (imageUri.startsWith("data:image")) {
                return imageUri;
            }

            // Fetch image and convert to blob ✅
            const response = await fetch(imageUri);
            const blob = await response.blob();

            const mimeType = blob.type || "image/jpeg"; // Default JPEG ✅

            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result) {
                        resolve(`data:${mimeType};base64,${reader.result.split(",")[1]}`);
                    } else {
                        reject("Error reading Base64 data.");
                    }
                };
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error("Error converting image to Base64:", error);
            return null;
        }
    };


    const handleSubmit = async () => {
        try {
            setLoading(true);

            const token = await AsyncStorage.getItem("userToken");
            if (!token) throw new Error("No token found");

            if (!eventData?._id) {
                throw new Error("Event ID is missing, update cannot proceed.");
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
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            console.log("🔹 API Request to:", UPDATE_EVENT_NEWS);
            console.log("🔹 Payload:", JSON.stringify(payload));

            const response = await axios.patch(UPDATE_EVENT_NEWS, payload, { headers });

            console.log("✅ Event Updated Response:", JSON.stringify(response.data));

            if (response.status === 200 && response.data.status === true) {
                showMessage({
                    type: "success",
                    message: "Success",
                    description: response.data.message || "Event updated successfully!",
                    icon: "success",
                    duarion: 5000
                });

                if (navigation && navigation.replace) {
                    navigation.replace("ViewMyEventPost");
                  } else {
                    console.warn("⚠️ Navigation is not available");
                  }

                // setTimeout(() => navigation.navigate("EventNews"), 2000);
                return;
            }

            throw new Error(response.data.message || "Something went wrong");
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error("Error fetching biodata:", errorMsg);
            showMessage({
                type: "danger",
                message: errorMsg,
                icon: "danger",
                duarion: 5000
            });
            const sessionExpiredMessages = [
                "User does not Exist....!Please login again",
                "Invalid token. Please login again",
                "Token has expired. Please login again"
            ];

            if (sessionExpiredMessages.includes(errorMsg)) {
                await AsyncStorage.removeItem("userToken");
                navigation.reset({
                    index: 0,
                    routes: [{ name: "AuthStack" }],
                });
            }
        } finally {
            setLoading(false); // Stop Loader
        }
    };


    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />

            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
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
                <TextInput
                    style={Globalstyles.input}
                    placeholder='Title'
                    placeholderTextColor={Colors.gray}
                    value={eventData?.title}
                    onChangeText={(text) => setEventData((prev) => ({ ...prev, title: text }))}
                />
                <TextInput
                    style={Globalstyles.textInput}
                    placeholder='What’s on your mind?'
                    placeholderTextColor={Colors.gray}
                    textAlignVertical='top'
                    multiline={true}
                    value={eventData?.description}
                    onChangeText={(text) => setEventData((prev) => ({ ...prev, description: text }))}
                />
            </View>

            <View style={styles.addPhoto}>
                <View>
                    <Text style={styles.Text}>Add Image (Max Limit 5)</Text>
                </View>
                <View style={styles.righticons}>
                    <TouchableOpacity onPress={handleImageUpload}>
                        <AntDesign name={'camerao'} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} />
                    </TouchableOpacity>
                </View>
            </View>

            {(photos.length > 0 || eventData?.images?.length > 0) && (
                <View style={styles.photosContainer}>
                    <Text style={Globalstyles.title}>Uploaded Photos:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {photos.length > 0
                            ? photos.map((photo, index) => (
                                <Image key={index} source={{ uri: photo }} style={styles.photo} />
                            ))
                            : eventData?.images?.map((photo, index) => (
                                <Image key={index} source={{ uri: photo }} style={styles.photo} />
                            ))
                        }
                    </ScrollView>
                </View>

            )}


            <TouchableOpacity
                style={styles.PostButton}
                onPress={handleSubmit}
                disabled={loading} // Disable button while loading
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

export default UpdateEventPost
