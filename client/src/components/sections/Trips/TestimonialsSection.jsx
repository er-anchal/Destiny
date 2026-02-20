import TestimonialCard from '../../common/Cards/TestimonialCard/TestimonialCard';
import SectionHeader from '../../common/SectionHeader';
import { testimonials } from '../../../data';

/**
 * Testimonials section with customer reviews
 */
const TestimonialsSection = () => {
  return (
    <section className="container mx-auto px-4 mb-12">
      <SectionHeader title="Hear from Travellers like you" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <TestimonialCard key={t.id} data={t} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
