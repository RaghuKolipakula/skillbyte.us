"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useLedger } from '@/lib/useLedger';
import { ArrowRight, Play, Info } from 'lucide-react';

// Configuration
const BASE_RATE = 1.05; // 5% compounding per tick
const TICK_MS = 100; // How fast time moves when holding down
const ELBOW_THRESHOLD = 5000; // When the color shift happens

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
}

export function CompoundingEngine() {
  const { addCompoundingSimulation } = useLedger();
  
  const [isPressing, setIsPressing] = useState(false);
  const [value, setValue] = useState(1);
  const [years, setYears] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [phase, setPhase] = useState<'linear' | 'elbow' | 'explosion'>('linear');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>(0);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPressing && !hasFinished) {
      if (!hasStarted) setHasStarted(true);
      
      interval = setInterval(() => {
        setValue((prev) => {
          const next = prev * BASE_RATE;
          if (next >= 1000000) {
            setHasFinished(true);
            addCompoundingSimulation();
            return 1000000;
          }
          return next;
        });
        setYears((y) => y + 1);
      }, TICK_MS);
    }
    return () => clearInterval(interval);
  }, [isPressing, hasFinished, hasStarted, addCompoundingSimulation]);

  useEffect(() => {
    if (value < ELBOW_THRESHOLD / 10) setPhase('linear');
    else if (value >= ELBOW_THRESHOLD / 10 && value < ELBOW_THRESHOLD) setPhase('elbow');
    else setPhase('explosion');
  }, [value]);

  // Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      
      // Determine color based on phase
      const isExplosion = phase === 'explosion';
      ctx.fillStyle = isExplosion ? '#32d74b' : '#ffffff';
      
      // Add new particles if pressing
      if (isPressing && !hasFinished) {
        // Spawn rate scales with value
        const spawnCount = Math.max(1, Math.floor(Math.log10(value) * 2));
        
        for(let i=0; i<spawnCount; i++) {
          particles.push({
            id: Math.random(),
            x: canvas.width / 2,
            y: canvas.height / 2,
            vx: (Math.random() - 0.5) * (isExplosion ? 20 : 5),
            vy: (Math.random() - 0.5) * (isExplosion ? 20 : 5),
            size: isExplosion ? Math.random() * 3 + 1 : 2,
            life: 1.0
          });
        }
      }

      // Update and draw
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.01;
        
        if (p.life <= 0 || p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Draw the central mass if we are in explosion phase
      if (phase === 'explosion') {
        const glowSize = Math.min(value / 1000, canvas.width / 2);
        const gradient = ctx.createRadialGradient(
          canvas.width/2, canvas.height/2, 0,
          canvas.width/2, canvas.height/2, glowSize
        );
        gradient.addColorStop(0, 'rgba(50, 215, 75, 0.8)');
        gradient.addColorStop(1, 'rgba(50, 215, 75, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2, glowSize, 0, Math.PI * 2);
        ctx.fill();
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isPressing, phase, value, hasFinished]);

  const handleStart = () => setIsPressing(true);
  const handleStop = () => setIsPressing(false);

  // Format value beautifully - show decimals early on so user knows it's working
  const displayValue = value < 100 
    ? value.toFixed(2) 
    : Math.floor(value).toLocaleString();

  return (
    <div 
      className="w-full flex flex-col items-center justify-center relative min-h-screen"
      style={{ backgroundColor: '#000000' }}
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      <div className="z-10 flex flex-col items-center select-none w-full max-w-lg px-6">
        
        {/* Top Text / Hook */}
        <div className={`transition-opacity duration-1000 text-center mb-12 ${hasStarted ? 'opacity-0' : 'opacity-100'}`}>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-white">
            The Exponential Illusion.
          </h1>
          <p className="text-gray-400 font-mono text-sm max-w-md mx-auto">
            Humans process the world linearly. We are blind to leverage. Press and hold to visualize 5% compound growth.
          </p>
        </div>

        {/* The Number Display */}
        <div className={`transition-all duration-700 text-center ${hasStarted ? 'scale-100' : 'scale-90 opacity-0'}`}>
          <div className="font-mono text-gray-500 mb-2 uppercase tracking-widest text-xs">
            Cycle {years}
          </div>
          <div 
            className={`font-bold tracking-tighter transition-colors duration-1000`}
            style={{ 
              fontSize: hasFinished ? '6rem' : '4rem',
              color: phase === 'explosion' ? '#32d74b' : '#ffffff',
              textShadow: phase === 'explosion' ? '0 0 40px rgba(50, 215, 75, 0.5)' : 'none'
            }}
          >
            {displayValue}
          </div>
        </div>

        {/* The Interaction Button */}
        <div className={`mt-16 transition-opacity duration-500 ${hasFinished ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <button
            onMouseDown={handleStart}
            onMouseUp={handleStop}
            onMouseLeave={handleStop}
            onTouchStart={handleStart}
            onTouchEnd={handleStop}
            className={`
              relative overflow-hidden rounded-full font-mono font-bold tracking-widest uppercase px-12 py-6 text-sm
              transition-all duration-300
              ${isPressing 
                ? (phase === 'explosion' ? 'bg-[#32d74b] text-black scale-95 shadow-[0_0_30px_#32d74b]' : 'bg-white text-black scale-95') 
                : 'bg-transparent text-white border border-white/30 hover:border-white/60'}
            `}
          >
            {isPressing ? 'Accelerating' : 'Hold to Compound'}
          </button>
        </div>

        {/* Completion Message */}
        {hasFinished && (
          <div className="absolute bottom-20 text-center animate-fade-in">
            <p className="text-[#32d74b] font-mono text-sm mb-4">
              Critical Mass Reached.
            </p>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Most people quit early when the line looks flat. Don't interrupt compounding.
            </p>
            <button 
              onClick={() => {
                setValue(1);
                setYears(0);
                setHasFinished(false);
                setHasStarted(false);
                particlesRef.current = [];
              }}
              className="mt-8 text-white/50 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors"
            >
              Reset Simulation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
