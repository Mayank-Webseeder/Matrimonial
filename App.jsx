
import { StyleSheet} from 'react-native'
import React from 'react'
import RootNavigator from './src/Routing/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/ReduxStore/Store';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Toast />
      <RootNavigator/>
    </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})
