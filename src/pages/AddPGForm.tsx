import React, { useState } from 'react';
import './AddPGForm.css'; // Import your CSS file for styling
import { toast } from 'sonner';
import LoadingOverlay from '../components/LoadingOverlay';

interface FormData {
  name: string;
  address: string;
  city: string;
  price: string;
  rating: string;
  type: string;
  amenities: string[];
  roomTypes: string;
  occupancy: string;
}

export default function AddPGForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
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

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
      const amenities = [...prev.amenities];
      if (checked) {
        amenities.push(name);
      } else {
        const index = amenities.indexOf(name);
        if (index > -1) {
          amenities.splice(index, 1);
        }
      }
      return { ...prev, amenities };
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      if (selectedFiles.length > 5) {
        toast.error('You can upload maximum 5 images');
        return;
      }
      setImages(selectedFiles);
      const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviewImages(previewUrls);
    }
  };

  const validateForm = () => {
    const requiredFields: (keyof FormData)[] = [
      'name',
      'address',
      'city',
      'price',
      'rating',
      'roomTypes',
      'occupancy',
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in the ${field} field`);
        return false;
      }
    }
    if (parseFloat(formData.price) <= 0) {
      toast.error('Price must be greater than 0');
      return false;
    }
    if (parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 5) {
      toast.error('Rating must be between 0 and 5');
      return false;
    }
    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'amenities') {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      });

      images.forEach((image) => {
        formDataToSend.append('images[]', image);
      });

      const response = await fetch(`${import.meta.env.VITE_API_URL}/pgs`, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add PG');
      }

      const result = await response.json();
      toast.success('PG added successfully!');
      
      // Reset form
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
      setStep(1);
    } catch (error) {
      console.error('Error:', error);
      toast.error(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const nextStep = () => {
    if (step === 1 && (!formData.name || !formData.city || !formData.address)) {
      toast.error('Please fill in all fields in Basic Details');
      return;
    }
    if (step === 2 && (!formData.price || !formData.rating)) {
      toast.error('Please fill in all fields in Pricing & Rating');
      return;
    }
    if (step === 3 && (!formData.roomTypes || !formData.occupancy)) {
      toast.error('Please fill in all fields in PG Details');
      return;
    }
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="step-content">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter PG Name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter City Name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Enter PG Address"
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <div className="form-group">
              <label className="form-label">Price (Monthly)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter Price"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Rating</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="form-input"
                step="0.1"
                min="0"
                max="5"
                placeholder="Enter Rating (0-5)"
                required
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <div className="form-group">
              <label className="form-label">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>
            <div className="amenities-group">
              <label className="form-label">Amenities</label>
              <div className="amenities-grid">
                {['WiFi', 'AC', 'Food', 'Laundry', 'Parking', 'Security'].map((amenity) => (
                  <label key={amenity} className="amenity-label">
                    <input
                      type="checkbox"
                      name={amenity}
                      onChange={handleCheckboxChange}
                      className="amenity-checkbox"
                      checked={formData.amenities.includes(amenity)}
                    />
                    <span>{amenity}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Room Types</label>
              <input
                type="text"
                name="roomTypes"
                value={formData.roomTypes}
                onChange={handleInputChange}
                className="form-input"
                placeholder="E.g., Single, Double"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Occupancy</label>
              <input
                type="text"
                name="occupancy"
                value={formData.occupancy}
                onChange={handleInputChange}
                className="form-input"
                placeholder="E.g., Single, Double"
                required
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <div className="image-upload-group">
              <label className="form-label">Upload Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="image-input"
              />
              <div className="image-preview">
                {previewImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="preview-image"
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="step-content review-step">
            <h3 className="review-title">Review Your Details</h3>
            <div className="review-grid">
              <div className="review-item">
                <span className="review-label">Name:</span>
                <span className="review-value">{formData.name || 'N/A'}</span>
              </div>
              <div className="review-item">
                <span className="review-label">City:</span>
                <span className="review-value">{formData.city || 'N/A'}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Address:</span>
                <span className="review-value">{formData.address || 'N/A'}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Price (Monthly):</span>
                <span className="review-value">₹{formData.price || 'N/A'}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Rating:</span>
                <span className="review-value">{formData.rating || 'N/A'}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Type:</span>
                <span className="review-value">{formData.type || 'N/A'}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Amenities:</span>
                <span className="review-value">
                  {formData.amenities.length > 0 ? formData.amenities.join(', ') : 'None'}
                </span>
              </div>
              <div className="review-item">
                <span className="review-label">Room Types:</span>
                <span className="review-value">{formData.roomTypes || 'N/A'}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Occupancy:</span>
                <span className="review-value">{formData.occupancy || 'N/A'}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Images:</span>
                <span className="review-value">{previewImages.length} image(s) uploaded</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Add New PG</h1>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-line">
          <div
            className="progress-line-fill"
            style={{ width: `${((step - 1) / 4) * 100}%` }}
          />
        </div>
        {['Basic Details', 'Pricing & Rating', 'PG Details', 'Images', 'Review & Submit'].map(
          (label, index) => (
            <div key={label} className="progress-step">
              <div
                className={`step-circle ${
                  step > index + 1 ? 'completed' : step === index + 1 ? 'active' : ''
                }`}
              >
                {index + 1}
              </div>
              <span className="step-label">{label}</span>
            </div>
          )
        )}
      </div>

      {/* Form Steps */}
      <form onSubmit={handleSubmit}>
        {renderStep()}

        {/* Navigation Buttons */}
        {step < 5 ? (
          <div className="navigation-buttons">
            <button
              type="button"
              onClick={prevStep}
              className="nav-button prev-button"
              disabled={step === 1}
            >
              Previous
            </button>
            <button type="button" onClick={nextStep} className="nav-button next-button">
              Next
            </button>
          </div>
        ) : (
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit PG'}
          </button>
        )}
      </form>

      {/* Loading Overlay */}
      {isSubmitting && <LoadingOverlay progress={uploadProgress} />}
    </div>
  );
}