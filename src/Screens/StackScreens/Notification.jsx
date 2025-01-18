import { Text, View, TouchableOpacity, FlatList,SafeAreaView,StatusBar } from 'react-native'
import React from 'react'
import styles from '../StyleScreens/NotificationsStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { NotificationData } from '../../DummyData/DummyData';
import Globalstyles from '../../utils/GlobalCss';
const Notification = ({ navigation }) => {

  const renderItem = ({ item }) => {
    return (
      <View>
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
    )
  }
  return (
    <SafeAreaView style={Globalstyles.container}>
      <StatusBar 
                barStyle="dark-content" 
                backgroundColor="transparent" 
                translucent 
            />
      <View style={Globalstyles.header}>
        <View style={{ flexDirection: "row",alignItems:"center" }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name={'arrow-back-ios-new'} size={25} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={Globalstyles.headerText}>Notifications</Text>
        </View>
      </View>
      <View style={{flex:1}}>
        <FlatList
          data={NotificationData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  )
}

export default Notification
