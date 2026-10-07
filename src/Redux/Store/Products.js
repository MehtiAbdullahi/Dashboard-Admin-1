import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";

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

    console.log(productWithImgUrl);

    return productWithImgUrl;
  },
);

const initialState = {
  products: [],
  loading: false,
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
      });
  },
});

export const { createUserAct } = productsReducer.actions;
export default productsReducer.reducer;
