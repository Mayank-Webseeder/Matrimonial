import { Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { SH, SW, SF } from '../../utils/Dimensions';
import Globalstyles from '../../utils/GlobalCss';
import ImageCropPicker from 'react-native-image-crop-picker';


const PostSuccessStories = ({ navigation }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageName, setSelectedImageName] = useState("Upload Image");
    const handleSubmit = () => {
        if (!rating || !comment || photos.length === 0) {
            alert('Please provide a rating, comment, and upload a photo before submitting.');
        } else {
            console.log({
                rating,
                comment,
                photo: photos[0]?.uri,
            });
            alert('Success story submitted!');
        }
    };

    const handleImagePick = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 250,
            cropping: true,
        })
            .then(image => {
                setSelectedImage(image.path);
                const imageName = image.path.split('/').pop();
                setSelectedImageName(imageName);
                console.log('Selected Image:', image);
            })
            .catch(error => {
                console.error('Image Picking Error:', error);
            });
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                    <Entypo
                        name={i <= rating ? 'star' : 'star-outlined'}
                        size={30}
                        color={'#FF9900'}
                        style={styles.star}
                    />
                </TouchableOpacity>
            );
        }
        return stars;
    };

    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Post Story</Text>
                </View>
            </View>

            <View style={Globalstyles.form}>
                <Text style={styles.Text}>Post Your Success Story</Text>
                <Text style={styles.description}>Share your experience in scaling</Text>
                <View style={styles.ratingContainer}>
                    {renderStars()}
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Add your thoughts..."
                    multiline={true}
                    value={comment}
                    onChangeText={setComment}
                    placeholderTextColor={Colors.gray}
                />
                <Text style={styles.description}>Upload your one couple picture</Text>
                <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
                    <Text style={styles.uploadText}>{selectedImage ? 'Change Image' : 'Upload Image'}</Text>
                </TouchableOpacity>
                {selectedImage && (
                    <View style={styles.photosContainer}>
                        <Text style={Globalstyles.title}>Uploaded Image</Text>
                        <Text style={styles.imageName}>{selectedImageName}</Text>
                    </View>
                )}
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitText}>Post Story</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default PostSuccessStories;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light,
        paddingTop: SH(25),
        paddingHorizontal: SW(6)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SW(10),
        paddingVertical: SH(10),
        paddingLeft: 0
    },
    headerText: {
        color: Colors.theme_color,
        fontSize: SF(15),
        fontFamily: "Poppins-Regular"
    },
    Text: {
        fontSize: SF(24),
        fontFamily: "Poppins-Bold",
        color: Colors.theme_color,
    },

    description: {
        fontSize: SF(13),
        color: Colors.theme_color,
        marginBottom: SH(10),
        fontFamily: "Poppins-Bold"
    },
    textInput: {
        borderColor: Colors.gray,
        borderWidth: 1,
        paddingBottom: SH(60),
        borderRadius: 10,
        marginBottom: SH(50)
    },
    submitButton: {
        backgroundColor: Colors.theme_color,
        paddingHorizontal: SW(15),
        paddingVertical: SH(7),
        borderRadius: 5,
        alignItems: 'center',
    },
    submitText: {
        color: 'white',
        fontSize: SF(15),
        fontFamily: "Poppins-Bold"
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SH(25)
    },
    star: {
        marginHorizontal: SW(3),
    },
    menuIcon: {
        width: SW(30),
        height: SH(30)
    },
    uploadButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: SW(10),
        paddingVertical: SH(10),
        alignItems: 'center',
        marginBottom: SH(15),
    },
    uploadText: {
        color: Colors.theme_color,
        textAlign: "center"
    },
    photosContainer: {
        paddingVertical: SH(10),
    },
})
