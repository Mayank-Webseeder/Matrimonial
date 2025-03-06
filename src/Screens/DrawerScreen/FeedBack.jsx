import { Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import styles from '../StyleScreens/FeedbackStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import { DrawerActions } from '@react-navigation/native';
import Globalstyles from '../../utils/GlobalCss';
import Colors from '../../utils/Colors';
import { FEEDBACK } from '../../utils/BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';

const FeedBack = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async () => {
    try {
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
      console.log("feedback response", JSON.stringify(response.data))
      if (response.status === 200 || response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: response.data.message || 'Your Feedback has been submitted successfully!',
        });

        setTimeout(() => {
          navigation.navigate('MainApp');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting feedback :', error);

      let errorMessage = 'Failed to submit feedback . Please try again later.';

      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message; // ✅ Show API error message
      }

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
      });
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Entypo
            name={i <= rating ? 'star' : 'star-outlined'}
            size={30}
            color={'#FF9900'}
            style={styles.star}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };


  return (
    <SafeAreaView style={Globalstyles.container}>
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
        <Text style={styles.Text}>Feedback</Text>
        <Text style={styles.description}>Share your experience in scaling</Text>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingContainer}>
            {renderStars()}
          </View>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Add your comments..."
          multiline
          value={comment}
          onChangeText={setComment}
          placeholderTextColor={Colors.gray}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit FeedBack</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </SafeAreaView>
  )
}

export default FeedBack
