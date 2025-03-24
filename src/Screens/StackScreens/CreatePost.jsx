import { Text, View, TouchableOpacity, Image, TextInput, SafeAreaView, StatusBar, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/CreatePostStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CREATE_EVENT_NEWS } from '../../utils/BaseUrl';

const CreatePost = ({ navigation, route }) => {
    const MyActivistProfile = useSelector((state) => state.activist.activist_data);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("MyActivistProfile", MyActivistProfile)
    })

    const handleImageUpload = () => {
        ImageCropPicker.openPicker({
            multiple: true,  // Multiple image selection
            cropping: true,
            width: 400,
            height: 400,
            includeBase64: true, // Get base64 directly
            compressImageQuality: 1
        }).then(images => {
            const newPhotos = images.map(image => image.data); // Only store base64
            addPhotos(newPhotos);
        }).catch(err => console.log('Crop Picker Error:', err));
    };


    const addPhotos = (newPhotos) => {
        if (photos.length + newPhotos.length <= 5) {
            setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
        } else {
            alert('You can only upload up to 5 photos.');
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('userToken');
            if (!token) throw new Error('No token found');

            const payload = {
                title: title,
                description: description,
                images: photos
            };

            console.log("Payload:", payload);

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const API_URL = `${CREATE_EVENT_NEWS}`;

            console.log('Submitting event news to:', API_URL);

            const response = await axios.post(API_URL, payload, { headers });
            console.log("Event response:", JSON.stringify(response.data));

            if (response.status === 200 && response.data.status === true) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: response.data.message || 'Your event has been created successfully!',
                    position: "top",
                    onHide: () => {
                        navigation.navigate('EventNews'); // ✅ Navigate after toast hides
                    }
                });
            } else {
                throw new Error(response.data.message || "Unexpected response from server");
            }

        } catch (error) {
            console.error('Error submitting event:', error);

            let errorMessage = 'Failed to create event. Please try again later.';

            if (error.response) {
                console.error("API Error:", error.response.data);
                if (error.response.status === 400) {
                    errorMessage = error.response.data.message || "Bad request. Please check your input.";
                } else {
                    errorMessage = error.response.data.message || errorMessage;
                }
            }

            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: errorMessage,
            });

        } finally {
            setLoading(false);
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
                    <Text style={Globalstyles.headerText}>Create Post</Text>
                </View>
            </View>
            <View style={styles.postHeader}>
                <Image source={{ uri: MyActivistProfile?.profilePhoto }} style={styles.profileImage} resizeMode="cover" />

                <View style={styles.postTextContainer}>
                    <Text style={styles.postText}>{MyActivistProfile?.fullname}</Text>
                    <Text style={styles.postText}>ID no.  {MyActivistProfile?.activistId}</Text>
                </View>
            </View>
            <View style={styles.textContainer}>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Title"
                    placeholderTextColor={Colors.gray}
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={Globalstyles.textInput}
                    placeholder="What’s on your mind?"
                    placeholderTextColor={Colors.gray}
                    textAlignVertical="top"
                    multiline={true}
                    value={description}
                    onChangeText={setDescription}
                />
            </View>

            <View style={styles.addPhoto}>
                <View>
                    <Text style={styles.Text}>Add Image ( Max Limit 5 )</Text>
                </View>
                <View style={styles.righticons}>
                    <TouchableOpacity onPress={handleImageUpload}>
                        <AntDesign name={'camerao'} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} />
                    </TouchableOpacity>
                    {/* <AntDesign name={'videocamera'} size={25} color={Colors.theme_color} /> */}
                </View>
            </View>
            {photos.length > 0 && (
                <View style={styles.photosContainer}>
                    <Text style={Globalstyles.title}>Uploaded Photos:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {photos.map((photo, index) => (
                            <Image
                                key={index}
                                source={{ uri: `data:image/png;base64,${photo}` }} // ✅ PNG/JPEG check kar
                                style={styles.photo}
                                onError={(e) => console.log("Image Load Error:", e.nativeEvent.error)}
                            />
                        ))}
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
                    <Text style={styles.PostText}>Submit Post</Text>
                )}
            </TouchableOpacity>
            <Toast />
        </SafeAreaView>
    )
}

export default CreatePost
