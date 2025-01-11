import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    setLoginData: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    setLogoutData: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setLoginData, setLogoutData } = authSlice.actions;

export default authSlice.reducer;
