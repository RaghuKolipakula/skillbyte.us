"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, EyeOff } from 'lucide-react';
import Link from 'next/link';

type Phase = 'intro' | 'experiment' | 'revelation';

export const HallucinationEngine = () => {
  const [phase, setPhase] = useState<Phase>('intro');

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-white text-black overflow-hidden font-sans">
      
      <AnimatePresence mode="wait">
        
        {/* Intro Phase */}
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-2xl px-6 text-center z-10"
          >
            <div className="flex justify-center mb-6">
              <EyeOff size={48} className="text-black" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
              The Reality Renderer
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12 font-light leading-relaxed">
              We are going to prove, instantly and undeniably, that the reality you are experiencing right now is a hallucination rendered by your brain.
            </p>
            
            <button 
              onClick={() => setPhase('experiment')}
              className="px-8 py-4 bg-black text-white rounded-full hover:scale-105 transition-all duration-300 uppercase tracking-widest text-sm font-semibold shadow-xl"
            >
              Begin Apparatus
            </button>
          </motion.div>
        )}

        {/* Experiment Phase */}
        {phase === 'experiment' && (
          <motion.div
            key="experiment"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full flex flex-col items-center justify-center relative"
          >
            
            <div className="absolute top-24 text-center px-4 max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight mb-4 uppercase">Physical Instructions</h2>
              <ul className="text-left text-gray-700 space-y-3 text-lg font-light">
                <li><strong>1.</strong> Close your <strong>LEFT</strong> eye.</li>
                <li><strong>2.</strong> Stare intensely at the <strong>CROSS (+)</strong> on the left with your right eye.</li>
                <li><strong>3.</strong> Slowly lean your face closer to the screen (or move your phone closer).</li>
              </ul>
              <p className="mt-8 text-black font-bold uppercase tracking-widest text-sm">Do not look directly at the circle.</p>
            </div>

            {/* The Apparatus */}
            <div className="w-full max-w-4xl px-4 flex justify-between items-center mt-20">
              {/* Cross (Left) */}
              <div className="w-16 h-16 flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <div className="w-12 h-2 bg-black absolute"></div>
                  <div className="w-2 h-12 bg-black absolute"></div>
                </div>
              </div>

              {/* Spacer */}
              <div className="flex-grow"></div>

              {/* Circle (Right) */}
              <div className="w-16 h-16 flex items-center justify-center">
                <div className="w-12 h-12 bg-black rounded-full"></div>
              </div>
            </div>

            <button 
              onClick={() => setPhase('revelation')}
              className="absolute bottom-24 px-8 py-3 bg-white text-black border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 uppercase tracking-widest text-sm font-semibold"
            >
              Did the circle disappear?
            </button>

          </motion.div>
        )}

        {/* Revelation Phase */}
        {phase === 'revelation' && (
          <motion.div
            key="revelation"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-2xl px-6 text-center z-10"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8">
              The Void
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-6 font-light leading-relaxed">
              When the circle vanished, you didn&apos;t see a black hole. You saw pure white space. 
            </p>
            <p className="text-lg md:text-xl text-gray-700 mb-12 font-light leading-relaxed">
              Because your optic nerve has no photoreceptors, there is a massive void in your visual field. Your brain&apos;s neural network panicked and <strong>hallucinated</strong> the background to fill the gap.
            </p>
            
            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-200 mb-12 shadow-sm">
              <h3 className="text-xl font-bold mb-4">The Brutal Truth</h3>
              <p className="text-gray-600 font-light">
                If your brain effortlessly fakes your visual reality... what else is it faking? Your anxiety? Your limits? Your perception of time?
              </p>
            </div>

            <Link 
              href="/pro"
              className="group inline-flex items-center space-x-3 bg-black text-white px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 font-semibold uppercase tracking-widest text-sm shadow-xl hover:shadow-2xl"
            >
              <span>Take Control of the Engine</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
