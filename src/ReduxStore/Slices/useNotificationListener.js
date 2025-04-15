import { useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { PROFILE_ENDPOINT } from "../../utils/BaseUrl";
import { getSocket } from "../../../socket";

import { showMessage } from "react-native-flash-message";

const waitForSocketConnection = (callback, interval = 100) => {
  const socket = getSocket();
  if (socket && socket.connected) {
    callback();
  } else {
    setTimeout(() => waitForSocketConnection(callback, interval), interval);
  }
};

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

          if (
            isActive &&
            (profileData.connReqNotification || profileData.eventPostNotification)
          ) {
            waitForSocketConnection(() => {
              subscribeToEvents(
                profileData.connReqNotification,
                profileData.eventPostNotification
              );
            });
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

  const showToast = (message, type = "success") => {
    showMessage({
      message,
      type,
      duration: 3000,
      icon: type,
    });
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

  socket.on("panditRequestApproved", (data) => {
    console.log("💬 panditRequestApproved:", data);
    showToast(data.message);
  });

  socket.on("kathavachakRequestApproved", (data) => {
    console.log("💬 kathavachakRequestApproved:", data);
    showToast(data.message);
  });

  socket.on("jyotishRequestApproved", (data) => {
    console.log("💬 jyotishRequestApproved:", data);
    showToast(data.message);
  });

  socket.on("activistRequestApproved", (data) => {
    console.log("💬 activistRequestApproved:", data);
    showToast(data.message);
  });

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
  socket.off("panditRequestApproved");
  socket.off("kathavachakRequestApproved");
  socket.off("jyotishRequestApproved");
  socket.off("activistRequestApproved");
};

export default useNotificationListener;
