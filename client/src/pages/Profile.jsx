import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Calendar, Users, CheckCircle, MapPin, Sparkles, Navigation } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
    // Prevent unauthenticated users OR Admins from accessing the profile
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.isAdmin) {
      navigate('/admin/dashboard');
      return;
    }

    const fetchMyBookings = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/payment/my-bookings`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setBookings(data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMyBookings();
  }, [user, navigate]);

  if (!user || user.isAdmin) return null;

  return (
    // Beautiful Soft Gradient Background
    <div className="min-h-screen bg-gradient-to-br from-[#fff0f3] via-white to-[#e0f7fa] pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-teal-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-pulse delay-1000"></div>

      <div className="max-w-4xl mx-auto space-y-10 relative z-10">
        
        {/* Profile Header (Glassmorphism) */}
        <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="relative">
            <div className="h-24 w-24 bg-gradient-to-tr from-[#f68a95] to-[#ffb6c1] rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg border-4 border-white">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="absolute bottom-1 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center justify-center md:justify-start gap-2">
              Welcome back, {user.username} <Sparkles size={24} className="text-yellow-400" />
            </h1>
            <p className="text-gray-500 font-medium mt-1">{user.email}</p>
          </div>
        </div>

        {/* Bookings Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 font-tangerine-custom">My Adventures</h2>
            <span className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-pink-500 border border-pink-100 shadow-sm">
              {bookings.length} Trips Booked
            </span>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#f68a95] border-opacity-75"></div>
            </div>
          ) : bookings.length === 0 ? (
            // Empty State
            <div className="bg-white/60 backdrop-blur-xl p-12 rounded-[2rem] border border-white shadow-sm text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-pink-300 mb-4">
                <Navigation size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No trips booked yet</h3>
              <p className="text-gray-500 mb-6 max-w-sm">The world is waiting for you. Discover your next dream destination today.</p>
              <Link to="/india" className="bg-gradient-to-r from-[#f68a95] to-[#e75480] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-pink-200 transition-transform transform hover:-translate-y-1">
                Explore Packages
              </Link>
            </div>
          ) : (
            // Render Bookings List
            <div className="grid gap-6">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-white/70 backdrop-blur-lg p-6 md:p-8 rounded-[1.5rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all flex flex-col md:flex-row justify-between md:items-center gap-6 group">
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#fff0f3] text-[#f68a95] text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full">Confirmed</span>
                    </div>
                    <h3 className="font-extrabold text-xl text-gray-900 group-hover:text-[#f68a95] transition-colors flex items-center gap-2">
                      <MapPin size={20} className="text-[#f68a95]" /> {booking.packageTitle}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-4 text-sm font-medium text-gray-600">
                      <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <Calendar size={16} className="text-indigo-400"/> 
                        {new Date(booking.travelDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <Users size={16} className="text-teal-400"/> 
                        {booking.travelers} {booking.travelers === 1 ? 'Traveler' : 'Travelers'}
                      </div>
                    </div>
                  </div>

                  <div className="text-left md:text-right border-t md:border-t-0 md:border-l border-gray-100/50 pt-4 md:pt-0 md:pl-8">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Total Paid</p>
                    <p className="text-3xl font-black text-gray-900 mb-2">₹{booking.amount.toLocaleString('en-IN')}</p>
                    <p className="flex items-center md:justify-end gap-1.5 text-xs text-green-600 font-bold bg-green-50/50 px-3 py-1 rounded-lg w-fit md:ml-auto">
                      <CheckCircle size={14} /> Payment Verified
                    </p>
                    <p className="text-[10px] text-gray-400 mt-2 font-mono">TXN: {booking.razorpay_payment_id}</p>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;