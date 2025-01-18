import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, ScrollView,SafeAreaView,StatusBar } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Colors from '../../utils/Colors';
import { SH, SW, SF } from '../../utils/Dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';

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
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar 
                barStyle="dark-content" 
                backgroundColor="transparent" 
                translucent 
            />
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row',alignItems:"center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons
                            name="arrow-back-ios-new"
                            size={25}
                            color={Colors.theme_color}
                        />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Committee</Text>
                </View>
            </View>
            <View style={Globalstyles.form}>
                <Text style={styles.title}>Upload Committee Details</Text>

                {/* Dharamsala Name */}
                <Text style={Globalstyles.title}>Committee Name *</Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter Committee Name"
                    value={dharamsalaName}
                    onChangeText={setDharamsalaName}
                    placeholderTextColor={'gray'}
                />

                <Text style={Globalstyles.title}>Sub-Caste Name *</Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter Sub-Caste Name"
                    value={subCasteName}
                    onChangeText={setSubCasteName}
                    placeholderTextColor={'gray'}
                />

                <Text style={Globalstyles.title}>City *</Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter City"
                    value={city}
                    onChangeText={setCity}
                    placeholderTextColor={'gray'}
                />

                <Text style={Globalstyles.title}>Area *</Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter Area"
                    value={area}
                    onChangeText={setArea}
                    placeholderTextColor={'gray'}
                />

                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={Globalstyles.label}>Upload Your Committe Image *</Text>
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
        paddingTop: SH(25),
        paddingHorizontal:SW(6)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SW(10),
        paddingVertical:SH(10),
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
        paddingHorizontal: SW(10),
        paddingVertical: SH(7),
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: SH(50),
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
