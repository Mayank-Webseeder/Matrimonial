import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, ScrollView,StatusBar,SafeAreaView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Colors from '../../utils/Colors';
import { SH, SW, SF } from '../../utils/Dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';

const DharamsalaSubmissionPage = ({navigation}) => {
    const [dharamsalaName, setDharamsalaName] = useState('');
    const [subCasteName, setSubCasteName] = useState('');
    const [city, setCity] = useState('');
    const [description, setDescription] = useState('');
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
        if (!dharamsalaName || !subCasteName || !city || !image) {
            Alert.alert('Error', 'All mandatory fields must be filled.');
            return;
        }

        const formData = {
            dharamsalaName,
            subCasteName,
            city,
            description,
            image,
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
                    <TouchableOpacity onPress={() => navigation.navigate('Dharmshala')}>
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

                <Text style={Globalstyles.title}>Dharamsala Name *</Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter Dharamsala Name"
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

                <Text style={Globalstyles.title}>Description (Optional)</Text>
                <TextInput
                    style={[Globalstyles.input, styles.textArea]}
                    placeholder="Enter Description"
                    value={description}
                    onChangeText={setDescription}
                    placeholderTextColor={'gray'}
                    multiline
                />

              <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
              <Text style={Globalstyles.title}>Upload Dharamsala Image *</Text>
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
   
    title: {
        fontSize: SF(13),
        fontWeight: 'bold',
        color: Colors.theme_color,
        // textAlign: 'center',
        marginBottom: SH(20),
       
    },
    
    textArea: {
        height: SH(100),
        textAlignVertical: 'top',
    },
    uploadButton: {
        backgroundColor: Colors.theme_color,
        padding: SW(5),
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: SH(15),
        width: SW(100)
    },
    uploadButtonText: {
        color: Colors.light,
        fontFamily: "poppins-Medium",
        fontSize: SF(11)
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
        marginHorizontal: SW(50)
    },
    submitButtonText: {
        color: Colors.light,
        fontFamily: "poppins-Medium",
        fontSize: SF(13)
    },
    contentContainer:{
        margin:SW(15),
        marginTop:0
    }
});

export default DharamsalaSubmissionPage;
