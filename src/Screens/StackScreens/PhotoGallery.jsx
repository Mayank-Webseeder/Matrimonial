import { Text, View, Image, ImageBackground, ScrollView, SafeAreaView, StatusBar } from 'react-native'
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
    console.log("profileData", profileData);

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

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} >
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
            </ScrollView>
        </SafeAreaView>
    );
};

export default PhotoGallery;
