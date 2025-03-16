import { ToastAndroid } from "react-native";
import io from "socket.io-client";

const SOCKET_URL = "https://api-matrimonial.webseeder.tech"

let socket = null;

export const initializeSocket = (userId) => {
    // if(socket){
    //     socket.disconnect();
    // };

    socket = io(SOCKET_URL,{
        auth: {userId}
    })
}

export const getSocket = () => {
  if (!socket) {
      ToastAndroid.show("Socket not initialized!", ToastAndroid.SHORT);
      throw new Error("Socket not initialized");
  }
  return socket;
};

export const disconnectSocket = () => {
    if(socket){
        socket.disconnect();
        ToastAndroid.show("Socket disconnected!", ToastAndroid.SHORT);
        socket = null;
    }
}
