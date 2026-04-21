import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../pageComponents/CartPage/cart-context';
import { useAuth } from '../userManagementComponents/auth-context';
import { logout } from '../apiComponents/api-signIn';
import HeaderUI from '../ui/Header';

const Header = () => {
  const navigate = useNavigate();
  const { totalUniqueItems, setCart } = useCart();
  const { isLoggedIn, refreshAuth } = useAuth();

  const handleLogout = async () => {
    await logout();
    setCart([]);
    await refreshAuth();
    navigate('/sign-in');
  };

  return (
    <HeaderUI
      brand="FastFoods"
      isLoggedIn={isLoggedIn}
      cartCount={totalUniqueItems}
      onNavigateHome={() => navigate('/')}
      onNavigate={(path) => navigate(path)}
      onOpenCart={() => navigate('/cart')}
      onLogin={() => navigate('/sign-in')}
      onLogout={handleLogout}
    />
  );
};

export default Header;