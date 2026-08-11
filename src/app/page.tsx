"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu
} from 'lucide-react';
import { StripeModal } from '@/components/StripeModal';

export default function Home() {
  const [isStripeOpen, setIsStripeOpen] = useState(false);
  const [isPro, setIsPro] = useState(false);
  
  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-black selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black font-sans transition-colors duration-300">
      
      {/* 1. Global Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#ffffffcc] dark:bg-[#000000cc] backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12 text-sm font-medium">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2 font-bold text-lg tracking-tight dark:text-white">
                <Image src="/logo.jpg" alt="SkillByte Logo" width={28} height={28} className="rounded-md" />
                <span>SkillByte</span>
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex space-x-8 items-center">
              <Link href="#essentials" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">Life&apos;s Essentials</Link>
              <Link href="#curiosity" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">Curiosity</Link>
              <Link href="#cognitive" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">Cognitive</Link>
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/ledger" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors font-semibold">
                Ledger
              </Link>
              <Link href="/signin" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">
                Sign In
              </Link>
              <Link href="/pro" className="bg-black text-white dark:bg-white dark:text-black px-4 py-1.5 rounded-full hover:scale-105 transition-transform">
                Get Pro
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white">
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-12">
        
        {/* 2. Massive Hero Section */}
        <section className="text-center px-4 pt-24 pb-16 max-w-5xl mx-auto flex flex-col items-center justify-center">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-black dark:text-white">
            Master your life. <br />
            <span className="text-gray-400">One micro-app at a time.</span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-500 font-light max-w-3xl mb-12 leading-relaxed">
            SkillByte is a premium collection of addictive, highly-focused tools designed to rapidly upgrade your everyday capabilities. 
            No fluff. No subscriptions. Just biological hacks, mental models, and life&apos;s essential skills.
          </p>

          {/* The Upsell (Steve's Mandate) */}
          <div className="mt-8 mb-12">
            {isPro ? (
              <Link 
                href="/daily"
                className="inline-flex items-center justify-center px-16 py-6 text-2xl font-bold text-black bg-white rounded-[2rem] hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)] backdrop-blur-md border border-white/20"
              >
                Start Today
              </Link>
            ) : (
              <button 
                onClick={() => setIsStripeOpen(true)}
                className="inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-black bg-white rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)] backdrop-blur-md border border-white/20 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                Unlock The Daily Flow
              </button>
            )}
          </div>
        </section>

        <StripeModal 
          isOpen={isStripeOpen} 
          onClose={() => setIsStripeOpen(false)} 
          onSuccess={() => setIsPro(true)} 
        />

        {/* 3. The App Directory (Grid Layout) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          
          {/* Category: Life's Essentials */}
          <div id="essentials" className="mb-20">
            <h3 className="text-xl font-bold tracking-tight text-black dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
              Life&apos;s Essentials
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              
              {/* Belly Fat Buster Card */}
              <Link href="/app/belly-fat-buster" className="group flex flex-col bg-white dark:bg-[#1c1c1e] p-6 rounded-[2rem] hover:scale-105 transition-transform shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-white/10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
                  <div className="w-6 h-6 border-2 border-white/80 rounded-full flex items-center justify-center z-10">
                    <div className="w-2 h-2 bg-white/90 rounded-full"></div>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-black dark:text-white mb-1 tracking-tight">Belly Fat Buster</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">Functional core-training sequence designed to build a strong foundation with zero equipment.</p>
              </Link>

              {/* Resonance Card */}
              <Link href="/app/resonance" className="group flex flex-col bg-white dark:bg-[#1c1c1e] p-6 rounded-[2rem] hover:scale-105 transition-transform shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-white/10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
                  <div className="w-8 h-8 border-[1.5px] border-white/60 rounded-full flex items-center justify-center z-10">
                    <div className="w-5 h-5 border-[1.5px] border-white/80 rounded-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-black dark:text-white mb-1 tracking-tight">Resonance</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">Sync your breath to the 5.5s resonance frequency to rebalance your nervous system.</p>
              </Link>

              {/* Apnea Protocol Card */}
              <Link href="/app/apnea" className="group flex flex-col bg-white dark:bg-[#1c1c1e] p-6 rounded-[2rem] hover:scale-105 transition-transform shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden shadow-inner border border-gray-700">
                  <div className="absolute inset-0 bg-white/5" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
                  <div className="w-8 h-8 border-2 border-white/60 rounded-full flex items-center justify-center z-10">
                    <div className="w-6 h-6 border-2 border-dashed border-white/80 rounded-full animate-[spin_10s_linear_infinite]"></div>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-black dark:text-white mb-1 tracking-tight">Apnea Protocol</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">Measure and expand your physiological panic threshold. A brutal test of CO2 tolerance.</p>
              </Link>

            </div>
          </div>

          {/* Category: Curiosity */}
          <div id="curiosity" className="mb-20">
            <h3 className="text-xl font-bold tracking-tight text-black dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
              Curiosity
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              
              {/* Mechanics Lab Card */}
              <Link href="/app/mechanics-lab" className="group flex flex-col bg-white dark:bg-[#1c1c1e] p-6 rounded-[2rem] hover:scale-105 transition-transform shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-white/10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
                  <div className="w-8 h-8 relative flex items-center justify-center z-10">
                    <div className="absolute w-full h-full border-2 border-white/80 rounded-md rotate-45"></div>
                    <div className="absolute w-full h-full border-2 border-white/80 rounded-md"></div>
                    <div className="w-2 h-2 bg-white/90 rounded-full z-10"></div>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-black dark:text-white mb-1 tracking-tight">Mechanics Lab</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">Discover the unseen forces that govern the physical world through interactive experimentation.</p>
              </Link>

              {/* Chrono Card */}
              <Link href="/app/chrono" className="group flex flex-col bg-white dark:bg-[#1c1c1e] p-6 rounded-[2rem] hover:scale-105 transition-transform shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-white/10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
                  <div className="w-8 h-8 relative flex items-center justify-center z-10">
                    <div className="absolute w-full h-full border-2 border-white/80 rounded-full"></div>
                    <div className="w-2 h-2 border-[1.5px] border-white/90 rounded-full z-10"></div>
                    <div className="absolute w-[1.5px] h-full bg-white/50 rotate-45"></div>
                    <div className="absolute w-[1.5px] h-full bg-white/50 -rotate-45"></div>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-black dark:text-white mb-1 tracking-tight">Chrono</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">Hack your internal clock. A psychological sandbox proving time is a biological illusion.</p>
              </Link>

              {/* Epoch Engine Card */}
              <Link href="/app/epoch-engine" className="group flex flex-col bg-white dark:bg-[#1c1c1e] p-6 rounded-[2rem] hover:scale-105 transition-transform shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-black rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden shadow-inner border border-gray-600">
                  <div className="absolute inset-0 bg-white/5" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
                  <div className="w-8 h-8 relative flex items-center justify-center z-10">
                    <div className="w-6 h-6 border-2 border-white/80 rounded-sm absolute"></div>
                    <div className="w-1 h-6 bg-white/90 absolute rotate-45"></div>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-black dark:text-white mb-1 tracking-tight">Epoch Engine</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">Probability is simple. The ego is complex. Overcome cognitive bias by steel-manning.</p>
              </Link>
              {/* Perspective Engine Card */}
              <Link href="/app/perspective" className="group flex flex-col bg-white dark:bg-[#1c1c1e] p-6 rounded-[2rem] hover:scale-105 transition-transform shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-black rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden shadow-inner border border-gray-800">
                  <div className="absolute inset-0 bg-white/5" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
                  <div className="w-8 h-8 relative flex items-center justify-center z-10">
                    <div className="w-8 h-8 border-[1.5px] border-white/40 rounded-full absolute"></div>
                    <div className="w-4 h-4 border-[1.5px] border-white/60 rounded-full absolute"></div>
                    <div className="w-1 h-1 bg-white rounded-full absolute"></div>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-black dark:text-white mb-1 tracking-tight">Perspective Engine</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">A cognitive recalibrator that mathematically visualizes the insignificance of modern anxiety.</p>
              </Link>

              {/* The Absolute Scale Card */}
              <Link href="/app/absolute-scale" className="group flex flex-col bg-white dark:bg-[#1c1c1e] p-6 rounded-[2rem] hover:scale-105 transition-transform shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-black rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden shadow-inner border border-gray-700">
                  <div className="absolute inset-0 bg-white/5" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
                  <div className="w-8 h-8 relative flex items-center justify-center z-10">
                    <div className="text-white/80 font-mono font-bold text-xl">$</div>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-black dark:text-white mb-1 tracking-tight">The Absolute Scale</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">A stark, cinematic visualization of extreme wealth inequality and the value of time.</p>
              </Link>

            </div>
          </div>

          {/* Category: Cognitive Endurance */}
          <div id="cognitive" className="mb-20">
            <h3 className="text-xl font-bold tracking-tight text-black dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
              Cognitive Endurance
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              
              {/* N-Back Matrix Card */}
              <Link href="/app/n-back" className="group flex flex-col bg-white dark:bg-[#1c1c1e] p-6 rounded-[2rem] hover:scale-105 transition-transform shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-white/10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
                  <div className="grid grid-cols-3 gap-0.5 w-8 h-8 z-10">
                     {Array.from({ length: 9 }).map((_, i) => (
                       <div key={i} className={`border border-white/40 rounded-[1px] ${i === 4 ? 'bg-white' : ''}`}></div>
                     ))}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-black dark:text-white mb-1 tracking-tight">N-Back Matrix</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">A brutal working-memory training environment to force neuroplasticity.</p>
              </Link>

              {/* Stillness Engine Card */}
              <Link href="/app/stillness" className="group flex flex-col bg-white dark:bg-[#1c1c1e] p-6 rounded-[2rem] hover:scale-105 transition-transform shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-black rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden shadow-inner border border-gray-700">
                  <div className="absolute inset-0 bg-white/5" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
                  <div className="w-8 h-8 border-2 border-white/60 rounded-full flex items-center justify-center z-10 transition-transform group-hover:scale-75">
                    <div className="w-2 h-2 bg-white/90 rounded-full"></div>
                  </div>
                </div>
                <h4 className="text-lg font-bold text-black dark:text-white mb-1 tracking-tight">Stillness Engine</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">Extreme impulse inhibition. Hold absolute stillness within a shrinking boundary.</p>
              </Link>

            </div>
          </div>

        </section>

      </main>

      {/* 4. Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111111] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-black dark:text-white mb-4">Categories</h4>
              <ul className="space-y-3">
                <li><Link href="#essentials" className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">Life&apos;s Essentials</Link></li>
                <li><Link href="#curiosity" className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">Curiosity</Link></li>
                <li><Link href="#cognitive" className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">Cognitive Endurance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-black dark:text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link href="/terms" className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-black dark:text-white mb-4">Account</h4>
              <ul className="space-y-3">
                <li><Link href="/signin" className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">Sign In</Link></li>
                <li><Link href="/pro" className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">Get Pro</Link></li>
                <li><Link href="/support" className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} SkillByte.us. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400">Powered by</span>
              <span className="text-xs font-semibold text-black dark:text-white tracking-tight">Cloudflare</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
