import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Linking } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Splash from '../Screens/Splash';
import Login from '../Screens/auth/Login';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../Screens/Tabs/Home';
import IntrestedProfile from '../Screens/DrawerScreen/IntrestedProfile';
import SavedProfile from '../Screens/DrawerScreen/SavedProfile';
import CustomDrawer from '../Screens/DrawerScreen/CustomDrawer';
import { SH, SF, SW } from '../utils/Dimensions';
import Colors from '../utils/Colors';
import Dharmshala from '../Screens/DrawerScreen/Dharmshala';
import Activist from '../Screens/DrawerScreen/Activist';
import FeedBack from '../Screens/DrawerScreen/FeedBack';
import Kathavachak from '../Screens/DrawerScreen/Kathavachak';
import Notification from '../Screens/StackScreens/Notification';
import DharamsalaDetail from '../Screens/StackScreens/DharamsalaDetail';
import RoleRegisterForm from '../Screens/StackScreens/RoleRegisterForm';
import PanditDetailPage from '../Screens/StackScreens/PanditDetailPage';
import KathavachakDetailsPage from '../Screens/StackScreens/KathavachakDetailsPage';
import JyotishDetailsPage from '../Screens/StackScreens/JyotishDetailsPage';
import Register from '../Screens/auth/Register';
import CreatePost from '../Screens/StackScreens/CreatePost';
import ViewPost from '../Screens/StackScreens/ViewPost';
import SuccessStories from '../Screens/DrawerScreen/SuccessStories';
import NotificationSettings from '../Screens/DrawerScreen/NotificationSettings';
import ChangePassword from '../Screens/DrawerScreen/ChangePassword';
import PrivacySettings from '../Screens/DrawerScreen/PrivacySettings';
import InActiveDelete from '../Screens/DrawerScreen/InActiveDelete';
import PostReview from '../Screens/StackScreens/PostReview';
import ReportPage from '../Screens/StackScreens/ReportPage';
import AllReviewsPage from '../Screens/StackScreens/AllReviewsPage';
import DharamsalaSubmissionPage from '../Screens/StackScreens/DharamsalaSubmissionPage';
import CommitteeSubmissionPage from '../Screens/StackScreens/CommitteeSubmissionPage';
import EventNews from '../Screens/Tabs/EventNews';
import MyProfile from '../Screens/Tabs/MyProfile';
import Pandit from '../Screens/Tabs/Pandit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Committee from '../Screens/DrawerScreen/Committee';
import ActivistForm from '../Screens/StackScreens/ActivistForm';
import Jyotish from '../Screens/DrawerScreen/Jyotish';

import MatrimonyPeopleProfile from '../Screens/StackScreens/MatrimonyPeopleProfile';
import PostSuccessStories from '../Screens/StackScreens/PostSuccessStories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../Screens/AppLoadingScreen/LoadingScreen';
import Matrimonial from '../Screens/Tabs/Matrimonial';
import UpdateProfile from '../Screens/StackScreens/UpdateProfile';
import MatrimonyPage from '../Screens/StackScreens/MatrimonyPage';
import DetailedProfile from '../Screens/StackScreens/DetailedProfile';
import PartnersPreference from '../Screens/StackScreens/PartnersPreference';
import PhotoGallery from '../Screens/StackScreens/PhotoGallery';
import MainPartnerPrefrence from '../Screens/DrawerScreen/MainPartnerPrefrence';
import { useDispatch } from 'react-redux';
import { GET_BIODATA, PROFILE_ENDPOINT } from '../utils/BaseUrl';
import { setProfiledata } from '../ReduxStore/Slices/ProfileSlice';
import axios from 'axios';
import IntrestReceivedProfilePage from '../Screens/StackScreens/IntrestReceivedProfilePage';
import ViewEntityImages from '../Screens/StackScreens/ViewEntityImages';
import ForgotScreen from '../Screens/auth/ForgotScreen';
import ProfileDetail from '../Screens/StackScreens/ProfileDetail';
import UpdateProfileDetails from '../Screens/StackScreens/UpdateProfileDetails';
import { useSelector } from 'react-redux';
import BioData from '../Screens/Tabs/BioData';
import ViewMyEventPost from '../Screens/StackScreens/ViewMyEventPost';
import UpdateEventPost from '../Screens/StackScreens/UpdateEventPost';
import AdvertiseWithUs from '../Screens/StackScreens/AdvertiseWithUs';
import ShortMatrimonialProfile from '../Screens/StackScreens/ShortMatrimonialProfile';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import NotificationDetails from '../Screens/StackScreens/NotificationDetails';
import { initializeSocket } from '../../socket';
import { setBioData } from '../ReduxStore/Slices/BiodataSlice';
import AboutJs from '../Screens/StackScreens/AboutJs';

