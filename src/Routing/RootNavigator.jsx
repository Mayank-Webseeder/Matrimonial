import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Splash from '../Screens/Splash';
import LoginSuccess from '../Screens/auth/LoginSuccess';
import Login from '../Screens/auth/Login';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
import DharamsalaDetail from '../Screens/DrawerScreen/DharamsalaDetail';
import CommunityFilter from '../Screens/DrawerScreen/CommunityFilter';
import RoleRegisterForm from '../Screens/DrawerScreen/RoleRegisterForm';
import PanditDetailPage from '../Screens/DrawerScreen/PanditDetailPage';
import KathavachakDetailsPage from '../Screens/DrawerScreen/KathavachakDetailsPage';
import JyotishDetailsPage from '../Screens/DrawerScreen/JyotishDetailsPage';
import Register from '../Screens/auth/Register';
import PhotoGallery from '../Screens/DrawerScreen/PhotoGallery';

import { Image } from 'react-native';
import MyProfile from '../Screens/DrawerScreen/MyProfile';
import CreatePost from '../Screens/DrawerScreen/CreatePost';
import ViewPost from '../Screens/DrawerScreen/ViewPost';
import SuccessStories from '../Screens/DrawerScreen/SuccessStories';
import NotificationSettings from '../Screens/DrawerScreen/NotificationSettings';
import ChangePassword from '../Screens/DrawerScreen/ChangePassword';
import PrivacySettings from '../Screens/DrawerScreen/PrivacySettings';
import InActiveDelete from '../Screens/DrawerScreen/InActiveDelete';
import PostReview from '../Screens/DrawerScreen/PostReview';
import ReportPage from '../Screens/DrawerScreen/ReportPage';
import AllReviewsPage from '../Screens/DrawerScreen/AllReviewsPage';
import DharamsalaSubmissionPage from '../Screens/DrawerScreen/DharamsalaSubmissionPage';
import CommitteeSubmissionPage from '../Screens/DrawerScreen/CommitteeSubmissionPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MyTabs() {
  const iconSize = SF(25);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: SF(12),
          fontWeight: 'bold',
          marginBottom: SH(5),
          color: Colors.light, 
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          let IconComponent = MaterialCommunityIcons; 
          let tabBarIcon;

          if (route.name === 'Explore') {
            tabBarIcon = (
              <Image
                source={focused ? require('../Images/activeExplore.png')  : require('../Images/InactiveExplore.png')  
                }
                style={{
                  width: SF(25),
                  height: SF(32),
                  tintColor: Colors.light, 
                  resizeMode:"contain"
                }}
              />
            );
          } else if (route.name === 'Pandit') {
            tabBarIcon = (
              <Image
                source={ focused ? require('../Images/ActiveBookIcon.png') : require('../Images/InactiveBookIcon.png')  
                }
                style={{
                  width: SF(25),
                  height: SF(25),
                  resizeMode: "contain",
                  tintColor: Colors.light,
                }}
              />
            );
          }
          else if (route.name === 'EventNews') {
            tabBarIcon = (
              <Image
                source={ focused ? require('../Images/ActiveCommitte.png') : require('../Images/InactiveCommitte.png')
                }
                style={{
                  width: SF(25),
                  height: SF(25),
                  resizeMode: "contain",
                  tintColor: Colors.light,
                }}
              />
            );
          }
          else if (route.name === 'MyProfile') {
            tabBarIcon = (
              <Image source={ require('../Images/user.png')}
                style={{
                  width: SF(25),
                  height: SF(25),
                  resizeMode: "contain"
                }}
              />
            );
          } else {
           if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            }
            tabBarIcon = (
              <IconComponent
                name={iconName}
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
        },
      })}
    >
      <Tab.Screen name="Explore" component={Explore} options={{ tabBarLabel: 'Explore' }} />
      <Tab.Screen name="Pandit" component={Pandit} options={{ tabBarLabel: 'Pandit' }} />
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Home' }} />
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
          width:(210)
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
      <Drawer.Screen name="DharamsalaDetail" component={DharamsalaDetail} />
      <Drawer.Screen name="CommunityFilter" component={CommunityFilter} />
      <Drawer.Screen name="RoleRegisterForm" component={RoleRegisterForm} />
      <Drawer.Screen name="PanditDetailPage" component={PanditDetailPage} />
      <Drawer.Screen name="KathavachakDetailsPage" component={KathavachakDetailsPage} />
      <Drawer.Screen name="JyotishDetailsPage" component={JyotishDetailsPage} />
      <Drawer.Screen name="PhotoGallery" component={PhotoGallery} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Location" component={Location} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="CreatePost" component={CreatePost} />
      <Drawer.Screen name="ViewPost" component={ViewPost} />
      <Drawer.Screen name="SuccessStories" component={SuccessStories} />
      <Drawer.Screen name="NotificationSettings" component={NotificationSettings} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
      <Drawer.Screen name="PrivacySettings" component={PrivacySettings} />
      <Drawer.Screen name="InActiveDelete" component={InActiveDelete} />
      <Drawer.Screen name="PostReview" component={PostReview}/>
      <Drawer.Screen name="ReportPage" component={ReportPage}/>
      <Drawer.Screen name="AllReviewsPage" component={AllReviewsPage}/>
      <Drawer.Screen name="DharamsalaSubmissionPage" component={DharamsalaSubmissionPage}/>
      <Drawer.Screen name="CommitteeSubmissionPage" component={CommitteeSubmissionPage}/>
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
      <Stack.Screen name="LoginSuccess" component={LoginSuccess} />
      <Stack.Screen name="MainApp" component={MyDrawer} />
      <Stack.Screen name="BioData" component={BioData} />
      <Stack.Screen name="Home" component={Home} />
    
    </Stack.Navigator>
  );
};

export default RootNavigator;

