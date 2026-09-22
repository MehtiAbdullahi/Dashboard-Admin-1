import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";

export const getUser = createAsyncThunk("get/getUser", async () => {
  const { data, error } = await supabase.from("profiles").select("*");

  if (error) {
    throw error;
  }

  return data;
});

export const updateUser = createAsyncThunk(
  "update/updateUser",
  async (props) => {
    const { data, error } = await supabase
      .from("profiles")
      .update(props)
      .eq("id", props.id);

    if (error) {
      throw error;
    }

    return data;
  },
);

const initialState = {
  users: [],
  loading: true,
  error: null,
};
const usersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersReducer.reducer;
