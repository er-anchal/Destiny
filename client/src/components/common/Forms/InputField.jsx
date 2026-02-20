import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({ icon, type, name, placeholder, value, onChange, error }) => {
  // Track whether the password should be shown or hidden
  const [showPassword, setShowPassword] = useState(false);

  // Check if this specific input was meant to be a password field
  const isPasswordField = type === 'password';
  
  // Dynamically switch the input type based on state
  const currentType = isPasswordField && showPassword ? 'text' : type;

  return (
    <div className="input-field-wrapper w-full flex flex-col items-center">
      {/* Added 'relative' to allow absolute positioning of the eye icon without breaking your CSS grid */}
      <div className={`input-field relative ${error ? 'border-red-500 shadow-[0_0_5px_rgba(239,68,68,0.3)]' : ''}`}>
        <i className={error ? 'text-red-500' : ''}>{icon}</i>
        
        <input
          type={currentType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          // Add padding to the right only for password fields so text doesn't hide behind the icon
          className={isPasswordField ? "pr-12 outline-none bg-transparent" : "outline-none bg-transparent"} 
        />
        
        {/* Render the toggle icon ONLY if this is a password input */}
        {isPasswordField && (
          <div 
            className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-[var(--wander-teal)] transition-colors z-10"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? "Hide Password" : "Show Password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        )}
      </div>
      
      {error && <span className="text-xs text-red-500 mt-1 self-start ml-2 font-semibold">{error}</span>}
    </div>
  );
};

export default InputField;