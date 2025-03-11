import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../StyleScreens/ViewPostStyle';
import Globalstyles from '../../utils/GlobalCss';
import { SH, SW } from '../../utils/Dimensions';
import ImageViewing from 'react-native-image-viewing';

const ViewEntityImages = ({ navigation, route }) => {
    const { post, images, panditDetails, jyotishDetails, kathavachakDetails } = route.params;

    // Determine which entity details are available
    const entityDetails = panditDetails || jyotishDetails || kathavachakDetails;
    const entityType = panditDetails ? "Pandit" : jyotishDetails ? "Jyotish" : "Kathavachak";

    const [visible, setVisible] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const formattedImages = images.map((img) => ({ uri: img }));

    console.log("Entity Details:", entityDetails);

    const [imageAspectRatios, setImageAspectRatios] = useState([]);

    useEffect(() => {
        const fetchAspectRatios = async () => {
            const ratios = await Promise.all(
                images.map((image) =>
                    typeof image === 'string' && image.startsWith('http')
                        ? new Promise((resolve) => {
                            Image.getSize(image, (width, height) => resolve(width / height));
                        })
                        : Promise.resolve(1)
                )
            );
            setImageAspectRatios(ratios);
        };

        if (images.length > 0) {
            fetchAspectRatios();
        }
    }, [images]);

    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {/* Header */}
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>{entityDetails?.fullName || "Profile"}</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Profile Info */}
                <View style={styles.postHeader}>
                    <Image source={require('../../Images/user.png')} />
                    <View style={styles.postTextContainer}>
                        <Text style={styles.Text}>{entityDetails?.fullName || "N/A"}</Text>
                        <Text style={styles.Text}>{entityDetails?.city || "City Unknown"} || {entityDetails?.subCaste || "SubCaste Unknown"}</Text>
                        <Text style={styles.Text}>{entityType}</Text>
                    </View>
                </View>

                {/* Images */}
                <View style={{ marginVertical: SH(10), marginHorizontal: SW(10) }}>
                    {images.map((image, index) => (
                        <TouchableOpacity key={index} style={styles.card} onPress={() => { setSelectedImageIndex(index); setVisible(true); }}>
                            <Image
                                source={typeof image === 'string' ? { uri: image } : image}
                                style={[styles.image, { aspectRatio: imageAspectRatios[index] || 1 }]}
                                resizeMode="cover"
                            />
                            {/* Like, Comment, Share */}
                            {/* <View style={styles.likeShareComment}>
                                <View style={styles.likeShare}>
                                    <AntDesign name="hearto" size={20} color={Colors.dark} />
                                    <Text style={styles.shareText}>25k Likes</Text>
                                </View>
                                <View style={styles.likeShare}>
                                    <EvilIcons name="comment" size={20} color={Colors.dark} />
                                    <Text style={styles.shareText}>90 Comments</Text>
                                </View>
                                <View style={styles.likeShare}>
                                    <Feather name="send" size={20} color={Colors.dark} />
                                    <Text style={styles.shareText}>250 Shares</Text>
                                </View>
                            </View> */}
                        </TouchableOpacity>
                    ))}
                </View>
                <ImageViewing
                    images={formattedImages}
                    imageIndex={selectedImageIndex}
                    visible={visible}
                    onRequestClose={() => setVisible(false)}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ViewEntityImages;
