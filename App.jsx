import { StyleSheet } from 'react-native';
import React, {} from 'react';
import RootNavigator from './src/Routing/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/ReduxStore/Store';
import { Provider } from 'react-redux';
import InternetCheck from './src/Components/CheckInternet';
import FlashMessage from "react-native-flash-message";
import { SocketProvider } from './src/Socket/socketContext';
const linking = {
  prefixes: ["https://yourwebsite.com"],
  config: {
    screens: {
      Pandit: "pandit/:id",
      EventNews: "event/:id",
      Dharmshala: "dharmshala/:id",
      Committee: "committee/:id",
      Jyotish: "jyotish/:id",
      Kathavachak: "kathavachak/:id",
      DharamsalaDetail: "DharamsalaDetail/:id",
      ViewMyEventPost: "ViewMyEventPost/:id",
      MatrimonyPeopleProfile: "profile/:profileId",
      IntrestReceivedProfilePage: "interest/:id",
      ShortMatrimonialProfile: "shortprofile/:id",
    },
  },
};

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer linking={linking}>
      <RootNavigator />
      <InternetCheck />
      <FlashMessage position="bottom" />
    </NavigationContainer>
  </Provider>
  );
};

export default App;

