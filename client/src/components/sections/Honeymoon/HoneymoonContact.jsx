import React, { useState } from 'react';
import axios from 'axios'; // ✅ Added Axios for API
import { User, Mail, Phone, MessageSquare } from 'lucide-react';
import ribbon from '../../../assets/banner/ribbon.svg';
import SuccessModal from '../../common/SuccessModal'; // ✅ Added SuccessModal

const HoneymoonContact = () => {
  // ✅ Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      source: 'Honeymoon Contact Section' // Identifies the source in Admin Panel
    };

    try {
      const response = await axios.post('http://localhost:5001/api/inquiries', payload);
      
      if (response.status === 201) {
        setShowSuccess(true); // Show the success popup
        setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert('Something went wrong. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Success Modal integration */}
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        title="Details Submitted!" 
        message="We've received your request. Our honeymoon specialist will reach out to you shortly."
      />

      <h2 className="text-center text-[#015f74] text-6xl md:text-7xl mb-10 font-tangerine-custom text-shadow-light">
        Contact Us
      </h2>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 bg-[#d4f5fb] p-8 rounded-2xl border border-blue-100 shadow-lg">
           <p className="text-center font-bold text-[#015f74] text-xl mb-6">Not sure what to do? We’ll give you a Call back</p>
           
           <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex bg-white rounded border overflow-hidden p-2 items-center">
                 <User size={18} className="text-gray-400 mr-2"/>
                 <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full outline-none text-sm" 
                    placeholder="Enter your name" 
                    required
                 />
              </div>
              <div className="flex bg-white rounded border overflow-hidden p-2 items-center">
                 <Mail size={18} className="text-gray-400 mr-2"/>
                 <input 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full outline-none text-sm" 
                    type="email" 
                    placeholder="Enter your Email Id" 
                    required
                 />
              </div>
              <div className="flex bg-white rounded border overflow-hidden p-2 items-center">
                 <Phone size={18} className="text-gray-400 mr-2"/>
                 <input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full outline-none text-sm" 
                    type="tel" 
                    placeholder="Enter your 10 digit number" 
                    required
                 />
              </div>
              <div className="flex bg-white rounded border overflow-hidden p-2 items-start">
                 <MessageSquare size={18} className="text-gray-400 mr-2 mt-1"/>
                 <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full outline-none text-sm resize-none" 
                    rows="3" 
                    placeholder="Write your message"
                    required
                 ></textarea>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#ffd400] hover:bg-[#e6bf00] font-bold py-3 rounded text-[#015f74] transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
           </form>
        </div>
        <div className="hidden md:block w-1/2">
           <img src={ribbon} alt="Decoration" className="w-full h-auto opacity-90" />
        </div>
      </div>
    </section>
  );
};

export default HoneymoonContact;