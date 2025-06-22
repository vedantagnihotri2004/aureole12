import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { onAuthChange } from './firebase/firebase';
import { setUser } from './slices/authSlice';
import { toggleCart, toggleAuthModal, setAuthModalType } from './slices/uiSlice';

// Pages
import Home from './pages/Home/Home';
import ListProducts from './pages/ListProducts/ListProducts';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Checkout from './pages/Checkout/Checkout';
import About from './pages/About/About';

// Components
import AuthModal from './components/auth/AuthModal';
import ShoppingCart from './components/ShoppingCart';
import UserProfile from './components/account/UserProfile';
import NotificationSystem from './components/NotificationSystem';

// Import other pages as they become available
// import Influencers from './pages/Influencers/Influencers';
// import ListBlog from './pages/ListBlog/ListBlog';
// import DetailBlog from './pages/DetailBlog/DetailBlog';
// import Create from './pages/Create/Create';

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 48px 24px 48px;
  border-bottom: 1.5px solid #e0e0e0;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavItems = styled.div`
  display: flex;
  gap: 36px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #222;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding-bottom: 6px;
  transition: color 0.2s, border-bottom 0.2s;
  &:hover {
    color: #b38a5c;
    border-bottom: 2px solid #b38a5c;
  }
`;

const UserControls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: color 0.2s;
  
  &:hover {
    color: #b38a5c;
  }
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #b38a5c;
  color: white;
  font-size: 12px;
  font-weight: bold;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BrandLogo = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  color: #222;
  text-decoration: none;
  letter-spacing: 2px;
  font-family: 'Playfair Display', serif;
`;

const Main = styled.main`
  padding: 0 0 60px 0;
  background: #fff;
`;

const Footer = styled.footer`
  background: #222;
  color: #fff;
  padding: 48px 0 24px 0;
  text-align: center;
  font-size: 15px;
  letter-spacing: 1px;
  margin-top: 60px;
`;

function App() {
  const dispatch = useAppDispatch();
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);
  const { totalItems } = useAppSelector((state) => state.cart);
  
  useEffect(() => {
    // Set up authentication listener
    const unsubscribe = onAuthChange((authUser) => {
      if (authUser) {
        // User is signed in
        dispatch(setUser(authUser));
      } else {
        // User is signed out
        dispatch(setUser(null));
      }
    });
    
    // Clean up subscription
    return () => unsubscribe();
  }, [dispatch]);
  
  const handleCartClick = () => {
    dispatch(toggleCart());
  };
  
  const handleAuthClick = () => {
    dispatch(toggleAuthModal());
    dispatch(setAuthModalType('login'));
  };

  return (
    <Router>
      <div className="App">
        <Navigation>
          <BrandLogo to="/">AURÉOLE</BrandLogo>
          <NavItems>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Shop</NavLink>
            <NavLink to="/about">About</NavLink>
          </NavItems>
          <UserControls>
            {isLoggedIn ? (
              <>
                <NavLink to="/account">Account</NavLink>
                <NavLink to="/wishlist">Wishlist</NavLink>
              </>
            ) : (
              <IconButton onClick={handleAuthClick} title="Login/Register">
                <i className="fas fa-user" aria-hidden="true"></i>
                <span className="sr-only">Login/Register</span>
              </IconButton>
            )}
            <IconButton onClick={handleCartClick} title="Shopping Cart">
              <i className="fas fa-shopping-bag" aria-hidden="true"></i>
              {totalItems > 0 && <CartCount>{totalItems}</CartCount>}
              <span className="sr-only">Shopping Cart</span>
            </IconButton>
          </UserControls>
        </Navigation>
        
        {/* Auth Modal */}
        <AuthModal />
        
        {/* Shopping Cart */}
        <ShoppingCart />
        
        {/* Notification System */}
        <NotificationSystem />
        
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ListProducts />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/account" element={<UserProfile />} />
            <Route path="/wishlist" element={<div>Wishlist Page</div>} />
          </Routes>
        </Main>
        <Footer>
          &copy; {new Date().getFullYear()} Auréole. All rights reserved. | Luxury Scented Candles
        </Footer>
      </div>
    </Router>
  );
}

export default App;
