"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Target, Play, RotateCcw, BrainCircuit } from 'lucide-react';

type Phase = 'intro' | 'compression' | 'dilation' | 'results';

export default function ChronoApp() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [timeLeft, setTimeLeft] = useState(30);
  const [clicks, setClicks] = useState(0);
  const [targetPos, setTargetPos] = useState({ top: '50%', left: '50%' });

  // Timer logic for active phases
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if ((phase === 'compression' || phase === 'dilation') && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (phase === 'compression') {
              setPhase('dilation');
              return 30; // Reset for next phase
            } else {
              setPhase('results');
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [phase, timeLeft]);

  // Target movement for Compression phase
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (phase === 'compression') {
      interval = setInterval(() => {
        setTargetPos({
          top: `${10 + Math.random() * 80}%`,
          left: `${10 + Math.random() * 80}%`,
        });
      }, 700); // Moves every 700ms to create urgency
    }
    return () => clearInterval(interval);
  }, [phase]);

  const handleTargetClick = () => {
    if (phase === 'compression') {
      setClicks((c) => c + 1);
      // Move target immediately on click
      setTargetPos({
        top: `${10 + Math.random() * 80}%`,
        left: `${10 + Math.random() * 80}%`,
      });
    }
  };

  const startTest = () => {
    setPhase('compression');
    setTimeLeft(30);
    setClicks(0);
  };

  const resetTest = () => {
    setPhase('intro');
    setTimeLeft(30);
    setClicks(0);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans selection:bg-red-500/30">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference text-white">
        <Link href="/" className="flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity">
          <ArrowLeft size={20} />
          <span className="font-semibold tracking-tight">SkillByte</span>
        </Link>
        <div className="font-mono text-sm tracking-widest uppercase opacity-70 flex items-center">
          <Clock size={16} className="mr-2" />
          Chrono
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Intro Phase */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 transition-opacity duration-1000 ${phase === 'intro' ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'}`}>
          <div className="max-w-2xl text-center">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              Hack your internal clock.
            </h1>
            <p className="text-xl text-gray-500 font-light leading-relaxed mb-12">
              Time is not a fixed construct. It is a biological illusion dictated by dopamine and attention. 
              This 60-second perception test will prove that you can manually stretch or compress your subjective experience of time.
            </p>
            <button 
              onClick={startTest}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white bg-red-600 rounded-full overflow-hidden transition-transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <Play size={20} className="mr-2 fill-current" />
              Begin Perception Test
            </button>
          </div>
        </div>

        {/* Compression Phase (High Cognitive Load) */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 transition-opacity duration-300 ${phase === 'compression' ? 'opacity-100 z-20' : 'opacity-0 pointer-events-none'}`}>
          {/* Subtle strobe effect overlay */}
          <div className="absolute inset-0 bg-red-500/5 mix-blend-overlay animate-pulse" style={{ animationDuration: '0.5s' }}></div>
          
          <div className="absolute top-24 text-center z-30">
            <h2 className="text-red-500 font-mono tracking-widest uppercase text-sm mb-2">Stage 1: Time Compression</h2>
            <p className="text-white text-lg font-light">Eliminate as many targets as possible.</p>
          </div>
          
          {/* Hidden Timer (User shouldn't see it to experience the illusion) */}
          <div className="absolute bottom-8 right-8 text-zinc-800 font-mono text-xs hidden">
            {timeLeft}s remaining
          </div>

          <div 
            className="absolute text-red-500 cursor-crosshair transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out hover:scale-110 active:scale-95"
            style={{ top: targetPos.top, left: targetPos.left }}
            onClick={handleTargetClick}
          >
            <Target size={64} strokeWidth={1} />
          </div>
        </div>

        {/* Dilation Phase (Sensory Deprivation) */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-white dark:bg-black transition-opacity duration-1000 ${phase === 'dilation' ? 'opacity-100 z-20' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute top-24 text-center z-30">
            <h2 className="text-gray-400 font-mono tracking-widest uppercase text-sm mb-2">Stage 2: Time Dilation</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-light">Stare at the center. Do nothing else.</p>
          </div>

          {/* Breathing Ring */}
          <div className="relative flex items-center justify-center w-64 h-64">
            <div className="absolute inset-0 border-[1px] border-black/20 dark:border-white/20 rounded-full animate-ping" style={{ animationDuration: '8s' }}></div>
            <div className="w-2 h-2 bg-black dark:bg-white rounded-full opacity-30"></div>
          </div>
        </div>

        {/* Results Phase */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-[#0a0a0a] transition-opacity duration-1000 ${phase === 'results' ? 'opacity-100 z-30' : 'opacity-0 pointer-events-none'}`}>
          <div className="max-w-3xl w-full">
            <div className="text-center mb-12">
              <BrainCircuit size={48} className="mx-auto mb-6 text-red-500" strokeWidth={1} />
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">The Illusion Revealed</h2>
              <p className="text-xl text-gray-500 font-light">Which stage felt longer?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white dark:bg-[#1d1d1f] p-8 rounded-3xl shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-red-500/10 rounded-bl-[100px]"></div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-red-500 mb-2">Stage 1</h3>
                <h4 className="text-2xl font-bold mb-4">Compression</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  You clicked <strong>{clicks}</strong> targets. By flooding your brain with stimuli and releasing dopamine, your internal clock (basal ganglia) sped up. 
                  Because your internal clock was ticking faster than external reality, <strong>real time felt like it passed incredibly fast</strong>.
                </p>
                <div className="mt-6 font-mono text-lg font-bold text-black dark:text-white border-t border-gray-100 dark:border-gray-800 pt-4">
                  Actual Time: 30 Seconds
                </div>
              </div>

              <div className="bg-white dark:bg-[#1d1d1f] p-8 rounded-3xl shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-gray-500/5 rounded-bl-[100px]"></div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-gray-500 mb-2">Stage 2</h3>
                <h4 className="text-2xl font-bold mb-4">Dilation</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  By removing all stimuli and forcing sensory deprivation, your dopamine dropped. Your internal clock slowed to a crawl. 
                  Because you were processing fewer &quot;frames per second&quot;, <strong>external reality felt agonizingly slow</strong>.
                </p>
                <div className="mt-6 font-mono text-lg font-bold text-black dark:text-white border-t border-gray-100 dark:border-gray-800 pt-4">
                  Actual Time: 30 Seconds
                </div>
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={resetTest}
                className="inline-flex items-center justify-center px-6 py-3 font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                <RotateCcw size={16} className="mr-2" />
                Run Test Again
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
