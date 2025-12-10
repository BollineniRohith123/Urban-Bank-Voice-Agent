import React from 'react';
import { ViewState } from '../types';

interface DashboardProps {
  onNavigate: (view: ViewState) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Welcome, Banker</h1>
           <p className="text-slate-600 mt-2">Ready to improve your skills and serve GUCB customers better?</p>
        </div>
        <div className="hidden md:block">
           <div className="text-right">
             <span className="text-xs text-slate-500 uppercase font-semibold">Current Branch</span>
             <p className="text-sm font-bold text-slate-800">Guntur Main Br.</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Action: Roleplay */}
        <div 
          onClick={() => onNavigate(ViewState.ROLEPLAY_TRAINER)}
          className="group cursor-pointer bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl transform transition-all hover:scale-[1.02] hover:shadow-2xl"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <span className="bg-green-400 text-green-900 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">Live</span>
          </div>
          <h3 className="text-xl font-bold mb-1">Practice Gold Loan Pitch</h3>
          <p className="text-blue-100 text-sm mb-4">Interactive voice roleplay with AI customer.</p>
          <div className="flex items-center text-sm font-medium text-blue-200 group-hover:text-white transition-colors">
            Start Session <span className="ml-2">→</span>
          </div>
        </div>

        {/* Quick Action: Knowledge Base */}
        <div 
          onClick={() => onNavigate(ViewState.KNOWLEDGE_BOT)}
          className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200 shadow-lg transform transition-all hover:scale-[1.02] hover:shadow-xl hover:border-blue-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">Latest Circulars</h3>
          <p className="text-slate-500 text-sm mb-4">Search knowledge base for rates and policies.</p>
          <div className="flex items-center text-sm font-medium text-indigo-600">
            Ask Sahayak <span className="ml-2">→</span>
          </div>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-slate-400 text-xs">My Score</span>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">Performance</h3>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-bold text-slate-900">85</span>
            <span className="text-slate-500 mb-1">/ 100</span>
          </div>
          <p className="text-slate-500 text-xs">Roleplay Average Score</p>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-4">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Circulars & Updates</h2>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {[
            { title: 'Circular 2024-B: UPI Limits Revised', date: 'Oct 24, 2023', tag: 'Important', id: 'c1' },
            { title: 'Gold Loan LTV Updated to 75%', date: 'Oct 20, 2023', tag: 'Policy', id: 'c2' },
            { title: 'New KYC Norms for Senior Citizens', date: 'Oct 15, 2023', tag: 'Compliance', id: 'c3' },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
              <div>
                <h4 className="font-medium text-slate-800">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.date}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                item.tag === 'Important' ? 'bg-red-100 text-red-700' :
                item.tag === 'Policy' ? 'bg-blue-100 text-blue-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;