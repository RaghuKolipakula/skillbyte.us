import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronRight, 
  Menu
} from 'lucide-react';

export default function Home() {
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
              <Link href="#essentials" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">Life's Essentials</Link>
              <Link href="#curiosity" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">Curiosity</Link>
              <Link href="#fun" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">Fun</Link>
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-6">
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
        <section className="text-center px-4 pt-24 pb-16 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-black dark:text-white mb-6">
            Master your life.<br />One micro-app at a time.
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-10 max-w-3xl mx-auto font-light tracking-tight">
            A portal of highly addictive, sophisticated educational tools designed to upgrade your daily routine.
          </p>
        </section>

        {/* 3. Life's Essentials (Belly Button Buster) - Dark Section */}
        <section id="essentials" className="bg-black text-white pt-24 pb-32 px-4 mt-8">
          <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
            
            {/* Custom App Icon: Belly Button Buster */}
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-[2rem] mb-8 flex items-center justify-center shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform cursor-pointer">
              <div className="absolute inset-0 bg-white/10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
              <div className="w-10 h-10 border-4 border-white/80 rounded-full flex items-center justify-center z-10">
                <div className="w-3 h-3 bg-white/90 rounded-full"></div>
              </div>
            </div>

            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-3">Life's Essentials</h3>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Belly Fat Buster.</h2>
            <p className="text-2xl text-gray-400 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Reverse desk-worker posture and build functional athletic core strength in just 5 minutes a day. Real results, minimal effort.
            </p>
            
            <div className="flex items-center space-x-6">
              <Link href="/app/belly-fat-buster" className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-transform">
                Open App
              </Link>
              <Link href="/app/belly-fat-buster" className="group flex items-center text-lg font-medium text-white hover:text-gray-300 transition-colors">
                Learn more <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>

            {/* Apple-style massive screenshot mockup */}
            <div className="mt-20 w-full max-w-5xl aspect-[2/1] bg-[#111] rounded-t-[3rem] border-t border-l border-r border-gray-800 flex flex-col overflow-hidden relative">
               <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[#1d1d1f] to-transparent"></div>
               <div className="mt-auto h-[85%] bg-[#1d1d1f] mx-12 rounded-t-3xl border border-gray-800 shadow-2xl flex items-center justify-center overflow-hidden relative">
                 <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                 <span className="text-gray-600 font-mono tracking-widest text-sm relative z-10 border border-gray-700 px-4 py-2 rounded-full">BELLY FAT BUSTER INTERFACE</span>
               </div>
            </div>
          </div>
        </section>

        {/* 4. Curiosity (Mechanics Lab) - Light Section */}
        <section id="curiosity" className="bg-white text-black pt-32 pb-32 px-4 border-b border-gray-100">
          <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
            
            {/* Custom App Icon: Mechanics Lab */}
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2rem] mb-8 flex items-center justify-center shadow-2xl relative overflow-hidden group hover:scale-105 transition-transform cursor-pointer">
               <div className="absolute inset-0 bg-white/10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}></div>
               {/* Minimalist geometric gear/triangle shape */}
               <div className="w-12 h-12 relative flex items-center justify-center z-10">
                 <div className="absolute w-full h-full border-4 border-white/80 rounded-lg rotate-45"></div>
                 <div className="absolute w-full h-full border-4 border-white/80 rounded-lg"></div>
                 <div className="w-3 h-3 bg-white/90 rounded-full z-10"></div>
               </div>
            </div>

            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">Curiosity</h3>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Mechanics Lab.</h2>
            <p className="text-2xl text-gray-500 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              From layman to inventor. Discover the unseen forces that govern the physical world through interactive experimentation.
            </p>
            
            <div className="flex items-center space-x-6">
              <Link href="/app/mechanics-lab" className="bg-black text-white px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-transform">
                Open App
              </Link>
              <Link href="/app/mechanics-lab" className="group flex items-center text-lg font-medium text-black hover:text-gray-600 transition-colors">
                Learn more <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>

            {/* Apple-style massive screenshot mockup */}
            <div className="mt-20 w-full max-w-5xl aspect-[2/1] bg-gray-50 rounded-t-[3rem] border-t border-l border-r border-gray-200 flex flex-col overflow-hidden relative">
               <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
               <div className="mt-auto h-[85%] bg-white mx-12 rounded-t-3xl border border-gray-200 shadow-2xl flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                 <span className="text-gray-400 font-mono tracking-widest text-sm relative z-10 border border-gray-300 px-4 py-2 rounded-full">MECHANICS LAB SCHEMATIC</span>
               </div>
            </div>
          </div>
        </section>

        {/* 5. Fun - Gray Section (Coming Soon) */}
        <section id="fun" className="bg-[#f5f5f7] dark:bg-[#111] text-black dark:text-white pt-32 pb-32 px-4">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            
            <div className="w-24 h-24 bg-gray-200 dark:bg-[#222] rounded-[2rem] mb-8 flex items-center justify-center shadow-inner relative overflow-hidden">
               <div className="w-8 h-8 rounded-full border-4 border-gray-300 dark:border-gray-600"></div>
               <div className="absolute w-full h-1 bg-gray-300 dark:border-gray-600 transform rotate-45"></div>
            </div>

            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">Fun</h3>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Coming Soon.</h2>
            <p className="text-xl text-gray-500 font-light max-w-xl mx-auto mb-10 leading-relaxed">
              Addictive, dopamine-driven mini-games that secretly build your underlying skills. We are currently developing our first title.
            </p>
          </div>
        </section>

      </main>

      {/* 6. Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111111] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-black dark:text-white mb-4">Categories</h4>
              <ul className="space-y-3">
                <li><Link href="#essentials" className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">Life's Essentials</Link></li>
                <li><Link href="#curiosity" className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">Curiosity</Link></li>
                <li><Link href="#fun" className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">Fun</Link></li>
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
