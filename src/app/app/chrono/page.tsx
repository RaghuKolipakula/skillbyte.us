"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { ChronoEngine } from '@/components/ChronoEngine';

export default function ChronoApp() {
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
        <ChronoEngine />
      </main>
    </div>
  );
}
