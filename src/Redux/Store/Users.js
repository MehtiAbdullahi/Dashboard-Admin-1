import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";

export const getUser = createAsyncThunk(
  "get/getUser",
  async (_, { rejectWithValue }) => {
    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("*");

    if (profilesError) {
      return rejectWithValue(profilesError.message);
    }

    const usersWithUrlImg = profilesData.map((u) => {
      if (!u.profile_img) {
        return {
          ...u,
          profile_img: null,
        };
      }

      const { data } = supabase.storage
        .from("users-image")
        .getPublicUrl(u.profile_img);

      return {
        ...u,
        profile_img: data.publicUrl,
      };
    });

    console.log(usersWithUrlImg);

    return usersWithUrlImg;
  },
);

export const updateUser = createAsyncThunk(
  "update/updateUser",
  async ({ id, role }, { rejectWithValue }) => {
    const { data, error } = await supabase
      .from("profiles")
      .update({ role })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return rejectWithValue(error.message);
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

        const updatedUser = action.payload;

        const index = state.users.findIndex(
          (user) => user.id === updatedUser.id,
        );

        if (index !== -1) {
          state.users[index] = {
            ...state.users[index],
            role: updatedUser.role,
          };
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersReducer.reducer;
