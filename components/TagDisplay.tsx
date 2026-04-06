
import React, { useState } from 'react';

interface TagDisplayProps {
  title: string;
  items: string[];
  type: 'tags' | 'hashtags';
}

const TagDisplay: React.FC<TagDisplayProps> = ({ title, items, type }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const text = type === 'tags' ? items.join(', ') : items.join(' ');
    // Fix: Changed 'navigator.clipboard.withText' to 'navigator.clipboard.writeText'
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 flex-shrink-0">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          {title}
          <span className="bg-red-50 text-red-600 text-xs px-2 py-1 rounded-full font-bold">
            {type === 'tags' ? '20 Tags' : `${items.length} Items`}
          </span>
        </h3>
        <button
          onClick={copyToClipboard}
          className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm text-sm ${
            copied 
              ? 'bg-green-500 text-white scale-95' 
              : 'bg-red-600 text-white hover:bg-red-700 active:scale-95'
          }`}
        >
          {copied ? 'Copied!' : `Copy ${title}`}
        </button>
      </div>
      <div className="flex-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
        <div className="flex flex-wrap gap-2">
          {items.map((item, idx) => (
            <span 
              key={idx}
              className={`px-3 py-1.5 rounded-xl text-xs transition-colors border font-medium ${
                type === 'hashtags' 
                  ? 'bg-blue-50 text-blue-700 border-blue-100' 
                  : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagDisplay;
