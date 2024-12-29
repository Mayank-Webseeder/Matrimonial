import React, { useRef } from "react";
import { Text, View, ImageBackground, TouchableOpacity, TextInput, ScrollView } from "react-native";
import styles from "../StyleScreens/VerificationStyle";

const Verification = ({ navigation }) => {
  const HandleLogin = () => {
    navigation.navigate("Login");
  };
  
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);

  const handleInputChange = (value, nextInputRef) => {
    if (value && nextInputRef) {
      nextInputRef.current.focus();
    }
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
            <TextInput
              style={styles.inputText}
              maxLength={1}  // Only allow 1 digit
              keyboardType="numeric"  // Ensure numeric input
              onChangeText={(value) => handleInputChange(value, input2Ref)}
              ref={input1Ref}  // Set the ref for this input
            />
            <TextInput
              style={styles.inputText}
              maxLength={1}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange(value, input3Ref)}
              ref={input2Ref}
            />
            <TextInput
              style={styles.inputText}
              maxLength={1}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange(value, input4Ref)}
              ref={input3Ref}
            />
            <TextInput
              style={styles.inputText}
              maxLength={1}
              keyboardType="numeric"
              onChangeText={(value) => handleInputChange(value, null)} 
              ref={input4Ref}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={HandleLogin}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Verification;
