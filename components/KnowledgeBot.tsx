import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage, Language } from '../types';
import { BANK_KNOWLEDGE_BASE } from '../constants';

const KnowledgeBot: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Namaste! I am Sahayak, your GUCB Banking Assistant. You can ask me about Interest Rates, Circulars, or Loan Eligibility.',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      if (!process.env.API_KEY) {
        throw new Error("API Key missing");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = `
        You are 'Sahayak', an expert banking assistant for Guntur Urban Co-operative Bank.
        Your Source Material: You have access to the provided Vector Context (Bank Circulars, Interest Rates).

        RULES:
        1. STRICTLY answer based ONLY on the provided context. If the answer is not in the documents, say "I do not have that information in the current circulars."
        2. LANGUAGE: Detect the user's language. If they ask in Telugu, answer in Telugu. If English, answer in English. Even if the 'Response Language' is set to English, prioritize the language of the user's query if it's Telugu.
        3. SECURITY: If a user provides a real account number or customer name, refuse to process it and say "Please do not share real customer data."
        4. TONE: Professional, concise, and accurate.

        Context: ${BANK_KNOWLEDGE_BASE}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMsg.text,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.2, // Low temperature for factual RAG responses
        }
      });

      const aiText = response.text || "I apologize, I couldn't process that request.";

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: aiText,
        timestamp: new Date()
      }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sorry, I am having trouble connecting to the bank server.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto w-full bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="text-2xl">🤖</span> Knowledge Assistant
        </h2>
        <div className="flex bg-slate-200 rounded-lg p-1">
          <button
            onClick={() => setLanguage(Language.ENGLISH)}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${language === Language.ENGLISH ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-800'}`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage(Language.TELUGU)}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${language === Language.TELUGU ? 'bg-white shadow text-blue-600' : 'text-slate-600 hover:text-slate-800'}`}
          >
            Telugu
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
            }`}>
               {msg.role === 'model' && <div className="text-xs font-bold text-blue-600 mb-1">Sahayak</div>}
               <div className="whitespace-pre-wrap">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 border border-slate-200 shadow-sm flex gap-2 items-center">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-75"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={language === Language.TELUGU ? "మీ ప్రశ్నను ఇక్కడ టైప్ చేయండి..." : "Ask about Gold Loans, Rates..."}
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-900 placeholder-slate-400"
            rows={2}
          />
          <button
            onClick={handleSend}
            disabled={!query.trim() || isLoading}
            className="absolute right-2 bottom-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
        <div className="text-center mt-2 text-xs text-slate-400">
          AI generated responses. Verify with official circulars.
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBot;