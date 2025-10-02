// Image utility functions

const BACKEND_BASE_URL = 'http://localhost:8000';

/**
 * Get the full URL for an image stored in the backend
 * @param imagePath - The image path from the database
 * @returns Full URL to the image
 */
export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) {
    return 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
  }

  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }

  // If it starts with storage/, prepend the backend URL
  if (imagePath.startsWith('storage/')) {
    return `${BACKEND_BASE_URL}/${imagePath}`;
  }

  // If it's just a filename or relative path, assume it's in storage/images/
  return `${BACKEND_BASE_URL}/storage/images/${imagePath}`;
};

/**
 * Get the first available image URL from an array of images
 * @param images - Array of image paths
 * @returns URL of the first image or placeholder
 */
export const getFirstImageUrl = (images: string[] | null | undefined): string => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return getImageUrl(null);
  }

  return getImageUrl(images[0]);
};

/**
 * Get all image URLs from an array of image paths
 * @param images - Array of image paths
 * @returns Array of full image URLs
 */
export const getAllImageUrls = (images: string[] | null | undefined): string[] => {
  if (!images || !Array.isArray(images)) {
    return [getImageUrl(null)];
  }

  return images.map(image => getImageUrl(image));
};

/**
 * Handle image loading errors by setting a fallback image
 * @param event - Image error event
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const target = event.target as HTMLImageElement;
  target.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
};