const Stack = createNativeStackNavigator();
const AppStackNavigator = createNativeStackNavigator();
const AuthStackNavigator = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MyTabs() {
  const dispatch = useDispatch();
  const [profiledata, setProfileData] = useState('');
  const ProfileData = useSelector((state) => state.profile);
  const profileData = ProfileData?.profiledata || {};
  const image = profileData?.photoUrl?.[0];
  const [isLoading, setLoading] = useState(true);
  const [biodata, setBiodata] = useState("");
  const [mybiodata, setMybiodata] = useState("");
  const MyprofileData = useSelector((state) => state.getBiodata);
  const partnerPreferences = MyprofileData?.Biodata?.partnerPreferences || null;
  
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      console.log("headers in profile", headers);
      const res = await axios.get(PROFILE_ENDPOINT, { headers });
      console.log("API Response:", res.data);

      setProfileData(res.data.data); // ✅ State update karo
      dispatch(setProfiledata(res.data.data)); // Redux update karo

    } catch (error) {
      console.error("Error fetching profile:", error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };


  const getBiodata = async () => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(GET_BIODATA, { headers });
      if (response.data) {
        const fetchedData = response.data.data;
        console.log("My bio data", fetchedData);
        setMybiodata(fetchedData);
        dispatch(setBioData(fetchedData));
        setLoading(false)
      } else {
        setBiodata({});
      }
    } catch (error) {
      console.error("Error fetching biodata:", error);
    }
    finally {
      setLoading(false)
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
      getBiodata();
    }, [])
  );

  const iconSize = SF(30);

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: SF(9),
          fontFamily: "Poppins-Medium",
          color: Colors.light,
        },
        tabBarIcon: ({ focused }) => {
          let tabBarIcon;

          if (route.name === 'Matrimonial' || route.name === 'BioData') {
            tabBarIcon = (
              <MaterialCommunityIcons
                name={focused ? 'heart-multiple' : 'heart-multiple-outline'}
                size={25}
                color={Colors.light}
              />
            );
          } else if (route.name === 'Pandit') {
            tabBarIcon = (
              <MaterialCommunityIcons
                name={focused ? 'meditation' : 'meditation'}
                size={iconSize}
                color={Colors.light}
              />
            );
          } else if (route.name === 'EventNews') {
            tabBarIcon = (
              <Ionicons
                name={focused ? 'newspaper' : 'newspaper-outline'}
                size={iconSize}
                color={Colors.light}
              />
            );
          } else if (route.name === 'MyProfile') {
            tabBarIcon = (
              <Image
                source={image ? { uri: image } : require('../Images/Profile.png')}
                style={{ width: SW(25), height: SH(25), borderRadius: 20, resizeMode: "cover" }}
              />
            );
          } else if (route.name === 'Home') {
            tabBarIcon = (
              <MaterialCommunityIcons
                name={focused ? 'home' : 'home-outline'}
                size={iconSize}
                color={Colors.light}
              />
            );
          }

          return tabBarIcon;
        },
        tabBarStyle: {
          backgroundColor: Colors.theme_color,
          height: SH(55),
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          paddingHorizontal: SW(10),
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Pandit" component={Pandit} options={{ tabBarLabel: 'Pandit' }} />
      <Tab.Screen
        name={partnerPreferences ? "BioData" : "Matrimonial"}
        component={partnerPreferences ? BioData : Matrimonial}
        options={{ tabBarLabel: "Matrimonial" }}
      />

      <Tab.Screen name="EventNews" component={EventNews} options={{ tabBarLabel: 'EventNews' }} />
      <Tab.Screen name="MyProfile" component={MyProfile} options={{ tabBarLabel: 'You' }} />
    </Tab.Navigator>
  );
}


function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: SW(240)
        },
      }}
    >
      <Drawer.Screen name="Tabs" component={MyTabs} />
      <Drawer.Screen name="MainPartnerPrefrence" component={MainPartnerPrefrence} />
      <Drawer.Screen name="Interested Profile" component={IntrestedProfile} />
      <Drawer.Screen name="Saved Profile" component={SavedProfile} />
      <Drawer.Screen name="Pandit" component={Pandit} />
      <Drawer.Screen name="EventNews" component={EventNews} />
      <Drawer.Screen name="Dharmshala" component={Dharmshala} />
      <Drawer.Screen name="Committee" component={Committee} />
      <Drawer.Screen name="Activist" component={Activist} />
      <Drawer.Screen name="FeedBack" component={FeedBack} />
      <Drawer.Screen name="Jyotish" component={Jyotish} />
      <Drawer.Screen name="Kathavachak" component={Kathavachak} />
      <Drawer.Screen name="SuccessStories" component={SuccessStories} />
      <Drawer.Screen name="NotificationSettings" component={NotificationSettings} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
      <Drawer.Screen name="PrivacySettings" component={PrivacySettings} />
      <Drawer.Screen name="InActiveDelete" component={InActiveDelete} />
      <Drawer.Screen name="AboutJs" component={AboutJs} />
    </Drawer.Navigator>
  );
}

