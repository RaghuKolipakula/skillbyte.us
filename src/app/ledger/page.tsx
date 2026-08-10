"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Wind, Timer, Dumbbell, Calendar } from 'lucide-react';
import { useLedger } from '@/lib/useLedger';

export default function LedgerDashboard() {
  const { ledger, isLoaded } = useLedger();

  if (!isLoaded) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading Ledger...</div>;
  }

  // Derived stats
  const bestChrono = ledger.chronoScores.length > 0 ? Math.max(...ledger.chronoScores) : 0;
  const avgChrono = ledger.chronoScores.length > 0 
    ? Math.round(ledger.chronoScores.reduce((a, b) => a + b, 0) / ledger.chronoScores.length) 
    : 0;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/30 p-6 md:p-12">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center mb-16">
        <Link href="/" className="flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity">
          <ArrowLeft size={20} />
          <span className="font-semibold tracking-tight">SkillByte</span>
        </Link>
        <div className="font-mono text-sm tracking-widest uppercase opacity-70 flex items-center">
          <Zap size={16} className="mr-2" />
          Identity Ledger
        </div>
      </nav>

      <main className="max-w-6xl mx-auto">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            The Ledger.
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
            Your neuro-plasticity and physical conditioning dashboard. Every session compounds. 
          </p>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Streak Tile */}
          <div className="md:col-span-2 bg-[#111] border border-gray-800 rounded-3xl p-10 flex flex-col justify-between group hover:border-gray-600 transition-colors">
            <div className="flex items-center space-x-3 text-orange-500 mb-8">
              <Zap size={24} />
              <span className="font-mono tracking-widest uppercase text-sm font-bold">Current Streak</span>
            </div>
            <div>
              <div className="text-8xl md:text-9xl font-bold tracking-tighter mb-2">
                {ledger.currentStreak}<span className="text-4xl text-gray-600 ml-2">Days</span>
              </div>
              <p className="text-gray-500 text-lg">Consecutive days optimizing your biology.</p>
            </div>
          </div>

          {/* Resonance Pacer Tile */}
          <div className="bg-[#111] border border-gray-800 rounded-3xl p-10 flex flex-col justify-between group hover:border-gray-600 transition-colors relative overflow-hidden">
            {/* Background glowing ring */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 border-[20px] border-cyan-900 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-1000"></div>
            <div className="flex items-center space-x-3 text-cyan-400 mb-8 z-10">
              <Wind size={20} />
              <span className="font-mono tracking-widest uppercase text-sm font-bold">Resonance</span>
            </div>
            <div className="z-10">
              <div className="text-6xl font-bold tracking-tighter mb-2">
                {ledger.resonanceSessions}
              </div>
              <p className="text-gray-500">Completed 3-minute sessions.</p>
            </div>
          </div>

          {/* Chrono Perception Tile */}
          <div className="bg-[#111] border border-gray-800 rounded-3xl p-10 flex flex-col justify-between group hover:border-gray-600 transition-colors relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <Timer size={120} />
             </div>
            <div className="flex items-center space-x-3 text-purple-400 mb-8 z-10">
              <Timer size={20} />
              <span className="font-mono tracking-widest uppercase text-sm font-bold">Chrono Focus</span>
            </div>
            <div className="z-10">
              <div className="text-5xl font-bold tracking-tighter mb-4">
                {bestChrono}<span className="text-2xl text-gray-600 ml-1">pts best</span>
              </div>
              <div className="flex justify-between items-center text-gray-500 border-t border-gray-800 pt-4 mt-4">
                <span>Average Score</span>
                <span className="font-mono text-white">{avgChrono}</span>
              </div>
              <div className="flex justify-between items-center text-gray-500 mt-2">
                <span>Total Attempts</span>
                <span className="font-mono text-white">{ledger.chronoScores.length}</span>
              </div>
            </div>
          </div>

          {/* Belly Fat Buster Tile */}
          <div className="bg-[#111] border border-gray-800 rounded-3xl p-10 flex flex-col justify-between group hover:border-gray-600 transition-colors relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <Dumbbell size={120} />
             </div>
            <div className="flex items-center space-x-3 text-red-500 mb-8 z-10">
              <Dumbbell size={20} />
              <span className="font-mono tracking-widest uppercase text-sm font-bold">Core Conditioning</span>
            </div>
            <div className="z-10">
              <div className="text-6xl font-bold tracking-tighter mb-2">
                {ledger.bellyFatWorkouts}
              </div>
              <p className="text-gray-500">Workouts completed.</p>
            </div>
          </div>
          
          {/* Last Active Tile */}
          <div className="bg-[#111] border border-gray-800 rounded-3xl p-10 flex flex-col justify-center group hover:border-gray-600 transition-colors">
            <div className="flex items-center space-x-3 text-gray-400 mb-4">
              <Calendar size={20} />
              <span className="font-mono tracking-widest uppercase text-sm font-bold">Last Protocol</span>
            </div>
            <div className="text-2xl font-light text-gray-300">
              {ledger.lastActiveDate ? new Date(ledger.lastActiveDate).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Never'}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
