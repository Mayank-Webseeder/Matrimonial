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
import DetailedProfile from './DetailedProfile';
import PartnersPreference from './PartnersPreference';
import PhotoGallery from './PhotoGallery';

const MatrimonyPage = ({ navigation }) => {
    const [activeComponent, setActiveComponent] = useState("DetailedProfile");
    const profileData = useSelector((state) => state.profile);
    console.log("profileData in myprofile", profileData);
    const image = profileData?.profiledata?.photoUrl?.[0];
    console.log("image", image);
    const formattedDate = moment(profileData?.profiledata?.dob).format("DD/MM/YYYY");

    const handlePress = (componentName) => {
        setActiveComponent(componentName);
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
                            <Text style={styles.text}>{profileData?.profiledata?.username || 'NA'}</Text>
                            <Text style={styles.text}>DOB: {formattedDate || 'NA'}</Text>
                            <Text style={styles.text}>City: {profileData?.profiledata?.city || 'NA'}</Text>
                        </View>
                        <View>
                            <Text style={styles.text}>
                                Contact: {profileData?.profiledata?.mobileNo}</Text>
                            <Text style={styles.text}>Gender: {profileData?.profiledata?.gender || 'NA'}</Text>
                        </View>
                    </View>

                </View>
                {/* <Image source={ image? { uri: image }: require('../../Images/Profile.png')} style={styles.image} />
                */}
                <Text style={styles.RepostText}>Repost</Text>

                {/* <View style={styles.userDeatil}>
                        <View>
                            <Text style={styles.text}>{profileData?.profiledata?.username || 'NA'}</Text>
                            <Text style={styles.text}>DOB: {formattedDate || 'NA'}</Text>
                            <Text style={styles.text}>City: {profileData?.profiledata?.city || 'NA'}</Text>
                        </View>
                        <View>
                        <Text style={styles.text}>
                        Contact: {profileData?.profiledata?.mobileNo}</Text>
                            <Text style={styles.text}>Gender: {profileData?.profiledata?.gender  || 'NA'}</Text>
                        </View>
                    </View> */}


                {/* Tab Buttons */}
                <View style={styles.IconFlex}>
                    <TouchableOpacity
                        style={[
                            styles.IconsButton,
                            activeComponent === "DetailedProfile" && styles.activeTab,
                        ]}
                        onPress={() => handlePress("DetailedProfile")}
                    >
                        <AntDesign
                            name={activeComponent === "DetailedProfile" ? "user" : "user"} // Filled for active, outline for inactive
                            color={activeComponent === "DetailedProfile" ? "white" : Colors.theme_color}
                            size={20}
                        />
                        <Text
                            style={[
                                styles.logotext,
                                activeComponent === "DetailedProfile" && styles.activeTabText,
                            ]}
                        >
                            Detailed Profile
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.IconsButton,
                            activeComponent === "PartnersPreference" && styles.activeTab,
                        ]}
                        onPress={() => handlePress("PartnersPreference")}
                    >
                        <FontAwesome5
                            name={activeComponent === "PartnersPreference" ? "user-friends" : "user-friends"}
                            color={activeComponent === "PartnersPreference" ? "white" : Colors.theme_color}
                            size={20}
                        />
                        <Text
                            style={[
                                styles.logotext,
                                activeComponent === "PartnersPreference" && styles.activeTabText,
                            ]}
                        >
                            Partner Preference
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.IconsButton,
                            activeComponent === "PhotoGallery" && styles.activeTab,
                        ]}
                        onPress={() => handlePress("PhotoGallery")}
                    >
                        <MaterialIcons
                            name={activeComponent === "PhotoGallery" ? "photo" : "photo-library"}
                            color={activeComponent === "PhotoGallery" ? "white" : Colors.theme_color}
                            size={20}
                        />
                        <Text
                            style={[
                                styles.logotext,
                                activeComponent === "PhotoGallery" && styles.activeTabText,
                            ]}
                        >
                            Photo Gallery
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Render Active Component */}
                {renderActiveComponent()}

            </ScrollView>
        </SafeAreaView>
    );
};

export default MatrimonyPage;
