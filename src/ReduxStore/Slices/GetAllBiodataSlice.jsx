import { createSlice } from "@reduxjs/toolkit";

const GetAllBiodataSlice = createSlice({
  name: "getAllBiodata",
  initialState: {
    allBiodata: [],
  },
  reducers: {
    setAllBiodata: (state, action) => {
      state.allBiodata = action.payload;
    },
    resetAllBiodata: (state) => {
          state.allBiodata = []; // ✅ Redux store reset karein
        },
  },
});

export const { setAllBiodata,resetAllBiodata } = GetAllBiodataSlice.actions;
export default GetAllBiodataSlice.reducer;
