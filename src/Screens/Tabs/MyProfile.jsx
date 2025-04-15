import { Text, View, Image, SafeAreaView, StatusBar, Modal, PermissionsAndroid, Platform, FlatList, ActivityIndicator } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/MyProfileStyle';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import moment from "moment";
import Globalstyles from '../../utils/GlobalCss';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImageCropPicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UPLOAD_PROFILE_PHOTO, DELETE_PROFILE_PHOTO, PROFILE_ENDPOINT, PROFILE_TYPE } from '../../utils/BaseUrl';
import axios from 'axios';
import { DrawerActions, useFocusEffect } from '@react-navigation/native';
import ImageViewing from 'react-native-image-viewing';
import { setProfiledata } from '../../ReduxStore/Slices/ProfileSlice';
import { useDispatch } from 'react-redux';
import { showMessage } from 'react-native-flash-message';

const MyProfile = ({ navigation }) => {
    const dispatch = useDispatch();
    const [selectedButton, setSelectedButton] = useState('CreateBioData');
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [profiledata, setProfileData] = useState({});
    const ProfileData = useSelector((state) => state.profile);
    const profileData = ProfileData?.profiledata || {};
    const [selectedProfile, setSelectedProfile] = useState('');
    const [fetchProfileDetails, setFetchProfileDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [ProfileLoading, setProfileLoading] = useState(false);
    const image = profileData?.photoUrl?.[0];
    const [isLoading, setIsLoading] = useState(false);
    // console.log("profileData", profileData);
    const formattedDate = moment(profileData.dob).format("DD/MM/YYYY");
    const [isImageViewVisible, setImageViewVisible] = useState(false);

    const images = [
        {
            uri: selectedImage ? selectedImage : image ? image : null,
        },
    ];

    useFocusEffect(
        useCallback(() => {
            fetchProfile();
        }, [])
    );

    const fetchProfile = async () => {
        setProfileLoading(true);
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) throw new Error("No token found");

            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };

            console.log("headers in profile", headers);
            const res = await axios.get(PROFILE_ENDPOINT, { headers });
            console.log("API Response:", JSON.stringify(res.data));

            setProfileData(res.data.data); // ✅ State update karo
            dispatch(setProfiledata(res.data.data)); // Redux update karo

        } catch (error) {
            console.error("Error fetching profile:", error.response ? error.response.data : error.message);
        } finally {
            setProfileLoading(false);
        }
    };

    // ye pehle wala function h comment krle 
    // const handlePress = async (profileType) => {
    //     setSelectedButton(profileType);

    //     const keyMap = {
    //         Biodata: "isMatrimonial",
    //         Jyotish: "isJyotish",
    //         Kathavachak: "isKathavachak",
    //         Pandit: "isPandit",
    //         Activist: "isActivist",
    //     };

    //     const isRegistered = profileData?.[keyMap[profileType]];
    //     console.log("isRegistered:", isRegistered);

    //     if (profileType === "Biodata") {
    //         if (!isRegistered) {
    //             navigation.navigate("MatrimonyPage", { profileType });
    //         } else {
    //             navigation.navigate("ProfileDetail", { profileType });
    //         }
    //         return;
    //     }
    //     if (!isRegistered) {
    //         navigation.navigate("RoleRegisterForm", { profileType });
    //         return;
    //     }
    //     await fetchProfilesDetails(profileType);
    //     navigation.navigate("ProfileDetail", { profileType });
    // };

    // ye abhi wala h aleg aleg page par bhajne h ke liye 
    const handlePress = async (profileType) => {
        setSelectedButton(profileType);

        const keyMap = {
            Biodata: "isMatrimonial",
            Jyotish: "isJyotish",
            Kathavachak: "isKathavachak",
            Pandit: "isPandit",
            Activist: "isActivist",
        };

        const registrationScreens = {
            Biodata: "MatrimonyPage",
            Jyotish: "JyotishRegister",
            Kathavachak: "KathavachakRegister",
            Pandit: "PanditRegister",
        };

        const isRegistered = profileData?.[keyMap[profileType]];

        if (!isRegistered) {
            const screen = registrationScreens[profileType];
            if (screen) {
                navigation.navigate(screen, { profileType });
            } else {
                navigation.navigate("RoleRegisterForm", { profileType });
            }
            return;
        }

        if (profileType !== "Biodata") {
            await fetchProfilesDetails(profileType);
        }

        navigation.navigate("ProfileDetail", { profileType });
    };


    const fetchProfilesDetails = async (profileType) => {
        try {
            setLoading(true);
            setSelectedProfile(profileType);
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.get(
                `${PROFILE_TYPE}/${profileType}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            console.log("Fetched Data:", response.data.data);
            setFetchProfileDetails(response.data.data);
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


    const handleDeleteImage = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem("userToken");

            if (!token) {
                showMessage({
                    type: "danger",
                    message: "Error",
                    description: "Authorization token is missing.",
                });
                return;
            }

            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.delete(DELETE_PROFILE_PHOTO, { headers });

            if (response.status === 200 && response.data.status === true) {
                console.log(" delete response", JSON.stringify(response.data));
                showMessage({
                    type: "success",
                    message: "Profile Photo Deleted Successfully",
                    description: response.data.message || "Your profile photo has been removed.",
                    icon:"success"
                });
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'MyProfile' }],
                });
                setModalVisible(false)
            } else {
                throw new Error(response.data.message || "Failed to delete profile photo.");
            }
        } catch (error) {
            console.error("Error deleting profile photo:", error?.response?.data || error.message);
           showMessage({
                type: "danger",
                message: "Error",
                description: "Failed to delete profile photo.",
                icon:"danger"
            });
        } finally {
            setIsLoading(false);
        }
    };


    const handleImageUpload = async () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            includeBase64: true,
        })
            .then(image => {
                setSelectedImage(image.path);
                setModalVisible(false);
                console.log('Selected Image:', image);

                // Start loader before upload
                setIsLoading(true);
                upload_profile_image(image.data);
            })
            .catch(error => {
                console.error('Image Picking Error:', error);
            });
    };

    const upload_profile_image = async (base64Data) => {
        console.log("Base64 Image Data:", base64Data);
        try {
          const token = await AsyncStorage.getItem("userToken");
          if (!token) throw new Error("Authorization token is missing.");
      
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
      
          const response = await axios.put(UPLOAD_PROFILE_PHOTO, { photoUrl: base64Data }, { headers });
          console.log("Profile image updated successfully:", response.data);
          const message = response?.data?.message;
      
          if (message === "Profile image updated successfully.") {
            showMessage({
              message: "Profile Updated!",
              description: "Your image has been successfully uploaded.",
              type: "success",
              duration: 3000,
              icon:"success"
            });
      
            console.log("Navigating to MainApp...");
            navigation.reset({
              index: 0,
              routes: [{ name: "MainApp" }],
            });
          }
        } catch (error) {
          if (error.response) {
            console.error("API Error:", error.response.data);
          } else {
            console.error("Error uploading profile image:", error.message);
          }
      
          showMessage({
            message: "Upload Failed!",
            description: "Please try again.",
            type: "danger",
            duration: 3000,
            icon:"danger"
          });
        } finally {
          setIsLoading(false);
        }
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

    if (ProfileLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={Colors.theme_color} />
            </View>
        );
    }

    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <View style={Globalstyles.header}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: "MainApp" }],
                    })}>
                        <Image source={require('../../Images/menu.png')} style={styles.menuIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{capitalizeFirstLetter(profileData.username || 'NA')}</Text>
                </View>
            </View>

            <View style={styles.container1}>
                <View>
                    <TouchableOpacity onPress={() => setImageViewVisible(true)}>
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
                    </TouchableOpacity>
                    <ImageViewing
                        images={images}
                        imageIndex={0}
                        visible={isImageViewVisible}
                        onRequestClose={() => setImageViewVisible(false)}
                    />
                    <View style={styles.profileButtons}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text
                                style={styles.editText}
                                onPress={() => !isLoading && setModalVisible(true)}
                            >
                                {isLoading ? "Uploading..." : "Upload Photo"}
                            </Text>
                        </View>
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
