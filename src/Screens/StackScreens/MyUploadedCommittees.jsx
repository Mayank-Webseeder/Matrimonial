import { Text, View, FlatList, TouchableOpacity, ScrollView, SafeAreaView, StatusBar, Linking, Pressable, Modal } from 'react-native';
import React, { useState } from 'react';
import { Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../StyleScreens/CommunityStyle';
import Colors from '../../utils/Colors';
import Globalstyles from '../../utils/GlobalCss';
import axios from 'axios';
import ImageViewing from 'react-native-image-viewing';
import { DELETE_COMMITTEE } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';

const MyUploadedCommittees = ({ navigation, route }) => {
    const { committeeData } = route.params;
    const [isImageVisible, setImageVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [selectedItem, setSelectedItem] = useState(null);
    const [IsLoading, setIsLoading] = useState(false);
    const openImageViewer = (imageUri) => {
        setSelectedImage(imageUri);
        setImageVisible(true);
    };

    const handleDelete = async (id) => {
        console.log("🗑️ Deleting Committee ID:", id);

        try {
            setIsLoading(true);  // Show loading indicator

            const token = await AsyncStorage.getItem("userToken");
            if (!token) throw new Error("Authorization token is missing");

            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            console.log("🔹 Headers:", headers);

            const response = await axios.delete(`${DELETE_COMMITTEE}/${id}`, { headers });

            console.log("✅ Delete Response:", response.data);

            if (response.status === 200 || response.data.status === true) {
                showMessage({
                    type: "success",
                    message: "Committee deleted successfully!",
                    icon: "success"
                });

                setModalVisible(false);  // Close modal
                setSelectedItem(null);  // Reset selected item

                // ✅ Ensure navigation is available before using it
                if (navigation && navigation.navigate) {
                    navigation.reset({ index: 0, routes: [{ name: "Committee" }] });
                } else {
                    console.warn("⚠️ Navigation is not available");
                }

                return;
            }

            throw new Error(response.data.message || "Failed to delete committee.");
        } catch (error) {
            console.error("🚨 Error deleting committee:", error?.response?.data || error.message);

            let errorMessage = "Failed to delete committee. Please try again!";
            if (error.response?.status === 400) {
                errorMessage = error.response.data?.message || "Bad request.";
            }

            showMessage({
                type: "danger",
                message:errorMessage,
                icon: "danger"
            });
        } finally {
            setIsLoading(false);  // Hide loading indicator
        }
    };




    const openMenu = (item, event) => {
        setSelectedItem(item);
        setModalPosition({
            top: event.nativeEvent.pageY + 5,
            left: event.nativeEvent.pageX - 150,
        });
        setModalVisible(true);
    };


    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <Pressable style={styles.cardData}>
                    <TouchableOpacity onPress={() => openImageViewer(item.photoUrl)}>
                        <Image
                            source={item.photoUrl ? { uri: item.photoUrl } : require('../../Images/NoImage.png')}
                            style={styles.image}
                        />
                    </TouchableOpacity>

                    {selectedImage === item.photoUrl && (
                        <ImageViewing
                            images={[{ uri: selectedImage }]}
                            imageIndex={0}
                            visible={isImageVisible}
                            onRequestClose={() => setImageVisible(false)}
                        />
                    )}

                    <View style={styles.leftContainer}>
                        <Text style={styles.title}>{item.committeeTitle}</Text>
                        <Text style={styles.Nametext}>President - {item.presidentName}</Text>
                        <View style={styles.CityArea}>
                            <Text style={styles.text}>{item.city}</Text>
                            <Text style={styles.text}>{item.subCaste}</Text>
                        </View>
                        <Text style={styles.text}>{item.area}</Text>
                    </View>

                    <TouchableOpacity onPress={(event) => openMenu(item, event)}>
                        <MaterialIcons name="more-vert" size={24} color={Colors.black} />
                    </TouchableOpacity>
                </Pressable>

                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <TouchableOpacity
                        style={styles.modalOverlay1}
                        onPress={() => setModalVisible(false)}
                    >
                        <View style={[styles.modalContent1, { top: modalPosition.top, left: modalPosition.left }]}>
                            {/* Update Option */}
                            <TouchableOpacity
                                style={styles.modalOption1}
                                onPress={() => {
                                    setModalVisible(false);
                                    navigation.navigate('UpdateCommittee', { committeeData: selectedItem });
                                }}
                            >
                                <Text style={styles.updateText}>Update</Text>
                            </TouchableOpacity>

                            {/* Delete Option */}
                            <TouchableOpacity
                                style={styles.modalOption}
                                onPress={async () => {
                                    try {
                                        await handleDelete(selectedItem._id);
                                        setModalVisible(false);
                                        console.log("🗑️ Committee Deleted:", selectedItem._id);
                                    } catch (error) {
                                        console.error("🚨 Error deleting committee:", error);
                                    }
                                }}
                            >
                                <Text style={[styles.deleteText, { color: 'red' }]}>Delete</Text>
                            </TouchableOpacity>

                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    };

    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>My Committees</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={committeeData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.panditListData}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No committeeData Available</Text>
                        </View>
                    }
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default MyUploadedCommittees;
