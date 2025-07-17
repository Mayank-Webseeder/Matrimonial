import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import Colors from '../../utils/Colors';
import { SH, SW, SF } from '../../utils/Dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';
import ImageCropPicker from 'react-native-image-crop-picker';
import { CityData, subCasteOptions } from '../../DummyData/DropdownData';
import Entypo from 'react-native-vector-icons/Entypo';
import { CREATE_DHARAMSALA } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import _ from "lodash";
import { showMessage } from 'react-native-flash-message';
import { launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { duration } from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';

const DharamsalaSubmissionPage = ({ navigation }) => {
    const [cityInput, setCityInput] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const [DharamsalaData, setDharamsalaData] = useState({
        dharmshalaName: '',
        subCaste: '',
        city: '',
        description: '',
        images: [],
        mobileNo: ''
    });

    const showToast = _.debounce((type, message, description, icon) => {
        showMessage({
            type,
            message,
            description,
            duarion: 7000,
            icon
        });
    }, 7000);


    const handleInputChange = (field, value) => {
        setDharamsalaData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleCityInputChange = (text) => {
        const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
        setCityInput(filteredText);
        if (filteredText) {
            const filtered = CityData.filter((item) =>
                item?.label?.toLowerCase().includes(text.toLowerCase())
            ).map(item => item.label);
            setFilteredCities(filtered);
        } else {
            setFilteredCities([]);
        }

        setDharamsalaData(prevDharamsalaData => ({
            ...prevDharamsalaData,
            city: filteredText,
        }));
    };

    const handleCitySelect = (item) => {
        setCityInput(item);
        setDharamsalaData(prevDharamsalaData => ({
            ...prevDharamsalaData,
            city: item,
        }));
        setFilteredCities([]);
    };

    const pickerOptions = {
        selectionLimit: 4,     // 🔒 hard cap at 4
        mediaType: 'photo',
        includeBase64: false,  // you only need file‑URIs
        maxWidth: 1000,         // resize so you don’t need in‑picker cropping
        maxHeight: 1000,
        quality: 1,
    };

    // const handleImageUpload = () => {
    //     ImageCropPicker.openPicker({
    //         multiple: true,
    //         cropping: true,
    //         width: 400,
    //         height: 400,
    //         compressImageQuality: 1,
    //         mediaType: "photo",
    //         maxLength:5
    //     })
    //         .then((images) => {
    //             if (images.length > 4) {
    //                 alert("You can only upload up to 4 Dharamsala photos.");
    //                 return;
    //             }
    //             setDharamsalaData((prev) => ({
    //                 ...prev,
    //                 images: images.map(img => ({ uri: img.path })),
    //             }));
    //         })
    //         .catch((err) => {
    //             console.log("Crop Picker Error:", err);
    //         });
    // };


    const handleImageUpload = () => {
        launchImageLibrary(pickerOptions, (response) => {
            if (response.didCancel) return;
            if (response.errorCode) {
                console.log('ImagePicker Error:', response.errorMessage);
                return;
            }
            const images = response.assets ?? [];

            setDharamsalaData((prev) => ({
                ...prev,
                images: images.map((img) => ({ uri: img.uri })),
            }));
        });
    };


    const convertToBase64 = async (images) => {
        try {
            const base64Images = await Promise.all(
                images.map(async (image) => {
                    if (!image.uri) return null;

                    const response = await fetch(image.uri);
                    const blob = await response.blob();

                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.readAsDataURL(blob);
                    });
                })
            );

            return base64Images.filter(Boolean); // Remove any null values
        } catch (error) {
            console.error("Error converting image to Base64:", error);
            return [];
        }
    };

    const constructDharamsalaPayload = async (DharamsalaData, isNew = false) => {
        const keys = ["dharmshalaName", "subCaste", "city", "description", "images", "mobileNo"];
        const payload = {};

        for (const key of keys) {
            if (DharamsalaData[key] !== undefined && DharamsalaData[key] !== "") {
                payload[key] = DharamsalaData[key];
            } else if (isNew) {
                payload[key] = "";
            }
        }

        if (DharamsalaData.images.length > 0) {
            payload.images = await convertToBase64(DharamsalaData.images);
            console.log("Converted Base64 Images:", payload.images);
        }

        return payload;
    };

    const validateFields = () => {
        const newErrors = {};
        if (!DharamsalaData.mobileNo) {
            newErrors.mobileNo = "Mobile number is required.";
        } else if (!/^\d{10}$/.test(DharamsalaData.mobileNo)) {
            newErrors.mobileNo = "Enter a valid 10-digit mobile number.";
        }
        if (!DharamsalaData.dharmshalaName) {
            newErrors.dharmshalaName = "Dharmshala Name is required.";
        } else if (!/^[A-Za-z\s]+$/.test(DharamsalaData.dharmshalaName)) {
            newErrors.dharmshalaName = "Dharmshala Name must contain only letters.";
        } else if (DharamsalaData.dharmshalaName.length > 50) {
            newErrors.dharmshalaName = "Dharmshala Name cannot exceed 50 characters.";
        }
        if (!DharamsalaData.city?.trim()) {
            newErrors.city = "City is required.";
        }
        if (!DharamsalaData.subCaste?.trim()) {
            newErrors.subCaste = "Sub caste is required.";
        }
        if (!DharamsalaData.images || DharamsalaData.images.length === 0) {
            newErrors.images = "At least one image is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleCreateDharamSala = async () => {
        try {
            if (!validateFields()) return;
            setIsLoading(true);
            const token = await AsyncStorage.getItem("userToken");

            if (!token) {
                showToast("danger", "Error", "Authorization token is missing.");
                return;
            }

            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            const payload = await constructDharamsalaPayload(DharamsalaData);
            console.log("Payload:", payload);

            const response = await axios.post(CREATE_DHARAMSALA, payload, { headers });
            console.log("Dharamsala create response:", JSON.stringify(response.data));

            if (response.status === 200 && response.data.status === true) {
                console.log("Created Data:", JSON.stringify(response.data.data));

                showToast(
                    "success",
                    "Dharamsala Created Successfully",
                    response.data.message || "Your changes have been saved!",
                    "success"
                );
                navigation.navigate('MainApp', {
                    screen: 'Dharmshala',
                });
            } else {
                throw new Error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message; c
            console.error("Error fetching biodata:", errorMsg);
            showToast("danger", "Error", errorMsg, "danger");
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity c>
                        <MaterialIcons
                            name="arrow-back-ios-new"
                            size={25}
                            color={Colors.theme_color}
                        />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Dharmshala</Text>
                </View>

            </View>
            <ScrollView style={Globalstyles.form} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>Upload Your Dharamsala Details</Text>

                <Text style={Globalstyles.title}>
                    Dharamsala Name <Entypo name={'star'} color={'red'} size={12} />
                </Text>
                <TextInput
                    style={[
                        Globalstyles.input,
                        errors.dharmshalaName && styles.errorInput,
                    ]}
                    placeholder="Enter Dharamsala Name"
                    value={DharamsalaData?.dharmshalaName}
                    onChangeText={(text) => {
                        setDharamsalaData((prev) => ({ ...prev, dharmshalaName: text }));
                    }}
                    placeholderTextColor={Colors.gray}
                    autoComplete="off"
                    textContentType="none"
                    importantForAutofill="no"
                    autoCorrect={false}
                />

                {errors.dharmshalaName && (
                    <Text style={styles.errorText}>{errors.dharmshalaName}</Text>
                )}

                <Text style={Globalstyles.title}>Sub-Caste Name <Entypo name={'star'} color={'red'} size={12} /></Text>
                <Dropdown
                    style={[
                        Globalstyles.input,
                        errors.subCaste && styles.errorInput,
                    ]}
                    data={subCasteOptions}
                    labelField="label"
                    valueField="value"
                    value={DharamsalaData?.subCaste}
                    onChange={(text) => handleInputChange("subCaste", text.value)}
                    placeholder="Select Your subCaste"
                    placeholderStyle={{ color: '#E7E7E7' }}
                    autoScroll={false}
                    showsVerticalScrollIndicator={false}
                />

                {errors.subCaste && (
                    <Text style={styles.errorText}>{errors.subCaste}</Text>
                )}

                <Text style={Globalstyles.title}>City <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={[
                        Globalstyles.input,
                        errors.city && styles.errorInput,
                    ]}
                    value={DharamsalaData?.city}
                    onChangeText={handleCityInputChange}
                    placeholder="Enter your city"
                    placeholderTextColor={Colors.gray}
                    autoComplete="off"
                    textContentType="none"
                    importantForAutofill="no"
                    autoCorrect={false}
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
                {errors.city && (
                    <Text style={styles.errorText}>{errors.city}</Text>
                )}

                <Text style={Globalstyles.title}>Contact <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={[
                        Globalstyles.input,
                        errors.mobileNo && styles.errorInput,
                    ]}
                    placeholder="Enter contact number"
                    keyboardType="phone-pad"
                    maxLength={10}
                    placeholderTextColor={Colors.gray}
                    value={DharamsalaData?.mobileNo} onChangeText={(text) => setDharamsalaData((prev) => ({ ...prev, mobileNo: text.replace(/[^0-9]/g, '') }))}
                    autoComplete="off" importantForAutofill="no"
                    autoCorrect={false}
                    textContentType="none"

                />
                {errors.mobileNo && (
                    <Text style={styles.errorText}>{errors.mobileNo}</Text>
                )}

                <Text style={Globalstyles.title}>Description</Text>
                <TextInput
                    style={[
                        Globalstyles.input, styles.textArea
                    ]}
                    placeholder="Enter Description"
                    placeholderTextColor={Colors.gray}
                    value={DharamsalaData.description} onChangeText={(text) => setDharamsalaData((prev) => ({ ...prev, description: text }))}
                    multiline={true}
                    autoComplete="off"
                    textContentType="none"
                    importantForAutofill="no"
                    autoCorrect={false}
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={Globalstyles.title}>
                        Upload Images (Max Limit 4) <Entypo name={"star"} color={"red"} size={12} />
                    </Text>
                    <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
                        <Text style={styles.uploadButtonText}>
                            {DharamsalaData.images?.length > 0 ? "Change Image" : "Upload Image"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {DharamsalaData.images?.length > 0 && (
                    <View style={styles.imagePreview}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {DharamsalaData.images.map((photo, index) => (
                                <Image key={index} source={{ uri: photo?.uri || photo }} style={styles.photo} />
                            ))}
                        </ScrollView>
                    </View>
                )}

                {errors.images && (
                    <Text style={styles.errorText}>{errors.images}</Text>
                )}

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleCreateDharamSala}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="large" color={Colors.light} />
                    ) : (
                        <Text style={styles.submitButtonText}>Submit</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        fontSize: SF(13),
        fontFamily: "Poppins-Regular"
    },
    title: {
        fontSize: SF(15),
        fontFamily: "Poppins-Medium",
        color: Colors.theme_color,
        marginBottom: SH(20),

    },

    textArea: {
        height: SH(100),
        textAlignVertical: 'top',
    },
    uploadButton: {
        backgroundColor: Colors.theme_color,
        paddingVertical: SW(5),
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: SW(7)
    },
    uploadButtonText: {
        color: Colors.light,
        fontFamily: "poppins-Medium",
        fontSize: SF(13)
    },
    imagePreview: {
        width: '100%',
        // height: SH(50),
        borderRadius: 5,
        marginBottom: SH(15),
    },
    photo: {
        width: SW(70),
        height: SH(70),
        marginHorizontal: SW(5),
        marginVertical: SH(5),
        borderRadius: 10,
    },
    submitButton: {
        backgroundColor: Colors.theme_color,
        paddingVertical: SH(5),
        borderRadius: 5,
        alignItems: 'center',
        marginTop: SH(20),
        marginBottom: SH(80)
    },
    submitButtonText: {
        color: Colors.light,
        fontSize: SF(15),
        fontWeight: 'Poppins-Bold',
        textTransform: "capitalize"
    },
    contentContainer: {
        margin: SW(15),
        marginTop: 0
    },
    errorInput: {
        borderColor: 'red',
        borderWidth: 1,
    },
});

export default DharamsalaSubmissionPage;
