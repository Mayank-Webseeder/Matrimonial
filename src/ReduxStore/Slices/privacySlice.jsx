import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    blurPhotos: false, // Default: Photos not blurred
};

const privacySlice = createSlice({
    name: 'privacy',
    initialState,
    reducers: {
        toggleBlurPhotos: (state) => {
            state.blurPhotos = !state.blurPhotos;
        },
        setBlurPhotosState: (state, action) => {
            state.blurPhotos = action.payload; 
        }
    }
});

export const { toggleBlurPhotos, setBlurPhotosState } = privacySlice.actions;
export default privacySlice.reducer;
