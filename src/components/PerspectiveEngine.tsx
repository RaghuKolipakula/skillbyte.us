"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Share2 } from 'lucide-react';

type Phase = 'input' | 'zooming' | 'resolved';

export const PerspectiveEngine = () => {
  const [phase, setPhase] = useState<Phase>('input');
  const [anxiety, setAnxiety] = useState('');
  const [zoomLevel, setZoomLevel] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!anxiety.trim()) return;
    setPhase('zooming');
  };

  useEffect(() => {
    if (phase === 'zooming') {
      // Sequence the zoom levels
      const sequence = async () => {
        // Start zoom
        await new Promise(r => setTimeout(r, 1000));
        setZoomLevel(1); // 100 Years
        
        await new Promise(r => setTimeout(r, 2000));
        setZoomLevel(2); // 10,000 Years
        
        await new Promise(r => setTimeout(r, 2000));
        setZoomLevel(3); // 1 Million Years
        
        await new Promise(r => setTimeout(r, 2500));
        setZoomLevel(4); // 13.8 Billion Years
        
        await new Promise(r => setTimeout(r, 3000));
        setPhase('resolved');
      };
      
      sequence();
    }
  }, [phase]);

  const handleReset = () => {
    setPhase('input');
    setAnxiety('');
    setZoomLevel(0);
  };

  // The scales of time
  const scales = [
    { level: 1, label: "100 Years (A Human Lifespan)" },
    { level: 2, label: "10,000 Years (Human Civilization)" },
    { level: 3, label: "65 Million Years (The Dinosaurs)" },
    { level: 4, label: "13.8 Billion Years (The Universe)" }
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-black text-white">
      
      <AnimatePresence mode="wait">
        {phase === 'input' && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-2xl px-6 text-center z-10"
          >
            <h2 className="text-sm font-mono tracking-widest text-gray-500 uppercase mb-8">The Perspective Engine</h2>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <input
                type="text"
                value={anxiety}
                onChange={(e) => setAnxiety(e.target.value)}
                placeholder="What is consuming your mind?"
                className="w-full bg-transparent border-b border-white/20 pb-4 text-3xl md:text-5xl text-center focus:outline-none focus:border-white transition-colors placeholder:text-white/20 font-light"
                autoFocus
              />
              <button 
                type="submit"
                disabled={!anxiety.trim()}
                className="mt-12 px-8 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none uppercase tracking-widest text-xs font-mono"
              >
                Scale It
              </button>
            </form>
          </motion.div>
        )}

        {(phase === 'zooming' || phase === 'resolved') && (
          <motion.div
            key="zooming"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* The Central Anxiety (shrinks over time) */}
            <motion.div
              animate={{ 
                scale: zoomLevel === 0 ? 1 : 
                       zoomLevel === 1 ? 0.05 : 
                       zoomLevel === 2 ? 0.005 : 
                       zoomLevel === 3 ? 0.0005 : 0.00001,
                opacity: zoomLevel === 4 ? 0.2 : 1
              }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute z-20 text-center whitespace-nowrap"
            >
              <div className="text-4xl md:text-6xl font-light">{anxiety}</div>
            </motion.div>

            {/* The Scale Rings */}
            {scales.map((scale, i) => (
              <motion.div
                key={scale.level}
                initial={{ opacity: 0, scale: 20 }}
                animate={{ 
                  opacity: zoomLevel >= scale.level ? 1 : 0,
                  scale: zoomLevel >= scale.level ? 1 : 20
                }}
                transition={{ duration: 2.5, ease: "easeOut", delay: 0.2 }}
                className="absolute flex items-center justify-center border border-white/10 rounded-full"
                style={{
                  width: `${(i + 1) * 300}px`,
                  height: `${(i + 1) * 300}px`
                }}
              >
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: zoomLevel === scale.level ? 1 : 0.2 }}
                  transition={{ duration: 1 }}
                  className="absolute -top-6 bg-black px-4 text-xs font-mono tracking-widest text-gray-400 uppercase whitespace-nowrap"
                >
                  {scale.label}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 'resolved' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="absolute bottom-20 z-30 flex flex-col items-center"
          >
            <p className="text-xl font-light tracking-wide mb-8">You are here. It will pass.</p>
            <div className="flex space-x-6">
              <button 
                onClick={handleReset}
                className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
              >
                <RefreshCcw size={14} />
                <span>Reset</span>
              </button>
              <button 
                className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
                onClick={() => alert("Share feature coming soon!")}
              >
                <Share2 size={14} />
                <span>Export</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
