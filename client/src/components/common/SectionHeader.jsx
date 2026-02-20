const SectionHeader = ({ 
  subtitle = '', 
  title, 
  showUnderline = true 
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center mb-8">
      {subtitle && (
        <p className="text-xl font-bold italic text-white mb-2">{subtitle}</p>
      )}
      <h2 className="text-4xl lg:text-5xl font-bold text-[rgb(1,95,116)] mb-3">
        {title}
      </h2>
      {showUnderline && (
        <div className="h-[2px] w-[20%] min-[500px]:w-[35%] bg-[rgb(252,252,34)]"></div>
      )}
    </div>
  );
};

export default SectionHeader;
