// ✅ HELPER FUNCTION: Maps Database Objects to UI Structure
// Must be exported first to avoid reference errors
export const mapDbToData = (dbItems) => {
  if (!Array.isArray(dbItems)) return [];
  return dbItems.map(item => ({
    id: item._id,
    title: item.title,
    price: item.price,
    image: item.image,
    // Flipcard mapping
    front: item.image,
    back: item.backImage || item.image,
    alt: item.title,
    // TripCard mapping
    days: item.duration,
    loc: item.location,
    isFeatured: item.isFeatured
  }));
};

import { Instagram, Github, Youtube, Linkedin, User, Mail, Phone, MessageSquare } from 'lucide-react';

// Images
import slider1 from './assets/images/Exhilerating/slider_1.jpg';
import slider2 from './assets/images/Exhilerating/slider_2.jpg';
import slider3 from './assets/images/Exhilerating/slider_3.jpg';
import slider4 from './assets/images/Exhilerating/slider_4.jpg';
import slider5 from './assets/images/Exhilerating/slider_5.jpg';
import slider6 from './assets/images/Exhilerating/slider_6.jpg';
import slider7 from './assets/images/Exhilerating/slider_7.jpg';
import slider8 from './assets/images/Exhilerating/slider_8.jpg';

// Banners & Backgrounds
import upcomingBanner from './assets/banner/upcoming_trips.webp';
import connectBanner from './assets/banner/connect.webp';

// Trip Images
import europe from './assets/images/International/europe.webp';
import bali from './assets/images/International/bali.webp';
import vietnam from './assets/images/International/vietnam.webp';
import dubai from './assets/images/International/dubai.webp';
import spain from './assets/images/International/Spain.webp';
import singapore from './assets/images/International/singapore.webp';
import georgia from './assets/images/International/georiga.webp';
import kazakashtan from './assets/images/International/Kazakashtan.webp';

// India Images
import himachal from './assets/images/Indian/himachal.webp';
import kashmir from './assets/images/Indian/kashmir.webp';
import kerala from './assets/images/Indian/kerala.webp';
import ladakh from './assets/images/Indian/ladakh.webp';
import meghalaya from './assets/images/Indian/meghalaya.webp';
import rajasthan from './assets/images/Indian/rajasthan.webp';
import uttarakhand from './assets/images/Indian/uttarakhand.webp';
import spiti from './assets/images/Indian/spiti.webp';

//Indian card
import himachal_card from './assets/images/Indian/himachal_card.webp';
import kashmir_card from './assets/images/Indian/kashmir_card.webp';
import ladakh_card from './assets/images/Indian/ladakh_card.webp';  
import meghalaya_card from './assets/images/Indian/meghalya_card.webp';
import rajasthan_card from './assets/images/Indian/rajasthan_card.webp';
import uttarakhand_card from './assets/images/Indian/uttarakhand_card.webp';
import spiti_card from './assets/images/Indian/spiti_card.webp';
import kerala_card from './assets/images/Indian/kerala_card.webp';

//International card
import europe_card from './assets/images/International/europe_card.webp';
import bali_card from './assets/images/International/bali_card.webp';
import vietnam_card from './assets/images/International/vietnam_card.webp';
import dubai_card from './assets/images/International/dubai.webp';
import spain_card from './assets/images/International/Spain_card.webp';
import singapore_card from './assets/images/International/singapore_card.webp';
import georgia_card from './assets/images/International/Georgia-card.webp';
import kazakashtan_card from './assets/images/International/Kazakhstan_card.webp';

// Romantic/Honeymoon Specific Images
import rom_card_1 from './assets/images/romantic/card_1.webp';
import rom_card_2 from './assets/images/romantic/card_2.webp';
import rom_card_3 from './assets/images/romantic/card_3.webp';
import rom_card_4 from './assets/images/romantic/card_4.webp';
import rom_card_5 from './assets/images/romantic/card_5.webp';
import rom_card_6 from './assets/images/romantic/card_6.webp';
import rom_card_7 from './assets/images/romantic/card_7.webp';
import rom_card_8 from './assets/images/romantic/card_8.webp';
import rom_card_9 from './assets/images/romantic/card_9.webp';
import rom_card_10 from './assets/images/romantic/card_10.webp';
import rom_andaman from './assets/images/romantic/andaman_card.webp';
import rom_thailand from './assets/images/romantic/thailand_card.webp';
import rom_cover from './assets/banner/honeymoon-cover.webp';
import rom_banner from './assets/banner/honeymoon-banner.svg';
import faq from './assets/banner/faq.png';

