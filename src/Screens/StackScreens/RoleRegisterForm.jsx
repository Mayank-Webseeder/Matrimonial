import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView, StatusBar, FlatList } from 'react-native';
import styles from '../StyleScreens/RoleRegisterStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { Checkbox } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Globalstyles from '../../utils/GlobalCss';
import { subCasteOptions, StateData, CityData, panditServices, jyotishServices, kathavachakServices, ExperienceData } from '../../DummyData/DropdownData';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CREATE_PANDIT } from '../../utils/BaseUrl';
import { Dropdown } from 'react-native-element-dropdown';
import ImageCropPicker from 'react-native-image-crop-picker';

const RoleRegisterForm = ({ navigation }) => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [stateInput, setStateInput] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [subCaste, setSubCaste] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [checked, setChecked] = useState({});
    const [photos, setPhotos] = useState([]);
    const [description, setDescription] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const [website, setWebsite] = useState('');
    const [youtube, setYoutube] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [subCasteInput, setSubCasteInput] = useState('');
    const [filteredStates, setFilteredStates] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [filteredSubCaste, setFilteredSubCaste] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedSubCaste, setSelectedSubCaste] = useState('');
    const [area, setArea] = useState('');
    const [experience, setExperience] = useState(null);
    const [selectedImageName, setSelectedImageName] = useState("Upload Image");
    const [selectedImage, setSelectedImage] = useState(null);

    console.log("selectedImageName", selectedImageName);
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

    const handleCropPick = () => {
        ImageCropPicker.openPicker({
            multiple: false,
            cropping: true,
            width: 400,
            height: 400,
        }).then(image => {
            const newPhoto = {
                uri: image.path,
            };
            addPhotos([newPhoto]);
        }).catch(err => console.log('Crop Picker Error:', err));
    };

    const addPhotos = (newPhotos) => {
        if (photos.length + newPhotos.length <= 5) {
            setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
        } else {
            alert('You can only upload up to 5 photos.');
        }
    };


    const handleSubmit = async () => {
        const roleApiMapping = {
            Pandit: CREATE_PANDIT,
        };

        if (!name || !mobile || !area || !selectedState || !selectedCity || !aadhar || !selectedSubCaste || !profilePhoto || !photos.length) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'All required fields must be filled.',
            });
            return;
        }

        const commonPayload = {
            fullName: name,
            mobileNo: mobile,
            residentialAddress: area,
            state: selectedState,
            city: selectedCity,
            aadharNo: aadhar,
            subCaste: selectedSubCaste,
            profilePhoto: profilePhoto,
            additionalPhotos: photos.map(photo => photo.uri),
        };

        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) throw new Error("Authorization token is missing.");

            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };

            for (const role of selectedRoles) {
                const url = roleApiMapping[role];
                const payload = {
                    ...commonPayload,
                    [`${role.toLowerCase()}Services`]: Object.keys(checked).filter(service => checked[service]),
                };

                try {
                    const response = await axios.post(url, payload, { headers });
                    Toast.show({
                        type: 'success',
                        text1: 'Success!',
                        text2: `Successfully registered for ${role}.`,
                    });
                } catch (apiError) {
                    // Log detailed error to a logging service like Sentry
                    console.error(`API Error for ${role}:`, apiError.response?.data || apiError.message);

                    Toast.show({
                        type: 'error',
                        text1: 'Registration Failed',
                        text2: apiError.response?.data?.message || `Failed to register for ${role}.`,
                    });
                }
            }
        } catch (error) {
            // Log unexpected errors to a logging service
            console.error('Unexpected error:', error.message);

            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: error.message,
            });
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
    };

    // Sub Caste input handler
    const handleSubCasteInputChange = (text) => {
        setSubCasteInput(text);
        if (text) {
            const filtered = subCasteOptions.filter((item) =>
                item?.label?.toLowerCase().includes(text.toLowerCase())
            ).map(item => item.label);
            setFilteredSubCaste(filtered);
        } else {
            setFilteredSubCaste([]);
        }
    };

    const handleImageUpload = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 250,
            cropping: true,
        })
            .then(image => {
                setSelectedImage(image.path);
                const imageName = image.path.split('/').pop();
                setSelectedImageName(imageName);
                console.log('Selected Image:', image);
            })
            .catch(error => {
                console.error('Image Picking Error:', error);
            });
    };


    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Register</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={Globalstyles.form}>
                    <Text style={styles.editText}>Edit Details</Text>
                    <Text style={Globalstyles.title}>Name</Text>
                    <TextInput style={Globalstyles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder='Enter Your Full Name'
                       placeholderTextColor={Colors.gray}
                    />

                    <Text style={Globalstyles.title}>Mobile No.</Text>
                    <TextInput style={Globalstyles.input} value={mobile} onChangeText={setMobile} keyboardType="phone-pad"
                        placeholder="Enter Your Mobile No."
                       placeholderTextColor={Colors.gray} />

                    <Text style={Globalstyles.title}>State</Text>
                    <TextInput
                        style={Globalstyles.input}
                        value={stateInput}
                        onChangeText={handleStateInputChange}
                        placeholder="Enter your state"
                       placeholderTextColor={Colors.gray}
                    />
                    {filteredStates.length > 0 && stateInput ? (
                        <FlatList
                            data={filteredStates}
                            keyExtractor={(item, index) => index.toString()}
                            scrollEnabled={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setStateInput(item);
                                        setSelectedState(item);
                                        setFilteredStates([]);
                                    }}
                                >
                                    <Text style={Globalstyles.listItem}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            style={Globalstyles.suggestions}
                        />
                    ) : null}

                    <Text style={Globalstyles.title}>Village / City</Text>
                    <TextInput
                        style={Globalstyles.input}
                        value={cityInput}
                        onChangeText={handleCityInputChange}
                        placeholder="Enter your city"
                       placeholderTextColor={Colors.gray}
                    />
                    {filteredCities.length > 0 && cityInput ? (
                        <FlatList
                            data={filteredCities}
                            scrollEnabled={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setCityInput(item);
                                        setSelectedCity(item);
                                        setFilteredCities([]);
                                    }}
                                >
                                    <Text style={Globalstyles.listItem}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            style={Globalstyles.suggestions}
                        />
                    ) : null}

                    <Text style={Globalstyles.title}>Area (optional)</Text>
                    <TextInput style={Globalstyles.input}
                        value={area} onChangeText={setArea}
                        placeholder='Enter Your Area'
                       placeholderTextColor={Colors.gray} multiline={true}
                    />

                    <Text style={Globalstyles.title}>Aadhar No. (Optional)</Text>
                    <TextInput style={Globalstyles.input}
                        value={aadhar} onChangeText={setAadhar}
                        placeholder='Enter Your Aadhar No.'
                       placeholderTextColor={Colors.gray}
                    />

                    <Text style={Globalstyles.title}>Sub Caste</Text>
                    <TextInput
                        style={Globalstyles.input}
                        value={subCasteInput}
                        onChangeText={handleSubCasteInputChange}
                        placeholder="Enter your sub caste"
                       placeholderTextColor={Colors.gray}
                    />
                    {filteredSubCaste.length > 0 && subCasteInput ? (
                        <FlatList
                            data={filteredSubCaste.slice(0, 5)}
                            scrollEnabled={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSubCasteInput(item);
                                        setSelectedSubCaste(item);
                                        setFilteredSubCaste([]);
                                    }}
                                >
                                    <Text style={Globalstyles.listItem}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            style={Globalstyles.suggestions}
                        />
                    ) : null}

                    {/* Role Selection with Checkboxes */}
                    <Text style={Globalstyles.title}>You are Registering for</Text>
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
                            value={experience}
                            onChange={(item) => setExperience(item.value)}
                            placeholder="Select Experience"
                            placeholderStyle={{ color: '#E7E7E7' }}
                        />
                    </View>

                    <Text style={Globalstyles.title}>Profile Photo</Text>
                    <View style={Globalstyles.input}>
                        <TouchableOpacity onPress={handleImageUpload}>
                            <Text style={styles.imagePlaceholder}>{selectedImageName}</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={Globalstyles.title}>Add Description</Text>
                    <TextInput style={Globalstyles.textInput} value={description} onChangeText={setDescription}
                        textAlignVertical='top' placeholder="Add Your Description"
                       placeholderTextColor={Colors.gray} multiline={true}
                    />


                    <View style={styles.photopickContainer}>
                        <Text style={styles.title}>Photos (Up to 5)</Text>

                        {/* Crop Picker Button */}
                        <TouchableOpacity style={styles.PickPhotoButton} onPress={handleCropPick}>
                            <Text style={styles.PickPhotoText}>Pick & Crop Photo</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Display Selected Photos */}
                    {photos.length > 0 && (
                        <View style={styles.photosContainer}>
                            <Text style={styles.label}>Uploaded Photos:</Text>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {photos.map((photo, index) => (
                                    <Image key={index} source={{ uri: photo.uri }} style={styles.photo} />
                                ))}
                            </ScrollView>
                        </View>
                    )}
                    <Text style={Globalstyles.title}>Website Link</Text>
                    <TextInput style={Globalstyles.input} value={website} onChangeText={setWebsite}
                        placeholder="Gave Your Website Link"
                       placeholderTextColor={Colors.gray} />
                    <Text style={Globalstyles.title}>Youtube Link</Text>
                    <TextInput style={Globalstyles.input} value={youtube} onChangeText={setYoutube}
                        placeholder="Gave Your Youtube Link"
                       placeholderTextColor={Colors.gray} />
                    <Text style={Globalstyles.title}>Whatsapp Link</Text>
                    <TextInput style={Globalstyles.input} value={whatsapp} onChangeText={setWhatsapp}
                        placeholder="Gave Your Whatsapp Link"
                       placeholderTextColor={Colors.gray} />
                    <Text style={Globalstyles.title}>Facebook Link</Text>
                    <TextInput style={Globalstyles.input} value={facebook} onChangeText={setFacebook}
                        placeholder="Gave Your Facebook Link"
                       placeholderTextColor={Colors.gray} />
                    <Text style={Globalstyles.title}>Instagram Link</Text>
                    <TextInput style={Globalstyles.input} value={instagram} onChangeText={setInstagram}
                        placeholder="Gave Your Instagram Link"
                       placeholderTextColor={Colors.gray} />

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Toast />
        </SafeAreaView>
    );
};

export default RoleRegisterForm;
