import React, { useState } from 'react';
import { ShippingFormData, ShippingQuote } from './types';
import { calculateQuotes } from './services/mockApi';
import { getShippingAdvice } from './services/geminiService';
import QuoteForm from './components/QuoteForm';
import ServiceCards from './components/ServiceCards';
import AiInsight from './components/AiInsight';
import { LOGO_URL } from './constants';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState<ShippingQuote[] | null>(null);
  const [advice, setAdvice] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);

  const handleFormSubmit = async (data: ShippingFormData) => {
    setLoading(true);
    setQuotes(null);
    setAdvice('');
    
    try {
      // 1. Calculate Quotes (Mock Logic)
      const results = await calculateQuotes(data);
      setQuotes(results);
      setLoading(false);

      // 2. Get AI Advice (Gemini)
      setAnalyzing(true);
      const aiAdvice = await getShippingAdvice(data, results);
      setAdvice(aiAdvice);
    } catch (error) {
      console.error(error);
      setLoading(false);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Skylark Express" className="h-12 w-auto object-contain" />
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-500">
            <a href="#" className="text-sky-600 border-b-2 border-sky-600 pb-1">Get Quote</a>
            <a href="#" className="hover:text-sky-600 transition-colors">Services</a>
            <a href="#" className="hover:text-sky-600 transition-colors">Business</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Smart Logistics Calculator
          </h1>
          <p className="text-lg text-slate-600">
            Compare shipping rates instantly and get AI-powered recommendations for your cargo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-4">
            <QuoteForm onSubmit={handleFormSubmit} isLoading={loading} />
            
            {/* Info Box */}
            <div className="mt-6 bg-slate-100 p-6 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Why Skylark?
              </h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Real-time AI advisory</li>
                <li>• 99.8% On-time delivery</li>
                <li>• Global network coverage</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-8">
            {!quotes && !loading && (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[400px] border-2 border-dashed border-slate-200 rounded-2xl">
                <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                <p>Fill out the form to see shipping options</p>
              </div>
            )}

            {quotes && (
              <div className="animate-fade-in-up">
                
                {/* AI Insight Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-800 mb-3">AI Recommendation</h3>
                  <AiInsight 
                    insight={advice} 
                    loading={analyzing} 
                    isDelayed={false} // reusing prop for style variation
                  />
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-800">Available Options</h3>
                  <span className="text-sm text-slate-500">3 services found</span>
                </div>
                
                <ServiceCards quotes={quotes} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;