// Feature Cards
import card1 from './assets/images/card/card1.svg';
import card2 from './assets/images/card/card.svg';
import card3 from './assets/images/card/card3.svg';
import card4 from './assets/images/card/card4.svg';

// testimonials
import traveller1 from './assets/images/travellers/anchal.jpg';
import traveller2 from './assets/images/travellers/manash.jpg';
import traveller3 from './assets/images/travellers/sakshi.png';
import traveller4 from './assets/images/travellers/omkar.jpg';
// Logo
import logoImg from '/logo.png';

//About
// About Page Images
import aboutBg from './assets/images/about/about-us.webp';
import aboutCenter from './assets/images/about/about3.png';

// Additional Team Images
import teamRavi from './assets/images/travellers/sakshi.png';
import teamNancy from './assets/images/about/nancy.webp';
import teamGaurav from './assets/images/about/tekri.webp';
import teamVarsha from './assets/images/about/varsha.webp';
import teamMadhuri from './assets/images/about/madhuri.webp';

// Warriors Images
import warriorCaptain from './assets/images/about/download-person.png';
import warriorVendor from './assets/images/about/download-hands.png';
import warriorTransport from './assets/images/about/transport.svg';

// Brand Images
import brandTvs from './assets/images/about/tvs.webp';
import brandConcentrix from './assets/images/about/concentrix.svg';
import brandSpring from './assets/images/about/springworks.webp';
import brandPaytm from './assets/images/about/paytm.svg';
import brandHighLevel from './assets/images/about/highlevellogo.webp';
import brandBiconomy from './assets/images/about/biconomylogo.webp';
import brandBlueTokai from './assets/images/about/bluetokailogo.webp';

export const assets = {
    upcomingBanner,
    connectBanner,
    logo: logoImg
};

// ✅ UNIQUE IDS FOR DEALS
export const dealsData = [
    { id: "deal-ladakh", title: "Ladakh Bike Expedition", price: "Starts Rs. 18,999", image: slider1 },
    { id: "deal-manali", title: "Manali Fixed Departure", price: "Starts Rs. 8,999", image: slider2 },
    { id: "deal-rishikesh", title: "Rishikesh Rafting & Camp", price: "Starts Rs. 3,500", image: slider3 },
    { id: "deal-paragliding", title: "Bir Billing Paragliding", price: "Starts Rs. 6,500", image: slider4 },
    { id: "deal-spiti", title: "Spiti Valley Winter Safari", price: "Starts Rs. 22,999", image: slider5 },
    { id: "deal-kerala", title: "Kerala Backwaters Escape", price: "Starts Rs. 14,999", image: slider6},
    { id: "deal-andaman", title: "Andaman Scuba Special", price: "Starts Rs. 25,999", image: slider7 },
    { id: "deal-goa", title: "Goa Weekend Getaway", price: "Starts Rs. 5,999", image: slider8 },
];

// ✅ UNIQUE IDS FOR INTERNATIONAL
export const internationalData = [
    { id: "intl-europe", title: "Europe", price: "Starts Rs. 1,49,000/-", image: europe },
    { id: "intl-bali", title: "Bali", price: "Starts Rs. 49,999/-", image: bali },
    { id: "intl-vietnam", title: "Vietnam", price: "Starts Rs. 59,999/-", image: vietnam },
    { id: "intl-dubai", title: "Dubai", price: "Starts Rs. 29,999/-", image: dubai },
    { id: "intl-spain", title: "Spain", price: "Starts Rs. 44,999/-", image: spain },
    { id: "intl-singapore", title: "Singapore", price: "Starts Rs. 1,49,000/-", image: singapore },
    { id: "intl-georgia", title: "Georgia", price: "Starts Rs. 39,999/-", image: georgia },
    { id: "intl-kazakhstan", title: "Kazakhstan", price: "Starts Rs. 34,999/-", image: kazakashtan },
];

