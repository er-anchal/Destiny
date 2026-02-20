import React, { useState } from 'react';
import axios from 'axios';
import { X, Send, User, Mail, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { assets } from '../../data';
import useBodyScrollLock from '../layout/Navbar/hooks/useBodyScrollLock';
import { validateText, validateEmail, validatePhone } from '../sections/Auth/validation';

const CuteInput = ({ icon: Icon, type, placeholder, id, value, onChange, name, error }) => (
  <div className="flex flex-col gap-1 w-full">
    <div className="relative group">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-500' : 'text-[var(--wander-teal)]/70 group-focus-within:text-[var(--wander-teal)]'}`}>
        <Icon size={20} />
      </div>
      <input 
        type={type} id={id} name={name} value={value} onChange={onChange} placeholder={placeholder}
        className={`w-full hover:bg-[var(--wander-teal)]/10 focus:bg-white border-2 text-[var(--wander-teal)] placeholder-gray-400 rounded-2xl py-3.5 pl-12 pr-4 outline-none transition-all duration-300 ${error ? 'bg-white border-red-500' : 'bg-[var(--wander-teal)]/5 border-transparent focus:border-[var(--wander-teal)]'}`}
      />
    </div>
    {error && <p className="text-xs text-red-500 pl-2 m-0">{error}</p>}
  </div>
);

const ContactModal = ({ isOpen, onClose }) => {
  useBodyScrollLock(isOpen);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateText(formData.name, 3)) newErrors.name = 'Name must be at least 3 characters.';
    if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email address.';
    if (!validatePhone(formData.phone)) newErrors.phone = 'Phone number must be exactly 10 digits.';
    if (!validateText(formData.message, 5)) newErrors.message = 'Please provide a brief message.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) return setErrors(formErrors);

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/inquiries`, { ...formData, source: 'Contact Modal' });
      alert('Thanks for reaching out! We will contact you shortly.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      onClose(); 
    } catch (error) { alert('Something went wrong. Please try again.'); } 
    finally { setLoading(false); }
  };

  const modalVariants = { hidden: { opacity: 0, scale: 0.9, y: 20 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 300 } }, exit: { opacity: 0, scale: 0.9, y: 20 } };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[var(--wander-teal)]/40 backdrop-blur-sm cursor-pointer" />
          
          <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" className="relative w-full max-w-[95%] md:max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:h-auto">
            <div className="hidden md:flex md:w-2/5 relative flex-col justify-between p-8 text-white">
              <div className="absolute inset-0 z-0"><img src={assets.connectBanner} alt="Travel" className="w-full h-full object-cover"/><div className="absolute inset-0 bg-[var(--wander-teal)]/85 mix-blend-multiply"></div><div className="absolute inset-0 bg-gradient-to-t from-[var(--wander-teal)] to-transparent"></div></div>
              <div className="relative z-10"><div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6"><Sparkles className="text-[var(--wander-yellow)]" /></div><h2 className="text-4xl font-bold font-[var(--font-cormorant)] italic leading-tight mb-2">Plan your <br/><span className="text-[var(--wander-yellow)]">Dream Trip</span></h2><p className="text-white/80 text-sm">Let us handle the details while you create the memories.</p></div>
              <div className="relative z-10 space-y-3"><div className="flex items-center gap-3 text-white/90 text-sm"><Mail size={16} className="text-[var(--wander-yellow)]" /><span>hello@Destiny.in</span></div><div className="flex items-center gap-3 text-white/90 text-sm"><Phone size={16} className="text-[var(--wander-yellow)]" /><span>+91 98765 43210</span></div></div>
            </div>

            <div className="flex-1 flex flex-col relative bg-white">
              <div className="md:hidden p-6 pb-2 bg-[var(--wander-teal)] text-white relative overflow-hidden"><h3 className="text-2xl font-bold font-[var(--font-cormorant)] relative z-10">Get in Touch</h3><div className="absolute -bottom-8 -right-8 w-24 h-24 bg-[var(--wander-yellow)]/20 rounded-full blur-xl"></div></div>
              <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-colors z-20 cursor-pointer"><X size={20} /></button>

              <div className="p-6 md:p-10 overflow-y-auto scrollbar-hide h-full">
                <div className="hidden md:block mb-8"><h3 className="text-3xl font-bold text-[var(--wander-teal)] font-[var(--font-cormorant)]">Let's Chat!</h3><p className="text-gray-500 text-sm mt-1">Fill out the form below and we'll get back to you.</p></div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <CuteInput icon={User} type="text" id="name" name="name" placeholder="e.g., John Doe" value={formData.name} onChange={handleChange} error={errors.name} />
                    <CuteInput icon={Mail} type="email" id="email" name="email" placeholder="e.g., hello@Destiny.in" value={formData.email} onChange={handleChange} error={errors.email} />
                    <CuteInput icon={Phone} type="tel" id="phone" name="phone" placeholder="e.g., 9090403075" value={formData.phone} onChange={handleChange} error={errors.phone} />

                    <div className="flex flex-col gap-1 w-full">
                      <div className="relative group">
                          <div className={`absolute left-4 top-4 transition-colors ${errors.message ? 'text-red-500' : 'text-[var(--wander-teal)]/70 group-focus-within:text-[var(--wander-teal)]'}`}><MessageSquare size={20} /></div>
                          <textarea 
                              id="msg" name="message" value={formData.message} onChange={handleChange} rows="3" placeholder="Tell us about your plans..." 
                              className={`w-full hover:bg-[var(--wander-teal)]/10 focus:bg-white border-2 text-[var(--wander-teal)] placeholder-gray-400 rounded-3xl py-3.5 pl-12 pr-4 outline-none transition-all duration-300 resize-none ${errors.message ? 'bg-white border-red-500' : 'bg-[var(--wander-teal)]/5 border-transparent focus:border-[var(--wander-teal)]'}`}
                          ></textarea>
                      </div>
                      {errors.message && <p className="text-xs text-red-500 pl-2 m-0">{errors.message}</p>}
                    </div>

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="w-full bg-[var(--wander-yellow)] hover:bg-[var(--wander-yellow-hover)] text-[var(--wander-teal)] font-bold py-4 rounded-2xl shadow-lg shadow-yellow-100 flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer disabled:opacity-50">
                        <Send size={18} /><span>{loading ? 'Sending...' : 'Send Message'}</span>
                    </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;