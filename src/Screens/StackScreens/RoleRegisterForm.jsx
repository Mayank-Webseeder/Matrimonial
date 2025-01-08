import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image ,SafeAreaView,StatusBar} from 'react-native';
import styles from '../StyleScreens/PanditRegisterStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
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
    const [services, setServices] = useState('');
    const [experience, setExperience] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const [photos, setPhotos] = useState([]);
    const [youtubeLink, setYoutubeLink] = useState('');
    const [instagramLink, setInstagramLink] = useState('');
    const [whatsappLink, setWhatsappLink] = useState('');
    const [websiteLink, setWebsiteLink] = useState('');
    const [facebookLink, setFacebookLink] = useState('');
    const [role, setRole] = useState('Pandit');

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

    const handleImagePick = () => {
        launchImageLibrary({ mediaType: 'photo', selectionLimit: 5 }, response => {
            if (response.assets) {
                setPhotos(response.assets);
            }
        });
    };

    const handleSubmit = () => {
        console.log({
            name, mobile, email, address, state, city, aadhar, subCaste, gotra, services, experience,
            profilePhoto, photos, youtubeLink, instagramLink, whatsappLink,
        });
    };

    return (
        <SafeAreaView contentContainerStyle={styles.container}>
            <StatusBar 
                barStyle="dark-content" 
                backgroundColor="transparent" 
                translucent 
            />
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
                    <TextInput style={styles.input} value={subCaste} onChangeText={setSubCaste} />

                    <Text style={styles.label}>You are Registering for </Text>
                    <Dropdown
                        style={styles.input}
                        data={roleOptions}
                        labelField="label"
                        valueField="value"
                        value={role}
                        onChange={item => setRole(item.value)}
                        placeholder="Select a role"
                    />

                    <Text style={styles.label}>Services Provided</Text>
                    <Dropdown
                        style={styles.input}
                        data={servicesOptions[role]}
                        labelField="label"
                        valueField="value"
                        value={services}
                        onChange={item => setServices(item.value)}
                        placeholder="Select a service"
                    />

                    <Text style={styles.label}>Experience</Text>
                    <Dropdown
                        style={styles.input}
                        data={[{ label: '01', value: '01' }, { label: '02', value: '02' }]}
                        labelField="label"
                        valueField="value"
                        value={experience}
                        onChange={item => setExperience(item.value)}
                        placeholder="Select Experience"
                    />

                    <Text style={styles.label}>Profile Photo</Text>
                    <TextInput style={styles.input} value={profilePhoto} onChangeText={setProfilePhoto} />

                    <View style={styles.photopickContainer}>
                        <Text style={styles.label}>Photos (Up to 5)</Text>
                        <TouchableOpacity style={styles.PickPhotoButton} onPress={handleImagePick}>
                            <Text style={styles.PickPhotoText}>Pick Photos</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Display uploaded photos */}
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

                    <Text style={styles.label}>Website Link</Text>
                    <TextInput style={styles.input} value={websiteLink} onChangeText={setWebsiteLink} />

                    <Text style={styles.label}>Youtube Link</Text>
                    <TextInput style={styles.input} value={youtubeLink} onChangeText={setYoutubeLink} />

                    <Text style={styles.label}>Facebook Link</Text>
                    <TextInput style={styles.input} value={facebookLink} onChangeText={setFacebookLink} />

                    <Text style={styles.label}>Instagram Link</Text>
                    <TextInput style={styles.input} value={instagramLink} onChangeText={setInstagramLink} />

                    <Text style={styles.label}>Whatsapp Link</Text>
                    <TextInput style={styles.input} value={whatsappLink} onChangeText={setWhatsappLink} />

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default RoleRegisterForm;
