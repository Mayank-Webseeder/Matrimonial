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
  },
});

export const { setProfiledata } = ProfileSlice.actions;

export default ProfileSlice.reducer;
