import { Text, View, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/ProfileStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { useSelector } from 'react-redux';
import moment from "moment";
import Globalstyles from '../../utils/GlobalCss';

import DetailedProfile from '../StackScreens/DetailedProfile';
import PartnersPreference from '../StackScreens/PartnersPreference';
import PhotoGallery from '../StackScreens/PhotoGallery';

const MainPartnerPrefrence = ({ navigation }) => {
    const [activeComponent, setActiveComponent] = useState("PartnersPreference");

    const profileData = useSelector((state) => state.profile);
    const image = profileData?.profiledata?.photoUrl?.[0];
    const formattedDate = moment(profileData?.profiledata?.dob).format("DD/MM/YYYY");

    const handlePress = (componentName) => {
        setActiveComponent(componentName);
    };

    const capitalizeFirstLetter = (text) => {
        return text ? text.charAt(0).toUpperCase() + text.slice(1) : "Unknown";
    };

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case "DetailedProfile":
                return <DetailedProfile navigation={navigation} />;
            case "PartnersPreference":
                return <PartnersPreference navigation={navigation} />;
            case "PhotoGallery":
                return <PhotoGallery navigation={navigation} />;
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View style={Globalstyles.header}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../Images/menu.png')} style={styles.menuIcon} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>{profileData?.profiledata?.username || 'NA'} Profile</Text>
                </View>
            </View>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.topContainer}>

                    <Image source={image ? { uri: image } : require('../../Images/Profile.png')} style={styles.image} />
                    <View style={styles.userDeatil}>
                        <View>
                            <Text style={styles.text}>{capitalizeFirstLetter(profileData?.profiledata?.username || 'NA')}</Text>
                            <Text style={styles.text}>DOB: {formattedDate || 'NA'}</Text>
                            <Text style={styles.text}>City: {capitalizeFirstLetter(profileData?.profiledata?.city || 'NA')}</Text>
                        </View>
                        <View>
                            <Text style={styles.text}>
                                Contact: {profileData?.profiledata?.mobileNo}</Text>
                            <Text style={styles.text}>Gender: {capitalizeFirstLetter(profileData?.profiledata?.gender || 'NA')}</Text>
                        </View>
                    </View>

                </View>
                <Text style={styles.RepostText}>Repost</Text>
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
                        <Text style={styles.logotext}>Detailed Profile</Text>
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
                {renderActiveComponent()}

            </ScrollView>
        </SafeAreaView>
    );
};

export default MainPartnerPrefrence;

