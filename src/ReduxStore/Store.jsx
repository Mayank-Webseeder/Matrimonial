import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../ReduxStore/Slices/authSlice';
import profileSlice from '../ReduxStore/Slices/ProfileSlice';
import GetAllBiodataSlice from '../ReduxStore/Slices/GetAllBiodataSlice';
import BioDataSlice from '../ReduxStore/Slices/BiodataSlice';
import ActivistSlice from '../ReduxStore/Slices/ActivistSlice';
import NotificationReducer from '../ReduxStore/Slices/GetAllNotificationSlice';
import homeReducer from '../ReduxStore/Slices/homeApisSlice';
import panditReducer from './Slices/PanditSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    getAllBiodata:GetAllBiodataSlice,
    getBiodata:BioDataSlice,
    activist:ActivistSlice,
    GetAllNotification:NotificationReducer,
    home: homeReducer,
    pandit: panditReducer, 
  },
});

export default store;
