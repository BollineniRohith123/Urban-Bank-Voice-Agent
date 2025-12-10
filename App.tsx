import React, { useState } from 'react';
import { ViewState } from './types';
import Dashboard from './components/Dashboard';
import RoleplayTrainer from './components/RoleplayTrainer';
import KnowledgeBot from './components/KnowledgeBot';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case ViewState.ROLEPLAY_TRAINER:
        return <RoleplayTrainer />;
      case ViewState.KNOWLEDGE_BOT:
        return <KnowledgeBot />;
      case ViewState.DASHBOARD:
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView(ViewState.DASHBOARD)}>
              <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">
                G
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-none">G-Smart Banker</h1>
                <p className="text-xs text-slate-500 font-medium tracking-wide">Guntur Urban Co-op Bank</p>
              </div>
            </div>

            <nav className="flex gap-4">
               {currentView !== ViewState.DASHBOARD && (
                 <button 
                   onClick={() => setCurrentView(ViewState.DASHBOARD)}
                   className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
                 >
                   Back to Home
                 </button>
               )}
               <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-semibold text-xs border border-slate-300">
                 VS
               </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {renderView()}
      </main>

      {/* Footer (only on Dashboard) */}
      {currentView === ViewState.DASHBOARD && (
        <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-xs text-slate-400">
            &copy; 2024 G-Smart Banker. Internal Use Only. Powered by Google Gemini.
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;