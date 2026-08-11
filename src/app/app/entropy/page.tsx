"use client";

import React, { useState } from 'react';
import { EntropyEngine } from '@/components/EntropyEngine';
import Link from 'next/link';
import { Home, Info } from 'lucide-react';
import { ProtocolGuideModal } from '@/components/ProtocolGuideModal';

export default function EntropyPage() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <main className="w-full h-screen bg-black overflow-hidden relative">
      
      {/* Stealth Navigation (White icons for dark mode) */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-auto">
        <Link 
          href="/" 
          className="text-white/30 hover:text-white transition-colors flex items-center space-x-2"
        >
          <Home size={20} />
          <span className="text-sm font-medium tracking-wide">SkillByte</span>
        </Link>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsGuideOpen(true)}
            className="text-white/30 hover:text-white transition-colors"
          >
            <Info size={20} />
          </button>
        </div>
      </div>

      <ProtocolGuideModal 
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        title="The Entropy Engine"
        description="A visual simulation of wasted potential governed by the Second Law of Thermodynamics. The moment you lose focus, your reality degrades into chaos."
        steps={[
          {
            title: "1. The Lock",
            description: "Press and hold anywhere on the screen to impose order. A low-entropy lattice will form."
          },
          {
            title: "2. The Maintenance",
            description: "To maintain the pristine state, you must maintain absolute focus. Do not release your hold."
          },
          {
            title: "3. The Decay",
            description: "The instant you break contact, order collapses. Particles scatter, bonds break, and the system plunges into maximum entropy."
          }
        ]}
      />

      <EntropyEngine />
    </main>
  );
}
