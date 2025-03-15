import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, Image, SafeAreaView, Text, StatusBar, ActivityIndicator,ToastAndroid,Alert } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/HomeStyle';
import Colors from '../../utils/Colors';
import HeadingWithViewAll from '../../Components/HeadingWithViewAll';
import { profileImages, Category, communityData, slider } from '../../DummyData/DummyData';
import { ScrollView } from 'react-native-gesture-handler';
import AppIntroSlider from 'react-native-app-intro-slider';
import Globalstyles from '../../utils/GlobalCss';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { GET_ACTIVIST, GET_ALL_BIODATA_PROFILES, GET_BIODATA, PROFILE_ENDPOINT,NOTIFICATION } from '../../utils/BaseUrl';
import { useDispatch } from 'react-redux';
import { setAllBiodata } from '../../ReduxStore/Slices/GetAllBiodataSlice';
import { setBioData } from '../../ReduxStore/Slices/BiodataSlice';
import { useFocusEffect } from '@react-navigation/native';
import { setActivistdata } from '../../ReduxStore/Slices/ActivistSlice';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { setProfiledata } from '../../ReduxStore/Slices/ProfileSlice';
import { getSocket} from '../../../socket';
import Toast from 'react-native-toast-message';
import { setAllNotification } from '../../ReduxStore/Slices/GetAllNotificationSlice';
import { SF, SW ,SH} from '../../utils/Dimensions';
const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const [socket, setSocket] = useState(null); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [biodata, setBiodata] = useState("");
  const [allbiodata, setallBiodata] = useState("");
  const [mybiodata, setMybiodata] = useState("");
  const partnerPreferences = mybiodata?.partnerPreferences;
  const [isLoading, setIsLoading] = useState(false);
  const blurPhotos = useSelector((state) => state.privacy.blurPhotos);
  const [profiledata, setProfileData] = useState('');
  const notifications = useSelector((state) => state.GetAllNotification.AllNotification);
  const notificationCount = notifications ? notifications.length : 0;
  
  const GetAll_Notification = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) throw new Error("No token found");
  
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
  
        const res = await axios.get(NOTIFICATION, { headers });
        const notificationData = res.data.data;
        // console.log("notificationData", JSON.stringify(notificationData));
        dispatch(setAllNotification(notificationData));
      } catch (error) {
        console.error("Error fetching notifications:", error.response ? error.response.data : error.message);
      } finally {
        setIsLoading(false);
      }
    };

  useEffect(()=>{
    console.log("notifications",notificationCount)
  },[])

  useFocusEffect(
    React.useCallback(() => {
      fetchProfile();
      GetAll_Notification();
    }, [])
  );

  const handleNavigateToProfile = (item) => {
    if (!navigation.isFocused()) return;

    // console.log("Current Partner Preferences:", mybiodata?.partnerPreferences);

    if (!mybiodata || !mybiodata.partnerPreferences) {
      // Partner preferences nahi hai, toh "Matrimonial" screen par bhejo
      console.log("Navigating to Matrimonial because Partner Preferences are missing");
      navigation.navigate("ShortMatrimonialProfile", {
        userDetails: item,
      });
    } else {
      // Partner preferences hai, toh "MatrimonyPeopleProfile" screen par bhejo
      console.log("Navigating to MatrimonyPeopleProfile");
      navigation.navigate("MatrimonyPeopleProfile", {
        userDetails: item,
        userId: item._id,
        isSaved: item.isSaved
      });
    }
  };


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
      console.log("Profile Response:", res.data);

      setProfileData(res.data.data); // ✅ State update karo
      dispatch(setProfiledata(res.data.data)); // Redux update karo

    } catch (error) {
      console.error("Error fetching profile:", error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToNewMatches = useCallback(async () => {
    try { 
        const socket = getSocket();

        if (socket.connected) {
            console.log("✅ Socket already connected. Listening to new events!");
            ToastAndroid.show("✅ Socket already connected. Listening to new events!", ToastAndroid.SHORT);
        } else {
            console.log("⏳ Socket not connected. Connecting...");
            ToastAndroid.show("🔄 Reconnecting to Socket...", ToastAndroid.SHORT);
            socket.connect();
        }

        console.log("📡 Subscribing to events...");

        // 🔥 Catch-all event listener for debugging
        socket.onAny((event, data) => {
            console.log(`📡 Received Event: ${event}`, data);
        });

        // 🟢 Listening for "newMatch"
        socket.on("newMatch", (newMatch) => {
            console.log("🔥 New Match Received:", newMatch);

            ToastAndroid.show("You got a new Connection!", ToastAndroid.SHORT);

            if (newMatch?.name) {
                ToastAndroid.show(`🎉 Matched with ${newMatch.name}`, ToastAndroid.SHORT);
            }
        });

        // 🟢 Listening for "connectionRequestResponse"
        socket.on("connectionRequestResponse", (data) => {
            console.log("✅ Connection Request Response Received:", data);

            if (data?.message) {
                ToastAndroid.show(`${data.message}`, ToastAndroid.SHORT);
            } else {
                ToastAndroid.show("You have a new connection request response!", ToastAndroid.SHORT);
            }
        });

    } catch (e) {
        console.error("🚨 Error in subscribeToNewMatches:", e);
        ToastAndroid.show("❌ Error subscribing to events!", ToastAndroid.SHORT);
    }
}, []);

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

useEffect(() => {
    subscribeToNewMatches();

    return () => {
        unsubscribeFromNewMatches();
    };
}, [subscribeToNewMatches, unsubscribeFromNewMatches]);




  // 🟢 Subscribe to New Matches
  // const subscribeToNewMatches = (socket) => {
  //   if (!socket) {
  //     console.error("🚨 No Socket Found for New Matches!");
  //     return;
  //   }
  
  //   console.log("📡 Subscribing to new matches...");
    
  //   socket.off("connectionRequestResponse"); // ✅ Prevent duplicate listeners
  //   socket.on("connectionRequestResponse", (newMatch) => {
  //     console.log("🎉 New Match Received:", newMatch);
  //     Toast.show({
  //       type: "success",
  //       text1: "New Connection!",
  //       text2: "You got a new Connection!",
  //       position: "top",
  //       visibilityTime: 4000,
  //     });
  //   });
  
  //   console.log("✅ Subscribed to New Matches.");
  //   console.log("🧐 Listeners after subscription:", socket.listeners("connectionRequestResponse"));
  // };
  

  // // 🟡 Subscribe to Connection Requests
  // const subscribeToConnectionRequests = (socket) => {
  //   if (!socket) return console.error("🚨 No Socket Found for Connection Requests!");

  //   socket.off("connectionRequest");
  //   console.log("📡 Subscribing to Connection Requests...");

  //   socket.on("connectionRequest", (data) => {
  //     console.log("🔔 New Connection Request:", data);
  //     Toast.show({
  //       type: "success",
  //       text1: "New Connection Request!",
  //       text2: `You got a new request from ${data.username}.`,
  //       position: "top",
  //       visibilityTime: 4000,
  //     });
  //   });

  //   console.log("✅ Subscribed to Connection Requests.");
  // };

  // // ❤️ Subscribe to Post Events (Comments & Likes)
  // const subscribeToPostEvents = (socket) => {
  //   if (!socket) return console.error("🚨 No Socket Found for Post Events!");

  //   socket.off("post-commented");
  //   socket.off("post-liked");

  //   console.log("📡 Subscribing to Post Events...");

  //   socket.on("post-commented", (data) => {
  //     console.log("💬 New Comment on Post:", data);
  //     Toast.show({
  //       type: "info",
  //       text1: "New Comment!",
  //       text2: `New comment by ${data.commentBy.name} on your post!`,
  //       position: "top",
  //       visibilityTime: 4000,
  //     });
  //   });

  //   socket.on("post-liked", (data) => {
  //     console.log("❤️ Post Liked:", data);
  //     Toast.show({
  //       type: "success",
  //       text1: "Post Liked!",
  //       text2: `${data.likedBy.name} liked your post!`,
  //       position: "top",
  //       visibilityTime: 4000,
  //     });
  //   });

  //   console.log("✅ Subscribed to Post Events.");
  // };


  const GetAll_Biodata = async () => {
    setIsLoading(true)
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      console.log("headers in profile", headers);
      const res = await axios.get(GET_ALL_BIODATA_PROFILES, { headers });
      const biodata = res.data.feedUsers;
      // console.log("res.data.feedUsers", JSON.stringify(res.data.feedUsers))
      setallBiodata(biodata);
      // console.log("biodata", biodata);
      dispatch(setAllBiodata(biodata));
    } catch (error) {
      console.error(
        "Error fetching profile:",
        error.response ? error.response.data : error.message
      );
      setIsLoading(false)
    }
    finally {
      setIsLoading(false)
    }
  }

  const getBiodata = async () => {
    try {
      setIsLoading(true)
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(GET_BIODATA, { headers });
      if (response.data) {
        const fetchedData = response.data.data;
        // console.log("My bio data", fetchedData);
        setMybiodata(fetchedData);
        dispatch(setBioData(fetchedData));
        setIsLoading(false)
      } else {
        setBiodata({});
      }
    } catch (error) {
      console.error("Error fetching biodata:", error);
    }
    finally {
      setIsLoading(false)
    }
  };

  const getActivistProfile = async () => {
    try {
      setIsLoading(true)
      const token = await AsyncStorage.getItem('userToken');
      if (!token) throw new Error('No token found');

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const response = await axios.get(GET_ACTIVIST, { headers });
      console.log("Activist data", response.data)
      if (response.data && response.data.data && response.data.data) {
        const fetchedData = response.data.data;
        dispatch(setActivistdata(fetchedData));
        setIsLoading(false)
      } else {
        setActivistdata({});
      }
    } catch (error) {
      console.error("Error fetching biodata:", error);
    }
    finally {
      setIsLoading(false)
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      GetAll_Biodata();
      getBiodata();
      getActivistProfile();
    }, [])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < slider.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        sliderRef.current?.goToSlide(currentIndex + 1);
      } else {
        setCurrentIndex(0);
        sliderRef.current?.goToSlide(0);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);


  if (isLoading) {
    return <View style={styles.loading}>
      <ActivityIndicator size={'large'} color={Colors.theme_color} />
    </View>;
  }

  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={Globalstyles.header}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={require('../../Images/menu.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Home</Text>
        </View>
        <View style={styles.righticons}>
          {/* <AntDesign name={'search1'} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} /> */}
          <View style={{ position: 'relative' }}>
      <AntDesign
        name="bells"
        size={25}
        color={Colors.theme_color}
        onPress={() => navigation.navigate('Notification')}
      />
      {notificationCount > 0 && (
        <View
          style={{
            position: 'absolute',
            right: -5,
            top: -5,
            backgroundColor: 'red',
            borderRadius: 10,
            paddingHorizontal:SW(3),
            paddingVertical:SH(1),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize:SF(9),fontFamily:"Poppins-Bold" }}>
            {notificationCount}
          </Text>
        </View>
      )}
    </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.sliderContainer}>
          <AppIntroSlider
            ref={sliderRef}
            data={slider}
            renderItem={({ item }) => (
              <View>
                <Image source={item.image} style={styles.sliderImage} />
              </View>
            )}
            showNextButton={false}
            showDoneButton={false}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
          />
        </View>


        <View>
          <HeadingWithViewAll
            heading="MATRIMONY"
            showViewAll={true}
            onViewAllPress={() => {
              if (mybiodata && mybiodata.partnerPreferences) {
                navigation.navigate("BioData"); 
              } else {
                navigation.navigate("Matrimonial"); 
              }
            }}
            
          />

          <FlatList
            data={allbiodata}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.imageWrapper}>
                <TouchableOpacity onPress={() => handleNavigateToProfile(item)}>
                  <Image
                    source={
                      item?.personalDetails?.closeUpPhoto
                        ? { uri: item.personalDetails.closeUpPhoto }
                        : require("../../Images/NoImage.png")
                    }
                    style={styles.ProfileImages}
                    blurRadius={blurPhotos ? 10 : 0}
                  />

                  {item.verified && (
                    <View style={styles.verifiedContainer}>
                      <Image
                        source={require("../../Images/verified.png")}
                        style={styles.verifiedBadge}
                      />
                      <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No Matrimonial Profile Created Yet</Text>
              </View>
            }
          />

        </View>

        <View>
          <HeadingWithViewAll
            heading="PANDIT / JOYTISH / KATHAVACHAK"
            showViewAll={false}
          />
          <FlatList
            data={Category}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.CategoryContainer} onPress={() => {
                if (item.screen) {
                  navigation.navigate(item.screen);
                } else {
                  console.warn("Screen not specified for this category.");
                }
              }}
              >
                <Image source={item.image} style={styles.images} />
                <Text style={styles.text}>{item.text}</Text>
              </TouchableOpacity>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <HeadingWithViewAll
            heading="BRAHMIN COMMUNITY"
            showViewAll={false}
          />
          <FlatList
            data={communityData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.CategoryContainer} onPress={() => {
                if (item.screen) {
                  navigation.navigate(item.screen)
                }
                else {
                  console.warn("Screen not specified")
                }
              }}>
                <Image source={item.image} style={styles.images} />
                <Text style={styles.text}>{item.text}</Text>
              </TouchableOpacity>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Image source={require('../../Images/slider.png')} style={Globalstyles.bottomImage} />
      </ScrollView>
      <Toast/>
    </SafeAreaView>
  );
};

export default Home;