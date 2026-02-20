import { socialIcons } from '../../../data';

const FooterSocial = () => {
  return (
    <div className="flex gap-2 bg-[#3b3838] px-5 py-2 rounded-full mt-2 w-[200px] justify-center">
      {socialIcons.map((item, i) => {
        const Icon = item.icon;
        return (
        <a 
          key={i}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white p-1 rounded-full flex items-center justify-center w-[30px] h-[30px] cursor-pointer hover:bg-gray-200 transition-colors"
          aria-label={`Social icon ${i + 1}`}
        >
          <Icon size={16} className="text-black" />
        </a>
      )})}
    </div>
  );
};

export default FooterSocial;