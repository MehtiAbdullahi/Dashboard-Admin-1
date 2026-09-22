import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (url) => {
    const res = await fetch(url);
    return await res.json();
  },
);

export const updateProduct = createAsyncThunk(
  "update/updateProducts",
  async ({ url, ProductData }) => {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ProductData),
    });
    const data = await res.json();
    return data;
  },
);

const productsReducer = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      console.log("state", state);
      console.log("action", action);
    });
  },
});

export const { createUserAct } = productsReducer.actions;
export default productsReducer.reducer;
