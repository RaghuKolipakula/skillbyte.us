"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLedger } from '@/lib/useLedger';
import { Play, RotateCcw, Activity } from 'lucide-react';

interface NBackEngineProps {
  autoStart?: boolean;
  onComplete?: (maxLevel: number) => void;
  hideControls?: boolean;
}

const AUDIO_STIMULI = ['C', 'H', 'L', 'Q', 'R', 'S'];
const GRID_SIZE = 9;
const TRIAL_DURATION_MS = 2500;
const TOTAL_TRIALS = 20;

export function NBackEngine({ autoStart = false, onComplete, hideControls = false }: NBackEngineProps) {
  const [isActive, setIsActive] = useState(autoStart);
  const [nLevel, setNLevel] = useState(1);
  const [currentTrial, setCurrentTrial] = useState(0);
  
  // Game sequence state
  const [sequence, setSequence] = useState<{ position: number; audio: string }[]>([]);
  const [currentPosition, setCurrentPosition] = useState<number | null>(null);
  
  // User input state for the current trial
  const [positionMatched, setPositionMatched] = useState(false);
  const [audioMatched, setAudioMatched] = useState(false);
  
  // Scoring
  const [score, setScore] = useState({ correct: 0, incorrect: 0, missed: 0 });
  const [isFinished, setIsFinished] = useState(false);

  const { updateNBackMaxLevel } = useLedger();

  // Refs for timer management and state access inside timeouts
  const trialTimerRef = useRef<NodeJS.Timeout | null>(null);
  const stateRef = useRef({
    currentTrial,
    sequence,
    nLevel,
    positionMatched,
    audioMatched,
  });

  // Sync refs
  useEffect(() => {
    stateRef.current = { currentTrial, sequence, nLevel, positionMatched, audioMatched };
  }, [currentTrial, sequence, nLevel, positionMatched, audioMatched]);

  const generateSequence = useCallback((n: number) => {
    // Generate a sequence of TOTAL_TRIALS with roughly 30% match probability
    const newSeq = [];
    for (let i = 0; i < TOTAL_TRIALS; i++) {
      let position = Math.floor(Math.random() * GRID_SIZE);
      let audio = AUDIO_STIMULI[Math.floor(Math.random() * AUDIO_STIMULI.length)];
      
      // Force some matches
      if (i >= n) {
        if (Math.random() < 0.3) position = newSeq[i - n].position;
        if (Math.random() < 0.3) audio = newSeq[i - n].audio;
      }
      newSeq.push({ position, audio });
    }
    return newSeq;
  }, []);

  const evaluateTrial = useCallback(() => {
    const { currentTrial: t, sequence: seq, nLevel: n, positionMatched: pm, audioMatched: am } = stateRef.current;
    if (t < n) return; // No n-back possible yet

    const targetPos = seq[t - n].position;
    const targetAud = seq[t - n].audio;
    const currentPos = seq[t].position;
    const currentAud = seq[t].audio;

    const isPosMatch = targetPos === currentPos;
    const isAudMatch = targetAud === currentAud;

    let correct = 0;
    let incorrect = 0;
    let missed = 0;

    // Evaluate Position
    if (isPosMatch && pm) correct++;
    else if (!isPosMatch && pm) incorrect++;
    else if (isPosMatch && !pm) missed++;

    // Evaluate Audio
    if (isAudMatch && am) correct++;
    else if (!isAudMatch && am) incorrect++;
    else if (isAudMatch && !am) missed++;

    setScore(prev => ({
      correct: prev.correct + correct,
      incorrect: prev.incorrect + incorrect,
      missed: prev.missed + missed
    }));
  }, []);

  const endSession = useCallback(() => {
    setIsActive(false);
    setIsFinished(true);
    setCurrentPosition(null);
    updateNBackMaxLevel(nLevel);

    if (onComplete) {
      onComplete(nLevel);
    }
  }, [nLevel, updateNBackMaxLevel, onComplete]);

  const nextTrial = useCallback(() => {
    const nextIdx = stateRef.current.currentTrial + 1;
    
    if (nextIdx >= TOTAL_TRIALS) {
      // End of sequence
      evaluateTrial();
      endSession();
      return;
    }

    // Evaluate previous trial before moving on
    if (nextIdx > 0) {
      evaluateTrial();
    }

    // Reset user inputs
    setPositionMatched(false);
    setAudioMatched(false);
    setCurrentTrial(nextIdx);

    // Show stimulus
    const currentStim = stateRef.current.sequence[nextIdx];
    setCurrentPosition(currentStim.position);
    
    // Play audio
    const utterance = new SpeechSynthesisUtterance(currentStim.audio);
    utterance.rate = 1.2;
    window.speechSynthesis.speak(utterance);

    // Clear visual stimulus after 1 second (so it blinks)
    setTimeout(() => {
      if (stateRef.current.currentTrial === nextIdx) { // Ensure we haven't reset
        setCurrentPosition(null);
      }
    }, 1000);

  }, [evaluateTrial, endSession]);

  const startSequence = useCallback(() => {
    const seq = generateSequence(nLevel);
    setSequence(seq);
    setScore({ correct: 0, incorrect: 0, missed: 0 });
    setCurrentTrial(-1); // Will immediately increment to 0
    setIsFinished(false);
    setIsActive(true);
  }, [nLevel, generateSequence]);

  // Main loop
  useEffect(() => {
    if (isActive) {
      // Start immediately
      nextTrial();
      trialTimerRef.current = setInterval(nextTrial, TRIAL_DURATION_MS);
    } else {
      if (trialTimerRef.current) clearInterval(trialTimerRef.current);
    }

    return () => {
      if (trialTimerRef.current) clearInterval(trialTimerRef.current);
    };
  }, [isActive, nextTrial]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive) return;
      if (e.key.toLowerCase() === 'a') setPositionMatched(true);
      if (e.key.toLowerCase() === 'l') setAudioMatched(true);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  const handleLevelAdjust = (delta: number) => {
    setNLevel(prev => Math.max(1, prev + delta));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-4 md:p-8">
      
      {/* HUD */}
      <div className="w-full flex justify-between items-center mb-12">
        <div className="font-mono text-sm tracking-widest text-gray-500 uppercase">
          N = {nLevel}
        </div>
        <div className="flex space-x-6 text-sm font-mono">
          <span className="text-[#32d74b]">C: {score.correct}</span>
          <span className="text-[#ff453a]">I: {score.incorrect}</span>
          <span className="text-[#ffd60a]">M: {score.missed}</span>
        </div>
        <div className="font-mono text-sm tracking-widest text-gray-500">
          {Math.max(0, currentTrial + 1)} / {TOTAL_TRIALS}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-[300px] md:max-w-[400px] aspect-square mb-12">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div 
            key={idx}
            className={`border border-gray-800 rounded-lg transition-colors duration-150 flex items-center justify-center ${currentPosition === idx ? 'bg-white shadow-[0_0_30px_rgba(255,255,255,0.4)]' : 'bg-[#111]'}`}
          >
            {/* Optional dot inside active square for high contrast */}
            {currentPosition === idx && <div className="w-4 h-4 bg-black rounded-full" />}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-full space-y-6">
        
        {/* Input Buttons (Mobile friendly) */}
        <div className="flex space-x-8">
          <button 
            onClick={() => setPositionMatched(true)}
            disabled={!isActive || positionMatched}
            className={`w-32 py-4 rounded-xl font-bold tracking-widest uppercase transition-all ${positionMatched ? 'bg-white text-black scale-95' : 'bg-[#1a1a1c] text-white hover:bg-[#222]'}`}
          >
            Pos (A)
          </button>
          <button 
            onClick={() => setAudioMatched(true)}
            disabled={!isActive || audioMatched}
            className={`w-32 py-4 rounded-xl font-bold tracking-widest uppercase transition-all ${audioMatched ? 'bg-white text-black scale-95' : 'bg-[#1a1a1c] text-white hover:bg-[#222]'}`}
          >
            Audio (L)
          </button>
        </div>

        {/* Master Controls */}
        {!hideControls && (
          <div className="flex items-center space-x-6 pt-8 border-t border-gray-800 w-full justify-center">
            
            {!isActive && !isFinished && (
              <div className="flex items-center space-x-4 mr-8">
                <button onClick={() => handleLevelAdjust(-1)} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700">-</button>
                <span className="font-mono">Level {nLevel}</span>
                <button onClick={() => handleLevelAdjust(1)} className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700">+</button>
              </div>
            )}

            {!isActive ? (
              <button 
                onClick={startSequence}
                className="flex items-center px-8 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform"
              >
                {isFinished ? <RotateCcw size={18} className="mr-2" /> : <Play size={18} className="mr-2" />}
                {isFinished ? 'Retrain' : 'Initialize Matrix'}
              </button>
            ) : (
              <div className="flex items-center text-red-500 animate-pulse font-mono text-sm tracking-widest">
                <Activity size={16} className="mr-2" />
                Processing
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
