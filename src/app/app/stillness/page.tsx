"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Target } from 'lucide-react';
import { StillnessEngine } from '@/components/StillnessEngine';

export default function StillnessEnginePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/30 overflow-hidden relative">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
        <Link href="/" className="flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity">
          <ArrowLeft size={20} />
          <span className="font-semibold tracking-tight">SkillByte</span>
        </Link>
        <div className="font-mono text-sm tracking-widest uppercase opacity-70 flex items-center">
          <Target size={16} className="mr-2" />
          The Stillness Engine
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-12">
        <StillnessEngine />
      </main>
    </div>
  );
}
