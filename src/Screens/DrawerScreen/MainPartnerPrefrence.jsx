import { Text, View, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/ProfileStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Globalstyles from '../../utils/GlobalCss';
import DetailedProfile from '../StackScreens/DetailedProfile';
import PartnersPreference from '../StackScreens/PartnersPreference';
import PhotoGallery from '../StackScreens/PhotoGallery';
import ImageViewing from 'react-native-image-viewing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MainPartnerPrefrence = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [activeComponent, setActiveComponent] = useState('PartnersPreference');
    const profileData = useSelector((state) => state.profile);
    console.log('profileData in myprofile', profileData);
    const image = profileData?.profiledata?.photoUrl?.[0];
    console.log('image', image);
    const formattedDate = profileData?.profiledata?.dob
        ? moment(profileData?.profiledata?.dob).format('DD/MM/YYYY')
        : '';
    const MyprofileData = useSelector((state) => state.getBiodata);
    const [biodataAvailable, setBiodataAvailable] = useState(false);
    const [visible, setVisible] = useState(false);
    const imageSource = image ? { uri: image } : require('../../Images/Profile.png');

    const handlePress = (componentName) => {
        setActiveComponent(componentName);
    };

    useEffect(() => {
        if (MyprofileData?.Biodata) {
            setBiodataAvailable(true);
        }
    }, [MyprofileData]);

    const capitalizeFirstLetter = (text) => {
        return text ? text.charAt(0).toUpperCase() + text.slice(1) : 'Unknown';
    };

    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'DetailedProfile':
                return <DetailedProfile navigation={navigation} />;
            case 'PartnersPreference':
                return <PartnersPreference navigation={navigation} />;
            case 'PhotoGallery':
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
            <ScrollView contentContainerStyle={[styles.container]} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
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
                                <Text style={styles.text}>{capitalizeFirstLetter(profileData?.profiledata?.username || 'NA')}</Text>
                                {profileData?.profiledata?.dob && (
                                    <Text style={styles.text}>
                                        DOB: {moment(profileData?.profiledata?.dob).format('DD/MM/YYYY')}
                                    </Text>
                                )}
                                <Text style={styles.text}>City: {capitalizeFirstLetter(profileData?.profiledata?.city || 'NA')}</Text>
                            </View>
                            <View>
                                <Text style={styles.text}>
                                    Contact: {profileData?.profiledata?.mobileNo}</Text>
                                <Text style={styles.text}>Gender: {capitalizeFirstLetter(profileData?.profiledata?.gender || 'NA')}</Text>
                            </View>
                        </View>

                    </View>
                    {/* Tab Buttons */}
                    <View style={styles.IconFlex}>
                        <TouchableOpacity
                            style={styles.IconsButton}
                            onPress={() => handlePress('DetailedProfile')}
                        >
                            <View
                                style={[
                                    styles.iconWrapper,
                                    activeComponent === 'DetailedProfile' && styles.activeIcon,
                                ]}
                            >
                                <AntDesign
                                    name="user"
                                    color={activeComponent === 'DetailedProfile' ? 'white' : Colors.theme_color}
                                    size={20}
                                />
                            </View>
                            <Text style={styles.logotext}>Biodata Details</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.IconsButton}
                            onPress={() => handlePress('PartnersPreference')}
                        >
                            <View
                                style={[
                                    styles.iconWrapper,
                                    activeComponent === 'PartnersPreference' && styles.activeIcon,
                                ]}
                            >
                                <FontAwesome5
                                    name="user-friends"
                                    color={activeComponent === 'PartnersPreference' ? 'white' : Colors.theme_color}
                                    size={20}
                                />
                            </View>
                            <Text style={styles.logotext}>Partner Preference</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                            style={styles.IconsButton}
                            onPress={() => handlePress('PhotoGallery')}
                        >
                            <View
                                style={[
                                    styles.iconWrapper,
                                    activeComponent === 'PhotoGallery' && styles.activeIcon,
                                ]}
                            >
                                <MaterialIcons
                                    name="photo-library"
                                    color={activeComponent === 'PhotoGallery' ? 'white' : Colors.theme_color}
                                    size={20}
                                />
                            </View>
                            <Text style={styles.logotext}>Photo Gallery</Text>
                        </TouchableOpacity> */}
                    </View>

                    {/* Render Active Component */}
                    <View>
                        {renderActiveComponent()}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MainPartnerPrefrence;
