import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import styles from '../StyleScreens/FeedbackStyle';
import Entypo from 'react-native-vector-icons/Entypo';
const FeedBack = ({ navigation }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {

  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../Images/menu.png')} onPress={() => navigation.navigate('Tabs')} />
        <Text style={styles.headerText}>Feedback</Text>
      </View>

      <Text style={styles.Text}>Feedback</Text>
      <Text style={styles.description}>Share your experience in scaling</Text>
      <View style={styles.ratingContainer}>
        <Entypo name={'star-outlined'} size={30} color={'#FF9900'} style={styles.star} />
        <Entypo name={'star-outlined'} size={30} color={'#FF9900'} style={styles.star} />
        <Entypo name={'star-outlined'} size={30} color={'#FF9900'} style={styles.star} />
        <Entypo name={'star-outlined'} size={30} color={'#FF9900'} style={styles.star} />
        <Entypo name={'star-outlined'} size={30} color={'#FF9900'} style={styles.star} />
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
        <Text style={styles.submitText}>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FeedBack
