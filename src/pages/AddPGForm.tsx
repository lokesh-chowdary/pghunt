import React, { useState } from 'react';

export default function AddPGForm() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    price: '',
    rating: '',
    type: 'male', // Default type
    amenities: [],
    roomTypes: '',
    occupancy: '',
  });

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => {
      const amenities = new Set(prev.amenities);
      if (checked) {
        amenities.add(name);
      } else {
        amenities.delete(name);
      }
      return { ...prev, amenities: Array.from(amenities) };
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setImages(selectedFiles);

      const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviewImages(previewUrls);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === 'amenities') {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else {
        formDataToSend.append(key, formData[key as keyof typeof formData]);
      }
    });

    images.forEach((image) => {
      formDataToSend.append('images', image);
    });

    try {
      const response = await fetch('http:///127.0.0.1:8001/api/pgs', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert('PG added successfully!');
        setFormData({
          name: '',
          address: '',
          city: '',
          price: '',
          rating: '',
          type: 'male',
          amenities: [],
          roomTypes: '',
          occupancy: '',
        });
        setImages([]);
        setPreviewImages([]);
      } else {
        alert('Failed to add PG.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the PG.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-600">
        Add New PG
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter PG Name"
              required
            />
          </div>

          {/* City */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter City Name"
              required
            />
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter PG Address"
              required
            />
          </div>

          {/* Price */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (Monthly)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Price"
              required
            />
          </div>

          {/* Rating */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              step="0.1"
              min="0"
              max="5"
              placeholder="Enter Rating (0-5)"
              required
            />
          </div>

          {/* Type */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          {/* Amenities */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <div className="flex flex-wrap gap-4">
              {['WiFi', 'AC', 'Food', 'Laundry', 'Parking', 'Security'].map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={amenity}
                    onChange={handleCheckboxChange}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Room Types */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Types
            </label>
            <input
              type="text"
              name="roomTypes"
              value={formData.roomTypes}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="E.g., Single, Double"
              required
            />
          </div>

          {/* Occupancy */}
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Occupancy
            </label>
            <input
              type="text"
              name="occupancy"
              value={formData.occupancy}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="E.g., Single, Double"
              required
            />
          </div>

          {/* Images */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <div className="mt-4 flex gap-4 flex-wrap">
              {previewImages.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg shadow"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white font-bold rounded hover:bg-indigo-700 transition"
        >
          Add PG
        </button>
      </form>
    </div>
  );
}