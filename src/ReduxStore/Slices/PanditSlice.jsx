import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { PANDIT_DESCRIPTION } from "../../utils/BaseUrl";

export const fetchPanditProfile = createAsyncThunk(
  "pandit/fetchPanditProfile",
  async (id, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.get(`${PANDIT_DESCRIPTION}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { id, data: response.data.data };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const panditSlice = createSlice({
  name: "pandit",
  initialState: {
    profiles: {},
    loading: false,
    error: null,
  },
  reducers: {
    // ✅ rating add/update reducer
    updatePanditRating: (state, action) => {
      const { id, newRating } = action.payload;
      if (state.profiles[id]) {
        // Agar profile already Redux me hai to uske ratings update karo
        state.profiles[id].ratings = [
          ...(state.profiles[id].ratings || []),
          newRating,
        ];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPanditProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPanditProfile.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        state.profiles[id] = data;
        state.loading = false;
      })
      .addCase(fetchPanditProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updatePanditRating } = panditSlice.actions;
export default panditSlice.reducer;
