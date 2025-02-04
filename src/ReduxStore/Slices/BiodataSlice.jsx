import { createSlice } from "@reduxjs/toolkit";

const BiodataSlice = createSlice({
  name: "getBiodata",
  initialState: {
    Biodata: null, 
  },
  reducers: {
    setBioData: (state, action) => {
      state.Biodata = action.payload; 
    },
  },
});

export const { setBioData } = BiodataSlice.actions;

export default BiodataSlice.reducer;
