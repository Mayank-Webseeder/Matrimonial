import { Text, View, TextInput, TouchableOpacity, Image, StatusBar, ActivityIndicator,KeyboardAvoidingView,SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import styles from '../StyleScreens/FeedbackStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DrawerActions } from '@react-navigation/native';
import Globalstyles from '../../utils/GlobalCss';
import Colors from '../../utils/Colors';
import { FEEDBACK } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { SH } from '../../utils/Dimensions';
// import { SafeAreaView } from 'react-native-safe-area-context';

const FeedBack = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true)
      const token = await AsyncStorage.getItem('userToken'); // ✅ Fetch Token
      if (!token) throw new Error('No token found');

      const payload = {
        rating: rating,
        comment: comment,
      };

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      console.log('Payload:', payload);

      const response = await axios.post(FEEDBACK, payload, { headers });
      console.log("✅ Feedback Response:", JSON.stringify(response.data));

      if (response.status === 200) {
        showMessage({
          type: 'success',
          message: 'Success',
          description: response.data.message || 'Your Feedback has been submitted successfully!',
          icon: "success",
          duration: 5000
        });
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: "MainApp" }],
          });
        }, 2000);

      } else {
        throw new Error(response.data.message || "Something went wrong!");
      }

    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      console.error("Error fetching biodata:", errorMsg);

      const sessionExpiredMessages = [
        "User does not Exist....!Please login again",
        "Invalid token. Please login again",
        "Token has expired. Please login again"
      ];

      if (sessionExpiredMessages.includes(errorMsg)) {
        await AsyncStorage.removeItem("userToken");
        navigation.reset({
          index: 0,
          routes: [{ name: "AuthStack" }],
        });
      }
      showMessage({
        type: 'danger',
        message: 'Error',
        description: errorMsg,
        icon: "danger",
        duration: 5000
      });
      setLoading(false)
    }
    finally {
      setLoading
    }
  };


  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <AntDesign
            name={i <= rating ? 'star' : 'staro'}
            size={45}
            color={'#FF9900'}
            style={styles.star}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };


  return (
    <SafeAreaView style={Globalstyles.container} edges={['top', 'bottom']}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Image source={require('../../Images/menu.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Feedback</Text>
        </View>
      </View>
      <View style={Globalstyles.form}>
        <Text style={styles.Text}>Rate your experience</Text>
        <Text style={styles.description}>we highly value your feedback kindly take a moment to rate your experience and provide us with your valuable fedback</Text>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingContainer}>
            {renderStars()}
          </View>
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            style={{ minHeight: SH(100), textAlignVertical: 'top' }}
            placeholder="Tell us about your experience !"
            multiline
            value={comment}
            onChangeText={setComment}
            placeholderTextColor={"gray"}
          />
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text style={styles.submitText}>Send</Text>
          )}
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default FeedBack
