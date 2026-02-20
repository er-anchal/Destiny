import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Plus, Trash2, MapPin, Clock, Image as ImageIcon, IndianRupee, Upload, Star, Layout, FileText, List, CheckCircle, XCircle } from 'lucide-react';
import { validateText, validatePrice, validateUrl } from '../../components/sections/Auth/validation';

const InputGroup = ({ icon: Icon, error, ...props }) => (
  <div className="w-full flex flex-col gap-1">
    <div className="relative">
      <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${error ? 'text-red-500' : 'text-gray-400'}`}>
        <Icon size={18} />
      </div>
      <input 
        className={`w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl outline-none transition-all hover:bg-white text-gray-900 placeholder-gray-400 ${
          error ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-200 focus:ring-2 focus:ring-indigo-500'
        }`}
        {...props}
      />
    </div>
    {error && <p className="text-red-500 text-xs pl-1 m-0">{error}</p>}
  </div>
);

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ title: '', price: '', image: '', category: 'international', duration: '', location: '', description: '', isFeatured: false, backImage: '', inclusions: [], exclusions: [], itinerary: [] });
  const [tempInc, setTempInc] = useState('');
  const [tempExc, setTempExc] = useState('');
  const [tempDay, setTempDay] = useState({ day: 1, title: '', desc: '' });
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleUpload = (field) => {
    if (!window.cloudinary) return alert("Cloudinary script not found. Please add it to index.html");
    window.cloudinary.openUploadWidget(
      { cloudName: "dafdko2tk", uploadPreset: "fuemyauo", sources: ['local'], multiple: false, resourceType: "image", 
        clientAllowedFormats: ["png", "jpeg", "jpg", "webp"] },
      (error, result) => { if (!error && result && result.event === "success") handleInputChange(field, result.info.secure_url); }
    );
  };

  const fetchPackages = async () => {
    try { const { data } = await axios.get(`${API_URL}/api/packages`); setPackages(data); } 
    catch (err) { console.error(err); } finally { setLoading(false); }
  };
  useEffect(() => { fetchPackages(); }, []);

  const addInclusion = () => { if (tempInc.trim()) { setForm(prev => ({ ...prev, inclusions: [...prev.inclusions, tempInc] })); setTempInc(''); if(errors.inclusions) setErrors(prev => ({...prev, inclusions: ''})); } };
  const removeInclusion = (index) => setForm(prev => ({ ...prev, inclusions: prev.inclusions.filter((_, i) => i !== index) }));
  const addExclusion = () => { if (tempExc.trim()) { setForm(prev => ({ ...prev, exclusions: [...prev.exclusions, tempExc] })); setTempExc(''); if(errors.exclusions) setErrors(prev => ({...prev, exclusions: ''})); } };
  const removeExclusion = (index) => setForm(prev => ({ ...prev, exclusions: prev.exclusions.filter((_, i) => i !== index) }));
  const addItineraryDay = () => {
    if (tempDay.title && tempDay.desc) {
      setForm(prev => ({ ...prev, itinerary: [...prev.itinerary, { ...tempDay, day: prev.itinerary.length + 1 }] }));
      setTempDay({ day: form.itinerary.length + 2, title: '', desc: '' });
      if(errors.itinerary) setErrors(prev => ({...prev, itinerary: ''}));
    }
  };
  const removeItineraryDay = (index) => setForm(prev => ({ ...prev, itinerary: form.itinerary.filter((_, i) => i !== index).map((item, i) => ({ ...item, day: i + 1 })) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!validateText(form.title, 3)) newErrors.title = 'Title must be at least 3 characters.';
    if (!validatePrice(form.price)) newErrors.price = 'Price must be a valid number > 0.';
    if (!validateUrl(form.image)) newErrors.image = 'Upload an image.';
    if (!validateText(form.duration)) newErrors.duration = 'Duration required.';
    if (!validateText(form.location)) newErrors.location = 'Location required.';
    if (!validateText(form.description)) newErrors.description = 'Description required.';
    if (form.category.includes('flipcard') && !validateUrl(form.backImage)) newErrors.backImage = 'Back Image required for Flipcards.';
    if (form.inclusions.length === 0) newErrors.inclusions = 'Add at least one inclusion.';
    if (form.exclusions.length === 0) newErrors.exclusions = 'Add at least one exclusion.';
    if (form.itinerary.length === 0) newErrors.itinerary = 'Add at least one itinerary day.';
    if (tempDay.title.trim() || tempDay.desc.trim()) newErrors.itinerary = 'You have unsaved itinerary text. Click + to add it.';

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    try {
      await axios.post(`${API_URL}/api/packages`, { ...form, gallery: form.backImage ? [form.backImage] : [] }, { headers: { Authorization: `Bearer ${user.token}` } });
      fetchPackages();
      setForm({ title: '', price: '', image: '', category: 'international', duration: '', location: '', description: '', isFeatured: false, backImage: '', inclusions: [], exclusions: [], itinerary: [] });
      alert('✨ Item added successfully!');
    } catch (err) { alert('Error adding item'); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Delete this item?')) return;
    try { await axios.delete(`${API_URL}/api/packages/${id}`, { headers: { Authorization: `Bearer ${user.token}` } }); fetchPackages(); } 
    catch (err) { alert('Error deleting item'); }
  };

  return (
    <div className="space-y-8 text-gray-900 pb-10">
      <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2"><Plus size={18} className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 p-2"/> Hybrid Content Manager</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <InputGroup icon={MapPin} placeholder="e.g., Majestic Kerala Getaway" value={form.title} onChange={e => handleInputChange('title', e.target.value)} error={errors.title} />
            <InputGroup icon={IndianRupee} placeholder="e.g., 24999 (Numbers only)" value={form.price} onChange={e => handleInputChange('price', e.target.value)} error={errors.price} />
            <div className="w-full flex flex-col gap-1">
              <div className="flex gap-2">
                <InputGroup icon={ImageIcon} placeholder="Image URL (Upload to populate)" value={form.image} error={errors.image} disabled />
                <button type="button" onClick={() => handleUpload('image')} className={`px-4 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 ${errors.image ? 'mb-5' : ''}`}><Upload size={18} /></button>
              </div>
            </div>
            <InputGroup icon={Clock} placeholder="e.g., 5 Days / 4 Nights" value={form.duration} onChange={e => handleInputChange('duration', e.target.value)} error={errors.duration} />
            <InputGroup icon={MapPin} placeholder="e.g., Kerala, India" value={form.location} onChange={e => handleInputChange('location', e.target.value)} error={errors.location} />
            <select value={form.category} onChange={e => handleInputChange('category', e.target.value)} className="w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl outline-none h-[50px]">
              <option value="international">🌍 International</option><option value="india">🇮🇳 India</option><option value="honeymoon">❤️ Honeymoon</option>
              <option value="deal">🔥 Deal</option><option value="flipcard-india">🎴 India Flipcard</option><option value="flipcard-intl">🎴 Intl Flipcard</option>
            </select>
            {form.category.includes('flipcard') && (
              <div className="w-full flex flex-col gap-1">
                <div className="flex gap-2">
                  <InputGroup icon={Layout} placeholder="Back Image URL" value={form.backImage} error={errors.backImage} disabled />
                  <button type="button" onClick={() => handleUpload('backImage')} className={`px-4 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 ${errors.backImage ? 'mb-5' : ''}`}><Upload size={18} /></button>
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputGroup icon={FileText} placeholder="Write a captivating summary..." value={form.description} onChange={e => handleInputChange('description', e.target.value)} error={errors.description} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-3">
              <h4 className="font-bold flex items-center gap-2"><CheckCircle size={16} className="text-green-500"/> Inclusions</h4>
              <div className="flex gap-2"><input type="text" value={tempInc} onChange={(e) => setTempInc(e.target.value)} placeholder="e.g., Daily Breakfast" className={`flex-1 px-4 py-2 bg-gray-50 border rounded-xl outline-none ${errors.inclusions ? 'border-red-500' : 'border-gray-200'}`} /><button type="button" onClick={addInclusion} className="bg-green-50 text-green-600 p-2 rounded-xl"><Plus size={20}/></button></div>
              {errors.inclusions && <p className="text-xs text-red-500 m-0">{errors.inclusions}</p>}
              <ul className="space-y-2">{form.inclusions.map((item, idx) => (<li key={idx} className="flex justify-between p-2 bg-gray-50 rounded-lg text-sm">{item} <Trash2 size={14} className="cursor-pointer text-red-400" onClick={() => removeInclusion(idx)}/></li>))}</ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-bold flex items-center gap-2"><XCircle size={16} className="text-red-500"/> Exclusions</h4>
              <div className="flex gap-2"><input type="text" value={tempExc} onChange={(e) => setTempExc(e.target.value)} placeholder="e.g., Flights" className={`flex-1 px-4 py-2 bg-gray-50 border rounded-xl outline-none ${errors.exclusions ? 'border-red-500' : 'border-gray-200'}`} /><button type="button" onClick={addExclusion} className="bg-red-50 text-red-600 p-2 rounded-xl"><Plus size={20}/></button></div>
              {errors.exclusions && <p className="text-xs text-red-500 m-0">{errors.exclusions}</p>}
              <ul className="space-y-2">{form.exclusions.map((item, idx) => (<li key={idx} className="flex justify-between p-2 bg-gray-50 rounded-lg text-sm">{item} <Trash2 size={14} className="cursor-pointer text-red-400" onClick={() => removeExclusion(idx)}/></li>))}</ul>
            </div>
          </div>
          <div className="space-y-4 pt-4">
            <h4 className="font-bold flex items-center gap-2"><List size={16} className="text-indigo-500"/> Itinerary</h4>
            <div className={`grid grid-cols-12 gap-3 p-4 bg-gray-50 rounded-2xl border ${errors.itinerary ? 'border-red-500' : 'border-gray-200'}`}>
               <input className="col-span-2 p-2 rounded-lg border border-gray-300 text-center" value={`Day ${tempDay.day}`} disabled />
               <input className="col-span-3 p-2 rounded-lg border border-gray-300 outline-none" placeholder="e.g., Arrival" value={tempDay.title} onChange={e => {setTempDay({...tempDay, title: e.target.value}); if(errors.itinerary) setErrors(p=>({...p, itinerary:''}));}} />
               <input className="col-span-6 p-2 rounded-lg border border-gray-300 outline-none" placeholder="Description..." value={tempDay.desc} onChange={e => {setTempDay({...tempDay, desc: e.target.value}); if(errors.itinerary) setErrors(p=>({...p, itinerary:''}));}} />
               <button type="button" onClick={addItineraryDay} className="col-span-1 bg-indigo-600 text-white flex justify-center items-center rounded-lg"><Plus size={20}/></button>
            </div>
            {errors.itinerary && <p className="text-xs text-red-500 m-0">{errors.itinerary}</p>}
            <div className="space-y-2">{form.itinerary.map((day, idx) => (<div key={idx} className="flex items-start gap-4 p-3 bg-white border border-gray-100 rounded-xl"><span className="font-bold text-indigo-600">Day {day.day}</span><div className="flex-1"><p className="font-bold">{day.title}</p><p className="text-sm text-gray-600">{day.desc}</p></div><Trash2 size={16} className="cursor-pointer text-gray-400 hover:text-red-500" onClick={() => removeItineraryDay(idx)}/></div>))}</div>
          </div>
          <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-colors">Push Content to Site</button>
        </form>
      </div>
      <div className="bg-white rounded-3xl p-6 border border-gray-100">
        <h3 className="text-xl font-bold mb-4">Live Items ({packages.length})</h3>
        <table className="w-full text-left border-t border-gray-100"><tbody className="divide-y divide-gray-50">{packages.map(pkg => (<tr key={pkg._id} className="hover:bg-gray-50"><td className="py-4 flex items-center gap-4"><img src={pkg.image} className="h-10 w-16 rounded object-cover"/><b>{pkg.title}</b></td><td className="py-4"><span className="px-2 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full uppercase">{pkg.category}</span></td><td className="py-4 text-right"><Trash2 size={18} className="cursor-pointer text-gray-400 hover:text-red-500" onClick={() => handleDelete(pkg._id)}/></td></tr>))}</tbody></table>
      </div>
    </div>
  );
};
export default ManagePackages;