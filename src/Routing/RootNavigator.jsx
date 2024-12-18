import { StyleSheet, Text, View } from 'react-native';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from '../Screens/Tabs/Home';
import Profile from '../Screens/Tabs/Profile';
import Users from '../Screens/Tabs/Users';
import Location from '../Screens/Tabs/Location';
import SearchBook from '../Screens/Tabs/SearchBook';
import {SF,SH} from '../utils/Dimensions';
import Colors from '../utils/Colors';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          let IconComponent = MaterialCommunityIcons;
          let iconSize = 30;

          if (route.name === 'Profile') {
            iconName = 'user-o';
            IconComponent = FontAwesome;
            iconSize = 35; 
          } else if (route.name === 'Home') {
            iconName = 'home-outline';
            iconSize = 30;
          } else if (route.name === 'SearchBook') {
            iconName = 'book-search';
            IconComponent = MaterialCommunityIcons;
            iconSize = 30;
          } else if (route.name === 'Location') {
            iconName = 'compass';
            IconComponent = Ionicons;
            iconSize = 30;
          } else if (route.name === 'Users') {
            iconName = 'users';
            IconComponent = FontAwesome;
            iconSize = 25;
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
          height: SH(60), 
          borderTopLeftRadius:15,
          borderTopRightRadius:15,
          paddingTop:SH(10)
        },
      })}
    >
      <Tab.Screen name="Location" component={Location} />
      <Tab.Screen name="SearchBook" component={SearchBook} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Users" component={Users} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}


function MyDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Tabs" component={MyTabs} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Users" component={Users} />
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
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Verification" component={Verification} />
      <Stack.Screen name="LoginSuccess" component={LoginSuccess} />
      <Stack.Screen name="Information" component={Information} />
      <Stack.Screen name="MainApp" component={MyDrawer} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
