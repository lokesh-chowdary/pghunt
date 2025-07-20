import React, { useState, useEffect } from 'react';
import { Settings, Database, Wifi } from 'lucide-react';

const DevModeToggle: React.FC = () => {
  const [useMockData, setUseMockData] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development mode
    setIsVisible(process.env.NODE_ENV === 'development');
    
    // Check localStorage for saved preference
    const savedPreference = localStorage.getItem('use_mock_data');
    if (savedPreference === 'true') {
      setUseMockData(true);
    }
  }, []);

  const handleToggle = () => {
    const newValue = !useMockData;
    setUseMockData(newValue);
    localStorage.setItem('use_mock_data', newValue.toString());
    
    // Reload the page to apply changes
    window.location.reload();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
        <div className="flex items-center space-x-2">
          <Settings className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Dev Mode</span>
        </div>
        
        <div className="mt-2 flex items-center space-x-2">
          <button
            onClick={handleToggle}
            className={`flex items-center space-x-2 px-3 py-1 rounded text-xs font-medium transition-colors ${
              useMockData
                ? 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
            }`}
          >
            {useMockData ? (
              <>
                <Database className="w-3 h-3" />
                <span>Mock Data</span>
              </>
            ) : (
              <>
                <Wifi className="w-3 h-3" />
                <span>Live API</span>
              </>
            )}
          </button>
        </div>
        
        <div className="mt-1 text-xs text-gray-500">
          {useMockData ? 'Using sample data' : 'Using live backend'}
        </div>
      </div> */}
    </div>
  );
};

export default DevModeToggle;