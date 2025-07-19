import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity, StatusBar, SafeAreaView, Linking } from 'react-native';
import styles from './StyleScreens/SplashStyle';

const Splash = ({ navigation }) => {
    const HandleLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <View>
                <ImageBackground
                    source={require('../Images/Splash.png')}
                    style={styles.image}
                >
                    <Text style={styles.text}>
                        Let’s meet new people around you
                    </Text>

                    <TouchableOpacity style={styles.button} onPress={HandleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <View style={styles.signUpTextContainer}>
                        <Text style={styles.signuptext}>
                            Don’t have an account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.boldSignupText}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <Text style={styles.linkText} onPress={handlePress}>
                        Privacy Policy
                    </Text> */}
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
};

export default Splash;
