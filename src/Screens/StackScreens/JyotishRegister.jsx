import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StatusBar, FlatList, ActivityIndicator, Modal, Alert, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import styles from '../StyleScreens/RoleRegisterStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { Checkbox } from 'react-native-paper';
import Globalstyles from '../../utils/GlobalCss';
import { StateData, CityData, panditServices, jyotishServices, kathavachakServices, ExperienceData } from '../../DummyData/DropdownData';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CREATE_JYOTISH, FREE_TRIAL, JYOISH_PLANS, PAID_URL, PAYMENT_VERIFICATION, PROFILE_TYPE, RAZORPAY } from '../../utils/BaseUrl';
import { Dropdown } from 'react-native-element-dropdown';
import ImageCropPicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import RazorpayCheckout from 'react-native-razorpay';
import { showMessage } from 'react-native-flash-message';
import { launchImageLibrary } from 'react-native-image-picker';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SF } from '../../utils/Dimensions';

const JyotishRegister = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [cityInput, setCityInput] = useState('');
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [checked, setChecked] = useState({});
    const [photos, setPhotos] = useState([]);
    const [subCasteInput, setSubCasteInput] = useState('');
    const [filteredStates, setFilteredStates] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [filteredSubCaste, setFilteredSubCaste] = useState([]);
    const ProfileData = useSelector((state) => state.profile);
    const profileData = ProfileData?.profiledata || {};
    const hasTrial = profileData.serviceSubscriptions?.some(
        (sub) => sub.subscriptionType === 'Trial' && sub.serviceType === 'Jyotish'
    );
    const [fetchProfileDetails, setFetchProfileDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [trialLoading, setTrialLoading] = useState(false);
    const [buyLoading, setBuyLoading] = useState(false);
    const [buyingPlanId, setBuyingPlanId] = useState(null);
    const [TrialPlanId, setTrialPlanId] = useState(null);
    const [plans, setPlans] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedState, setSelectedState] = useState(fetchProfileDetails?.state || null);
    const [isFocus, setIsFocus] = useState(false);

    const [RoleRegisterData, setRoleRegisterData] = useState({
        mobileNo: '',
        fullName: '',
        residentialAddress: '',
        area: '',
        state: '',
        city: '',
        aadharNo: '',
        subCaste: '',
        profilePhoto: '',
        additionalPhotos: [],
        experience: '',
        description: '',
        websiteUrl: '',
        facebookUrl: '',
        youtubeUrl: '',
        instagramUrl: '',
        whatsapp: '',
    });


    const [tempUrlData, setTempUrlData] = useState({});

    const validateAndSetUrl = (text, type) => {
        setTempUrlData((prev) => ({ ...prev, [type]: text }));
    };

    useEffect(() => {
        if (fetchProfileDetails) {
            setRoleRegisterData(prev => ({
                ...prev,
                mobileNo: fetchProfileDetails.mobileNo || '',
                fullName: fetchProfileDetails.fullName || '',
                state: fetchProfileDetails.state || '',
                city: fetchProfileDetails.city || '',
                aadharNo: fetchProfileDetails.aadharNo || '',
                residentialAddress: fetchProfileDetails.residentialAddress || '',
                description: fetchProfileDetails.description || '',
            }));
            if (fetchProfileDetails.state) {
                setSelectedState(fetchProfileDetails.state);
            }
        }
    }, [fetchProfileDetails]);

    const fetchPlans = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) { throw new Error('No token found'); }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const response = await axios.get(JYOISH_PLANS, { headers });
            if (response.data?.status) {
                setPlans(response.data.plans);
            }
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.message;
            console.error('Error fetching plans:', errorMsg);

            const sessionExpiredMessages = [
                'User does not Exist....!Please login again',
                'Invalid token. Please login again',
                'Token has expired. Please login again',
            ];

            if (sessionExpiredMessages.includes(errorMsg)) {
                await AsyncStorage.removeItem('userToken');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AuthStack' }],
                });
            }
        }
    };

    const openModal = () => {
        fetchPlans();
        setModalVisible(true);
    };


    const fetchProfilesDetails = async () => {
        try {
            setIsLoading(true);

            const token = await AsyncStorage.getItem('userToken');

            // ✅ **Select first TRUE category (Only Pandit, Jyotish, Kathavachak)**
            let profileType = null;
            if (profileData.isPandit) { profileType = 'Pandit'; }
            else if (profileData.isJyotish) { profileType = 'Jyotish'; }
            else if (profileData.isKathavachak) { profileType = 'Kathavachak'; }

            if (!profileType) {
                console.log('❌ No valid profileType found.');
                setIsLoading(false);
                return;
            }

            const apiUrl = `${PROFILE_TYPE}/${profileType}`;

            console.log('API Request:');
            console.log('URL:', apiUrl);
            console.log('Headers:', { Authorization: `Bearer ${token}` });

            const response = await axios.get(apiUrl, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log('Full API Response:', JSON.stringify(response.data));

            // ✅ **Filter out Activist profiles**
            if (response.data?.data?.profileType === 'Activist') {
                console.log('❌ Skipping Activist Profile');
                setIsLoading(false);
                return;
            }

            setFetchProfileDetails(response.data.data);
            console.log('Selected Profile Data:', response.data.data);

        } catch (error) {
            console.error('Error fetching profiles:', error);

            if (error.response) {
            } else if (error.request) {
                console.error('No Response Received:', error.request);
            } else {
                console.error('Error Message:', error.message);
            }
            const errorMsg = error.response?.data?.message || error.message;
            console.error('Error fetching biodata:', errorMsg);

            const sessionExpiredMessages = [
                'User does not Exist....!Please login again',
                'Invalid token. Please login again',
                'Token has expired. Please login again',
            ];

            if (sessionExpiredMessages.includes(errorMsg)) {
                await AsyncStorage.removeItem('userToken');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AuthStack' }],
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('profileData:', JSON.stringify(profileData, null, 2));
        fetchProfilesDetails();
    }, [])



    const roleOptions = [
        { label: 'Jyotish', value: 'Jyotish' },
    ];

    const servicesOptions = {
        Pandit: panditServices,
        Jyotish: jyotishServices,
        Kathavachak: kathavachakServices,
    };

    const handleRoleChange = (roleValue) => {
        setSelectedRoles(prevRoles => {
            if (prevRoles.includes(roleValue)) {
                return prevRoles.filter(role => role !== roleValue);
            } else {
                return [...prevRoles, roleValue];
            }
        });
    };

    const handleCheckboxChange = (serviceValue) => {
        setChecked(prevChecked => ({
            ...prevChecked,
            [serviceValue]: !prevChecked[serviceValue],
        }));
    };

    const handleProfilePhotoPick = async () => {
        try {
            const image = await ImageCropPicker.openPicker({
                multiple: false,
                width: 1000,
                height: 1000,
                cropping: true,
                freeStyleCropEnabled: true,
                includeBase64: true,
                compressImageQuality: 1,
                mediaType: 'photo',
                cropperToolbarTitle: 'Crop Image',
                cropperStatusBarColor: '#000000',
                cropperToolbarColor: '#FFFFFF',
                cropperToolbarWidgetColor: '#000000',
                cropperChooseText: 'Done',
                cropperCancelText: 'Cancel',
                immersiveMode: true,
            });

            if (!image.data) {
                console.error('Base64 data missing!');
                return;
            }

            const base64Image = `data:${image.mime};base64,${image.data}`;

            setRoleRegisterData(prevData => ({
                ...prevData,
                profilePhoto: base64Image,
            }));

        } catch (err) {
            console.log('Profile Photo Picker Error:', err);
        }
    };

    const ADDL_LIMIT = 4;

    const handleAdditionalPhotosPick = () => {
        setRoleRegisterData((prev) => {
            const existingCount = prev.additionalPhotos?.length || 0;
            const remainingSlots = ADDL_LIMIT - existingCount;

            if (remainingSlots <= 0) {
                Alert.alert(`You can only upload up to ${ADDL_LIMIT} additional photos.`);
                return prev;
            }

            launchImageLibrary(
                {
                    selectionLimit: remainingSlots,
                    mediaType: "photo",
                    includeBase64: true,
                    maxWidth: 1000,
                    maxHeight: 1000,
                    quality: 1,
                },
                (response) => {
                    if (response.didCancel) return;
                    if (response.errorCode) {
                        console.log("ImagePicker Error:", response.errorMessage);
                        return;
                    }

                    const incoming = response.assets ?? [];
                    const newPhotos = incoming.map(
                        (img) => `data:${img.type};base64,${img.base64}`
                    );

                    setRoleRegisterData((prev2) => {
                        const existing = prev2.additionalPhotos || [];
                        const merged = [...existing, ...newPhotos];

                        return {
                            ...prev2,
                            additionalPhotos: merged.slice(0, ADDL_LIMIT), // ✅ ensure max 4 hi rahe
                        };
                    });
                }
            );

            return prev;
        });
    };


    const handleReplacePhoto = (replaceIndex) => {
        launchImageLibrary(
            {
                selectionLimit: 1,
                mediaType: "photo",
                includeBase64: true,
                maxWidth: 1000,
                maxHeight: 1000,
                quality: 1,
            },
            (response) => {
                if (response.didCancel) return;
                if (response.errorCode) {
                    console.log("ImagePicker Error:", response.errorMessage);
                    return;
                }

                const newImg = response.assets?.[0];
                if (!newImg) return;

                const base64Image = `data:${newImg.type};base64,${newImg.base64}`;

                // Replace specific index image
                setRoleRegisterData((prev) => {
                    const updated = [...prev.additionalPhotos];
                    updated[replaceIndex] = base64Image;
                    return {
                        ...prev,
                        additionalPhotos: updated,
                    };
                });
            }
        );
    };
    const validateForm = (data, checked, servicesOptions) => {
        let errors = {};

        if (!data) { return errors; }

        const allFields = Object.keys(data);
        const OPTIONAL_FIELDS = [
            'residentialAddress', 'additionalPhotos', 'experience', 'websiteUrl',
            'facebookUrl', 'youtubeUrl', 'instagramUrl', 'whatsapp', 'description', 'aadharNo',
        ];
        const MANDATORY_FIELDS = allFields.filter(field => !OPTIONAL_FIELDS.includes(field));

        const urlPatterns = {
            websiteUrl: /^(https?:\/\/)?(?!.*(youtube\.com|youtu\.be|facebook\.com|instagram\.com|wa\.me|api\.whatsapp\.com))([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/\S*)?$/,

            youtubeUrl: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/\S+$/,

            facebookUrl: /^(https?:\/\/)?(www\.|m\.)?facebook\.com\/.+$/,

            instagramUrl: /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.]+(\/)?(\?.*)?$/,

            whatsapp: /^(https?:\/\/)?(api\.whatsapp\.com\/send\?phone=\d+|wa\.me\/\d+)\/?$/,
        };
        // ✅ Validate MANDATORY FIELDS
        MANDATORY_FIELDS.forEach((field) => {
            const value = String(data[field] || '').trim();
            if (!value) {
                errors[field] = `${field} is required.`;
                return;
            }
            if (field === 'mobileNo' && !/^\d{10}$/.test(value)) {
                errors[field] = 'Enter a valid 10-digit mobile number.';
            }
            if (!data.state || !StateData.some(s => s.label === data.state)) {
                errors.state = 'Please select a valid state.';
            }
        });
        const urlFields = ['websiteUrl', 'facebookUrl', 'youtubeUrl', 'instagramUrl', 'whatsapp'];
        const validUrlValues = {}; // Only collect valid URLs here

        // Step 1: Validate each URL field first
        urlFields.forEach((field) => {
            const value = String(data[field] || '').trim();
            const pattern = urlPatterns[field];
            const label = field.replace('Url', '');

            if (value) {
                if (!pattern.test(value)) {
                    errors[field] = `Enter a valid ${label} URL.`; // ✅ Invalid message
                } else {
                    validUrlValues[field] = value; // ✅ Only store valid URLs
                }
            }
        });

        // Step 2: Check for duplicates ONLY among valid URLs
        const seenUrls = new Set();

        Object.entries(validUrlValues).forEach(([field, value]) => {
            if (seenUrls.has(value)) {
                // ✅ Only set duplicate error if no error already exists
                if (!errors[field]) {
                    errors[field] = 'This URL is already used in another field.';
                }
            } else {
                seenUrls.add(value);
            }
        });
        // ✅ Ensure at least one service is selected
        const selectedServices = Object.keys(checked).filter(
            service => servicesOptions.Jyotish.some(opt => opt.value === service) && checked[service]
        );
        if (selectedServices.length === 0) {
            errors.jyotishServices = 'Please select at least one service.';
        }

        return errors;
    };



    const handleSubmit = async () => {
        try {
            console.log('Submitting Jyotish...');
            setIsLoading(true);

            const token = await AsyncStorage.getItem('userToken');
            if (!token) { throw new Error('Authorization token is missing.'); }
            console.log('Token found:', token);

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const commonPayload = {
                mobileNo: RoleRegisterData.mobileNo,
                residentialAddress: RoleRegisterData.residentialAddress,
                aadharNo: RoleRegisterData.aadharNo,
                fullName: RoleRegisterData.fullName,
                state: RoleRegisterData.state,
                city: RoleRegisterData.city,
                // subCaste: RoleRegisterData.subCaste,
                profilePhoto: RoleRegisterData.profilePhoto,
                additionalPhotos: RoleRegisterData.additionalPhotos,
                experience: RoleRegisterData.experience ? String(RoleRegisterData.experience) : '',
                description: RoleRegisterData.description,
                websiteUrl: RoleRegisterData.websiteUrl,
                facebookUrl: RoleRegisterData.facebookUrl,
                youtubeUrl: RoleRegisterData.youtubeUrl,
                instagramUrl: RoleRegisterData.instagramUrl,
                whatsapp: RoleRegisterData.whatsapp,
                status: 'pending',
            };

            const mergedPayload = { ...commonPayload, ...tempUrlData };
            const errors = validateForm(mergedPayload, checked, servicesOptions);
            console.log('mergedPayload:', JSON.stringify(mergedPayload));
            console.log('Validation Errors:', errors);

            if (Object.keys(errors).length > 0) {
                setErrors(errors);
                showMessage({
                    message: 'Please complete all mandatory sections before submitting.',
                    type: 'danger',
                    duration: 4000,
                    icon: 'danger',
                    position: 'bottom',
                });
                setIsLoading(false);
                return;
            }

            const payload = {
                ...commonPayload,
                ...tempUrlData,
                jyotishServices: Object.keys(checked).filter(service =>
                    servicesOptions.Jyotish.some(option => option.value === service) && checked[service]
                ),
            };
            console.log('payload', JSON.stringify(payload));

            const response = await axios.post(CREATE_JYOTISH, payload, { headers });
            console.log('Response:', JSON.stringify(response.data));

            showMessage({
                message: 'Success!',
                description: response.data?.message || 'Registered as Jyotish. Your approval request has been sent.',
                type: 'success',
                icon: 'success',
                duration: 7000,
            });

            await AsyncStorage.removeItem('RoleRegisterData');

            setTimeout(() => {
                navigation.navigate('MainApp');
            }, 5000);

        } catch (error) {
            const errorMessage =
                error?.response?.data?.message ||
                error?.response?.message ||
                error?.message ||
                'Something went wrong!';

            console.error('Error:', errorMessage);

            if (errorMessage.includes('valid Jyotish subscription')) {
                setTimeout(() => {
                    openModal();
                }, 1000);

            } else {
                Alert.alert('Please Wait', errorMessage);
            }

        } finally {
            console.log('Loader Stopped!');
            setIsLoading(false);
        }
    };


    const handleFreeTrial = async (plan) => {
        try {
            setTrialLoading(true);
            setTrialPlanId(plan._id);
            const payload = {
                serviceType: plan.profileType,
                trialPeriod: String(plan.trialPeriod),
            };
            const token = await AsyncStorage.getItem('userToken');
            if (!token) { throw new Error('No token found'); }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            console.log('payload', payload);

            const response = await axios.post(
                FREE_TRIAL,
                payload,
                { headers }
            );

            if (response.data?.status) {
                Alert.alert(
                    'Free Trial Started',
                    response.data.message || `Trial started for ${plan.profileType}`,
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                setModalVisible(false);
                                handleSubmit();
                            },
                        },
                    ]
                );
            } else {
                throw new Error(response.data?.message || 'Something went wrong!');
            }

        } catch (err) {
            const errorMessage = err?.response?.data?.message || err.message || 'Please try again later.';
            console.error('Error starting trial:', err?.response?.data || err.message);

            Alert.alert(
                'Failed to Start Trial',
                errorMessage,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            if (errorMessage === 'Trial already requested or activated for Biodata') {
                                setModalVisible(false);
                                handleSubmit();
                            }
                        },
                    },
                ]
            );
        } finally {
            setTrialLoading(false);
            setTrialPlanId(null);
        }
    };

    const handleBuyNow = async (plan) => {
        try {
            setBuyLoading(true);
            setBuyingPlanId(plan._id);
            const token = await AsyncStorage.getItem('userToken');
            const userId = await AsyncStorage.getItem('userId');

            if (!token || !userId) { throw new Error('Missing user token or ID'); }

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            const keyResponse = await axios.get(
                RAZORPAY,
                { headers }
            );

            const razorpayKey = keyResponse.data?.key;
            if (!razorpayKey) { throw new Error('Failed to fetch Razorpay Key'); }

            const payload = {
                userId,
                profileType: plan?.profileType,
                planId: plan?._id
            };
            console.log(' [Payload to /buy]:', payload);

            const orderResponse = await axios.post(
                PAID_URL,
                payload,
                { headers }
            );

            console.log('🧾 [Order API Response]:', orderResponse.data);

            let orderId, amount, currency;

            if (orderResponse.data?.razorpayOrder) {
                const razorpayOrder = orderResponse.data.razorpayOrder;
                orderId = razorpayOrder.id;
                amount = razorpayOrder.amount;
                currency = razorpayOrder.currency;
            }
            else if (orderResponse.data?.razorpayOrderId) {
                orderId = orderResponse.data.razorpayOrderId;
                amount = orderResponse.data.services?.[0]?.amount * 100 || 50000;
                currency = 'INR';
            }

            if (!orderId || !amount || !currency) {
                throw new Error('Incomplete Razorpay order data received from server');
            }

            const options = {
                description: `Subscription for ${plan.profileType}`,
                currency,
                key: razorpayKey,
                amount,
                name: 'Brahmin Milan',
                order_id: orderId,
                theme: { color: '#3399cc' },
            };

            RazorpayCheckout.open(options)
                .then(async (paymentData) => {
                    console.log(' [Payment Success]:', paymentData);

                    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = paymentData;

                    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
                        Alert.alert('Error', 'Missing payment details from Razorpay.');
                        return;
                    }

                    const verifyPayload = {
                        razorpay_payment_id: razorpay_payment_id,
                        razorpay_order_id: razorpay_order_id,
                        razorpay_signature: razorpay_signature,
                    };

                    console.log(' [Payload to /verifyPayment]:', verifyPayload);

                    try {
                        const verifyResponse = await axios.post(
                            PAYMENT_VERIFICATION,
                            verifyPayload,
                            { headers }
                        );

                        console.log(' [Verify Payment Response]:', verifyResponse.data);

                        if (verifyResponse.status === 200 || verifyResponse.data?.status) {
                            Alert.alert(
                                'Success',
                                verifyResponse.data?.message || 'Payment verified successfully!',
                                [
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            setModalVisible(false);
                                            setTimeout(() => {
                                                handleSubmit();
                                            }, 300);
                                        },
                                    },
                                ]
                            );
                        }
                        else {
                            Alert.alert('Warning', verifyResponse.data?.message || 'Verification failed!');
                        }

                    } catch (verifyError) {
                        console.error(' [Verification Error]:', verifyError.response?.data || verifyError.message);
                        Alert.alert('verification failed', 'Payment done, but verification failed.');
                    }
                })
                .catch((error) => {
                    console.log(' [Payment Failed]:', error);
                    Alert.alert(
                        'Payment Failed',
                        'Your payment could not be processed at the moment. No amount was deducted. Please try again.'
                    );
                });

        } catch (error) {
            const errorMsg = error?.response?.data?.message || error.message || 'Please try again later.';

            console.error(' [Error in buying subscription]:', error?.response?.data || error.message);
            Alert.alert(
                'Subscription Info',
                errorMsg
            );
            setBuyLoading(false);
            setBuyingPlanId(false);
        }
    };


    const handleStateSelect = (item) => {
        setSelectedState(item.value);
        setRoleRegisterData((prev) => ({
            ...prev,
            state: item.value,
        }));

        // Optionally clear error
        if (errors.state) {
            setErrors((prev) => ({ ...prev, state: null }));
        }
    };

    const handleCityInputChange = (text) => {
        const filteredText = text.replace(/[^a-zA-Z\s]/g, '');
        setCityInput(filteredText);
        if (filteredText) {
            const filtered = CityData.filter((item) =>
                item?.label?.toLowerCase().includes(text.toLowerCase())
            ).map(item => item.label);
            setFilteredCities(filtered);
        } else {
            setFilteredCities([]);
        }

        setRoleRegisterData(PrevRoleRegisterData => ({
            ...PrevRoleRegisterData,
            city: filteredText,
        }));
    };

    const handleCitySelect = (item) => {
        setCityInput(item);
        setRoleRegisterData(PrevRoleRegisterData => ({
            ...PrevRoleRegisterData,
            city: item,
        }));
        setFilteredCities([]);
    };

    const handleInputChange = (field, value) => {
        setRoleRegisterData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Jyotish Register</Text>
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={Globalstyles.form} importantForAutofill="no" removeClippedSubviews={true}>
                        {/* <Text style={styles.editText}>Edit Details</Text> */}
                        <Text style={Globalstyles.title}>Name <Entypo name={'star'} color={'red'} size={12} /></Text>
                        <TextInput style={[Globalstyles.input, errors.fullName && styles.errorInput]}
                            value={RoleRegisterData?.fullName}
                            onChangeText={(text) => {
                                setRoleRegisterData((prev) => ({ ...prev, fullName: text }));
                            }}
                            placeholder="Enter Your Full Name"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                            autoCorrect={false}
                        />
                        {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

                        <Text style={Globalstyles.title}>Mobile No. <Entypo name={'star'} color={'red'} size={12} /></Text>
                        <TextInput
                            style={[Globalstyles.input, errors.mobileNo && styles.errorInput]}
                            value={RoleRegisterData?.mobileNo}
                            onChangeText={(text) => {
                                const digits = text.replace(/[^0-9]/g, '').slice(0, 10);
                                if (digits !== RoleRegisterData.mobileNo) {
                                    setRoleRegisterData((prev) => ({ ...prev, mobileNo: digits }));
                                }
                            }}
                            keyboardType="phone-pad"
                            placeholder="Enter Your Mobile No."
                            maxLength={10}
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            autoCorrect={false}
                            importantForAutofill="no"
                            textContentType="none"
                            inputMode="numeric"
                            autoCapitalize="none"
                        />

                        {errors.mobileNo && <Text style={styles.errorText}>{errors.mobileNo}</Text>}
                        <Text style={[Globalstyles.title, { color: Colors.theme_color }]}>Address</Text>

                        <Text style={Globalstyles.title}>State <Entypo name={'star'} color={'red'} size={12} /></Text>
                        <Dropdown
                            style={[
                                Globalstyles.input,
                                errors.state && styles.errorInput,
                                isFocus && { borderColor: Colors.primary }
                            ]}
                            placeholderStyle={{
                                fontSize: SF(14),
                                color: '#E7E7E7',
                                fontFamily: 'Poppins-Regular',
                            }}
                            selectedTextStyle={{
                                fontFamily: 'Poppins-Regular',
                                color: Colors.dark,
                                fontSize: SF(14),
                            }}
                            itemTextStyle={{
                                fontFamily: 'Poppins-Regular',
                                color: Colors.dark,
                                fontSize: SF(14),
                            }}
                            data={StateData.map((item) => ({ label: item.label, value: item.label }))}
                            maxHeight={400}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select your State' : '...'}
                            search
                            searchPlaceholder="Search state..."
                            value={selectedState}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={handleStateSelect}
                        />

                        {errors.state && <Text style={styles.errorText}>{errors.state}</Text>}

                        <Text style={Globalstyles.title}>Village / City <Entypo name={'star'} color={'red'} size={12} /></Text>
                        <TextInput
                            style={[Globalstyles.input, errors.city && styles.errorInput]}
                            value={RoleRegisterData?.city}
                            onChangeText={handleCityInputChange}
                            placeholder="Enter your city"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                            autoCorrect={false}
                        />
                        {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
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


                        <Text style={Globalstyles.title}>Area</Text>
                        <TextInput style={Globalstyles.input}
                            value={RoleRegisterData?.residentialAddress}
                            onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, residentialAddress: text }))}
                            placeholder="Enter Your Area"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                            autoCorrect={false}
                        />

                        {/* <Text style={Globalstyles.title}>Aadhar No. </Text>
                        <TextInput
                            style={Globalstyles.input}
                            value={RoleRegisterData?.aadharNo}
                            onChangeText={(text) => {
                                const digits = text.replace(/[^0-9]/g, '').slice(0, 12);
                                if (digits !== RoleRegisterData.aadharNo) {
                                    setRoleRegisterData((prev) => ({ ...prev, aadharNo: digits }));
                                }
                            }}
                            keyboardType="phone-pad"
                            placeholder="Enter Your Aadhar No."
                            maxLength={12}
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            autoCorrect={false}
                            importantForAutofill="no"
                            textContentType="none"
                            inputMode="numeric"
                            autoCapitalize="none"
                        /> */}


                        {/* <Text style={Globalstyles.title}>Sub Caste <Entypo name={'star'} color={'red'} size={12} /></Text>
                        <Dropdown
                            style={[Globalstyles.input, errors.subCaste && styles.errorInput]}
                            data={subCasteOptions}
                            labelField="label"
                            valueField="value"
                            value={RoleRegisterData?.subCaste}
                            onChange={(text) => handleInputChange('subCaste', text.value)}
                            placeholder="Select Your subCaste"
                            placeholderStyle={{ color: '#E7E7E7' }}
                            autoScroll={false}
                            showsVerticalScrollIndicator={false}
                        />
                        {errors.subCaste && <Text style={styles.errorText}>{errors.subCaste}</Text>} */}

                        {/* Agar user type karega toh list dikhegi */}
                        {/* {filteredSubCaste.length > 0 ? (
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


                        {/* Role Selection with Checkboxes */}
                        <Text style={Globalstyles.title}>Select Jyotish Services <Entypo name={'star'} color={'red'} size={12} /></Text>
                        <View style={[styles.checkboxContainer, errors.selectedRoles && styles.errorInput]}>
                            {roleOptions.map(role => (
                                <View key={role.value} style={styles.checkboxItem}>
                                    <Checkbox
                                        status={selectedRoles.includes(role.value) ? 'checked' : 'unchecked'}
                                        onPress={() => handleRoleChange(role.value)}
                                        color={Colors.theme_color}
                                    />
                                    <Text style={{ fontFamily: "Poppins-Regular" }}>{role.label}</Text>
                                </View>
                            ))}
                        </View>

                        {/* Show services for selected roles */}
                        {selectedRoles.map(role => (
                            <View key={role} style={styles.roleServices}>
                                <Text style={styles.servicesLabel}>{role} Services</Text>
                                {servicesOptions[role]?.map(service => (
                                    <View key={service.value} style={styles.checkboxContainer1}>
                                        <Checkbox.Item
                                            label={service.label}
                                            status={checked[service.value] ? 'checked' : 'unchecked'}
                                            onPress={() => handleCheckboxChange(service.value)}
                                            color={Colors.theme_color}
                                        />
                                    </View>
                                ))}
                            </View>
                        ))}

                        {errors?.jyotishServices && <Text style={styles.errorText}>{errors.jyotishServices}</Text>}

                        <Text style={Globalstyles.title}>Experience</Text>
                        <View>
                            <Dropdown
                                style={Globalstyles.input}
                                data={ExperienceData}
                                labelField="label"
                                valueField="value"
                                value={RoleRegisterData?.experience}
                                onChange={(text) => handleInputChange('experience', text.value)}
                                placeholder="Select Experience"
                                placeholderStyle={{
                                    fontSize: SF(14),
                                    color: '#E7E7E7',
                                    fontFamily: 'Poppins-Regular',
                                }}
                                selectedTextStyle={{
                                    fontFamily: 'Poppins-Regular',
                                    color: Colors.dark,
                                    fontSize: SF(14),
                                }}
                                itemTextStyle={{
                                    fontFamily: 'Poppins-Regular',
                                    color: Colors.dark,
                                    fontSize: SF(14),
                                }}
                                autoScroll={false}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>

                        <Text style={Globalstyles.title}>Profile Photo <Entypo name={'star'} color={'red'} size={12} /></Text>
                        <View style={[Globalstyles.input, errors.profilePhoto && styles.errorInput]}>
                            <TouchableOpacity onPress={handleProfilePhotoPick}>
                                {RoleRegisterData.profilePhoto ? (
                                    <Image
                                        source={{ uri: RoleRegisterData.profilePhoto }}
                                        style={styles.profileImage}
                                    />
                                ) : (
                                    <Text style={styles.imagePlaceholder}>Upload Profile Photo</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                        {!RoleRegisterData.profilePhoto && errors.profilePhoto && (
                            <Text style={styles.errorText}>{errors.profilePhoto}</Text>
                        )}

                        <Text style={Globalstyles.title}>Add Description</Text>
                        <TextInput style={Globalstyles.textInput} value={RoleRegisterData.description}
                            onChangeText={(text) => setRoleRegisterData((prev) => ({ ...prev, description: text }))}
                            textAlignVertical="top" placeholder="Add Your Description"
                            placeholderTextColor={Colors.gray} multiline={true}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                            autoCorrect={false}
                        />


                        <View style={styles.photopickContainer}>
                            <Text style={styles.smalltitle}>Upload Photos For Your Page </Text>

                            <TouchableOpacity style={styles.PickPhotoButton} onPress={handleAdditionalPhotosPick}>
                                <Text style={styles.PickPhotoText}>Pick & Crop Photo</Text>
                            </TouchableOpacity>
                        </View>

                        {RoleRegisterData?.additionalPhotos?.length > 0 && (
                            <View style={styles.photosContainer}>
                                <FlatList
                                    data={RoleRegisterData.additionalPhotos}
                                    keyExtractor={(item, index) => index.toString()}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <View style={{ marginRight: 10, position: 'relative' }}>
                                            <TouchableOpacity onPress={() => handleReplacePhoto(index)}>
                                                <Image source={{ uri: item }} style={styles.photo} />
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    const updated = RoleRegisterData.additionalPhotos.filter((_, i) => i !== index);
                                                    setRoleRegisterData((prev) => ({
                                                        ...prev,
                                                        additionalPhotos: updated,
                                                    }));
                                                }}
                                                style={{
                                                    position: 'absolute',
                                                    top: 3,
                                                    right: 3,
                                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                                    borderRadius: 12,
                                                    padding: 2,
                                                }}
                                            >
                                                <Entypo name="cross" size={18} color="#fff" />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
                                />
                            </View>
                        )}
                        <Text style={Globalstyles.title}>Website Link</Text>
                        <TextInput
                            style={[Globalstyles.input, errors.websiteUrl && styles.errorInput]}
                            value={tempUrlData.websiteUrl || RoleRegisterData.websiteUrl}
                            onChangeText={(text) => validateAndSetUrl(text, 'websiteUrl')}
                            placeholder="Give Your Website Link"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                            autoCorrect={false}
                        />
                        {errors.websiteUrl && (
                            <Text style={styles.errorText}>{errors.websiteUrl}</Text>
                        )}
                        <Text style={Globalstyles.title}>Youtube Link</Text>
                        <TextInput
                            style={[Globalstyles.input, errors.youtubeUrl && styles.errorInput]}
                            value={tempUrlData.youtubeUrl || RoleRegisterData.youtubeUrl}
                            onChangeText={(text) => validateAndSetUrl(text, 'youtubeUrl')}
                            placeholder="Give Your Youtube Link"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                            autoCorrect={false}
                        />
                        {errors.youtubeUrl && (
                            <Text style={styles.errorText}>{errors.youtubeUrl}</Text>
                        )}
                        <Text style={Globalstyles.title}>Whatsapp Link</Text>
                        <TextInput
                            style={[Globalstyles.input, errors.whatsapp && styles.errorInput]}
                            value={tempUrlData.whatsapp || RoleRegisterData.whatsapp}
                            onChangeText={(text) => validateAndSetUrl(text, 'whatsapp')}
                            placeholder="Give Your Whatsapp Link"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                            autoCorrect={false}
                        />
                        {errors.whatsapp && (
                            <Text style={styles.errorText}>{errors.whatsapp}</Text>
                        )}
                        <Text style={Globalstyles.title}>Facebook Link</Text>
                        <TextInput
                            style={[Globalstyles.input, errors.facebookUrl && styles.errorInput]}
                            value={tempUrlData.facebookUrl || RoleRegisterData.facebookUrl}
                            onChangeText={(text) => validateAndSetUrl(text, 'facebookUrl')}
                            placeholder="Give Your Facebook Link"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                            autoCorrect={false}
                        />
                        {errors.facebookUrl && (
                            <Text style={styles.errorText}>{errors.facebookUrl}</Text>
                        )}
                        <Text style={Globalstyles.title}>Instagram Link</Text>
                        <TextInput
                            style={[Globalstyles.input, errors.instagramUrl && styles.errorInput]}
                            value={tempUrlData.instagramUrl || RoleRegisterData.instagramUrl}
                            onChangeText={(text) => validateAndSetUrl(text, 'instagramUrl')}
                            placeholder="Give Your Instagram Link"
                            placeholderTextColor={Colors.gray}
                            autoComplete="off"
                            textContentType="none"
                            importantForAutofill="no"
                            autoCorrect={false}
                        />
                        {errors.instagramUrl && (
                            <Text style={styles.errorText}>{errors.instagramUrl}</Text>
                        )}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator size="large" color={Colors.light} />
                            ) : (
                                <Text style={styles.buttonText}>submit</Text>
                            )}
                        </TouchableOpacity>
                        <Modal visible={modalVisible} animationType="slide" transparent={true}>
                            <View style={styles.modalOverlay}>
                                <View style={styles.modalContent}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <View style={styles.cardContainer}>
                                            {plans.map((plan) => (
                                                <View key={plan._id} style={styles.card}>
                                                    {plan.photoUrl ? (
                                                        <Image
                                                            source={{ uri: plan.photoUrl }}
                                                            style={styles.planImage}
                                                            resizeMode="cover"
                                                            onError={(e) => console.log('Image load error:', e.nativeEvent.error)}
                                                        />
                                                    ) : null}
                                                    <View style={styles.cardContent}>
                                                        {plan.trialPeriod ? (
                                                            <Text style={styles.Text}>
                                                                <Text style={styles.boldLabel}>Trial Period: </Text>
                                                                {plan.trialPeriod} days
                                                            </Text>
                                                        ) : null}

                                                        {plan.duration ? (
                                                            <Text style={styles.Text}>
                                                                <Text style={styles.boldLabel}>Duration: </Text>
                                                                {plan.duration} months
                                                            </Text>
                                                        ) : null}

                                                        {plan.amount ? (
                                                            <Text style={styles.Text}>
                                                                <Text style={styles.boldLabel}>Amount: </Text>
                                                                ₹{plan.amount}
                                                            </Text>
                                                        ) : null}

                                                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                                            {plan.description ? (
                                                                <Text style={styles.description}>{plan.description}</Text>
                                                            ) : null}
                                                            <View style={styles.buttonRowAligned}>
                                                                {!hasTrial && (
                                                                    <TouchableOpacity style={styles.trialButton} onPress={() => handleFreeTrial(plan)}>
                                                                        <Text style={styles.trialText}>
                                                                            {TrialPlanId === plan._id ? 'Starting...' : 'Start Free Trial'}
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                )}
                                                                <TouchableOpacity style={styles.buyButton} onPress={() => handleBuyNow(plan)}>
                                                                    <Text style={styles.buyButtonText}>
                                                                        {buyingPlanId === plan._id ? 'Buying...' : 'Buy Subscription'}
                                                                    </Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                    </ScrollView>

                                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                                        <Text style={styles.closeText}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default JyotishRegister;
