"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ResonanceEngine } from '@/components/ResonanceEngine';
import { ChronoEngine } from '@/components/ChronoEngine';
import { BellyFatEngine } from '@/components/BellyFatEngine';
import { useLedger } from '@/lib/useLedger';

type DailyPhase = 'intro' | 'resonance' | 'chrono' | 'bellyfat' | 'outro';

export default function DailyFlow() {
  const [phase, setPhase] = useState<DailyPhase>('intro');
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');
  const { currentStreak } = useLedger();

  const transitionTo = (nextPhase: DailyPhase) => {
    setFadeState('out');
    setTimeout(() => {
      setPhase(nextPhase);
      setFadeState('in');
    }, 1000); // 1-second crossfade
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      
      {/* Stealth Navbar (only back button) */}
      <nav className="fixed top-0 w-full p-6 flex items-center z-50 mix-blend-difference">
        <Link href="/" className="flex items-center space-x-2 opacity-50 hover:opacity-100 transition-opacity">
          <ArrowLeft size={20} />
          <span className="font-semibold tracking-tight text-sm uppercase">Exit Flow</span>
        </Link>
      </nav>

      {/* Main Orchestrator */}
      <main className={`w-full h-screen transition-opacity duration-1000 ${fadeState === 'in' ? 'opacity-100' : 'opacity-0'}`}>
        
        {phase === 'intro' && (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              The Daily Flow
            </h1>
            <p className="text-xl text-gray-500 font-light max-w-md mx-auto mb-12">
              Ten minutes. Zero decisions. Pure optimization.
            </p>
            <button 
              onClick={() => transitionTo('resonance')}
              className="px-12 py-5 bg-white text-black text-lg font-bold rounded-full hover:scale-105 transition-transform"
            >
              Start Sequence
            </button>
          </div>
        )}

        {phase === 'resonance' && (
          <div className="w-full h-full flex flex-col items-center justify-center relative">
            <ResonanceEngine 
              autoStart={true} 
              hideControls={true} 
              onComplete={() => transitionTo('chrono')} 
            />
          </div>
        )}

        {phase === 'chrono' && (
          <div className="w-full h-full flex flex-col items-center justify-center relative">
             <ChronoEngine 
              autoStart={true} 
              hideControls={true} 
              onComplete={() => transitionTo('bellyfat')} 
            />
          </div>
        )}

        {phase === 'bellyfat' && (
          <div className="w-full h-full flex flex-col items-center justify-center relative bg-black">
             <BellyFatEngine 
              autoStart={true} 
              hideControls={true} 
              onComplete={() => transitionTo('outro')} 
            />
          </div>
        )}

        {phase === 'outro' && (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="text-orange-500 font-mono text-sm tracking-widest uppercase mb-4">
              Flow Complete
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
              Optimal State Achieved
            </h1>
            <p className="text-xl text-gray-500 font-light max-w-md mx-auto mb-12">
              Your Identity Ledger has been updated. Current Streak: {currentStreak} days.
            </p>
            <Link 
              href="/"
              className="px-12 py-5 border border-white/20 text-white text-lg font-medium rounded-full hover:bg-white hover:text-black transition-colors"
            >
              Return Home
            </Link>
          </div>
        )}

      </main>
    </div>
  );
}
