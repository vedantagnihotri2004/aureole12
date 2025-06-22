import { CartItem } from '../slices/cartSlice';
import { Product } from '../slices/productSlice';

// Define the state type for each slice
export interface AuthState {
  user: any | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

export interface ProductsState {
  items: Product[];
  featured: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
  categories: string[];
}

export interface WishlistState {
  items: {
    id: number;
    productId: number;
    product: Product;
    dateAdded: string;
  }[];
  loading: boolean;
  error: string | null;
}

export interface UiState {
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

// Root state type
export interface RootState {
  auth: AuthState;
  cart: CartState;
  products: ProductsState;
  wishlist: WishlistState;
  ui: UiState;
}
