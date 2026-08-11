"use client";

import React, { useState } from 'react';
import { HallucinationEngine } from '@/components/HallucinationEngine';
import Link from 'next/link';
import { Home, Info } from 'lucide-react';
import { ProtocolGuideModal } from '@/components/ProtocolGuideModal';

export default function HallucinationPage() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <main className="w-full h-screen bg-white overflow-hidden relative">
      
      {/* Stealth Navigation */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-auto">
        <Link 
          href="/" 
          className="text-black/30 hover:text-black transition-colors flex items-center space-x-2"
        >
          <Home size={20} />
          <span className="text-sm font-medium tracking-wide">SkillByte</span>
        </Link>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsGuideOpen(true)}
            className="text-black/30 hover:text-black transition-colors"
          >
            <Info size={20} />
          </button>
        </div>
      </div>

      <ProtocolGuideModal 
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        title="The Hallucination Engine"
        description="A biological proof that your reality is rendered by your brain's architecture. This engine demonstrates the optic disc blind spot to prove that your visual field is actively hallucinated."
        steps={[
          {
            title: "1. The Setup",
            description: "You will be presented with a cross on the left and a circle on the right."
          },
          {
            title: "2. The Lock",
            description: "Close your left eye. Stare directly at the cross with your right eye. Do not let your gaze wander."
          },
          {
            title: "3. The Experiment",
            description: "Slowly move your face closer to the screen. At a specific distance, the circle on the right will completely vanish, replaced by the background."
          }
        ]}
      />

      <HallucinationEngine />
    </main>
  );
}
