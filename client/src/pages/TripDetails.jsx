import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  MapPin, Clock, CheckCircle, XCircle, ChevronDown, 
  Phone, ShieldCheck 
} from 'lucide-react';
import { 
  honeymoonPackages, 
  indiaData, 
  internationalData, 
  exhilaratingDeals, 
  exclusiveDeals, 
  romanticData,
  honeymoonDestinations,
  IndianDestinations, 
  InternationalDestinations,
  assets,
  testimonials 
} from '../data'; 
import Footer from '../components/layout/Footer/Footer';
import TripCard from '../components/common/Cards/TripCard/TripCard'; 

// --- HYBRID DATA UTILS ---

const getAllStaticPackages = () => [
  ...(honeymoonPackages || []),
  ...(indiaData || []),
  ...(internationalData || []),
  ...(exhilaratingDeals || []), 
  ...(exclusiveDeals || []),
  ...(romanticData || []),
  ...(honeymoonDestinations || []),
  ...(IndianDestinations || []),
  ...(InternationalDestinations || [])
];

const findStaticPackage = (id) => {
  const allPackages = getAllStaticPackages();
  if (!id) return null;

  let found = allPackages.find(p => p.id == id);
  if (!found) {
    const searchSlug = id.toLowerCase();
    found = allPackages.find(p => {
        const titleStr = p.title || p.alt || ""; 
        const pSlug = titleStr.toLowerCase().replace(/\s+/g, '-');
        return pSlug === searchSlug;
    });
  }
  return found;
};

// --- DATA NORMALIZATION ---
const normalizeData = (data) => {
  if (!data) return null;

  const displayTitle = data.title || data.alt || "Premium Destination Tour";
  const mainImg = data.img || data.image || data.front;
  const locationName = data.loc || data.location || displayTitle;

  const fallbackDesc = `Experience a meticulously planned journey to ${locationName} that blends cultural immersion, thrilling adventures, and serene relaxation. Our itineraries are crafted by travel experts to ensure you capture the true essence of the destination without any hassle, offering premium stays and seamless transport.`;
  
  const fallbackItinerary = [
    { day: 1, title: "Arrival and Check-in", desc: "Arrive at the destination airport or station where our representative will greet you. Transfer to your pre-booked premium hotel and spend the evening at your leisure." },
    { day: 2, title: "Sightseeing and Exploration", desc: "After a complimentary breakfast, embark on a guided tour of the city's most iconic landmarks, historical sites, and vibrant local markets." },
    { day: 3, title: "Adventure and Local Experiences", desc: "Engage in thrilling local activities or opt for a nature excursion. Experience the authentic culture and taste traditional cuisines." },
    { day: 4, title: "Leisure and Shopping", desc: "Enjoy a relaxed morning. Spend the afternoon shopping for souvenirs or exploring hidden gems at your own pace." },
    { day: 5, title: "Departure", desc: "Check out from the hotel and proceed to the airport or station for your onward journey, carrying unforgettable memories." },
  ];

  const fallbackInclusions = ["Premium Hotel Accommodation", "Daily Buffet Breakfast", "Private AC Airport Transfers", "Professional Tour Guide", "All Monument Entry Fees"];
  const fallbackExclusions = ["International & Domestic Flights", "Personal Expenses & Tips", "Travel Insurance", "Meals not mentioned in itinerary"];

  return {
    id: data._id || data.id,
    title: displayTitle,
    gallery: (data.gallery && data.gallery.length > 0) ? data.gallery : [mainImg, mainImg, mainImg, mainImg].filter(Boolean), 
    description: data.description || fallbackDesc,
    price: data.price || "Contact for Pricing",
    duration: data.days || data.duration || "5 Days / 4 Nights",
    location: locationName,
    inclusions: (data.inclusions && data.inclusions.length > 0) ? data.inclusions : fallbackInclusions,
    exclusions: (data.exclusions && data.exclusions.length > 0) ? data.exclusions : fallbackExclusions,
    itinerary: (data.itinerary && data.itinerary.length > 0) ? data.itinerary : fallbackItinerary,
    policies: [
        { title: "Cancellation Policy", rules: ["100% Refund if cancelled 30 days prior to departure.", "50% Refund if cancelled 15 days prior to departure.", "No refund for cancellations within 7 days of trip."] },
        { title: "Booking & Payment Terms", rules: ["50% Advance payment required to confirm booking.", "Remaining balance must be cleared 7 days before the trip starts."] }
    ]
  };
};

