import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Settings2 } from 'lucide-react';
import { NBackEngine } from '@/components/NBackEngine';

export const metadata = {
  title: 'N-Back Matrix | SkillByte',
  description: 'Brutal working memory training.',
};

export default function NBackPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans">
      
      {/* Stealth Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
        <Link href="/" className="flex items-center space-x-2 opacity-40 hover:opacity-100 transition-opacity">
          <ArrowLeft size={20} />
          <span className="font-semibold tracking-tight text-sm uppercase">Exit Matrix</span>
        </Link>
        <button className="opacity-40 hover:opacity-100 transition-opacity">
          <Settings2 size={20} />
        </button>
      </nav>

      {/* Main Interface */}
      <main className="w-full min-h-screen flex flex-col items-center justify-center pt-20 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">N-Back Matrix</h1>
          <p className="text-gray-500 font-mono text-xs tracking-widest uppercase">Cognitive Endurance Protocol</p>
        </div>
        
        <NBackEngine />
        
        <div className="mt-12 text-center text-xs text-gray-600 font-mono max-w-md px-4">
          <p className="mb-2">Instructions:</p>
          <p>Press <strong className="text-gray-300">A</strong> if the current position matches the position N turns ago.</p>
          <p>Press <strong className="text-gray-300">L</strong> if the spoken letter matches the letter N turns ago.</p>
        </div>
      </main>

    </div>
  );
}
