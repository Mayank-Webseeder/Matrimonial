import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, ScrollView, SafeAreaView, StatusBar,FlatList } from 'react-native';
import Colors from '../../utils/Colors';
import { SH, SW, SF } from '../../utils/Dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';
import ImageCropPicker from 'react-native-image-crop-picker';
import { CityData,subCasteOptions } from '../../DummyData/DropdownData';
const CommitteeSubmissionPage = ({ navigation }) => {
    const [dharamsalaName, setDharamsalaName] = useState('');
    const [area, setArea] = useState('');
    const [image, setImage] = useState(null);
    const [contact, setContact] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageName, setSelectedImageName] = useState("Upload Image");

     const [subCasteInput, setSubCasteInput] = useState('');
        const [cityInput, setCityInput] = useState('');
        const [filteredCities, setFilteredCities] = useState([]);
        const [filteredSubCaste, setFilteredSubCaste] = useState([]);
        const [selectedCity, setSelectedCity] = useState('');
        const [selectedSubCaste, setSelectedSubCaste] = useState('');


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
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
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
                <Text style={Globalstyles.title}>Committee President Name *</Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter President Name"
                    value={dharamsalaName}
                    onChangeText={setDharamsalaName}
                    placeholderTextColor={Colors.gray}
                />

                <Text style={Globalstyles.title}>Sub-Caste Name *</Text>
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



                <Text style={Globalstyles.title}>City *</Text>
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

                <Text style={Globalstyles.title}>Area *</Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter Your Area"
                    value={area}
                    onChangeText={setArea}
                    placeholderTextColor={Colors.gray}
                />

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={Globalstyles.title}>Upload President Image *</Text>
                    <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
                        <Text style={styles.uploadButtonText}>
                            {selectedImage ? 'Change Image' : 'Upload Image'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Image Preview */}
                {selectedImage && (
                    <View style={styles.imagePreviewContainer}>
                        <Text style={Globalstyles.title}>Uploaded Image</Text>
                        <Text style={styles.imageName}>{selectedImageName}</Text>
                    </View>
                )}


                <Text style={Globalstyles.title}>Contact Number Of President *</Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter Contact No."
                    value={contact}
                    onChangeText={setContact}
                    placeholderTextColor={Colors.gray}
                />

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
        paddingHorizontal: SW(6)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SW(10),
        paddingVertical: SH(10),
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
    imagePreviewContainer: {
        marginVertical: SH(15)
    },
    imageName: {
        color: Colors.dark,
        fontFamily: "Poppins-Regular",
        fontSize: SF(11),
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
