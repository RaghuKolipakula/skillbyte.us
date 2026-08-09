import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronRight, 
  Dumbbell, 
  Brain, 
  Gamepad2, 
  Activity,
  Flame,
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

      <main className="pt-24 pb-16">
        
        {/* 2. Hero Section */}
        <section className="text-center px-4 pt-16 pb-24 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-black dark:text-white mb-6">
            Master your life.<br />One micro-app at a time.
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-10 max-w-3xl mx-auto font-light tracking-tight">
            A portal of highly addictive, sophisticated educational tools designed to upgrade your daily routine.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <Link href="#explore" className="bg-black text-white dark:bg-white dark:text-black px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-transform w-full sm:w-auto">
              Explore the Apps
            </Link>
            <Link href="#how-it-works" className="group flex items-center text-lg font-medium text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors w-full sm:w-auto justify-center">
              How it works <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>

          {/* Hero Image Mockup Placeholder */}
          <div className="relative w-full max-w-6xl mx-auto aspect-video bg-white dark:bg-[#1d1d1f] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5 dark:ring-white/10">
            {/* The user will place a photorealistic lifestyle or minimalist interface mockup here: /images/hero-mockup.png */}
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-gray-400 dark:text-gray-500 text-sm font-medium uppercase tracking-widest mb-2">Photorealistic UI Mockup</span>
              <span className="text-gray-300 dark:text-gray-600 text-xs">/images/hero-mockup.png</span>
            </div>
          </div>
        </section>

        {/* 3. Featured Micro-App (Dark Mode Transition) */}
        <section className="bg-black text-white py-32 px-4 mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-sm font-medium text-white/80">
                  <Flame size={16} className="text-orange-500" />
                  <span>Flagship App</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Belly Button Buster.
                </h2>
                <p className="text-xl text-gray-400 font-light leading-relaxed">
                  Reverse desk-worker posture and build functional athletic core strength in just 5 minutes a day. Real results, minimal effort.
                </p>
                <div>
                  <Link href="/app/belly-button-buster" className="inline-flex items-center text-lg font-medium text-white hover:text-gray-300 transition-colors border-b border-white pb-1">
                    Start the 4-day challenge <ChevronRight className="ml-1" size={20} />
                  </Link>
                </div>
              </div>

              {/* Bento Box UI Snippets */}
              <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[400px]">
                <div className="col-span-2 bg-[#1d1d1f] rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 cursor-default">
                  <div>
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-1">Today's Goal</p>
                    <p className="text-3xl font-bold">5:00 <span className="text-xl text-gray-500">min</span></p>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full mt-4 overflow-hidden">
                    <div className="w-2/3 h-full bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="bg-[#1d1d1f] rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden hover:scale-[1.02] transition-transform duration-300 cursor-default">
                  <Activity size={32} className="mb-4 text-green-400" />
                  <p className="text-2xl font-bold">4</p>
                  <p className="text-gray-400 text-xs uppercase tracking-wider text-center">Day Streak</p>
                </div>

                <div className="bg-[#1d1d1f] rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden hover:scale-[1.02] transition-transform duration-300 cursor-default">
                  {/* Heatmap placeholder graphic */}
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-600/40 border border-white/5 flex items-center justify-center">
                    <span className="text-xs text-white/50 font-medium">Core Heatmap</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Core Categories (Bento Grid Layout) */}
        <section className="py-32 px-4 max-w-7xl mx-auto" id="explore">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-6">
              Three pillars to upgrade.
            </h2>
            <p className="text-xl text-gray-500 dark:text-gray-400 font-light">
              Choose your path and start levelling up.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:h-[500px]">
            {/* Card 1 */}
            <Link href="/essentials" className="md:col-span-2 md:row-span-2 group bg-white dark:bg-[#1d1d1f] rounded-3xl p-10 flex flex-col justify-between shadow-sm hover:shadow-xl ring-1 ring-gray-900/5 dark:ring-white/5 transition-all duration-300">
              <div>
                <div className="w-12 h-12 bg-gray-100 dark:bg-black rounded-2xl flex items-center justify-center mb-6 text-black dark:text-white group-hover:scale-110 transition-transform">
                  <Dumbbell size={24} />
                </div>
                <h3 className="text-3xl font-bold tracking-tight text-black dark:text-white mb-4">Life's Essentials</h3>
                <p className="text-gray-500 dark:text-gray-400 text-lg max-w-sm">
                  Focus on physical health, wealth mechanics, and optimizing your daily routines for maximum output.
                </p>
              </div>
              <div className="mt-8 flex justify-end">
                <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                  <ChevronRight size={20} />
                </div>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/app/mechanics-lab" className="group bg-white dark:bg-[#1d1d1f] rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-xl ring-1 ring-gray-900/5 dark:ring-white/5 transition-all duration-300">
              <div>
                <div className="w-10 h-10 bg-gray-100 dark:bg-black rounded-xl flex items-center justify-center mb-5 text-black dark:text-white group-hover:scale-110 transition-transform">
                  <Brain size={20} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-black dark:text-white mb-3">Curiosity</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Deep-dive tactical puzzles, logic training, and high-level strategy to sharpen the mind.
                </p>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/fun" className="group bg-white dark:bg-[#1d1d1f] rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-xl ring-1 ring-gray-900/5 dark:ring-white/5 transition-all duration-300">
              <div>
                <div className="w-10 h-10 bg-gray-100 dark:bg-black rounded-xl flex items-center justify-center mb-5 text-black dark:text-white group-hover:scale-110 transition-transform">
                  <Gamepad2 size={20} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-black dark:text-white mb-3">Fun</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Addictive, dopamine-driven mini-games that secretly build your underlying skills.
                </p>
              </div>
            </Link>
          </div>
        </section>

      </main>

      {/* 5. Footer */}
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
