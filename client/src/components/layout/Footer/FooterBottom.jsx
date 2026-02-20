import FooterSocial from './FooterSocial';
import footerDesktop from "../../../assets/banner/footer-desktop.webp";

/**
 * Footer bottom section with company details
 */
const FooterBottom = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center border-b border-[rgb(1,95,116)] gap-4">
      {/* Company Name */}
      <p className="text-xl min-[500px]:text-2xl font-bold uppercase">
        Destiny Experiences Pvt Ltd
      </p>

      {/* Company Address */}
      <p className="text-sm min-[500px]:text-base max-w-lg">
        3rd Floor, Building No-436, Phase IV, Udyog Vihar, Sector-18, 
        Gurugram, Haryana-122015
      </p>

      {/* Contact Details */}
      <div className="flex flex-wrap justify-center gap-4 min-[500px]:gap-12 text-sm min-[500px]:text-base font-medium">
        <span>hello@Destiny.in</span>
        <span>+91-9090403075</span>
        <span>www.Destiny.in</span>
      </div>

      {/* Social Icons */}
      <FooterSocial />

      {/* Footer Banner */}
      <img 
        src={footerDesktop} 
        alt="footer graphic" 
        className="w-full max-w-4xl mt-4 object-contain h-[60px] min-[500px]:h-auto" 
      />
    </div>
  );
};

export default FooterBottom;
