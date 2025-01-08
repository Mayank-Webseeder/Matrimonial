import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert,StatusBar,SafeAreaView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../StyleScreens/PostReview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';


const PostReview = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);

    const handleImagePicker = async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                Alert.alert('Error', `Image picker error: ${response.errorMessage}`);
            } else {
                const uri = response.assets && response.assets[0].uri;
                setImage(uri);
            }
        });
    };

    const handleSubmit = () => {
        if (rating === 0) {
            Alert.alert('Error', 'Please provide a rating before submitting.');
            return;
        }

        const reviewData = {
            image,
            description,
            rating,
        };

        console.log('Review Data:', reviewData);
        Alert.alert('Success', 'Your review has been submitted!');
        navigation?.goBack(); 
    };

    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => (
            <TouchableOpacity
                key={index}
                onPress={() => setRating(index + 1)}
                style={{ marginHorizontal: 5 }}
            >
                <FontAwesome
                    name="star"
                    size={30}
                    color={index < rating ? Colors.star_active : Colors.star_inactive}
                />
            </TouchableOpacity>
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar 
                barStyle="dark-content" 
                backgroundColor="transparent" 
                translucent 
            />
            <View style={styles.header}>
                <View style={{ alignItems:"center",flexDirection:"row"}}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Post a Review</Text>
                </View>
                <View style={styles.righticons}>
                    {/* <AntDesign name={'search1'} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} /> */}
                    <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => { navigation.navigate('Notification')}}/>
                </View>
            </View>

            <TouchableOpacity style={styles.imageContainer} onPress={handleImagePicker}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <View style={styles.uploadPlaceholder}>
                        <MaterialIcons name="add-a-photo" size={40} color={Colors.gray} />
                        <Text style={styles.uploadText}>Upload Photo (Optional)</Text>
                    </View>
                )}
            </TouchableOpacity>

           <View style={styles.contentContainer}>
           <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Write your review..."
                placeholderTextColor={Colors.gray}
                multiline
                value={description}
                onChangeText={setDescription}
            />

            <Text style={styles.label}>Rating (Required)</Text>
            <View style={styles.starContainer}>{renderStars()}</View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit Review</Text>
            </TouchableOpacity>
           </View>
        </SafeAreaView>
    );
};

export default PostReview;


