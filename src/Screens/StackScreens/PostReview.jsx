import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, SafeAreaView, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../StyleScreens/PostReview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../../utils/Colors';
import Globalstyles from '../../utils/GlobalCss';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';

import {
    PANDIT_REVIEW,
    JYOTISH_REVIEW,
    KATHAVACHAK_REVIEW,
    UPDATE_PANDIT_REVIEW,
    UPDATE_JYOTISH_REVIEW,
    UPDATE_KATHAVACHAK_REVIEW
} from '../../utils/BaseUrl';
import { showMessage } from 'react-native-flash-message';

const PostReview = ({ navigation, route }) => {
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const { pandit_id, entityType, jyotish_id, kathavachak_id, myReview } = route.params;
    console.log(" pandit_id, entityType, jyotish_id, kathavachak_id, myReview", pandit_id, entityType, jyotish_id, kathavachak_id, myReview)
    const [isEditMode, setIsEditMode] = useState(!!myReview);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (myReview) {
            setDescription(myReview?.review);
            setRating(myReview?.rating);
        }
        console.log("Route Parameters:");
        console.log("pandit_id:", pandit_id);
        console.log("entityType:", entityType);
        console.log("jyotish_id:", jyotish_id);
        console.log("kathavachak_id:", kathavachak_id);
        console.log("myReview:", myReview);
    }, [myReview]);


    const getApiEndpoint = (entityType, isEditMode, pandit_id, jyotish_id, kathavachak_id) => {
        const baseUrl = () => {
            switch (entityType) {
                case "Pandit":
                    return {
                        create: PANDIT_REVIEW,
                        update: UPDATE_PANDIT_REVIEW,
                        entityId: pandit_id
                    };
                case "Jyotish":
                    return {
                        create: JYOTISH_REVIEW,
                        update: UPDATE_JYOTISH_REVIEW,
                        entityId: jyotish_id
                    };
                case "Kathavachak":
                    return {
                        create: KATHAVACHAK_REVIEW,
                        update: UPDATE_KATHAVACHAK_REVIEW,
                        entityId: kathavachak_id
                    };
                default:
                    return null;
            }
        };

        const endpoints = baseUrl();

        if (!endpoints) {
            return null;
        }

        return isEditMode
            ? { url: endpoints.update, entityId: endpoints.entityId }
            : { url: endpoints.create, entityId: endpoints.entityId };
    };

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            setIsLoading(true)
            const token = await AsyncStorage.getItem("userToken");
            if (!token) throw new Error("Authorization token is missing.");

            const formattedEntityType = entityType.charAt(0).toUpperCase() + entityType.slice(1).toLowerCase();
            const apiData = getApiEndpoint(formattedEntityType, isEditMode, pandit_id, jyotish_id, kathavachak_id);

            if (!apiData || !apiData.entityId) {
                console.error("❌ Invalid entity type or missing entity ID");
                return;
            }

            const payload = {
                entityId: apiData.entityId,
                rating: rating,
                review: description
            };

            console.log("payload", payload);

            if (!isEditMode) {
                payload.entityType = formattedEntityType;
            }

            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };

            const requestConfig = {
                method: isEditMode ? "patch" : "post",
                url: apiData.url,
                data: payload,
                headers: headers,
            };

            console.log("✅ Selected API:", apiData.url);
            console.log("📤 Payload being sent:", JSON.stringify(payload, null, 2));

            const response = await axios(requestConfig);
            console.log("response", JSON.stringify(response.data));

            // ✅ Check if response is successful
            if (response.status === 200 || response.data.status === true) {
                showMessage({
                    type: "success",
                    message: "Success",
                    description: `Your review has been ${isEditMode ? "updated" : "posted"} successfully!`,
                    icon: "success",
                    duarion: 5000
                });
                navigation.goBack();
            } else {
                showMessage({
                    type: "danger",
                    message: "Failed to post/update the review. Please try again.",
                    icon: "danger",
                    duarion: 5000
                });
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error("Error fetching biodata:", errorMsg);
            showMessage({
                type: "danger",
                message: errorMsg,
                icon: "danger",
                duarion: 5000
            });
            const sessionExpiredMessages = [
                "User does not Exist....!Please login again",
                "Invalid token. Please login again",
                "Token has expired. Please login again"
            ];

            if (sessionExpiredMessages.includes(errorMsg)) {
                await AsyncStorage.removeItem("userToken");
                navigation.reset({
                    index: 0,
                    routes: [{ name: "AuthStack" }],
                });
            }
            setIsLoading(false)
        }
        finally {
            setIsLoading(false)
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
        <SafeAreaView style={Globalstyles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View style={Globalstyles.header}>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>{isEditMode ? 'Edit Review' : 'Post a Review'}</Text>
                </View>
                <View style={styles.righticons}>
                    <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => { navigation.navigate('Notification') }} />
                </View>
            </View>
            <View style={Globalstyles.form}>
                <Text style={Globalstyles.title}>Rating <Entypo name={'star'} color={'red'} size={12} /></Text>
                <View style={styles.starContainer}>{renderStars()}</View>
                <Text style={Globalstyles.title}>Description</Text>
                <TextInput
                    style={Globalstyles.textInput}
                    placeholder="Write your review..."
                    placeholderTextColor={Colors.gray}
                    multiline={true}
                    value={description}
                    onChangeText={setDescription}
                    textAlignVertical='top'
                />
                {
                    isLoading ?
                        <ActivityIndicator size={'large'} color={Colors.theme_color} />
                        :
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.submitButtonText}>{isEditMode ? 'Update Review' : 'Submit Review'}</Text>
                        </TouchableOpacity>
                }
            </View>
        </SafeAreaView>
    );
};


export default PostReview;
