import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Splash from '../Screens/Splash';
import LoginSuccess from '../Screens/auth/LoginSuccess';
import Login from '../Screens/auth/Login';
import Verification from '../Screens/auth/Verification';
import Information from '../Screens/auth/Information';
import Home from '../Screens/Tabs/Home';
import Profile from '../Screens/Tabs/Profile';
import settings from '../Screens/Tabs/Settings'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();

const MyDrawer = createDrawerNavigator({
  screens: {
    Home: Home,
    Profile: Profile,
    settings:settings
  },
});

const RootNavigator = () => {
  return (
    <Stack.Navigator  initialRouteName='Splash' screenOptions={{
        headerShown:false
    }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen  name="Login" component={Login} />
       <Stack.Screen name="Verification" component={Verification} />
       <Stack.Screen  name="LoginSuccess"  component={LoginSuccess}  />
       <Stack.Screen name="Information" component={Information} />
       <Stack.Screen name="Home" component={MyDrawer} />
       
    </Stack.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
