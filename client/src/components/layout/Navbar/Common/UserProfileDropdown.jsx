import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { LogOut, User, ChevronDown, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfileDropdown = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  if (!user) return null;

  // Get initials (e.g., "John Doe" -> "JD")
  const initials = user.username
    ? user.username.substring(0, 2).toUpperCase()
    : 'U';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-2 rounded-full hover:bg-white/10 transition-colors border border-transparent hover:border-white/20"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-sm">
          {initials}
        </div>
        <ChevronDown size={16} className={`text-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 transform origin-top-right transition-all">
          <div className="px-4 py-3 border-b border-gray-50 mb-1">
            <p className="text-sm text-gray-500">Signed in as</p>
            <p className="text-sm font-bold text-gray-900 truncate">{user.username}</p>
          </div>
          
          {/* 👇 CONDITIONALLY RENDERED ADMIN OPTION 👇 */}
          {user.isAdmin && (
            <button
              onClick={() => {
                navigate('/admin');
                setIsOpen(false);
              }} 
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <ShieldAlert size={16} />
              Admin Panel
            </button>
          )}

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;