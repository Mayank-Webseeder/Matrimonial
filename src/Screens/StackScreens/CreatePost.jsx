import { Text, View, TouchableOpacity, Image, TextInput,SafeAreaView,StatusBar,ScrollView } from 'react-native'
import React,{useState} from 'react'
import Colors from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../StyleScreens/CreatePostStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import Globalstyles from '../../utils/GlobalCss';

const CreatePost = ({navigation}) => {
    const [photos,setPhotos]=useState('');
    
    const handleImagePick = () => {
            launchImageLibrary({ mediaType: 'photo', selectionLimit: 5 }, response => {
                if (response.assets) {
                    setPhotos(response.assets);
                }
            });
        };
    
    return (
        <SafeAreaView style={Globalstyles.container}>
            <StatusBar 
                barStyle="dark-content" 
                backgroundColor="transparent" 
                translucent 
            />

            <View style={Globalstyles.header}>
                <View style={{ flexDirection: 'row',alignItems:"center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios-new" size={25} color={Colors.theme_color} />
                    </TouchableOpacity>
                    <Text style={Globalstyles.headerText}>Create Post</Text>
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
                <TextInput style={Globalstyles.input} placeholder='Title' placeholderTextColor={'gray'} />
                <TextInput style={Globalstyles.textInput} 
                placeholder='What’s on your mind?' placeholderTextColor={'gray'}
                textAlignVertical='top' />
            </View>
            <View style={styles.addPhoto}>
                <View>
                    <Text style={styles.Text}>Add Image ( Max Limit 5 )</Text>
                </View>
                <View style={styles.righticons}>
              <TouchableOpacity onPress={handleImagePick}>
              <AntDesign name={'camerao'} size={25} color={Colors.theme_color} style={{ marginHorizontal: 10 }} />
              </TouchableOpacity>
                    {/* <AntDesign name={'videocamera'} size={25} color={Colors.theme_color} /> */}
                </View>
            </View>
            {photos.length > 0 && (
                        <View style={styles.photosContainer}>
                            <Text style={Globalstyles.title}>Uploaded Photos:</Text>
                            <ScrollView horizontal>
                                {photos.map((photo, index) => (
                                    <Image key={index} source={{ uri: photo.uri }} style={styles.photo} />
                                ))}
                            </ScrollView>
                        </View>
                    )}
                     <TouchableOpacity style={styles.PostButton}>
                       <Text style={styles.PostText}>Submit Post</Text>
                    </TouchableOpacity>
        </SafeAreaView>
    )
}

export default CreatePost