// ✅ UNIQUE IDS FOR INDIA
export const indiaData = [
    { id: "india-himachal", title: "Himachal", price: "Starts Rs. 6,999/-", image: himachal }, 
    { id: "india-kashmir", title: "Kashmir", price: "Starts Rs. 12,999/-", image: kashmir }, 
    { id: "india-kerala", title: "Kerala", price: "Starts Rs. 14,999/-", image: kerala }, 
    { id: "india-ladakh", title: "Ladakh", price: "Starts Rs. 18,999/-", image: ladakh }, 
    { id: "india-meghalaya", title: "Meghalaya", price: "Starts Rs. 9,999/-", image: meghalaya }, 
    { id: "india-rajasthan", title: "Rajasthan", price: "Starts Rs. 11,999/-", image: rajasthan },
    { id: "india-uttarakhand", title: "Uttarakhand", price: "Starts Rs. 19,999/-", image: uttarakhand },
];

export const romanticData = [
    { id: "rom-bali", title: "Bali", price: "Starts Rs. 49,999/-", image: bali },
    { id: "rom-singapore", title: "Singapore", price: "Starts Rs. 58,999/-", image: singapore },
    { id: "rom-kashmir", title: "Kashmir", price: "Starts Rs. 15,999/-", image: kashmir },
    { id: "rom-kerala", title: "Kerala", price: "Starts Rs. 19,999/-", image: kerala },
    { id: "rom-uttarakhand", title: "Uttarakhand", price: "Starts Rs. 19,999/-", image: uttarakhand },
    { id: "rom-spiti", title: "Spiti Valley", price: "Starts Rs. 22,999/-", image: spiti },
];

export const featuresData = [
    { img: card1, title: "No Third Party Mess", desc: "100% in-house operations! No third parties involved." },
    { img: card2, title: "Security", desc: "Real time monitoring of all trips by ground team!" },
    { img: card3, title: "Co-Travelers Filtering", desc: "Multi-step filtering to bring only like-minded people together!" },
    { img: card4, title: "Seamless Use", desc: "Comfortable stays, trained drivers, and hospitable staff!" }
];

// ✅ MATCHING IDS FOR FLIP CARDS (INDIA)
export const IndianDestinations = [
  { id: "india-kerala", front: kerala_card, back: kerala, alt: "Kerala", title: "Kerala", price: "Starts Rs. 14,999/-", days: "5 Days", loc: "Kerala, India" },
  { id: "india-himachal", front: himachal_card, back: himachal, alt: "Himachal", title: "Himachal", price: "Starts Rs. 6,999/-", days: "5 Days", loc: "Himachal, India" },
  { id: "india-rajasthan", front: rajasthan_card, back: rajasthan, alt: "Rajasthan", title: "Rajasthan", price: "Starts Rs. 11,999/-", days: "6 Days", loc: "Rajasthan, India" },
  { id: "india-ladakh", front: ladakh_card, back: ladakh, alt: "Ladakh", title: "Ladakh", price: "Starts Rs. 18,999/-", days: "7 Days", loc: "Ladakh, India" },
  { id: "india-uttarakhand", front: uttarakhand_card, back: uttarakhand, alt: "Uttarakhand", title: "Uttarakhand", price: "Starts Rs. 19,999/-", days: "5 Days", loc: "Uttarakhand, India" },
  { id: "india-spiti", front: spiti_card, back: spiti, alt: "Spiti", title: "Spiti Valley", price: "Starts Rs. 22,999/-", days: "8 Days", loc: "Spiti, India" },
  { id: "india-meghalaya", front: meghalaya_card, back: meghalaya, alt: "Meghalaya", title: "Meghalaya", price: "Starts Rs. 9,999/-", days: "6 Days", loc: "Meghalaya, India" },
  { id: "india-kashmir", front: kashmir_card, back: kashmir, alt: "Kashmir", title: "Kashmir", price: "Starts Rs. 12,999/-", days: "5 Days", loc: "Kashmir, India" },
];

