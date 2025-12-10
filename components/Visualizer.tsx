import React from 'react';

interface VisualizerProps {
  isActive: boolean;
  isSpeaking: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ isActive, isSpeaking }) => {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 mt-8">
      {/* Outer Glow */}
      <div 
        className={`absolute inset-0 rounded-full bg-blue-500 blur-3xl transition-opacity duration-1000 ${
          isActive ? 'opacity-40' : 'opacity-10'
        }`} 
      />
      
      {/* Core Orb */}
      <div 
        className={`relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 shadow-2xl transition-all duration-300 ${
          isActive ? 'scale-110' : 'scale-100 grayscale'
        } ${isSpeaking ? 'animate-pulse' : ''}`}
      >
        <div className="absolute inset-0 rounded-full bg-white opacity-20 blur-sm"></div>
      </div>

      {/* Orbiting Particles (Decoration) */}
      {isActive && (
        <>
          <div className="absolute w-48 h-48 border border-blue-300/30 rounded-full animate-[spin_4s_linear_infinite]" />
          <div className="absolute w-56 h-56 border border-indigo-300/20 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
        </>
      )}

      <div className="absolute -bottom-12 text-center">
        <p className={`text-sm font-medium transition-colors ${isActive ? 'text-blue-700' : 'text-slate-400'}`}>
          {isActive ? (isSpeaking ? "AI is speaking..." : "Listening...") : "Session Inactive"}
        </p>
      </div>
    </div>
  );
};

export default Visualizer;