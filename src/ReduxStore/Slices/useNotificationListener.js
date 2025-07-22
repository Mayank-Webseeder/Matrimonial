import { useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { PROFILE_ENDPOINT } from '../../utils/BaseUrl';
import { getSocket } from '../../../socket';

import { showMessage } from 'react-native-flash-message';

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
          const token = await AsyncStorage.getItem('userToken');
          if (!token) {throw new Error('No token');}

          const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          };
          const res = await axios.get(PROFILE_ENDPOINT, { headers });

          const profileData = res.data.data;
          console.log('profileData.connReqNotification',profileData.connReqNotification,
                'profileData.eventPostNotification',profileData.eventPostNotification);

          if (isActive && (profileData.connReqNotification || profileData.eventPostNotification)) {
            waitForSocketConnection(() => {
              subscribeToEvents(
                profileData.connReqNotification,
                profileData.eventPostNotification
              );
            });
          }
        } catch (error) {
          console.error('🔴 Profile fetch error:', error.message);
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

const subscribeToEvents = (connReq = true, eventPost = true) => {
  const socket = getSocket();
  console.log('📡 Subscribing to socket events...');

  socket.offAny(); // 👈 Important to prevent duplication

  socket.onAny((event, data) => {
    console.log(`📡 Received Event: ${event}`, data);
  });

  const showToast = (message, type = 'success') => {
    showMessage({
      message,
      type,
      duration: 3000,
      icon: type,
    });
  };

  if (connReq) {
    socket.on('newMatch', (data) => showToast(`🎉 Matched with ${data.name || 'someone'}`));
    socket.on('connectionRequest', (data) => showToast(`New request from ${data.username}`));
    socket.on('connectionRequestResponse', (data) => showToast(data.message));
  }

  if (eventPost) {
    socket.on('post-commented', (data) => showToast(`New comment by ${data.commentBy.name}`));
    socket.on('post-liked', (data) => showToast(`${data.likedBy.name} liked your post!`));
  }

  socket.on('panditRequestApproved', (data) => showToast(data.message));
  socket.on('kathavachakRequestApproved', (data) => showToast(data.message));
  socket.on('jyotishRequestApproved', (data) => showToast(data.message));
  socket.on('activistRequestApproved', (data) => showToast(data.message));
};

const unsubscribeFromEvents = () => {
  const socket = getSocket();
  if (!socket) {return;}

  console.log('🔴 Unsubscribing from socket events...');
  socket.offAny();
};

export default useNotificationListener;
