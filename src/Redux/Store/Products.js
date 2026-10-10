import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";
import { updateUserFavorites } from "./Users";

export const getAllProducts = createAsyncThunk(
  "get/getAllProducts",
  async (_, { rejectWithValue }) => {
    const { data: productData, error: productError } = await supabase
      .from("products")
      .select("*");

    if (productError) {
      return rejectWithValue(productError.message);
    }

    const productWithImgUrl = productData.map((p) => {
      const { data: productImgUrlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(p.image);

      return {
        ...p,
        image: productImgUrlData.publicUrl,
      };
    });

    return productWithImgUrl;
  },
);

export const toggleFavorite = createAsyncThunk(
  "add/toggleFavorite",
  async ({ product, userId }, { rejectWithValue, dispatch }) => {
    const { data: fetchData, error: fetchError } = await supabase
      .from("profiles")
      .select("favorite_products")
      .eq("id", userId)
      .single();

    if (fetchError) {
      return rejectWithValue(fetchError.message);
    }

    const favorites = fetchData.favorite_products ?? [];

    const isFavorite = favorites.some((f) => f.id === product.id);

    const updatedFavorites = isFavorite
      ? favorites.filter((f) => f.id !== product.id)
      : [...favorites, product];

    const { data, error } = await supabase
      .from("profiles")
      .update({
        favorite_products: updatedFavorites,
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      return rejectWithValue(error.message);
    }

    dispatch(
      updateUserFavorites({
        userId,
        favorites: data.favorite_products,
      }),
    );
  },
);

const initialState = {
  products: [],
  loading: false,
  favoriteLoading: false,
  error: null,
};

const productsReducer = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(toggleFavorite.pending, (state) => {
        state.favoriteLoading = true;
      })
      .addCase(toggleFavorite.fulfilled, (state) => {
        state.favoriteLoading = false;
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.favoriteLoading = false;
        state.error = action.payload;
      });
  },
});

export default productsReducer.reducer;
