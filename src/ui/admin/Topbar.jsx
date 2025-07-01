import { FiUser, FiLogOut, FiGrid } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Topbar() {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = user !== null;
  const userName = (user?.fname || 'Admin').toUpperCase();

  return (
    <header className="bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Brand Title */}
      <div className="flex items-center gap-2 text-[#91542b]">
        <FiGrid className="text-xl" />
        <h1 className="text-xl font-bold tracking-wide">Admin Panel</h1>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <div className="flex items-center gap-2 bg-[#f6f1e7] text-[#91542b] px-3 py-1 rounded-full text-sm font-medium">
              <FiUser className="text-md" />
              <span>{userName}</span>
            </div>
            <Link
              to="/logout"
              title="Logout"
              className="text-[#91542b] hover:text-red-600 transition"
            >
              <FiLogOut className="text-xl" />
            </Link>
          </>
        ) : (
          <Link
            to="/signin"
            className="flex items-center gap-2 bg-[#f6f1e7] text-[#91542b] px-3 py-1 rounded-full hover:bg-[#f0e6d4] transition text-sm font-medium"
          >
            <FiUser className="text-md" />
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}

export default Topbar;
