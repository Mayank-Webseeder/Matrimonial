import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, ScrollView,SafeAreaView,StatusBar } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Colors from '../../utils/Colors';
import { SH, SW, SF } from '../../utils/Dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CommitteeSubmissionPage = ({ navigation }) => {
    const [dharamsalaName, setDharamsalaName] = useState('');
    const [subCasteName, setSubCasteName] = useState('');
    const [city, setCity] = useState('');
    const [area, setArea] = useState('');
    const [image, setImage] = useState(null);

    const handleImageUpload = async () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                Alert.alert('Image Upload Cancelled');
            } else if (response.errorCode) {
                Alert.alert('Error', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                setImage(response.assets[0].uri);
            }
        });
    };

    const handleSubmit = () => {
        if (!dharamsalaName || !subCasteName || !city || !area || !image) {
            Alert.alert('Error', 'All mandatory fields must be filled.');
            return;
        }

        const formData = {
            dharamsalaName,
            subCasteName,
            city,
            area,
            image,
        };

        console.log('Submitted Data:', formData);
        Alert.alert('Success', 'Committee details submitted successfully!');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar 
                barStyle="dark-content" 
                backgroundColor="transparent" 
                translucent 
            />
            <View style={styles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Community')}>
                        <MaterialIcons
                            name="arrow-back-ios-new"
                            size={25}
                            color={Colors.theme_color}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Committee</Text>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Upload Committee Details</Text>

                {/* Dharamsala Name */}
                <Text style={styles.label}>Committee Name *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Committee Name"
                    value={dharamsalaName}
                    onChangeText={setDharamsalaName}
                    placeholderTextColor={'gray'}
                />

                <Text style={styles.label}>Sub-Caste Name *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Sub-Caste Name"
                    value={subCasteName}
                    onChangeText={setSubCasteName}
                    placeholderTextColor={'gray'}
                />

                <Text style={styles.label}>City *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter City"
                    value={city}
                    onChangeText={setCity}
                    placeholderTextColor={'gray'}
                />

                <Text style={styles.label}>Area *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Area"
                    value={area}
                    onChangeText={setArea}
                    placeholderTextColor={'gray'}
                />

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.label}>Upload Your Committe Image *</Text>
                    <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
                        <Text style={styles.uploadButtonText}>
                            {image ? 'Change Image' : 'Upload Image'}
                        </Text>
                    </TouchableOpacity>
                </View>
                {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light,
        paddingTop: SW(20),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: SW(10),
        paddingLeft: 0,
    },
    headerText: {
        color: Colors.theme_color,
        fontSize: SF(15),
        fontFamily: "Poppins-Regular",
    },
    title: {
        fontSize: SF(13),
        fontWeight: 'bold',
        color: Colors.theme_color,
        marginBottom: SH(20),
    },
    label: {
        fontSize: SF(13),
        fontFamily: "Poppins-Medium",
        color: Colors.dark,
        marginBottom: SH(5),
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.gray,
        borderRadius: 5,
        padding: SW(7),
        marginBottom: SH(10),
    },
    uploadButton: {
        backgroundColor: Colors.theme_color,
        padding: SW(5),
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: SH(15),
        width: SW(100),
    },
    uploadButtonText: {
        color: Colors.light,
        fontFamily: "Poppins-Medium",
        fontSize: SF(11),
    },
    imagePreview: {
        width: '100%',
        height: SH(200),
        borderRadius: 5,
        marginBottom: SH(15),
    },
    submitButton: {
        backgroundColor: Colors.theme_color,
        padding: SW(10),
        borderRadius: 5,
        alignItems: 'center',
        margin: SH(50),
        marginHorizontal: SW(50),
    },
    submitButtonText: {
        color: Colors.light,
        fontFamily: "Poppins-Medium",
        fontSize: SF(13),
    },
    contentContainer: {
        margin: SW(15),
        marginTop: 0,
    },
});

export default CommitteeSubmissionPage;
