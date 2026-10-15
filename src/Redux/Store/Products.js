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

export const getProductsPage = createAsyncThunk(
  "products/getProductsPage",
  async ({ page, pageSize }, { rejectWithValue }) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    const { data, error, count } = await supabase
      .from("products")
      .select("*", { count: "exact" })
      .order("id", { ascending: true })
      .range(start, end);

    if (error) {
      return rejectWithValue(error.message);
    }

    const productsWithImageUrl = data.map((product) => {
      const { data: imageData } = supabase.storage
        .from("product-images")
        .getPublicUrl(product.image);

      return {
        ...product,
        image: imageData.publicUrl,
      };
    });

    return {
      products: productsWithImageUrl,
      totalProducts: count,
      currentPage: page,
      pageSize,
    };
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

// export const updateProduct = createAsyncThunk(
//   "update/updateProduct",
//   async ({ id, productData }, { rejectWithValue }) => {
//     const { data, error } = await supabase
//       .from("products")
//       .update(productData)
//       .eq("id", id)
//       .select()
//       .single();

//     console.log("Data ->", data);
//     console.log("Product Data ->", productData);

//     if (error) {
//       return rejectWithValue(error.message);
//     }

//     return data;
//   },
// );

const initialState = {
  products: [],
  loading: false,
  favoriteLoading: false,
  error: null,

  // Pagination
  paginatedProducts: [],
  paginationLoading: false,
  paginationError: null,
  totalProducts: 0,
  currentPage: 1,
  pageSize: 8,
};

const productsReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProduct(state, action) {
      const { id, changes } = action.payload;

      const product = state.products.find((p) => p.id === id);

      if (product) {
        Object.assign(product, changes);
      }
    },
  },

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
      })

      .addCase(getProductsPage.pending, (state) => {
        state.paginationLoading = true;
        state.paginationError = null;
      })
      .addCase(getProductsPage.fulfilled, (state, action) => {
        state.paginationLoading = false;
        state.paginationError = null;
        state.paginatedProducts = action.payload.products;
        state.totalProducts = action.payload.totalProducts;
        state.currentPage = action.payload.currentPage;
        state.pageSize = action.payload.pageSize;
      })
      .addCase(getProductsPage.rejected, (state, action) => {
        state.paginationLoading = false;
        state.paginationError = action.payload ?? action.error.message;
      });
  },
});

export default productsReducer.reducer;
export const { updateProduct } = productsReducer.actions;
