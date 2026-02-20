import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom'; // Imported Link
import { useAuth } from '../../context/AuthContext';
import { Package, LogOut, Plane, Menu, X, Users } from 'lucide-react'; // Added Users icon for Customers
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: 'packages', icon: Package, label: 'Manage Packages' },
    { path: 'customers', icon: Users, label: 'Customers' }, // Ensure Customers is in the menu
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white z-30 px-4 py-3 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-indigo-600">
           {/* Wrapped Plane icon in Link for mobile */}
           <Link to="/" title="Go to Home Page">
             <Plane size={20} className="fill-indigo-600 hover:scale-110 transition-transform cursor-pointer" />
           </Link>
           <span>Admin Panel</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-600">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar (Responsive) */}
      <aside className={`
        fixed inset-y-0 left-0 z-20 w-72 bg-white border-r border-gray-100 flex flex-col shadow-xl transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        mt-14 lg:mt-0
      `}>
        <div className="p-8 pb-4 hidden lg:block">
          <div className="flex items-center gap-3 text-indigo-600 mb-8">
            <div className="p-2.5 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
              {/* Wrapped Plane icon in Link for desktop sidebar */}
              <Link to="/" title="Go to Home Page">
                <Plane size={24} className="fill-indigo-600 hover:scale-110 transition-transform cursor-pointer" />
              </Link>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">Admin Panel</h1>
          </div>
          
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">Menu</div>
        </div>

        <nav className="flex-1 px-4 space-y-2 py-4 lg:py-0">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-100'
                    : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 hover:scale-[1.02]'
                }`
              }
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-100 mb-14 lg:mb-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3.5 w-full text-left text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300 font-medium group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-10 relative overflow-x-hidden mt-14 lg:mt-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-50/50 to-transparent -z-10" />
        
        <header className="flex justify-between items-center mb-8 lg:mb-10">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">Welcome, {user?.username}</h2>
            <p className="text-sm lg:text-base text-gray-500">Manage your travel dashboard.</p>
          </div>
          <div className="hidden lg:flex h-10 w-10 rounded-full bg-indigo-100 items-center justify-center text-indigo-700 font-bold border-2 border-white shadow-sm">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default AdminDashboard;