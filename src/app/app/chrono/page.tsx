"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Info } from 'lucide-react';
import { ChronoEngine } from '@/components/ChronoEngine';
import { ProtocolGuideModal } from '@/components/ProtocolGuideModal';

export default function ChronoApp() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans selection:bg-red-500/30">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference text-white">
        <Link href="/" className="flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity">
          <ArrowLeft size={20} />
          <span className="font-semibold tracking-tight">SkillByte</span>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="font-mono text-sm tracking-widest uppercase opacity-70 flex items-center">
            <Clock size={16} className="mr-2" />
            Chrono
          </div>
          <button 
            onClick={() => setIsGuideOpen(true)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <Info size={16} />
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
        <ChronoEngine />
      </main>

      <ProtocolGuideModal 
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        title="Chrono Engine"
        description="A 60-second subjective time perception test demonstrating how dopamine and attention stretch or compress your experience of time."
        steps={[
          { title: "The Compression Phase", description: "For the first 30 seconds, click the moving targets as fast as you possibly can. High cognitive load compresses time." },
          { title: "The Dilation Phase", description: "For the next 30 seconds, stare directly at the red center dot and do absolutely nothing. Boredom and low cognitive load dilate time." },
          { title: "The Results", description: "Reflect on how the second 30 seconds felt significantly longer than the first 30 seconds." }
        ]}
      />
    </div>
  );
}
