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
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UpdateEventPost = ({ navigation, route }) => {
    const { eventData: initialEventData } = route.params;
    const [loading, setLoading] = useState(false);
    const MyActivistProfile = useSelector((state) => state.activist.activist_data);
    const [eventData, setEventData] = useState(initialEventData || { title: '', description: '', images: [] });
    const [photos, setPhotos] = useState([]);

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
            compressImageQuality :1
        }).then(images => {
            const newPhotos = images.map(image => `data:image/jpeg;base64,${image.data}`);
            setPhotos(newPhotos); // Purani images hata kar sirf naye images set ho rahi hain
            setEventData(prev => ({ ...prev, images: [] })); // Backend wali images hata do
        }).catch(err => console.log('Crop Picker Error:', err));
    };


    const handleSubmit = async () => {
        try {
            setLoading(true);  // Start Loader
            const token = await AsyncStorage.getItem('userToken');
            if (!token) throw new Error('No token found');

            if (!eventData?._id) {
                throw new Error('Event ID is missing, update cannot proceed.');
            }

            const updatedImages = photos.length > 0 ? photos : eventData?.images;

            const payload = {
                postId: eventData._id,
                title: eventData?.title,
                description: eventData?.description,
                images: updatedImages,
            };

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.patch(UPDATE_EVENT_NEWS, payload, { headers });

            console.log("✅ Event Updated Response:", JSON.stringify(response.data));

            if (response.status === 200 || response.status === 201) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: response.data.message || 'Event updated successfully!',
                });

                setTimeout(() => navigation.navigate('EventNews'), 2000);
            }
        } catch (error) {
            console.error('❌ Error updating event:', error);

            let errorMessage = 'Failed to update event. Please try again later.';
            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }

            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: errorMessage,
            });
        } finally {
            setLoading(false);  // Stop Loader
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


            {loading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Colors.theme_color} />
                </View>
            )}

            <TouchableOpacity style={styles.PostButton} onPress={handleSubmit} disabled={loading}>
                <Text style={styles.PostText}>Update Post</Text>
            </TouchableOpacity>

            <Toast />
        </SafeAreaView>
    );
};

export default UpdateEventPost
