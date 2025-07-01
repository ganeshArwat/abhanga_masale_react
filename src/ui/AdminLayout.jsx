// admin/AdminLayout.jsx
import Sidebar from './admin/Sidebar';
import Topbar from './admin/Topbar';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="flex h-screen bg-[#f9f6f1]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Topbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
