import { Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { SH, SW, SF } from '../../utils/Dimensions';
import Globalstyles from '../../utils/GlobalCss';
import ImageCropPicker from 'react-native-image-crop-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { POST_SUCESS_sTORY } from '../../utils/BaseUrl';

const PostSuccessStories = ({ navigation }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [gromname, setGromname] = useState('');
    const [bridename, setBridename] = useState('');
    const [groomBiodataId, setGroomBiodataId] = useState('');
    const [brideBiodataId, setBrideBiodataId] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [weddingDate, setWeddingDate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [errors, setErrors] = useState({});

    const validateFields = () => {
        const newErrors = {};

        if (!gromname?.trim()) {
            newErrors.gromname = "Groom name is required.";
        } else if (!/^[A-Za-z\s]+$/.test(gromname)) {
            newErrors.groomName = "Groom name must contain only letters.";
        }

        if (!groomBiodataId?.trim()) {
            newErrors.groomBiodataId = "Groom BioData ID is required.";
        }

        if (!bridename?.trim()) {
            newErrors.bridename = "Bride name is required.";
        } else if (!/^[A-Za-z\s]+$/.test(bridename)) {
            newErrors.bridename = "Bride name must contain only letters.";
        }

        if (!brideBiodataId?.trim()) {
            newErrors.brideBiodataId = "Bride BioData ID is required.";
        }

        if (!comment) {
            newErrors.comment = "Your thought is required.";
        }

        // if (!weddingDate) {
        //     newErrors.weddingDate = "Wedding date is required.";
        // } else {
        //     const today = new Date();
        //     const selected = new Date(weddingDate);
        //     if (selected > today) {
        //         newErrors.weddingDate = "Wedding date cannot be in the future.";
        //     }
        // }

        if (!rating) {
            newErrors.rating = "Rating is required.";
        } else if (isNaN(rating) || rating < 1 || rating > 5) {
            newErrors.rating = "Rating must be between 1 and 5.";
        }

        setErrors(newErrors); // If you're using a state to display field errors
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async () => {
        if (!validateFields()) return;
        try {
            const token = await AsyncStorage.getItem('userToken'); // ✅ Fetch Token
            if (!token) throw new Error('No token found');

            const payload = {
                groomName: gromname,
                groomBiodataId: groomBiodataId,
                brideName: bridename,
                brideBiodataId: brideBiodataId,
                thought: comment,
                rating: rating,
                photoUrl: selectedImage,
                weddingDate: weddingDate,
            };

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            console.log('Payload:', payload);
            console.log("headers", headers);

            const response = await axios.post(
                POST_SUCESS_sTORY,
                payload,
                { headers }
            );

            console.log("✅ Success Story Response:", JSON.stringify(response.data));

            if (response.status === 200 && response.data.status === true) {
                showMessage({
                    type: 'success',
                    message: 'Success',
                    description: response.data.message || 'Your success story has been submitted!',
                    icon: "success"
                });

                setTimeout(() => {
                    navigation.goBack();
                }, 2000);
            } else {
                throw new Error(response.data.message || "Something went wrong!");
            }

        } catch (error) {
            console.error('❌ Error submitting success story:', error.response?.data?.message);

            let errorMessage = 'Failed to submit success story. Please try again later.';

            if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            showMessage({
                type: 'danger',
                message: errorMessage,
                icon: "danger"
            });
        }
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    };

    const onChangeDate = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setWeddingDate(formatDate(selectedDate));
        }
    };

    const handleImagePick = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 250,
            cropping: true,
            compressImageQuality: 1,
            includeBase64: true,
        })
            .then(image => {
                setSelectedImage(`data:${image.mime};base64,${image.data}`);
            })
            .catch(error => {
                console.error('Image Picking Error:', error);
            });
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <TouchableOpacity key={i} onPress={() => setRating(i)}>
                    <Entypo
                        name={i <= rating ? 'star' : 'star-outlined'}
                        size={30}
                        color={'#FF9900'}
                        style={styles.star}
                    />
                </TouchableOpacity>
            );
        }
        return stars;
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
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Post Story</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={Globalstyles.form}>
                    <Text style={styles.Text}>Post Your Success Story</Text>
                    <Text style={styles.description}>Share your experience with Brahmin Milan </Text>
                    <View style={styles.ratingContainer}>
                        {renderStars()}
                    </View>
                    {errors.rating && (
                        <Text style={styles.errorText}>{errors.rating}</Text>
                    )}
                    <Text style={Globalstyles.title}>Groom name <Entypo name={'star'} color={'red'} size={12} /> </Text>
                    <TextInput
                        style={Globalstyles.input}
                        placeholder="Enter groom name"
                        multiline={true}
                        value={gromname}
                        onChangeText={(text) => {
                            const cleanText = text.replace(/[^A-Za-z\s]/g, '');
                            setGromname(cleanText);
                        }}
                        placeholderTextColor={Colors.gray}
                        autoComplete="off"
                        textContentType="none"

                    />
                    {errors.gromname && (
                        <Text style={styles.errorText}>{errors.gromname}</Text>
                    )}
                    <Text style={Globalstyles.title}>Groom Biodata ID  <Entypo name={'star'} color={'red'} size={12} /> </Text>
                    <TextInput
                        style={Globalstyles.input}
                        placeholder="Enter Groom Biodata ID"
                        multiline={true}
                        value={groomBiodataId}
                        onChangeText={setGroomBiodataId}
                        placeholderTextColor={Colors.gray}
                        autoComplete="off"
                        textContentType="none"

                    />
                    {errors.groomBiodataId && (
                        <Text style={styles.errorText}>{errors.groomBiodataId}</Text>
                    )}
                    <Text style={Globalstyles.title}>Bride name  <Entypo name={'star'} color={'red'} size={12} /> </Text>
                    <TextInput
                        style={Globalstyles.input}
                        placeholder="Enter Bride name"
                        multiline={true}
                        value={bridename}
                        onChangeText={(text) => {
                            const cleanText = text.replace(/[^A-Za-z\s]/g, '');
                            setBridename(cleanText);
                        }}
                        placeholderTextColor={Colors.gray}
                        autoComplete="off"
                        textContentType="none"
                    />
                    {errors.bridename && (
                        <Text style={styles.errorText}>{errors.bridename}</Text>
                    )}
                    <Text style={Globalstyles.title}>Bride Biodata ID  <Entypo name={'star'} color={'red'} size={12} /> </Text>
                    <TextInput
                        style={Globalstyles.input}
                        placeholder="Enter Bride Biodata ID"
                        multiline={true}
                        value={brideBiodataId}
                        onChangeText={setBrideBiodataId}
                        placeholderTextColor={Colors.gray}
                        autoComplete="off"
                        textContentType="none"
                    />
                    {errors.brideBiodataId && (
                        <Text style={styles.errorText}>{errors.brideBiodataId}</Text>
                    )}
                    {/* <Text style={Globalstyles.title}>Wedding Date</Text>
                    <TouchableOpacity
                        style={Globalstyles.input}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={{ color: weddingDate ? '#000' : Colors.gray }}>
                            {weddingDate || 'Select Wedding Date'}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                            maximumDate={new Date()}
                        />
                    )} */}
                    <Text style={Globalstyles.title}>Your thoughts <Entypo name={'star'} color={'red'} size={12} /> </Text>
                    <TextInput
                        style={Globalstyles.textInput}
                        placeholder="Add your thoughts..."
                        multiline={true}
                        value={comment}
                        onChangeText={setComment}
                        placeholderTextColor={Colors.gray} textAlignVertical='top'
                        autoComplete="off"
                        textContentType="none"
                    />
                    {errors.comment && (
                        <Text style={styles.errorText}>{errors.comment}</Text>
                    )}
                    <Text style={Globalstyles.title}>Upload your one couple picture</Text>
                    <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
                        <Text style={styles.uploadText}>{selectedImage ? 'Change Image' : 'Upload Image'}</Text>
                    </TouchableOpacity>
                    {selectedImage && (
                        <View style={styles.photosContainer}>
                            <Text style={Globalstyles.title}>Uploaded Image</Text>
                            <Image
                                source={{ uri: selectedImage }}
                                style={{ width: SW(100), height: SH(100), borderRadius: 10 }}
                                resizeMode="cover"
                            />
                        </View>
                    )}
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitText}>Post Story</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PostSuccessStories;

const styles = StyleSheet.create({

    Text: {
        fontSize: SF(24),
        fontFamily: "Poppins-Bold",
        color: Colors.theme_color,
    },

    description: {
        fontSize: SF(13),
        color: Colors.theme_color,
        marginBottom: SH(10),
        fontFamily: "Poppins-Bold"
    },
    submitButton: {
        backgroundColor: Colors.theme_color,
        paddingHorizontal: SW(15),
        paddingVertical: SH(7),
        borderRadius: 5,
        alignItems: 'center',
    },
    submitText: {
        color: 'white',
        fontSize: SF(15),
        fontFamily: "Poppins-Bold"
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SH(10)
    },
    star: {
        marginHorizontal: SW(3),
    },
    menuIcon: {
        width: SW(30),
        height: SH(30)
    },
    uploadButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: SW(10),
        paddingVertical: SH(10),
        alignItems: 'center',
        marginBottom: SH(15),
    },
    uploadText: {
        color: Colors.theme_color,
        textAlign: "center"
    },
    photosContainer: {
        paddingVertical: SH(10),
    },
    errorText: {
        color: 'red',
        fontSize: SF(13),
        fontFamily: "Poppins-Regular"
    },
})
