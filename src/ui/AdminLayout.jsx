import Sidebar from './admin/Sidebar';
import Topbar from './admin/Topbar';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../features/auth/authSlice';

function AdminLayout() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    console.log(token, user);
    if (token && !user) {
      dispatch(loadUser());
    }
  }, [dispatch, token, user]);

  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f9f6f1] overflow-hidden">
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-30 md:hidden transition-opacity ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed z-50 md:static bg-white w-64 h-full border-r shadow-sm transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Topbar onToggleSidebar={() => setSidebarOpen(true)} />
        <main className="p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
