import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { removeFromWishlist } from './wishlistAPI';

export const fetchWishlist = createAsyncThunk("wishlist/fetch", async () => {
  const res = await axios.get("wishlist");
  return res.data.wishlist;
});

export const toggleWishlist = createAsyncThunk("wishlist/toggle", async (productId) => {
  const res = await axios.post(`wishlist/${productId}`);
  return res.data.wishlist;
});

export const deleteFromWishlist = createAsyncThunk("wishlist/delete", async (productId) => {
  const data = await removeFromWishlist(productId);
  return data.wishlist;
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
       .addCase(deleteFromWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
