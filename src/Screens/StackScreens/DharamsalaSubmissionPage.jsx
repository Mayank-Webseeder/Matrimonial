import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import Colors from '../../utils/Colors';
import { SH, SW, SF } from '../../utils/Dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';
import ImageCropPicker from 'react-native-image-crop-picker';
import { CityData, subCasteOptions } from '../../DummyData/DropdownData';
import Entypo from 'react-native-vector-icons/Entypo';
import { CREATE_DHARAMSALA} from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import _ from "lodash";
import { showMessage } from 'react-native-flash-message';

const DharamsalaSubmissionPage = ({ navigation }) => {
    const [subCasteInput, setSubCasteInput] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [filteredSubCaste, setFilteredSubCaste] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedSubCaste, setSelectedSubCaste] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [DharamsalaData, setDharamsalaData] = useState({
        dharmshalaName: '',
        subCaste: '',
        city: '',
        description: '',
        images: [],  // ✅ Ensure images is an array
        mobileNo: ''
    });

    const showToast = _.debounce((type, message, description, icon) => {
        showMessage({
            type,
            message,
            description,
            visibilityTime: 1000,
            icon
        });
    }, 500);

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

        setDharamsalaData(prevDharamsalaData => ({
            ...prevDharamsalaData,
            city: text,
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
        setDharamsalaData((prevDharamsalaData) => ({
            ...prevDharamsalaData,
            subCaste: text,
        }));
    };

    const handleSubCasteSelect = (selectedItem) => {
        setSubCasteInput(selectedItem);
        setFilteredSubCaste([]);
        setDharamsalaData((prevDharamsalaData) => ({
            ...prevDharamsalaData,
            subCaste: selectedItem,
        }));
    };

    const handleImageUpload = () => {
        ImageCropPicker.openPicker({
            multiple: true,
            cropping: true,
            width: 400,
            height: 400,
            compressImageQuality: 1,
            mediaType: "photo"
        })
            .then((images) => {
                if (images.length > 4) {
                    alert("You can only upload up to 4 Dharamsala photos.");
                    return;
                }
                setDharamsalaData((prev) => ({
                    ...prev,
                    images: images.map(img => ({ uri: img.path })),
                }));
            })
            .catch((err) => {
                console.log("Crop Picker Error:", err);
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

    const handleCreateDharamSala = async () => {
        try {
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
                navigation.navigate("Dharmshala");
            } else {
                throw new Error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("API Error:", error?.response ? JSON.stringify(error.response.data) : error.message);

            let errorMessage = "Failed to create Dharamsala.";
            if (error.response?.status === 400) {
                errorMessage = error.response?.data?.message || "Bad request. Please check your input.";
            }

            showToast("danger", "Error", errorMessage, "danger");
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
                    textContentType="none"
                />

                <Text style={Globalstyles.title}>Sub-Caste Name <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    value={DharamsalaData?.subCaste} // `myBiodata?.subCaste` ki jagah `subCasteInput` use karein
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
                    value={DharamsalaData?.city}
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

                <Text style={Globalstyles.title}>Contact <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter Person's Contact No."
                    keyboardType="numeric"
                    maxLength={10}
                    placeholderTextColor={Colors.gray}
                    value={DharamsalaData.mobileNo} onChangeText={(text) => setDharamsalaData((prev) => ({ ...prev, mobileNo: text }))}
                    autoComplete="off"
                    textContentType="none"
                />

                <Text style={Globalstyles.title}>Description (Optional)</Text>
                <TextInput
                    style={[Globalstyles.input, styles.textArea]}
                    placeholder="Enter Description"
                    placeholderTextColor={Colors.gray}
                    value={DharamsalaData.description} onChangeText={(text) => setDharamsalaData((prev) => ({ ...prev, description: text }))}
                    multiline={true}
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
                    onPress={handleCreateDharamSala}
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

export default DharamsalaSubmissionPage;
