import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddPGForm() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        price: '',
        rating: '',
        type: 'male',
        amenities: [],
        room_types: '',
        occupancy: '',
        images: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        if (type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                amenities: checked
                    ? [...prev.amenities, value]
                    : prev.amenities.filter(item => item !== value)
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setFormData(prev => ({
            ...prev,
            images: files.map(file => file.name)
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitData = {
            ...formData,
            amenities: JSON.stringify(formData.amenities),
            images: JSON.stringify(formData.images)
        };
        console.log('Form submitted:', submitData);
        navigate('/list-your-pg');
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const steps = [
        { number: 1, label: 'Basic Info' },
        { number: 2, label: 'Pricing' },
        { number: 3, label: 'Details' },
        { number: 4, label: 'Images' }
    ];

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-6 animate-fade-in">
                        <h3 className="text-lg font-semibold text-gray-800">Basic Information</h3>
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                required
                            />
                            <label
                                htmlFor="name"
                                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-500"
                            >
                                PG Name
                            </label>
                        </div>
                        <div className="relative">
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 h-24 resize-none"
                                required
                            />
                            <label
                                htmlFor="address"
                                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-500"
                            >
                                Address
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                required
                            />
                            <label
                                htmlFor="city"
                                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-500"
                            >
                                City
                            </label>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6 animate-fade-in">
                        <h3 className="text-lg font-semibold text-gray-800">Pricing and Type</h3>
                        <div className="relative">
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                required
                                min="0"
                                step="0.01"
                            />
                            <label
                                htmlFor="price"
                                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-500"
                            >
                                Price (per month)
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="number"
                                id="rating"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                required
                                min="0"
                                max="5"
                                step="0.1"
                            />
                            <label
                                htmlFor="rating"
                                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-500"
                            >
                                Rating (0-5)
                            </label>
                        </div>
                        <div className="relative">
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="unisex">Unisex</option>
                            </select>
                            <label
                                htmlFor="type"
                                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-500"
                            >
                                Type
                            </label>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6 animate-fade-in">
                        <h3 className="text-lg font-semibold text-gray-800">Amenities and Room Details</h3>
                        <div>
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Amenities</label>
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                {['WiFi', 'AC', 'Food', 'Laundry', 'Parking', 'Gym'].map(amenity => (
                                    <label key={amenity} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            name="amenities"
                                            value={amenity}
                                            checked={formData.amenities.includes(amenity)}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-gray-700">{amenity}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                id="room_types"
                                name="room_types"
                                value={formData.room_types}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                required
                            />
                            <label
                                htmlFor="room_types"
                                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-500"
                            >
                                Room Types (e.g., Single, Double)
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                id="occupancy"
                                name="occupancy"
                                value={formData.occupancy}
                                onChange={handleChange}
                                placeholder=" "
                                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                required
                            />
                            <label
                                htmlFor="occupancy"
                                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-500"
                            >
                                Occupancy (e.g., Single, Sharing)
                            </label>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6 animate-fade-in">
                        <h3 className="text-lg font-semibold text-gray-800">Upload Images</h3>
                        <div className="relative">
                            <input
                                type="file"
                                id="images"
                                name="images"
                                onChange={handleImageChange}
                                multiple
                                accept="image/*"
                                className="peer w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                            <label
                                htmlFor="images"
                                className="absolute left-4 top-3 text-gray-500 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-6 peer-focus:text-sm peer-focus:text-blue-500"
                            >
                                Upload Images
                            </label>
                            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="text-sm text-gray-600 truncate bg-gray-100 p-2 rounded-lg">
                                        {image}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-pink-50 p-4 sm:p-6">
            <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-lg h-[600px] flex flex-col">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">List Your PG</h2>
                {/* Step Indicator */}
                <div className="flex items-center justify-center mb-6">
                    {steps.map((s, index) => (
                        <div key={s.number} className="flex items-center">
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                                        step >= s.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                                    }`}
                                >
                                    {s.number}
                                </div>
                                <span className="text-xs mt-1 text-gray-600">{s.label}</span>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`h-1 w-12 sm:w-16 mx-2 ${
                                        step > s.number ? 'bg-blue-600' : 'bg-gray-200'
                                    } transition-all duration-200`}
                                ></div>
                            )}
                        </div>
                    ))}
                </div>
                {/* Form Content */}
                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                    {renderStep()}
                </form>
                {/* Static Buttons */}
                <div className="mt-4 flex justify-between border-t pt-4">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Previous
                        </button>
                    )}
                    <div className="flex-1"></div>
                    {step < 4 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}