import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning';
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ 
  className, 
  variant = 'default', 
  children, 
  ...props 
}) => {
  const variants = {
    default: 'border-transparent bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200',
    destructive: 'border-transparent bg-red-600 text-white hover:bg-red-700',
    outline: 'border-gray-300 text-gray-700 hover:bg-gray-50',
    success: 'border-transparent bg-green-600 text-white hover:bg-green-700',
    warning: 'border-transparent bg-yellow-500 text-white hover:bg-yellow-600'
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Badge;