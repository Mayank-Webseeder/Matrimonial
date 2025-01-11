import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const toastConfig = {
  success: ({ text1, text2 }) => (
    <View style={styles.toastContainer}>
      <Text style={styles.toastTitle}>{text1}</Text>
      <Text style={styles.toastMessage}>{text2}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    padding: 10,
    backgroundColor: "green",
    borderRadius: 8,
  },
  toastTitle: {
    fontWeight: "bold",
    color: "white",
  },
  toastMessage: {
    color: "white",
  },
});
