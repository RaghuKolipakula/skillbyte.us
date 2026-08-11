import React, { useState } from 'react';
import { AbsoluteScaleEngine } from '@/components/AbsoluteScaleEngine';
import Link from 'next/link';
import { Home, Info } from 'lucide-react';
import { ProtocolGuideModal } from '@/components/ProtocolGuideModal';

export default function AbsoluteScalePage() {
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
        title="The Absolute Scale"
        description="A stark, cinematic visualization of extreme wealth inequality and the value of time. This engine forces perspective by contrasting an average life savings with billionaire wealth."
        steps={[
          {
            title: "1. Input",
            description: "Enter your total life savings or net worth into the engine."
          },
          {
            title: "2. Accelerate",
            description: "Click 'Engage Scale'. The engine will forcefully accelerate the visualization up to a billionaire's net worth."
          },
          {
            title: "3. Reflect",
            description: "Observe the percentage. Realize that time is your only true unrenewable asset."
          }
        ]}
      />

      <AbsoluteScaleEngine />
    </main>
  );
}
