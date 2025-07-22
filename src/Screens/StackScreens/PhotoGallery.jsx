import { Text, View, Image, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/PhotoGallleryStyle';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SH } from '../../utils/Dimensions';

const PhotoGallery = () => {
    const insets = useSafeAreaInsets();
    const MyprofileData = useSelector((state) => state.getBiodata);
    const myBiodata = MyprofileData?.Biodata?.personalDetails || {};
    const noImages = !myBiodata?.bestPhoto && !myBiodata?.closeUpPhoto && !myBiodata?.fullPhoto;

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + SH(10) }} showsVerticalScrollIndicator={false}>
                <View>
                    <View style={styles.flex}>
                        <Text style={styles.detailText}>PHOTO GALLERY</Text>
                        <AntDesign name={'camera'} color={Colors.theme_color} size={25} />
                    </View>

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