// ✅ MATCHING IDS FOR FLIP CARDS (INTERNATIONAL)
export const InternationalDestinations = [
  { id: "intl-europe", front: europe_card, back: europe, alt: "Europe", title: "Europe", price: "Starts Rs. 1,49,000/-", days: "10 Days", loc: "Europe" },
  { id: "intl-bali", front: bali_card, back: bali, alt: "Bali", title: "Bali", price: "Starts Rs. 49,999/-", days: "6 Days", loc: "Indonesia" },
  { id: "intl-spain", front: spain_card, back: spain, alt: "Spain", title: "Spain", price: "Starts Rs. 44,999/-", days: "7 Days", loc: "Spain" },
  { id: "intl-kazakhstan", front: kazakashtan_card, back: kazakashtan, alt: "Kazakhstan", title: "Kazakhstan", price: "Starts Rs. 34,999/-", days: "5 Days", loc: "Kazakhstan" },
  { id: "intl-dubai", front: dubai_card, back: dubai, alt: "Dubai", title: "Dubai", price: "Starts Rs. 29,999/-", days: "5 Days", loc: "UAE" },
  { id: "intl-singapore", front: singapore_card, back: singapore, alt: "Singapore", title: "Singapore", price: "Starts Rs. 1,49,000/-", days: "5 Days", loc: "Singapore" },
  { id: "intl-georgia", front: georgia_card, back: georgia, alt: "Georgia", title: "Georgia", price: "Starts Rs. 39,999/-", days: "6 Days", loc: "Georgia" },
  { id: "intl-vietnam", front: vietnam_card, back: vietnam, alt: "Vietnam", title: "Vietnam", price: "Starts Rs. 59,999/-", days: "6 Days", loc: "Vietnam" },
];

// ✅ UNIQUE IDS FOR HONEYMOON PACKAGES
export const honeymoonPackages = [
    { id: "honey-bali", img: rom_card_1, title: 'Dreamy Honeymoon Tour Package to Bali', days: '5 Days', loc: 'Bali, Indonesia' },
    { id: "honey-vietnam", img: rom_card_2, title: '7 Days Exotic Vietnam Tour Package For Couple', days: '6 Days', loc: 'Vietnam, Asia' },
    { id: "honey-maldives", img: rom_card_3, title: 'Exotic Maldives Honeymoon at Olu Xperience', days: '5 Days', loc: 'Maldives, South Asia' },
    { id: "honey-singapore", img: rom_card_4, title: 'Celebrate Love - Singapore Honeymoon Package', days: '5 Days', loc: 'Singapore, Asia' },
    { id: "honey-thailand", img: rom_card_5, title: 'Exotic Thailand Tour Package - Couple Retreat', days: '5 Days', loc: 'Thailand, Asia' },
    { id: "honey-kashmir-3", img: rom_card_6, title: 'Romantic Escapade to the 3 Jewels of Kashmir', days: '5 Days', loc: 'Kashmir, India' },
    { id: "honey-kerala", img: rom_card_7, title: "Honeymoon Tour to God's Own Country Kerala", days: '5 Days', loc: 'Kerala, India' },
    { id: "honey-andaman", img: rom_card_8, title: '6 Days Honeymoon Special Andaman Escapade', days: '5 Days', loc: 'Andaman, India' },
    { id: "honey-kashmir-couple", img: rom_card_9, title: 'Enchanting Kashmir - Couple Special Tour', days: '5 Days', loc: 'Kashmir, India' },
    { id: "honey-singapore-bintan", img: rom_card_10, title: 'Singapore with Bintan Island - Honeymoon Special', days: '5 Days', loc: 'Singapore, Asia' },
];

// ✅ UNIQUE IDS FOR HONEYMOON DESTINATIONS
export const honeymoonDestinations = [
    { id: "dest-himachal", img: himachal_card, alt: 'Himachal' },
    { id: "dest-kerala", img: kerala_card, alt: 'Kerala' },
    { id: "dest-andaman", img: rom_andaman, alt: 'Andaman' },
    { id: "dest-thailand", img: rom_thailand, alt: 'Thailand' },
    { id: "dest-europe", img: europe_card, alt: 'Europe' },
    { id: "dest-kashmir", img: kashmir_card, alt: 'Kashmir' },
    { id: "dest-bali", img: bali_card, alt: 'Bali' },
    { id: "dest-vietnam", img: vietnam_card, alt: 'Vietnam' }
];

export const honeymoonFaqs = [
    { q: "Which is the best honeymoon packages in India?", a: "The best honeymoon packages in India include a romantic escapade to Kashmir, a honeymoon tour to God’s own Country, Kerala, and a fabulous honeymoon on the island of Andaman." },
    { q: "How to book a honeymoon package?", a: "You can visit our official website, choose the destination of your choice, and book your dream honeymoon package. Whether it's domestic or international, we have got you covered." },
    { q: "Which is the best site to book honeymoon packages?", a: "The best honeymoon packages can be booked through Destiny’s official website, where you can choose from a plethora of destinations." },
    { q: "Can honeymoon packages be customised?", a: "Yes, you can choose the destination of your choice and get it customised according to your preferences." },
    { q: "When is the best time to book a honeymoon package?", a: "The best time to book is when there are offers and discounts available to save costs for experiences." },
];

