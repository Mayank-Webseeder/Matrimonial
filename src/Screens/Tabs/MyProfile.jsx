import { Text, View, Image, ImageBackground, SafeAreaView, StatusBar } from 'react-native';
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

const MyProfile = ({ navigation }) => {
    const [selectedButton, setSelectedButton] = useState('CreateBioData');
    const ProfileData = useSelector((state) => state.profile);
    const profileData=ProfileData?.profiledata || {};
    console.log("profileData",profileData);
    const formattedDate = moment(profileData.dob).format("DD/MM/YYYY");

    const handlePress = (buttonName) => {
        setSelectedButton(buttonName);
        navigation.navigate(buttonName);
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
                    <Text style={Globalstyles.headerText}>My Profile</Text>
                </View>
            </View>

            <View contentContainerStyle={{ flexGrow: 1 }}>
                <View>
                    <ImageBackground source={require('../../Images/profile3.png')} style={styles.image}>
                        <View style={styles.smallHeader}>
                        <MaterialIcons
                                    name="add-a-photo"
                                    color={Colors.theme_color}
                                    size={40}
                                    style={styles.cameraIcon}
                                />
                        </View>
                    </ImageBackground>
                    <Text style={styles.editText} onPress={()=>navigation.navigate('UpdateProfile')}>Edit Profile</Text>
                    <View style={styles.userDeatil}>
                        <View style={styles.userData}>
                            <Text style={styles.text}>{profileData.username || 'NA'}</Text>
                            <Text style={styles.text}>{profileData.mobileNo}</Text>
                        </View>
                        <View style={styles.userData}>
                            <Text style={styles.text}>DOB: {formattedDate || 'NA'}</Text>
                            <Text style={styles.text}>City: {profileData.city || 'NA'}</Text>
                        </View>
                        <View style={styles.userData}>

                            <Text style={styles.text}>Gender: {profileData.gender || 'NA'}</Text>
                        </View>
                    </View>

                    <View>
                        {/* First Row */}
                        <View style={styles.IconFlex}>
                            <TouchableOpacity
                                style={styles.IconsButton}
                            onPress={() => handlePress('DetailedProfile')}
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
        </SafeAreaView>
    );
};

export default MyProfile;
