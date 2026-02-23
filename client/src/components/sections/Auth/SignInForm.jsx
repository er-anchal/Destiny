import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import InputField from '../../common/Forms/InputField';
import { validateEmail, validateText, validatePassword } from './validation';

const SignInForm = () => {
  // Added newPassword to the state
  const [formData, setFormData] = useState({ email: '', password: '', newPassword: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  // States for the Forgot Password UI
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // --- STANDARD LOGIN LOGIC ---
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateEmail(formData.email)) newErrors.email = 'Enter a valid email (e.g., hello@Destiny.in)';
    if (!validateText(formData.password)) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    setIsLoading(true);
    try {
      const data = await login(formData.email, formData.password);
      if (data.isAdmin) navigate('/admin/dashboard');
      else navigate('/');
    } catch (error) {
      if (error.response?.data?.field) {
        setErrors({ [error.response.data.field]: error.response.data.message });
      } else {
        setErrors({ password: error.response?.data?.message || 'Login failed. Please check credentials.' });
      }
    } finally { 
      setIsLoading(false); 
    }
  };

  // --- DIRECT PASSWORD RESET LOGIC ---
  const handleDirectReset = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid registered email.';
    if (!validatePassword(formData.newPassword)) newErrors.newPassword = 'Min 8 chars, 1 letter, 1 number.';

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    setIsLoading(true);
    try {
      // Calls your new backend route
      await axios.post(`${API_URL}/api/auth/reset-password`, { 
        email: formData.email, 
        newPassword: formData.newPassword 
      });
      
      setResetSuccess(true);
    } catch (error) {
      if (error.response?.data?.field) {
        setErrors({ [error.response.data.field]: error.response.data.message });
      } else {
        setErrors({ email: 'Failed to reset password. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // --- UI FOR FORGOT PASSWORD MODE ---
  if (isForgotMode) {
    return (
      <form className="sign-in-form" onSubmit={handleDirectReset}>
        <h2 className="title text-3xl font-bold mb-2 text-gray-800">Reset Password</h2>
        
        {resetSuccess ? (
          // Success Message
          <div className="flex flex-col items-center gap-3 text-center mt-4">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-3xl mb-2">
              ✓
            </div>
            <p className="text-green-600 font-bold text-lg">Password Changed!</p>
            <p className="text-gray-500 text-sm max-w-[280px]">
              You can now log in using your new password.
            </p>
            <button 
              type="button" 
              className="btn solid mt-6" 
              onClick={() => { setIsForgotMode(false); setResetSuccess(false); setFormData({ ...formData, password: '', newPassword: '' }); }}
            >
              Back to Login
            </button>
          </div>
        ) : (
          // Request Form UI
          <div className="w-full flex flex-col items-center">
            <p className="text-gray-500 text-sm text-center mb-6 max-w-[300px]">
              Enter your email and a new password to instantly update your account.
            </p>
            
            <InputField 
              icon="✉️" type="email" name="email" placeholder="e.g., hello@Destiny.in" 
              value={formData.email} onChange={handleChange} error={errors.email} 
            />
            <InputField 
              icon="🔒" type="password" name="newPassword" placeholder="Enter New Password" 
              value={formData.newPassword} onChange={handleChange} error={errors.newPassword} 
            />
            
            <button type="submit" className="btn solid mt-2 !w-fit !px-8" disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Change Password'}
            </button>
            
            <p 
              className="text-sm text-gray-500 hover:text-[var(--wander-teal)] cursor-pointer mt-6 font-semibold transition-colors"
              onClick={() => { setIsForgotMode(false); setErrors({}); }}
            >
              ← Back to Sign In
            </p>
          </div>
        )}
      </form>
    );
  }

  // --- NORMAL SIGN IN UI ---
  return (
    <form className="sign-in-form" onSubmit={handleLoginSubmit}>
      <h2 className="title">Sign in</h2>
      
      <InputField 
        icon="✉️" type="email" name="email" placeholder="e.g., hello@Destiny.in" 
        value={formData.email} onChange={handleChange} error={errors.email} 
      />
      
      <div className="auth-password-wrapper">
        <InputField 
          icon="🔒" type="password" name="password" placeholder="Password" 
          value={formData.password} onChange={handleChange} error={errors.password} 
        />
        <span 
          className="text-xs text-gray-500 hover:text-[var(--wander-teal)] cursor-pointer mt-2 mr-2 self-end font-semibold transition-colors"
          onClick={() => { setIsForgotMode(true); setErrors({}); }}
        >
          Forgot Password?
        </span>
      </div>

      <button type="submit" className="btn solid mt-4" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
};

export default SignInForm;