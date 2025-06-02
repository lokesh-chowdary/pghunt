import React, { useState } from "react";

interface PhotosProps {
  handleInputChange: (step: string, field: string, value: unknown) => void;
  handleNext: () => void;
  handleBack: () => void;
}

interface ImageFile extends File {
  preview: string;
}

const Photos = ({ handleInputChange, handleNext, handleBack }: PhotosProps) => {
  const [images, setImages] = useState<ImageFile[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const previewImages = files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }) as ImageFile
    );
    setImages([...images, ...previewImages]);
    handleInputChange("photos", "images", [...images, ...files]);
  };

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    handleInputChange("photos", "images", updatedImages);
  };

  return (
    <div className="bg-white p-6 shadow w-full">
      <h2 className="text-2xl font-bold text-indigo-800 mb-4">Photos</h2>

      <div className="mb-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0
          file:text-sm file:font-semibold
          file:bg-indigo-100 file:text-indigo-700
          hover:file:bg-indigo-200"
          onChange={handleFileChange}
        />
      </div>

      {/* Image Previews */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image.preview}
              alt={`Uploaded ${index + 1}`}
              className="w-full h-32 object-cover rounded-md"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          onClick={handleNext}
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default Photos;
