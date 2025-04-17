import io from 'socket.io-client';
import { showMessage } from 'react-native-flash-message';
import { Platform } from 'react-native';

const SOCKET_URL = 'https://api-matrimonial.webseeder.tech';

let socket = null;

export const initializeSocket = (userId) => {
  console.log("🟡 initializeSocket called with userId:", userId);

  if (socket) {
    console.log("🔌 Existing socket found. Disconnecting...");
    socket.disconnect();
    socket = null;
  }

  socket = io(SOCKET_URL, {
    auth: { userId },
    transports: ['websocket'],
    forceNew: true,
    jsonp: false,
  });

  socket.on('connect', () => {
    console.log('✅ Connected to Socket server');
    console.log('🔗 Socket ID:', socket.id);
    console.log('📡 Socket Connected:', socket.connected);
  });

  socket.on('disconnect', (reason) => {
    console.log('⚠️ Disconnected from the socket server. Reason:', reason);
  });

  socket.on('connect_error', (err) => {
    console.error('❌ Socket connection error:', err);
    showMessage({
      message: 'Connection error',
      description: 'Unable to connect to the server.',
      type: 'danger',
    });
  });

  socket.onAny((event, data) => {
    console.log(`📥 Event Received -> '${event}':`, data);
  });

  // 🔁 Optional Heartbeat for Debugging
  setInterval(() => {
    if (socket && socket.connected) {
      console.log("💓 Socket is alive with ID:", socket.id);
    } else {
      console.warn("💀 Socket is NOT connected.");
    }
  }, 10000);
};

export const isSocketConnected = () => {
  const connected = socket && socket.connected;
  console.log("🔍 isSocketConnected:", connected);
  return connected;
};

export const getSocket = () => {
  if (!socket) {
    console.error("❌ getSocket called but socket is not initialized.");
    throw new Error('Socket not initialized');
  }
  console.log("✅ getSocket: returning active socket instance.");
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    console.log("🛑 disconnectSocket: Disconnecting socket...");
    socket.disconnect();
    socket = null;
    console.log('✅ Socket disconnected and set to null.');
  } else {
    console.log("ℹ️ disconnectSocket called but socket already null.");
  }
};

export const handleAppStateChange = (nextAppState) => {
  console.log("📲 App State Changed:", nextAppState);
  if (nextAppState === 'background' || nextAppState === 'inactive') {
    console.log("🌙 App in background/inactive. Disconnecting socket...");
    disconnectSocket();
  } else if (nextAppState === 'active') {
    console.log("🌞 App is active again.");
    if (!socket) {
      console.log("🔄 Re-initializing socket after coming back to foreground.");
      // You should re-pass userId from context or global state here
      // For now, logging warning
      console.warn("⚠️ Cannot reinitialize socket: userId missing.");
    } else {
      console.log("🔌 Socket already initialized.");
    }
  }
};
