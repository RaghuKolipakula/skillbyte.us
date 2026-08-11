"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Target, Info } from 'lucide-react';
import { StillnessEngine } from '@/components/StillnessEngine';
import { ProtocolGuideModal } from '@/components/ProtocolGuideModal';

export default function StillnessEnginePage() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/30 overflow-hidden relative">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
        <Link href="/" className="flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity">
          <ArrowLeft size={20} />
          <span className="font-semibold tracking-tight">SkillByte</span>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="font-mono text-sm tracking-widest uppercase opacity-70 flex items-center">
            <Target size={16} className="mr-2" />
            The Stillness Engine
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
      <main className="min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-12">
        <StillnessEngine />
      </main>

      <ProtocolGuideModal 
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        title="The Stillness Engine"
        description="A strict physical and mental discipline tool designed to train impulse inhibition. You must conquer the physical urge to twitch."
        steps={[
          { title: "The Engagement", description: "Move your cursor exactly into the center of the ring. The coordinate tracking is microscopic." },
          { title: "The Lock", description: "Click once to lock your position and initiate the shrinking boundary." },
          { title: "The Discipline", description: "Do not move. If your cursor touches the shrinking ring, the session will instantly fail and reset." },
          { title: "The Escaping", description: "The difficulty escalates based on your Ledger history. Complete the required duration to log a 'Proof of Stillness' token." }
        ]}
      />
    </div>
  );
}
