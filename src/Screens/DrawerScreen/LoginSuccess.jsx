import { Text, View, ImageBackground, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "../StyleScreens/LoginSuccessStyle";

const LoginSuccess = ({ navigation }) => {
    const HandleLogin = () => {
        navigation.navigate("Information");
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../Images/LoginSuccessBackground.png")}
                style={styles.image}
            >
                <View style={styles.contentContainer}>
                    <Image
                        source={require("../../Images/success.png")}
                        style={styles.success_image}
                    />
                    <Text style={styles.text}>Success!</Text>
                    <Text style={styles.success}>
                        Congratulations! You have been successfully authenticated.
                    </Text>

                    <TouchableOpacity style={styles.button} onPress={HandleLogin}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

export default LoginSuccess;