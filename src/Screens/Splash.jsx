import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import styles from './StyleScreens/SplashStyle';

const Splash = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <ImageBackground
                source={require('../Images/Splash.png')}
                style={styles.image}
            >
                <View style={styles.contentWrapper}>
                    <Text style={styles.text}>
                        Let’s meet new people around you
                    </Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.buttonText}>Signup</Text>
                        </TouchableOpacity>
                    </View>
                     <Text style={styles.signuptext}>
                          Don't have an account ? Then signup first
                        </Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default Splash;
