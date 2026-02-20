import React, { useState } from 'react';
import axios from 'axios';
import FormField from '../../../common/Forms/FormField';
import SuccessModal from '../../../common/SuccessModal'; 
import { contactFields } from '../../../../data';
import { validateText, validateEmail, validatePhone } from '../../Auth/validation';

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
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
      const response = await axios.post('http://localhost:5001/api/inquiries', { ...formData, source: 'Trip Details Contact' });
      if (response.status === 201) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' }); 
      }
    } catch (error) {
      alert('Failed to send message. Please check your connection.');
    } finally { setLoading(false); }
  };

  return (
    <>
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} title="We received your request!" message="Our travel expert will call you shortly." />
      <fieldset className="w-full min-h-full px-5 sm:px-8 md:px-15 lg:w-1/2 mx-auto bg-[#d4f5fb] pt-4 pb-10 rounded-xl border border-[rgb(1,95,116)]/20 shadow-sm">
        <legend className="text-center mb-6 px-4">
          <p className="text-xl font-bold text-[rgb(1,95,116)] mt-18 sm:mt-15 font-serif">Not sure what to do? We'll give you a Call back</p>
        </legend>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {contactFields.map((field) => (
            <FormField key={field.id} field={field} name={field.id.toLowerCase()} value={formData[field.id.toLowerCase()]} onChange={handleChange} error={errors[field.id.toLowerCase()]} />
          ))}

          <div className="flex flex-col gap-1 w-full">
             <textarea name="message" value={formData.message} onChange={handleChange} placeholder="e.g., I want to visit Kerala in December..." rows="4" className={`w-full p-4 rounded-xl bg-white/80 border outline-none text-gray-700 transition-all resize-none ${errors.message ? 'border-red-500 ring-1 ring-red-500/20' : 'border-white focus:border-[rgb(1,95,116)]'}`} />
             {errors.message && <p className="text-xs text-red-500 pl-2">{errors.message}</p>}
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#ffd400] hover:bg-[#f0c300] text-black font-bold py-3 rounded-full mt-4 transition-transform active:scale-95 shadow-lg disabled:opacity-50">
            {loading ? 'Sending...' : 'Submit Request'}
          </button>
        </form>
      </fieldset>
    </>
  );
};
export default ContactForm;