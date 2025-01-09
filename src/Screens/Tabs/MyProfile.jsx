import { Text, View, Image, ImageBackground, SafeAreaView, StatusBar } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/MyProfileStyle';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { DrawerActions } from '@react-navigation/native';

const MyProfile = ({ navigation }) => {
    const [selectedButton, setSelectedButton] = useState('CreateBioData');

    const handlePress = (buttonName) => {
        setSelectedButton(buttonName);
        navigation.navigate(buttonName);
    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <Image source={require('../../Images/menu.png')} style={styles.menuIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>My Profile</Text>
                </View>
            </View>

            <View contentContainerStyle={{ flexGrow: 1 }}>
                <View>
                    <ImageBackground source={require('../../Images/profile3.png')} style={styles.image}>
                        <View style={styles.smallHeader}>
                            <Image source={require('../../Images/profile3.png')} style={styles.smallimage} />
                            <Text style={styles.name}>Raj Shah</Text>
                        </View>
                    </ImageBackground>

                    <View style={styles.userDeatil}>
                        <View style={styles.userData}>
                            <Text style={styles.text}>Raj Shah</Text>
                            <Text style={styles.text}>124567890</Text>
                        </View>
                        <View style={styles.userData}>
                            <Text style={styles.text}>Date of Birth: 23/04/1998</Text>
                            <Text style={styles.text}>City: London</Text>
                        </View>
                        <View style={styles.userData}>

                            <Text style={styles.text}>Gender: Male</Text>
                        </View>
                    </View>

                    <View>
                        {/* First Row */}
                        <View style={styles.IconFlex}>
                            <TouchableOpacity
                                style={styles.IconsButton}
                            onPress={() => handlePress('Profile')}
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
