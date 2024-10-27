import React from 'react';
import { X, Share2, Beaker, Clock, Pin } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sampleHistory = [
    { query: "ML model architecture", timestamp: "2 hours ago", pinned: true, category: "ML" },
    { query: "Neural networks basics", timestamp: "Yesterday", pinned: false, category: "Neural Networks" },
    { query: "Transformer architecture", timestamp: "2 days ago", pinned: true, category: "Transformers" },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}
      
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4" /> History
            </h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-3">
            {sampleHistory.map((item, index) => (
              <div 
                key={index}
                className="group relative p-4 rounded-xl transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-xs px-2 py-1 rounded-full w-fit bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                    {item.category}
                  </span>
                  <p className="text-sm font-medium">{item.query}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.timestamp}
                  </p>
                </div>
                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <Pin className={`h-4 w-4 ${item.pinned ? 'text-purple-500' : ''}`} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;