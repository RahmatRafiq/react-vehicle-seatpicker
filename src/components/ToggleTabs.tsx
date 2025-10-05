import React from 'react';

export interface ToggleTabsProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
  className?: string;
}

const ToggleTabs: React.FC<ToggleTabsProps> = ({ 
  tabs, 
  active, 
  onChange, 
  className = '' 
}) => {
  return (
    <div className={`inline-flex rounded-lg border border-gray-200 bg-gray-100 p-1 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
            active === tab
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.replace('floor-', 'Lantai ')}
        </button>
      ))}
    </div>
  );
};

export default ToggleTabs;