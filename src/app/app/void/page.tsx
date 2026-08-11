"use client";

import React, { useState } from 'react';
import { VoidEngine } from '@/components/VoidEngine';
import Link from 'next/link';
import { Home, Info } from 'lucide-react';
import { ProtocolGuideModal } from '@/components/ProtocolGuideModal';

export default function VoidPage() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <main className="w-full h-screen bg-black overflow-hidden relative">
      
      {/* Stealth Navigation */}
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
        title="The Void Engine"
        description="A sensory-deprivation reaction test. You are entirely blind. Only your neural pathways and auditory cortex can save you."
        steps={[
          {
            title: "1. The Isolation",
            description: "Put on headphones. Ensure you are in a quiet environment. The screen will go completely black."
          },
          {
            title: "2. The Cue",
            description: "Listen carefully. You will hear a spatial ping panned entirely to either your left or right ear."
          },
          {
            title: "3. The Reaction",
            description: "Instantly tap the corresponding side of the screen (Left or Right). The time window shrinks exponentially with every success."
          }
        ]}
      />

      <VoidEngine />
    </main>
  );
}
