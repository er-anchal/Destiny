import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { LogOut, User, LayoutDashboard } from 'lucide-react';

const MobileMenuActions = ({ isOpen, onSignInClick, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (onClose) onClose();
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/admin');
    if (onClose) onClose();
  };

  return (
    <div 
      className={`px-6 py-6 space-y-3 transform transition-all duration-300 ${
        isOpen 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: isOpen ? '450ms' : '0ms' }}
    >
      {user ? (
        <div className="space-y-4">
          {/* User Info Card */}
          <div className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-white/20">
              {user.username?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden flex-1">
               <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold">Welcome back</p>
               <p className="text-base font-bold text-white truncate">{user.username}</p>
            </div>
          </div>

          {/* Action Buttons */}
          {/* 👇 Change: Use 'grid-cols-2' ONLY if admin, otherwise 'grid-cols-1' */}
          <div className={`grid ${user.isAdmin ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
             
             {/* 👇 Change: Only show Dashboard if user.isAdmin is true */}
             {user.isAdmin && (
               <button
                onClick={handleProfile}
                className="flex flex-col items-center justify-center gap-2 p-4 bg-white/5 hover:bg-white/15 rounded-2xl transition-all duration-200 text-white border border-white/10 active:scale-95"
               >
                 <LayoutDashboard size={22} className="text-pink-400" />
                 <span className="text-sm font-medium">Dashboard</span>
               </button>
             )}

             <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center gap-2 p-4 bg-red-500/10 hover:bg-red-500/20 rounded-2xl transition-all duration-200 text-red-200 border border-red-500/20 active:scale-95"
             >
               <LogOut size={22} className="text-red-400" />
               <span className="text-sm font-medium">Logout</span>
             </button>
          </div>
        </div>
      ) : (
        /* Logged Out View */
        <button
          onClick={onSignInClick}
          className="w-full px-4 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-purple-900/20"
        >
          <User size={20} />
          Sign In
        </button>
      )}
    </div>
  );
};

export default MobileMenuActions;