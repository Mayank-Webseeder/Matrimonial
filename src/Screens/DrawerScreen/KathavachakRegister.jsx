import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../StyleScreens/PanditRegisterStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { Dropdown } from 'react-native-element-dropdown';

const KathavachakRegister = () => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [aadhar, setAadhar] = useState('');
    const [subCaste, setSubCaste] = useState('');
    const [gotra, setGotra] = useState('');
    const [services, setServices] = useState(' ');
    const [experience, setExperience] = useState(' ');
    const [profilePhoto, setProfilePhoto] = useState(' ');
    const [photo, setPhoto] = useState(' ');
    const [youtubeLink, setYoutubeLink] = useState('');
    const [instagramLink, setInstagramLink] = useState('');
    const [whatsappLink, setWhatsappLink] = useState('');

    const servicesOptions = [
        { label: 'Pooja', value: 'Pooja' },
    ];

    const experienceOptions = [
        { label: '01', value: '01' },
        { label: '02', value: '02' }
    ];

    const handleSubmit = () => {
        console.log({
            name, mobile, email, address, state, city, aadhar, subCaste, gotra, services, experience,
            profilePhoto, photo, youtubeLink, instagramLink, whatsappLink,
        });
    };

    return (
        <View contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Tabs')} style={{ flexDirection: "row" }}>
                    <MaterialIcons name={'arrow-back-ios-new'} size={20} color={Colors.theme_color} />
                    <Text style={{ color: Colors.theme_color }}>Pandit</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.form}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} />

                    <Text style={styles.label}>Mobile No.</Text>
                    <TextInput style={styles.input} value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />

                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

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

                    <Text style={styles.label}>Gotra</Text>
                    <TextInput style={styles.input} value={gotra} onChangeText={setGotra} />

                    <Text style={styles.label}>Services Provided</Text>
                    <Dropdown
                        style={styles.input}
                        data={servicesOptions}
                        labelField="label"
                        valueField="value"
                        value={services}
                        onChange={item => setServices(item.value)}
                        placeholder="Select a service"
                    />

                    <Text style={styles.label}>Experience</Text>
                    <Dropdown
                        style={styles.input}
                        data={experienceOptions}
                        labelField="label"
                        valueField="value"
                        value={experience}
                        onChange={item => setExperience(item.value)}
                        placeholder="Select Experience"
                    />

                    <Text style={styles.label}>Profile Photo</Text>
                    <TextInput style={styles.input} value={profilePhoto} onChangeText={setProfilePhoto} />

                    <Text style={styles.label}>Photo</Text>
                    <TextInput style={styles.input} value={photo} onChangeText={setPhoto} />

                    <Text style={styles.label}>Youtube Link</Text>
                    <TextInput style={styles.input} value={youtubeLink} onChangeText={setYoutubeLink} />

                    <Text style={styles.label}>Instagram Link</Text>
                    <TextInput style={styles.input} value={instagramLink} onChangeText={setInstagramLink} />

                    <Text style={styles.label}>Whatsapp Link</Text>
                    <TextInput style={styles.input} value={whatsappLink} onChangeText={setWhatsappLink} />

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default KathavachakRegister;
