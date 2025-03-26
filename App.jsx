import { StyleSheet, ToastAndroid } from 'react-native';
import React,{useState,useEffect,useCallback} from 'react';
import RootNavigator from './src/Routing/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/ReduxStore/Store';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import InternetCheck from './src/Components/CheckInternet';
import { PROFILE_ENDPOINT } from './src/utils/BaseUrl';
import { getSocket } from './socket';
import { setProfiledata } from './src/ReduxStore/Slices/ProfileSlice';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const linking = {
//   prefixes: ["matrimonialapp://", "https://yourwebsite.com"],
//   config: {
//       screens: {
//           Pandit: "pandit/:id",
//           EventNews: "event/:id",
//           Dharmshala: "dharmshala/:id",
//           Committee: "committee/:id",
//           Jyotish: "jyotish/:id",
//           Kathavachak: "kathavachak/:id",
//           DharamsalaDetail:"DharamsalaDetail/:id",
//           ViewMyEventPost:"ViewMyEventPost/id",
//           MatrimonyPeopleProfile: "profile/:profiidleId",
//           IntrestReceivedProfilePage: "interest/:id",
//           ShortMatrimonialProfile: "shortprofile/:id",
//       },
//   },
// };


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
   const [connReqNotification,setconnReqNotification] = useState("");
    const [eventPostNotification,seteventPostNotification] =useState("");
    const [profiledata, setProfileData] = useState('');
  useEffect(
      useCallback(() => {
        let isActive = true;
    
        const fetchAndSubscribe = async () => {
          await fetchProfile();
          if (isActive) {
            if (connReqNotification) {
              subscribeToNewMatches();
              subscribeToConnectionRequests();
            }
      
            if (eventPostNotification) {
              subscribeToPostEvents();
            }
          }
        };
    
        fetchAndSubscribe();
    
        return () => {
          isActive = false;
          unsubscribeFromNewMatches();
          unsubscribeToConnectionRequests();
          unsubscribeToPostEvents();
        };
      }, [connReqNotification, eventPostNotification])
    );

    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) throw new Error("No token found");
  
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        };
  
        console.log("headers in profile", headers);
        const res = await axios.get(PROFILE_ENDPOINT, { headers });
        const profiledata=res.data.data;
  
        console.log("Profile Response in app.js :",profiledata);
        setProfileData(profiledata);
        setconnReqNotification(profiledata?.connReqNotification)
        seteventPostNotification(profiledata?.eventPostNotification)
        dispatch(setProfiledata(profiledata));
  
      } catch (error) {
        console.error("Error fetching profile:", error.response ? error.response.data : error.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    const subscribeToNewMatches = useCallback(async () => {
  
      if (!connReqNotification) {
        console.log("❌ connReqNotification disabled. Not subscribing.");
        return;
      }
  
      try {
        const socket = getSocket();
  
        if (socket.connected) {
          console.log("✅ Socket already connected. Listening to new events!");
          // ToastAndroid.show("✅ Socket already connected. Listening to new events!", ToastAndroid.SHORT);
        } else {
          console.log("⏳ Socket not connected. Connecting...");
          // ToastAndroid.show("🔄 Reconnecting to Socket...", ToastAndroid.SHORT);
          socket.connect();
        }
  
        console.log("📡 Subscribing to events...");
  
        // 🔥 Catch-all event listener for debugging
        socket.onAny((event, data) => {
          console.log(`📡 Received Event: ${event}`, data);
        });
  
        // 🟢 Listening for "newMatch"
        if (connReqNotification) {
          socket.on("newMatch", (newMatch) => {
            console.log("🔥 New Match Received:", newMatch);
            ToastAndroid.show(`🎉 Matched with ${newMatch.name || "someone"}!`, ToastAndroid.SHORT);
          });
  
          socket.on("connectionRequestResponse", (data) => {
            console.log("✅ Connection Request Response Received:", data);
            ToastAndroid.show(data?.message || "You have a new connection request response!", ToastAndroid.SHORT);
          });
        }
  
      } catch (e) {
        console.error("🚨 Error in subscribeToNewMatches:", e);
        // ToastAndroid.show("❌ Error subscribing to events!", ToastAndroid.SHORT);
      }
    }, [connReqNotification]);
  
    const unsubscribeFromNewMatches = useCallback(async () => {
      try {
        const socket = getSocket();
        console.log("🔴 Unsubscribing from events...");
        socket.off("newMatch");
        socket.off("connectionRequestResponse");
      } catch (e) {
        console.log("🚨 Error unsubscribing:", e);
      }
    }, []);
  
    const subscribeToConnectionRequests = useCallback(async () => {
      if (!connReqNotification) {
        console.log("❌ connReqNotification disabled. Not subscribing.");
        return;
      }
      try {
        const socket = getSocket();
  
        if (socket.connected) {
          console.log("✅ Socket already connected. Listening to new events!");
          // ToastAndroid.show("✅ Socket already connected. Listening to new events!", ToastAndroid.SHORT);
        } else {
          console.log("⏳ Socket not connected. Connecting...");
          // ToastAndroid.show("🔄 Reconnecting to Socket...", ToastAndroid.SHORT);
          socket.connect();
        }
  
        console.log("📡 Subscribing to events...");
        socket.onAny((event, data) => {
          console.log(`📡 Received Event: ${event}`, data);
        });
  
        if (connReqNotification) {
  
          socket.on("connectionRequest", (data) => {
            console.log("✅ Connection Request Response Received:", data);
  
            if (data.username) {
              ToastAndroid.show(`You have a new connection from  ${data.username}`, ToastAndroid.SHORT);
            } else {
              ToastAndroid.show("You have a new connection request response!", ToastAndroid.SHORT);
            }
          });
        }
        // 🟢 Listening for "connectionRequest"
  
      } catch (e) {
        console.error("🚨 Error in subscribeToNewMatches:", e);
        // ToastAndroid.show("❌ Error subscribing to events!", ToastAndroid.SHORT);
      }
    }, [connReqNotification]);
  
    const unsubscribeToConnectionRequests = useCallback(async () => {
      try {
          const socket = getSocket();
          console.log("🔴 Unsubscribing from events...");
          socket.off("connectionRequest"); // Remove event listener properly
          socket.off("connectionRequestResponse");
      } catch (e) {
          console.log("🚨 Error unsubscribing:", e);
      }
  }, []);
  
    const subscribeToPostEvents = useCallback(async () => {
      if (!eventPostNotification) {
        console.log("❌ Events disabled. Not subscribing.");
        return;
      }
  
      try {
        const socket = getSocket();
  
        if (socket.connected) {
          console.log("✅ Socket already connected. Listening to new events!");
          // ToastAndroid.show("✅ Socket already connected. Listening to new events!", ToastAndroid.SHORT);
        } else {
          console.log("⏳ Socket not connected. Connecting...");
          // ToastAndroid.show("🔄 Reconnecting to Socket...", ToastAndroid.SHORT);
          socket.connect();
        }
  
        console.log("📡 Subscribing to events...");
  
        // 🔥 Catch-all event listener for debugging
        socket.onAny((event, data) => {
          console.log(`📡 Received Event: ${event}`, data);
        });
  
        if (eventPostNotification) {
          // 🟢 Listening for "newMatch"
          socket.on("post-commented", (data) => {
            console.log("💬 New Comment on Post:", data);
            // ToastAndroid.show("Your got a new Connection!", ToastAndroid.SHORT);
  
            if (data.commentBy.name) {
              Toast.show({
                type: 'success',
                text1: `🎉 New comment by ${data.commentBy.name}!`,
                text2: 'Check your post for new comments.',
              });
            }
          });
  
          // 🟢 Listening for "connectionRequestResponse"
          socket.on("post-liked", (data) => {
            console.log("❤️ Post Liked:", data);
  
            if (data.likedBy.name) {
              ToastAndroid.show(`${data.likedBy.name} liked your post!`, ToastAndroid.SHORT);
            } else {
              ToastAndroid.show("liked your post!", ToastAndroid.SHORT);
            }
          });
        }
  
  
      } catch (e) {
        console.error("🚨 Error in subscribeToNewMatches:", e);
        // ToastAndroid.show("❌ Error subscribing to events!", ToastAndroid.SHORT);
      }
    }, [eventPostNotification]);
  
    const unsubscribeToPostEvents = useCallback(async () => {
      try {
        const socket = getSocket();
        console.log("🔴 Unsubscribing from events...");
        socket.off("post-commented");
        socket.off("post-liked");
      } catch (e) {
        console.log("🚨 Error unsubscribing:", e);
      }
    }, []);

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <RootNavigator />
      </NavigationContainer>
      <InternetCheck />
      <Toast/>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});