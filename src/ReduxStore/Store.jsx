import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../ReduxStore/Slices/authSlice';

const store = configureStore({
    reducer: {
        authReducer: authSlice
    }
})

export default store;