const AppStack = () => (
  <AppStackNavigator.Navigator screenOptions={{ headerShown: false }} initialRouteName='MainApp'>
    <AppStackNavigator.Screen name="MainApp" component={MyDrawer} />
    <AppStackNavigator.Screen name="IntrestedProfile" component={IntrestedProfile} />
    <AppStackNavigator.Screen name="Notification" component={Notification} />
    <AppStackNavigator.Screen name="NotificationDetails" component={NotificationDetails} />
    <AppStackNavigator.Screen name="DharamsalaDetail" component={DharamsalaDetail} />
    <AppStackNavigator.Screen name="RoleRegisterForm" component={RoleRegisterForm} />
    <AppStackNavigator.Screen name="PanditDetailPage" component={PanditDetailPage} />
    <AppStackNavigator.Screen name="KathavachakDetailsPage" component={KathavachakDetailsPage} />
    <AppStackNavigator.Screen name="JyotishDetailsPage" component={JyotishDetailsPage} />
    <AppStackNavigator.Screen name="CreatePost" component={CreatePost} />
    <AppStackNavigator.Screen name="EventNews" component={EventNews} />
    <AppStackNavigator.Screen name="ViewMyEventPost" component={ViewMyEventPost} />
    <AppStackNavigator.Screen name="UpdateEventPost" component={UpdateEventPost} />
    <AppStackNavigator.Screen name="MyProfile" component={MyProfile} />
    <AppStackNavigator.Screen name="ViewPost" component={ViewPost} />
    <AppStackNavigator.Screen name="PostReview" component={PostReview} />
    <AppStackNavigator.Screen name="ReportPage" component={ReportPage} />
    <AppStackNavigator.Screen name="AllReviewsPage" component={AllReviewsPage} />
    <AppStackNavigator.Screen name="DharamsalaSubmissionPage" component={DharamsalaSubmissionPage} />
    <AppStackNavigator.Screen name="CommitteeSubmissionPage" component={CommitteeSubmissionPage} />
    <AppStackNavigator.Screen name="ActivistForm" component={ActivistForm} />
    <AppStackNavigator.Screen name="DetailedProfile" component={DetailedProfile} />
    <AppStackNavigator.Screen name="PartnersPreference" component={PartnersPreference} />
    <AppStackNavigator.Screen name="PhotoGallery" component={PhotoGallery} />
    <AppStackNavigator.Screen name="MainPartnerPrefrence" component={MainPartnerPrefrence} />
    <AppStackNavigator.Screen name="MatrimonyPeopleProfile" component={MatrimonyPeopleProfile} />
    <AppStackNavigator.Screen name="IntrestReceivedProfilePage" component={IntrestReceivedProfilePage} />
    <AppStackNavigator.Screen name="MatrimonyPage" component={MatrimonyPage} />
    <AppStackNavigator.Screen name="PostSuccessStories" component={PostSuccessStories} />
    <AppStackNavigator.Screen name="UpdateProfile" component={UpdateProfile} />
    <AppStackNavigator.Screen name="ViewEntityImages" component={ViewEntityImages} />
    <AppStackNavigator.Screen name="ProfileDetail" component={ProfileDetail} />
    <AppStackNavigator.Screen name="UpdateProfileDetails" component={UpdateProfileDetails} />
    <AppStackNavigator.Screen name="AdvertiseWithUs" component={AdvertiseWithUs} />
    <AppStackNavigator.Screen name="ShortMatrimonialProfile" component={ShortMatrimonialProfile} />
    <AppStackNavigator.Screen name="Matrimonial" component={Matrimonial} />
    <AppStackNavigator.Screen name="BioData" component={BioData} />
  </AppStackNavigator.Navigator>
);

const AuthStack = () => (
  <AuthStackNavigator.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
    <AuthStackNavigator.Screen name="Splash" component={Splash} />
    <AuthStackNavigator.Screen name="Register" component={Register} />
    <AuthStackNavigator.Screen name="Login" component={Login} />
    <AuthStackNavigator.Screen name="ForgotScreen" component={ForgotScreen} />
  </AuthStackNavigator.Navigator>
);

const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserToken = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");
      console.log("Token in root file:", token);

      if (token && userId) {
        initializeSocket(userId); 
      }

      setInitialRoute(token ? "AppStack" : "AuthStack");
      setIsLoading(false);
    };

    checkUserToken();
  }, []);


  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="AppStack" component={AppStack} />
    </Stack.Navigator>
  );
};


export default RootNavigator;
