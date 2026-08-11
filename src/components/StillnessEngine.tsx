"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Target, RotateCcw, ShieldCheck, AlertOctagon } from 'lucide-react';

type State = 'idle' | 'running' | 'failed' | 'victory';

const MAX_RADIUS = 150;
const MIN_RADIUS = 10;
const DURATION_MS = 60000; // 60 seconds

export function StillnessEngine() {
  const [state, setState] = useState<State>('idle');
  const [radius, setRadius] = useState(MAX_RADIUS);
  const [timeLeft, setTimeLeft] = useState(60);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerPos = useRef<{ x: number; y: number } | null>(null);
  const centerPos = useRef<{ x: number; y: number } | null>(null);
  const startTime = useRef<number>(0);
  
  // Calculate center on mount and resize
  const updateCenter = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      centerPos.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    }
  }, []);

  useEffect(() => {
    updateCenter();
    window.addEventListener('resize', updateCenter);
    return () => window.removeEventListener('resize', updateCenter);
  }, [updateCenter]);

  // Main game loop
  useEffect(() => {
    if (state !== 'running') return;
    
    startTime.current = Date.now();
    let localRafId: number;

    const tick = () => {
      const elapsed = Date.now() - startTime.current;
      
      // Victory condition
      if (elapsed >= DURATION_MS) {
        setState('victory');
        setRadius(MIN_RADIUS);
        setTimeLeft(0);
        
        // Mint Proof of Stillness token
        try {
          const ledger = JSON.parse(localStorage.getItem('identity_ledger') || '{}');
          ledger['proof_of_stillness'] = new Date().toISOString();
          localStorage.setItem('identity_ledger', JSON.stringify(ledger));
        } catch {
          // Ignore local storage errors
        }
        return;
      }

      // Shrink radius exponentially
      const progress = elapsed / DURATION_MS;
      // Ease-in curve so it shrinks faster at the end to increase pressure
      const easeProgress = Math.pow(progress, 2); 
      const currentRadius = MAX_RADIUS - (MAX_RADIUS - MIN_RADIUS) * easeProgress;
      
      setRadius(currentRadius);
      setTimeLeft(Math.ceil((DURATION_MS - elapsed) / 1000));

      // Check collision
      if (pointerPos.current && centerPos.current) {
        const dx = pointerPos.current.x - centerPos.current.x;
        const dy = pointerPos.current.y - centerPos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > currentRadius) {
          // Failed
          setState('failed');
          return;
        }
      } else {
        // Pointer left the screen or wasn't captured
        setState('failed');
        return;
      }

      localRafId = requestAnimationFrame(tick);
    };

    localRafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(localRafId);
    };
  }, [state]);

  const handlePointerMove = (e: React.PointerEvent) => {
    pointerPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerLeave = () => {
    if (state === 'running') {
      setState('failed');
    }
    pointerPos.current = null;
  };

  const startEngine = () => {
    if (!centerPos.current || !pointerPos.current) return;
    
    // Only allow start if pointer is exactly in the center (within MAX_RADIUS)
    const dx = pointerPos.current.x - centerPos.current.x;
    const dy = pointerPos.current.y - centerPos.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance <= MAX_RADIUS) {
      setRadius(MAX_RADIUS);
      setState('running');
    }
  };

  const resetEngine = () => {
    setState('idle');
    setRadius(MAX_RADIUS);
    setTimeLeft(60);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 flex flex-col items-center justify-center min-h-[80vh] relative">
      
      <div className="text-center mb-8 z-10 pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          The Stillness Engine.
        </h1>
        <p className="text-lg text-gray-400 font-light max-w-md mx-auto">
          Impulse inhibition training. Hold your position within the shrinking boundary. A single twitch is a failure.
        </p>
      </div>

      {/* The Arena */}
      <div 
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={state === 'idle' ? startEngine : undefined}
        className={`relative w-full max-w-lg aspect-square flex items-center justify-center rounded-3xl transition-colors duration-300 touch-none ${
          state === 'failed' ? 'bg-red-950/40 border border-red-900' : 
          state === 'victory' ? 'bg-green-950/20 border border-green-900/50' :
          'bg-[#0a0a0a] border border-gray-900'
        }`}
        style={{ cursor: state === 'running' ? 'crosshair' : 'default' }}
      >
        
        {/* The Boundary */}
        {state !== 'failed' && state !== 'victory' && (
          <div 
            className={`absolute rounded-full pointer-events-none flex items-center justify-center transition-colors duration-300 ${
              state === 'idle' ? 'border-2 border-dashed border-gray-600 animate-[spin_10s_linear_infinite]' : 'border-[3px] border-white'
            }`}
            style={{ 
              width: radius * 2, 
              height: radius * 2,
            }}
          >
            {state === 'idle' && (
              <div className="absolute inset-0 flex items-center justify-center animate-[spin_10s_linear_infinite_reverse]">
                <Target size={24} className="text-gray-500" />
              </div>
            )}
          </div>
        )}

        {/* States Overlays */}
        {state === 'idle' && (
          <div className="absolute bottom-8 text-gray-500 text-sm font-bold tracking-widest uppercase animate-pulse pointer-events-none">
            Place cursor in center ring & click to lock
          </div>
        )}

        {state === 'running' && (
          <div className="absolute top-8 text-white text-5xl font-black tabular-nums pointer-events-none">
            {timeLeft}s
          </div>
        )}

        {state === 'failed' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
            <AlertOctagon size={64} className="text-red-500 mb-4" />
            <h2 className="text-3xl font-bold text-red-500 mb-2">Micro-Tremor Detected</h2>
            <p className="text-gray-400 mb-8 font-mono text-sm">Boundary breach at {timeLeft}s remaining.</p>
            <button 
              onClick={resetEngine}
              className="flex items-center space-x-2 text-white bg-red-950/50 hover:bg-red-900 px-6 py-3 rounded-full font-bold uppercase tracking-wider transition-colors z-20"
            >
              <RotateCcw size={18} />
              <span>Restart Protocol</span>
            </button>
          </div>
        )}

        {state === 'victory' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center animate-in slide-in-from-bottom-8 duration-700">
            <ShieldCheck size={64} className="text-green-500 mb-4" />
            <h2 className="text-4xl font-bold text-white mb-2">Absolute Stillness</h2>
            <p className="text-gray-400 mb-8 max-w-xs text-center leading-relaxed">
              You have maintained perfect impulse inhibition for 60 seconds. A Proof of Stillness token has been minted in your Identity Ledger.
            </p>
            <button 
              onClick={resetEngine}
              className="flex items-center space-x-2 text-white bg-white/10 hover:bg-white/20 px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-colors z-20"
            >
              <Target size={18} />
              <span>Engage Again</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
