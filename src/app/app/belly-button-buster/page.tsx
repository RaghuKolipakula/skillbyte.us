"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Flame, 
  Play, 
  Pause, 
  Square, 
  CheckCircle2, 
  Lock, 
  ShoppingCart,
  Activity,
  CalendarDays,
  ChevronRight,
  Info
} from 'lucide-react';

export default function BellyButtonBuster() {
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isPaused, setIsPaused] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(4);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isWorkoutActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isWorkoutActive) {
      setIsWorkoutActive(false);
      setCurrentStreak(prev => prev + 1); // Simulate streak increment on completion
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive, isPaused, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleStart = () => {
    setIsWorkoutActive(true);
    setIsPaused(false);
    setTimeLeft(300);
  };

  const handleEnd = () => {
    setIsWorkoutActive(false);
    setIsPaused(false);
    setTimeLeft(300);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-black font-sans transition-colors duration-300">
      
      {/* 1. App Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#ffffffcc] dark:bg-[#000000cc] backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <span className="font-semibold text-black dark:text-white tracking-tight">Belly Button Buster</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-1.5 bg-orange-500/10 dark:bg-orange-500/20 px-3 py-1 rounded-full">
              <Flame size={16} className="text-orange-500" />
              <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{currentStreak}</span>
            </div>
            
            {!isPro ? (
              <button 
                onClick={() => setIsPro(true)} // Mocking stripe redirect
                className="text-xs font-semibold uppercase tracking-wider text-white bg-black dark:bg-white dark:text-black px-3 py-1.5 rounded-full hover:scale-105 transition-transform"
              >
                Upgrade
              </button>
            ) : (
              <span className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
                Pro Member
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-24 pb-20 px-4 max-w-5xl mx-auto">
        
        {!isWorkoutActive ? (
          <div className="space-y-12 fade-in">
            
            {/* Header */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-2">
                Good morning.
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-light">
                Ready to reverse that desk posture?
              </p>
            </div>

            {/* 2. Dashboard (Bento Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Today's Micro-Burn (Large) */}
              <div className="md:col-span-2 bg-white dark:bg-[#1d1d1f] rounded-3xl p-8 flex flex-col justify-between shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-20 pointer-events-none">
                  <Activity size={120} />
                </div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center space-x-1 bg-green-500/10 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                    <CheckCircle2 size={14} className="mr-1" />
                    Day {currentStreak + 1}
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-black dark:text-white mb-2">
                    Transverse Abdominis Activation
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-8">
                    A 5-minute deep core routine designed to pull your midsection tight and relieve lower back pressure.
                  </p>
                </div>
                
                <div className="relative z-10 flex">
                  <button 
                    onClick={handleStart}
                    className="w-full sm:w-auto bg-[#32d74b] text-black font-semibold text-lg px-8 py-4 rounded-full flex items-center justify-center hover:bg-[#2fc945] hover:scale-105 transition-all shadow-lg shadow-green-500/20"
                  >
                    <Play size={20} className="mr-2 fill-current" /> Start Workout
                  </button>
                </div>
              </div>

              {/* Card 2: Consistency Calendar */}
              <div className="bg-white dark:bg-[#1d1d1f] rounded-3xl p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-black dark:text-white flex items-center">
                      <CalendarDays size={18} className="mr-2 text-gray-400" /> Consistency
                    </h3>
                  </div>
                  {/* Minimalist Grid for streak */}
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 7 }).map((_, i) => {
                      const isCompleted = i < currentStreak % 7;
                      const isToday = i === currentStreak % 7;
                      return (
                        <div 
                          key={i} 
                          className={`aspect-square rounded-full flex items-center justify-center text-xs font-medium
                            ${isCompleted ? 'bg-orange-500 text-white' : 
                              isToday ? 'bg-orange-500/20 text-orange-600 border border-orange-500/50' : 
                              'bg-gray-100 dark:bg-white/5 text-gray-400'}`}
                        >
                          {i + 1}
                        </div>
                      )
                    })}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4 text-center font-medium">
                  {7 - (currentStreak % 7)} days left to perfect week.
                </p>
              </div>

              {/* Card 3: Muscle Heatmap */}
              <div className="md:col-span-2 bg-white dark:bg-[#1d1d1f] rounded-3xl p-6 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5 flex items-center space-x-6 overflow-hidden">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#32d74b]/20 to-emerald-600/40 border border-[#32d74b]/30 flex items-center justify-center flex-shrink-0">
                  <Activity size={32} className="text-[#32d74b]" />
                </div>
                <div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">Target: TVA & Obliques</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Today's session heavily targets the deep abdominal wall to create a natural corset effect around your spine.
                  </p>
                </div>
              </div>

              {/* Card 4: Posture Reset */}
              <div className="bg-[#1d1d1f] dark:bg-[#111] text-white rounded-3xl p-6 shadow-sm relative overflow-hidden group cursor-pointer hover:bg-black transition-colors flex flex-col justify-between">
                <div>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/20 rounded-bl-full pointer-events-none"></div>
                  <h3 className="font-semibold mb-2 text-blue-400">Posture Tip</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Stand up and squeeze your glutes for 10 seconds to reset your pelvic tilt.
                  </p>
                </div>
                <div className="text-xs font-medium uppercase tracking-wider text-gray-500 group-hover:text-white transition-colors flex items-center">
                  Learn more <ChevronRight size={14} className="ml-1" />
                </div>
              </div>
            </div>

            {/* 4. Pro Upgrade Section */}
            {!isPro && (
              <section className="mt-16 bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-green-500/10 blur-3xl rounded-full pointer-events-none"></div>
                
                <div className="max-w-2xl relative z-10">
                  <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                    <Lock size={14} className="text-green-400" />
                    <span>Unlock Buster Pro</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    Take your core training to the elite level.
                  </h2>
                  <p className="text-gray-400 text-lg mb-8">
                    Pro unlocks weighted power movements, dynamic progression logging, and custom analytics tailored to your posture flaws.
                  </p>
                  
                  <button 
                    onClick={() => setIsPro(true)}
                    className="bg-white text-black font-semibold px-8 py-3 rounded-full hover:scale-105 transition-transform"
                  >
                    Upgrade via Stripe — $4.99/mo
                  </button>
                </div>
              </section>
            )}

            {/* 5. Trainer's Kit Section */}
            <section className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">
                  Recommended Gear for Desk Workers
                </h2>
                <span className="text-xs text-gray-400 uppercase tracking-wider font-medium flex items-center">
                  <Info size={14} className="mr-1" /> Affiliate Links
                </span>
              </div>
              
              {/* Horizontal Scroll or Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                
                {/* Product 1 */}
                <div className="bg-white dark:bg-[#1d1d1f] rounded-2xl p-4 ring-1 ring-gray-900/5 dark:ring-white/5 flex flex-col group hover:shadow-lg transition-all">
                  <div className="aspect-square rounded-xl bg-gray-100 dark:bg-black/50 mb-4 flex items-center justify-center relative overflow-hidden">
                    <span className="text-xs text-gray-400 absolute">Image Placeholder</span>
                  </div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">Ergonomic Ab Roller</h3>
                  <p className="text-sm text-gray-500 mb-4 flex-grow">Ultra-wide wheel design for stability during advanced rollouts.</p>
                  <button className="w-full py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-lg text-sm font-medium text-black dark:text-white transition-colors flex items-center justify-center">
                    <ShoppingCart size={16} className="mr-2" /> View on Amazon
                  </button>
                </div>

                {/* Product 2 */}
                <div className="bg-white dark:bg-[#1d1d1f] rounded-2xl p-4 ring-1 ring-gray-900/5 dark:ring-white/5 flex flex-col group hover:shadow-lg transition-all">
                  <div className="aspect-square rounded-xl bg-gray-100 dark:bg-black/50 mb-4 flex items-center justify-center relative overflow-hidden">
                    <span className="text-xs text-gray-400 absolute">Image Placeholder</span>
                  </div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">Posture Resistance Bands</h3>
                  <p className="text-sm text-gray-500 mb-4 flex-grow">Lightweight bands perfect for face-pulls to fix rounded shoulders.</p>
                  <button className="w-full py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-lg text-sm font-medium text-black dark:text-white transition-colors flex items-center justify-center">
                    <ShoppingCart size={16} className="mr-2" /> View on Amazon
                  </button>
                </div>

                {/* Product 3 */}
                <div className="bg-white dark:bg-[#1d1d1f] rounded-2xl p-4 ring-1 ring-gray-900/5 dark:ring-white/5 flex flex-col group hover:shadow-lg transition-all">
                  <div className="aspect-square rounded-xl bg-gray-100 dark:bg-black/50 mb-4 flex items-center justify-center relative overflow-hidden">
                    <span className="text-xs text-gray-400 absolute">Image Placeholder</span>
                  </div>
                  <h3 className="font-semibold text-black dark:text-white mb-1">Lumber Support Pillow</h3>
                  <p className="text-sm text-gray-500 mb-4 flex-grow">Memory foam support to maintain neutral spine while working.</p>
                  <button className="w-full py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 rounded-lg text-sm font-medium text-black dark:text-white transition-colors flex items-center justify-center">
                    <ShoppingCart size={16} className="mr-2" /> View on Amazon
                  </button>
                </div>

              </div>
            </section>

          </div>
        ) : (
          
          /* 3. The Workout Interface (Active State) */
          <div className="fixed inset-0 z-40 bg-white dark:bg-black flex flex-col items-center justify-center px-4 fade-in">
            
            <div className="absolute top-24 text-center">
              <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-[#1d1d1f] px-4 py-1.5 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-widest mb-4">
                Movement 1 of 5
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black dark:text-white">
                Hollow Body Hold
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">Up next: Plank with Shoulder Taps</p>
            </div>

            {/* Massive Timer */}
            <div className={`text-[120px] md:text-[240px] font-bold tracking-tighter leading-none mb-12 tabular-nums transition-colors duration-300 ${isPaused ? 'text-gray-300 dark:text-gray-800' : 'text-[#32d74b]'}`}>
              {formatTime(timeLeft)}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-8">
              <button 
                onClick={handleEnd}
                className="w-16 h-16 rounded-full bg-gray-100 dark:bg-[#1d1d1f] flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                aria-label="End Workout"
              >
                <Square size={24} className="fill-current" />
              </button>
              
              <button 
                onClick={() => setIsPaused(!isPaused)}
                className="w-24 h-24 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black hover:scale-105 transition-transform shadow-2xl"
                aria-label={isPaused ? "Resume" : "Pause"}
              >
                {isPaused ? <Play size={40} className="fill-current ml-2" /> : <Pause size={40} className="fill-current" />}
              </button>
            </div>
            
          </div>
        )}
      </main>

      {/* Global CSS for animations */}
      <style dangerouslySetInnerHTML={{__html: `
        .fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
