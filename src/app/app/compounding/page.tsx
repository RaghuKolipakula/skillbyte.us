"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Info } from 'lucide-react';
import { CompoundingEngine } from '@/components/CompoundingEngine';
import { ProtocolGuideModal } from '@/components/ProtocolGuideModal';

export default function CompoundingApp() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/30 overflow-hidden relative">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference pointer-events-auto">
        <Link href="/" className="flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity">
          <ArrowLeft size={20} />
          <span className="font-semibold tracking-tight">SkillByte</span>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="font-mono text-sm tracking-widest uppercase opacity-70 flex items-center">
            <Activity size={16} className="mr-2" />
            Compounding
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
      <main className="min-h-screen w-full flex flex-col items-center justify-center relative">
        <CompoundingEngine />
      </main>

      <ProtocolGuideModal 
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        title="The Exponential Illusion"
        description="A visual simulation of compound interest designed to break our linear processing limitations."
        steps={[
          { title: "The Linear Trap", description: "Human intuition evolved for linear tracking. When you start, growth feels agonizingly slow and you want to quit." },
          { title: "The Hold", description: "Keep pressing the button to advance time. At 5% compounding per tick, watch how long it takes to feel meaningful." },
          { title: "The Elbow", description: "Witness the moment compounding hits critical mass and shifts into a parabolic cascade." }
        ]}
      />
    </div>
  );
}
