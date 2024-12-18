import { Text, View, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './StyleScreens/SplashStyle'

const Splash = ({ navigation }) => {
    const HandleLogin = () => {
        navigation.navigate('Login')
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../Images/SplashBackground.png')} style={styles.image}>
                <Text style={styles.text}>Let’s meet new people around you</Text>
                <TouchableOpacity style={styles.button} onPress={HandleLogin}>
                    <Text style={styles.buttonText}>Use mobile number</Text>
                </TouchableOpacity>
                <View style={styles.signUpTextContainer}>
                    <Text style={styles.signuptext}>Don’t have an account?</Text>
                    <Text style={styles.boldSignupText}>Sign Up</Text>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Splash
