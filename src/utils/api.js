// src/utils/api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { navigationRef } from "../navigation/RootNavigation"; // ये आपको बनाना होगा

const api = axios.create();

const sessionExpiredMessages = [
  "User does not Exist....!Please login again",
  "Invalid token. Please login again",
  "Token has expired. Please login again",
];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const message = error.response?.data?.message || error.message;

    if (sessionExpiredMessages.includes(message)) {
      await AsyncStorage.removeItem("userToken");

      navigationRef.current?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "AuthStack" }],
        })
      );
    }

    return Promise.reject(error);
  }
);

export default api;
