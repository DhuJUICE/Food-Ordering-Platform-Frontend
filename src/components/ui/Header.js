import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import ButtonUI from "./Button";

const HeaderUI = ({
  brand,
  isLoggedIn,
  cartCount,
  onNavigateHome,
  onNavigate,
  onOpenCart,
  onLogin,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4">

        {/* Brand */}
        <div
          onClick={onNavigateHome}
          className="text-xl font-semibold text-gray-900 cursor-pointer tracking-tight"
        >
          {brand}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          {/* Cart */}
          {!isLoggedIn && (
            <div className="relative">
              <ButtonUI variant="outline" onClick={onOpenCart}>
                <FaShoppingCart />
                <span className="hidden sm:inline">Order</span>
              </ButtonUI>

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] px-2 py-[2px] rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
          )}

          {/* Auth */}
          {!isLoggedIn ? (
            <ButtonUI onClick={onLogin}>
              Sign in
            </ButtonUI>
          ) : (
            <ButtonUI variant="outline" onClick={onLogout}>
              Logout
            </ButtonUI>
          )}

        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t bg-gray-50">
        <div className="flex items-center justify-center gap-6 px-6 py-3 text-sm">

          {!isLoggedIn ? (
            <>
              <button
                onClick={() => onNavigate("/menu")}
                className="text-gray-600 hover:text-black transition"
              >
                Menu
              </button>
              <button
                onClick={() => onNavigate("/track-orders")}
                className="text-gray-600 hover:text-black transition"
              >
                Track Order
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onNavigate("/dashboard")}
                className="text-gray-600 hover:text-black transition"
              >
                Dashboard
              </button>
              <button
                onClick={() => onNavigate("/manage-menu")}
                className="text-gray-600 hover:text-black transition"
              >
                Manage Menu
              </button>
            </>
          )}

        </div>
      </nav>

    </header>
  );
};

export default HeaderUI;