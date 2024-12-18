import { Text, View, ImageBackground, TouchableOpacity, Image, TextInput } from "react-native";
import React from "react";
import styles from "../StyleScreens/InformationStyle";

const Information = ({ navigation }) => {
    const HandleLogin = () => {
        navigation.navigate("MainApp");
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../Images/InformationBackground.png")}
                style={styles.image}
            >
                <View style={styles.contentContainer}>
                  <View style={styles.inputContainer}>
                  <Text style={styles.title}>Name</Text>
                  <TextInput style={styles.inputContain}/>
                  </View>
                  <View style={styles.inputContainer}>
                  <Text style={styles.title}>Email</Text>
                  <TextInput style={styles.input}/>
                  </View>
                  <View style={styles.inputContainer}>
                  <Text style={styles.title}>Password</Text>
                  <TextInput style={styles.input}/>
                  </View>
                  <View style={styles.inputContainer}>
                  <Text style={styles.title}>Date of Birth</Text>
                  <TextInput style={styles.input}/>
                  </View>
                  <View style={styles.inputContainer}>
                  <Text style={styles.title}>Country/Region</Text>
                  <TextInput style={styles.input}/>
                  </View>
                  <TouchableOpacity style={styles.button} onPress={HandleLogin}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

export default Information;
