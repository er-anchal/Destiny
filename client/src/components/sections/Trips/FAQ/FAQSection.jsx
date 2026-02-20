import { useState } from 'react';
import FAQItem from './FAQItem';
import SectionHeader from '../../../common/SectionHeader';
import { faqs } from '../../../../data';
import FAQimage from '../../../../assets/banner/faq.png';

/**
 * Complete FAQ section with image and accordion list
 */
const FAQSection = () => {
  const [activeFaqIndex, setActiveFaqIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveFaqIndex(activeFaqIndex === index ? null : index);
  };

  return (
    <section className="container-fluid bg-black pb-10 mt-12">
      <div className="container mx-auto px-4">
        <SectionHeader 
          subtitle="You Right to Know!"
          title="Frequently Asked Questions"
        />

        <div className="flex flex-col lg:flex-row-reverse gap-8 items-start">
          {/* FAQ Image - Desktop only */}
          <div className="hidden lg:block w-1/2">
            <img 
              src={FAQimage} 
              alt="FAQ" 
              className="w-full h-auto" 
            />
          </div>

          {/* FAQ Items */}
          <div className="w-full lg:w-1/2">
            {faqs.map((faq, idx) => (
              <FAQItem 
                key={idx} 
                data={faq} 
                isOpen={activeFaqIndex === idx} 
                toggle={() => toggleFAQ(idx)} 
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
