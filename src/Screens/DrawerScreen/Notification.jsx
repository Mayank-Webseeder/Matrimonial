import { Text, View ,TouchableOpacity,FlatList} from 'react-native'
import React from 'react'
import styles from '../StyleScreens/NotificationsStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import { NotificationData } from '../../DummyData/DummyData';
const Notification = ({navigation}) => {
    
    const renderItem=({item})=>{
     return(
        <View>
           <View style={styles.card}>
           <Text style={styles.name}>{item.name}</Text>
           <Text style={styles.message}>{item.message}</Text>
           </View>
        </View>
     )
    }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Tabs')} style={{ flexDirection: "row" }}>
          <MaterialIcons name={'arrow-back-ios-new'} size={23} color={Colors.theme_color} />
          <Text style={styles.headerText}>Notifications</Text>
        </TouchableOpacity>
      </View>
      <View>
            <FlatList
            data={NotificationData}
            renderItem={renderItem}
            keyExtractor={(item)=>item.id}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            />
        </View>
    </View>
  )
}

export default Notification
