import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, SafeAreaView, Image, StatusBar, FlatList, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import styles from '../StyleScreens/RoleRegisterStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { Checkbox } from 'react-native-paper';
import Globalstyles from '../../utils/GlobalCss';
import { subCasteOptions, StateData, CityData, panditServices, jyotishServices, kathavachakServices, ExperienceData } from '../../DummyData/DropdownData';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UPDATE_PANDIT, UPDATE_JYOTISH, UPDATE_KATHAVACHAK } from '../../utils/BaseUrl';
import { Dropdown } from 'react-native-element-dropdown';
import ImageCropPicker from 'react-native-image-crop-picker';
import { SH, SW } from '../../utils/Dimensions';
import { showMessage } from 'react-native-flash-message';
import { launchImageLibrary } from 'react-native-image-picker';
import Entypo from 'react-native-vector-icons/Entypo';

// import { SafeAreaView } from 'react-native-safe-area-context';

const UpdateProfileDetails = ({ navigation, route }) => {
    const [cityInput, setCityInput] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { profileData, profileType } = route.params || {};
    const [selectedState, setSelectedState] = useState(profileData?.state || null);
    const [isFocus, setIsFocus] = useState(false);

    console.log('profileData', JSON.stringify(profileData));
    const [errors, setErrors] = useState({});

    const [RoleRegisterData, setRoleRegisterData] = useState({
        mobileNo: profileData?.mobileNo || '',
        fullName: profileData?.fullName || '',
        residentialAddress: profileData?.residentialAddress || '',
        area: profileData?.area || '',
        state: profileData?.state || '',
        city: profileData?.city || '',
        aadharNo: profileData?.aadharNo || '',
        // subCaste: profileData?.subCaste || '',
        profilePhoto: profileData?.profilePhoto || '',
        additionalPhotos: profileData?.additionalPhotos || [],
        experience: profileData?.experience || '',
        description: profileData?.description || '',
        websiteUrl: profileData?.websiteUrl || '',
        facebookUrl: profileData?.facebookUrl || '',
        youtubeUrl: profileData?.youtubeUrl || '',
        instagramUrl: profileData?.instagramUrl || '',
        whatsapp: profileData?.whatsapp || '',
    });

    const [tempUrlData, setTempUrlData] = useState({});

    const validateAndSetUrl = (text, type) => {
        setTempUrlData((prev) => ({ ...prev, [type]: text }));
    };

    useEffect(() => {
        setTempUrlData({
            websiteUrl: profileData?.websiteUrl || '',
            facebookUrl: profileData?.facebookUrl || '',
            youtubeUrl: profileData?.youtubeUrl || '',
            instagramUrl: profileData?.instagramUrl || '',
            whatsapp: profileData?.whatsapp || '',
        });
    }, [profileData]);

    const servicesOptions = {
        Pandit: panditServices,
        Jyotish: jyotishServices,
        Kathavachak: kathavachakServices,
    };

    const profileServicesKey = `${profileType.toLowerCase()}Services`;

    const [checked, setChecked] = useState({});

    useEffect(() => {
        if (!profileData || !profileType || !servicesOptions[profileType]) { return; }

        console.log('✅ Updating checked services...');

        const updatedChecked = {};
        servicesOptions[profileType].forEach(service => {
            updatedChecked[service.value] = profileData[profileServicesKey]?.includes(service.value);
        });

        console.log('✅ New checked state:', updatedChecked);
        setChecked(updatedChecked);
    }, [profileData]);


    const handleStateSelect = (item) => {
        setSelectedState(item.value);
        setRoleRegisterData((prev) => ({
            ...prev,
            state: item.value,
        }));
        if (errors.state) {
            setErrors((prev) => ({ ...prev, state: null }));
        }
    };

    const handleCityInputChange = (text) => {
        const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
        setCityInput(filteredText);
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
            city: filteredText,
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

    const handleInputChange = (field, value) => {
        setRoleRegisterData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const convertToBase64 = async (imageUri) => {
        try {
            if (!imageUri) { return null; }
            if (imageUri.startsWith('data:image')) {
                return imageUri;
            }
            const response = await fetch(imageUri);
            const blob = await response.blob();

            const mimeType = blob.type || 'image/jpeg';

            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result) {
                        resolve(`data:${mimeType};base64,${reader.result.split(',')[1]}`);
                    } else {
                        reject('Error reading Base64 data.');
                    }
                };
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error('Error converting image to Base64:', error);
            return null;
        }
    };

    const handleProfilePhotoPick = async () => {
        try {
            const image = await ImageCropPicker.openPicker({
                multiple: true,
                width: 1000,
                height: 1000,
                cropping: true,
                freeStyleCropEnabled: true,
                includeBase64: true,
                compressImageQuality: 1,
                mediaType: 'photo',
                cropperToolbarTitle: 'Crop Image',
                cropperStatusBarColor: '#000000',
                cropperToolbarColor: '#FFFFFF',
                cropperToolbarWidgetColor: '#000000',
                cropperChooseText: 'Done',
                cropperCancelText: 'Cancel',
                immersiveMode: true,
            });

            if (!image.data) {
                console.error('Base64 data missing!');
                return;
            }

            const base64Image = `data:${image.mime};base64,${image.data}`;

            setRoleRegisterData(prevData => ({
                ...prevData,
                profilePhoto: base64Image,
            }));

        } catch (err) {
            console.log('Profile Photo Picker Error:', err);
        }
    };

    const ADDL_LIMIT = 4;

    const handleAdditionalPhotosPick = () => {
        setRoleRegisterData((prev) => {
            const existingCount = prev.additionalPhotos?.length || 0;
            const remainingSlots = ADDL_LIMIT - existingCount;

            if (remainingSlots <= 0) {
                Alert.alert(`You can only upload up to ${ADDL_LIMIT} additional photos.`);
                return prev;
            }

            launchImageLibrary(
                {
                    selectionLimit: remainingSlots,
                    mediaType: "photo",
                    includeBase64: true,
                    maxWidth: 1000,
                    maxHeight: 1000,
                    quality: 1,
                },
                (response) => {
                    if (response.didCancel) return;
                    if (response.errorCode) {
                        console.log("ImagePicker Error:", response.errorMessage);
                        return;
                    }

                    const incoming = response.assets ?? [];
                    const newPhotos = incoming.map(
                        (img) => `data:${img.type};base64,${img.base64}`
                    );

                    setRoleRegisterData((prev2) => {
                        const existing = prev2.additionalPhotos || [];
                        const merged = [...existing, ...newPhotos];

                        return {
                            ...prev2,
                            additionalPhotos: merged.slice(0, ADDL_LIMIT), // ✅ ensure max 4 hi rahe
                        };
                    });
                }
            );

            return prev;
        });
    };


    const handleReplacePhoto = (replaceIndex) => {
        launchImageLibrary(
            {
                selectionLimit: 1,
                mediaType: "photo",
                includeBase64: true,
                maxWidth: 1000,
                maxHeight: 1000,
                quality: 1,
            },
            (response) => {
                if (response.didCancel) return;
                if (response.errorCode) {
                    console.log("ImagePicker Error:", response.errorMessage);
                    return;
                }

                const newImg = response.assets?.[0];
                if (!newImg) return;

                const base64Image = `data:${newImg.type};base64,${newImg.base64}`;

                // Replace specific index image
                setRoleRegisterData((prev) => {
                    const updated = [...prev.additionalPhotos];
                    updated[replaceIndex] = base64Image;
                    return {
                        ...prev,
                        additionalPhotos: updated,
                    };
                });
            }
        );
    };
    const OPTIONAL_FIELDS = [
        'residentialAddress', 'additionalPhotos', 'experience', 'websiteUrl',
        'facebookUrl', 'youtubeUrl', 'instagramUrl', 'whatsapp', 'description', 'aadharNo',
    ];

    const validateForm = (data) => {
        let errors = {};

        if (!data) { return errors; }

        const allFields = Object.keys(data);
        const MANDATORY_FIELDS = allFields.filter(field => !OPTIONAL_FIELDS.includes(field));

        const urlPatterns = {
            websiteUrl: /^(https?:\/\/)?(?!.*(youtube\.com|youtu\.be|facebook\.com|instagram\.com|wa\.me|api\.whatsapp\.com))([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/,

            youtubeUrl: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/\S+$/,

            facebookUrl: /^(https?:\/\/)?(www\.|m\.)?facebook\.com\/.+$/,

            instagramUrl: /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.]+(\/)?(\?.*)?$/,

            whatsapp: /^(https?:\/\/)?(api\.whatsapp\.com\/send\?phone=\d+|wa\.me\/\d+)\/?$/,
        };

        // ✅ Validate MANDATORY FIELDS
        MANDATORY_FIELDS.forEach((field) => {
            const value = String(data[field] || '').trim();
            if (!value) {
                errors[field] = `${field} is required.`;
                return;
            }
            if (field === 'mobileNo' && !/^\d{10}$/.test(value)) {
                errors[field] = 'Enter a valid 10-digit mobile number.';
            }
            // if (field === 'fullName') {
            //     if (!/^[A-Za-z\s]+$/.test(value)) {
            //         errors[field] = `${field} must contain only letters and spaces.`;
            //     } else if (value.length > 30) {
            //         errors[field] = `${field} cannot exceed 30 characters.`;
            //     }
            // }
        });

        const urlFields = ['websiteUrl', 'facebookUrl', 'youtubeUrl', 'instagramUrl', 'whatsapp'];
        const validUrlValues = {}; // Only collect valid URLs here

        // Step 1: Validate each URL field first
        urlFields.forEach((field) => {
            const value = String(data[field] || '').trim();
            const pattern = urlPatterns[field];
            const label = field.replace('Url', '');

            if (value) {
                if (!pattern.test(value)) {
                    errors[field] = `Enter a valid ${label} URL.`; // ✅ Invalid message
                } else {
                    validUrlValues[field] = value; // ✅ Only store valid URLs
                }
            }
        });

        // Step 2: Check for duplicates ONLY among valid URLs
        const seenUrls = new Set();

        Object.entries(validUrlValues).forEach(([field, value]) => {
            if (seenUrls.has(value)) {
                // ✅ Only set duplicate error if no error already exists
                if (!errors[field]) {
                    errors[field] = 'This URL is already used in another field.';
                }
            } else {
                seenUrls.add(value);
            }
        });

        return errors;
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        const roleApiMapping = {
            Pandit: UPDATE_PANDIT,
            Jyotish: UPDATE_JYOTISH,
            Kathavachak: UPDATE_KATHAVACHAK,
        };

        if (!profileType || !roleApiMapping[profileType]) {
            showMessage({
                type: 'danger',
                message: 'Invalid profile type selected.',
                duarion: 5000,
            });
            setIsLoading(false);
            return;
        }

        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) { throw new Error('Authorization token is missing.'); }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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
                    console.log('Converted Profile Photo:', profilePhotoBase64);
                } catch (error) {
                    console.error('Profile Photo Base64 Conversion Error:', error);
                }
            }

            let additionalPhotosBase64 = [];
            if (RoleRegisterData.additionalPhotos && Array.isArray(RoleRegisterData.additionalPhotos)) {
                additionalPhotosBase64 = await Promise.all(
                    RoleRegisterData.additionalPhotos.map(async (photo) => await convertToBase64(photo))
                );
            }

            const commonPayload = {
                mobileNo: RoleRegisterData.mobileNo,
                fullName: RoleRegisterData.fullName,
                residentialAddress: RoleRegisterData.residentialAddress,
                aadharNo: RoleRegisterData.aadharNo,
                state: RoleRegisterData.state,
                city: RoleRegisterData.city,
                // subCaste: RoleRegisterData.subCaste,
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

            const mergedPayload = { ...commonPayload, ...tempUrlData };
            const errors = validateForm(mergedPayload, checked, servicesOptions);
            console.log('mergedPayload:', JSON.stringify(mergedPayload));
            console.log('Validation Errors:', errors);

            if (Object.keys(errors).length > 0) {
                setErrors(errors);
                showMessage({
                    message: 'Please complete all mandatory sections before submitting.',
                    type: 'danger',
                    duration: 4000,
                    icon: 'danger',
                    position: 'bottom',
                });
                setIsLoading(false);
                return;
            }
            const payload = {
                ...commonPayload,
                ...tempUrlData,
            };

            console.log('Final Payload to be Sent:', payload);

            const response = await axios.patch(url, payload, { headers });
            console.log('response', JSON.stringify(response.data));

            if (response.status === 200 || response.data.status === true) {
                showMessage({
                    type: 'success',
                    message: 'Success!',
                    description: `Successfully updated profile for ${profileType}.`,
                    icon: 'success',
                    duarion: 5000,
                });

                // setTimeout(() => {
                //     navigation.replace("ProfileDetail", { profileType: profileType });
                //     setIsLoading(false);
                // }, 2000);

                setTimeout(() => {
                    navigation.navigate('MainApp', {
                        screen: 'Tabs',
                        params: {
                            screen: 'MyProfile',
                        },
                    });
                }, 5000);

                setIsLoading(false);

            } else {
                throw new Error(response.data.message || 'Failed to update profile.');
            }

        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error('Error fetching biodata:', errorMsg);
            showMessage({
                type: 'danger',
                message: 'Update Failed',
                description: errorMsg || 'Invalid request. Please check your input.',
                icon: 'danger',
                duarion: 5000,
            });
            const sessionExpiredMessages = [
                'User does not Exist....!Please login again',
                'Invalid token. Please login again',
                'Token has expired. Please login again',
            ];

            if (sessionExpiredMessages.includes(errorMsg)) {
                await AsyncStorage.removeItem('userToken');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AuthStack' }],
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
        <SafeAreaView style={Globalstyles.container} edges={['top', 'bottom']}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Update details</Text>
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <View style={Globalstyles.form}>
                        <Text style={Globalstyles.title}>Name</Text>
                        <TextInput style={Globalstyles.input}
                            value={RoleRegisterData.fullName}
                            onChangeText={(text) => {
                                // const cleanText = text.replace(/[^A-Za-z\s]/g, '');
                                setRoleRegisterData((prev) => ({ ...prev, fullName: text }));
                            }}
                            placeholder="Enter Your Full Name"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                            autoCorrect={false}
                        />

                        <Text style={Globalstyles.title}>Mobile No.</Text>
                        <TextInput
                            style={[Globalstyles.input, errors.mobileNo && styles.errorInput]}
                            value={RoleRegisterData?.mobileNo}
                            onChangeText={(text) => {
                                // Prevent duplicate paste (only digits, and max 10)
                                const digits = text.replace(/[^0-9]/g, '').slice(0, 10);
                                if (digits !== RoleRegisterData.mobileNo) {
                                    setRoleRegisterData((prev) => ({ ...prev, mobileNo: digits }));
                                }
                            }}
                            keyboardType="phone-pad"
                            placeholder="Enter Your Mobile No."
                            maxLength={10}
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            autoCorrect={false}
                            importantForAutofill="no"
                            textContentType="none"
                            inputMode="numeric"
                            autoCapitalize="none"
                        />

                        <Text style={[Globalstyles.title, { color: Colors.theme_color }]}>Address</Text>

                        <Text style={Globalstyles.title}>State</Text>
                        <Dropdown
                            style={[
                                Globalstyles.input,
                                errors.state && styles.errorInput,
                                isFocus && { borderColor: Colors.primary }
                            ]}
                            placeholderStyle={{ color: Colors.gray }}
                            selectedTextStyle={{ color: '#000' }}
                            data={StateData.map((item) => ({ label: item.label, value: item.label }))}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select your State' : '...'}
                            search
                            searchPlaceholder="Search state..."
                            value={selectedState}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={handleStateSelect}
                        />

                        {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}


                        <Text style={Globalstyles.title}>Village / City</Text>
                        <TextInput
                            style={Globalstyles.input}
                            value={RoleRegisterData?.city}
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


                        <Text style={Globalstyles.title}>Area </Text>
                        <TextInput style={Globalstyles.input}
                            value={RoleRegisterData?.residentialAddress}
                            onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, residentialAddress: text }))}
                            placeholder="Enter Your Area"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                            autoCorrect={false}
                        />

                        {/* <Text style={Globalstyles.title}>Aadhar No. </Text>
                        <TextInput
                            style={Globalstyles.input}
                            value={RoleRegisterData?.aadharNo}
                            onChangeText={(text) => {
                                const digits = text.replace(/[^0-9]/g, '').slice(0, 12);
                                if (digits !== RoleRegisterData.aadharNo) {
                                    setRoleRegisterData((prev) => ({ ...prev, aadharNo: digits }));
                                }
                            }}
                            keyboardType="phone-pad"
                            placeholder="Enter Your Aadhar No."
                            maxLength={12}
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            autoCorrect={false}
                            importantForAutofill="no"
                            textContentType="none"
                            inputMode="numeric"
                            autoCapitalize="none"
                        /> */}

                        {/* <Text style={Globalstyles.title}>Sub Caste</Text>
                        <Dropdown
                            style={[Globalstyles.input]}
                            data={subCasteOptions}
                            labelField="label"
                            valueField="value"
                            value={RoleRegisterData?.subCaste}
                            onChange={(text) => handleInputChange('subCaste', text.value)}
                            placeholder="Select Your subCaste"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                            autoCorrect={false}
                        /> */}
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
                                onChange={(text) => handleInputChange('experience', text.value)}
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
                            textAlignVertical="top" placeholder="Add Your Description"
                            placeholderTextColor={Colors.gray} multiline={true}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                            autoCorrect={false}
                        />


                        <View style={styles.photopickContainer}>
                            <Text style={styles.smalltitle}>Upload Photos For Your Page </Text>

                            <TouchableOpacity style={styles.PickPhotoButton} onPress={handleAdditionalPhotosPick}>
                                <Text style={styles.PickPhotoText}>Pick & Crop Photo</Text>
                            </TouchableOpacity>
                        </View>

                        {RoleRegisterData?.additionalPhotos?.length > 0 && (
                            <View style={styles.photosContainer}>
                                <FlatList
                                    data={RoleRegisterData.additionalPhotos}
                                    keyExtractor={(item, index) => index.toString()}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <View style={{ marginRight: 10, position: 'relative' }}>
                                            <TouchableOpacity onPress={() => handleReplacePhoto(index)}>
                                                <Image source={{ uri: item }} style={styles.photo} />
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    const updated = RoleRegisterData.additionalPhotos.filter((_, i) => i !== index);
                                                    setRoleRegisterData((prev) => ({
                                                        ...prev,
                                                        additionalPhotos: updated,
                                                    }));
                                                }}
                                                style={{
                                                    position: 'absolute',
                                                    top: 3,
                                                    right: 3,
                                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                                    borderRadius: 12,
                                                    padding: 2,
                                                }}
                                            >
                                                <Entypo name="cross" size={18} color="#fff" />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
                                />
                            </View>
                        )}


                        <Text style={Globalstyles.title}>Website Link</Text>
                        <TextInput
                            style={[Globalstyles.input, errors.websiteUrl && styles.errorInput]}
                            value={tempUrlData.websiteUrl}
                            onChangeText={(text) => validateAndSetUrl(text, 'websiteUrl')}
                            placeholder="Give Your Website Link"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                            autoCorrect={false}
                        />
                        {errors.websiteUrl && (
                            <Text style={styles.errorText}>{errors.websiteUrl}</Text>
                        )}
                        <Text style={Globalstyles.title}>Youtube Link</Text>
                        <TextInput
                            style={[Globalstyles.input, errors.youtubeUrl && styles.errorInput]}
                            value={tempUrlData.youtubeUrl}
                            onChangeText={(text) => validateAndSetUrl(text, 'youtubeUrl')}
                            placeholder="Give Your Youtube Link"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                            autoCorrect={false}
                        />
                        {errors.youtubeUrl && (
                            <Text style={styles.errorText}>{errors.youtubeUrl}</Text>
                        )}
                        <Text style={Globalstyles.title}>Whatsapp Link</Text>
                        <TextInput
                            style={[Globalstyles.input, errors.whatsapp && styles.errorInput]}
                            value={tempUrlData.whatsapp}
                            onChangeText={(text) => validateAndSetUrl(text, 'whatsapp')}
                            placeholder="Give Your Whatsapp Link"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                            autoCorrect={false}
                        />
                        {errors.whatsapp && (
                            <Text style={styles.errorText}>{errors.whatsapp}</Text>
                        )}
                        <Text style={Globalstyles.title}>Facebook Link</Text>
                        <TextInput
                            style={[Globalstyles.input, errors.facebookUrl && styles.errorInput]}
                            value={tempUrlData.facebookUrl}
                            onChangeText={(text) => validateAndSetUrl(text, 'facebookUrl')}
                            placeholder="Give Your Facebook Link"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                            autoCorrect={false}
                        />
                        {errors.facebookUrl && (
                            <Text style={styles.errorText}>{errors.facebookUrl}</Text>
                        )}
                        <Text style={Globalstyles.title}>Instagram Link</Text>
                        <TextInput
                            style={[Globalstyles.input, errors.instagramUrl && styles.errorInput]}
                            value={tempUrlData.instagramUrl}
                            onChangeText={(text) => validateAndSetUrl(text, 'instagramUrl')}
                            placeholder="Give Your Instagram Link"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                            autoCorrect={false}
                        />
                        {errors.instagramUrl && (
                            <Text style={styles.errorText}>{errors.instagramUrl}</Text>
                        )}

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

export default UpdateProfileDetails;
