import io from 'socket.io-client';
import { showMessage } from 'react-native-flash-message';

const SOCKET_URL = 'https://api-matrimonial.webseeder.tech';

let socket = null;

export const initializeSocket = (userId) => {
  if (socket) {
    console.log('🔁 Re-initializing socket...');
    socket.disconnect();
  }

  console.log('🔄 Initializing socket with userId:', userId);

  socket = io(SOCKET_URL, {
    transports: ['websocket'],
    auth: { userId },
  });

  socket.on('connect', () => {
    console.log('✅ Socket connected:', socket.id);
  });

  socket.on('disconnect', (reason) => {
    console.log('⚠️ Socket disconnected. Reason:', reason);
  });

  socket.on('connect_error', (error) => {
    console.error('🚨 Socket connection error:', error.message);
  });

  // Log ALL incoming events
  socket.onAny((event, data) => {
    console.log(`📥 Incoming Event [${event}]:`, data);
  });

  // OPTIONAL: Confirm emit events
  const originalEmit = socket.emit;
  socket.emit = (...args) => {
    console.log(`📤 Emitting Event [${args[0]}]:`, args[1]);
    originalEmit.apply(socket, args);
  };
};

export const getSocket = () => {
  if (!socket) {
    console.error("❌ Tried to get socket but it's not initialized");
    throw new Error('❌ Socket not initialized');
  }
  return socket;
};

export const isSocketConnected = () => {
  const connected = socket && socket.connected;
  console.log(`📡 Socket connected status: ${connected}`);
  return connected;
};

export const disconnectSocket = () => {
  if (socket) {
    console.log('🚫 Manually disconnecting socket...');
    socket.disconnect();
    socket = null;
    showMessage({
      type: 'info',
      message: 'Socket disconnected',
      icon: 'info',
    });
  } else {
    console.log('❗ Attempted to disconnect, but socket is null');
  }
};
