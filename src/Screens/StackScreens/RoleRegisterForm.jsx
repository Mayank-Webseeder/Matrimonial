import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView, StatusBar, FlatList } from 'react-native';
import styles from '../StyleScreens/RoleRegisterStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { Checkbox } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { launchImageLibrary } from 'react-native-image-picker';
import Globalstyles from '../../utils/GlobalCss';
import { subCasteOptions, StateData, CityData, panditServices, jyotishServices, kathavachakServices } from '../../DummyData/DropdownData';

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

    const handleImagePick = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 5 }, response => {
            if (response.assets) {
                setPhotos(response.assets);
            }
        });
    };

    const handleSubmit = () => {
        console.log({
            name, mobile, aadhar, subCaste, services: checked, profilePhoto, photos, state: selectedState || stateInput,
            subCaste: selectedSubCaste || subCasteInput, city: selectedCity || cityInput,
        });
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

            <ScrollView>
                <View style={Globalstyles.form}>
                    <Text style={styles.editText}>Edit Details</Text>
                    <Text style={Globalstyles.title}>Name</Text>
                    <TextInput style={Globalstyles.input} value={name} onChangeText={setName} />

                    <Text style={Globalstyles.title}>Mobile No.</Text>
                    <TextInput style={Globalstyles.input} value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />

                    <Text style={Globalstyles.title}>State</Text>
                    <TextInput
                        style={Globalstyles.input}
                        value={stateInput}
                        onChangeText={handleStateInputChange}
                        placeholder="Type your state"
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
                        placeholder="Type your city"
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
                    <TextInput style={Globalstyles.input} value={area} onChangeText={setArea} />

                    <Text style={Globalstyles.title}>Aadhar No. (Optional)</Text>
                    <TextInput style={Globalstyles.input} value={aadhar} onChangeText={setAadhar} keyboardType="number-pad" />

                    <Text style={Globalstyles.title}>Sub Caste</Text>
                    <TextInput
                        style={Globalstyles.input}
                        value={subCasteInput}
                        onChangeText={handleSubCasteInputChange}
                        placeholder="Type your sub caste"
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

                    <Text style={Globalstyles.title}>Profile Photo</Text>
                    <TextInput style={Globalstyles.input} value={profilePhoto} onChangeText={setProfilePhoto} />

                    <Text style={Globalstyles.title}>Add Description</Text>
                    <TextInput style={Globalstyles.textInput} value={description} onChangeText={setDescription}
                        textAlignVertical='top'
                    />


                    <View style={styles.photopickContainer}>
                        <Text style={Globalstyles.title}>Photos (Up to 5)</Text>
                        <TouchableOpacity style={styles.PickPhotoButton} onPress={handleImagePick}>
                            <Text style={styles.PickPhotoText}>Pick Photos</Text>
                        </TouchableOpacity>
                    </View>

                    {photos.length > 0 && (
                        <View style={styles.photosContainer}>
                            <Text style={styles.label}>Uploaded Photos:</Text>
                            <ScrollView horizontal>
                                {photos.map((photo, index) => (
                                    <Image key={index} source={{ uri: photo.uri }} style={styles.photo} />
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <Text style={Globalstyles.title}>Website Link</Text>
                    <TextInput style={Globalstyles.input} value={website} onChangeText={setWebsite} />
                    <Text style={Globalstyles.title}>Youtube Link</Text>
                    <TextInput style={Globalstyles.input} value={youtube} onChangeText={setYoutube} />
                    <Text style={Globalstyles.title}>Whatsapp Link</Text>
                    <TextInput style={Globalstyles.input} value={whatsapp} onChangeText={setWhatsapp} />
                    <Text style={Globalstyles.title}>Facebook Link</Text>
                    <TextInput style={Globalstyles.input} value={facebook} onChangeText={setFacebook} />
                    <Text style={Globalstyles.title}>Instagram Link</Text>
                    <TextInput style={Globalstyles.input} value={instagram} onChangeText={setInstagram} />

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RoleRegisterForm;
