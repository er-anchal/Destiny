import FlipCard from '../../common/Cards/FlipCard';
import SectionHeader from '../../common/SectionHeader';

// Now accepts title and data as props
const ExploreSection = ({ title, destinationsData }) => {
  return (
    <section className="container mx-auto mt-24 px-4">
      <SectionHeader title={title} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {destinationsData?.map((dest) => (
          <FlipCard key={dest.id} data={dest} />
        ))}
      </div>
    </section>
  );
};

export default ExploreSection;