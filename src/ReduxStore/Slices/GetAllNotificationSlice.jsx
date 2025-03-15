import { createSlice } from "@reduxjs/toolkit";

const GetAllNotificationSlice = createSlice({
  name: "GetAllNotification",
  initialState: {
    AllNotification: [],
  },
  reducers: {
    setAllNotification: (state, action) => {
      state.AllNotification = action.payload;
    },
  },
});

export const { setAllNotification } = GetAllNotificationSlice.actions;
export default GetAllNotificationSlice.reducer;
