import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView, StatusBar, FlatList, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import styles from '../StyleScreens/RoleRegisterStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { Checkbox } from 'react-native-paper';
import Globalstyles from '../../utils/GlobalCss';
import { subCasteOptions, StateData, CityData, panditServices, jyotishServices, kathavachakServices, ExperienceData } from '../../DummyData/DropdownData';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CREATE_JYOTISH, CREATE_KATHAVACHAK, CREATE_PANDIT, PROFILE_TYPE } from '../../utils/BaseUrl';
import { Dropdown } from 'react-native-element-dropdown';
import ImageCropPicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RoleRegisterForm = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [stateInput, setStateInput] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [checked, setChecked] = useState({});
    const [photos, setPhotos] = useState([]);
    const [subCasteInput, setSubCasteInput] = useState('');
    const [filteredStates, setFilteredStates] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [filteredSubCaste, setFilteredSubCaste] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const ProfileData = useSelector((state) => state.profile);
    const profileData = ProfileData?.profiledata || {};
    const [fetchProfileDetails, setFetchProfileDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [RoleRegisterData, setRoleRegisterData] = useState({
        mobileNo: '',
        fullName: '',
        residentialAddress: '',
        area: '',
        state: '',
        city: '',
        aadharNo: '',
        subCaste: '',
        profilePhoto: '',
        additionalPhotos: [],
        experience: '',
        description: '',
        websiteUrl: '',
        facebookUrl: '',
        youtubeUrl: '',
        instagramUrl: '',
        whatsapp: ''
    });

    useEffect(() => {
        console.log("profileData:", JSON.stringify(profileData, null, 2));
        fetchProfilesDetails();
    }, []);


    const fetchProfilesDetails = async () => {
        try {
            setIsLoading(true);

            const token = await AsyncStorage.getItem('userToken');

            // ✅ **Select first TRUE category (Only Pandit, Jyotish, Kathavachak)**
            let profileType = null;
            if (profileData.isPandit) profileType = "Pandit";
            else if (profileData.isJyotish) profileType = "Jyotish";
            else if (profileData.isKathavachak) profileType = "Kathavachak";

            if (!profileType) {
                console.log("❌ No valid profileType found.");
                setIsLoading(false);
                return;
            }

            const apiUrl = `${PROFILE_TYPE}/${profileType}`;

            console.log("API Request:");
            console.log("URL:", apiUrl);
            console.log("Headers:", { Authorization: `Bearer ${token}` });

            const response = await axios.get(apiUrl, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("Full API Response:", JSON.stringify(response.data));

            // ✅ **Filter out Activist profiles**
            if (response.data?.data?.profileType === "Activist") {
                console.log("❌ Skipping Activist Profile");
                setIsLoading(false);
                return;
            }

            setFetchProfileDetails(response.data.data);
            console.log("Selected Profile Data:", response.data.data);

        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            if (error.response) {
            } else if (error.request) {
                console.error("No Response Received:", error.request);
            } else {
                console.error("Error Message:", error.message);
            }
            console.error("Error fetching biodata:", errorMsg);

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

    useEffect(() => {
        console.log("profileData:", JSON.stringify(profileData, null, 2));
        fetchProfilesDetails();
    }, []);


    const roleOptions = [
        { label: 'Pandit', value: 'Pandit' },
        { label: 'Jyotish', value: 'Jyotish' },
        { label: 'Kathavachak', value: 'Kathavachak' },
    ];

    const servicesOptions = {
        Pandit: panditServices,
        Jyotish: jyotishServices,
        Kathavachak: kathavachakServices,
    };

    const handleRoleChange = (roleValue) => {
        setSelectedRoles(prevRoles => {
            if (prevRoles.includes(roleValue)) {
                return prevRoles.filter(role => role !== roleValue);
            } else {
                return [...prevRoles, roleValue];
            }
        });
    };

    const handleCheckboxChange = (serviceValue) => {
        setChecked(prevChecked => ({
            ...prevChecked,
            [serviceValue]: !prevChecked[serviceValue],
        }));
    };

    const handleProfilePhotoPick = async () => {
        try {
            const image = await ImageCropPicker.openPicker({
                multiple: false,
                width: 1000,
                height: 1000,
                cropping: true,
                freeStyleCropEnabled: true,
                cropperToolbarTitle: 'Crop Image',
                cropperCircleOverlay: false,
                includeBase64: true,
                compressImageQuality: 1,
                mediaType: 'photo',
                cropperStatusBarColor: '#000000',
                cropperToolbarColor: '#FFFFFF',
                cropperActiveWidgetColor: '#000000',
                cropperToolbarWidgetColor: '#000000',
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
                cropping: true,
                includeBase64: true,
            });

            if (!images || images.length === 0) {
                console.error("No images selected!");
                return;
            }

            setRoleRegisterData(prevData => {
                const newPhotos = images.map(img => `data:${img.mime};base64,${img.data}`);
                const updatedPhotos = [...prevData.additionalPhotos, ...newPhotos];

                if (updatedPhotos.length <= 5) {
                    return { ...prevData, additionalPhotos: updatedPhotos };
                } else {
                    alert('You can only upload up to 5 additional photos.');
                    return prevData;
                }
            });

        } catch (err) {
            console.log("Additional Photos Picker Error:", err);
        }
    };

    const OPTIONAL_FIELDS = [
        "residentialAddress", "additionalPhotos", "experience", "websiteUrl",
        "facebookUrl", "youtubeUrl", "instagramUrl", "whatsapp", "description", "aadharNo"
    ];

    const validateForm = (data) => {
        let errors = {};

        if (!data) return errors; // Ensure data exists to avoid undefined errors

        const allFields = Object.keys(data);

        // Get mandatory fields (all except optional ones)
        const MANDATORY_FIELDS = allFields.filter(field => !OPTIONAL_FIELDS.includes(field));

        MANDATORY_FIELDS.forEach((field) => {
            if (!data[field] || String(data[field]).trim() === "") {
                errors[field] = `${field} is required`;
            }
        });

        return errors;
    };

    const handleSubmit = async () => {
        try {
            console.log("Submitting...");
            setIsLoading(true);
            console.log("Loader Started...");

            const roleApiMapping = {
                Pandit: CREATE_PANDIT,
                Jyotish: CREATE_JYOTISH,
                Kathavachak: CREATE_KATHAVACHAK
            };

            const commonPayload = {
                mobileNo: RoleRegisterData?.mobileNo || fetchProfileDetails?.mobileNo,
                residentialAddress: RoleRegisterData?.residentialAddress || fetchProfileDetails?.residentialAddress || "",
                aadharNo: RoleRegisterData?.aadharNo || fetchProfileDetails?.aadharNo || "",
                fullName: RoleRegisterData?.fullName || fetchProfileDetails?.fullName,
                state: RoleRegisterData?.state || fetchProfileDetails?.state,
                city: RoleRegisterData?.city || fetchProfileDetails?.city,
                subCaste: RoleRegisterData?.subCaste || fetchProfileDetails?.subCaste,
                profilePhoto: RoleRegisterData?.profilePhoto,
                additionalPhotos: RoleRegisterData?.additionalPhotos,
                experience: RoleRegisterData?.experience ? String(RoleRegisterData.experience) : "",
                description: RoleRegisterData?.description || fetchProfileDetails?.description || "",
                websiteUrl: RoleRegisterData?.websiteUrl,
                facebookUrl: RoleRegisterData?.facebookUrl,
                youtubeUrl: RoleRegisterData?.youtubeUrl,
                instagramUrl: RoleRegisterData?.instagramUrl,
                whatsapp: RoleRegisterData?.whatsapp,
                status: "pending"
            };

            const errors = validateForm(commonPayload);
            console.log("Validation Errors:", errors);

            if (Object.keys(errors).length > 0) {
                setErrors(errors);
                setIsLoading(false);
                return;
            }

            const token = await AsyncStorage.getItem("userToken");
            if (!token) throw new Error("Authorization token is missing.");
            console.log("Token found:", token);

            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };

            if (!selectedRoles || selectedRoles.length === 0) {
                throw new Error("No roles selected!");
            }
            console.log("Selected Roles:", selectedRoles);

            // ✅ Use Promise.all() to wait for all requests
            const requests = selectedRoles.map(async (role) => {
                const url = roleApiMapping[role];

                const filteredServices = Object.keys(checked).filter(service =>
                    servicesOptions[role].some(option => option.value === service) && checked[service]
                );

                const payload = {
                    ...commonPayload,
                    [`${role.toLowerCase()}Services`]: filteredServices,
                };

                console.log(`Sending Payload for ${role}:`, payload);

                const response = await axios.post(url, payload, { headers });
                console.log(`Response for ${role}:`, response.data);

                showMessage({
                    type: 'success',
                    message: 'Success!',
                    description: `Successfully registered for ${role}.`,
                    icon: "success",
                    duarion: 5000
                });
            });

            // ✅ Wait for all API requests to complete
            await Promise.all(requests);

            // ✅ Navigate only after all requests are successful
            console.log("All roles registered successfully! Navigating...");
            await AsyncStorage.removeItem('RoleRegisterData');

            setTimeout(() => {
                navigation.navigate("MainApp");
            }, 2000);

        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error("Error fetching biodata:", errorMsg);
            showMessage({
                type: 'danger',
                message: errorMsg || 'Something went wrong!',
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
            console.log("Loader Stopped!");
            setIsLoading(false);
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

    const [tempUrlData, setTempUrlData] = useState({}); // Temporarily store input

    const validateAndSetUrl = (text, type) => {
        setTempUrlData((prev) => ({ ...prev, [type]: text })); // Update temp state
    };

    const handleBlur = (type) => {
        const urlPatterns = {
            websiteUrl: /^(https?:\/\/)?([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(\/\S*)?$/,
            youtubeUrl: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/\S+$/,
            whatsapp: /^(https?:\/\/)?(api\.whatsapp\.com|wa\.me)\/\S+$/,
            facebookUrl: /^(https?:\/\/)?(www\.)?facebook\.com\/\S+$/,
            instagramUrl: /^(https?:\/\/)?(www\.)?instagram\.com\/\S+$/,
        };

        if (!tempUrlData[type] || urlPatterns[type].test(tempUrlData[type])) {
            setRoleRegisterData((prev) => ({ ...prev, [type]: tempUrlData[type] }));
        } else {
            showMessage({
                type: "info",
                message: "Invalid URL",
                description: `Please enter a valid ${type.replace("Url", "")} link.`,
                icon: "info",
                duarion: 5000
            });
        }
    };


    return (
        <SafeAreaView style={Globalstyles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Register</Text>
                </View>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>

                <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom, flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled">
                    <View style={Globalstyles.form}>
                        {/* <Text style={styles.editText}>Edit Details</Text> */}
                        <Text style={Globalstyles.title}>Name <Entypo name={'star'} color={'red'} size={12} /></Text>
                        <TextInput style={Globalstyles.input}
                            value={RoleRegisterData?.fullName || fetchProfileDetails?.fullName || ''}
                            onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, fullName: text }))}
                            placeholder='Enter Your Full Name'
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                        />
                        {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

                        <Text style={Globalstyles.title}>Mobile No. <Entypo name={'star'} color={'red'} size={12} /></Text>
                        <TextInput style={Globalstyles.input}
                            value={RoleRegisterData?.mobileNo || fetchProfileDetails?.mobileNo || ''}
                            onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, mobileNo: text }))}
                            keyboardType="phone-pad"
                            placeholder="Enter Your Mobile No." maxLength={10}
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no" />

                        {errors.mobileNo && <Text style={styles.errorText}>{errors.mobileNo}</Text>}
                        <Text style={[Globalstyles.title, { color: Colors.theme_color }]}>Address</Text>

                        <Text style={Globalstyles.title}>State <Entypo name={'star'} color={'red'} size={12} /></Text>
                        <TextInput
                            style={Globalstyles.input}
                            value={RoleRegisterData?.state || fetchProfileDetails?.state || ''} // `biodata?.state` ki jagah `stateInput` use karein
                            onChangeText={handleStateInputChange}
                            placeholder="Type your State"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                        />
                        {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

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

                        <Text style={Globalstyles.title}>Village / City <Entypo name={'star'} color={'red'} size={12} /></Text>
                        <TextInput
                            style={Globalstyles.input}
                            value={RoleRegisterData?.city || fetchProfileDetails?.city || ''}
                            onChangeText={handleCityInputChange}
                            placeholder="Enter your city"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                        />
                        {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
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


                        <Text style={Globalstyles.title}>Area</Text>
                        <TextInput style={Globalstyles.input}
                            value={RoleRegisterData?.residentialAddress || fetchProfileDetails?.residentialAddress || ''}
                            onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, residentialAddress: text }))}
                            placeholder='Enter Your Area'
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                        />

                        <Text style={Globalstyles.title}>Aadhar No. </Text>
                        <TextInput style={Globalstyles.input}
                            value={RoleRegisterData?.aadharNo || fetchProfileDetails?.aadharNo || ''}
                            onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, aadharNo: text }))}
                            placeholder='Enter Your Aadhar No.'
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                        />

                        <Text style={Globalstyles.title}>Sub Caste <Entypo name={'star'} color={'red'} size={12} /></Text>
                        <TextInput
                            style={Globalstyles.input}
                            value={RoleRegisterData?.subCaste || fetchProfileDetails?.subCaste || ''} // `myBiodata?.subCaste` ki jagah `subCasteInput` use karein
                            onChangeText={handleSubCasteInputChange}
                            placeholder="Type your sub caste"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                        />
                        {errors.subCaste && <Text style={styles.errorText}>{errors.subCaste}</Text>}

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


                        {/* Role Selection with Checkboxes */}
                        <Text style={Globalstyles.title}>You are Registering for <Entypo name={'star'} color={'red'} size={12} /></Text>
                        <View style={styles.checkboxContainer}>
                            {roleOptions.map(role => (
                                <View key={role.value} style={styles.checkboxItem}>
                                    <Checkbox
                                        status={selectedRoles.includes(role.value) ? 'checked' : 'unchecked'}
                                        onPress={() => handleRoleChange(role.value)}
                                        color={Colors.theme_color}
                                    />
                                    <Text>{role.label}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Show services for selected roles */}
                        {selectedRoles.map(role => (
                            <View key={role} style={styles.roleServices}>
                                <Text style={styles.servicesLabel}>{role} Services</Text>
                                {servicesOptions[role]?.map(service => (
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
                        ))}

                        <Text style={Globalstyles.title}>Experience</Text>
                        <View>
                            <Dropdown
                                style={Globalstyles.input}
                                data={ExperienceData}
                                labelField="label"
                                valueField="value"
                                value={RoleRegisterData?.experience}
                                onChange={(text) => handleInputChange("experience", text.value)}
                                placeholder="Select Experience"
                                placeholderStyle={{ color: '#E7E7E7' }}
                            />
                        </View>

                        <Text style={Globalstyles.title}>Profile Photo <Entypo name={'star'} color={'red'} size={12} /></Text>
                        <View style={Globalstyles.input}>
                            <TouchableOpacity onPress={handleProfilePhotoPick}>
                                {RoleRegisterData.profilePhoto ? (
                                    <Image
                                        source={{ uri: RoleRegisterData.profilePhoto }}
                                        style={styles.profileImage}
                                    />
                                ) : (
                                    <Text style={styles.imagePlaceholder}>Upload Profile Photo</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                        {errors.profilePhoto && <Text style={styles.errorText}>{errors.profilePhoto}</Text>}

                        <Text style={Globalstyles.title}>Add Description</Text>
                        <TextInput style={Globalstyles.textInput} value={RoleRegisterData.description || fetchProfileDetails?.description || ''}
                            onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, description: text }))}
                            textAlignVertical='top' placeholder="Add Your Description"
                            placeholderTextColor={Colors.gray} multiline={true}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                        />

                        <View style={styles.photopickContainer}>
                            <Text style={styles.title}>Upload Photos For Your Page </Text>

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
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {RoleRegisterData?.additionalPhotos.map((photo, index) => (
                                            <Image key={index} source={{ uri: photo }} style={styles.photo} />
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>
                        )}

                        <Text style={Globalstyles.title}>Website Link</Text>
                        <TextInput
                            style={Globalstyles.input}
                            value={tempUrlData.websiteUrl || RoleRegisterData.websiteUrl}
                            onChangeText={(text) => validateAndSetUrl(text, "websiteUrl")}
                            onBlur={() => handleBlur("websiteUrl")}
                            placeholder="Give Your Website Link"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                        />

                        <Text style={Globalstyles.title}>Youtube Link</Text>
                        <TextInput
                            style={Globalstyles.input}
                            value={tempUrlData.youtubeUrl || RoleRegisterData.youtubeUrl}
                            onChangeText={(text) => validateAndSetUrl(text, "youtubeUrl")}
                            onBlur={() => handleBlur("youtubeUrl")}
                            placeholder="Give Your Youtube Link"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                        />

                        <Text style={Globalstyles.title}>Whatsapp Link</Text>
                        <TextInput
                            style={Globalstyles.input}
                            value={tempUrlData.whatsapp || RoleRegisterData.whatsapp}
                            onChangeText={(text) => validateAndSetUrl(text, "whatsapp")}
                            onBlur={() => handleBlur("whatsapp")}
                            placeholder="Give Your Whatsapp Link"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                        />

                        <Text style={Globalstyles.title}>Facebook Link</Text>
                        <TextInput
                            style={Globalstyles.input}
                            value={tempUrlData.facebookUrl || RoleRegisterData.facebookUrl}
                            onChangeText={(text) => validateAndSetUrl(text, "facebookUrl")}
                            onBlur={() => handleBlur("facebookUrl")}
                            placeholder="Give Your Facebook Link"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                        />

                        <Text style={Globalstyles.title}>Instagram Link</Text>
                        <TextInput
                            style={Globalstyles.input}
                            value={tempUrlData.instagramUrl || RoleRegisterData.instagramUrl}
                            onChangeText={(text) => validateAndSetUrl(text, "instagramUrl")}
                            onBlur={() => handleBlur("instagramUrl")}
                            placeholder="Give Your Instagram Link"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                        />
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
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default RoleRegisterForm;
