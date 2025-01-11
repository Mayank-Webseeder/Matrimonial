import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../ReduxStore/Slices/authSlice';

const store = configureStore({
    reducer: {
        auth: authSlice
    }
})

export default store;