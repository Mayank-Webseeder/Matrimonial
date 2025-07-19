import { Text, View, Image, ScrollView, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/ProfileStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import moment from "moment";
import Globalstyles from '../../utils/GlobalCss';
import DetailedProfile from './DetailedProfile';
import PartnersPreference from './PartnersPreference';
import PhotoGallery from './PhotoGallery';
import ImageViewing from 'react-native-image-viewing';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SH } from '../../utils/Dimensions';

const MatrimonyPage = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const { profileData } = route.params || {};
    const [activeComponent, setActiveComponent] = useState("DetailedProfile");
    const profile_Data = useSelector((state) => state.profile);
    console.log("profileData in myprofile", profileData);
    const image = profile_Data?.profiledata?.photoUrl?.[0];
    console.log("image", image);
    const formattedDate = moment(profile_Data?.profiledata?.dob).format("DD/MM/YYYY");
    const MyprofileData = useSelector((state) => state.getBiodata);
    const [biodataAvailable, setBiodataAvailable] = useState(false);
    const [visible, setVisible] = useState(false);

    const imageSource = image ? { uri: image } : require('../../Images/Profile.png');

    const handlePress = (componentName) => {
        setActiveComponent(componentName);
    };

    useFocusEffect(
        useCallback(() => {
            if (MyprofileData?.Biodata) {
                setBiodataAvailable(true);
            }
        }, [MyprofileData, profileData])
    );

    const capitalizeFirstLetter = (text) => {
        return text ? text.charAt(0).toUpperCase() + text.slice(1) : "Unknown";
    };

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case "DetailedProfile":
                return <DetailedProfile navigation={navigation} profileData={profileData} />;
            case "PartnersPreference":
                return <PartnersPreference navigation={navigation} profileData={profileData} />;
            case "PhotoGallery":
                return <PhotoGallery navigation={navigation} profileData={profileData} />;
            default:
                return null;
        }
    };


    return (
        <SafeAreaView style={Globalstyles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View style={Globalstyles.header}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../Images/menu.png')} style={styles.menuIcon} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>{profile_Data?.profiledata?.username || 'NA'} Profile</Text>
                </View>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <View>
                        <View style={styles.topContainer}>

                            <TouchableOpacity onPress={() => setVisible(true)}>
                                <Image source={imageSource} style={styles.image} />
                            </TouchableOpacity>
                            <ImageViewing
                                images={[{ uri: image }]}
                                imageIndex={0}
                                visible={visible}
                                onRequestClose={() => setVisible(false)}
                            />

                            <View style={styles.userDeatil}>
                                <View>
                                    <Text style={styles.text}>{capitalizeFirstLetter(profile_Data?.profiledata?.username || 'NA')}</Text>
                                    <Text style={styles.text}>DOB: {formattedDate || 'NA'}</Text>
                                    <Text style={styles.text}>City: {capitalizeFirstLetter(profile_Data?.profiledata?.city || 'NA')}</Text>
                                </View>
                                <View>
                                    <Text style={styles.text}>
                                        Contact: {profile_Data?.profiledata?.mobileNo}</Text>
                                    <Text style={styles.text}>Gender: {capitalizeFirstLetter(profile_Data?.profiledata?.gender || 'NA')}</Text>
                                </View>
                            </View>

                        </View>
                        {/* Tab Buttons */}
                        <View style={styles.IconFlex}>
                            <TouchableOpacity
                                style={styles.IconsButton}
                                onPress={() => handlePress("DetailedProfile")}
                            >
                                <View
                                    style={[
                                        styles.iconWrapper,
                                        activeComponent === "DetailedProfile" && styles.activeIcon,
                                    ]}
                                >
                                    <AntDesign
                                        name="user"
                                        color={activeComponent === "DetailedProfile" ? "white" : Colors.theme_color}
                                        size={20}
                                    />
                                </View>
                                <Text style={styles.logotext}>Biodata Details</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.IconsButton}
                                onPress={() => handlePress("PartnersPreference")}
                            >
                                <View
                                    style={[
                                        styles.iconWrapper,
                                        activeComponent === "PartnersPreference" && styles.activeIcon,
                                    ]}
                                >
                                    <FontAwesome5
                                        name="user-friends"
                                        color={activeComponent === "PartnersPreference" ? "white" : Colors.theme_color}
                                        size={20}
                                    />
                                </View>
                                <Text style={styles.logotext}>Partner Preference</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.IconsButton}
                                onPress={() => handlePress("PhotoGallery")}
                            >
                                <View
                                    style={[
                                        styles.iconWrapper,
                                        activeComponent === "PhotoGallery" && styles.activeIcon,
                                    ]}
                                >
                                    <MaterialIcons
                                        name="photo-library"
                                        color={activeComponent === "PhotoGallery" ? "white" : Colors.theme_color}
                                        size={20}
                                    />
                                </View>
                                <Text style={styles.logotext}>Photo Gallery</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Render Active Component */}
                        <View>
                            {renderActiveComponent()}
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default MatrimonyPage;