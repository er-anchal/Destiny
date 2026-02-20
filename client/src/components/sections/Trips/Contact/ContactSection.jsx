import ContactForm from './ContactForm';
import SectionHeader from '../../../common/SectionHeader';
import ContactImage from '../../../../assets/banner/ribbon.svg';

/**
 * Contact section with form and image
 */
const ContactSection = () => {
  return (
    <section className="container-fluid bg-black pb-12">
      <div className="container mx-auto px-4">
        <SectionHeader title="Contact Us" />

        <div className="flex flex-row gap-12">
          {/* Form - Full width on mobile, 1/2 on desktop */}
          <ContactForm />

          {/* Contact Illustration - Desktop only */}
          <div className="hidden lg:block w-1/2">
            <img 
              src={ContactImage} 
              alt="Contact" 
              className="w-full h-full object-contain" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
