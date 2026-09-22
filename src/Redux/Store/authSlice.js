import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";

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
    const { error: authError, data: authData } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return rejectWithValue(authError.message);
    }

    const { error: profileError } = await supabase.from("profiles").insert({
      id: authData.user.id,
      username,
      email,
    });

    if (profileError) {
      return rejectWithValue(profileError.message);
    }

    return authData;
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

const initialState = {
  session: null,
  user: null,
  loading: true,
  error: null,
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
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
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
  },
});

export const { setSession, clearSession } = authSlice.actions;

export default authSlice.reducer;
