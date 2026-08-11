"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type GameState = 'setup' | 'playing' | 'failed';
type TargetSide = 'left' | 'right' | null;

export const VoidEngine = () => {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [score, setScore] = useState(0);
  const [ripples, setRipples] = useState<{ id: number, x: number, y: number }[]>([]);
  
  // Game refs to avoid state capture in timeouts
  const audioContextRef = useRef<AudioContext | null>(null);
  const targetSideRef = useRef<TargetSide>(null);
  const windowMsRef = useRef(1500);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rippleIdRef = useRef(0);

  // Initialize Web Audio API on first user interaction
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playPing = (side: 'left' | 'right') => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = ctx.createStereoPanner();

    // Deep, heavy ping
    osc.type = 'sine';
    // Frequency increases slightly with score to increase tension
    const freq = 150 + Math.min(score * 5, 200); 
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Hard pan
    panner.pan.value = side === 'left' ? -1 : 1;

    // Fast attack, exponential release
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    osc.connect(panner);
    panner.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.6);
  };

  const playFailSound = () => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(10, ctx.currentTime + 1);

    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1);
  };

  const spawnRipple = (x: number, y: number) => {
    const id = rippleIdRef.current++;
    setRipples(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 1000);
  };

  const fail = useCallback(() => {
    setGameState('failed');
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    targetSideRef.current = null;
    playFailSound();
    
    // Attempt aggressive haptic feedback if supported
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([200, 100, 200, 100, 400]);
    }
  }, []);

  const nextTurn = useCallback(() => {
    const side: TargetSide = Math.random() > 0.5 ? 'left' : 'right';
    targetSideRef.current = side;
    
    // Play the cue
    playPing(side);

    // Set the failure timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fail();
    }, windowMsRef.current);
  }, [fail, score]);

  const handleStart = () => {
    initAudio();
    setGameState('playing');
    setScore(0);
    windowMsRef.current = 1500;
    
    // Wait a brief moment before the first ping
    setTimeout(() => {
      nextTurn();
    }, 1000);
  };

  const handleInteraction = (e: React.PointerEvent) => {
    if (gameState !== 'playing') return;

    // Spawn visual feedback
    const x = e.clientX;
    const y = e.clientY;
    spawnRipple(x, y);

    const isLeft = x < window.innerWidth / 2;
    const tappedSide: TargetSide = isLeft ? 'left' : 'right';

    if (tappedSide === targetSideRef.current) {
      // Success
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      targetSideRef.current = null;
      
      setScore(s => s + 1);
      
      // Exponentially tighten the time window (down to a minimum floor)
      windowMsRef.current = Math.max(300, windowMsRef.current * 0.92);

      // Random delay before next ping to prevent rhythm gaming
      const delay = 400 + Math.random() * 800;
      setTimeout(() => {
        if (gameState === 'playing') {
          nextTurn();
        }
      }, delay);
    } else {
      // Failed - tapped wrong side or tapped when no target active
      fail();
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div 
      className="w-full h-full bg-black text-white relative overflow-hidden flex items-center justify-center font-sans select-none touch-none"
      onPointerDown={handleInteraction}
    >
      
      {/* Ripples Layer */}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-16 h-16 bg-white rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}

      <AnimatePresence mode="wait">
        
        {/* Setup Screen */}
        {gameState === 'setup' && (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="z-10 flex flex-col items-center justify-center p-6 text-center"
          >
            <h1 className="text-3xl tracking-[0.3em] uppercase mb-8 font-light">The Void Engine</h1>
            <p className="text-gray-400 mb-2 uppercase tracking-widest text-sm">Headphones required.</p>
            <p className="text-gray-500 mb-12 max-w-md font-light text-sm">
              Listen for the ping. Tap the corresponding side of the screen. The window will shrink until you break.
            </p>
            
            <button 
              onClick={handleStart}
              className="px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm font-bold"
            >
              Enter The Void
            </button>
          </motion.div>
        )}

        {/* Failed Screen */}
        {gameState === 'failed' && (
          <motion.div
            key="failed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="z-10 flex flex-col items-center justify-center p-6 text-center"
          >
            <p className="text-red-500 uppercase tracking-widest text-sm mb-4 font-bold">Neural Latency Failed</p>
            <h2 className="text-8xl font-black tracking-tighter mb-8">{score}</h2>
            <p className="text-gray-500 mb-12 uppercase tracking-widest text-xs">Synaptic connections severed.</p>
            
            <button 
              onClick={handleStart}
              className="px-8 py-4 bg-white text-black hover:bg-gray-200 transition-colors uppercase tracking-widest text-sm font-bold"
            >
              Restart Simulation
            </button>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Invisible Middle Divider for debugging/mental model, visible only vaguely if needed, but we keep it pure black */}
      {gameState === 'playing' && (
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/5 pointer-events-none"></div>
      )}

    </div>
  );
};
