import React from 'react';

interface VisualToggleProps {
  isVisualMode: boolean;
  onToggle: () => void;
}

const VisualToggle: React.FC<VisualToggleProps> = ({ isVisualMode, onToggle }) => {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
      <button
        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          !isVisualMode 
            ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm' 
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`}
        onClick={() => !isVisualMode && onToggle()}
      >
        Text View
      </button>
      <button
        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          isVisualMode 
            ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm' 
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        }`}
        onClick={() => isVisualMode && onToggle()}
      >
        Visual View
      </button>
    </div>
  );
};

export default VisualToggle;