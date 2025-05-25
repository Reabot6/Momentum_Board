import React from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  fullWidth = false,
  ...props
}) => {
  const baseStyles = "rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-opacity-50";
  
  const variantStyles = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500",
    secondary: "bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500",
    outline: "bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-800 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-200 focus:ring-gray-500",
  };
  
  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  
  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        widthClass,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;