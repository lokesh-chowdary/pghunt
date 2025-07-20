import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

interface BackButtonProps {
  /** Custom text for the back button */
  text?: string;
  /** Custom path to navigate to. If not provided, uses browser history */
  to?: string;
  /** Show home icon instead of back arrow */
  showHome?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Variant style */
  variant?: 'default' | 'minimal' | 'outlined';
  /** Force navigation to home instead of previous page */
  forceHome?: boolean;
}

const BackButton: React.FC<BackButtonProps> = ({
  text,
  to,
  showHome = false,
  className = '',
  variant = 'default',
  forceHome = false
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      // Use specific path if provided
      navigate(to);
    } else if (forceHome) {
      // Force navigation to home
      navigate('/');
    } else {
      // Use browser history to go back one step
      navigate(-1);
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'minimal':
        return 'text-gray-600 hover:text-gray-900 bg-transparent hover:bg-gray-100';
      case 'outlined':
        return 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400';
      default:
        return 'text-gray-700 bg-gray-100 hover:bg-gray-200';
    }
  };

  const defaultText = showHome || forceHome ? 'Home' : (text || 'Back');
  const Icon = showHome || forceHome ? Home : ArrowLeft;

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium 
        transition-colors duration-200 focus:outline-none focus:ring-2 
        focus:ring-blue-500 focus:ring-offset-2
        ${getVariantClasses()}
        ${className}
      `}
      type="button"
    >
      <Icon className="w-4 h-4 mr-2" />
      {defaultText}
    </button>
  );
};

export default BackButton;