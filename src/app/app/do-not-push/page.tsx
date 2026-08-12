"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Info } from 'lucide-react';
import { ForbiddenButton } from '@/components/ForbiddenButton';
import { ProtocolGuideModal } from '@/components/ProtocolGuideModal';

export default function DoNotPushApp() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/30 overflow-hidden relative">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 pointer-events-auto">
        <Link href="/" className="flex items-center space-x-2 text-white opacity-70 hover:opacity-100 transition-opacity">
          <ArrowLeft size={20} />
          <span className="font-semibold tracking-tight">SkillByte</span>
        </Link>
        <div className="flex items-center space-x-4">
          <div className="font-mono text-sm tracking-widest uppercase opacity-70 flex items-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="4"></circle>
            </svg>
            DO NOT PUSH
          </div>
          <button 
            onClick={() => setIsGuideOpen(true)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors text-white"
          >
            <Info size={16} />
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="h-screen w-full relative">
        <ForbiddenButton />
      </main>

      <ProtocolGuideModal 
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        title="The Forbidden Protocol"
        description="A test of human curiosity and defiance."
        steps={[
          { title: "The Rule", description: "Do not push the button." },
          { title: "The Consequence", description: "If you push the button, things will break." },
          { title: "The Inevitable", description: "You're going to push it anyway, aren't you?" }
        ]}
      />
    </div>
  );
}
