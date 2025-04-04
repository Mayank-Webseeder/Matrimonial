import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import styles from '../StyleScreens/RoleRegisterStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { Checkbox } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Globalstyles from '../../utils/GlobalCss';
import { subCasteOptions, StateData, CityData, panditServices, jyotishServices, kathavachakServices, ExperienceData } from '../../DummyData/DropdownData';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UPDATE_PANDIT, UPDATE_JYOTISH, UPDATE_KATHAVACHAK } from '../../utils/BaseUrl';
import { Dropdown } from 'react-native-element-dropdown';
import ImageCropPicker from 'react-native-image-crop-picker';
import { SH, SW } from '../../utils/Dimensions';

const UpdateProfileDetails = ({ navigation, route }) => {
    const [stateInput, setStateInput] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [subCasteInput, setSubCasteInput] = useState('');
    const [filteredStates, setFilteredStates] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [filteredSubCaste, setFilteredSubCaste] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { profileData, profileType } = route.params || {};
    console.log("profileData", profileType);


    const [RoleRegisterData, setRoleRegisterData] = useState({
        mobileNo: profileData?.mobileNo || '',
        fullName: profileData?.fullName || '',
        residentialAddress: profileData?.residentialAddress || '',
        area: profileData?.area || '',
        state: profileData?.state || '',
        city: profileData?.city || '',
        aadharNo: profileData?.aadharNo || '',
        subCaste: profileData?.subCaste || '',
        profilePhoto: profileData?.profilePhoto || '',
        additionalPhotos: profileData?.additionalPhotos || [],
        experience: profileData?.experience || '',
        description: profileData?.description || '',
        websiteUrl: profileData?.websiteUrl || '',
        facebookUrl: profileData?.facebookUrl || '',
        youtubeUrl: profileData?.youtubeUrl || '',
        instagramUrl: profileData?.instagramUrl || '',
        whatsapp: profileData?.whatsapp || ''
    });


    const servicesOptions = {
        Pandit: panditServices,
        Jyotish: jyotishServices,
        Kathavachak: kathavachakServices,
    };

    // ✅ Correct profile key dynamically
    const profileServicesKey = `${profileType.toLowerCase()}Services`;

    const [checked, setChecked] = useState({});

    useEffect(() => {
        if (!profileData || !profileType || !servicesOptions[profileType]) return;

        console.log("✅ Updating checked services...");

        const updatedChecked = {};
        servicesOptions[profileType].forEach(service => {
            const normalizedServiceValue = service.value.replace(/\s+/g, "_");

            updatedChecked[service.value] = profileData[profileServicesKey]?.includes(normalizedServiceValue);
        });

        console.log("✅ New checked state:", updatedChecked);
        setChecked(updatedChecked);
    }, [profileData]);


    const handleProfilePhotoPick = async () => {
        try {
            const image = await ImageCropPicker.openPicker({
                multiple: false,
                cropping: true,
                width: 400,
                height: 400,
                includeBase64: true,
                compressImageQuality: 1
            });

            if (!image.data) {
                console.error("Base64 data missing!");
                return;
            }

            const base64Image = `data:${image.mime};base64,${image.data}`;

            setRoleRegisterData(prevData => ({
                ...prevData,
                profilePhoto: base64Image, // ✅ Base64 photo set
            }));

        } catch (err) {
            console.log("Profile Photo Picker Error:", err);
        }
    };


    // Additional Photos Picker
    const handleAdditionalPhotosPick = async () => {
        try {
            const images = await ImageCropPicker.openPicker({
                multiple: true,
                cropping: false,
                includeBase64: true,
            });

            if (!images || images.length === 0) {
                console.error("No images selected!");
                return;
            }

            const newPhotos = images.map(img => `data:${img.mime};base64,${img.data}`);

            if (newPhotos.length > 5) {
                alert("You can only upload up to 5 photos.");
                return;
            }

            // ❌ Old logic was appending; ✅ Now it REPLACES old photos
            setRoleRegisterData(prevData => ({
                ...prevData,
                additionalPhotos: newPhotos, // Replaces old images with new ones
            }));

        } catch (err) {
            console.log("Additional Photos Picker Error:", err);
        }
    };


    const handleStateInputChange = (text) => {
        setStateInput(text);

        if (text) {
            const filtered = StateData.filter((item) =>
                item?.label?.toLowerCase().includes(text.toLowerCase())
            ).map(item => item.label);
            setFilteredStates(filtered);
        } else {
            setFilteredStates([]);
        }

        setRoleRegisterData(PrevRoleRegisterData => ({
            ...PrevRoleRegisterData,
            state: text,
        }));
    };

    const handleStateSelect = (item) => {
        setStateInput(item);
        setSelectedState(item);
        setRoleRegisterData((PrevRoleRegisterData) => ({
            ...PrevRoleRegisterData,
            state: item,
        }));
        setFilteredStates([]);
    };

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

        setRoleRegisterData(PrevRoleRegisterData => ({
            ...PrevRoleRegisterData,
            city: text,
        }));
    };

    const handleCitySelect = (item) => {
        setCityInput(item);
        setRoleRegisterData(PrevRoleRegisterData => ({
            ...PrevRoleRegisterData,
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
        setRoleRegisterData((PrevRoleRegisterData) => ({
            ...PrevRoleRegisterData,
            subCaste: text,
        }));
    };

    const handleSubCasteSelect = (selectedItem) => {
        setSubCasteInput(selectedItem);
        setFilteredSubCaste([]);

        setRoleRegisterData((PrevRoleRegisterData) => ({
            ...PrevRoleRegisterData,
            subCaste: selectedItem,
        }));
    };

    const handleInputChange = (field, value) => {
        setRoleRegisterData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const convertToBase64 = async (imageUri) => {
        try {
            if (!imageUri) return null;

            // Agar already Base64 format me hai toh direct return kar do ✅
            if (imageUri.startsWith("data:image")) {
                return imageUri;
            }

            // Fetch image and convert to blob ✅
            const response = await fetch(imageUri);
            const blob = await response.blob();

            const mimeType = blob.type || "image/jpeg"; // Default JPEG ✅

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

    const handleSubmit = async () => {
        setIsLoading(true);

        // ✅ API Mapping based on profileType
        const roleApiMapping = {
            Pandit: UPDATE_PANDIT,
            Jyotish: UPDATE_JYOTISH,
            Kathavachak: UPDATE_KATHAVACHAK
        };

        if (!profileType || !roleApiMapping[profileType]) {
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Invalid profile type selected.",
            });
            setIsLoading(false);
            return;
        }

        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) throw new Error("Authorization token is missing.");

            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };

            const url = roleApiMapping[profileType];
            const servicesKey = `${profileType.toLowerCase()}Services`;
            const existingServices = profileData?.[servicesKey] || [];

            const filteredServices = Object.keys(checked).filter(service =>
                servicesOptions[profileType].some(option => option.value === service) && checked[service]
            );

            let profilePhotoBase64 = null;
            if (RoleRegisterData.profilePhoto) {
                try {
                    profilePhotoBase64 = await convertToBase64(RoleRegisterData.profilePhoto);
                    console.log("Converted Profile Photo:", profilePhotoBase64);
                } catch (error) {
                    console.error("Profile Photo Base64 Conversion Error:", error);
                }
            }

            let additionalPhotosBase64 = [];
            if (RoleRegisterData.additionalPhotos && Array.isArray(RoleRegisterData.additionalPhotos)) {
                additionalPhotosBase64 = await Promise.all(
                    RoleRegisterData.additionalPhotos.map(async (photo) => await convertToBase64(photo))
                );
            }

            const payload = {
                mobileNo: RoleRegisterData.mobileNo,
                fullName: RoleRegisterData.fullName,
                residentialAddress: RoleRegisterData.residentialAddress,
                state: RoleRegisterData.state,
                city: RoleRegisterData.city,
                subCaste: RoleRegisterData.subCaste,
                profilePhoto: profilePhotoBase64,
                additionalPhotos: additionalPhotosBase64,
                experience: RoleRegisterData.experience,
                description: RoleRegisterData.description,
                websiteUrl: RoleRegisterData.websiteUrl,
                facebookUrl: RoleRegisterData.facebookUrl,
                youtubeUrl: RoleRegisterData.youtubeUrl,
                instagramUrl: RoleRegisterData.instagramUrl,
                whatsapp: RoleRegisterData.whatsapp,
                [servicesKey]: filteredServices.length > 0 ? filteredServices : existingServices,
            };

            console.log("Final Payload to be Sent:", payload);

            const response = await axios.patch(url, payload, { headers });
            console.log("response", JSON.stringify(response.data))

            if (response.status === 200 || response.data.status === true) {
                Toast.show({
                    type: "success",
                    text1: "Success!",
                    text2: `Successfully updated profile for ${profileType}.`,
                });

                setTimeout(() => {
                    navigation.navigate("MyProfile");
                    setIsLoading(false);
                }, 2000);

            } else {
                throw new Error(response.data.message || "Failed to update profile.");
            }

        } catch (error) {
            console.error("Error:", error);

            if (error.response?.status === 400) {
                Toast.show({
                    type: "error",
                    text1: "Update Failed",
                    text2: error.response.data.message || "Invalid request. Please check your input.",
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: error.message || "Something went wrong. Please try again.",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };


    const handleCheckboxChange = (service) => {
        setChecked((prev) => ({
            ...prev,
            [service]: !prev[service],
        }));
    };

    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Update details</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={Globalstyles.form}>
                    <Text style={Globalstyles.title}>Name</Text>
                    <TextInput style={Globalstyles.input}
                        value={RoleRegisterData.fullName}
                        onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, fullName: text }))}
                        placeholder='Enter Your Full Name'
                        placeholderTextColor={Colors.gray}
                    />

                    <Text style={Globalstyles.title}>Mobile No.</Text>
                    <TextInput style={Globalstyles.input}
                        value={RoleRegisterData?.mobileNo}
                        onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, mobileNo: text }))}
                        keyboardType="phone-pad"
                        placeholder="Enter Your Mobile No." maxLength={10}
                        placeholderTextColor={Colors.gray} />

                    <Text style={[Globalstyles.title, { color: Colors.theme_color }]}>Address</Text>

                    <Text style={Globalstyles.title}>State</Text>
                    <TextInput
                        style={Globalstyles.input}
                        value={RoleRegisterData?.state} // `biodata?.state` ki jagah `stateInput` use karein
                        onChangeText={handleStateInputChange}
                        placeholder="Type your State"
                        placeholderTextColor={Colors.gray}
                    />

                    {filteredStates.length > 0 ? (
                        <FlatList
                            data={filteredStates.slice(0, 5)}
                            scrollEnabled={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleStateSelect(item)}>
                                    <Text style={Globalstyles.listItem}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            style={Globalstyles.suggestions}
                        />
                    ) : null}

                    <Text style={Globalstyles.title}>Village / City</Text>
                    <TextInput
                        style={Globalstyles.input}
                        value={RoleRegisterData?.city}
                        onChangeText={handleCityInputChange}
                        placeholder="Enter your city"
                        placeholderTextColor={Colors.gray}
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


                    <Text style={Globalstyles.title}>Area </Text>
                    <TextInput style={Globalstyles.input}
                        value={RoleRegisterData?.residentialAddress}
                        onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, residentialAddress: text }))}
                        placeholder='Enter Your Area'
                        placeholderTextColor={Colors.gray}
                    />

                    <Text style={Globalstyles.title}>Aadhar No. </Text>
                    <TextInput style={Globalstyles.input}
                        value={RoleRegisterData?.aadharNo}
                        onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, aadharNo: text }))}
                        placeholder='Enter Your Aadhar No.'
                        placeholderTextColor={Colors.gray}
                    />

                    <Text style={Globalstyles.title}>Sub Caste</Text>
                    <TextInput
                        style={Globalstyles.input}
                        value={RoleRegisterData?.subCaste} // `myBiodata?.subCaste` ki jagah `subCasteInput` use karein
                        onChangeText={handleSubCasteInputChange}
                        placeholder="Type your sub caste"
                        placeholderTextColor={Colors.gray}
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

                    <View>
                        <Text style={styles.servicesLabel}>{profileData.profileType} Services</Text>
                        {servicesOptions[profileData.profileType]?.map(service => (
                            <View key={service.value} style={styles.checkboxContainer1}>
                                <Checkbox.Item
                                    label={service.label}
                                    status={checked[service.value] ? 'checked' : 'unchecked'}
                                    onPress={() => handleCheckboxChange(service.value)}
                                    color={Colors.theme_color}
                                />
                            </View>
                        ))}
                    </View>

                    <Text style={Globalstyles.title}>Experience</Text>
                    <View>
                        <Dropdown
                            style={Globalstyles.input}
                            data={ExperienceData}
                            labelField="label"
                            valueField="value"
                            value={String(RoleRegisterData?.experience)}
                            onChange={(text) => handleInputChange("experience", text.value)}
                            placeholder="Select Experience"
                            placeholderStyle={{ color: '#E7E7E7' }}
                        />

                    </View>

                    <Text style={Globalstyles.title}>Profile Photo</Text>
                    <View style={Globalstyles.input}>
                        <TouchableOpacity onPress={handleProfilePhotoPick}>
                            {RoleRegisterData.profilePhoto ? (
                                <Image
                                    source={{ uri: RoleRegisterData.profilePhoto }}
                                    style={{ width: SW(100), height: SH(100), borderRadius: 10 }}
                                />
                            ) : (
                                <Text style={styles.imagePlaceholder}>Upload Photo</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    <Text style={Globalstyles.title}>Add Description</Text>
                    <TextInput style={Globalstyles.textInput} value={RoleRegisterData.description}
                        onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, description: text }))}
                        textAlignVertical='top' placeholder="Add Your Description"
                        placeholderTextColor={Colors.gray} multiline={true}
                    />


                    <View style={styles.photopickContainer}>
                        <Text style={styles.title}>Photos (Up to 5)</Text>

                        {/* Crop Picker Button */}
                        <TouchableOpacity style={styles.PickPhotoButton} onPress={handleAdditionalPhotosPick}>
                            <Text style={styles.PickPhotoText}>Pick & Crop Photo</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Display Selected Photos */}
                    {RoleRegisterData?.additionalPhotos?.length > 0 && (
                        <View style={styles.photosContainer}>
                            <Text style={styles.label}>Uploaded Photos:</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {RoleRegisterData?.additionalPhotos.map((photo, index) => (
                                    <Image key={index} source={{ uri: photo }} style={styles.photo} />
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <Text style={Globalstyles.title}>Website Link</Text>
                    <TextInput style={Globalstyles.input}
                        value={RoleRegisterData.websiteUrl}
                        onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, websiteUrl: text }))}
                        placeholder="give Your Website Link"
                        placeholderTextColor={Colors.gray} />
                    <Text style={Globalstyles.title}>Youtube Link</Text>
                    <TextInput style={Globalstyles.input}
                        value={RoleRegisterData.youtubeUrl}
                        onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, youtubeUrl: text }))}
                        placeholder="give Your Youtube Link"
                        placeholderTextColor={Colors.gray} />
                    <Text style={Globalstyles.title}>Whatsapp Link</Text>
                    <TextInput style={Globalstyles.input}
                        value={RoleRegisterData.whatsapp}
                        onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, whatsapp: text }))}
                        placeholder="give Your Whatsapp Link"
                        placeholderTextColor={Colors.gray} />
                    <Text style={Globalstyles.title}>Facebook Link</Text>
                    <TextInput style={Globalstyles.input}
                        value={RoleRegisterData.facebookUrl}
                        onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, facebookUrl: text }))}
                        placeholder="give Your Facebook Link"
                        placeholderTextColor={Colors.gray} />
                    <Text style={Globalstyles.title}>Instagram Link</Text>
                    <TextInput style={Globalstyles.input}
                        value={RoleRegisterData.instagramUrl}
                        onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, instagramUrl: text }))}
                        placeholder="give Your Instagram Link"
                        placeholderTextColor={Colors.gray} />


                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator size="large" color={Colors.light} />
                        ) : (
                            <Text style={styles.buttonText}>submit</Text>
                        )}
                    </TouchableOpacity>


                </View>
            </ScrollView>
            <Toast />
        </SafeAreaView>
    );
};

export default UpdateProfileDetails;
