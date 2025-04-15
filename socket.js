
import { showMessage } from "react-native-flash-message";
import io from "socket.io-client";

const SOCKET_URL = "https://api-matrimonial.webseeder.tech"

let socket = null;

export const initializeSocket = (userId) => {
    if (!socket) {  // 🔹 Only initialize if socket is not already connected
        const socket = io(SOCKET_URL, {
            transports: ['websocket'],
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
        showMessage({
            type: "info",
            message: "Socket not initialized!",
            icon: "info"
        })

        throw new Error("Socket not initialized");
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        console.log("🚫 Socket disconnected");
        showMessage({
            type: "info",
            message: "Socket disconnected!",
            icon: "info"
        })
        socket = null;
    }
};

