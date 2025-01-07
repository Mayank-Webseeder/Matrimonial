import { Text, View, TouchableOpacity, FlatList,SafeAreaView,StatusBar } from 'react-native'
import React from 'react'
import styles from '../StyleScreens/NotificationsStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { NotificationData } from '../../DummyData/DummyData';
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
    <SafeAreaView style={styles.container}>
      <StatusBar 
                barStyle="dark-content" 
                backgroundColor="transparent" 
                translucent 
            />
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
            <MaterialIcons name={'arrow-back-ios-new'} size={23} color={Colors.theme_color} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Notifications</Text>
        </View>
      </View>
      <View>
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
