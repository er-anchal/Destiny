import React from 'react';
import { MessageSquare } from 'lucide-react';

/**
 * Message textarea component
 */
const FormMessage = () => {
  return (
    <div className="w-full group">
      <label 
        htmlFor="msg" 
        className="block text-gray-900 font-semibold text-sm mb-1.5 ml-1"
      >
        Message
      </label>
      <div className="flex relative">
        {/* Icon Container - Aligned to top */}
        <span className="bg-gray-50 border border-gray-300 border-r-0 rounded-l-lg px-3 py-3 flex items-start text-gray-500 group-focus-within:border-[rgb(1,95,116)] group-focus-within:text-black transition-colors duration-300 h-auto">
          <MessageSquare size={18} />
        </span>
        
        {/* Textarea */}
        <textarea 
          id="msg" 
          rows="3" 
          className="w-full bg-white border border-gray-300 rounded-r-lg px-4 py-2.5 text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:border-[rgb(1,95,116)] focus:ring-1 focus:ring-black transition-all duration-300 resize-none" 
          placeholder="Write your message here..."
          required
        ></textarea>
      </div>
    </div>
  );
};

export default FormMessage;