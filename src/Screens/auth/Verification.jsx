import { Text, View, ImageBackground, TouchableOpacity, TextInput, ScrollView } from "react-native";
import React from "react";
import styles from "../StyleScreens/VerificationStyle";

const Verfication = ({ navigation }) => {
    const HandleLogin = () => {
        navigation.navigate("LoginSuccess");
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../Images/VerificationBackground.png")}
                style={styles.image}
            >
                <ScrollView 
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.text}>Verification Code</Text>
                    <Text style={styles.passwordText}>
                    We have sent the verification code to your email address
                    </Text>
                   <View style={styles.verficationInputs}>
                   <TextInput style={styles.inputText}/>
                     <TextInput style={styles.inputText}/>
                     <TextInput style={styles.inputText}/>
                     <TextInput style={styles.inputText}/>
                   </View>
                    <TouchableOpacity style={styles.button} onPress={HandleLogin}>
                        <Text style={styles.buttonText}>Confirm</Text>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        </View>
    );
};

export default Verfication;
