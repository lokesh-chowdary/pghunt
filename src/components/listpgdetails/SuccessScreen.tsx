import React from 'react';

const SuccessScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl p-8 text-center shadow-xl">
          <div className="animate-bounce mb-6">
            <div className="text-6xl mb-4">🎉</div>
            <div className="text-4xl text-green-500 mb-2">✅</div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            PG Listed Successfully!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Your PG listing has been published and is now live. Potential tenants can now discover and contact you.
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Create Another Listing
            </button>
            
            <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-all duration-200">
              View My Listings
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-700">
              💡 <strong>Pro Tip:</strong> Share your listing on social media to get more visibility!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
