import { createSlice } from '@reduxjs/toolkit';

const ActivistSlice = createSlice({
  name: 'activist',
  initialState: {
    activist_data: null,
  },
  reducers: {
    setActivistdata: (state, action) => {
      state.activist_data = action.payload;
    },
    resetsetActivistdata: (state) => {
      state.activist_data = null; // ✅ Redux store reset karein
    },
  },
});

export const { setActivistdata ,resetsetActivistdata } = ActivistSlice.actions;
export default ActivistSlice.reducer;
