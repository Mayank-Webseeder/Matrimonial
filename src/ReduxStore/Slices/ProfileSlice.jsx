import { createSlice } from '@reduxjs/toolkit';

const ProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    profiledata: null,
  },
  reducers: {
    setProfiledata: (state, action) => {
      state.profiledata = action.payload;
    },
    resetProfiledata: (state) => {
      state.profiledata = null;
    },
  },
});

export const { setProfiledata,resetProfiledata } = ProfileSlice.actions;

export default ProfileSlice.reducer;
