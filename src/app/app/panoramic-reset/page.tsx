"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  Eye, 
  Play, 
  Square,
  Activity,
  Wind
} from 'lucide-react';

export default function PanoramicReset() {
  const [activeTab, setActiveTab] = useState<'science' | 'hack'>('science');
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const handleStart = () => {
    setIsTimerActive(true);
    setTimeLeft(30);
  };

  const handleEnd = () => {
    setIsTimerActive(false);
    setTimeLeft(30);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-blue-500/30">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <span className="font-semibold text-black dark:text-white tracking-tight">Panoramic Reset</span>
          </div>
          
          <div className="flex bg-gray-100 dark:bg-[#1d1d1f] rounded-full p-1">
            <button 
              onClick={() => setActiveTab('science')}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${activeTab === 'science' ? 'bg-white dark:bg-black text-black dark:text-white shadow-sm' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
            >
              The Science
            </button>
            <button 
              onClick={() => setActiveTab('hack')}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${activeTab === 'hack' ? 'bg-white dark:bg-black text-black dark:text-white shadow-sm' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
            >
              The Hack
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-32 max-w-5xl mx-auto px-4">
        
        {activeTab === 'science' ? (
          <div className="space-y-16 animate-in fade-in duration-500 mt-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black dark:text-white mb-6">
                Turn off stress with your eyes.
              </h1>
              <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed">
                A biological hack that sounds made up, but is hardwired into human neurology.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-gray-800">
                <Image src="/images/focal_vision.jpg" alt="Focal Vision" fill className="object-cover" />
              </div>
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 text-red-500 bg-red-500/10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
                  <Activity size={14} />
                  <span>The Problem</span>
                </div>
                <h2 className="text-3xl font-bold text-black dark:text-white tracking-tight">The Focal Vision Trap</h2>
                <p className="text-lg text-gray-500 leading-relaxed">
                  When you are intensely focused on a single point—like tracking a complex dataset, staring at a monitor, or debugging a line of code—your visual field narrows.
                </p>
                <p className="text-lg text-gray-500 leading-relaxed">
                  This "focal vision" doesn't just happen because you are concentrating; it actually operates as a feedback loop. Narrowing your gaze actively triggers your <strong>sympathetic nervous system</strong>, telling your brain to release adrenaline and stay on high alert. Over hours of deep work, that low-grade alertness turns into tension and mental fatigue.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 md:order-1 order-2">
                <div className="inline-flex items-center space-x-2 text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest">
                  <Wind size={14} />
                  <span>The Solution</span>
                </div>
                <h2 className="text-3xl font-bold text-black dark:text-white tracking-tight">Panoramic Vision</h2>
                <p className="text-lg text-gray-500 leading-relaxed">
                  When you feel that friction building, walk to a window and look out at the horizon. Don't focus on a specific object; just let your gaze widen so you are taking in the entire periphery of your environment at once.
                </p>
                <p className="text-lg text-gray-500 leading-relaxed">
                  Expanding your visual field mechanically signals your brain stem to activate the <strong>parasympathetic nervous system</strong>. It acts as an instant, biological brake pedal for stress. Your breathing slows down, your heart rate drops, and that coiled-up tension in your neck releases—all because you spent 30 seconds looking at a wider space.
                </p>
              </div>
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-gray-800 md:order-2 order-1">
                <Image src="/images/panoramic_vision.jpg" alt="Panoramic Vision" fill className="object-cover" />
              </div>
            </div>

            <div className="flex justify-center mt-12">
              <button 
                onClick={() => setActiveTab('hack')}
                className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-transform shadow-lg"
              >
                Try The Hack
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in zoom-in duration-500 mt-12">
            
            {!isTimerActive && timeLeft === 30 ? (
              <div className="text-center max-w-md">
                <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-blue-500">
                  <Eye size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-4">30-Second Reset</h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  Look out a window or at a far wall. Do not focus on any single object. Soften your gaze and try to see the entire periphery of your vision at once.
                </p>
                <button 
                  onClick={handleStart}
                  className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-transform w-full flex items-center justify-center space-x-2"
                >
                  <Play size={20} className="fill-current" />
                  <span>Start Timer</span>
                </button>
              </div>
            ) : timeLeft > 0 ? (
              <div className="text-center">
                <p className="text-xl text-gray-500 font-light mb-8 uppercase tracking-widest animate-pulse">Expand your visual field</p>
                <div className="text-[120px] md:text-[200px] font-bold tracking-tighter leading-none mb-12 tabular-nums text-blue-500 transition-colors duration-1000">
                  0:{timeLeft < 10 ? '0' : ''}{timeLeft}
                </div>
                <button 
                  onClick={handleEnd}
                  className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-[#1d1d1f] flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  <Square size={24} className="fill-current" />
                </button>
              </div>
            ) : (
              <div className="text-center max-w-md animate-in slide-in-from-bottom-8">
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500">
                  <Wind size={40} />
                </div>
                <h2 className="text-3xl font-bold mb-4">Reset Complete</h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  Your parasympathetic nervous system is now active. You should feel a slight drop in heart rate and tension.
                </p>
                <button 
                  onClick={handleEnd}
                  className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-transform w-full"
                >
                  Finish
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
