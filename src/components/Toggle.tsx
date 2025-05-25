import React from 'react';
import { cn } from '../utils/cn';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onChange,
  label,
  className,
}) => {
  return (
    <div className={cn("flex items-center", className)}>
      {label && (
        <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={cn(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          enabled ? "bg-indigo-600" : "bg-gray-300 dark:bg-gray-700"
        )}
        role="switch"
        aria-checked={enabled}
      >
        <span
          className={cn(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
            enabled ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
    </div>
  );
};

export default Toggle;