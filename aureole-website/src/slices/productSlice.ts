import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { apiService } from '../services/api';
import { RootState } from '../store';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  bestSeller?: boolean;
  new?: boolean;
  available?: boolean;
  discountPercentage?: number;
  originalPrice?: number;
  details?: string[];
  images?: string[];
  reviews?: {
    id: number;
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

interface ProductsState {
  items: Product[];
  featured: Product[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
  categories: string[];
}

const initialState: ProductsState = {
  items: [],
  featured: [],
  loading: false,
  error: null,
  selectedProduct: null,
  categories: [],
};

// Async thunks would be implemented here for fetching products from Firebase
// Example: export const fetchProducts = createAsyncThunk('products/fetchProducts', ...)

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      // Extract categories from products
      const categorySet = new Set<string>();
      action.payload.forEach(product => {
        categorySet.add(product.category);
      });
      state.categories = Array.from(categorySet);
      
      // Set featured products
      state.featured = action.payload.filter(product => product.featured);
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    setFeaturedProducts: (state, action: PayloadAction<Product[]>) => {
      state.featured = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    filterProducts: (state, action: PayloadAction<string>) => {
      // This is a placeholder for actual filtering logic
      // Actual implementation would depend on how you want to filter
    },
    sortProducts: (state, action: PayloadAction<'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'>) => {
      const sortType = action.payload;
      
      switch (sortType) {
        case 'price-asc':
          state.items.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          state.items.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          state.items.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          state.items.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          break;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products || [];
        state.featured = action.payload.products?.filter((product: Product) => product.featured) || [];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch product details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

// Thunks
export const fetchProducts = createAsyncThunk<any, { keyword?: string; pageNumber?: number }, { rejectValue: string }>(
  'products/fetchProducts',
  async ({ keyword = '', pageNumber = 1 } = {}, { rejectWithValue }) => {
    try {
      // First try to get products from our backend
      const { data } = await apiService.products.getAll(keyword, pageNumber);
      return data;
    } catch (backendError) {
      console.log('Backend API not available, using mock data');
      // If backend fails, fall back to mock data from products.ts
      const { products } = await import('../data/products');
      return { products, page: 1, pages: 1 };
    }
  }
);

export const fetchProductDetails = createAsyncThunk<any, string, { rejectValue: string }>(
  'products/fetchProductDetails',
  async (id, { rejectWithValue }) => {
    try {
      // First try to get product from our backend
      const { data } = await apiService.products.getById(id);
      return data;
    } catch (backendError) {
      console.log('Backend API not available, using mock data');
      // If backend fails, fall back to mock data
      const { products } = await import('../data/products');
      const product = products.find(p => p.id.toString() === id);
      
      if (!product) {
        return rejectWithValue('Product not found');
      }
      
      return product;
    }
  }
);

export const { 
  setProducts, 
  setSelectedProduct, 
  setFeaturedProducts, 
  setLoading, 
  setError,
  filterProducts,
  sortProducts
} = productSlice.actions;
export default productSlice.reducer;
