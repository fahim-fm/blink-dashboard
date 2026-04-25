import React from 'react';

interface FilterTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  counts: {
    unread: number;
    read: number;
  };
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ activeTab, onTabChange, counts }) => {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: `Unread(${counts.unread})` },
    { id: 'read', label: `Read(${counts.read})` },
  ];

  return (
    <div className="box-border flex flex-row items-center p-1 bg-form border border-border rounded-[32px] overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex flex-row justify-center items-center py-1 px-4 sm:px-[22px] gap-2.5 h-[34px] rounded-[28px] font-normal text-sm sm:text-base leading-[26px] text-text-secondary transition-colors whitespace-nowrap ${
            activeTab === tab.id ? 'bg-border' : 'bg-transparent hover:bg-border/50'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};