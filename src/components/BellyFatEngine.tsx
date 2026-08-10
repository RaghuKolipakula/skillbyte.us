"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, Pause, Square } from 'lucide-react';
import { useLedger } from '@/lib/useLedger';

interface BellyFatEngineProps {
  onComplete?: () => void;
  autoStart?: boolean;
  hideControls?: boolean;
}

export function BellyFatEngine({ onComplete, autoStart = false, hideControls = false }: BellyFatEngineProps) {
  const [isActive, setIsActive] = useState(autoStart);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isPaused, setIsPaused] = useState(false);
  const { addBellyFatWorkout } = useLedger();

  const exercises = [
    { name: 'Hollow Body Hold', image: '/images/hollow_body_hold.jpg' },
    { name: 'Deadbug', image: '/images/deadbug.jpg' },
    { name: 'Plank with Shoulder Taps', image: '/images/plank_shoulder_taps.jpg' },
    { name: 'Bird-Dog', image: '/images/bird_dog.jpg' },
    { name: 'Ab-Wheel Rollout', image: '/images/ab_wheel_rollout.jpg' },
  ];

  const currentExerciseIndex = Math.min(4, Math.floor((300 - timeLeft) / 60));
  const currentExercise = exercises[currentExerciseIndex];
  const nextExercise = currentExerciseIndex < 4 ? exercises[currentExerciseIndex + 1] : null;

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setTimeout(() => {
        setIsActive(false);
        addBellyFatWorkout();
        if (onComplete) onComplete();
      }, 0);
    }
    return () => clearInterval(interval);
  }, [isActive, isPaused, timeLeft, addBellyFatWorkout, onComplete]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleEnd = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(300);
    if (onComplete) onComplete(); // Treat manual exit as complete for flow? Or just stop.
  };

  if (!isActive && !hideControls) {
    // If not active and not in flow mode, we don't render the UI here, it's handled by the parent
    // However, if we want this engine to be self-contained, we just return null and let parent trigger autoStart
    return null;
  }

  return (
    <div className="fixed inset-0 z-40 bg-white dark:bg-black flex flex-col items-center justify-center px-4 fade-in">
      <div className="absolute top-24 text-center">
        <div className="inline-flex items-center space-x-2 bg-gray-100 dark:bg-[#1d1d1f] px-4 py-1.5 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-widest mb-4">
          Movement {currentExerciseIndex + 1} of 5
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black dark:text-white">
          {currentExercise.name}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">
          {nextExercise ? `Up next: ${nextExercise.name}` : 'Final movement!'}
        </p>
      </div>

      {/* Exercise Image */}
      <div className="relative w-full max-w-2xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800 mb-8 mt-48">
        <Image 
          src={currentExercise.image} 
          alt={currentExercise.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Massive Timer */}
      <div className={`text-[80px] md:text-[140px] font-bold tracking-tighter leading-none mb-8 tabular-nums transition-colors duration-300 ${isPaused ? 'text-gray-300 dark:text-gray-800' : 'text-[#32d74b]'}`}>
        {formatTime(timeLeft)}
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-8">
        {!hideControls && (
          <button 
            onClick={handleEnd}
            className="w-16 h-16 rounded-full bg-gray-100 dark:bg-[#1d1d1f] flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="End Workout"
          >
            <Square size={24} className="fill-current" />
          </button>
        )}
        
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className="w-24 h-24 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black hover:scale-105 transition-transform shadow-2xl"
          aria-label={isPaused ? "Resume" : "Pause"}
        >
          {isPaused ? <Play size={40} className="fill-current ml-2" /> : <Pause size={40} className="fill-current" />}
        </button>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
