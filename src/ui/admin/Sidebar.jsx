// admin/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import {
  FiGrid, FiBox, FiPlusSquare, FiTag,
  FiShoppingBag, FiUsers, FiSettings
} from 'react-icons/fi';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: <FiGrid /> },
  { to: '/admin/categories', label: 'Categories', icon: <FiTag /> },
  { to: '/admin/products', label: 'Products', icon: <FiBox /> },
  { to: '/admin/orders', label: 'Orders', icon: <FiShoppingBag /> },
  // { to: '/admin/users', label: 'Users', icon: <FiUsers /> },
  // { to: '/admin/settings', label: 'Settings', icon: <FiSettings /> },
];

function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen p-5 shadow-sm">
        <div className="mb-8 flex justify-center">
        <img
            src="/assets/img/logo.png"
            alt="Rutu Masale Logo"
            className="h-14 w-auto rounded-lg"
        />
        </div>

      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#91542b] text-white'
                  : 'text-gray-700 hover:bg-[#f6f1e7] hover:text-[#91542b]'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
