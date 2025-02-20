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
import { CREATE_JYOTISH, CREATE_KATHAVACHAK, CREATE_PANDIT } from '../../utils/BaseUrl';
import { Dropdown } from 'react-native-element-dropdown';
import ImageCropPicker from 'react-native-image-crop-picker';

const RoleRegisterForm = ({ navigation }) => {
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

     const [RoleRegisterData, setRoleRegisterData] = useState({
        mobileNo:'',
        fullName:'',
        residentialAddress:'',
        area:'',
        state:'',
        city:'',
        aadharNo:'',
        subCaste:'',
        profilePhoto:'',
        additionalPhotos:[],
        experience:'',
        description:'',
        websiteUrl:'',
        facebookUrl:'',
        youtubeUrl:'',
        instagramUrl:'',
        whatsapp:''
      });

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
                cropping: true,
                width: 400,
                height: 400,
                includeBase64: true,
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
    

    const handleSubmit = async () => {
        const roleApiMapping = {
            Pandit: CREATE_PANDIT,
            Jyotish: CREATE_JYOTISH,
            Kathavachak: CREATE_KATHAVACHAK
        };
    
        const commonPayload = {
            mobileNo: RoleRegisterData.mobileNo,
            fullName: RoleRegisterData.fullName,
            residentialAddress: RoleRegisterData.residentialAddress,
            state: RoleRegisterData.state,
            city: RoleRegisterData.city,
            subCaste: RoleRegisterData.subCaste,
            profilePhoto: RoleRegisterData.profilePhoto, // ✅ Base64 format
            additionalPhotos: RoleRegisterData.additionalPhotos, // ✅ Base64 format array
            experience: RoleRegisterData.experience,
            description: RoleRegisterData.description,
            websiteUrl:RoleRegisterData.websiteUrl,
            facebookUrl:RoleRegisterData.facebookUrl,
            youtubeUrl:RoleRegisterData.youtubeUrl,
            instagramUrl:RoleRegisterData.instagramUrl,
            whatsapp:RoleRegisterData.whatsapp,
            status: "pending"
        };
    
        console.log("Payload to be sent:", commonPayload);
    
        try {
            const token = await AsyncStorage.getItem("userToken");
            if (!token) throw new Error("Authorization token is missing.");
    
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            };
    
            for (const role of selectedRoles) {
                const url = roleApiMapping[role];
    
                // ✅ Sahi role ke liye sirf uski services bhejni hai
                const payload = {
                    ...commonPayload,
                    [`${role.toLowerCase()}Services`]: Object.keys(checked).filter(service => checked[service]),
                };
    
                console.log(`Sending Payload for ${role}:`, payload); // ✅ Debugging ke liye
    
                const response = await axios.post(url, payload, { headers });
    
                Toast.show({
                    type: 'success',
                    text1: 'Success!',
                    text2: `Successfully registered for ${role}.`,
                });
            }
        } catch (error) {
            console.error('Error:', error.message);
    
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


                    <Text style={Globalstyles.title}>Area (optional)</Text>
                    <TextInput style={Globalstyles.input}
                       value={RoleRegisterData?.residentialAddress} 
                       onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, residentialAddress: text }))}
                        placeholder='Enter Your Area'
                        placeholderTextColor={Colors.gray}
                    />

                    <Text style={Globalstyles.title}>Aadhar No. (Optional)</Text>
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
                            value={RoleRegisterData?.experience}
                            onChange={(text) => handleInputChange("experience", text.value)}
                            placeholder="Select Experience"
                            placeholderStyle={{ color: '#E7E7E7' }}
                        />
                    </View>

                    <Text style={Globalstyles.title}>Profile Photo</Text>
                    <View style={Globalstyles.input}>
                        <TouchableOpacity onPress={handleProfilePhotoPick}>
                            <Text style={styles.imagePlaceholder}>upload photo</Text>
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
