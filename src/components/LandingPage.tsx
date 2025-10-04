import React from 'react';
import { Play } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl p-8 md:p-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-full"></div>
            </div>
            <span className="text-xl font-bold text-blue-600">RESPIRE</span>
          </div>

          {/* Empty space for balance */}
          <div></div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-4">
            Smart City Analytics
          </h1>
          
          {/* Sub-headline */}
          <h2 className="text-xl md:text-2xl text-black mb-8">
            Real-time Urban Planning Platform
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl">
            Monitor traffic patterns, air quality, and urban health in real-time. 
            Use our advanced simulation tools to test interventions and optimize 
            city planning decisions. Built for urban planners, city officials, 
            and environmental researchers.
          </p>

          {/* Content Indicators */}
          <div className="flex space-x-2 mb-12">
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>

          {/* Call-to-Action Button */}
          <div className="flex justify-center">
            <button
              onClick={onGetStarted}
              className="bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>GET STARTED</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
