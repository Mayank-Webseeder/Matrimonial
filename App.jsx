import 'react-native-gesture-handler';
import { StyleSheet} from 'react-native'
import React from 'react'
import RootNavigator from './src/Routing/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})