export const honeymoonAssets = {
    cover: rom_cover,
    banner: rom_banner,
    faq: faq
};

export const faqs = [
  { q: "What is the best package in India?", a: "The best package in India varies from destination to destination. Some of the best packages offered by Destiny include Ladakh, Kashmir, Spiti Valley, Sikkim, Andaman, Kerala." },
  { q: "What are the best ways to travel within India?", a: "The best ways to travel within India include travel via flights, trains and by roads. India is well connected by all these modes of transports." },
  { q: "What is the best time to visit India?", a: "The best time to visit India varies depending upon location. For Ladakh and Spiti, travel during summer. For Kerala and Andaman, winter is best." },
  { q: "Do I need to hire tour guides for my trip to India?", a: "It is generally recommended to hire tour guides as they have complete knowledge about routes and food, easing your journey." },
  { q: "Which are the best places to travel for 4-5 days in India?", a: "Ladakh, Rajasthan, Kerala, Golden Triangle (Delhi-Agra-Jaipur), Sikkim, and parts of Himachal Pradesh." }
];

export const testimonials = [
  { id: 1, name: "Archana Awati", date: "30 Apr 2024", img: traveller1, text: "In Ladakh, find the perfect blend of culture, adventure, and serenity. December last year I decided that my next trip would be Ladakh...", link: "https://www.google.com/maps/reviews/@28.4994494,77.0749511,17z/data=!3m1!4b1!4m6!14m5!1m4!2m3!1sChdDSUhNMG9nS0VJQ0FnSURSMnJhNjlBRRAB!2m1!1s0x0:0x56b3e3ef002edbc2?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDYxNy4wIKXMDSoASAFQAw%3D%3D" },
  { id: 2, name: "Sonal Shekhar Das", date: "9 May 2024", img: traveller2, text: "I did my first solo trip in India with Destiny. Initially I was sceptical about their Meghalaya-Kaziranga trip...", link: "https://www.google.com/maps/reviews/@28.4994494,77.0749511,17z/data=!3m1!4b1!4m6!14m5!1m4!2m3!1sChZDSUhNMG9nS0VJQ0FnSURSOTV5M1l3EAE!2m1!1s0x0:0x56b3e3ef002edbc2?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDYxNy4wIKXMDSoASAFQAw%3D%3D" },
  { id: 3, name: "Shrutika Parab", date: "24 May 2024", img: traveller3, text: "Thank you Team Destiny for the amazing Ladakh Experience. Right from the point of making the bookings...", link: "https://www.google.com/maps/reviews/@28.4994494,77.0749511,17z/data=!3m1!4b1!4m6!14m5!1m4!2m3!1sChZDSUhNMG9nS0VJQ0FnSUN4dlpfT1JnEAE!2m1!1s0x0:0x56b3e3ef002edbc2?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDYxNy4wIKXMDSoASAFQAw%3D%3D" },
  { id: 4, name: "Kartik Dilawari", date: "30 Apr 2024", img: traveller4, text: "After an amazing trip to Tirthan with Destiny, I decided to go to Manali-Jispa with them...", link: "https://www.google.com/maps/contrib/116933324535405941392/place/ChIJ39f0keLjDDkRwtsuAO_js1Y/@25.5375281,69.207753,5z/data=!4m6!1m5!8m4!1e1!2s116933324535405941392!3m1!1e1?entry=ttu&g_ep=EgoyMDI1MDYxNy4wIKXMDSoASAFQAw%3D%3D" }
];

// ✅ UPDATED: Quick Links now point to actual main pages
export const footerLinks = {
  "International Trips": ["Europe", "Georgia", "Bali", "Vietnam", "Spain", "Singapore", "Dubai"],
  "India Trips": ["Himachal", "Kashmir", "Kerala", "Ladakh", "Meghalaya", "Rajasthan", "Uttarakhand", "Spiti Valley"],
  "Romantic & Special": ["Maldives", "Bali", "Vietnam", "Singapore", "Thailand", "Kerala", "Andaman", "Kashmir"], 
  "Quick Links": ["Home", "About Us", "India Trips", "International Trips", "Honeymoon Packages", "Contact Us"]
};

