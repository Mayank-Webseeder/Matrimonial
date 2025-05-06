import { Text, View, TextInput, ScrollView, SafeAreaView, StatusBar, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/PartnerPreferenceStyle';
import { TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CREATE_PARTNER_PERFRENCES, UPDATE_PARTNER_PERFRENCES, GET_BIODATA } from '../../utils/BaseUrl';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Globalstyles from '../../utils/GlobalCss';
import { useSelector } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import { useFocusEffect } from '@react-navigation/native';
import { setBioData } from '../../ReduxStore/Slices/BiodataSlice';
import { useDispatch } from 'react-redux';
import {
    PartnerOccupationData, FamilyTypeData,
    FamilyFinancialStatusData, PartnersLiveinData, BodyStructureData, ComplexionData, PartnerQualificationData, PartnerDietHabit, Disabilities, subCasteOptions,
    PartnermaritalStatusData, PartnersmokingStatusData, PartnerDrinkingHabit, PartnerManglikStatusData, PartnerFamliyIncome, Income, CityData, StateData
} from '../../DummyData/DropdownData';
import { showMessage } from 'react-native-flash-message';

const PartnersPreference = ({ navigation, profileData }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(true);
    const [stateInput, setStateInput] = useState('');
    const [subCasteInput, setSubCasteInput] = useState('');
    const [filteredStates, setFilteredStates] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [filteredSubCaste, setFilteredSubCaste] = useState([]);
    const [cityInput, setCityInput] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [originalBiodata, setOriginalBiodata] = useState({});
    const [selectedSubCaste, setSelectedSubCaste] = useState('');
    const [loading, setLoading] = useState(false);
    const MyprofileData = useSelector((state) => state.getBiodata);
    const [mybiodata, setMyBiodata] = useState({});
    const myPartnerPreferences = profileData?.partnerPreferences || mybiodata?.partnerPreferences;

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
        getBiodata();
        console.log("mybiodata", JSON.stringify(mybiodata));
    }, [])


    const getBiodata = async () => {
        try {
            setMyBiodata("")
            const token = await AsyncStorage.getItem('userToken');
            if (!token) throw new Error('No token found');

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };

            const response = await axios.get(GET_BIODATA, { headers });
            if (response.data) {
                const fetchedData = response.data.data;
                console.log("My bio data in home page", fetchedData);
                setMyBiodata(fetchedData);
                dispatch(setBioData(fetchedData));
            } else {
                setMyBiodata({});
            }
        } catch (error) {
            console.error("Error fetching biodata:", error);
        }
    };


    useEffect(() => {
        if (myPartnerPreferences) {
            setBiodata((prev) => ({
                ...prev,
                ...myPartnerPreferences,
            }));
        }
    }, [myPartnerPreferences]);

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

    const handleCitySelect = (item) => {
        setCityInput(item);
        setBiodata(prevState => ({
            ...prevState,
            partnerCity: item,
        }));
        setFilteredCities([]);
    };

    const handleSubCasteInputChange = (text) => {
        const filtered = subCasteOptions
            .filter((item) =>
                item?.label?.toLowerCase().includes(text.toLowerCase())
            )
            .map((item) => item.label);

        // Only allow typing if there's a match
        if (filtered.length > 0) {
            setSubCasteInput(text);
            setFilteredSubCaste(filtered);
            setBiodata((prevState) => ({
                ...prevState,
                partnerSubCaste: text,
            }));
        } else {
            // Show only "Other" when no match found
            setFilteredSubCaste(['Other']);
        }
    };
    const handleSubCasteSelect = (item) => {
        setSubCasteInput(item === 'Other' ? 'Other' : item);
        setSelectedSubCaste(item);
        setBiodata((prevBiodata) => ({
            ...prevBiodata,
            partnerSubCaste: item === 'Other' ? 'Other' : item,
        }));
        setFilteredSubCaste([]);
    };

    const ageData = Array.from({ length: 82 }, (_, i) => ({
        label: `${18 + i}`,
        value: `${18 + i}`,
    }));


    const heightData = Array.from({ length: 4 }, (_, feetIndex) =>
        Array.from({ length: 12 }, (_, inchesIndex) => ({
            label: `${4 + feetIndex}' ${inchesIndex}'' `,
            value: `${4 + feetIndex}' ${inchesIndex}'' `,
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
            let isUpdating = Boolean(biodata?._id);

            if (isUpdating) {
                Object.keys(biodata).forEach((key) => {
                    if (biodata[key] !== originalBiodata[key]) {
                        payload[key] = biodata[key];
                    }
                });

                if (Object.keys(payload).length === 0) {
                    setLoading(false);
                    return;
                }
            } else {
                payload = {
                    partnerSubCaste: biodata?.partnerSubCaste || "",
                    partnerMinAge: biodata?.partnerMinAge || "",
                    partnerMaxAge: biodata?.partnerMaxAge || "",
                    partnerMinHeightFeet: biodata?.partnerMinHeightFeet || "",
                    partnerMaxHeightFeet: biodata?.partnerMaxHeightFeet || "",
                    partnerMaritalStatus: biodata.partnerMaritalStatus || "",
                    partnerIncome: biodata?.partnerIncome || "",
                    partnerOccupation: biodata?.partnerOccupation || "",
                    partnerQualification: biodata?.partnerQualification || "",
                    partnerDisabilities: biodata?.partnerDisabilities || "",
                    partnerManglikStatus: biodata?.partnerManglikStatus || "",
                    partnersLivingStatus: biodata?.partnersLivingStatus || "",
                    partnerState: biodata?.partnerState || "",
                    partnerCity: biodata?.partnerCity || "",
                    partnerBodyStructure: biodata?.partnerBodyStructure || "",
                    partnerComplexion: biodata?.partnerComplexion || "",
                    partnerDietaryHabits: biodata?.partnerDietaryHabits || "",
                    partnerSmokingHabits: biodata?.partnerSmokingHabits || "",
                    partnerDrinkingHabits: biodata?.partnerDrinkingHabits || "",
                    partnerFamilyType: biodata?.partnerFamilyType || "",
                    partnerFamilyFinancialStatus: biodata?.partnerFamilyFinancialStatus || "",
                    partnerFamilyIncome: biodata?.partnerFamilyIncome || "",
                    partnerExpectations: biodata?.partnerExpectations || "",
                };
            }

            const apiCall = isUpdating ? axios.put : axios.post;
            const endpoint = isUpdating ? UPDATE_PARTNER_PERFRENCES : CREATE_PARTNER_PERFRENCES;

            const response = await apiCall(endpoint, payload, { headers });

            if (response.status === 200 && response.data.status === true) {
                const successMessage = isUpdating
                    ? "Partner Preferences Updated Successfully!"
                    : "Partner Preferences Created Successfully!";

                showMessage({
                    message: successMessage,
                    type: 'success',
                    duration: 3000,
                    icon: "success"
                });

                if (!isUpdating && response.data._id) {
                    setBiodata((prev) => ({ ...prev, _id: response.data._id }));
                }

                setIsEditing(false);
                setTimeout(() => {
                    navigation.replace("ProfileDetail", { profileType: "Biodata" });
                }, 1000);
                return;
            }

            throw new Error(response.data.message || "Something went wrong");
        } catch (error) {
            console.error("🚨 API Error:", error.response?.data || error.message);

            let errorMessage = "Something went wrong!";
            if (error.response?.status === 400) {
                errorMessage = error.response.data?.message || "Bad request.";
            }

            showMessage({
                message: errorMessage,
                type: 'danger',
                icon: 'danger',
                duration: 3000,
            });
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
                        <Text style={styles.Formtitle}>Set Your Preference </Text>
                    </View>
                    <Text style={Globalstyles.title}>Sub-Caste  </Text>
                    <Dropdown
                        style={[Globalstyles.input, !isEditing && styles.readOnly]}
                        data={subCasteOptions}
                        labelField="label"
                        valueField="value"
                        value={biodata?.partnerSubCaste}
                        editable={isEditing}
                        onChange={(item) => setBiodata({ ...biodata, partnerSubCaste: item.value })}
                        placeholder="Select subCaste"
                        placeholderStyle={{ color: '#E7E7E7' }}
                        autoScroll={false}
                        showsVerticalScrollIndicator={false}
                    />
                    {/* <TextInput
                        style={Globalstyles.input}
                        value={biodata?.partnerSubCaste}
                        onChangeText={handleSubCasteInputChange}
                        placeholder="Enter your sub caste"
                        placeholderTextColor={Colors.gray}
                        autoComplete="off"
                        textContentType="none"
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
                    ) : null} */}

                    <Text style={Globalstyles.title}>Age Criteria  </Text>
                    <View style={styles.row}>
                        <Dropdown
                            style={[styles.dropdown, !isEditing && styles.readOnly]}
                            data={ageData}
                            labelField="label"
                            valueField="value"
                            value={biodata?.partnerMinAge}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerMinAge: item.value })}
                            placeholder="Min Age"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}

                        />
                        <Dropdown
                            style={[styles.dropdown, !isEditing && styles.readOnly]}
                            data={ageData}
                            labelField="label"
                            valueField="value"
                            value={biodata?.partnerMaxAge}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerMaxAge: item.value })}
                            placeholder="Max Age"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <Text style={Globalstyles.title}>Height Criteria  </Text>
                    <View style={styles.row}>
                        <Dropdown
                            style={[styles.dropdown, !isEditing && styles.readOnly]}
                            data={heightData}
                            labelField="label"
                            valueField="value"
                            value={biodata?.partnerMinHeightFeet}
                            editable={isEditing}
                            onChange={(item) => {
                                setBiodata({
                                    ...biodata,
                                    partnerMinHeightFeet: item.value,
                                });
                            }}
                            placeholder="Min Height"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                        />
                        <Dropdown
                            style={[styles.dropdown, !isEditing && styles.readOnly]}
                            data={heightData}
                            labelField="label"
                            valueField="value"
                            value={biodata?.partnerMaxHeightFeet}
                            editable={isEditing}
                            onChange={(item) => {
                                setBiodata({
                                    ...biodata,
                                    partnerMaxHeightFeet: item.value,
                                });
                            }}
                            placeholder="Max Height"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                    <View>
                        <Text style={Globalstyles.title}>Partners Marital Status  </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={PartnermaritalStatusData}
                            labelField="label"
                            valueField="value"
                            value={biodata?.partnerMaritalStatus}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerMaritalStatus: item.value })}
                            placeholder="Select status"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                        />
                        <Text style={Globalstyles.title}>Income Range (in INR)  </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={PartnerFamliyIncome}
                            labelField="label"
                            valueField="value"
                            value={biodata?.partnerIncome}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerIncome: item.value })}
                            placeholder="Income"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                        />
                        <Text style={Globalstyles.title}>Occupation </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={PartnerOccupationData}
                            labelField="label"
                            valueField="value"
                            value={biodata?.partnerOccupation}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerOccupation: item.value })}
                            placeholder="Select occupdation"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                        />

                        <Text style={styles.inputHeading}>Qualification  </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={PartnerQualificationData}
                            labelField="label"
                            valueField="value"
                            value={biodata?.partnerQualification}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerQualification: item.value })}
                            placeholder="Select Qualification"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                        />
                        <Text style={Globalstyles.title}>Disabilities (Physical/Mental)  </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={Disabilities}
                            labelField="label"
                            valueField="value"
                            value={biodata?.partnerDisabilities}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerDisabilities: item.value })}
                            placeholder="Select disability"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                        />
                        <Text style={Globalstyles.title}>Manglik Status  </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={PartnerManglikStatusData}
                            labelField="label"
                            valueField="value"
                            value={biodata?.partnerManglikStatus}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerManglikStatus: item.value })}
                            placeholder="Select status"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                        />
                        {/* <Text style={Globalstyles.title}>Partners Livein  </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={PartnersLiveinData}
                            labelField="label"
                            valueField="value"
                            value={biodata?.partnersLivingStatus}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnersLivingStatus: item.value })}
                            placeholder="Select Livein"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                        /> */}
                        <Text style={[Globalstyles.title, { color: Colors.theme_color }]}>Locality</Text>
                        <Text style={Globalstyles.title}>State  </Text>
                        <TextInput
                            style={Globalstyles.input}
                            value={biodata?.partnerState}
                            onChangeText={handleStateInputChange}
                            placeholder="Type your State"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
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
                        <Text style={Globalstyles.title}>City / Village   </Text>
                        <TextInput
                            style={Globalstyles.input}
                            value={biodata?.partnerCity}
                            onChangeText={handleCityInputChange}
                            placeholder="Type your city/village"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
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
                        {/* <Text style={Globalstyles.title}>Partners body Structure  </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={BodyStructureData}
                            labelField="label"
                            valueField="value"
                            value={biodata?.partnerBodyStructure}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerBodyStructure: item.value })}
                            placeholder="Select structure" placeholderStyle={{ color: '#E7E7E7' }}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                        /> */}
                        <Text style={Globalstyles.title}>Complexion  </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={ComplexionData}
                            labelField="label"
                            valueField="value"
                            value={biodata?.partnerComplexion}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerComplexion: item.value })}
                            placeholder="Select Complexion"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                        />
                        <Text style={Globalstyles.title}>Partner Dietary Habits  </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={PartnerDietHabit}
                            labelField="label"
                            valueField="value"
                            value={biodata?.partnerDietaryHabits}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerDietaryHabits: item.value })}
                            placeholder="Select Diet"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                        />
                        <Text style={Globalstyles.title}>Smoking Habits  </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={PartnersmokingStatusData}
                            labelField="label"
                            valueField="value"
                            value={biodata?.partnerSmokingHabits}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerSmokingHabits: item.value })}
                            placeholder="Select smoking"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                        />
                        <Text style={Globalstyles.title}>Drinking Habits  </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={PartnerDrinkingHabit}
                            labelField="label"
                            valueField="value"
                            value={biodata?.partnerDrinkingHabits}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerDrinkingHabits: item.value })}
                            placeholder="Select Habit"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                        />
                        <Text style={Globalstyles.title}>Family Type  </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={FamilyTypeData}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Family Type"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            value={biodata?.partnerFamilyType}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerFamilyType: item.value })}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false} />
                        {/* <Text style={Globalstyles.title}>Family Financial Status  </Text>
                        <Dropdown
                            style={[Globalstyles.input, !isEditing && styles.readOnly]}
                            data={FamilyFinancialStatusData}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Family Financial Status"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            value={biodata?.partnerFamilyFinancialStatus}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerFamilyFinancialStatus: item.value })}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                        /> */}
                        {/* <Text style={Globalstyles.title}>Family Income  </Text>
                        <Dropdown
                            style={Globalstyles.input}
                            data={PartnerFamliyIncome}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Family Income"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            value={biodata?.partnerFamilyIncome}
                            editable={isEditing}
                            onChange={(item) => setBiodata({ ...biodata, partnerFamilyIncome: item.value })}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                        /> */}
                        <Text style={Globalstyles.title}>Expectations from Partner  </Text>
                        <TextInput style={Globalstyles.textInput}
                            multiline={true} numberOfLines={6}
                            value={biodata?.partnerExpectations}
                            editable={isEditing}
                            placeholder='Type Your Expectations'
                            placeholderTextColor={Colors.gray}
                            onChangeText={(text) =>
                                setBiodata({ ...biodata, partnerExpectations: text })
                            }
                            textAlignVertical='top'
                            autoComplete="off"
                            textContentType="none" />
                        {
                            loading ?
                                <ActivityIndicator size="large" color={Colors.theme_color} />
                                :
                                <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PartnersPreference