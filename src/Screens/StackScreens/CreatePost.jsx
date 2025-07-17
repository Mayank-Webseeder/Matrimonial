import { Text, View, TouchableOpacity, Image, TextInput, StatusBar, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/CreatePostStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CREATE_EVENT_NEWS } from '../../utils/BaseUrl';
import { showMessage } from 'react-native-flash-message';
import { launchImageLibrary } from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const CreatePost = ({ navigation, route }) => {
    const MyActivistProfile = useSelector((state) => state.activist.activist_data);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("MyActivistProfile", MyActivistProfile)
    })

    const pickerOptions = {
        selectionLimit: 4,
        mediaType: 'photo',
        includeBase64: true,
        maxWidth: 1000,
        maxHeight: 1000,
        quality: 1,
    };

    const handleImageUpload = () => {
        launchImageLibrary(pickerOptions, (response) => {
            if (response.didCancel) return;                
            if (response.errorCode) {
                console.log('ImagePicker Error:', response.errorMessage);
                return;
            }
            const newPhotos = response.assets.map(
                (asset) => asset.base64                      
            );

            setPhotos(newPhotos);                          
        });
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
                showMessage({
                    type: 'success',
                    message: 'Success',
                    description: response.data.message || 'Your event has been created successfully!',
                    duarion: 7000
                });
                navigation.navigate("MainApp", {
                    screen: "Tabs",
                    params: { screen: "EventNews" }
                });
            } else {
                throw new Error(response.data.message || "Unexpected response from server");
            }

        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error("Error fetching eventnews :", errorMsg);
            showMessage({
                type: 'danger',
                message: 'Error',
                description: errorMsg,
                icon: "danger",
                duarion: 7000
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
                    <TouchableOpacity onPress={() => navigation.navigate("MainApp", {
                        screen: "Tabs",
                        params: {
                            screen: "EventNews",
                        },
                    })}>
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
                {/* <TextInput
                    style={Globalstyles.input}
                    placeholder="Title"
                    placeholderTextColor={Colors.gray}
                    value={title}
                    onChangeText={setTitle}
                    autoComplete="off"
                    textContentType="none"
                    importantForAutofill="no"
                    autoCorrect={false}
                /> */}
                <TextInput
                    style={Globalstyles.textInput}
                    placeholder="What’s on your mind?"
                    placeholderTextColor={Colors.gray}
                    textAlignVertical="top"
                    multiline={true}
                    value={description}
                    onChangeText={setDescription}
                    autoComplete="off"
                    textContentType="none"
                    importantForAutofill="no"
                    autoCorrect={false}
                />
            </View>

            <View style={styles.addPhoto}>
                <View>
                    <Text style={styles.Text}>Add Image ( Max Limit 4 )</Text>
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
        </SafeAreaView>
    )
}

export default CreatePost
