import React from 'react';
import styles from './ToggleTabs.module.css';

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
    <div className={`${styles.tabContainer} ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`${styles.tab} ${active === tab ? styles.active : ''}`}
        >
          {tab.replace('floor-', 'Deck ')}
        </button>
      ))}
    </div>
  );
};

export default ToggleTabs;