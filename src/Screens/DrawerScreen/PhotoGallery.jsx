import { Text, View, Image, ImageBackground, ScrollView } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/PhotoGallleryStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PhotoGallery = ({ navigation }) => {
    const [selectedButton, setSelectedButton] = useState('PhotoGallery');

    const handlePress = (buttonName) => {
        setSelectedButton(buttonName);
        navigation.navigate(buttonName);
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
                        <Image source={require('../../Images/menu.png')} />
                    </TouchableOpacity>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Matrimony Profile</Text>
                        <AntDesign name={'caretdown'} color={Colors.theme_color} size={15} />
                    </View>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View>
                    <ImageBackground source={require('../../Images/profile3.png')} style={styles.image}>
                        <View style={styles.smallHeader}>
                            <Image source={require('../../Images/profile3.png')} style={styles.smallimage} />
                            <Text style={styles.name}>Raj Shah</Text>
                        </View>
                    </ImageBackground>

                    <View style={styles.userDeatil}>
                        <View style={styles.userData}>
                            <Text style={styles.text}>User ID: 1212312313</Text>
                            <Text style={styles.text}>23 yrs</Text>
                        </View>
                        <View style={styles.userData}>
                            <Text style={styles.text}>Unmarried</Text>
                            <Text style={styles.text}>Lives in London</Text>
                        </View>
                        <View style={styles.userData}>
                            <AntDesign name={'hearto'} color={Colors.theme_color} size={25} />
                            <AntDesign name={'menu-unfold'} color={Colors.theme_color} size={25} />
                            <Feather name={'minus-circle'} color={Colors.theme_color} size={25} />
                            <MaterialIcons name={'report-gmailerrorred'} color={Colors.theme_color} size={25} />
                        </View>
                    </View>
                    <View style={styles.IconFlex}>
                        <TouchableOpacity
                            style={styles.IconsButton}
                            onPress={() => handlePress('Profile')}
                        >
                            <AntDesign
                                name={'user'}
                                color={selectedButton === 'Profile' ? 'white' : Colors.theme_color} // Change icon color based on active state
                                size={25}
                                style={selectedButton === 'Profile' ? styles.Selectedicon : styles.icon}
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
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default PhotoGallery;
