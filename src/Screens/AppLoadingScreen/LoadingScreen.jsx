import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { SH, SW } from '../../utils/Dimensions';
import Colors from '../../utils/Colors';
import { PROFILE_ENDPOINT } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setProfiledata} from '../../ReduxStore/Slices/ProfileSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
const LoadingScreen = () => {
  const dispatch=useDispatch();

  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      console.log("headers in profile", headers);
      const res = await axios.get(PROFILE_ENDPOINT, { headers });
      const ProfileData = res.data.data;

      dispatch(setProfiledata(ProfileData));
      console.log("ProfileData", ProfileData);
    } catch (error) {
      console.error(
        "Error fetching profile:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [])
  return (
    <View style={styles.container}>
      <Image source={require('../../Images/MatrimonialLogo.png')} style={styles.appLogo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light,
  },
  appLogo: {
    width: "100%",
    height: SH(300),
    resizeMode: "contain"
  }
});

export default LoadingScreen;
