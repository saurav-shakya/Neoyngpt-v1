import React, { useState, useEffect } from 'react';
import { Search, Command } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="relative group">
      <div className="absolute inset-0 rounded-2xl transition-all duration-200 bg-purple-100/50 dark:bg-purple-500/20 group-focus-within:blur-xl opacity-0 group-hover:opacity-100" />
      <div className="relative">
        <input
          id="search-input"
          type="text"
          placeholder="Ask anything... (Cmd + K)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-4 pl-12 pr-12 rounded-2xl border bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
        />
        <Search className="absolute left-4 top-4 h-5 w-5 text-gray-500 dark:text-gray-400" />
        <Command className="absolute right-4 top-4 h-5 w-5 text-gray-500 dark:text-gray-400" />
      </div>
    </form>
  );
};

export default SearchBar;