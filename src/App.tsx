import React, { useState } from 'react';
import { Menu, Moon, Sun, Settings, HelpCircle, Sparkles, Command, Search } from 'lucide-react';
import SearchBar from './components/SearchBar';
import ResultsPanel from './components/ResultsPanel';
import Sidebar from './components/Sidebar';
import { processQuery, ProcessedResponse } from './utils/geminiApi';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState<ProcessedResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setSearchQuery(query);
    
    try {
      const response = await processQuery(query);
      setResult(response);
    } catch (error) {
      setResult({
        type: 'error',
        textContent: '',
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Decorative Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-purple-500" />
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    NeoynGPT
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <Command className="w-4 h-4" />
                  <span>Cmd + K</span>
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="flex">
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            
            <div className="flex-grow ml-0 md:ml-64 transition-all duration-300">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4 animate-fade-in">
                    Hello! How can NeoynGPT help you today?
                  </h2>
                  <SearchBar onSearch={handleSearch} />
                </div>
                {(searchQuery || isLoading || result) && (
                  <ResultsPanel 
                    searchQuery={searchQuery} 
                    result={result} 
                    isLoading={isLoading}
                    isDarkMode={isDarkMode}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;