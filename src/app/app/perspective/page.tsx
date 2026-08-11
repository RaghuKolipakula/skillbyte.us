"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ZoomOut, Info } from 'lucide-react';
import { PerspectiveEngine } from '@/components/PerspectiveEngine';
import { ProtocolGuideModal } from '@/components/ProtocolGuideModal';

export default function PerspectivePage() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/30 overflow-hidden relative">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
        <Link href="/" className="flex items-center space-x-2 opacity-70 hover:opacity-100 transition-opacity">
          <ArrowLeft size={20} />
          <span className="font-semibold tracking-tight">SkillByte</span>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="font-mono text-sm tracking-widest uppercase opacity-70 flex items-center">
            <ZoomOut size={16} className="mr-2" />
            The Perspective Engine
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
      <main className="h-screen w-full">
        <PerspectiveEngine />
      </main>

      <ProtocolGuideModal 
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        title="The Perspective Engine"
        description="A cognitive recalibrator designed to instantly neutralize anxiety by forcing a simulated 'Overview Effect'."
        steps={[
          { title: "The Input", description: "Type exactly what is consuming your mind right now. Be specific." },
          { title: "The Scale", description: "Press 'Scale It' to mathematically map your problem against the deep time of the universe." },
          { title: "The Realization", description: "Watch your anxiety shrink to a microscopic dot against a 13.8 billion-year timeline." },
          { title: "The Export", description: "Take a screenshot of the final frame to remind yourself of your insignificance." }
        ]}
      />
    </div>
  );
}
