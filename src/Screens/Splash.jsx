import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity, StatusBar,SafeAreaView } from 'react-native';
import styles from './StyleScreens/SplashStyle';

const Splash = ({ navigation }) => {
    const HandleLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar 
                barStyle="dark-content" 
                backgroundColor="transparent" 
                translucent 
            />
            <View>
                <ImageBackground
                    source={require('../Images/SplashBackground.png')}
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
                </ImageBackground>
            </View>
        </SafeAreaView>
    );
};

export default Splash;
