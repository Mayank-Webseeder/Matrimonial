import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, ScrollView, StatusBar, SafeAreaView, FlatList } from 'react-native';
import Colors from '../../utils/Colors';
import { SH, SW, SF } from '../../utils/Dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';
import ImageCropPicker from 'react-native-image-crop-picker';
import { CityData, subCasteOptions } from '../../DummyData/DropdownData';
import Entypo from 'react-native-vector-icons/Entypo';

const DharamsalaSubmissionPage = ({ navigation }) => {
    const [dharamsalaName, setDharamsalaName] = useState('');
    const [contact, setContact] = useState('');
    const [description, setDescription] = useState('');
    const [photos, setPhotos] = useState([]);
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
        if (photos.length + newPhotos.length <= 3) {
            setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
        } else {
            alert('You can only upload up to 3 photos.');
        }
    };

    const handleSubmit = () => {
        if (!dharamsalaName || !subCasteInput || !cityInput || !photos) {
            Alert.alert('Error', 'All mandatory fields must be filled.');
            return;
        }

        const formData = {
            dharamsalaName,
            subCasteInput,
            cityInput,
            description,
            photos,
        };

        console.log('Submitted Data:', formData);
        Alert.alert('Success', 'Dharamsala details submitted successfully!');
    };

    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons
                            name="arrow-back-ios-new"
                            size={25}
                            color={Colors.theme_color}
                        />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Dharmshala</Text>
                </View>

            </View>
            <View style={Globalstyles.form}>
                <Text style={styles.title}>Upload Your Dharamsala Details</Text>

                <Text style={Globalstyles.title}>Dharamsala Name <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter Dharamsala Name"
                    value={dharamsalaName}
                    onChangeText={setDharamsalaName}
                    placeholderTextColor={Colors.gray}
                />

                <Text style={Globalstyles.title}>Sub-Caste Name <Entypo name={'star'} color={'red'} size={12} /></Text>
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


                <Text style={Globalstyles.title}>City <Entypo name={'star'} color={'red'} size={12} /></Text>
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

                <Text style={Globalstyles.title}>Contact <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter Person's Contact No."
                    value={contact}
                    onChangeText={setContact}
                    placeholderTextColor={Colors.gray}
                />

                <Text style={Globalstyles.title}>Description (Optional)</Text>
                <TextInput
                    style={[Globalstyles.input, styles.textArea]}
                    placeholder="Enter Description"
                    value={description}
                    onChangeText={setDescription}
                    placeholderTextColor={Colors.gray}
                    multiline={true}
                />
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={Globalstyles.title}>Upload Images (Max Limit 3) <Entypo name={'star'} color={'red'} size={12} /> </Text>
                    <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
                        <Text style={styles.uploadButtonText}>
                            {photos ? 'add Image' : 'Upload Image'}
                        </Text>
                    </TouchableOpacity>
                </View>
                {photos.length > 0 && (
                    <View style={styles.imagePreview}>
                        {/* <Text style={styles.label}>Uploaded Photos:</Text> */}
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {photos.map((photo, index) => (
                                <Image key={index} source={{ uri: photo.uri }} style={styles.photo} />
                            ))}
                        </ScrollView>
                    </View>
                )}

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

    title: {
        fontSize: SF(15),
        fontFamily: "Poppins-Medium",
        color: Colors.theme_color,
        marginBottom: SH(20),

    },

    textArea: {
        height: SH(100),
        textAlignVertical: 'top',
    },
    uploadButton: {
        backgroundColor: Colors.theme_color,
        paddingVertical: SW(5),
        borderRadius: 5,
        alignItems: 'center',
        paddingHorizontal: SW(7)
    },
    uploadButtonText: {
        color: Colors.light,
        fontFamily: "poppins-Medium",
        fontSize: SF(11)
    },
    imagePreview: {
        width: '100%',
        // height: SH(50),
        borderRadius: 5,
        marginBottom: SH(15),
    },
    photo: {
        width: SW(70),
        height: SH(70),
        marginHorizontal: SW(5),
        marginVertical: SH(5),
        borderRadius: 10,
    },
    submitButton: {
        backgroundColor: Colors.theme_color,
        padding: SW(10),
        borderRadius: 5,
        alignItems: 'center',
        marginTop: SH(30),
        marginHorizontal: SW(50)
    },
    submitButtonText: {
        color: Colors.light,
        fontFamily: "poppins-Medium",
        fontSize: SF(13)
    },
    contentContainer: {
        margin: SW(15),
        marginTop: 0
    }
});

export default DharamsalaSubmissionPage;
