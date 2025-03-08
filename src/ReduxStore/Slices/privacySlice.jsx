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
        }
    }
});

export const { toggleBlurPhotos } = privacySlice.actions;
export default privacySlice.reducer;
