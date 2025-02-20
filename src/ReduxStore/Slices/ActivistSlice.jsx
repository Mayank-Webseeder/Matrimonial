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
  },
});

export const { setActivistdata } = ActivistSlice.actions;
export default ActivistSlice.reducer;
