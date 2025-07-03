import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiLogOut,
  FiChevronDown,
} from "react-icons/fi";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Optional hook for outside click
function useOutsideClick(ref, callback) {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useState(() => {
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef();

  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = user !== null;
  const userName = (user?.fname || "User").toUpperCase();

  useOutsideClick(userMenuRef, () => setUserMenuOpen(false));

  return (
    <header className="fixed top-0 w-full z-50 bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <img
          src="/assets/img/logo.png"
          alt="Abhanga Masale Logo"
          className="h-14 w-auto rounded-lg"
        />
      </Link>

      {/* Search Bar (Desktop Only) */}
      <form className="hidden md:flex items-center border border-[#b88c2c] rounded-md overflow-hidden w-full max-w-md ml-6">
        <input
          type="text"
          placeholder="Search..."
          required
          className="w-full px-4 py-2 text-[#b88c2c] placeholder-[#b88c2c] text-sm focus:outline-none"
        />
        <button type="submit" className="px-3 text-[#b88c2c]">
          <FiSearch className="text-lg" />
        </button>
      </form>

      {/* Desktop Icons */}
      <ul className="hidden md:flex items-center gap-6 text-lg text-gray-600 ml-auto pr-2">
        <li>
          <Link
            to="/whishlist"
            className="p-2 rounded-full hover:text-[#91542b] transition duration-200"
          >
            <FiHeart className="text-lg" />
          </Link>
        </li>
        <li>
          <Link
            to="/cart"
            className="p-2 rounded-full hover:text-[#91542b] transition duration-200"
          >
            <FiShoppingCart className="text-lg" />
          </Link>
        </li>

        {/* User Dropdown */}
        <li className="relative" ref={userMenuRef}>
          {isLoggedIn ? (
            <button
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 p-2 rounded-full hover:text-[#91542b] transition duration-200"
              title="Account"
            >
              <FiUser className="text-lg" />
              <span className="text-sm font-medium text-gray-800">{userName}</span>
              <FiChevronDown className={`text-sm transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
            </button>
          ) : (
            <Link
              to="/signup"
              className="p-2 rounded-full hover:text-[#91542b] transition duration-200"
              title="Signup"
            >
              <FiUser className="text-lg" />
            </Link>
          )}

          {/* Dropdown Menu */}
          {userMenuOpen && isLoggedIn && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md z-50 text-sm">
              {/* <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={() => setUserMenuOpen(false)}
              >
                My Profile
              </Link> */}
              <Link
                to="/orders"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={() => setUserMenuOpen(false)}
              >
                My Orders
              </Link>
              <Link
                to="/logout"
                className="block px-4 py-2 hover:bg-gray-100 text-red-600"
                onClick={() => setUserMenuOpen(false)}
              >
                Logout
              </Link>
            </div>
          )}
        </li>
      </ul>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-gray-700 z-50"
      >
        {menuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
      </button>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white shadow-md px-6 py-4 flex flex-col gap-4 md:hidden animate-slide-down z-40">
          <form className="flex items-center border border-[#b88c2c] rounded-md overflow-hidden w-full">
            <input
              type="text"
              placeholder="Search..."
              required
              className="w-full px-4 py-2 text-[#b88c2c] placeholder-[#b88c2c] text-sm focus:outline-none"
            />
            <button type="submit" className="px-3 text-[#b88c2c]">
              <FiSearch className="text-lg" />
            </button>
          </form>

          <Link to="/whishlist" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <FiHeart />
            Wishlist
          </Link>

          <Link to="/cart" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <FiShoppingCart />
            Cart
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/profile" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                <FiUser />
                My Profile
              </Link>
              <Link to="/orders" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                📦 My Orders
              </Link>
              <Link to="/logout" className="flex items-center gap-2 text-red-600 hover:text-red-800">
                <FiLogOut />
                Logout
              </Link>
            </>
          ) : (
            <Link to="/signup" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
              <FiUser />
              Account
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
