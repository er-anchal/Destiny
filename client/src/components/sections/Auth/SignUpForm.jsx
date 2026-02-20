import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../common/Forms/InputField';
import { useAuth } from '../../../context/AuthContext';
import { validateText, validateEmail, validatePassword } from './validation';

const SignUpForm = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateText(formData.username, 3)) newErrors.username = 'Username must be at least 3 characters.';
    if (!validateEmail(formData.email)) newErrors.email = 'Enter a valid email (e.g., hello@Destiny.in).';
    if (!validatePassword(formData.password)) newErrors.password = 'Min 8 chars, 1 letter, 1 number.';

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    setIsLoading(true);
    try {
      await signup(formData.username, formData.email, formData.password);
      alert('Account Created Successfully!');
      navigate('/'); 
    } catch (error) {
      if (error.response?.data?.field) {
        setErrors({ [error.response.data.field]: error.response.data.message });
      } else {
        setErrors({ email: error.response?.data?.message || 'Signup failed. Please try again.' });
      }
    } finally { 
      setIsLoading(false); 
    }
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <h2 className="title">Sign up</h2>
      <InputField icon="👤" type="text" name="username" placeholder="e.g., travel_lover_99" value={formData.username} onChange={handleChange} error={errors.username} />
      <InputField icon="✉️" type="email" name="email" placeholder="e.g., hello@Destiny.in" value={formData.email} onChange={handleChange} error={errors.email} />
      <InputField icon="🔒" type="password" name="password" placeholder="Min 8 chars, 1 letter, 1 number" value={formData.password} onChange={handleChange} error={errors.password} />
      <button type="submit" className="btn" disabled={isLoading}>{isLoading ? 'Creating...' : 'Sign up'}</button>
    </form>
  );
};
export default SignUpForm;