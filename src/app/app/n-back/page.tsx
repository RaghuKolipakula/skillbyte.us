"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Settings2, Info } from 'lucide-react';
import { NBackEngine } from '@/components/NBackEngine';
import { ProtocolGuideModal } from '@/components/ProtocolGuideModal';

export default function NBackPage() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      
      {/* Stealth Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
        <Link href="/" className="flex items-center space-x-2 opacity-40 hover:opacity-100 transition-opacity">
          <ArrowLeft size={20} />
          <span className="font-semibold tracking-tight text-sm uppercase">Exit Matrix</span>
        </Link>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsGuideOpen(true)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <Info size={16} />
          </button>
          <button className="opacity-40 hover:opacity-100 transition-opacity">
            <Settings2 size={20} />
          </button>
        </div>
      </nav>

      {/* Main Interface */}
      <main className="w-full min-h-screen flex flex-col items-center justify-center pt-20 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">N-Back Matrix</h1>
          <p className="text-gray-500 font-mono text-xs tracking-widest uppercase">Cognitive Endurance Protocol</p>
        </div>
        
        <NBackEngine />
        
        <div className="mt-12 text-center text-xs text-gray-600 font-mono max-w-md px-4">
          <p className="mb-2">Keyboard Shortcuts:</p>
          <p>Press <strong className="text-gray-300">A</strong> for Position Match.</p>
          <p>Press <strong className="text-gray-300">L</strong> for Audio Match.</p>
        </div>
      </main>

      <ProtocolGuideModal 
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        title="Dual N-Back Matrix"
        description="A brutal working memory protocol proven to expand fluid intelligence. You must track two independent streams of information simultaneously."
        steps={[
          { title: "The Premise", description: "Every 2.5 seconds, a square will light up in the grid, AND a letter will be spoken aloud." },
          { title: "N-Level Matching", description: "If N=1, you must remember the previous turn. If N=2, you must remember 2 turns ago. And so on." },
          { title: "Visual Match (Press 'A')", description: "If the current square matches the square from N turns ago, press 'A' (or tap the Position Match button)." },
          { title: "Audio Match (Press 'L')", description: "If the current spoken letter matches the letter from N turns ago, press 'L' (or tap the Audio Match button)." }
        ]}
      />
    </div>
  );
}
