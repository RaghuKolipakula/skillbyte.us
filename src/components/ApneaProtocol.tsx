"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Wind, Activity, TimerReset, ArrowRight } from 'lucide-react';

type Phase = 'intro' | 'prep' | 'inhale' | 'running' | 'result';

export function ApneaProtocol() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [prepTimeLeft, setPrepTimeLeft] = useState(3);
  const [inhaleTimeLeft, setInhaleTimeLeft] = useState(5);
  const [exhaleTime, setExhaleTime] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Note: Following React best practices for intervals.
  // We use functional state updates or refs to avoid dependency array issues.
  useEffect(() => {
    if (phase === 'prep') {
      const interval = setInterval(() => {
        setPrepTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setPhase('inhale');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
    
    if (phase === 'inhale') {
      const interval = setInterval(() => {
        setInhaleTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setPhase('running');
            startTimeRef.current = Date.now();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }

    if (phase === 'running') {
      timerRef.current = setInterval(() => {
        // Calculate exact time elapsed to avoid JS timer drift
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setExhaleTime(elapsed);
      }, 50);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [phase]);

  const handleStop = () => {
    if (phase === 'running') {
      if (timerRef.current) clearInterval(timerRef.current);
      setPhase('result');
    }
  };

  const resetDiagnostic = () => {
    setPhase('prep');
    setPrepTimeLeft(3);
    setInhaleTimeLeft(5);
    setExhaleTime(0);
  };

  const getResultFeedback = (time: number) => {
    if (time < 25) {
      return {
        level: "Panic-Prone",
        color: "text-red-500",
        message: "Your nervous system is highly reactive to stress. A low CO2 tolerance means your body triggers the fight-or-flight response prematurely.",
        prescription: "Box Breathing (4-4-4-4) 2x daily."
      };
    }
    if (time < 40) {
      return {
        level: "Average",
        color: "text-yellow-500",
        message: "You have a baseline functional tolerance to stress, but high-pressure situations will still cause physiological breakdown.",
        prescription: "CO2 Tolerance Tables 3x weekly."
      };
    }
    return {
      level: "Elite",
      color: "text-green-500",
      message: "Exceptional CO2 tolerance. Your nervous system remains calm under severe chemical and psychological stress.",
      prescription: "Advanced Apnea Training (Max Holds)."
    };
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 flex flex-col items-center justify-center min-h-[80vh]">
      
      {phase === 'intro' && (
        <div className="text-center animate-in fade-in duration-1000">
          <Activity size={48} className="mx-auto mb-8 text-white opacity-80" />
          <h1 className="text-5xl font-bold tracking-tighter mb-4">The Apnea Protocol</h1>
          <p className="text-lg text-gray-400 font-light mb-12 max-w-md mx-auto">
            Measure your physiological panic threshold. A stark test of CO2 tolerance and nervous system resilience.
          </p>
          
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-6 text-left mb-12 text-gray-300 space-y-4 shadow-xl">
             <h3 className="text-white font-bold tracking-wide uppercase text-sm border-b border-gray-800 pb-2 mb-4">Diagnostic Flow</h3>
             <p className="flex items-center"><span className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-xs mr-3">1</span> Take 3 normal breaths.</p>
             <p className="flex items-center"><span className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center text-xs mr-3">2</span> Take 1 massive inhale.</p>
             <p className="flex items-center font-bold text-white"><span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-xs mr-3">3</span> Exhale as slowly as humanly possible.</p>
          </div>

          <button 
            onClick={() => setPhase('prep')}
            className="bg-white text-black px-12 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Initiate Diagnostic
          </button>
        </div>
      )}

      {phase === 'prep' && (
        <div className="text-center animate-in zoom-in duration-500">
          <Wind size={48} className="mx-auto mb-8 text-gray-500 animate-pulse" />
          <h2 className="text-3xl font-bold tracking-tighter mb-4">Take 3 Normal Breaths</h2>
          <div className="text-8xl font-black text-gray-800">{prepTimeLeft}</div>
        </div>
      )}

      {phase === 'inhale' && (
        <div className="text-center animate-in zoom-in duration-500 scale-110">
          <h2 className="text-4xl font-bold tracking-tighter mb-4 text-white">Massive Inhale</h2>
          <p className="text-gray-400 mb-8 uppercase tracking-widest text-sm font-bold">Fill the lungs completely</p>
          <div className="text-8xl font-black text-white">{inhaleTimeLeft}</div>
        </div>
      )}

      {phase === 'running' && (
        <div 
          onClick={handleStop}
          className="w-full h-[60vh] flex flex-col items-center justify-center cursor-pointer group animate-in fade-in duration-500"
        >
          <div className="relative w-64 h-64 flex items-center justify-center mb-8">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle 
                cx="128" 
                cy="128" 
                r="120" 
                fill="none" 
                stroke="#111" 
                strokeWidth="4"
              />
              <circle 
                cx="128" 
                cy="128" 
                r="120" 
                fill="none" 
                stroke="white" 
                strokeWidth="4"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={(2 * Math.PI * 120) * (1 - (exhaleTime / 60))} // Assuming 60s is a "full" visual circle for scale
                className="transition-all duration-75 ease-linear"
              />
            </svg>
            <div className="text-center z-10">
              <div className="text-5xl font-bold tracking-tighter tabular-nums">{exhaleTime.toFixed(1)}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">Seconds</div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Exhale Slowly</h2>
          <p className="text-gray-500 uppercase tracking-widest text-sm font-bold group-hover:text-white transition-colors">
            Tap screen when lungs are empty
          </p>
        </div>
      )}

      {phase === 'result' && (
        <div className="w-full text-center animate-in slide-in-from-bottom-8 duration-700">
          <div className="mb-12">
            <p className="text-gray-500 uppercase tracking-widest font-bold mb-2">Diagnostic Complete</p>
            <div className="text-7xl font-black tracking-tighter tabular-nums mb-4">{exhaleTime.toFixed(1)}s</div>
            
            {(() => {
              const feedback = getResultFeedback(exhaleTime);
              return (
                <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 text-left shadow-2xl relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1 ${feedback.color.replace('text', 'bg')}`}></div>
                  <h3 className={`text-2xl font-bold mb-2 ${feedback.color}`}>State: {feedback.level}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {feedback.message}
                  </p>
                  
                  <div className="bg-black border border-gray-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-gray-600 font-bold block mb-1">Recommended Protocol</span>
                      <span className="text-white font-bold">{feedback.prescription}</span>
                    </div>
                    <ArrowRight className="text-gray-600" />
                  </div>
                </div>
              );
            })()}
          </div>

          <button 
            onClick={resetDiagnostic}
            className="group flex items-center mx-auto space-x-2 text-gray-400 hover:text-white transition-colors font-bold uppercase tracking-wider text-sm"
          >
            <TimerReset size={18} className="group-hover:-rotate-180 transition-transform duration-500" />
            <span>Retest Tolerance</span>
          </button>
        </div>
      )}

    </div>
  );
}
