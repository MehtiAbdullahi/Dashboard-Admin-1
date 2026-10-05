import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";

export const fetchUserRole = createAsyncThunk(
  "auth/fetchUserRole",
  async (_, { getState, rejectWithValue }) => {
    const { user } = getState().auth;

    if (!user) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (error) {
      return rejectWithValue(error.message);
    }

    return data.role;
  },
);

export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return data.session;
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return rejectWithValue(error.message);
    }

    return data;
  },
);

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async ({ email, password, username }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) {
      return rejectWithValue(error.message);
    }

    return data;
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchUserProfileImage = createAsyncThunk(
  "auth/fetchUserProfileImage",
  async (_, { getState, rejectWithValue }) => {
    const { user } = getState().auth;

    if (!user) return null;

    // مرحله ۱: مسیر فایل عکس رو از جدول profiles می‌گیریم
    const { data, error } = await supabase
      .from("profiles")
      .select("profile_img")
      .eq("id", user.id)
      .single();

    if (error) {
      return rejectWithValue(error.message);
    }

    if (!data?.profile_img) {
      return null; // کاربر هنوز عکسی آپلود نکرده
    }

    // مرحله ۲: چون باکت private هست، باید signed URL بسازیم
    const { data: signedData, error: signedError } = await supabase.storage
      .from("users-image")
      .createSignedUrl(data.profile_img, 60 * 60);

    if (signedError) {
      return rejectWithValue(signedError.message);
    }

    return signedData.signedUrl;
  },
);

const initialState = {
  session: null,
  user: null,
  loading: true,
  error: null,
  profileImageUrl: null,
  role: null,
  roleStatus: "idle",
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
      state.user = action.payload?.user ?? null;
      state.loading = false;
    },
    clearSession: (state) => {
      state.session = null;
      state.user = null;
      state.loading = false;
      state.role = null;
      state.roleStatus = "idle";
      state.profileImageUrl = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.session = action.payload;
        state.user = action.payload?.user ?? null;
        state.loading = false;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.session = null;
        state.user = null;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.session = action.payload.session;
        state.user = action.payload.session?.user ?? null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserProfileImage.fulfilled, (state, action) => {
        state.profileImageUrl = action.payload;
      })
      .addCase(fetchUserProfileImage.rejected, (state) => {
        state.profileImageUrl = null;
      })
      .addCase(fetchUserRole.pending, (state) => {
        state.roleStatus = "loading";
      })
      .addCase(fetchUserRole.fulfilled, (state, action) => {
        state.role = action.payload;
        state.roleStatus = "succeeded";
      })
      .addCase(fetchUserRole.rejected, (state) => {
        state.role = null;
        state.roleStatus = "failed";
      });
  },
});

export const { setSession, clearSession } = authSlice.actions;

export default authSlice.reducer;
