import { Text, View, TextInput, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import styles from '../StyleScreens/FeedbackStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import { DrawerActions } from '@react-navigation/native';
import Globalstyles from '../../utils/GlobalCss';
const FeedBack = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {

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

      <View style={styles.feedBackContainer}>
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
          placeholderTextColor={'gray'}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Submit FeedBack</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default FeedBack
