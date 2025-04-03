import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, StatusBar, FlatList, ActivityIndicator, ToastAndroid } from 'react-native';
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
import Toast from 'react-native-toast-message';
const CommitteeSubmissionPage = ({ navigation }) => {
    const [subCasteInput, setSubCasteInput] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [filteredSubCaste, setFilteredSubCaste] = useState([]);
    const [isEditing, setIsEditing] = useState(true);
    const [isLoading,setIsLoading]=useState(false);
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

        setCommitteeData(prevActivistData => ({
            ...prevActivistData,
            city: text,
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
        setCommitteeData((prevCommitteeData) => ({
            ...prevCommitteeData,
            subCaste: text,
        }));
    };

    const handleSubCasteSelect = (selectedItem) => {
        setSubCasteInput(selectedItem);
        setFilteredSubCaste([]);
        setCommitteeData((prevCommitteeData) => ({
            ...prevCommitteeData,
            subCaste: selectedItem,
        }));
    };

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

        if (CommitteeData.photoUrl) {
            try {
                payload.photoUrl = await convertToBase64(CommitteeData.photoUrl);

                console.log("Converted Base64 Image:", payload.photoUrl);
            } catch (error) {
                console.error("Base64 Conversion Error:", error);
            }
        }

        return payload;
    };


    const handleCommitteeSave = async () => {
        try {
            setIsLoading(true);
    
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                Toast.show({ type: "error", text1: "Error", text2: "Authorization token is missing." });
                return;
            }
    
            // ✅ Construct the formatted payload before sending it to the API
            const payload = await constructCommitteePayload(CommitteeData, true);
            console.log("🚀 Constructed Payload:", JSON.stringify(payload));
    
            const headers = { 
                "Content-Type": "application/json", 
                Authorization: `Bearer ${token}` 
            };
    
            const response = await axios.post(CREATE_COMMITTEE, payload, { headers });
    
            console.log("✅ API Response:", JSON.stringify(response.data));
    
            if (response.status === 200) {
                Toast.show({ type: "success", text1: "Committee Created Successfully" });
                navigation.navigate("Committee");
            } else {
                Toast.show({ type: "error", text1: "Error", text2: response.data?.message || "Failed to save committee." });
            }
        } catch (error) {
            console.error("🚨 Error Creating Committee:", error.response?.data || error.message);
            Toast.show({ type: "error", text1: "Error", text2: "Failed to save committee data." });
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
                    style={Globalstyles.input}
                    placeholder="Enter title"
                    value={CommitteeData.committeeTitle}
                    autoComplete="off"
                    textContentType="none"
                    onChangeText={(text) => setCommitteeData((prev) => ({ ...prev, committeeTitle: text }))} placeholderTextColor={Colors.gray}
                />

                {/* Dharamsala Name */}
                <Text style={Globalstyles.title}>Committee President Name <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter President Name"
                    value={CommitteeData.presidentName}
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
                    value={CommitteeData.area} onChangeText={(text) => setCommitteeData((prev) => ({ ...prev, area: text }))}
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
                {CommitteeData.photoUrl ? (
                    <Image
                        source={{ uri: CommitteeData.photoUrl }}
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
                    value={CommitteeData.mobileNo} onChangeText={(text) => setCommitteeData((prev) => ({ ...prev, mobileNo: text }))}
                />

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
            <Toast />
        </SafeAreaView>
    );
};

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
});

export default CommitteeSubmissionPage;
