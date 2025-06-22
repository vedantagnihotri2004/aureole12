import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './productSlice';

interface WishlistItem {
  id: number;
  productId: number;
  product: Product;
  dateAdded: string;
}

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      
      // Check if already in wishlist
      const exists = state.items.some(item => item.productId === product.id);
      
      if (!exists) {
        state.items.push({
          id: state.items.length + 1,
          productId: product.id,
          product,
          dateAdded: new Date().toISOString(),
        });
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items = state.items.filter(item => item.productId !== productId);
    },
    clearWishlist: (state) => {
      state.items = [];
    },
    setWishlistItems: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
    },
    setWishlistLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setWishlistError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  }
});

export const { 
  addToWishlist, 
  removeFromWishlist, 
  clearWishlist, 
  setWishlistItems,
  setWishlistLoading,
  setWishlistError
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
