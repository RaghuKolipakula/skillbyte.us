"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const GRID_SIZE = 15;
const SPACING = 24;

// Generate static random values outside the render cycle to ensure pure component rendering
const PARTICLE_DATA = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
  const row = Math.floor(i / GRID_SIZE);
  const col = i % GRID_SIZE;
  const orderedX = (col - (GRID_SIZE - 1) / 2) * SPACING;
  const orderedY = (row - (GRID_SIZE - 1) / 2) * SPACING;
  
  // Random multipliers for chaotic state
  const chaoticXMultipliers = Array.from({ length: 5 }, () => (Math.random() - 0.5) * 0.8);
  const chaoticYMultipliers = Array.from({ length: 5 }, () => (Math.random() - 0.5) * 0.8);
  const duration = 15 + Math.random() * 10;
  
  return { id: i, orderedX, orderedY, chaoticXMultipliers, chaoticYMultipliers, duration };
});

export const EntropyEngine = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ w: 1000, h: 1000 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Use a small timeout to avoid calling setState synchronously during the effect body
    // which triggers the react-hooks/set-state-in-effect linter rule
    const timer = setTimeout(() => {
      setDimensions({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    }, 0);
    
    const handleResize = () => {
      setDimensions({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Event handlers for mouse/touch
  const handlePointerDown = () => {
    setIsFocused(true);
    setHasStarted(true);
  };

  const handlePointerUp = () => {
    setIsFocused(false);
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center relative bg-black text-white overflow-hidden font-sans select-none"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Instructions */}
      <div className={`absolute top-24 z-20 text-center transition-opacity duration-1000 ${isFocused ? 'opacity-20' : 'opacity-100'}`}>
        <h1 className="text-2xl font-bold tracking-[0.2em] uppercase mb-4 text-white/90">
          The Entropy Engine
        </h1>
        <p className="text-white/50 text-sm tracking-wider uppercase">
          {hasStarted 
            ? "Order is fleeting. Hold to restore." 
            : "Press and hold anywhere to impose order."}
        </p>
      </div>

      {/* The Lattice */}
      <div 
        ref={containerRef}
        className="relative flex items-center justify-center z-10"
        style={{ 
          width: GRID_SIZE * SPACING, 
          height: GRID_SIZE * SPACING 
        }}
      >
        {PARTICLE_DATA.map((data) => {
          // Scale chaotic coordinates based on window dimensions
          const chaoticKeyframesX = data.chaoticXMultipliers.map(m => m * dimensions.w);
          const chaoticKeyframesY = data.chaoticYMultipliers.map(m => m * dimensions.h);

          return (
            <motion.div
              key={data.id}
              className="absolute w-2 h-2 bg-white rounded-full"
              initial={{ x: data.orderedX, y: data.orderedY, scale: 1, opacity: 1 }}
              animate={
                isFocused
                  ? { 
                      x: data.orderedX, 
                      y: data.orderedY,
                      scale: 1,
                      opacity: 1,
                      rotate: 0,
                    }
                  : {
                      x: chaoticKeyframesX,
                      y: chaoticKeyframesY,
                      scale: [0.5, 1.5, 0.2, 1, 0.8],
                      opacity: [0.2, 0.8, 0.3, 1, 0.5],
                      rotate: [0, 90, 180, 270, 360],
                    }
              }
              transition={
                isFocused
                  ? { 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 15,
                      mass: 0.5
                    }
                  : {
                      duration: data.duration,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "linear"
                    }
              }
            />
          );
        })}
      </div>

      {/* Warning text when chaos ensues */}
      <div className={`absolute bottom-24 z-20 transition-opacity duration-1000 ${(!isFocused && hasStarted) ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-red-500/80 font-mono text-xs tracking-widest uppercase">
          Warning: Maximum Entropy Detected. 
        </p>
      </div>
      
    </div>
  );
};
