import { StyleSheet,AppState } from 'react-native';
import React, {useEffect} from 'react';
import RootNavigator from './src/Routing/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/ReduxStore/Store';
import { Provider } from 'react-redux';
import InternetCheck from './src/Components/CheckInternet';
import FlashMessage from "react-native-flash-message";
import { SocketProvider } from './src/Socket/socketContext';
import { handleAppStateChange } from './socket';

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
  useEffect(() => {
    const appStateListener = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      appStateListener.remove();
    };
  }, []);
  return (
    <SocketProvider>
      <Provider store={store}>
        <NavigationContainer linking={linking}>
          <RootNavigator />
        </NavigationContainer>
        <InternetCheck />
        <FlashMessage position="bottom" />
      </Provider>
    </SocketProvider>
  );
};

export default App;

