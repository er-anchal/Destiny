import React, { useState } from 'react';
import axios from 'axios';
import { User, Mail, Phone } from 'lucide-react';
import { validateText, validateEmail, validatePhone } from '../Auth/validation';

const HoneymoonLeadForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateText(formData.name, 3)) newErrors.name = 'Name is required.';
    if (!validateEmail(formData.email)) newErrors.email = 'Valid email is required.';
    if (!validatePhone(formData.phone)) newErrors.phone = '10-digit phone required.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) return setErrors(formErrors);

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/inquiries`, { ...formData, message: 'Interested in Honeymoon Package', source: 'Honeymoon Lead Form' });
      alert('Honeymoon inquiry sent! We will contact you soon.');
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) { alert('Failed to send details. Please try again.'); } 
    finally { setLoading(false); }
  };

  return (
    <section className="relative py-20 bg-pink-50 overflow-hidden">
       <div className="absolute inset-0 opacity-10 bg-[url('/assets/banner/cta-honeymoon.svg')] bg-cover bg-center"></div>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-12 relative z-10">
         <div className="lg:w-1/2 text-center lg:text-left">
           <h2 className="text-[#f68a95] text-6xl md:text-8xl mb-4 font-tangerine-custom text-shadow-custom">Love is in the Journey</h2>
           <p className="text-gray-700 text-xl font-bold" style={{ fontFamily: 'Lugrasimo, cursive' }}>Love & Details, Please! Let’s get your dream honeymoon in the making!</p>
         </div>
         
         <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border-2 border-[#f68a95]/30">
           <h3 className="text-center text-[#b46767] text-2xl mb-2 font-bold" style={{ fontFamily: 'Lugrasimo, cursive' }}>Get in Touch</h3>
           <p className="text-center text-sm text-gray-400 mb-6">Drop your details & let the magic begin!</p>
           
           <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <div className={`flex items-center border rounded-lg px-3 py-2 bg-gray-50 transition-all ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'focus-within:ring-[#f68a95] focus-within:ring-1'}`}>
                  <User size={18} className={errors.name ? "text-red-500 mr-2" : "text-[#f68a95] mr-2"}/>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., John Doe" className="w-full bg-transparent outline-none text-gray-700" />
                </div>
                {errors.name && <p className="text-xs text-red-500 pl-1 m-0">{errors.name}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <div className={`flex items-center border rounded-lg px-3 py-2 bg-gray-50 transition-all ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'focus-within:ring-[#f68a95] focus-within:ring-1'}`}>
                  <Mail size={18} className={errors.email ? "text-red-500 mr-2" : "text-[#f68a95] mr-2"}/>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="e.g., hello@Destiny.in" className="w-full bg-transparent outline-none text-gray-700" />
                </div>
                {errors.email && <p className="text-xs text-red-500 pl-1 m-0">{errors.email}</p>}
              </div>

              <div className="flex flex-col gap-1">
                <div className={`flex items-center border rounded-lg px-3 py-2 bg-gray-50 transition-all ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'focus-within:ring-[#f68a95] focus-within:ring-1'}`}>
                  <Phone size={18} className={errors.phone ? "text-red-500 mr-2" : "text-[#f68a95] mr-2"}/>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g., 9090403075" className="w-full bg-transparent outline-none text-gray-700" />
                </div>
                {errors.phone && <p className="text-xs text-red-500 pl-1 m-0">{errors.phone}</p>}
              </div>

              <button type="submit" disabled={loading} className="w-full bg-[#f68a95] hover:bg-[#d45664] text-white font-bold py-3 rounded-lg mt-2 disabled:opacity-50">
                {loading ? 'Sending...' : 'Submit'}
              </button>
           </form>
         </div>
      </div>
    </section>
  );
};
export default HoneymoonLeadForm;