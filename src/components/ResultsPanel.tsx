import React, { useState } from 'react';
import { Bookmark, Download, ArrowRight, Sparkles } from 'lucide-react';
import type { ProcessedResponse } from '../utils/geminiApi';

interface ResultsPanelProps {
  searchQuery: string;
  result: ProcessedResponse | null;
  isLoading: boolean;
  isDarkMode: boolean;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ 
  searchQuery, 
  result, 
  isLoading,
  isDarkMode 
}) => {
  const [viewMode, setViewMode] = useState<'visual' | 'table'>('visual');

  if (isLoading) {
    return (
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6 animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  if (result.type === 'error') {
    return (
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-red-200 dark:border-red-800 p-6">
        <p className="text-red-600 dark:text-red-400">{result.error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Text Content Section */}
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              {searchQuery}
            </h3>
          </div>
          <div className="flex gap-2">
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Save response"
            >
              <Bookmark className="w-5 h-5" />
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Download response"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {result.textContent}
          </p>
        </div>
      </div>

      {/* Visual Content Section */}
      {result.visualContent && (
        <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Visual Representation</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('visual')}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                  viewMode === 'visual'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Visual View
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                  viewMode === 'table'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Table View
              </button>
            </div>
          </div>

          <div className="mt-6">
            {viewMode === 'visual' ? (
              <div className="relative min-h-[400px] p-4 bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm">
                <div className="flex flex-wrap justify-center items-center gap-8">
                  {/* Left Circle */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-xl transition-all duration-300 group-hover:scale-110" />
                    <div className="relative w-64 h-64 bg-gradient-to-br from-green-100/80 to-blue-100/80 dark:from-green-900/30 dark:to-blue-900/30 rounded-full p-6 flex flex-col justify-center items-center backdrop-blur-sm border border-green-200/50 dark:border-green-700/30">
                      <h4 className="font-medium mb-4 text-center">{result.visualContent.nodes[0]?.label}</h4>
                      <ul className="text-sm space-y-2">
                        {result.visualContent.nodes
                          .filter(node => node.type === 'left')
                          .map((node, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-green-500" />
                              {node.label}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>

                  {/* Center Connection */}
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-48 h-48 bg-gradient-to-br from-purple-100/80 to-pink-100/80 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg rotate-45 flex items-center justify-center backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/30 group hover:scale-105 transition-transform duration-300">
                      <div className="rotate-[-45deg] text-center">
                        <h4 className="font-medium mb-3">Common Factors</h4>
                        <ul className="text-sm space-y-2">
                          {result.visualContent.connections.map((conn, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-purple-500" />
                              {conn.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Right Circle */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full blur-xl transition-all duration-300 group-hover:scale-110" />
                    <div className="relative w-64 h-64 bg-gradient-to-br from-red-100/80 to-orange-100/80 dark:from-red-900/30 dark:to-orange-900/30 rounded-full p-6 flex flex-col justify-center items-center backdrop-blur-sm border border-red-200/50 dark:border-red-700/30">
                      <h4 className="font-medium mb-4 text-center">{result.visualContent.nodes[1]?.label}</h4>
                      <ul className="text-sm space-y-2">
                        {result.visualContent.nodes
                          .filter(node => node.type === 'right')
                          .map((node, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-red-500" />
                              {node.label}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto bg-white/30 dark:bg-gray-900/30 rounded-lg backdrop-blur-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-4 px-6 font-semibold">Aspect</th>
                      <th className="text-left py-4 px-6 font-semibold text-green-600 dark:text-green-400">
                        {result.visualContent.nodes[0]?.label}
                      </th>
                      <th className="text-left py-4 px-6 font-semibold text-red-600 dark:text-red-400">
                        {result.visualContent.nodes[1]?.label}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.visualContent.nodes
                      .filter(node => node.type === 'left')
                      .map((node, index) => (
                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                          <td className="py-4 px-6 font-medium">{node.label}</td>
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-green-500" />
                              Yes
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="inline-flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-red-500" />
                              No
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;