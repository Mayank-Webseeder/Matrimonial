import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import Colors from '../../utils/Colors';
import { SH, SW, SF } from '../../utils/Dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';
import ImageCropPicker from 'react-native-image-crop-picker';
import { CityData, subCasteOptions } from '../../DummyData/DropdownData';
import Entypo from 'react-native-vector-icons/Entypo';
import { CREATE_COMMITTEE } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { Dropdown } from 'react-native-element-dropdown';

const CommitteeSubmissionPage = ({ navigation }) => {
    const [subCasteInput, setSubCasteInput] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [filteredSubCaste, setFilteredSubCaste] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [CommitteeData, setCommitteeData] = useState({
        committeeTitle: '',
        presidentName: '',
        subCaste: '',
        city: '',
        area: '',
        photoUrl: '',
        mobileNo: ''
    });

    const handleInputChange = (field, value) => {
        setCommitteeData(prev => ({
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

        setCommitteeData(prevActivistData => ({
            ...prevActivistData,
            city: filteredText,
        }));
    };

    const handleCitySelect = (item) => {
        setCityInput(item);
        setCommitteeData(prevCommitteeData => ({
            ...prevCommitteeData,
            city: item,
        }));
        setFilteredCities([]);
    };

    const handleImagePick = () => {
        ImageCropPicker.openPicker({
            width: 1000,
            height: 1000,
            cropping: true,
            includeBase64: true,
            mediaType: "photo",
            compressImageQuality: 1
        })
            .then(image => {
                setCommitteeData(prev => ({
                    ...prev,
                    photoUrl: `data:${image.mime};base64,${image.data}`,
                }));
            })
            .catch(error => {
                if (error.code !== "E_PICKER_CANCELLED") {
                    console.error("Image Picking Error:", error);
                }
            });
    };

    const constructCommitteePayload = async (CommitteeData, isNew = false) => {
        const keys = [
            'committeeTitle', 'presidentName', 'subCaste', 'city', 'area', 'photoUrl', 'mobileNo'
        ];

        const payload = {};
        for (const key of keys) {
            if (CommitteeData[key] !== undefined && CommitteeData[key] !== "") {
                payload[key] = CommitteeData[key];
            } else if (isNew) {
                payload[key] = "";
            }
        }

        if (payload.dob) {
            const parsedDate = moment(payload.dob.split("T")[0], "YYYY-MM-DD", true);
            if (parsedDate.isValid()) {
                payload.dob = parsedDate.format("DD/MM/YYYY");
            } else {
                console.error("Invalid DOB format received:", payload.dob);
                throw new Error("Invalid DOB format. Expected format is DD/MM/YYYY.");
            }
        }

        if (CommitteeData?.photoUrl) {
            try {
                payload.photoUrl = await convertToBase64(CommitteeData?.photoUrl);

                console.log("Converted Base64 Image:", payload?.photoUrl);
            } catch (error) {
                console.error("Base64 Conversion Error:", error);
            }
        }

        return payload;
    };

    const validateFields = () => {
        const newErrors = {};
        if (!CommitteeData.mobileNo) {
            newErrors.mobileNo = "Mobile number is required.";
        } else if (!/^\d{10}$/.test(CommitteeData?.mobileNo)) {
            newErrors.mobileNo = "Enter a valid 10-digit mobile number.";
        }
        if (!CommitteeData.presidentName) {
            newErrors.presidentName = "presidentName is required.";
        } else if (!/^[A-Za-z\s]+$/.test(CommitteeData?.presidentName)) {
            newErrors.presidentName = "DharmspresidentName must contain only letters.";
        } else if (CommitteeData.presidentName.length > 30) {
            newErrors.presidentName = "presidentName Name cannot exceed 30 characters.";
        }
        if (!CommitteeData.committeeTitle) {
            newErrors.committeeTitle = "committeeTitle is required.";
        } else if (!/^[A-Za-z\s]+$/.test(CommitteeData?.committeeTitle)) {
            newErrors.committeeTitle = "committeeTitle must contain only letters.";
        } else if (CommitteeData?.committeeTitle.length > 30) {
            newErrors.committeeTitle = "committeeTitle Name cannot exceed 30 characters.";
        }
        if (!CommitteeData?.city?.trim()) {
            newErrors.city = "City is required.";
        }
        if (!CommitteeData?.area?.trim()) {
            newErrors.area = "area is required.";
        }
        if (!CommitteeData?.subCaste?.trim()) {
            newErrors.subCaste = "Sub caste is required.";
        }
        if (!CommitteeData?.photoUrl) {
            newErrors.photoUrl = "photoUrl is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleCommitteeSave = async () => {
        try {
            if (!validateFields()) return;
            setIsLoading(true);

            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                showMessage({ type: "danger", message: "Error", description: "Authorization token is missing.", duarion: 5000 });
                return;
            }

            const payload = await constructCommitteePayload(CommitteeData, true);
            console.log("🚀 Constructed Payload:", JSON.stringify(payload));

            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            };

            const response = await axios.post(CREATE_COMMITTEE, payload, { headers });

            console.log("✅ API Response:", JSON.stringify(response.data));

            if (response.status === 200 || response.data.status === true) {
                showMessage({
                    type: "success",
                    message: "Committee Created Successfully",
                    description: response.data.message || "Your committee profile has been saved!",
                    duarion: 7000,
                    icon: "success",
                });
                navigation.navigate("Committee");
            } else {
                showMessage({
                    type: "danger",
                    message: "Error",
                    description: response.data?.message || "Failed to save committee.",
                    icon: "danger",
                    duarion: 9000
                });
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error("Error fetching biodata:", errorMsg);
            showMessage({ type: "danger", message: "Error", description: errorMsg, icon: "danger", duarion: 5000 });

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
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons
                            name="arrow-back-ios-new"
                            size={25}
                            color={Colors.theme_color}
                        />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Committee</Text>
                </View>
            </View>
            <ScrollView style={Globalstyles.form}>
                <Text style={styles.title}>Upload Committee Details</Text>

                <Text style={Globalstyles.title}>Committee title <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={[
                        Globalstyles.input,
                        errors.committeeTitle && styles.errorInput,
                    ]}
                    placeholder="Enter title"
                    value={CommitteeData.committeeTitle}
                    autoComplete="off"
                    textContentType="committeeTitle"
                    importantForAutofill="no"
                    autoCorrect={false}
                    onChangeText={(text) => {
                        setCommitteeData((prev) => ({ ...prev, committeeTitle: text }));
                    }}
                    placeholderTextColor={Colors.gray}
                />

                {errors.committeeTitle && (
                    <Text style={styles.errorText}>{errors.committeeTitle}</Text>
                )}

                {/* Dharamsala Name */}
                <Text style={Globalstyles.title}>Committee President Name <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={[
                        Globalstyles.input,
                        errors.presidentName && styles.errorInput,
                    ]}
                    placeholder="Enter President Name"
                    value={CommitteeData?.presidentName}
                    onChangeText={(text) => {
                        const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
                        setCommitteeData((prev) => ({ ...prev, presidentName: filteredText }));
                    }}
                    placeholderTextColor={Colors.gray}
                    autoComplete="off"
                    textContentType="presidentName"
                    importantForAutofill="no"
                    autoCorrect={false}
                />

                {errors.presidentName && (
                    <Text style={styles.errorText}>{errors.presidentName}</Text>
                )}

                <Text style={Globalstyles.title}>Sub-Caste <Entypo name={'star'} color={'red'} size={12} /></Text>

                <Dropdown
                    style={[
                        Globalstyles.input,
                        errors.subCaste && styles.errorInput,
                    ]}
                    data={subCasteOptions}
                    labelField="label"
                    valueField="value"
                    value={CommitteeData?.subCaste}
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
                    value={CommitteeData?.city}
                    onChangeText={handleCityInputChange}
                    placeholder="Enter your city"
                    placeholderTextColor={Colors.gray}
                    autoComplete="off"
                    textContentType="city"
                    importantForAutofill="no"
                    autoCorrect={false}
                />
                {errors.city && (
                    <Text style={styles.errorText}>{errors.city}</Text>
                )}
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
                    style={[
                        Globalstyles.input,
                        errors.area && styles.errorInput,
                    ]}
                    placeholder="Enter Your Area"
                    value={CommitteeData?.area} onChangeText={(text) => setCommitteeData((prev) => ({ ...prev, area: text }))}
                    placeholderTextColor={Colors.gray}
                    autoComplete="off"
                    textContentType="area"
                    importantForAutofill="no"
                    autoCorrect={false}
                />
                {errors.area && (
                    <Text style={styles.errorText}>{errors.area}</Text>
                )}

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: SH(10) }}>
                    <Text style={Globalstyles.title}>Upload President Image <Entypo name={'star'} color={'red'} size={12} /></Text>
                    <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
                        <Text style={styles.uploadButtonText}>{CommitteeData.photoUrl ? "Change Image" : "Upload Image"}</Text>
                    </TouchableOpacity>
                </View>
                {CommitteeData.photoUrl ? (
                    <Image
                        source={{ uri: CommitteeData?.photoUrl }}
                        style={styles.imagePreviewContainer}
                    />
                ) : null}

                {errors.photoUrl && (
                    <Text style={styles.errorText}>{errors.photoUrl}</Text>
                )}

                <Text style={Globalstyles.title}>Contact Number Of President <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={[
                        Globalstyles.input,
                        errors.mobileNo && styles.errorInput,
                    ]}
                    placeholder="Enter contact number"
                    keyboardType="numeric"
                    maxLength={10}
                    placeholderTextColor={Colors.gray}
                    autoComplete="off"
                    textContentType="mobileNo"
                    importantForAutofill="no"
                    autoCorrect={false}
                    value={CommitteeData?.mobileNo} onChangeText={(text) => setCommitteeData((prev) => ({ ...prev, mobileNo: text.replace(/[^0-9]/g, '') }))}
                />

                {errors.mobileNo && (
                    <Text style={styles.errorText}>{errors.mobileNo}</Text>
                )}
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleCommitteeSave}
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
        paddingLeft: 0,
    },
    headerText: {
        color: Colors.theme_color,
        fontSize: SF(15),
        fontFamily: "Poppins-Regular",
    },
    title: {
        fontSize: SF(15),
        fontFamily: "Poppins-Medium",
        color: Colors.theme_color,
        marginBottom: SH(20),
    },
    label: {
        fontSize: SF(13),
        fontFamily: "Poppins-Medium",
        color: Colors.dark,
        marginBottom: SH(5),
    },
    imagePreviewContainer: {
        marginVertical: SH(10),
        width: SW(70),
        height: SH(70),
        borderRadius: 10
    },
    imageName: {
        color: Colors.dark,
        fontFamily: "Poppins-Regular",
        fontSize: SF(11),
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
        fontFamily: "Poppins-Medium",
        fontSize: SF(12),
    },
    imagePreview: {
        width: '100%',
        height: SH(200),
        borderRadius: 5,
        marginBottom: SH(15),
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
        marginTop: 0,
    },
    errorInput: {
        borderColor: 'red',
        borderWidth: 1,
    },
});

export default CommitteeSubmissionPage;
