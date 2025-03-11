import React from 'react';
import { View, Text, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import styles from '../StyleScreens/NotificationsStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../utils/Colors';
import Globalstyles from '../../utils/GlobalCss';
import { SF } from '../../utils/Dimensions';
import moment from 'moment';

const NotificationDetails = ({ route, navigation }) => {
    const { notification, NotificationData } = route.params;
    const data = notification || NotificationData;

    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            <View style={Globalstyles.header}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Notification' }], // Reset to Notification screen
                        });
                    }}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Notification Details</Text>
                </View>
            </View>

            <View style={styles.card}>
                {data?.relatedData?.photoUrl?.length > 0 && (
                    <Image source={{ uri: data.relatedData.photoUrl[0] }} style={styles.detailImage} />
                )}

                <Text style={[styles.name, { fontSize: SF(15) }]}>Name: {data?.relatedData?.likedBy?.name || data?.relatedData?.commentBy?.name}</Text>
                <Text style={styles.detailText}>Message: {data?.message}</Text>
                <Text style={styles.detailText}>Type: {data?.notificationType}</Text>
                <Text style={styles.detailText}>Date: {moment(data?.timestamp).format('DD-MM-YYYY')}</Text>
                <Text style={styles.detailText}>Time: {moment(data?.timestamp).format('hh:mm A')}</Text>
            </View>
        </SafeAreaView>
    );
};

export default NotificationDetails;
