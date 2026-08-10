"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity } from 'lucide-react';
import { ResonanceEngine } from '@/components/ResonanceEngine';

export default function ResonancePacer() {
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
        <ResonanceEngine />
      </main>
    </div>
  );
}
