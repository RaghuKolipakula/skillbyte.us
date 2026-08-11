"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Info } from 'lucide-react';
import { ApneaProtocol } from '@/components/ApneaProtocol';
import { ProtocolGuideModal } from '@/components/ProtocolGuideModal';

export default function ApneaProtocolPage() {
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
            The Apnea Protocol
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
        <ApneaProtocol />
      </main>

      <ProtocolGuideModal 
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        title="The Apnea Protocol"
        description="A biological diagnostic test to measure and expand your physiological panic threshold by safely accumulating CO2 in your bloodstream."
        steps={[
          { title: "The Preparation", description: "Follow the visual pacer for three deep, cyclical breaths to oxygenate your system." },
          { title: "The Apex Inhale", description: "On the final prompt, take the deepest breath you possibly can, filling your lungs entirely." },
          { title: "The Hold", description: "Click 'Start Timer' the moment you begin to exhale. Hold your breath for as long as humanly possible." },
          { title: "The Breaking Point", description: "The moment you gasp or break form, click 'I Broke'. The engine will analyze your CO2 tolerance tier." }
        ]}
      />
    </div>
  );
}
