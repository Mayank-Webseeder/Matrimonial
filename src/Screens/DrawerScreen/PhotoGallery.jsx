import { Text, View, Image, ImageBackground, ScrollView,SafeAreaView,StatusBar } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/PhotoGallleryStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Globalstyles from '../../utils/GlobalCss';
import { useSelector } from 'react-redux';
import moment from "moment";

const PhotoGallery = ({ navigation }) => {
    const [selectedButton, setSelectedButton] = useState('PhotoGallery');
   const profileData = useSelector((state) => state.profile);
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
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../Images/menu.png')} style={styles.menuIcon} />
                    </TouchableOpacity>
                    <View style={styles.headerContainer}>
                        <Text style={Globalstyles.headerText}>Matrimony Profile</Text>
                        {/* <AntDesign name={'caretdown'} color={Colors.theme_color} size={15} /> */}
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >
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

                    <View style={styles.IconFlex}>
                        <TouchableOpacity
                            style={styles.IconsButton}
                            onPress={() => handlePress('DetailedProfile')}
                        >
                            <AntDesign
                                name={'user'}
                                color={selectedButton === 'DetailedProfile' ? 'white' : Colors.theme_color} // Change icon color based on active state
                                size={25}
                                style={selectedButton === 'DetailedProfile' ? styles.Selectedicon : styles.icon}
                            />
                            <Text style={styles.logotext}>Detailed Profile</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.IconsButton}
                            onPress={() => handlePress('PartnersPreference')}
                        >
                            <FontAwesome5
                                name={'user-friends'}
                                color={selectedButton === 'PartnersPreference' ? 'white' : Colors.theme_color} // Icon color change
                                size={25}
                                style={selectedButton === 'PartnersPreference' ? styles.Selectedicon : styles.icon}
                            />
                            <Text style={styles.logotext}>Partner Preference</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.IconsButton}
                            onPress={() => handlePress('PhotoGallery')}
                        >
                            <MaterialIcons
                                name={'insert-photo'}
                                color={selectedButton === 'PhotoGallery' ? 'white' : Colors.theme_color} // Icon color change
                                size={25}
                                style={selectedButton === 'PhotoGallery' ? styles.Selectedicon : styles.icon}
                            />
                            <Text style={styles.logotext}>Photo Gallery</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={styles.flex}>
                            <Text style={styles.detailText}>PHOTO GALLERY</Text>
                            <AntDesign name={'camera'} color={Colors.theme_color} size={25} />
                        </View>
                        <View>
                            <Image source={require('../../Images/profile3.png')} style={styles.bottomImage} />
                            <Image source={require('../../Images/profile3.png')} style={styles.bottomImage} />
                            <Image source={require('../../Images/profile3.png')} style={styles.bottomImage} />
                        </View>
                        
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PhotoGallery;
