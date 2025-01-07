import { Text, View, TouchableOpacity, Image, TextInput,SafeAreaView,StatusBar } from 'react-native'
import React from 'react'
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/CreatePostStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const CreatePost = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar 
                barStyle="dark-content" 
                backgroundColor="transparent" 
                translucent 
            />

            <View style={styles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('EventNews')}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Create Post</Text>
                </View>
                <View style={styles.righticons}>
                    <AntDesign name={'search1'} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} />
                    <AntDesign name={'bells'} size={25} color={Colors.theme_color} onPress={() => { navigation.navigate('Notification') }} />
                </View>
            </View>
            <View style={styles.postHeader}>
                <Image source={require('../../Images/user.png')} />
                <View style={styles.postTextContainer}>
                    <Text style={styles.postText}>Andrew Smith</Text>
                    <Text style={styles.postText}>ID no.: 98564785123</Text>
                </View>
            </View>
            <View style={styles.textContainer}>
                <TextInput style={styles.input} placeholder='Heading' placeholderTextColor={'gray'} />
                <TextInput style={styles.input} placeholder='Sub-Heading' placeholderTextColor={'gray'} />
                <TextInput style={styles.Textinput} placeholder='What’s on your mind?' placeholderTextColor={'gray'} />
            </View>
            <View style={styles.addPhoto}>
                <View>
                    <Text style={styles.Text}>Add Image or Video</Text>
                </View>
                <View style={styles.righticons}>
                    <AntDesign name={'camerao'} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} />
                    <AntDesign name={'videocamera'} size={25} color={Colors.theme_color} onPress={() => { navigation.navigate('Notification') }} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default CreatePost
