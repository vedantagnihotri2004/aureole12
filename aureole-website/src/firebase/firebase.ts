import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged 
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  orderBy
} from 'firebase/firestore';

// Firebase configuration 
// Replace with your own Firebase project details
const firebaseConfig = {
  apiKey: "AIzaSyA1234567890-EXAMPLE-KEY",
  authDomain: "aureole-ecommerce.firebaseapp.com",
  projectId: "aureole-ecommerce",
  storageBucket: "aureole-ecommerce.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefg1234567890"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ========= Authentication functions =============

// Register a new user
export const registerUser = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update the user's profile with display name
    await updateProfile(user, { displayName });
    
    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email,
      displayName,
      createdAt: serverTimestamp(),
      role: 'customer',
      shippingAddresses: [],
      wishlist: []
    });
    
    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Login existing user
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Reset password
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get current authenticated user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Auth state observer
export const onAuthChange = (callback: (user: any) => void) => {
  return onAuthStateChanged(auth, callback);
};

// ========= User data functions =============

// Get user profile
export const getUserProfile = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return { success: true, data: userDoc.data() };
    } else {
      return { success: false, error: "User not found" };
    }
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Update user profile
export const updateUserProfile = async (userId: string, data: any) => {
  try {
    await updateDoc(doc(db, "users", userId), data);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Add shipping address
export const addShippingAddress = async (userId: string, address: any) => {
  try {
    // Get current user data
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
      return { success: false, error: "User not found" };
    }
    
    const userData = userDoc.data();
    const addresses = userData.shippingAddresses || [];
    
    // Add new address with unique ID
    const newAddress = {
      id: Date.now().toString(),
      ...address,
      isDefault: addresses.length === 0 // First address is default
    };
    
    await updateDoc(doc(db, "users", userId), {
      shippingAddresses: [...addresses, newAddress]
    });
    
    return { success: true, address: newAddress };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ========= Order functions =============

// Create a new order
export const createOrder = async (orderData: any) => {
  try {
    const orderRef = collection(db, "orders");
    const newOrder = {
      ...orderData,
      createdAt: serverTimestamp()
    };
    
    const docRef = await addDoc(orderRef, newOrder);
    
    return { success: true, orderId: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Get user orders
export const getUserOrders = async (userId: string) => {
  try {
    const orderRef = collection(db, "orders");
    const q = query(
      orderRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const orders: any[] = [];
    
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, orders };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// ========= Wishlist functions =============

// Add product to wishlist
export const addToWishlist = async (userId: string, productId: number) => {
  try {
    // Get current user data
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
      return { success: false, error: "User not found" };
    }
    
    const userData = userDoc.data();
    const wishlist = userData.wishlist || [];
    
    // Check if product is already in wishlist
    if (!wishlist.includes(productId)) {
      await updateDoc(doc(db, "users", userId), {
        wishlist: [...wishlist, productId]
      });
    }
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (userId: string, productId: number) => {
  try {
    // Get current user data
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) {
      return { success: false, error: "User not found" };
    }
    
    const userData = userDoc.data();
    const wishlist = userData.wishlist || [];
    
    // Filter out the product
    const updatedWishlist = wishlist.filter((id: number) => id !== productId);
    
    await updateDoc(doc(db, "users", userId), {
      wishlist: updatedWishlist
    });
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export { db, auth };
