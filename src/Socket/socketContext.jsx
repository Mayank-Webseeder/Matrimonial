import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { initializeSocket, getSocket, disconnectSocket } from "../../socket";
import { setProfiledata } from "../ReduxStore/Slices/ProfileSlice";
import { PROFILE_ENDPOINT } from "../utils/BaseUrl";
import axios from "axios";
import { useDispatch } from "react-redux";
const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profiledata, setProfileData] = useState({});
  const [connReqNotification, setconnReqNotification] = useState("");
  const [eventPostNotification, seteventPostNotification] = useState("");


  useEffect(() => {
    fetchProfile();
    console.log("connReqNotification", connReqNotification);
    console.log("eventPostNotification", eventPostNotification);
  }, [])

  const fetchProfile = async () => {
    setProfileData({});
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("No token found");

      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      };

      console.log("headers in profile", headers);
      const res = await axios.get(PROFILE_ENDPOINT, { headers });
      console.log("API Response:", JSON.stringify(res.data));
      const profiledata = res.data.data;
      setProfileData(profiledata);
      setProfileData(profiledata);
      setconnReqNotification(profiledata?.connReqNotification)
      seteventPostNotification(profiledata?.eventPostNotification)
      dispatch(setProfiledata(res.data.data));

    } catch (error) {
      console.error("Error fetching profile:", error.response ? error.response.data : error.message);
    }
  };

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
    if (!socket || loading || connReqNotification === "" || eventPostNotification === "") {
      console.log("⏳ Waiting to bind socket events until all are ready...");
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

    socket.offAny();
    socket.removeAllListeners();

    socket.onAny((event, data) => {
      console.log(`📥 Received event: '${event}' with data:`, data);
    });

    if (connReqNotification) {
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
    }

    if (eventPostNotification) {
      socket.on("post-commented", (data) => {
        console.log("📩 post-commented:", data);
        showToast(`New comment by ${data?.commentBy?.name}`);
      });

      socket.on("post-liked", (data) => {
        console.log("📩 post-liked:", data);
        showToast(`${data?.likedBy?.name} liked your post!`);
      });
    }

    socket.on("panditRequestApproved", (data) => {
      showToast(data?.message);
    });

    socket.on("kathavachakRequestApproved", (data) => {
      showToast(data?.message);
    });

    socket.on("jyotishRequestApproved", (data) => {
      showToast(data?.message);
    });

    socket.on("activistRequestApproved", (data) => {
      showToast(data?.message);
    });

    return () => {
      console.log("🧹 Cleaning up socket event listeners...");
      socket.offAny();
      socket.removeAllListeners();
    };
  }, [socket, loading, connReqNotification, eventPostNotification]);


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
