import { Text, View, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/PhotoGallleryStyle';
import { useSelector } from 'react-redux';

const PhotoGallery = () => {
    const MyprofileData = useSelector((state) => state.getBiodata);
    const myBiodata = MyprofileData?.Biodata?.personalDetails || {};

    // Check if all images are missing
    const noImages = !myBiodata?.bestPhoto && !myBiodata?.closeUpPhoto && !myBiodata?.fullPhoto;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
                <View>
                    <View style={styles.flex}>
                        <Text style={styles.detailText}>PHOTO GALLERY</Text>
                        <AntDesign name={'camera'} color={Colors.theme_color} size={25} />
                    </View>

                    {/* Agar koi image na ho toh ye message show hoga */}
                    {noImages ? (
                        <Text style={styles.noImageText}>
                            Please upload your Close-up, Best, and Full photo by making your biodata.
                        </Text>
                    ) : (
                        <View>
                            {myBiodata?.bestPhoto && (
                                <Image source={{ uri: myBiodata?.bestPhoto }} style={styles.bottomImage} />
                            )}
                            {myBiodata?.closeUpPhoto && (
                                <Image source={{ uri: myBiodata?.closeUpPhoto }} style={styles.bottomImage} />
                            )}
                            {myBiodata?.fullPhoto && (
                                <Image source={{ uri: myBiodata?.fullPhoto }} style={styles.bottomImage} />
                            )}
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PhotoGallery;
