import { createSlice } from "@reduxjs/toolkit";

const BiodataSlice = createSlice({
  name: "getBiodata",
  initialState: {
    Biodata: {}, 
  },
  reducers: {
    setBioData: (state, action) => {
      state.Biodata = action.payload; 
    },
    resetBioData: (state) => {
      state.Biodata = {}; // ✅ Redux store reset karein
    },
  },
});

export const { setBioData, resetBioData } = BiodataSlice.actions;

export default BiodataSlice.reducer;
