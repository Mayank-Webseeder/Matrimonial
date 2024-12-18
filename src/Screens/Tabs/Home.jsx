import { View } from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../utils/Colors';
import styles from '../StyleScreens/HomeStyle';
const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
     <Entypo name={'menu'} size={20} color={Colors.theme_color}/>
     <Feather name={'search'} size={20} color={Colors.theme_color}/>
     <Entypo name={'bell'} size={20} color={Colors.theme_color}/>
      </View>
    </View>
  )
}

export default Home
