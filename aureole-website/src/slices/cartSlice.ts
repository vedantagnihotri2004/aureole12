import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  discountPercentage?: number;
  originalPrice?: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalItems: 0,
};

const calculateTotals = (items: CartItem[]) => {
  const totalAmount = items.reduce((total, item) => {
    const itemPrice = item.price * item.quantity;
    return total + itemPrice;
  }, 0);
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  return { totalAmount, totalItems };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex >= 0) {
        // Item already exists, increase quantity
        state.items[existingItemIndex].quantity += newItem.quantity || 1;
      } else {
        // Add new item
        state.items.push({ ...newItem, quantity: newItem.quantity || 1 });
      }
      
      const { totalAmount, totalItems } = calculateTotals(state.items);
      state.totalAmount = totalAmount;
      state.totalItems = totalItems;
    },
    
    removeItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      
      const { totalAmount, totalItems } = calculateTotals(state.items);
      state.totalAmount = totalAmount;
      state.totalItems = totalItems;
    },
    
    updateItemQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);
      
      if (itemIndex >= 0) {
        if (quantity > 0) {
          state.items[itemIndex].quantity = quantity;
        } else {
          // If quantity is 0 or negative, remove the item
          state.items = state.items.filter(item => item.id !== id);
        }
        
        const { totalAmount, totalItems } = calculateTotals(state.items);
        state.totalAmount = totalAmount;
        state.totalItems = totalItems;
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },
    
    loadCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      const { totalAmount, totalItems } = calculateTotals(action.payload);
      state.totalAmount = totalAmount;
      state.totalItems = totalItems;
    },
  },
});

// Create alias for updateItemQuantity as updateQuantity for compatibility with ShoppingCart component
export const { 
  addItem, 
  removeItem, 
  updateItemQuantity, 
  clearCart,
  loadCart
} = cartSlice.actions;

export const updateQuantity = updateItemQuantity;

export default cartSlice.reducer;
