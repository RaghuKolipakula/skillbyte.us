"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Info } from 'lucide-react';
import { ResonanceEngine } from '@/components/ResonanceEngine';
import { ProtocolGuideModal } from '@/components/ProtocolGuideModal';

export default function ResonancePacer() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/30 overflow-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
        <Link href="/" className="flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity">
          <ArrowLeft size={20} />
          <span className="font-semibold tracking-tight">SkillByte</span>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="font-mono text-sm tracking-widest uppercase opacity-70 flex items-center">
            <Activity size={16} className="mr-2" />
            Resonance
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
      <main className="h-screen w-full flex flex-col items-center justify-center relative">
        <ResonanceEngine />
      </main>

      <ProtocolGuideModal 
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        title="Resonance Pacer"
        description="A breathing metronome set to 5.5 breaths per minute—the exact frequency proven to maximize Heart Rate Variability (HRV)."
        steps={[
          { title: "The Inhale", description: "Inhale smoothly through your nose for 5.5 seconds as the ring expands." },
          { title: "The Exhale", description: "Exhale passively through your nose or mouth for 5.5 seconds as the ring contracts." },
          { title: "The Goal", description: "Follow the metronome for 5 full minutes to shift your nervous system out of 'fight-or-flight' and into a restorative parasympathetic state." }
        ]}
      />
    </div>
  );
}