export const contactFields = [
  { id: "name", icon: User, type: "text", placeholder: "Enter your name", label: "Name:" },
  { id: "email", icon: Mail, type: "email", placeholder: "Enter your Email Id", label: "Email:" },
  { id: "phone", icon: Phone, type: "tel", placeholder: "Enter your 10 digit number", label: "Phone:" }
];

export const socialIcons = [
  { icon: Instagram, url: "https://www.instagram.com/mosa.mystrix/" },
  { icon: Github, url: "https://github.com/er-anchal" },
  { icon: Youtube, url: "https://www.youtube.com/@MOSA-mystrix" },
  { icon: Linkedin, url: "https://www.linkedin.com/in/anchal-vaishya-9b35ab368" }
];

export const navLinks = [
  { name: "Home", path: "/" },
  { name: "India Trips", path: "/india" },
  { name: "International", path: "/international" },
  { name: "Honeymoon", path: "/honeymoon" },
  { name: "About", path: "/about" }
];

export const aboutPageData = {
    hero: {
        bg: aboutBg,
        center: aboutCenter
    },
    socialIcons: {
        Linkedin: Linkedin,
        Instagram: Instagram
    },
    team: [
        {
            name: "Anchal Vaishya",
            role: "CEO, Founder",
            desc: "Anchal is a visionary travelpreneur with an experience of leading more than 200 community trips. She’s fond of all kinds of voyages, yet her favourite are motorbiking expeditions.",
            img: traveller1, 
            social: true
        },
        {
            name: "Manash Giri",
            role: "Head of Finance",
            desc: "Manash is a passionate learner, and an instinctive marketer. He has led more than 40 trips and has taken his hot wheels on a ride of total 50,000kms.",
            img: traveller2, 
            social: true
        },
        {
            name: "Omkar Vaidya",
            role: "Head of Operations",
            desc: "Omkar is a strong analyst of travel operations, and thus heads the responsibility of running the entire show. Just like Sindbad the Sailor, he finds out the most interesting experiences.",
            img: traveller4, 
            social: true
        },
        {
            name: "Sakshi Sawant",
            role: "Head of Technology",
            desc: "Sakshi is a multitasker, problem solver and trivia king! The go-to person for all our technical needs. On days she is not coding, she is seen traveling.",
            img: teamRavi,
            social: false
        },
        {
            name: "Nancy Sahota",
            role: "Head of Content",
            desc: "Nancy is the bridge between our E-audience and the company. With the goal to humanize the brand, she heads the content team of super artistic people.",
            img: teamNancy,
            social: false
        },
        {
            name: "Gaurav Singh",
            role: "Director of Community Experiences",
            desc: "With abundant experience of outdoor leading in over 50+ trips, Gaurav is the one who runs a one man show in managing the operations of all group departures!",
            img: teamGaurav,
            social: false
        },
        {
            name: "Varsha Shrivastava",
            role: "Director of Personalised Experiences",
            desc: "The woman behind the smoothest customised trips, she can arrange an effortless experience for you pretty much in any corner of the world!",
            img: teamVarsha,
            social: false
        },
        {
            name: "Madhuri Mulwani",
            role: "Vice President of Sales",
            desc: "Madhuri is our sales expert who nails the game of communication. She believes it is important to speak, but more important to listen.",
            img: teamMadhuri,
            social: false
        }
    ],
    warriors: [
        {
            role: "Trip Captain",
            desc: "Our trip captains are nothing short of heroes. Brave, dynamic, and great leaders, they’re certainly the showrunners of the community trips.",
            img: warriorCaptain
        },
        {
            role: "Local Vendors",
            desc: "Being the bridge between the local vendors and the customers, we’re very selective about the former. We’ve found the most kind and hospitable vendors.",
            img: warriorVendor
        },
        {
            role: "Transport Drivers",
            desc: "We understand the responsibility of taking utmost care of our travelers. All the drivers at Destiny are local professionals, who’ve been in practice since years.",
            img: warriorTransport
        }
    ],
    brands: [
        { name: "TVS", img: brandTvs },
        { name: "Concentrix", img: brandConcentrix },
        { name: "Springworks", img: brandSpring },
        { name: "Paytm", img: brandPaytm },
        { name: "HighLevel", img: brandHighLevel },
        { name: "Biconomy", img: brandBiconomy },
        { name: "Blue Tokai", img: brandBlueTokai },
    ]
};

export const exhilaratingDeals = dealsData;
export const exclusiveDeals = dealsData;