const getSimilarPackages = (currentPkg) => {
  if (!currentPkg) return [];
  const all = getAllStaticPackages();
  const pid = currentPkg.id ? currentPkg.id.toString() : "";
  const locRaw = currentPkg.location || currentPkg.title || "";
  const loc = locRaw.split(',')[0].trim().toLowerCase();
  
  const sourceArray = all.filter(p => {
      if(p.id == pid) return false; 
      const pName = p.location || p.loc || p.title || p.alt || "";
      const pLoc = pName.split(',')[0].trim().toLowerCase();
      if (!pLoc || pLoc.length < 3) return false; 
      return pLoc.includes(loc) || loc.includes(pLoc);
  });

  return sourceArray.slice(0, 3).map(item => ({
      ...item,
      id: item.id,
      image: item.image || item.img || item.front, 
      title: item.title || item.alt,               
      price: item.price || "View Details",         
      location: item.location || item.loc || item.alt
  }));
};

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [similarTrips, setSimilarTrips] = useState([]);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [openDay, setOpenDay] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  // Booking Form State
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState(null);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchTripData = async () => {
      setLoading(true);
      
      let data = findStaticPackage(id);
      
      if (data) {
        const normalized = normalizeData(data);
        setPackageData(normalized);
        setSimilarTrips(getSimilarPackages(normalized));
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5001/api/packages/${id}`);
        const normalized = normalizeData(res.data);
        setPackageData(normalized);
        setSimilarTrips(getSimilarPackages(normalized));
      } catch (err) {
        console.error("Package not found", err);
        setPackageData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTripData();
  }, [id]);

  const handleBooking = () => {
    // Form Validation Logic
    if (!travelDate) {
      setFormError('date');
      return;
    }
    if (!travelers) {
      setFormError('travelers');
      return;
    }

    // If validation passes, clear errors and proceed
    setFormError('');
    alert("Payment Gateway Integration Coming Soon!");
  };

  // --- Dynamic Pricing Logic ---
  // Extract numeric value from strings like "Starts Rs. 18,999"
  const numericPrice = packageData ? Number(packageData.price.toString().replace(/[^0-9]/g, '')) : 0;
  // If '3+', treat as 3 for calculation. If null, treat as 1 (base price).
  const multiplier = travelers === '3+' ? 3 : (travelers || 1);
  // Calculate display string
  const displayPrice = numericPrice > 0 
    ? `₹${(numericPrice * multiplier).toLocaleString('en-IN')}` 
    : packageData?.price;

  // --- Date Validation Logic ---
  // Get today's date in YYYY-MM-DD format
  const todayDate = new Date().toISOString().split('T')[0];

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#f68a95] border-opacity-75 mb-4"></div>
      <p className="text-gray-500 font-medium tracking-wide animate-pulse">Curating your experience...</p>
    </div>
  );

  if (!packageData) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-center px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Trip Not Found</h2>
      <p className="text-gray-500 mb-6">The package you are looking for might have been removed or updated.</p>
      <Link to="/" className="bg-[#f68a95] text-white px-6 py-2 rounded-xl font-bold">Back to Home</Link>
    </div>
  );

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800 pb-20 md:pb-0">
      
      <style>{`
        ::-webkit-scrollbar { height: 4px; width: 4px; }
        ::-webkit-scrollbar-track { background: #fff0f3; }
        ::-webkit-scrollbar-thumb { background: #f68a95; border-radius: 4px; }
        * { scrollbar-width: thin; scrollbar-color: #f68a95 #fff0f3; }
      `}</style>

      {/* --- HEADER --- */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-md py-2' : 'py-4'} bg-[#f68a95]`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="hover:opacity-90 transition-opacity">
             <img src={assets.logo} alt="Destiny" className="h-8 md:h-10 w-auto brightness-0 invert" />
          </Link>
        </div>
      </header>

      {/* --- BREADCRUMBS --- */}
      <div className="pt-24 pb-4 container mx-auto px-4 text-xs md:text-sm text-gray-500 flex items-center gap-2">
         <Link to="/" className="hover:text-[#f68a95] transition-colors">Home</Link> 
         <ChevronDown className="rotate-[-90deg]" size={12}/>
         <span className="capitalize text-gray-800 font-bold truncate max-w-[200px]">{packageData.title}</span>
      </div>

      {/* --- HERO GALLERY --- */}
      <div className="container mx-auto px-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative">
           <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer h-full">
              <img src={packageData.gallery[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
           </div>
           {packageData.gallery[1] && (
            <div className="hidden md:block relative group cursor-pointer h-full">
                <img src={packageData.gallery[1]} alt="Side 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
           )}
           {packageData.gallery[2] && (
            <div className="hidden md:block relative group cursor-pointer h-full">
                <img src={packageData.gallery[2]} alt="Side 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
           )}
           {packageData.gallery[3] && (
            <div className="hidden md:block relative group cursor-pointer h-full">
                <img src={packageData.gallery[3]} alt="Side 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
           )}
           <div className="hidden md:block relative group cursor-pointer h-full">
              <img src={packageData.gallery[0]} alt="Side 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2">
          {/* Title & Stats */}
          <div className="mb-8 border-b border-gray-100 pb-8">
             <div className="flex flex-wrap gap-2 mb-3">
               <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold border border-orange-100">Bestseller</span>
               <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">Customizable</span>
             </div>
             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-tangerine-custom leading-tight">{packageData.title}</h1>
             <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 font-medium">
                <span className="flex items-center gap-2"><MapPin size={18} className="text-[#f68a95]"/> {packageData.location}</span>
                <span className="flex items-center gap-2"><Clock size={18} className="text-[#f68a95]"/> {packageData.duration}</span>
             </div>
          </div>

          {/* About */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Experience the Journey</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{packageData.description}</p>
          </div>

          {/* Sticky Tabs */}
          <div className="sticky top-16 md:top-20 z-40 bg-white py-2 mb-6 border-b border-gray-100">
             <div className="flex gap-6 md:gap-10 overflow-x-auto pb-2">
                {['itinerary', 'inclusions', 'policies', 'reviews'].map(tab => (
                   <button 
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`pb-2 text-sm font-bold uppercase tracking-wider transition-all border-b-2 shrink-0 ${activeTab === tab ? 'border-[#f68a95] text-[#f68a95]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                   >
                     {tab}
                   </button>
                ))}
             </div>
          </div>

          {/* TAB CONTENT */}
          {activeTab === 'itinerary' && (
            <div className="mb-12">
               {packageData.itinerary.map((item, idx) => (
                 <div key={idx} className="flex gap-4 md:gap-6 mb-8 group relative">
                    <div className="flex flex-col items-center">
                       <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#f68a95] to-[#e75480] text-white flex items-center justify-center font-bold text-sm md:text-base shrink-0 shadow-lg z-10 ring-4 ring-white">
                          {item.day}
                       </div>
                       {idx !== packageData.itinerary.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-100 absolute top-10 left-4 md:left-5 -z-0"></div>
                       )}
                    </div>
                    <div className="flex-1 pt-1 pb-4 cursor-pointer bg-gray-50 rounded-2xl p-5 hover:bg-white hover:shadow-md transition-all border border-gray-100/50" onClick={() => setOpenDay(openDay === idx ? -1 : idx)}>
                       <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                          <div className={`transform transition-transform duration-300 ${openDay === idx ? 'rotate-180' : ''}`}>
                             <ChevronDown size={20} className="text-gray-400"/>
                          </div>
                       </div>
                       <div className={`overflow-hidden transition-all duration-300 ${openDay === idx ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                          <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.desc}</p>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          )}
          
          {activeTab === 'inclusions' && (
             <div className="grid md:grid-cols-2 gap-6 mb-12 animate-fadeIn">
                <div className="bg-green-50/30 p-6 rounded-2xl border border-green-100/50">
                   <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2"><CheckCircle size={20}/> Included</h3>
                   <ul className="space-y-3">
                      {packageData.inclusions.map((inc, i) => (
                         <li key={i} className="flex gap-3 text-gray-700 text-sm">
                            <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> {inc}
                         </li>
                      ))}
                   </ul>
                </div>
                <div className="bg-red-50/30 p-6 rounded-2xl border border-red-100/50">
                   <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2"><XCircle size={20}/> Not Included</h3>
                   <ul className="space-y-3">
                      {packageData.exclusions.map((exc, i) => (
                         <li key={i} className="flex gap-3 text-gray-600 text-sm">
                            <XCircle size={16} className="text-red-400 shrink-0 mt-0.5"/> {exc}
                         </li>
                      ))}
                   </ul>
                </div>
             </div>
          )}
          
          {activeTab === 'policies' && (
             <div className="space-y-4 mb-12 animate-fadeIn">
                {packageData.policies.map((pol, i) => (
                   <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3">{pol.title}</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
                         {pol.rules.map((rule, r) => <li key={r}>{rule}</li>)}
                      </ul>
                   </div>
                ))}
             </div>
          )}

          {activeTab === 'reviews' && (
            <div className="mb-12 animate-fadeIn">
               <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
                   <h3 className="text-2xl font-bold text-gray-900 mb-1">Traveler Experiences</h3>
                   <p className="text-sm text-gray-500">Read what our clients have to say about their journey with Destiny.</p>
               </div>
               <div className="space-y-6">
                  {testimonials.slice(0, 3).map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                       <div className="flex items-center gap-3 mb-3">
                          <img src={review.img} alt={review.name} className="w-10 h-10 rounded-full object-cover"/>
                          <div>
                             <p className="font-bold text-sm text-gray-900">{review.name}</p>
                             <p className="text-xs text-gray-500">{review.date}</p>
                          </div>
                       </div>
                       <p className="text-gray-600 text-sm italic">"{review.text}"</p>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR (Desktop) */}
        <div className="hidden lg:block lg:col-span-1">
           <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden">
                 <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total Price</p>
                    <div className="flex items-end gap-2">
                       <span className="text-3xl font-bold text-gray-900">{displayPrice}</span>
                    </div>
                    <div className="mt-2 text-green-600 text-xs font-bold flex items-center gap-1">
                       <CheckCircle size={12}/> Inclusive of all taxes
                    </div>
                 </div>

                 <div className="p-6 space-y-5">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-500 uppercase">
                          Travel Date <span className="text-red-500">*</span>
                       </label>
                       <input 
                          type="date" 
                          min={todayDate}
                          value={travelDate}
                          onChange={(e) => {
                             setTravelDate(e.target.value);
                             if(formError === 'date') setFormError('');
                          }}
                          className={`w-full bg-gray-50 border rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f68a95] transition-all ${formError === 'date' ? 'border-red-500' : 'border-gray-200'}`} 
                       />
                       {formError === 'date' && <p className="text-xs text-red-500 mt-1">Please select a future travel date.</p>}
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-500 uppercase">
                          Travelers <span className="text-red-500">*</span>
                       </label>
                       <div className="grid grid-cols-3 gap-2">
                          {[1, 2, '3+'].map(num => (
                             <button 
                                key={num} 
                                onClick={() => {
                                   setTravelers(num);
                                   if(formError === 'travelers') setFormError('');
                                }}
                                className={`py-2 border rounded-lg text-sm font-bold transition-all ${
                                   travelers === num 
                                      ? 'bg-gray-900 border-gray-900 text-white' 
                                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-900 hover:text-black'
                                } ${formError === 'travelers' && travelers === null ? 'border-red-500' : ''}`}
                             >
                                {num}
                             </button>
                          ))}
                       </div>
                       {formError === 'travelers' && <p className="text-xs text-red-500 mt-1">Please select the number of travelers.</p>}
                    </div>

                    <button 
                        onClick={handleBooking}
                        className="w-full bg-gradient-to-r from-[#f68a95] to-[#e75480] hover:from-[#e75480] hover:to-[#d64370] text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-200 transition-all transform hover:-translate-y-0.5 mt-2"
                    >
                       Book Now
                    </button>
                 </div>
                 
                 <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                    <p className="text-xs text-gray-500 flex justify-center items-center gap-2">
                       <ShieldCheck size={14}/> 100% Safe & Secure
                    </p>
                 </div>
              </div>
              
              <div className="mt-6 flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                 <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                    <Phone size={20}/>
                 </div>
                 <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Need Help?</p>
                    <p className="text-sm font-bold text-gray-900">+91 98765 43210</p>
                 </div>
              </div>
           </div>
        </div>

      </div>

      {/* --- SIMILAR TRIPS SECTION --- */}
      {similarTrips.length > 0 && (
          <div className="container mx-auto px-4 py-12 border-t border-gray-100 mt-8">
             <h2 className="text-2xl md:text-3xl font-bold mb-8 font-tangerine-custom text-gray-800">You Might Also Like</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {similarTrips.map((trip) => (
                   <div key={trip.id} className="h-[420px]">
                      <TripCard slide={trip} />
                   </div>
                ))}
             </div>
          </div>
      )}

      {/* --- MOBILE STICKY ACTION BAR --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 lg:hidden z-50 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
         <div>
            <p className="text-xs text-gray-500 uppercase font-bold">Total Price</p>
            <p className="text-xl font-bold text-gray-900">{displayPrice}</p>
         </div>
         <button 
            onClick={handleBooking}
            className="bg-[#f68a95] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-pink-200"
         >
            Book Now
         </button>
      </div>

      <Footer />
    </div>
  );
};

export default TripDetails;