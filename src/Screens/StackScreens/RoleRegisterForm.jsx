import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import styles from '../StyleScreens/RoleRegisterStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { Checkbox } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import { launchImageLibrary } from 'react-native-image-picker';

const RoleRegisterForm = ({ navigation }) => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [subCaste, setSubCaste] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [checked, setChecked] = useState({}); 
    const [photos, setPhotos] = useState([]);
    const [profilePhoto, setProfilePhoto] = useState('');

    const roleOptions = [
        { label: 'Pandit', value: 'Pandit' },
        { label: 'Jyotish', value: 'Jyotish' },
        { label: 'Kathavachak', value: 'Kathavachak' },
    ];

    const servicesOptions = {
        Pandit: [
            { label: 'Pooja', value: 'Pooja' },
            { label: 'Hawan', value: 'Hawan' },
            { label: 'Griha Pravesh', value: 'Griha Pravesh' },
        ],
        Jyotish: [
            { label: 'Astrology Consultation', value: 'Astrology Consultation' },
            { label: 'Horoscope Reading', value: 'Horoscope Reading' },
            { label: 'Palmistry', value: 'Palmistry' },
        ],
        Kathavachak: [
            { label: 'Bhagwat Katha', value: 'Bhagwat Katha' },
            { label: 'Shiv Puran', value: 'Shiv Puran' },
            { label: 'Ramayan Katha', value: 'Ramayan Katha' },
        ],
    };

    const subCasteOptions = [
        { label: 'subCaste1', value: 'subCaste1' },
        { label: 'subCaste2', value: 'subCaste2' },
        { label: 'subCaste3', value: 'subCaste3' },
    ];

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
            name, mobile, address, state, city, aadhar, subCaste, services: checked, profilePhoto, photos,
        });
    };

    return (
        <SafeAreaView contentContainerStyle={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View style={styles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Register</Text>
                </View>
            </View>

            <ScrollView>
                <View style={styles.form}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />

                    <Text style={styles.label}>Mobile No.</Text>
                    <TextInput style={styles.input} value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />

                    <Text style={styles.label}>Address</Text>
                    <TextInput style={styles.input} value={address} onChangeText={setAddress} multiline />

                    <Text style={styles.label}>State</Text>
                    <TextInput style={styles.input} value={state} onChangeText={setState} />

                    <Text style={styles.label}>City</Text>
                    <TextInput style={styles.input} value={city} onChangeText={setCity} />

                    <Text style={styles.label}>Aadhar No.</Text>
                    <TextInput style={styles.input} value={aadhar} onChangeText={setAadhar} keyboardType="number-pad" />

                    <Text style={styles.label}>Sub Caste</Text>
                    <Dropdown
                        style={styles.input}
                        data={subCasteOptions}
                        labelField="label"
                        valueField="value"
                        value={subCaste}
                        onChange={item => setSubCaste(item.value)}
                        placeholder="Select Sub Caste"
                    />

                    {/* Role Selection with Checkboxes */}
                    <Text style={styles.label}>You are Registering for</Text>
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

                    <Text style={styles.label}>Profile Photo</Text>
                    <TextInput style={styles.input} value={profilePhoto} onChangeText={setProfilePhoto} />

                    <View style={styles.photopickContainer}>
                        <Text style={styles.label}>Photos (Up to 5)</Text>
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

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RoleRegisterForm;
