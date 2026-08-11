"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, DollarSign } from 'lucide-react';
import Link from 'next/link';

type Phase = 'input' | 'accelerating' | 'resolved';

const MILESTONES = [
  { value: 1000000, label: "Millionaire Status" },
  { value: 10000000, label: "Private Jet (Entry Level)" },
  { value: 50000000, label: "Gulfstream G650" },
  { value: 100000000, label: "Generational Wealth" },
  { value: 500000000, label: "Mega Yacht" },
  { value: 1000000000, label: "Billionaire Status" },
  { value: 44000000000, label: "Buying Twitter" },
  { value: 100000000000, label: "Centibillionaire" },
  { value: 200000000000, label: "Jeff Bezos / Elon Musk Scale" }
];

const TARGET_WEALTH = 200000000000;

export const AbsoluteScaleEngine = () => {
  const [phase, setPhase] = useState<Phase>('input');
  const [netWorthStr, setNetWorthStr] = useState('');
  const [displayWealth, setDisplayWealth] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState("");
  const netWorthNum = parseInt(netWorthStr.replace(/[^0-9]/g, ''), 10) || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (netWorthNum <= 0) return;
    setDisplayWealth(netWorthNum);
    setPhase('accelerating');
  };

  useEffect(() => {
    if (phase === 'accelerating') {
      let startTime: number;
      const duration = 12000; // 12 seconds of acceleration
      
      const animate = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        
        // Easing function: easeInExpo for intense acceleration
        const easeInExpo = progress === 0 ? 0 : Math.pow(2, 10 * progress - 10);
        
        const currentVal = netWorthNum + (TARGET_WEALTH - netWorthNum) * easeInExpo;
        setDisplayWealth(currentVal);

        // Check milestones
        const passedMilestones = MILESTONES.filter(m => currentVal >= m.value);
        if (passedMilestones.length > 0) {
          const latest = passedMilestones[passedMilestones.length - 1];
          setActiveMilestone(latest.label);
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setPhase('resolved');
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [phase, netWorthNum]);

  // Format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative bg-black text-white overflow-hidden">
      
      {/* Background Starfield / Speed Lines (Simulated with simple opacity/scale) */}
      <AnimatePresence>
        {phase === 'accelerating' && (
          <motion.div 
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 0.3, scale: 20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 12, ease: "easeIn" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
             <div className="w-32 h-32 border border-white/20 rounded-full"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-xl px-6 text-center z-10"
          >
            <h2 className="text-sm font-mono tracking-widest text-gray-500 uppercase mb-8">The Absolute Scale</h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <div className="relative w-full flex items-center border-b border-white/20 focus-within:border-white transition-colors pb-4">
                <DollarSign className="text-white/40 absolute left-0" size={32} />
                <input
                  type="text"
                  value={netWorthStr}
                  onChange={(e) => setNetWorthStr(e.target.value)}
                  placeholder="Enter your total net worth"
                  className="w-full bg-transparent text-3xl md:text-5xl text-center focus:outline-none placeholder:text-white/20 font-light pl-12"
                  autoFocus
                />
              </div>
              <button 
                type="submit"
                disabled={netWorthNum <= 0}
                className="mt-12 px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none uppercase tracking-widest text-xs font-mono"
              >
                Engage Scale
              </button>
            </form>
          </motion.div>
        )}

        {(phase === 'accelerating' || phase === 'resolved') && (
          <motion.div
            key="zooming"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
          >
            
            {/* The Number Counter */}
            <motion.div
              className={`text-5xl md:text-8xl font-bold tracking-tighter ${phase === 'resolved' ? 'text-white' : 'text-white/90'}`}
              animate={{ 
                scale: phase === 'resolved' ? 1.1 : 1,
                textShadow: phase === 'resolved' ? '0px 0px 40px rgba(255,255,255,0.3)' : '0px 0px 0px rgba(255,255,255,0)'
              }}
              transition={{ duration: 0.5 }}
            >
              {formatCurrency(displayWealth)}
            </motion.div>

            {/* Visualizing User's Net Worth as a Fraction */}
            {phase === 'resolved' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-gray-500 font-mono text-sm tracking-widest uppercase text-center"
              >
                Your life savings is a rounding error. <br/>
                ({((netWorthNum / TARGET_WEALTH) * 100).toFixed(8)}% of the target)
              </motion.div>
            )}

            {/* Milestones flashing by */}
            {phase === 'accelerating' && activeMilestone && (
              <motion.div
                key={activeMilestone}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.2, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-1/4 text-xl md:text-3xl font-light text-gray-400 tracking-wide"
              >
                Passing: {activeMilestone}
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {/* The Final Upsell */}
      <AnimatePresence>
        {phase === 'resolved' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 2 }}
            className="absolute bottom-20 z-30 flex flex-col items-center"
          >
            <p className="text-xl font-light tracking-wide mb-8 text-center px-4 text-gray-300">
              Your time is your only real asset.<br/> Maximize it.
            </p>
            <Link 
              href="/pro"
              className="group flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 font-semibold uppercase tracking-widest text-sm"
            >
              <span>Unlock SkillByte Pro</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
