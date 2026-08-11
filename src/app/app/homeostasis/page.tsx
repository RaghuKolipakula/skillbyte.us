"use client";

import React, { useState } from 'react';
import { HomeostasisEngine } from '@/components/HomeostasisEngine';
import Link from 'next/link';
import { Home, Info } from 'lucide-react';
import { ProtocolGuideModal } from '@/components/ProtocolGuideModal';

export default function HomeostasisPage() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <main className="w-full h-screen bg-black overflow-hidden relative">
      
      {/* Stealth Navigation */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none">
        <Link 
          href="/" 
          className="text-white/30 hover:text-white transition-colors flex items-center space-x-2 pointer-events-auto"
        >
          <Home size={20} />
          <span className="text-sm font-medium tracking-wide">SkillByte</span>
        </Link>
        <div className="flex items-center space-x-4 pointer-events-auto">
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
        title="The Homeostasis Engine"
        description="A gamified simulation of the gut-brain-pancreas axis. You are the beta cell. Defend the body."
        steps={[
          {
            title: "1. The Target",
            description: "The central orb represents your blood glucose. Perfect homeostasis is 85 mg/dL (pure white, perfectly round)."
          },
          {
            title: "2. The Crisis",
            description: "As metabolic loads (food) hit the system, glucose will spike rapidly. The cell will become deformed and burn orange."
          },
          {
            title: "3. The Response",
            description: "Tap anywhere on the screen rapidly to release insulin and compress the spike. But beware: tap too fast and you crash the system into hypoglycemia (blue)."
          }
        ]}
      />

      <HomeostasisEngine />
    </main>
  );
}
