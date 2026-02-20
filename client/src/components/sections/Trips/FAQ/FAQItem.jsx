/**
 * Single FAQ item with accordion functionality
 * @param {Object} data - FAQ data with question and answer
 * @param {boolean} isOpen - Whether accordion is expanded
 * @param {Function} toggle - Callback to toggle accordion
 */
const FAQItem = ({ data, isOpen, toggle }) => {
  return (
    <div className={`mb-5 rounded-lg overflow-hidden ${
      isOpen 
        ? 'border border-[rgb(1,95,116)] shadow-[1px_1px_3px_1px_white]' 
        : 'bg-white'
    }`}>
      {/* Question Button */}
      <button 
        onClick={toggle}
        className={`w-full flex justify-between items-center p-4 bg-white text-left font-medium transition-colors ${
          isOpen ? 'text-[rgb(1,95,116)] accordion-active' : 'text-black'
        }`}
        aria-expanded={isOpen}
      >
        <span className="text-sm min-[500px]:text-base">{data.q}</span>
        <span className="accordion-arrow"></span>
      </button>

      {/* Answer Content */}
      <div className={`bg-white px-4 transition-all duration-300 ease-in-out ${
        isOpen 
          ? 'max-h-[500px] pb-4 opacity-100' 
          : 'max-h-0 opacity-0'
      }`}>
        <p className="text-sm min-[500px]:text-base text-gray-700">
          {data.a}
        </p>
      </div>
    </div>
  );
};

export default FAQItem;
