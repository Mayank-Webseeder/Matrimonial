import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Modal } from 'react-native';
import Colors from '../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../StyleScreens/ViewPostStyle';
import Globalstyles from '../../utils/GlobalCss';
import { SH, SW } from '../../utils/Dimensions';
import ImageViewer from 'react-native-image-zoom-viewer';

const ViewEntityImages = ({ navigation, route }) => {
    const { post, images, panditDetails, jyotishDetails, kathavachakDetails } = route.params;

    // Determine which entity details are available
    const entityDetails = panditDetails || jyotishDetails || kathavachakDetails;
    const entityType = panditDetails ? "Pandit" : jyotishDetails ? "Jyotish" : "Kathavachak";

    const [selectedImage, setSelectedImage] = useState([]);
    const [isImageVisible, setImageVisible] = useState(false);

    const openImageViewer = (imageUri) => {
        if (imageUri) {
            setSelectedImage([{ url: imageUri }]);
            setImageVisible(true);
        }
    };

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
                <View>
                    <View style={styles.postHeader}>
                        <Image
                            source={entityDetails?.profilePhoto
                                ? { uri: entityDetails.profilePhoto }
                                : require('../../Images/NoImage.png')
                            }
                            style={styles.profileImage}
                            resizeMode="cover"
                        />


                        <View style={styles.postTextContainer}>
                            <Text style={styles.Text}>{entityDetails?.fullName || "N/A"}</Text>
                            <Text style={styles.Text}>{entityDetails?.city || "City Unknown"} || {entityDetails?.subCaste || "SubCaste Unknown"}</Text>
                            <Text style={styles.Text}>{entityType}</Text>
                        </View>
                    </View>
                    <View style={{ marginVertical: SH(10) }}>
                        {images.map((image, index) => (
                            <TouchableOpacity key={index} onPress={() => openImageViewer(image)}>
                                <Image
                                    source={typeof image === 'string' ? { uri: image } : image}
                                    style={[
                                        styles.image,
                                        { aspectRatio: imageAspectRatios[index] || 1 }
                                    ]}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {selectedImage && (
                        <Modal
                            visible={isImageVisible}
                            transparent={true}
                            onRequestClose={() => setImageVisible(false)}
                        >
                            <ImageViewer
                                imageUrls={selectedImage}
                                enableSwipeDown={true}
                                onSwipeDown={() => setImageVisible(false)}
                                onCancel={() => setImageVisible(false)}
                                enablePreload={true}
                                saveToLocalByLongPress={false}
                                renderIndicator={() => null}
                            />
                        </Modal>
                    )}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default ViewEntityImages;
