import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import Colors from '../../utils/Colors';
import { SH, SW, SF } from '../../utils/Dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';
import ImageCropPicker from 'react-native-image-crop-picker';
import { CityData, subCasteOptions } from '../../DummyData/DropdownData';
import Entypo from 'react-native-vector-icons/Entypo';
import { UPDATE_DHARAMSALA } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import _ from "lodash";
import { showMessage } from 'react-native-flash-message';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';

const UpdateDharamsala = ({ navigation, route }) => {
    const { DharmshalaData } = route.params || {};
    const [cityInput, setCityInput] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [DharamsalaData, setDharamsalaData] = useState({
        dharmshalaName: '',
        subCaste: '',
        city: '',
        description: '',
        images: [],
        mobileNo: ''
    });

    useEffect(() => {
        DharmshalaData
        if (DharmshalaData) {
            setDharamsalaData(prev => ({
                ...prev,
                dharmshalaName: DharmshalaData?.dharmshalaName || '',
                description: DharmshalaData?.description || '',
                subCaste: DharmshalaData?.subCaste || '',
                city: DharmshalaData?.city || '',
                images: DharmshalaData?.images || [],
                mobileNo: DharmshalaData?.mobileNo || ''
            }));

            if (DharmshalaData.photoUrl) {
                convertToBase64(DharmshalaData?.photoUrl).then(base64Image => {
                    if (base64Image) {
                        setDharamsalaData(prev => ({ ...prev, photoUrl: base64Image }));
                    }
                });
            }
        }
    }, [DharmshalaData]);


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

    const handleInputChange = (field, value) => {
        setDharamsalaData(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleImageUpload = () => {
        ImageCropPicker.openPicker({
            multiple: true,
            cropping: true,
            width: 1000,
            height: 1000,
            compressImageQuality: 1,
            mediaType: "photo"
        })
            .then((images) => {
                if (images.length > 4) {
                    alert("You can only upload up to 4 Dharamsala photos.");
                    return;
                }

                // Purani images hatane ke liye sirf nayi images set karenge
                const newImages = images.map(img => ({ uri: img.path }));

                setDharamsalaData((prev) => ({
                    ...prev,
                    images: newImages, // Purani images hata kar sirf nayi wali rakh rahe hain
                }));
            })
            .catch((err) => {
                console.log("Crop Picker Error:", err);
            });
    };


    const convertToBase64 = async (images) => {
        try {
            console.log("Converting images to Base64:", images);

            const base64Images = await Promise.all(
                images.map(async (image) => {
                    if (!image.uri) return null;

                    try {
                        const response = await fetch(image.uri);
                        const blob = await response.blob();

                        return new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                const base64String = reader.result.split(',')[1]; // Remove prefix
                                resolve(base64String);
                            };
                            reader.readAsDataURL(blob);
                        });
                    } catch (fetchError) {
                        console.error("Error fetching image for Base64 conversion:", fetchError);
                        return null;
                    }
                })
            );

            return base64Images.filter(Boolean); // Remove null values
        } catch (error) {
            console.error("Error converting image to Base64:", error);
            return [];
        }
    };


    const constructDharamsalaPayload = async (DharamsalaData) => {
        try {
            console.log("Constructing payload with data:", DharamsalaData);

            const payload = { ...DharamsalaData };

            if (DharamsalaData.images.length > 0) {
                console.log("Processing images for payload...");

                // Separate existing Cloudinary images (URLs), Base64 images, and new images
                const existingUrls = DharamsalaData.images.filter(img => typeof img === "string" && img.startsWith("http"));
                const existingBase64Images = DharamsalaData.images.filter(img => typeof img === "string" && img.startsWith("data:image/"));
                const newImages = DharamsalaData.images.filter(img => img.uri); // New images to convert

                console.log("Existing URLs:", existingUrls);
                console.log("Existing Base64 Images:", existingBase64Images);
                console.log("New images to convert:", newImages);

                let base64Images = await convertToBase64(newImages);

                // Convert existing Cloudinary URLs to Base64 (if required by API)
                let cloudinaryBase64 = await convertToBase64(existingUrls.map(url => ({ uri: url })));

                // Merge all images
                payload.images = [...existingBase64Images, ...base64Images, ...cloudinaryBase64];

                console.log("Final images for payload:", payload.images);
            }

            return payload;
        } catch (error) {
            console.error("Error in constructDharamsalaPayload:", error);
            return {};
        }
    };



    const handleUpdateDharamSala = async () => {
        setIsLoading(true);

        try {
            console.log("Fetching user token...");
            const token = await AsyncStorage.getItem("userToken");

            if (!token) {
                showMessage({
                    type: "danger",
                    message: "Authorization Error",
                    description: "Token is missing! Please login again.",
                    duarion: 5000
                });
                setIsLoading(false);
                return;
            }

            console.log("Token found, constructing payload...");
            const updatedData = await constructDharamsalaPayload(DharamsalaData);
            console.log("Payload to be sent:", updatedData); // Debugging

            console.log(`Sending PATCH request to ${UPDATE_DHARAMSALA}/${DharmshalaData._id}`);
            const response = await axios.patch(
                `${UPDATE_DHARAMSALA}/${DharmshalaData._id}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Response from API:", response.data);

            showMessage({
                type: "success",
                message: "Success",
                description: "Dharamsala Updated Successfully! 🎉",
                icon: "success",
                duarion: 5000
            });

            setTimeout(() => {
                navigation.navigate('MainApp', {
                    screen: 'Dharmshala',
                });
            }, 1000);
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error("Error fetching biodata:", errorMsg);
            showMessage({
                type: "danger",
                message: "Update Failed",
                description: errorMsg,
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
                    <TouchableOpacity>
                        <MaterialIcons
                            name="arrow-back-ios-new"
                            size={25}
                            color={Colors.theme_color}
                        />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Dharmshala</Text>
                </View>

            </View>
            <View style={Globalstyles.form}>
                <Text style={styles.title}>Upload Your Dharamsala Details</Text>

                <Text style={Globalstyles.title}>Dharamsala Name <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter Dharamsala Name"
                    value={DharamsalaData.dharmshalaName}
                    onChangeText={(text) => setDharamsalaData((prev) => ({ ...prev, dharmshalaName: text }))}
                    placeholderTextColor={Colors.gray}
                    autoComplete="off"
                    textContentType="dharmshalaName"
                    importantForAutofill="no"
                    autoCorrect={false}
                />

                <Text style={Globalstyles.title}>Sub-Caste Name <Entypo name={'star'} color={'red'} size={12} /></Text>
                <Dropdown
                    style={[
                        Globalstyles.input,
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

                <Text style={Globalstyles.title}>City <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    value={DharamsalaData?.city}
                    onChangeText={handleCityInputChange}
                    placeholder="Enter your city"
                    placeholderTextColor={Colors.gray}
                    autoComplete="off"
                    textContentType="city"
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

                <Text style={Globalstyles.title}>Contact <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter Person's Contact No."
                    keyboardType='phone-pad'
                    maxLength={10}
                    placeholderTextColor={Colors.gray}
                    value={DharamsalaData.mobileNo} onChangeText={(text) => setDharamsalaData((prev) => ({ ...prev, mobileNo: text }))}
                    autoComplete="off"
                    textContentType="mobileNo"
                    importantForAutofill="no"
                    autoCorrect={false}
                />

                <Text style={Globalstyles.title}>Description (Optional)</Text>
                <TextInput
                    style={[Globalstyles.input, styles.textArea]}
                    placeholder="Enter Description"
                    placeholderTextColor={Colors.gray}
                    value={DharamsalaData.description} onChangeText={(text) => setDharamsalaData((prev) => ({ ...prev, description: text }))}
                    multiline={true}
                    autoComplete="off"
                    textContentType="description"
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

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleUpdateDharamSala}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size="large" color={Colors.light} />
                    ) : (
                        <Text style={styles.submitButtonText}>Submit</Text>
                    )}
                </TouchableOpacity>
            </View>
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
    }
});

export default UpdateDharamsala;
