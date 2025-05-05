import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, StatusBar, ActivityIndicator, FlatList } from 'react-native';
import Colors from '../../utils/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Globalstyles from '../../utils/GlobalCss';
import ImageCropPicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { SH, SW, SF } from '../../utils/Dimensions';
import { UPDATE_COMMITTEE } from '../../utils/BaseUrl';
import { CityData, subCasteOptions } from '../../DummyData/DropdownData';
import { showMessage } from 'react-native-flash-message';

const UpdateCommittee = ({ navigation, route }) => {
    const { committeeData } = route.params;
    const [subCasteInput, setSubCasteInput] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [filteredSubCaste, setFilteredSubCaste] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedSubCaste, setSelectedSubCaste] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [CommitteeData, setCommitteeData] = useState({
        committeeTitle: '',
        presidentName: '',
        subCaste: '',
        city: '',
        area: '',
        photoUrl: '',
        mobileNo: ''
    });

    const handleCityInputChange = (text) => {
        setCityInput(text);
        if (text) {
            const filtered = CityData.filter((item) =>
                item?.label?.toLowerCase().includes(text.toLowerCase())
            ).map(item => item.label);
            setFilteredCities(filtered);
        } else {
            setFilteredCities([]);
        }

        setCommitteeData(prevDharamsalaData => ({
            ...prevDharamsalaData,
            city: text,
        }));
    };

    const handleCitySelect = (item) => {
        setCityInput(item);
        setCommitteeData(prevDharamsalaData => ({
            ...prevDharamsalaData,
            city: item,
        }));
        setFilteredCities([]);
    };

    const handleSubCasteInputChange = (text) => {
        setSubCasteInput(text);

        if (text) {
            const filtered = subCasteOptions
                .filter((item) => item?.label?.toLowerCase().includes(text.toLowerCase()))
                .map((item) => item.label);

            setFilteredSubCaste(filtered);
        } else {
            setFilteredSubCaste([]);
        }
        setCommitteeData((prevDharamsalaData) => ({
            ...prevDharamsalaData,
            subCaste: text,
        }));
    };

    const handleSubCasteSelect = (selectedItem) => {
        setSubCasteInput(selectedItem);
        setFilteredSubCaste([]);
        setCommitteeData((prevDharamsalaData) => ({
            ...prevDharamsalaData,
            subCaste: selectedItem,
        }));
    };


    // Function to Convert Image to Base64
    const convertToBase64 = async (imageUri) => {
        try {
            if (!imageUri) return null;
            if (imageUri.startsWith("data:image")) {
                return imageUri;
            }

            const response = await fetch(imageUri);
            const blob = await response.blob();
            const mimeType = blob.type || "image/jpeg";

            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result) {
                        resolve(`data:${mimeType};base64,${reader.result.split(",")[1]}`);
                    } else {
                        reject("Error reading Base64 data.");
                    }
                };
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error("Error converting image to Base64:", error);
            return null;
        }
    };

    // Load Data & Convert Image if Available
    useEffect(() => {
        if (committeeData) {
            setCommitteeData(prev => ({
                ...prev,
                committeeTitle: committeeData?.committeeTitle || '',
                presidentName: committeeData?.presidentName || '',
                subCaste: committeeData?.subCaste || '',
                city: committeeData?.city || '',
                area: committeeData?.area || '',
                mobileNo: committeeData?.mobileNo || ''
            }));

            // Convert Existing Image to Base64
            if (committeeData.photoUrl) {
                convertToBase64(committeeData?.photoUrl).then(base64Image => {
                    if (base64Image) {
                        setCommitteeData(prev => ({ ...prev, photoUrl: base64Image }));
                    }
                });
            }
        }
    }, [committeeData]);

    // Handle Image Selection
    const handleImagePick = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 250,
            cropping: true,
            includeBase64: true,
            mediaType: "photo",
            compressImageQuality: 1
        })
            .then(image => {
                const base64Image = `data:${image.mime};base64,${image.data}`;
                setCommitteeData(prev => ({ ...prev, photoUrl: base64Image }));
                console.log("Base64 Image Selected:", base64Image);
            })
            .catch(error => {
                if (error.code !== "E_PICKER_CANCELLED") {
                    console.error("Image Picking Error:", error);
                }
            });
    };

    const handleCommitteeUpdate = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                showMessage({ type: "danger", message: "Authorization token is missing." });
                return;
            }
            if (!CommitteeData.photoUrl.startsWith("data:image/")) {
                showMessage({ type: "error", message: "Please select an image first." });
                return;
            }
            const apiUrl = `${UPDATE_COMMITTEE}/${committeeData._id}`;
            console.log("API URL being hit:", apiUrl);
            console.log("Payload being sent:", JSON.stringify(CommitteeData, null, 2));

            const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
            const response = await axios.patch(apiUrl, CommitteeData, { headers });

            if (response.status === 200) {
                console.log("response", JSON.stringify(response.data));
                showMessage({ type: "success", message: "Committee Updated Successfully", icon: "success" });
                navigation.reset({ index: 0, routes: [{ name: "Committee" }] });
            }
        } catch (error) {
            console.error("API Error:", error.response?.data || error);
            showMessage({ type: "danger", message: "Failed to update committee.", icon: "danger" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Update Committees</Text>
                </View>
            </View>
            <ScrollView style={Globalstyles.form}>
                <Text style={styles.title}>Update Committee Details</Text>

                <Text style={Globalstyles.title}>Committee title <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter title"
                    value={CommitteeData?.committeeTitle}
                    autoComplete="off"
                    textContentType="none"
                    onChangeText={(text) => setCommitteeData((prev) => ({ ...prev, committeeTitle: text }))} placeholderTextColor={Colors.gray}
                />

                {/* Dharamsala Name */}
                <Text style={Globalstyles.title}>Committee President Name <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter President Name"
                    value={CommitteeData?.presidentName}
                    onChangeText={(text) => setCommitteeData((prev) => ({ ...prev, presidentName: text }))}
                    placeholderTextColor={Colors.gray}
                    autoComplete="off"
                    textContentType="none"
                />

                <Text style={Globalstyles.title}>Sub-Caste <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    value={CommitteeData?.subCaste} // `myBiodata?.subCaste` ki jagah `subCasteInput` use karein
                    onChangeText={handleSubCasteInputChange}
                    placeholder="Type your sub caste"
                    placeholderTextColor={Colors.gray}
                    autoComplete="off"
                    textContentType="none"
                />

                {/* Agar user type karega toh list dikhegi */}
                {filteredSubCaste.length > 0 ? (
                    <FlatList
                        data={filteredSubCaste.slice(0, 5)}
                        scrollEnabled={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSubCasteSelect(item)}>
                                <Text style={Globalstyles.listItem}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        style={Globalstyles.suggestions}
                    />
                ) : null}


                <Text style={Globalstyles.title}>City <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    value={CommitteeData?.city}
                    onChangeText={handleCityInputChange}
                    placeholder="Enter your city"
                    placeholderTextColor={Colors.gray}
                    autoComplete="off"
                    textContentType="none"
                />
                {filteredCities.length > 0 && cityInput ? (
                    <FlatList
                        data={filteredCities.slice(0, 5)}
                        scrollEnabled={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleCitySelect(item)}>
                                <Text style={Globalstyles.listItem}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        style={Globalstyles.suggestions}
                    />
                ) : null}

                <Text style={Globalstyles.title}>Area <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter Your Area"
                    value={CommitteeData?.area} onChangeText={(text) => setCommitteeData((prev) => ({ ...prev, area: text }))}
                    placeholderTextColor={Colors.gray}
                    autoComplete="off"
                    textContentType="none"
                />

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: SH(10) }}>
                    <Text style={Globalstyles.title}>Upload President Image <Entypo name={'star'} color={'red'} size={12} /></Text>
                    <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
                        <Text style={styles.uploadButtonText}>{CommitteeData.photoUrl ? "Change Image" : "Upload Image"}</Text>
                    </TouchableOpacity>
                </View>
                {CommitteeData?.photoUrl ? (
                    <Image
                        source={{ uri: CommitteeData?.photoUrl }}
                        style={styles.imagePreviewContainer}
                    />
                ) : null}

                <Text style={Globalstyles.title}>Contact Number Of President <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter contact number"
                    keyboardType="numeric"
                    maxLength={10}
                    placeholderTextColor={Colors.gray}
                    autoComplete="off"
                    textContentType="none"
                    value={CommitteeData?.mobileNo} onChangeText={(text) => setCommitteeData((prev) => ({ ...prev, mobileNo: text }))}
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleCommitteeUpdate} disabled={isLoading}>
                    {isLoading ? <ActivityIndicator size="large" color={Colors.light} /> : <Text style={styles.submitButtonText}>Submit</Text>}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: SF(15),
        fontFamily: "Poppins-Medium",
        color: Colors.theme_color,
        marginBottom: SH(20),
    },
    uploadButton: { backgroundColor: Colors.theme_color, paddingHorizontal: SW(5), borderRadius: 5, alignItems: 'center', alignSelf: "flex-end" },
    uploadButtonText: { color: Colors.light, fontSize: SF(12), fontFamily: "Poppins-Medium", textAlign: "center" },
    imagePreviewContainer: { width: SW(70), height: SH(70), borderRadius: 10, marginVertical: SH(10) },
    submitButton: { backgroundColor: Colors.theme_color, paddingVertical: SH(5), borderRadius: 5, alignItems: 'center', marginTop: SH(20) },
    submitButtonText: { color: Colors.light, fontSize: SF(15), fontWeight: 'Poppins-Bold', textTransform: "capitalize" }
});

export default UpdateCommittee;
