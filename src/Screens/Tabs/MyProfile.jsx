import { Text, View, Image, SafeAreaView, StatusBar, Modal, PermissionsAndroid, Platform, FlatList } from 'react-native';
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
import { PeoplePosition } from '../../DummyData/DropdownData';
import { SH } from '../../utils/Dimensions';
const MyProfile = ({ navigation }) => {
    const [selectedButton, setSelectedButton] = useState('CreateBioData');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const ProfileData = useSelector((state) => state.profile);
    const profileData = ProfileData?.profiledata || {};
    const [isProfileModalVisible, setProfileModalVisible] = useState(false);

    const [selectedProfile, setSelectedProfile] = useState('');
    const image = profileData?.photoUrl?.[0];
    console.log("profileData", profileData);
    const formattedDate = moment(profileData.dob).format("DD/MM/YYYY");

    const handlePress = (buttonName) => {
        setSelectedButton(buttonName);
        navigation.navigate(buttonName);
    };

    const openModal = () => setProfileModalVisible(true);
    const closeModal = () => setProfileModalVisible(false);

    const selectProfile = (profile) => {
        setSelectedProfile(profile);
        closeModal();
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

        // Call the async function
        requestCameraPermission();
    }, []);


    const handleDeleteImage = () => {
        setSelectedImage(null);
        setModalVisible(false);
    };


    // update profile image api

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
                    {/* <Text style={Globalstyles.headerText}>My Profile</Text> */}
                    <TouchableOpacity onPress={openModal} style={styles.switchButton}>
                        <Text style={styles.selectedProfileText}>
                            {selectedProfile || 'Switch Profile'}
                        </Text>
                        <AntDesign name="caretdown" color={Colors.theme_color} size={15} style={{ alignSelf: "center", marginBottom: SH(5) }} />
                    </TouchableOpacity>
                    <Modal
                        transparent={true}
                        visible={isProfileModalVisible}
                        animationType="fade"
                        onRequestClose={closeModal}
                    >
                        <View style={styles.profilemodalOverlay}>
                            <View style={styles.profilemodalContainer}>
                                <Text style={styles.profilemodalTitle}>Choose Profile</Text>
                                <FlatList
                                    data={PeoplePosition}
                                    keyExtractor={(item) => item.value}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.profilemodalItem}
                                            onPress={() => selectProfile(item.label)}
                                        >
                                            <Text style={styles.profilemodalItemText}>{item.label}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                                <TouchableOpacity style={styles.profilecloseButton} onPress={closeModal}>
                                    <Text style={styles.profilecloseButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
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
                        <Text style={styles.editText} onPress={() => navigation.navigate('UpdateProfile')}>Change Profile</Text>
                    </View>
                    <View style={styles.userDeatil}>
                        <View style={styles.userData}>
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

                    <View>
                        {/* First Row */}
                        <View style={styles.IconFlex}>
                            <TouchableOpacity
                                style={styles.IconsButton}
                                onPress={() => handlePress('MatrimonyPage')}
                            >
                                <FontAwesome
                                    name="id-card"
                                    color={selectedButton === 'CreateBioData' ? 'white' : Colors.theme_color}
                                    size={25}
                                    style={selectedButton === 'CreateBioData' ? styles.Selectedicon : styles.icon}
                                />
                                <Text style={styles.logotext}>Create Bio Data</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.IconsButton}
                                onPress={() => handlePress('RoleRegisterForm')}
                            >
                                <FontAwesome5
                                    name="user-plus"
                                    color={selectedButton === 'PanditRegister' ? 'white' : Colors.theme_color}
                                    size={25}
                                    style={selectedButton === 'PanditRegister' ? styles.Selectedicon : styles.icon}
                                />
                                <Text style={styles.logotext}>Register as Pandit</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Second Row */}
                        <View style={styles.IconFlex}>
                            <TouchableOpacity
                                style={styles.IconsButton}
                                onPress={() => handlePress('RoleRegisterForm')}
                            >
                                <FontAwesome5
                                    name="user-plus"
                                    color={selectedButton === 'JyotishRegister' ? 'white' : Colors.theme_color}
                                    size={25}
                                    style={selectedButton === 'JyotishRegister' ? styles.Selectedicon : styles.icon}
                                />
                                <Text style={styles.logotext}>Register as Jyotish</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.IconsButton}
                                onPress={() => handlePress('RoleRegisterForm')}
                            >
                                <FontAwesome5
                                    name="user-plus"
                                    color={selectedButton === 'KathavachakRegister' ? 'white' : Colors.theme_color}
                                    size={25}
                                    style={selectedButton === 'KathavachakRegister' ? styles.Selectedicon : styles.icon}
                                />
                                <Text style={styles.logotext}>Register as Kathavachak</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)} // Ensures proper handling of the back button.
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

                        {/* Option to Choose from Gallery */}
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

                            {/* Option to Capture from Camera */}
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
