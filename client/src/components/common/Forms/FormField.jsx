import React from 'react';

const FormField = ({ field, value, onChange, name, error }) => {
  const Icon = field.icon;
  
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="relative group">
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-500' : 'text-gray-400 group-focus-within:text-[rgb(1,95,116)]'}`}>
          <Icon size={20} />
        </div>
        
        <input 
          type={field.type} 
          id={field.id}
          name={name || field.id} 
          value={value}
          onChange={onChange}
          placeholder={field.placeholder}
          className={`w-full bg-white border text-gray-900 rounded-xl py-3 pl-12 pr-4 outline-none transition-all shadow-sm ${
            error 
              ? 'border-red-500 focus:border-red-500 ring-1 ring-red-500/20' 
              : 'border-gray-200 focus:border-[rgb(1,95,116)]'
          }`}
        />
      </div>
      {error && <p className="text-xs text-red-500 pl-2 m-0">{error}</p>}
    </div>
  );
};

export default FormField;