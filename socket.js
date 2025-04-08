
import { ToastAndroid } from "react-native";
import io from "socket.io-client";

const SOCKET_URL = "https://api-matrimonial.webseeder.tech"

let socket = null;

export const initializeSocket = (userId) => {
    if (!socket) {  // 🔹 Only initialize if socket is not already connected
        socket = io(SOCKET_URL, {
            auth: { userId }
        });

        socket.on("connect", () => {
            console.log("✅ Socket connected:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("⚠️ Socket disconnected");
        });

        socket.on("connect_error", (error) => {
            console.error("🚨 Socket connection error:", error);
        });
    } else {
        console.log("⚡ Socket already initialized");
    }
};

export const getSocket = () => {
    if (!socket) {
        // ToastAndroid.show("Socket not initialized!", ToastAndroid.SHORT);
        throw new Error("Socket not initialized");
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        console.log("🚫 Socket disconnected");
        ToastAndroid.show("Socket disconnected!", ToastAndroid.SHORT);
        socket = null;
    }
};

