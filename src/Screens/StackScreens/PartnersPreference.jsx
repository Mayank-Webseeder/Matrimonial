import { Text, View, TextInput, ScrollView, SafeAreaView, StatusBar, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/PartnerPreferenceStyle';
import { TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CREATE_PARTNER_PERFRENCES, UPDATE_PARTNER_PERFRENCES } from '../../utils/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Globalstyles from '../../utils/GlobalCss';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import Entypo from 'react-native-vector-icons/Entypo';

import {
    OccupationData, QualificationData, FamilyTypeData,
    FamilyFinancialStatusData, PartnersLiveinData, BodyStructureData, ComplexionData, DietHabit, Disabilities, subCasteOptions,
    PartnermaritalStatusData, PartnersmokingStatusData, PartnerDrinkingHabit, PartnerManglikStatusData, Income, CityData, StateData
} from '../../DummyData/DropdownData';

const PartnersPreference = ({ navigation }) => {
    const [isEditing, setIsEditing] = useState(true);
    const [stateInput, setStateInput] = useState('');
    const [subCasteInput, setSubCasteInput] = useState('');
    const [filteredStates, setFilteredStates] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [filteredSubCaste, setFilteredSubCaste] = useState([]);
    const [cityInput, setCityInput] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [originalBiodata, setOriginalBiodata] = useState({});
    const [selectedSubCaste, setSelectedSubCaste] = useState('');
    const [loading, setLoading] = useState(false);

    // console.log("profileData", profileData);

    const MyprofileData = useSelector((state) => state.getBiodata);
    const myPartnerPreferences = MyprofileData?.Biodata?.partnerPreferences;

    const [biodata, setBiodata] = useState({
        partnerSubCaste: '',
        partnerMinAge: '',
        partnerMaxAge: '',
        partnerMinHeightFeet: '',
        partnerMaxHeightFeet: '',
        partnerMaritalStatus: '',
        partnerIncome: '',
        partnerOccupation: '',
        partnerQualification: '',
        partnerDisabilities: '',
        partnerManglikStatus: '',
        partnersLivingStatus: '',
        partnerState: '',
        partnerCity: '',
        partnerBodyStructure: '',
        partnerComplexion: '',
        partnerDietaryHabits: '',
        partnerSmokingHabits: '',
        partnerDrinkingHabits: '',
        partnerExpectations: '',
        partnerFamilyType: '',
        partnerFamilyFinancialStatus: '',
        partnerFamilyIncome: '',
    });

    useEffect(() => {
        if (myPartnerPreferences) {
            setBiodata((prev) => ({
                ...prev,
                ...myPartnerPreferences, // Spread new data from Redux
            }));
        }
    }, [myPartnerPreferences]); // Runs when `myPartnerPreferences` changes
    const handleStateInputChange = (text) => {
        setStateInput(text);
        if (text) {
            const filtered = StateData.filter((item) =>
                item?.label?.toLowerCase().includes(text.toLowerCase())
            ).map(item => item.label);
            setFilteredStates(filtered);
        } else {
            setFilteredStates([]);
        }
        setBiodata(prevState => ({
            ...prevState,
            partnerState: text,
        }));
    };

    // Handle state selection to update both the input field and biodata.partnerState
    const handleStateSelect = (item) => {
        setStateInput(item);
        setSelectedState(item);
        setBiodata(prevBiodata => ({
            ...prevBiodata,
            partnerState: item, // Correct key
        }));
        setFilteredStates([]);
    };

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

        setBiodata(prevState => ({
            ...prevState,
            partnerCity: text, // Save in biodata
        }));
    };


    // Handle city selection to update both the input field and biodata.partnerCity
    const handleCitySelect = (item) => {
        setCityInput(item);
        setBiodata(prevState => ({
            ...prevState,
            partnerCity: item, // Save selected city
        }));
        setFilteredCities([]);
    };

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
        setBiodata(prevState => ({
            ...prevState,
            partnerSubCaste: text,
        }));
    };

    // Sub Caste input handler
    const handleSubCasteSelect = (item) => {
        setSubCasteInput(item);
        setSelectedSubCaste(item);
        setBiodata(prevBiodata => ({
            ...prevBiodata,
            partnerSubCaste: item, // Correct key
        }));
        setFilteredSubCaste([]);
    };

    const ageData = Array.from({ length: 82 }, (_, i) => ({
        label: `${18 + i}`,
        value: `${18 + i}`,
    }));


    const heightData = Array.from({ length: 4 }, (_, feetIndex) =>
        Array.from({ length: 12 }, (_, inchesIndex) => ({
            label: `${4 + feetIndex} ' ${inchesIndex} '' `,
            value: `${4 + feetIndex}-${inchesIndex}`,
        }))
    ).flat();

    const handleSave = async () => {
        try {
            setLoading(true);

            const token = await AsyncStorage.getItem("userToken");
            if (!token) throw new Error("No token found");

            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            };

            let payload = {};

            if (biodata?._id) {
                Object.keys(biodata).forEach((key) => {
                    if (biodata[key] !== originalBiodata[key]) {
                        payload[key] = biodata[key];
                    }
                });

                if (Object.keys(payload).length === 0) {
                    Toast.show({
                        type: "info",
                        text1: "No changes detected.",
                        text2: "You haven't made any modifications.",
                        position: "top",
                        visibilityTime: 3000,
                        textStyle: { fontSize: 12, color: "blue" },
                    });
                    setLoading(false);
                    return;
                }
            } else {
                payload = {
                    partnerSubCaste: biodata.partnerSubCaste || "",
                    partnerMinAge: biodata.partnerMinAge || "",
                    partnerMaxAge: biodata.partnerMaxAge || "",
                    partnerMinHeightFeet: biodata.partnerMinHeightFeet || "",
                    partnerMaxHeightFeet: biodata.partnerMaxHeightFeet || "",
                    partnerMaritalStatus: biodata.partnerMaritalStatus || "",
                    partnerIncome: biodata.partnerIncome || "",
                    partnerOccupation: biodata.partnerOccupation || "",
                    partnerQualification: biodata.partnerQualification || "",
                    partnerDisabilities: biodata.partnerDisabilities || "",
                    partnerManglikStatus: biodata.partnerManglikStatus || "",
                    partnersLivingStatus: biodata.partnersLivingStatus || "",
                    partnerState: biodata.partnerState || "",
                    partnerCity: biodata.partnerCity || "",
                    partnerBodyStructure: biodata.partnerBodyStructure || "",
                    partnerComplexion: biodata.partnerComplexion || "",
                    partnerDietaryHabits: biodata.partnerDietaryHabits || "",
                    partnerSmokingHabits: biodata.partnerSmokingHabits || "",
                    partnerDrinkingHabits: biodata.partnerDrinkingHabits || "",
                    partnerFamilyType: biodata.partnerFamilyType || "",
                    partnerFamilyFinancialStatus: biodata.partnerFamilyFinancialStatus || "",
                    partnerFamilyIncome: biodata.partnerFamilyIncome || "",
                    partnerExpectations: biodata.partnerExpectations || "",
                };
            }

            console.log("Payload:", payload);

            const apiCall = biodata?._id ? axios.put : axios.post;
            const endpoint = biodata?._id ? UPDATE_PARTNER_PERFRENCES : CREATE_PARTNER_PERFRENCES;
            const response = await apiCall(endpoint, payload, { headers });

            console.log("Save response:", response.data);

            if (response.status === 200 && response.data.status.toLowerCase() === "success") {
                Toast.show({
                    type: "success",
                    text1: biodata?._id ? "Partner Preferences Updated Successfully" : "Partner Preferences Created Successfully",
                    text2: response.data.message || "Your changes have been saved!",
                    position: "top",
                });

                setIsEditing(false);
                setTimeout(() => {
                    navigation.navigate("MainApp");
                }, 1000);
                return; // ✅ Success case handled, no need for `catch`
            }

            throw new Error(response.data.message || "Something went wrong");

        } catch (error) {
            if (error.response) {
                console.error("API Error:", error.response.data);
            } else {
                console.error("Unexpected Error:", error.message);
            }

            // ✅ Show error only if it's an actual error
            if (error.message.toLowerCase() !== "biodata updated successfully.") {
                Toast.show({
                    type: "error",
                    text1: "Error",
                    text2: error.response?.data?.message || error.message || "Something went wrong",
                    position: "top",
                    visibilityTime: 2000,
                    textStyle: { fontSize: 12, color: "red" },
                });
            }
        } finally {
            setLoading(false);
        }
    };



    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />

            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                <View style={Globalstyles.form}>
                    <View style={styles.detail}>
                        <Text style={styles.Formtitle}>Preferences</Text>
                        {myPartnerPreferences && (
                            <TouchableOpacity onPress={() => setIsEditing(true)}>
                                <Text style={styles.detailText}>Edit</Text>
                            </TouchableOpacity>
                        )}

                    </View>
                    <Text style={Globalstyles.title}>Sub-Caste <Entypo name={'star'} color={'red'} size={12} /> </Text>
                    <TextInput
                        style={Globalstyles.input}
                        value={biodata?.partnerSubCaste}
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
                                <TouchableOpacity onPress={() => handleSubCasteSelect(item)}>
                                    <Text style={Globalstyles.listItem}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            style={Globalstyles.suggestions}
                        />
                    ) : null}

                    <Text style={Globalstyles.title}>Age Criteria <Entypo name={'star'} color={'red'} size={12} /> </Text>
                    <View style={styles.row}>
                        <Dropdown
                            style={[styles.dropdown, !isEditing && styles.readOnly]}
                            data={ageData}
                            labelField="label"
                            valueField="value"
                            value={biodata.partnerMinAge}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerMinAge: item.value })}
                            placeholder="Min Age"
                            placeholderStyle={{ color: '#E7E7E7' }}

                        />
                        <Dropdown
                            style={[styles.dropdown, !isEditing && styles.readOnly]}
                            data={ageData}
                            labelField="label"
                            valueField="value"
                            value={biodata.partnerMaxAge}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerMaxAge: item.value })}
                            placeholder="Max Age"
                            placeholderStyle={{ color: '#E7E7E7' }}
                        />
                    </View>
                    <Text style={Globalstyles.title}>Height Criteria <Entypo name={'star'} color={'red'} size={12} /> </Text>
                    <View style={styles.row}>
                        <Dropdown
                            style={[styles.dropdown, !isEditing && styles.readOnly]}
                            data={heightData}
                            labelField="label"
                            valueField="value"
                            value={biodata.partnerMinHeightFeet}
                            editable={isEditing}
                            onChange={(item) => {
                                setBiodata({
                                    ...biodata,
                                    partnerMinHeightFeet: item.value,
                                });
                            }}
                            placeholder="Min Height"
                            placeholderStyle={{ color: '#E7E7E7' }}
                        />
                        <Dropdown
                            style={[styles.dropdown, !isEditing && styles.readOnly]}
                            data={heightData}
                            labelField="label"
                            valueField="value"
                            value={biodata.partnerMaxHeightFeet}
                            editable={isEditing}
                            onChange={(item) => {
                                setBiodata({
                                    ...biodata,
                                    partnerMaxHeightFeet: item.value,
                                });
                            }}
                            placeholder="Max Height"
                            placeholderStyle={{ color: '#E7E7E7' }}
                        />
                    </View>
                    <View>
                        <Text style={Globalstyles.title}>Partners Marital Status <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={PartnermaritalStatusData}
                            labelField="label"
                            valueField="value"
                            value={biodata.partnerMaritalStatus}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerMaritalStatus: item.value })}
                            placeholder="Select status"
                            placeholderStyle={{ color: '#E7E7E7' }}
                        />
                        <Text style={Globalstyles.title}>Income Range (in INR) <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={Income}
                            labelField="label"
                            valueField="value"
                            value={biodata.partnerIncome}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerIncome: item.value })}
                            placeholder="Income"
                            placeholderStyle={{ color: '#E7E7E7' }}
                        />
                        <Text style={Globalstyles.title}>Occupation <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={OccupationData}
                            labelField="label"
                            valueField="value"
                            value={biodata.partnerOccupation}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerOccupation: item.value })}
                            placeholder="Select occupdation"
                            placeholderStyle={{ color: '#E7E7E7' }}
                        />

                        <Text style={styles.inputHeading}>Qualification <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={QualificationData}
                            labelField="label"
                            valueField="value"
                            value={biodata.partnerQualification}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerQualification: item.value })}
                            placeholder="Select Qualification"
                            placeholderStyle={{ color: '#E7E7E7' }}
                        />
                        <Text style={Globalstyles.title}>Disabilities (Physical/Mental) <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={Disabilities}
                            labelField="label"
                            valueField="value"
                            value={biodata.partnerDisabilities}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerDisabilities: item.value })}
                            placeholder="Select disability"
                            placeholderStyle={{ color: '#E7E7E7' }}
                        />
                        <Text style={Globalstyles.title}>Manglik Status <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={PartnerManglikStatusData}
                            labelField="label"
                            valueField="value"
                            value={biodata.partnerManglikStatus}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerManglikStatus: item.value })}
                            placeholder="Select status"
                            placeholderStyle={{ color: '#E7E7E7' }}
                        />
                        <Text style={Globalstyles.title}>Partners Livein <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={PartnersLiveinData}
                            labelField="label"
                            valueField="value"
                            value={biodata.partnersLivingStatus}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnersLivingStatus: item.value })}
                            placeholder="Select Livein"
                            placeholderStyle={{ color: '#E7E7E7' }}
                        />
                        <Text style={[Globalstyles.title, { color: Colors.theme_color }]}>Area</Text>
                        <Text style={Globalstyles.title}>State <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <TextInput
                            style={Globalstyles.input}
                            value={biodata?.partnerState}
                            onChangeText={handleStateInputChange}
                            placeholder="Type your State"
                            placeholderTextColor={Colors.gray}
                        />
                        {filteredStates.length > 0 && stateInput ? (
                            <FlatList
                                data={filteredStates.slice(0, 5)}
                                scrollEnabled={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => handleStateSelect(item)}>
                                        <Text style={Globalstyles.listItem}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                                style={Globalstyles.suggestions}
                            />
                        ) : null}
                        <Text style={Globalstyles.title}>City / Village  <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <TextInput
                            style={Globalstyles.input}
                            value={biodata?.partnerCity}
                            onChangeText={handleCityInputChange}
                            placeholder="Type your city/village"
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
                        <Text style={Globalstyles.title}>Partners body Structure <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={BodyStructureData}
                            labelField="label"
                            valueField="value"
                            value={biodata.partnerBodyStructure}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerBodyStructure: item.value })}
                            placeholder="Select structure" placeholderStyle={{ color: '#E7E7E7' }}
                        />
                        <Text style={Globalstyles.title}>Complexion <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={ComplexionData}
                            labelField="label"
                            valueField="value"
                            value={biodata.partnerComplexion}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerComplexion: item.value })}
                            placeholder="Select Complexion"
                            placeholderStyle={{ color: '#E7E7E7' }}
                        />
                        <Text style={Globalstyles.title}>Partner Dietary Habits <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={DietHabit}
                            labelField="label"
                            valueField="value"
                            value={biodata.partnerDietaryHabits}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerDietaryHabits: item.value })}
                            placeholder="Select Diet"
                            placeholderStyle={{ color: '#E7E7E7' }}
                        />
                        <Text style={Globalstyles.title}>Smoking Habits <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={PartnersmokingStatusData}
                            labelField="label"
                            valueField="value"
                            value={biodata.partnerSmokingHabits}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerSmokingHabits: item.value })}
                            placeholder="Select smoking"
                            placeholderStyle={{ color: '#E7E7E7' }}
                        />
                        <Text style={Globalstyles.title}>Drinking Habits <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={PartnerDrinkingHabit}
                            labelField="label"
                            valueField="value"
                            value={biodata.partnerDrinkingHabits}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerDrinkingHabits: item.value })}
                            placeholder="Select Habit"
                            placeholderStyle={{ color: '#E7E7E7' }}
                        />
                        <Text style={Globalstyles.title}>Family Type <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={FamilyTypeData}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Family Type"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            value={biodata.partnerFamilyType}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerFamilyType: item.value })}
                        />
                        <Text style={Globalstyles.title}>Family Financial Status <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={FamilyFinancialStatusData}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Family Financial Status"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            value={biodata.partnerFamilyFinancialStatus}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerFamilyFinancialStatus: item.value })}
                        />
                        <Text style={Globalstyles.title}>Family Income <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <Dropdown
                            style={Globalstyles.input}
                            data={Income}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Family Income"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            value={biodata.partnerFamilyIncome}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerFamilyIncome: item.value })}
                        />
                        <Text style={Globalstyles.title}>Expectations from Partner <Entypo name={'star'} color={'red'} size={12} /> </Text>
                        <TextInput style={Globalstyles.textInput}
                            multiline={true} numberOfLines={6}
                            value={biodata.partnerExpectations}
                            editable={isEditing}
                            placeholder='Type Your Expectations'
                            placeholderTextColor={Colors.gray}
                            onChangeText={(text) =>
                                setBiodata({ ...biodata, partnerExpectations: text })
                            }
                            textAlignVertical='top' />

                        <TouchableOpacity style={styles.button} onPress={handleSave}>
                            {loading ? (
                                <ActivityIndicator size={'large'} color={Colors.light} />
                            ) : (
                                <Text style={styles.buttonText}>Submit</Text>
                            )}
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
            <Toast />
        </SafeAreaView>
    )
}

export default PartnersPreference