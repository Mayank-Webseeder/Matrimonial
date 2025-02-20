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
  },
});

export const { setAllBiodata } = GetAllBiodataSlice.actions;
export default GetAllBiodataSlice.reducer;
