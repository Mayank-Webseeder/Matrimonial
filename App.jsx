import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import RootNavigator from './src/Routing/RootNavigator';
import InternetCheck from './src/Components/CheckInternet';
import FlashMessage from "react-native-flash-message";
import store from './src/ReduxStore/Store';
import DeepLinkHandler from './src/Components/DeepLinkHandler';
import UpdateCheck from './src/Components/AppUpdateChecker ';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
        <InternetCheck />
        <UpdateCheck />
        <FlashMessage position="bottom" />
        <DeepLinkHandler />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
