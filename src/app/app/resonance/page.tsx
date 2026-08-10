"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Play, Square } from 'lucide-react';

export default function ResonancePacer() {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [phase, setPhase] = useState<'inhale' | 'exhale'>('exhale'); // start by instructing inhale
  
  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setTimeout(() => {
        setIsActive(false);
        setPhase('exhale'); // reset to default collapsed state
      }, 0);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Breathing cycle logic (5.5s inhale, 5.5s exhale)
  useEffect(() => {
    let phaseInterval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      // Trigger first inhale immediately
      setTimeout(() => setPhase('inhale'), 0);
      
      phaseInterval = setInterval(() => {
        setPhase((p) => (p === 'inhale' ? 'exhale' : 'inhale'));
      }, 5500);
    } else {
      setTimeout(() => setPhase('exhale'), 0);
    }
    return () => clearInterval(phaseInterval);
  }, [isActive, timeLeft]);

  const toggleSession = () => {
    if (isActive) {
      setIsActive(false);
      setTimeLeft(180);
      setPhase('exhale');
    } else {
      setIsActive(true);
      if (timeLeft === 0) setTimeLeft(180);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/30 overflow-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
        <Link href="/" className="flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity">
          <ArrowLeft size={20} />
          <span className="font-semibold tracking-tight">SkillByte</span>
        </Link>
        <div className="font-mono text-sm tracking-widest uppercase opacity-70 flex items-center">
          <Activity size={16} className="mr-2" />
          Resonance
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="h-screen w-full flex flex-col items-center justify-center relative">
        
        {/* Intro text fades out when active */}
        <div className={`absolute top-32 text-center transition-opacity duration-1000 z-10 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
            The Oxygen Quotient.
          </h1>
          <p className="text-lg text-gray-400 font-light max-w-md mx-auto leading-relaxed">
            Sync your breath to the 5.5-second resonance frequency. Rebalance your autonomic nervous system in 3 minutes.
          </p>
        </div>

        {/* The Breathing Engine (Visual) */}
        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center z-0 mt-12">
          {/* Inner solid core */}
          <div 
            className="absolute rounded-full bg-white transition-transform ease-in-out"
            style={{
              width: '100%',
              height: '100%',
              transitionDuration: '5500ms',
              transform: phase === 'inhale' ? 'scale(1)' : 'scale(0.3)',
              opacity: phase === 'inhale' ? 0.1 : 0.05
            }}
          ></div>
          
          {/* Outer glowing ring */}
          <div 
            className="absolute rounded-full border border-white transition-all ease-in-out"
            style={{
              width: '100%',
              height: '100%',
              transitionDuration: '5500ms',
              transform: phase === 'inhale' ? 'scale(1)' : 'scale(0.4)',
              opacity: phase === 'inhale' ? 0.8 : 0.2,
              boxShadow: phase === 'inhale' ? '0 0 40px rgba(255,255,255,0.2)' : 'none'
            }}
          ></div>

          {/* Core dot */}
          <div className="w-2 h-2 bg-white rounded-full opacity-50 z-10"></div>
          
          {/* Breathing Instruction Text */}
          <div className={`absolute z-20 text-4xl font-light tracking-widest uppercase transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            {phase === 'inhale' ? 'Inhale' : 'Exhale'}
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-16 flex flex-col items-center z-10">
          <div className={`font-mono text-xl tracking-widest mb-8 transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            {formatTime(timeLeft)}
          </div>
          
          <button 
            onClick={toggleSession}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black bg-white rounded-full overflow-hidden transition-transform hover:scale-105"
          >
            {isActive ? (
              <>
                <Square size={16} className="mr-2 fill-current" />
                Stop Protocol
              </>
            ) : (
              <>
                <Play size={16} className="mr-2 fill-current" />
                Begin Protocol
              </>
            )}
          </button>
        </div>

      </main>
    </div>
  );
}
