import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isCartOpen: boolean;
  isAuthModalOpen: boolean;
  authModalType: 'login' | 'register' | 'reset';
  notification: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  };
  isMobileMenuOpen: boolean;
  loading: {
    global: boolean;
    products: boolean;
    cart: boolean;
    checkout: boolean;
    auth: boolean;
  };
  searchQuery: string;
  searchResults: any[];
  activeFilters: {
    category: string | null;
    price: {
      min: number | null;
      max: number | null;
    };
    sort: string | null;
  };
}

const initialState: UiState = {
  isCartOpen: false,
  isAuthModalOpen: false,
  authModalType: 'login',
  notification: {
    show: false,
    message: '',
    type: 'info'
  },
  isMobileMenuOpen: false,
  loading: {
    global: false,
    products: false,
    cart: false,
    checkout: false,
    auth: false
  },
  searchQuery: '',
  searchResults: [],
  activeFilters: {
    category: null,
    price: {
      min: null,
      max: null
    },
    sort: null
  }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = action.payload;
    },
    toggleAuthModal: (state) => {
      state.isAuthModalOpen = !state.isAuthModalOpen;
    },
    setAuthModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isAuthModalOpen = action.payload;
    },
    setAuthModalType: (state, action: PayloadAction<'login' | 'register' | 'reset'>) => {
      state.authModalType = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    showNotification: (state, action: PayloadAction<{message: string, type: 'success' | 'error' | 'info', duration?: number}>) => {
      state.notification = {
        show: true,
        message: action.payload.message,
        type: action.payload.type
      };
      // Note: We can't use setTimeout in a reducer
      // The timeout is handled in the NotificationSystem component
    },
    hideNotification: (state) => {
      state.notification.show = false;
    },
    setLoading: (state, action: PayloadAction<{key: keyof UiState['loading'], value: boolean}>) => {
      const { key, value } = action.payload;
      state.loading[key] = value;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<any[]>) => {
      state.searchResults = action.payload;
    },
    setFilter: (state, action: PayloadAction<{
      filterType: 'category' | 'price' | 'sort',
      value: any
    }>) => {
      const { filterType, value } = action.payload;
      
      if (filterType === 'category') {
        state.activeFilters.category = value;
      } else if (filterType === 'price') {
        state.activeFilters.price = value;
      } else if (filterType === 'sort') {
        state.activeFilters.sort = value;
      }
    },
    clearFilters: (state) => {
      state.activeFilters = {
        category: null,
        price: {
          min: null,
          max: null
        },
        sort: null
      };
    }
  }
});

export const { 
  toggleCart, 
  setCartOpen,
  toggleAuthModal, 
  setAuthModalOpen,
  setAuthModalType,
  toggleMobileMenu,
  showNotification,
  hideNotification,
  setLoading,
  setSearchQuery,
  setSearchResults,
  setFilter,
  clearFilters
} = uiSlice.actions;

export default uiSlice.reducer;
