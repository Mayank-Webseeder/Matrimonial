import { Text, View, Image, ImageBackground, ScrollView, SafeAreaView, StatusBar, Modal } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/ProfileStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Dropdown } from 'react-native-element-dropdown';
import { useSelector } from 'react-redux';
import moment from "moment";
import Globalstyles from '../../utils/GlobalCss';
import { launchImageLibrary } from 'react-native-image-picker';

import {
    PeoplePosition,
} from '../../DummyData/DropdownData';
import DetailedProfile from './DetailedProfile';
import PartnersPreference from './PartnersPreference';
import PhotoGallery from './PhotoGallery';

const MatrimonyPage = ({ navigation }) => {
    const [activeComponent, setActiveComponent] = useState("DetailedProfile");
    const [peoplePosition, setPeoplePosition] = useState(null);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const profileData = useSelector((state) => state.profile);
    const formattedDate = moment(profileData.dob).format("DD/MM/YYYY");

    const handleSelectImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.assets && response.assets.length > 0) {
                setSelectedImage(response.assets[0].uri);
                setModalVisible(false);
            }
        });
    };

    const handleDeleteImage = () => {
        setSelectedImage(null);
        setModalVisible(false);
    };

    const handlePress = (componentName) => {
        setActiveComponent(componentName);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
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
                    <Text style={Globalstyles.headerText}>Matrimony Profile</Text>
                    <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownContainer}>
                        <AntDesign name={'caretdown'} color={Colors.theme_color} size={15} />
                    </TouchableOpacity>
                    {dropdownVisible && (
                        <Dropdown
                            style={styles.heightinput}
                            data={PeoplePosition}
                            labelField="label"
                            valueField="value"
                            value={peoplePosition}
                            onChange={(item) => {
                                setPeoplePosition(item.value);
                                setDropdownVisible(false);
                            }}
                            placeholder="Select"
                        />
                    )}
                </View>
            </View>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <ImageBackground
                    source={selectedImage ? { uri: selectedImage } : require('../../Images/profile3.png')}
                    style={styles.image}>
                    <TouchableOpacity style={styles.smallHeader} onPress={() => {
                        console.log("Opening Modal...");
                        setModalVisible(true);
                    }}>
                        <MaterialIcons
                            name="add-a-photo"
                            color={Colors.theme_color}
                            size={40}
                            style={styles.cameraIcon}
                        />
                    </TouchableOpacity>

                </ImageBackground>
                <Text style={styles.editText} onPress={() => navigation.navigate('UpdateProfile')}>Edit Profile</Text>
                <Text style={styles.RepostText}>Repost</Text>
                <View style={styles.userDeatil}>
                    <View style={styles.userData}>
                        <Text style={styles.text}>{profileData?.profiledata?.username || 'NA'}</Text>
                        <Text style={styles.text}>{profileData?.profiledata?.mobileNo}</Text>
                    </View>
                    <View style={styles.userData}>
                        <Text style={styles.text}>DOB: {formattedDate || 'NA'}</Text>
                        <Text style={styles.text}>City: {profileData?.profiledata?.city || 'NA'}</Text>
                    </View>
                    <View style={styles.userData}>
                        <Text style={styles.text}>Gender: {profileData?.profiledata?.gender || 'NA'}</Text>
                    </View>
                </View>

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
                                    <AntDesign name="close" size={20} color={Colors.theme_color} />
                                </TouchableOpacity>
                                <Text style={styles.modalTitle}>Profile Photo</Text>

                                <TouchableOpacity
                                    onPress={handleDeleteImage}
                                >
                                    <MaterialIcons name={'delete'} size={30} color={'red'} />
                                </TouchableOpacity>
                            </View>

                            {/* Option to Choose from Gallery */}
                            <TouchableOpacity
                                onPress={handleSelectImage} style={styles.gallery}
                            >
                                <MaterialIcons name={'add-a-photo'} size={20} color={Colors.theme_color} />
                                <Text style={styles.Gallerytext}>Gallery</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

            </ScrollView>
        </SafeAreaView>
    );
};

export default MatrimonyPage;

