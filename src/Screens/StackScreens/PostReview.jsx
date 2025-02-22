import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../StyleScreens/PostReview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import Globalstyles from '../../utils/GlobalCss';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PANDIT_REVIEW,JYOTISH_REVIEW,KATHAVACHAK_REVIEW } from '../../utils/BaseUrl';
import Toast from 'react-native-toast-message';

const PostReview = ({ navigation, route }) => {
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const { pandit_id, entityType, jyotish_id, kathavachak_id } = route.params;

    console.log("Entity Info:", { pandit_id, entityType, jyotish_id, kathavachak_id });
    
    const getApiEndpoint = (entityType) => {
        if (entityType === "Pandit" && pandit_id) {
            return { url: PANDIT_REVIEW, entityId: pandit_id };
        } else if (entityType === "Jyotish" && jyotish_id) {
            return { url: JYOTISH_REVIEW, entityId: jyotish_id };
        } else if (entityType === "Kathavachak" && kathavachak_id) {
            return { url: KATHAVACHAK_REVIEW, entityId: kathavachak_id };
        } else {
            return null;
        }
    };

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) throw new Error("Authorization token is missing.");
            const formattedEntityType = entityType.charAt(0).toUpperCase() + entityType.slice(1).toLowerCase(); 
            const apiData = getApiEndpoint(formattedEntityType);
            if (!apiData || !apiData.entityId) {
                console.error("❌ Invalid entity type or missing entity ID");
                return;
            }
    
            console.log("✅ Selected API:", apiData.url);
    
            const payload = {
                entityId: apiData.entityId,
                rating: rating,
                entityType: formattedEntityType,
                review: description
            };
    
            console.log("📤 Payload being sent:", JSON.stringify(payload, null, 2));
    
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };
    
            const response = await axios.post(apiData.url, payload, { headers });
    
            if (response.status === 200) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Your review has been posted successfully!',
                    position: 'top',
                });
                navigation.goBack();
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to post the review. Please try again.',
                    position: 'top',
                });
            }
        } catch (error) {
            console.error('❌ Error posting review:', error);
            const errorMessage = error.response?.data?.message || 'An error occurred while posting the review.';
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: errorMessage,
                position: 'top',
            });
        }
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
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <View style={Globalstyles.header}>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Post a Review</Text>
                </View>
                <View style={styles.righticons}>
                    {/* <AntDesign name={'search1'} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} /> */}
                    <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => { navigation.navigate('Notification') }} />
                </View>
            </View>
            <View style={Globalstyles.form}>
                <Text style={Globalstyles.title}>Rating (Required)</Text>
                <View style={styles.starContainer}>{renderStars()}</View>
                <Text style={Globalstyles.title}>Description (Optional)</Text>
                <TextInput
                    style={Globalstyles.textInput}
                    placeholder="Write your review..."
                    placeholderTextColor={Colors.gray}
                    multiline={true}
                    value={description}
                    onChangeText={setDescription}
                    textAlignVertical='top'
                />

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit Review</Text>
                </TouchableOpacity>
            </View>
            <Toast />
        </SafeAreaView>
    );
};

export default PostReview;


