import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../ReduxStore/Slices/authSlice';
import profileSlice from '../ReduxStore/Slices/ProfileSlice';
import GetAllBiodataSlice from '../ReduxStore/Slices/GetAllBiodataSlice';
import BioDataSlice from '../ReduxStore/Slices/BiodataSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    getAllBiodata:GetAllBiodataSlice,
    getBiodata:BioDataSlice
  },
});

export default store;
