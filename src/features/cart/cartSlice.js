import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart as addToCartAPI,
  getCart,
  removeFromCart as removeFromCartAPI,
  updateCartQuantity as updateCartQuantityAPI,
} from "./cartAPI";

// Thunks

// Fetch the current user's cart
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const data = await getCart();
  return data.data?.items || [];
});

// Add a product (or increase quantity)
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }) => {
    const data = await addToCartAPI(productId, quantity);
    return data.data?.items || [];
  }
);

// Remove a product from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId) => {
    const data = await removeFromCartAPI(productId);
    return data.data?.items || [];
  }
);

// ✅ Update cart item quantity (via PUT)
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ productId, quantity }) => {
    const data = await updateCartQuantityAPI(productId, quantity);
    return data.data?.items || [];
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
