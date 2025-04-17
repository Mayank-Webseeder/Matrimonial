import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { initializeSocket, getSocket, disconnectSocket } from "../../socket";

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        console.log("🔄 Trying to initialize socket...");
        const userId = await AsyncStorage.getItem("userId");

        if (!userId) {
          console.error("❌ No user ID found in storage.");
          setLoading(false);
          return;
        }

        console.log(`✅ User ID found: ${userId}`);
        initializeSocket(userId);

        const activeSocket = getSocket();
        if (activeSocket) {
          setSocket(activeSocket);
          console.log("✅ Socket successfully initialized.");
        } else {
          console.error("❌ Failed to get active socket after initialization.");
        }

      } catch (error) {
        console.error("🚨 Error initializing socket:", error);
      } finally {
        setLoading(false);
        console.log("🔁 Socket initialization process completed.");
      }
    };

    init();

    return () => {
      console.log("🔌 Cleaning up socket connection...");
      disconnectSocket();
      setSocket(null);
    };
  }, []);

  useEffect(() => {
    if (!socket) {
      console.warn("⚠️ No socket to bind events to.");
      return;
    }

    console.log("📡 Binding all socket events...");

    const showToast = (message, type = "success") => {
      showMessage({
        message,
        type,
        duration: 3000,
        icon: type,
      });
    };

    // First, remove all previous listeners
    socket.offAny();
    socket.removeAllListeners();

    // Log every incoming event
    socket.onAny((event, data) => {
      console.log(`📥 Received event: '${event}' with data:`, data);
    });

    // Connection Events
    socket.on("newMatch", (data) => {
      console.log("📩 newMatch:", data);
      showToast(`🎉 Matched with ${data?.name || "someone"}`);
    });

    socket.on("connectionRequest", (data) => {
      console.log("📩 connectionRequest:", data);
      showToast(`New request from ${data?.username}`);
    });

    socket.on("connectionRequestResponse", (data) => {
      console.log("📩 connectionRequestResponse:", data);
      showToast(data?.message);
    });

    // Post Events
    socket.on("post-commented", (data) => {
      console.log("📩 post-commented:", data);
      showToast(`New comment by ${data?.commentBy?.name}`);
    });

    socket.on("post-liked", (data) => {
      console.log("📩 post-liked:", data);
      showToast(`${data?.likedBy?.name} liked your post!`);
    });

    // Approval Events
    socket.on("panditRequestApproved", (data) => {
      console.log("📩 panditRequestApproved:", data);
      showToast(data?.message);
    });

    socket.on("kathavachakRequestApproved", (data) => {
      console.log("📩 kathavachakRequestApproved:", data);
      showToast(data?.message);
    });

    socket.on("jyotishRequestApproved", (data) => {
      console.log("📩 jyotishRequestApproved:", data);
      showToast(data?.message);
    });

    socket.on("activistRequestApproved", (data) => {
      console.log("📩 activistRequestApproved:", data);
      showToast(data?.message);
    });

    // Cleanup
    return () => {
      console.log("🧹 Cleaning up socket event listeners...");
      socket.offAny();
      socket.removeAllListeners();
    };
  }, [socket]);

  if (loading) {
    console.log("⏳ Waiting for socket setup...");
    return null;
  }

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
