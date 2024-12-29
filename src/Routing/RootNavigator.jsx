import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Splash from '../Screens/Splash';
import LoginSuccess from '../Screens/auth/LoginSuccess';
import Login from '../Screens/auth/Login';
import Verification from '../Screens/auth/Verification';
import Information from '../Screens/auth/Information';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from '../Screens/Tabs/Home';
import Profile from '../Screens/Tabs/Profile';
import Location from '../Screens/Tabs/Location';
import IntrestedProfile from '../Screens/DrawerScreen/IntrestedProfile';
import SavedProfile from '../Screens/DrawerScreen/SavedProfile';
import EventNews from '../Screens/DrawerScreen/EventNews';
import CustomDrawer from '../Screens/DrawerScreen/CustomDrawer';
import BioData from '../Screens/DrawerScreen/BioData';
import {SH,SW,SF} from '../utils/Dimensions';
import Colors from '../utils/Colors';
import Dharmshala from '../Screens/DrawerScreen/Dharmshala';
import Community from '../Screens/DrawerScreen/Community';
import Activist from '../Screens/DrawerScreen/Activist';
import PartnersPreference from '../Screens/DrawerScreen/PartnersPreference';
import FeedBack from '../Screens/DrawerScreen/FeedBack';
import Joytish from '../Screens/DrawerScreen/Joytish';
import Kathavachak from '../Screens/DrawerScreen/Kathavachak';
import Explore from '../Screens/DrawerScreen/Explore';
import Pandit from '../Screens/DrawerScreen/Pandit';
import Notification from '../Screens/DrawerScreen/Notification';
import Filter from '../Screens/DrawerScreen/Filter';
import DharamsalaDetail from '../Screens/DrawerScreen/DharamsalaDetail';
import CommunityFilter from '../Screens/DrawerScreen/CommunityFilter';
import PanditRegister from '../Screens/DrawerScreen/PanditRegister';
import PanditDetailPage from '../Screens/DrawerScreen/PanditDetailPage';
import KathavachakDetailsPage from '../Screens/DrawerScreen/KathavachakDetailsPage';
import JyotishDetailsPage from '../Screens/DrawerScreen/JyotishDetailsPage';
import JyotishRegister from '../Screens/DrawerScreen/JyotishRegister';
import KathavachakRegister from '../Screens/DrawerScreen/KathavachakRegister';
import Register from '../Screens/auth/Register';
import PhotoGallery from '../Screens/DrawerScreen/PhotoGallery';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    initialRouteName='Home'
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          let IconComponent = MaterialCommunityIcons;
          let iconSize =SF(35);

          if (route.name === 'Profile') {
            iconName = 'user-o';
            IconComponent = FontAwesome;
            iconSize =SF(35); 
          } else if (route.name === 'Home') {
            iconName = 'home-outline';
            iconSize =SF(35);
          } else if (route.name === 'Pandit') {
            iconName = 'book-search';
            IconComponent = MaterialCommunityIcons;
            iconSize = SF(30);
          } else if (route.name === 'Explore') {
            iconName = 'compass';
            IconComponent = Ionicons;
            iconSize = SF(30);
          } else if (route.name === 'Community') {
            iconName = 'users';
            IconComponent = FontAwesome;
            iconSize = SF(25);
          }

          return (
            <IconComponent
              name={iconName}
              size={iconSize}
              color={focused ? Colors.dark : Colors.light}
            />
          );
        },

        tabBarStyle: {
          backgroundColor: Colors.theme_color,
          height: SH(65), 
          borderTopLeftRadius:15,
          borderTopRightRadius:15,
          paddingTop:SH(10)
        },
      })}
    >
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Pandit" component={Pandit} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="Profile" component={Profile} />
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
          backgroundColor: '#8B1C44',
          width:SW(210)
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
      <Drawer.Screen name="Community" component={Community} />
      <Drawer.Screen name="Activist" component={Activist} />
      <Drawer.Screen name="PartnersPreference" component={PartnersPreference} />
      <Drawer.Screen name="FeedBack" component={FeedBack} />
      <Drawer.Screen name="Joytish" component={Joytish} />
      <Drawer.Screen name="Kathavachak" component={Kathavachak} />
      <Drawer.Screen name="Explore" component={Explore} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="Filter" component={Filter} />
      <Drawer.Screen name="DharamsalaDetail" component={DharamsalaDetail} />
      <Drawer.Screen name="CommunityFilter" component={CommunityFilter} />
      <Drawer.Screen name="PanditRegister" component={PanditRegister} />
      <Drawer.Screen name="PanditDetailPage" component={PanditDetailPage} />
      <Drawer.Screen name="KathavachakDetailsPage" component={KathavachakDetailsPage} />
      <Drawer.Screen name="JyotishDetailsPage" component={JyotishDetailsPage} />
      <Drawer.Screen name="JyotishRegister" component={JyotishRegister} />
      <Drawer.Screen name="KathavachakRegister" component={KathavachakRegister} />
      <Drawer.Screen name="PhotoGallery" component={PhotoGallery} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Location" component={Location} />
    </Drawer.Navigator>
  );
}

const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={Splash} /> 
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="LoginSuccess" component={LoginSuccess} />
      <Stack.Screen name="Information" component={Information} />
      <Stack.Screen name="MainApp" component={MyDrawer} />
      <Stack.Screen name="BioData" component={BioData} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

