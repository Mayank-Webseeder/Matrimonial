import { createSlice } from '@reduxjs/toolkit';

const GetAllNotificationSlice = createSlice({
  name: 'GetAllNotification',
  initialState: {
    AllNotification: [],
  },
  reducers: {
    setAllNotification: (state, action) => {
      state.AllNotification = action.payload;
    },
    reseAllNotification: (state) => {
      state.AllNotification = [];
    },
  },
});

export const { setAllNotification,reseAllNotification } = GetAllNotificationSlice.actions;
export default GetAllNotificationSlice.reducer;
