import { Text, View, Image, SafeAreaView, StatusBar, Modal, PermissionsAndroid, Platform, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/MyProfileStyle';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { DrawerActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from "moment";
import Globalstyles from '../../utils/GlobalCss';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImageCropPicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UPLOAD_PROFILE_PHOTO } from '../../utils/BaseUrl';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const MyProfile = ({ navigation }) => {
    const [selectedButton, setSelectedButton] = useState('CreateBioData');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const ProfileData = useSelector((state) => state.profile);
    const profileData = ProfileData?.profiledata || {};
    const [selectedProfile, setSelectedProfile] = useState('');
    const [fetchProfileDetails, setFetchProfileDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const image = profileData?.photoUrl?.[0];
    // console.log("profileData", profileData);
    const formattedDate = moment(profileData.dob).format("DD/MM/YYYY");

    const handlePress = async (profileType) => {
        setSelectedButton(profileType);

        const keyMap = {
            Biodata: "isMatrimonial",
            Jyotish: "isJyotish",
            Kathavachak: "isKathavachak",
            Pandit: "isPandit",
            Activist: "isActivist",
        };

        const isRegistered = profileData?.[keyMap[profileType]];
        console.log("isRegistered:", isRegistered);

        if (profileType === "Biodata") {
            if (!isRegistered) {
                navigation.navigate("MatrimonyPage");
            } else {
                navigation.navigate("ProfileDetail", { profileType });
            }
            return;
        }
        if (!isRegistered) {
            navigation.navigate("RoleRegisterForm", { profileType });
            return;
        }
        await fetchProfilesDetails(profileType);
        navigation.navigate("ProfileDetail", { profileType });
    };


    const fetchProfilesDetails = async (profileType) => {
        try {
            setLoading(true);
            setSelectedProfile(profileType);
            const token = await AsyncStorage.getItem('userToken');
            // const formattedType = profileType.toLowerCase(); // Convert label to lowercase

            const response = await axios.get(
                `https://api-matrimonial.webseeder.tech/api/v1/user/profiles/${profileType}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("Fetched Data:", response.data.data);
            setFetchProfileDetails(response.data.data); // Store API response
            setLoading(false);
        } catch (error) {
            console.error("Error fetching profiles:", error);
            setLoading(false);
        }
    };

    const capitalizeFirstLetter = (text) => {
        return text ? text.charAt(0).toUpperCase() + text.slice(1) : "Unknown";
    };

    useEffect(() => {
        const requestCameraPermission = async () => {
            if (Platform.OS === 'android') {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.CAMERA,
                        {
                            title: "Camera Permission",
                            message: "This app needs camera access to take photos.",
                            buttonNeutral: "Ask Me Later",
                            buttonNegative: "Cancel",
                            buttonPositive: "OK",
                        }
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log("Camera permission granted");
                    } else {
                        console.log("Camera permission denied");
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };
        requestCameraPermission();
    }, []);


    const handleDeleteImage = () => {
        setSelectedImage(null);
        setModalVisible(false);
    };

    const upload_profile_image = async (base64Data) => {
        console.log("Base64 Image Data:", base64Data);
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) throw new Error("Authorization token is missing.");

            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };

            const response = await axios.put(UPLOAD_PROFILE_PHOTO, { photoUrl: base64Data }, { headers });
            console.log("Profile image updated successfully:", response.data);
            const message = response?.data?.message;
            console.log("message", message);

            if (message === "Profile image updated successfully.") {
                console.log("Profile image uploaded, now fetching profile data...");

                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Profile Updated!',
                    text2: 'Your profile image has been successfully updated.',
                    visibilityTime: 3000,
                    autoHide: true,
                });

                console.log("Navigating to MainApp...");
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MainApp' }],
                });
            }
        } catch (error) {
            if (error.response) {
                console.error("API Error:", error.response.data);
            } else {
                console.error("Error uploading profile image:", error.message);
            }

            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Upload Failed',
                text2: 'There was an error uploading the image. Please try again.',
                visibilityTime: 3000,
                autoHide: true,
            });
        }
    };


    const handleImageUpload = async () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 250,
            cropping: true,
            includeBase64: true,
        })
            .then(image => {
                setSelectedImage(image.path);
                setModalVisible(false);
                console.log('Selected Image:', image);
                upload_profile_image(image.data);
            })
            .catch(error => {
                console.error('Image Picking Error:', error);
            });
    };

    const handleCameraCapture = () => {
        ImageCropPicker.openCamera({
            cropping: true,
            width: 300,
            height: 250,
            includeBase64: true,
        })
            .then(image => {
                setSelectedImage(image.path);
                setModalVisible(false);
                console.log('Captured Image:', image);
                upload_profile_image(image.data);
            })
            .catch(error => {
                console.error('Camera Error:', error);
            });
    };

    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <View style={Globalstyles.header}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <Image source={require('../../Images/menu.png')} style={styles.menuIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{capitalizeFirstLetter(profileData.username || 'NA')}</Text>
                </View>
            </View>

            <View style={styles.container1}>
                <View>
                    <Image
                        source={
                            selectedImage
                                ? { uri: selectedImage }
                                : image
                                    ? { uri: image }
                                    : require('../../Images/Profile.png')
                        }
                        style={styles.image}
                    />
                    <View style={styles.profileButtons}>
                        <Text style={styles.editText} onPress={() => setModalVisible(true)}>Upload Photo</Text>
                        <Text style={styles.editText} onPress={() => navigation.navigate('UpdateProfile')}>Update Profile</Text>
                    </View>
                    <View style={styles.userDeatil}>
                        <View style={styles.userData}>
                            <Text style={styles.text}>User ID  {profileData.userId || 'NA'}</Text>
                            <Text style={styles.text}>{capitalizeFirstLetter(profileData.username || 'NA')}</Text>
                            <Text style={styles.text}>DOB: {formattedDate || 'NA'}</Text>
                            <Text style={styles.text}>City: {capitalizeFirstLetter(profileData.city || 'NA')}</Text>
                        </View>
                        <View style={styles.userData}>
                            <Text style={styles.text}>
                                Contact: {profileData.mobileNo}</Text>
                            <Text style={styles.text}>Gender: {capitalizeFirstLetter(profileData.gender || 'NA')}</Text>
                        </View>
                    </View>

                    <View style={{ padding: 10 }}>
                        {/* First Row */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity style={styles.IconsButton} onPress={() => handlePress('Biodata')}>
                                <FontAwesome name="id-card" color={selectedButton === 'CreateBioData' ? 'white' : Colors.theme_color} size={25} style={selectedButton === 'CreateBioData' ? styles.Selectedicon : styles.icon} />
                                <Text style={styles.logotext}>{profileData.isMatrimonial ? 'My Bio Data' : 'Create Bio Data'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.IconsButton} onPress={() => handlePress('Pandit')}>
                                <FontAwesome5 name={profileData.isPandit ? "user" : "user-plus"} color={Colors.theme_color} size={25} style={styles.icon} />
                                <Text style={styles.logotext}>{profileData.isPandit ? 'My Pandit Profile' : 'Register as Pandit'}</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Second Row */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <TouchableOpacity style={styles.IconsButton} onPress={() => handlePress('Jyotish')}>
                                <FontAwesome5 name={profileData.isJyotish ? "user" : "user-plus"} color={Colors.theme_color} size={25} style={styles.icon} />
                                <Text style={styles.logotext}>{profileData.isJyotish ? 'My Jyotish Profile' : 'Register as Jyotish'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.IconsButton} onPress={() => handlePress('Kathavachak')}>
                                <FontAwesome5 name={profileData.isKathavachak ? "user" : "user-plus"} color={Colors.theme_color} size={25} style={styles.icon} />
                                <Text style={styles.logotext}>{profileData.isKathavachak ? 'My Kathavachak Profile' : 'Register as Kathavachak'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                            >
                                <AntDesign name="close" size={30} color={Colors.theme_color} />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>Profile Photo</Text>

                            <TouchableOpacity
                                onPress={handleDeleteImage}
                            >
                                <MaterialIcons name={'delete'} size={30} color={'red'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity
                                onPress={handleImageUpload}
                                style={styles.gallery}
                            >
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <MaterialIcons name={'add-a-photo'} size={20} color={Colors.theme_color} />
                                    <Text style={styles.Gallerytext}>Gallery</Text>
                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleCameraCapture}
                                style={styles.gallery}
                            >
                                <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <MaterialIcons name={'camera-alt'} size={20} color={Colors.theme_color} />
                                    <Text style={styles.Gallerytext}>Camera</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default MyProfile;
