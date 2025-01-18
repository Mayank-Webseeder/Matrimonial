import React,{useEffect,useState} from 'react';
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
import BioData from '../Screens/DrawerScreen/BioData';
import { SH, SF, SW } from '../utils/Dimensions';
import Colors from '../utils/Colors';
import Dharmshala from '../Screens/DrawerScreen/Dharmshala';
import Activist from '../Screens/DrawerScreen/Activist';
import PartnersPreference from '../Screens/DrawerScreen/PartnersPreference';
import FeedBack from '../Screens/DrawerScreen/FeedBack';
import Kathavachak from '../Screens/DrawerScreen/Kathavachak';
import Notification from '../Screens/StackScreens/Notification';
import DharamsalaDetail from '../Screens/StackScreens/DharamsalaDetail';
import CommunityFilter from '../Screens/StackScreens/CommunityFilter';
import RoleRegisterForm from '../Screens/StackScreens/RoleRegisterForm';
import PanditDetailPage from '../Screens/StackScreens/PanditDetailPage';
import KathavachakDetailsPage from '../Screens/StackScreens/KathavachakDetailsPage';
import JyotishDetailsPage from '../Screens/StackScreens/JyotishDetailsPage';
import Register from '../Screens/auth/Register';
import PhotoGallery from '../Screens/DrawerScreen/PhotoGallery';
import { Image } from 'react-native';
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
import DetailedProfile from '../Screens/StackScreens/DetailedProfile';
import MatrimonyPeopleProfile from '../Screens/StackScreens/MatrimonyPeopleProfile';
import PostSuccessStories from '../Screens/StackScreens/PostSuccessStories';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../Screens/AppLoadingScreen/LoadingScreen';
import Matrimonial from '../Screens/Tabs/Matrimonial';
import UpdateProfile from '../Screens/StackScreens/UpdateProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MyTabs() {
  const iconSize = SF(30);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: SF(9),
         fontFamily:"Poppins-Medium",
         
          color: Colors.light,
        },
        tabBarIcon: ({ focused }) => {
          let tabBarIcon;

          //Assign icons based on the route name

          if (route.name === 'Matrimonial') {
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
           tabBarIcon=(
            <Image source={require('../Images/user.png')} style={{Width:SW(25),height:SH(25),borderRadius:20,resizeMode:"contain"}}/>
           )
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
          paddingHorizontal:SW(10),
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="Pandit" component={Pandit} options={{ tabBarLabel: 'Pandit' }} />
      <Tab.Screen name="Matrimonial" component={Matrimonial} options={{ tabBarLabel: 'Matrimonial' }} />
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
          width:SW(240)
        },
      }}
    >
      <Drawer.Screen name="Tabs" component={MyTabs} />
      <Drawer.Screen name="Interested Profile" component={IntrestedProfile} />
      <Drawer.Screen name="Saved Profile" component={SavedProfile} />
      <Drawer.Screen name="Pandit" component={Pandit} />
      <Drawer.Screen name="EventNews" component={EventNews} />
      <Drawer.Screen name="Dharmshala" component={Dharmshala} />
      <Drawer.Screen name="BioData" component={BioData} />
      <Drawer.Screen name="DetailedProfile" component={DetailedProfile} />
      <Drawer.Screen name="Committee" component={Committee} />
      <Drawer.Screen name="Activist" component={Activist} />
      <Drawer.Screen name="PartnersPreference" component={PartnersPreference} />
      <Drawer.Screen name="FeedBack" component={FeedBack} />
      <Drawer.Screen name="Jyotish" component={Jyotish} />
      <Drawer.Screen name="Kathavachak" component={Kathavachak} />
      <Drawer.Screen name="PhotoGallery" component={PhotoGallery} />
      <Drawer.Screen name="SuccessStories" component={SuccessStories} />
      <Drawer.Screen name="NotificationSettings" component={NotificationSettings} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
      <Drawer.Screen name="PrivacySettings" component={PrivacySettings} />
      <Drawer.Screen name="InActiveDelete" component={InActiveDelete} />
    </Drawer.Navigator>
  );
}

const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('');

  useEffect(() => {
    const checkUserToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      console.log('token in root file ', token);

      if (token) {
        setInitialRoute("MainApp");
      } else {
        setInitialRoute('Splash');
      }

      setIsLoading(false);
    };

    checkUserToken();
  }, []);

  if (isLoading) {
    return <LoadingScreen/>;
  }


  return (
    <Stack.Navigator
    initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MainApp" component={MyDrawer} />
      <Stack.Screen name="BioData" component={BioData} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="DharamsalaDetail" component={DharamsalaDetail} />
      <Stack.Screen name="CommunityFilter" component={CommunityFilter} />
      <Stack.Screen name="RoleRegisterForm" component={RoleRegisterForm} />
      <Stack.Screen name="PanditDetailPage" component={PanditDetailPage} />
      <Stack.Screen name="KathavachakDetailsPage" component={KathavachakDetailsPage} />
      <Stack.Screen name="JyotishDetailsPage" component={JyotishDetailsPage} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="ViewPost" component={ViewPost} />
      <Stack.Screen name="PostReview" component={PostReview} />
      <Stack.Screen name="ReportPage" component={ReportPage} />
      <Stack.Screen name="AllReviewsPage" component={AllReviewsPage} />
      <Stack.Screen name="DharamsalaSubmissionPage" component={DharamsalaSubmissionPage} />
      <Stack.Screen name="CommitteeSubmissionPage" component={CommitteeSubmissionPage} />
      <Stack.Screen name="ActivistForm" component={ActivistForm} />
      <Stack.Screen name="DetailedProfile" component={DetailedProfile} />
      <Stack.Screen name="MatrimonyPeopleProfile" component={MatrimonyPeopleProfile} />
      <Stack.Screen name="PostSuccessStories" component={PostSuccessStories} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

