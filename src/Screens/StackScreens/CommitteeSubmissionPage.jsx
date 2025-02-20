import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, StatusBar, FlatList } from 'react-native';
import Colors from '../../utils/Colors';
import { SH, SW, SF } from '../../utils/Dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Globalstyles from '../../utils/GlobalCss';
import ImageCropPicker from 'react-native-image-crop-picker';
import { CityData, subCasteOptions } from '../../DummyData/DropdownData';
import Entypo from 'react-native-vector-icons/Entypo';
import { CREATE_COMMITTEE, UPDATE_COMMITTEE, GET_COMMIITEE } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
const CommitteeSubmissionPage = ({ navigation }) => {
    const [subCasteInput, setSubCasteInput] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
    const [filteredSubCaste, setFilteredSubCaste] = useState([]);
    const [isLoading, setIsLoading] = useState('');
    const [isEditing,setIsEditing]=useState(true);
    const [CommitteeData, setCommitteeData] = useState({
        committeeTitle: '',
        presidentName: '',
        subCaste: '',
        city: '',
        area: ' ',
        photoUrl: '',
        mobileNo: ' '
    });

    useEffect(() => {
        const fetchCommitteeData = async () => {
            try {
                setIsLoading(true);
                const token = await AsyncStorage.getItem("userToken");
                if (!token) {
                    Toast.show({
                        type: "error",
                        text1: "Error",
                        text2: "Authorization token is missing.",
                    });
                    return;
                }
    
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
    
                const response = await axios.get(GET_COMMIITEE, { headers });
    
                if (response.status === 200 && response.data?.data) {
                    setCommitteeData(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching committee data:", error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchCommitteeData();
    }, []);
    

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

        setCommitteeData(prevActivistData => ({
            ...prevActivistData,
            city: text,
        }));
    };

    const handleCitySelect = (item) => {
        setCityInput(item);
        setCommitteeData(prevCommitteeData => ({
            ...prevCommitteeData,
            city: item,
        }));
        setFilteredCities([]);
    };

    const handleSubCasteInputChange = (text) => {
        setSubCasteInput(text);

        if (text) {
            const filtered = subCasteOptions
                .filter((item) => item?.label?.toLowerCase().includes(text.toLowerCase()))
                .map((item) => item.label);

            setFilteredSubCaste(filtered);
        } else {
            setFilteredSubCaste([]);
        }
        setCommitteeData((prevCommitteeData) => ({
            ...prevCommitteeData,
            subCaste: text,
        }));
    };

    const handleSubCasteSelect = (selectedItem) => {
        setSubCasteInput(selectedItem);
        setFilteredSubCaste([]);
        setCommitteeData((prevCommitteeData) => ({
            ...prevCommitteeData,
            subCaste: selectedItem,
        }));
    };

    const handleImagePick = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 250,
            cropping: true,
            includeBase64: true,
            mediaType: "photo"
        })
            .then(image => {
                setCommitteeData(prev => ({
                    ...prev,
                    photoUrl: `data:${image.mime};base64,${image.data}`,
                }));
            })
            .catch(error => {
                if (error.code !== "E_PICKER_CANCELLED") {
                    console.error("Image Picking Error:", error);
                }
            });
    };


   const convertToBase64 = async (imageUri) => {
      try {
        if (!imageUri) return null;
        if (imageUri.startsWith("data:image")) {
          return imageUri;
        }
    
        const response = await fetch(imageUri);
        const blob = await response.blob();
  
        const mimeType = blob.type || "image/jpeg"; 
    
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            if (reader.result) {
              resolve(`data:${mimeType};base64,${reader.result.split(",")[1]}`);
            } else {
              reject("Error reading Base64 data.");
            }
          };
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error("Error converting image to Base64:", error);
        return null;
      }
    };
    
    const constructActivistPayload = async (ActivistData, isNew = false) => {
      const keys = [
        "fullname", "subCaste", "dob", "state", "city",
        "mobileNo", "knownActivistIds", "engagedWithCommittee", "profilePhoto"
      ];
    
      const payload = {};
      for (const key of keys) {
        if (CommitteeData[key] !== undefined && CommitteeData[key] !== "") {
          payload[key] = CommitteeData[key];
        } else if (isNew) {
          payload[key] = "";
        }
      }
  
      if (payload.dob) {
        const parsedDate = moment(payload.dob.split("T")[0], "YYYY-MM-DD", true);
        if (parsedDate.isValid()) {
          payload.dob = parsedDate.format("DD/MM/YYYY");
        } else {
          console.error("Invalid DOB format received:", payload.dob);
          throw new Error("Invalid DOB format. Expected format is DD/MM/YYYY.");
        }
      }
    
      if (CommitteeData.photoUrl) {
        try {
          payload.photoUrl = await convertToBase64(CommitteeData.photoUrl);
          
          console.log("Converted Base64 Image:", payload.photoUrl);
        } catch (error) {
          console.error("Base64 Conversion Error:", error);
        }
      }    
    
      return payload;
    };


    const handleActivistSave = async () => {
        try {
            setIsLoading(true);
            const token = await AsyncStorage.getItem("userToken");
            if (!token) {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: "Authorization token is missing.",
                });
                return;
            }

            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            const payload = await constructActivistPayload(CommitteeData, !CommitteeData?._id);
            console.log("Payload:", payload);
            const apiCall = CommitteeData?._id ? axios.patch : axios.post;
            const endpoint = CommitteeData?._id ? `${UPDATE_COMMITTEE}` : CREATE_COMMITTEE;

            const response = await apiCall(endpoint, payload, { headers });
            console.log("API Response:", response.data);
            if (response.status === 200 || response.status === 201) {
                Toast.show({
                    type: "success",
                    text1: CommitteeData?._id ? "Profile Updated Successfully" : "Activist Profile Created Successfully",
                    text2: response.data.message || "Your changes have been saved!",
                });

                setIsEditing(false);
                if (!CommitteeData?._id && response.data?.data?._id) {
                    setCommitteeData((prev) => ({
                        ...prev,
                        _id: response.data.data._id,
                    }));
                }
                return; 
            }
            throw new Error(response.data.message || "Something went wrong");

        } catch (error) {
            if (error.response) {
                console.error("API Error:", error.response.data);
            } else {
                console.error("Unexpected Error:", error.message);
            }
            Toast.show({
                type: "error",
                text1: "Error",
                text2: error.response?.data?.message || "Failed to save activist data.",
            });

        } finally {
            setIsLoading(false);
        }
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
            <ScrollView style={Globalstyles.form}>
                <Text style={styles.title}>Upload Committee Details</Text>

                <Text style={Globalstyles.title}>Committee title <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter title"
                    value={CommitteeData.committeeTitle}
                    onChangeText={(text) => setCommitteeData((prev) => ({ ...prev, committeeTitle: text }))} placeholderTextColor={Colors.gray}
                />

                {/* Dharamsala Name */}
                <Text style={Globalstyles.title}>Committee President Name <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter President Name"
                    value={CommitteeData.presidentName}
                    onChangeText={(text) => setCommitteeData((prev) => ({ ...prev, presidentName: text }))}
                    placeholderTextColor={Colors.gray}
                />

                <Text style={Globalstyles.title}>Sub-Caste <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    value={CommitteeData?.subCaste} // `myBiodata?.subCaste` ki jagah `subCasteInput` use karein
                    onChangeText={handleSubCasteInputChange}
                    placeholder="Type your sub caste"
                    placeholderTextColor={Colors.gray}
                />

                {/* Agar user type karega toh list dikhegi */}
                {filteredSubCaste.length > 0 ? (
                    <FlatList
                        data={filteredSubCaste.slice(0, 5)}
                        scrollEnabled={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSubCasteSelect(item)}>
                                <Text style={Globalstyles.listItem}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        style={Globalstyles.suggestions}
                    />
                ) : null}


                <Text style={Globalstyles.title}>City <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    value={CommitteeData?.city}
                    onChangeText={handleCityInputChange}
                    placeholder="Enter your city"
                    placeholderTextColor={Colors.gray}
                />
                {filteredCities.length > 0 && cityInput ? (
                    <FlatList
                        data={filteredCities.slice(0, 5)}
                        scrollEnabled={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleCitySelect(item)}>
                                <Text style={Globalstyles.listItem}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        style={Globalstyles.suggestions}
                    />
                ) : null}

                <Text style={Globalstyles.title}>Area <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter Your Area"
                    value={CommitteeData.area} onChangeText={(text) => setCommitteeData((prev) => ({ ...prev, area: text }))}
                    placeholderTextColor={Colors.gray}
                />

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginVertical: SH(10) }}>
                    <Text style={Globalstyles.title}>Upload President Image <Entypo name={'star'} color={'red'} size={12} /></Text>
                    <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
                        <Text style={styles.uploadButtonText}>{CommitteeData.profilePhoto ? "Change Image" : "Upload Image"}</Text>
                    </TouchableOpacity>
                </View>
                {CommitteeData.photoUrl ? (
                        <Image
                            source={{ uri: CommitteeData.photoUrl }}
                            style={styles.imagePreviewContainer}
                        />
                    ) : null}

                <Text style={Globalstyles.title}>Contact Number Of President <Entypo name={'star'} color={'red'} size={12} /></Text>
                <TextInput
                    style={Globalstyles.input}
                    placeholder="Enter contact number"
                    keyboardType="numeric"
                    maxLength={10}
                    placeholderTextColor={Colors.gray}
                    value={CommitteeData.mobileNo} onChangeText={(text) => setCommitteeData((prev) => ({ ...prev, mobileNo: text }))}
                />

                <TouchableOpacity style={styles.submitButton} onPress={handleActivistSave}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
            <Toast/>
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
        fontSize: SF(15),
        fontFamily: "Poppins-Medium",
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
        marginVertical: SH(10),
        width: SW(70),
        height: SH(70),
        borderRadius: 10
    },
    imageName: {
        color: Colors.dark,
        fontFamily: "Poppins-Regular",
        fontSize: SF(11),
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
