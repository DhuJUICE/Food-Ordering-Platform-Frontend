import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../pageComponents/CartPage/cart-context';
import { useAuth } from '../userManagementComponents/auth-context';
import { logout } from '../apiComponents/api-signIn';

const Header = () => {
  const navigate = useNavigate();
  const { totalQuantity, setCart } = useCart();
  const { isLoggedIn, refreshAuth } = useAuth(); // <-- use context

  const handleLogout = async () => {
    await logout();
    setCart([]);        // clear cart
    await refreshAuth(); // refresh auth state in context
    navigate('/sign-in');
  };

  const openCart = () => navigate('/cart');

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold text-green-600 cursor-pointer" onClick={() => navigate('/')}>
          FastFoods
        </div>

        <div className="flex items-center space-x-4">
          {/* Cart button */}
          <div className="relative">
            <button
              onClick={openCart}
              className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaShoppingCart />
              <span>Your Order</span>
            </button>
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {totalQuantity}
              </span>
            )}
          </div>

          {/* Login / Logout */}
          {!isLoggedIn ? (
            <button
              onClick={() => navigate('/sign-in')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Navigation bar */}
      <nav className="bg-gray-50 shadow-inner">
        <ul className="container mx-auto flex justify-center space-x-4 py-3 px-6">
          {!isLoggedIn ? (
            <>
              <li><button onClick={() => navigate('/')} className="text-gray-700 hover:text-green-600 font-medium transition-colors">Menu</button></li>
              <li><button onClick={() => navigate('/track-orders')} className="text-gray-700 hover:text-green-600 font-medium transition-colors">Track Order</button></li>
            </>
          ) : (
            <>
              <li><button onClick={() => navigate('/dashboard')} className="text-gray-700 hover:text-green-600 font-medium transition-colors">Dashboard</button></li>
              <li><button onClick={() => navigate('/manage-menu')} className="text-gray-700 hover:text-green-600 font-medium transition-colors">Manage Menu</button></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;