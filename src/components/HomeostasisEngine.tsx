"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, TargetAndTransition } from 'framer-motion';

type GameState = 'setup' | 'playing' | 'hyperglycemia' | 'hypoglycemia' | 'victory';

const LEVELS = [
  { name: 'Level 1: Green Apple', rate: 10, duration: 10 },
  { name: 'Level 2: White Rice', rate: 25, duration: 10 },
  { name: 'Level 3: Glazed Donut', rate: 45, duration: 10 },
  { name: 'Level 4: Large Cola', rate: 70, duration: 10 },
  { name: 'Level 5: Caramel Frappuccino', rate: 110, duration: 12 },
  { name: 'Level 6: Pure Dextrose IV', rate: 160, duration: 15 },
];

export const HomeostasisEngine = () => {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [glucose, setGlucose] = useState(85);
  const [levelIndex, setLevelIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(LEVELS[0].duration);

  // Use refs for the game loop to avoid dependency hell and stale closures
  const glucoseRef = useRef(85);
  const stateRef = useRef<GameState>('setup');
  const levelIndexRef = useRef(0);
  const timeRef = useRef(LEVELS[0].duration);
  const lastTickRef = useRef<number>(0);
  const reqRef = useRef<number>(0);

  const gameLoop = useCallback(function loop(timestamp: number) {
    if (stateRef.current !== 'playing') return;

    const deltaMs = timestamp - lastTickRef.current;
    if (deltaMs >= 100) { // 10 ticks per second
      lastTickRef.current = timestamp;

      // Increase glucose based on current level rate
      const currentLevel = LEVELS[levelIndexRef.current];
      // rate is per second, so per tick is rate / 10
      glucoseRef.current += (currentLevel.rate / 10);
      
      // Decrease time
      timeRef.current -= 0.1;
      
      if (timeRef.current <= 0) {
        // Level Up
        if (levelIndexRef.current >= LEVELS.length - 1) {
          stateRef.current = 'victory';
          setGameState('victory');
          return;
        } else {
          levelIndexRef.current += 1;
          timeRef.current = LEVELS[levelIndexRef.current].duration;
          setLevelIndex(levelIndexRef.current);
        }
      }

      // Check failure states
      if (glucoseRef.current > 200) {
        stateRef.current = 'hyperglycemia';
        setGameState('hyperglycemia');
        // Try haptic
        if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate(500);
        return;
      }
      if (glucoseRef.current < 50) {
        stateRef.current = 'hypoglycemia';
        setGameState('hypoglycemia');
        if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate(500);
        return;
      }

      // Sync state for UI (throttle this if performance dips, but at 10fps it's fine)
      setGlucose(glucoseRef.current);
      setTimeLeft(timeRef.current);
    }

    reqRef.current = requestAnimationFrame(loop);
  }, []);

  const startGame = () => {
    setGameState('playing');
    stateRef.current = 'playing';
    setGlucose(85);
    glucoseRef.current = 85;
    setLevelIndex(0);
    levelIndexRef.current = 0;
    setTimeLeft(LEVELS[0].duration);
    timeRef.current = LEVELS[0].duration;
    lastTickRef.current = performance.now();
    
    if (reqRef.current) cancelAnimationFrame(reqRef.current);
    reqRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    return () => {
      if (reqRef.current) cancelAnimationFrame(reqRef.current);
    };
  }, []);

  const handleInsulinRelease = () => {
    if (stateRef.current !== 'playing') return;
    
    // Each tap drops glucose by 10 points
    glucoseRef.current -= 10;
    
    // Light haptic feedback
    if (typeof window !== 'undefined' && navigator.vibrate) navigator.vibrate(10);
    
    setGlucose(glucoseRef.current);
  };

  // Determine Visual State of the Cell
  const getCellVisuals = (): TargetAndTransition => {
    if (glucose < 70) {
      return {
        backgroundColor: "#3b82f6", // blue-500
        scale: 0.8,
        borderRadius: "50%",
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
        transition: { duration: 0.2 }
      };
    } else if (glucose <= 100) {
      return {
        backgroundColor: "#ffffff",
        scale: 1,
        borderRadius: "50%",
        boxShadow: "0 0 40px rgba(255, 255, 255, 0.2)",
        transition: { duration: 0.5 }
      };
    } else if (glucose <= 140) {
      return {
        backgroundColor: "#fde047", // yellow-300
        scale: 1.1,
        borderRadius: ["50%", "45% 55% 55% 45%", "55% 45% 45% 55%", "50%"],
        boxShadow: "0 0 40px rgba(253, 224, 71, 0.4)",
        transition: { duration: 1, repeat: Infinity, ease: "linear" }
      };
    } else if (glucose <= 170) {
      return {
        backgroundColor: "#f97316", // orange-500
        scale: 1.2,
        borderRadius: ["40% 60% 70% 30%", "60% 40% 30% 70%", "70% 30% 60% 40%", "40% 60% 70% 30%"],
        boxShadow: "0 0 60px rgba(249, 115, 22, 0.6)",
        transition: { duration: 0.5, repeat: Infinity, ease: "linear" }
      };
    } else {
      return {
        backgroundColor: "#ef4444", // red-500
        scale: 1.3,
        borderRadius: ["30% 70% 80% 20%", "70% 30% 20% 80%", "80% 20% 70% 30%", "30% 70% 80% 20%"],
        boxShadow: "0 0 80px rgba(239, 68, 68, 0.8)",
        transition: { duration: 0.2, repeat: Infinity, ease: "linear" }
      };
    }
  };

  return (
    <div 
      className="w-full h-full bg-black text-white relative overflow-hidden flex flex-col items-center justify-center font-sans select-none touch-none"
      onPointerDown={handleInsulinRelease} // Make entire screen the touch target
    >
      <AnimatePresence mode="wait">
        
        {/* Setup Screen */}
        {gameState === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-10 flex flex-col items-center justify-center p-6 text-center absolute inset-0 pointer-events-none"
          >
            <h1 className="text-3xl tracking-[0.3em] uppercase mb-8 font-light">The Homeostasis Engine</h1>
            <p className="text-gray-500 mb-6 max-w-md font-light text-sm">
              You are the beta cell. Tap the screen rapidly to release insulin and compress the glucose spike.
            </p>
            <div className="text-xs text-gray-400 bg-white/5 border border-white/10 rounded-xl p-4 mb-12 max-w-md text-left space-y-3">
              <p><strong className="text-orange-400 block mb-1">Hyperglycemia (Game Over):</strong> Glucose spikes above 200 mg/dL if you tap too slow.</p>
              <p><strong className="text-blue-400 block mb-1">Hypoglycemia (Game Over):</strong> Glucose drops below 50 mg/dL if you tap too fast.</p>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); startGame(); }}
              className="px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm font-bold pointer-events-auto"
            >
              Assume Control
            </button>
          </motion.div>
        )}

        {/* Failed: Hyperglycemia */}
        {gameState === 'hyperglycemia' && (
          <motion.div
            key="hyperglycemia"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 flex flex-col items-center justify-center p-6 text-center absolute inset-0 bg-red-950/80 pointer-events-none"
          >
            <p className="text-red-500 uppercase tracking-widest text-sm mb-4 font-bold">System Failure: Hyperglycemia</p>
            <h2 className="text-4xl font-black tracking-tighter mb-4">Metabolic Overload</h2>
            <p className="text-white/70 mb-12 uppercase tracking-widest text-xs">Your pancreas failed at: <br/><span className="text-white font-bold">{LEVELS[levelIndex].name}</span></p>
            
            <button 
              onClick={(e) => { e.stopPropagation(); startGame(); }}
              className="px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm font-bold pointer-events-auto"
            >
              Attempt Restart
            </button>
          </motion.div>
        )}

        {/* Failed: Hypoglycemia */}
        {gameState === 'hypoglycemia' && (
          <motion.div
            key="hypoglycemia"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 flex flex-col items-center justify-center p-6 text-center absolute inset-0 bg-blue-950/80 pointer-events-none"
          >
            <p className="text-blue-500 uppercase tracking-widest text-sm mb-4 font-bold">System Failure: Hypoglycemia</p>
            <h2 className="text-4xl font-black tracking-tighter mb-4">Insulin Shock</h2>
            <p className="text-white/70 mb-12 uppercase tracking-widest text-xs">You flooded the system. The cell starved.</p>
            
            <button 
              onClick={(e) => { e.stopPropagation(); startGame(); }}
              className="px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm font-bold pointer-events-auto"
            >
              Attempt Restart
            </button>
          </motion.div>
        )}

        {/* Victory */}
        {gameState === 'victory' && (
          <motion.div
            key="victory"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 flex flex-col items-center justify-center p-6 text-center absolute inset-0 bg-white text-black pointer-events-none"
          >
            <p className="text-gray-500 uppercase tracking-widest text-sm mb-4 font-bold">Absolute Homeostasis</p>
            <h2 className="text-4xl font-black tracking-tighter mb-4">You Survived</h2>
            <p className="text-black/70 mb-12 uppercase tracking-widest text-xs">Your metabolic capacity is supreme.</p>
            
            <button 
              onClick={(e) => { e.stopPropagation(); startGame(); }}
              className="px-8 py-4 bg-black text-white hover:bg-gray-800 transition-colors uppercase tracking-widest text-sm font-bold pointer-events-auto"
            >
              Go Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gameplay HUD */}
      {gameState === 'playing' && (
        <div className="absolute top-24 left-0 right-0 px-8 flex justify-between items-start z-0 pointer-events-none">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-500 tracking-widest uppercase mb-1">Target</span>
            <span className="text-xl font-bold tracking-tighter text-white">{LEVELS[levelIndex].name}</span>
            <span className="text-[10px] text-gray-400 mt-1 uppercase">Survive: {Math.ceil(timeLeft)}s</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 tracking-widest uppercase mb-1">Glucose</span>
            <span className={`text-3xl font-black tracking-tighter ${glucose > 140 ? 'text-orange-500' : glucose < 70 ? 'text-blue-500' : 'text-white'}`}>
              {Math.floor(glucose)}
            </span>
            <span className="text-[10px] text-gray-500 mt-1">mg/dL</span>
          </div>
        </div>
      )}

      {/* The Cell (Orb) */}
      {(gameState === 'playing' || gameState === 'setup') && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Grid lines to give a sense of space/scale */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          <motion.div
            className="w-48 h-48 relative z-10"
            animate={getCellVisuals()}
          />
        </div>
      )}

      {/* Instructions Overlay during play */}
      {gameState === 'playing' && (
        <div className="absolute bottom-12 left-0 right-0 flex justify-center pointer-events-none">
          <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] animate-pulse">Tap anywhere to release insulin</span>
        </div>
      )}

    </div>
  );
};
