import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../utils/api";

import {
  NOTIFICATION,
  PROFILE_ENDPOINT,
  GET_BIODATA,
  GET_ALL_BIODATA_PROFILES,
  TOP_HOME_ADVERDISE_WINDOW,
  BOTTOM_HOME_ADVERDISE_WINDOW,
  GET_ACTIVIST,
  PHOTO_URL,
} from "../../utils/BaseUrl";


const getAuthHeaders = async () => {
  const token = await AsyncStorage.getItem("userToken");
  if (!token) throw new Error("Authorization token is missing.");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const fetchNotifications = createAsyncThunk(
  "home/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const headers = await getAuthHeaders();
      const { data } = await api.get(NOTIFICATION, { headers });
      return data.data || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


export const fetchProfile = createAsyncThunk(
  "home/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const headers = await getAuthHeaders();
      const { data } = await api.get(PROFILE_ENDPOINT, { headers });
      return data.data || {};
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchMyBiodata = createAsyncThunk(
  "home/fetchMyBiodata",
  async (_, { rejectWithValue }) => {
    try {
      const headers = await getAuthHeaders();
      const { data } = await api.get(GET_BIODATA, { headers });
      return data.data || {};
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchAllBiodata = createAsyncThunk(
  "home/fetchAllBiodata",
  async (_, { rejectWithValue }) => {
    try {
      const headers = await getAuthHeaders();
      const { data } = await api.get(GET_ALL_BIODATA_PROFILES, { headers });
      return data.feedUsers || [];
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchTopAds = createAsyncThunk(
  "home/fetchTopAds",
  async (_, { rejectWithValue }) => {
    try {
      const headers = await getAuthHeaders();
      const { data } = await api.get(TOP_HOME_ADVERDISE_WINDOW, { headers });

      const ads = data.data.flatMap((item) =>
        item.media.map((mediaItem) => ({
          id: `${item._id}_${mediaItem._id}`,
          title: item.title,
          description: item.description,
          image: `${PHOTO_URL}/${mediaItem.mediaUrl}`,
          resolution: mediaItem.resolution,
          mediaType: mediaItem.mediaUrl.includes(".mp4") ? "video" : "image",
          hyperlink: mediaItem.hyperlink,
          duration: Number(mediaItem.duration) || 4,
        }))
      );
      return ads;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchBottomAds = createAsyncThunk(
  "home/fetchBottomAds",
  async (_, { rejectWithValue }) => {
    try {
      const headers = await getAuthHeaders();
      const { data } = await api.get(BOTTOM_HOME_ADVERDISE_WINDOW, {
        headers,
      });

      const ads = data.data.flatMap((item) =>
        item.media.map((mediaItem) => ({
          id: `${item._id}_${mediaItem._id}`,
          title: item.title,
          description: item.description,
          image: `${PHOTO_URL}/${mediaItem.mediaUrl}`,
          resolution: mediaItem.resolution,
          mediaType: mediaItem.mediaUrl.includes(".mp4") ? "video" : "image",
          hyperlink: mediaItem.hyperlink,
          duration: Number(mediaItem.duration) || 4,
        }))
      );
      return ads;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchActivist = createAsyncThunk(
  "home/fetchActivist",
  async (_, { rejectWithValue }) => {
    try {
      const headers = await getAuthHeaders();
      const { data } = await api.get(GET_ACTIVIST, { headers });
      return data.data || {};
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


const homeApisSlice = createSlice({
  name: "home",
  initialState: {
    notifications: [],
    profile: {},
    myBiodata: {},
    allBiodata: [],
    topAds: [],
    bottomAds: [],
    activist: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearHomeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const addCases = (thunk, key) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state.loading = false;
          state[key] = action.payload;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    };

    addCases(fetchNotifications, "notifications");
    addCases(fetchProfile, "profile");
    addCases(fetchMyBiodata, "myBiodata");
    addCases(fetchAllBiodata, "allBiodata");
    addCases(fetchTopAds, "topAds");
    addCases(fetchBottomAds, "bottomAds");
    addCases(fetchActivist, "activist");
  },
});

export const { clearHomeError } = homeApisSlice.actions;
export default homeApisSlice.reducer;
