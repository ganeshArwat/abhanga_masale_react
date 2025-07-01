import { Link, NavLink } from 'react-router-dom';
import {
  FiGrid, FiBox, FiTag, FiShoppingBag, FiX
} from 'react-icons/fi';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <FiGrid /> },
  { to: '/admin/categories', label: 'Categories', icon: <FiTag /> },
  { to: '/admin/products', label: 'Products', icon: <FiBox /> },
  { to: '/admin/orders', label: 'Orders', icon: <FiShoppingBag /> },
];

function Sidebar({ onClose }) {
  return (
    <div className="h-full flex flex-col p-5">
      {/* Logo + Close (mobile only) */}
      <div className="flex justify-between lg:justify-center items-center mb-8">
        <Link to="/admin/dashboard">
          <img
            src="/assets/img/logo.png"
            alt="Logo"
            className="h-12 lg:h-14 w-auto rounded-lg"
          />
        </Link>
        <button
          className="md:hidden text-gray-500"
          onClick={onClose}
        >
          <FiX className="text-2xl" />
        </button>
      </div>

      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all ${
                isActive
                  ? 'bg-[#91542b] text-white'
                  : 'text-gray-700 hover:bg-[#f6f1e7] hover:text-[#91542b]'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
