import { useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { PROFILE_ENDPOINT } from "../../utils/BaseUrl";
import { getSocket,initializeSocket } from "../../../socket";

const useNotificationListener = () => {
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchAndSubscribe = async () => {
        try {
          const token = await AsyncStorage.getItem("userToken");
          if (!token) throw new Error("No token found");

          const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };
          const res = await axios.get(PROFILE_ENDPOINT, { headers });

          const profileData = res.data.data;
          console.log("Profile Data:", profileData);

          if (!profileData) return;
          initializeSocket(profileData.id); 

          if (isActive && (profileData.connReqNotification || profileData.eventPostNotification)) {
            subscribeToEvents(profileData.connReqNotification, profileData.eventPostNotification);
          }
        } catch (error) {
          console.error("Error fetching profile:", error.response ? error.response.data : error.message);
        }
      };

      fetchAndSubscribe();

      return () => {
        isActive = false;
        unsubscribeFromEvents();
      };
    }, [])
  );
};

const subscribeToEvents = (connReqNotification = true, eventPostNotification = true) => {
  const socket = getSocket(); 

  if (!socket) {
    console.error("❌ Socket not initialized!");
    return;
  }

  console.log("📡 Subscribing to events...");
  socket.onAny((event, data) => {
    console.log(`📡 Received Event: ${event}`, data);
  });

  const showToast = (message) => {
    setTimeout(() => {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }, 100);
  };

  if (connReqNotification) {
    socket.on("newMatch", (newMatch) => {
      console.log("🔥 New Match Received:", newMatch);
      showToast(`🎉 Matched with ${newMatch.name || "someone"}!`);
    });

    socket.on("connectionRequest", (data) => {
      console.log("🔔 Connection Request:", data);
      showToast(`You have a new connection from ${data.username || "someone"}`);
    });

    socket.on("connectionRequestResponse", (data) => {
      console.log("✅ Connection Request Response Received:", data);
      showToast(data?.message || "You have a new connection request response!");
    });
  }

  if (eventPostNotification) {
    socket.on("post-commented", (data) => {
      console.log("💬 New Comment on Post:", data);
      showToast(`🎉 New comment by ${data.commentBy.name || "someone"}!`);
    });

    socket.on("post-liked", (data) => {
      console.log("❤️ Post Liked:", data);
      showToast(`${data.likedBy.name || "Someone"} liked your post!`);
    });
  }
};

const unsubscribeFromEvents = () => {
  const socket = getSocket();
  if (!socket) return;

  console.log("🔴 Unsubscribing from events...");
  socket.off("newMatch");
  socket.off("connectionRequest");
  socket.off("connectionRequestResponse");
  socket.off("post-commented");
  socket.off("post-liked");
};

export default useNotificationListener;
