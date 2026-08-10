"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Settings, 
  Lightbulb, 
  Lock, 
  Unlock,
  MoveRight,
  TrendingDown,
  Scale,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Activity
} from 'lucide-react';

export default function MechanicsLab() {
  const [unlockedStage, setUnlockedStage] = useState<number>(1);
  const [isPro, setIsPro] = useState<boolean>(false);
  
  // Stage 1 State
  const [leverLength, setLeverLength] = useState<number>(1);
  const effortRequired = Math.round(500 / leverLength); // simplified physics: 50kg * 10m/s^2 / length

  // Stage 2 State
  const [fulcrumPos, setFulcrumPos] = useState<number>(5); // 1 to 10
  const isBalanced = fulcrumPos === 10;

  // Stage 3 State
  const [machineParts, setMachineParts] = useState<string[]>([]);
  const requiredParts = ['lever', 'gear', 'pulley'];
  const [machineStatus, setMachineStatus] = useState<'idle' | 'success' | 'blunder'>('idle');

  // Stage 1 Effect
  useEffect(() => {
    if (leverLength >= 5 && unlockedStage < 2) {
      setTimeout(() => setUnlockedStage(2), 500);
    }
  }, [leverLength, unlockedStage]);

  // Stage 2 Effect
  useEffect(() => {
    if (isBalanced && unlockedStage < 3) {
      setTimeout(() => setUnlockedStage(3), 500);
    }
  }, [isBalanced, unlockedStage]);

  // Stage 3 Handlers
  const addPart = (part: string) => {
    if (machineParts.length < 3) {
      const newParts = [...machineParts, part];
      setMachineParts(newParts);
      
      if (newParts.length === 3) {
        if (JSON.stringify(newParts) === JSON.stringify(requiredParts)) {
          setMachineStatus('success');
          if (unlockedStage < 4) {
            setTimeout(() => setUnlockedStage(4), 1000);
          }
        } else {
          setMachineStatus('blunder');
          setTimeout(() => {
            setMachineParts([]);
            setMachineStatus('idle');
          }, 2000);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-black font-sans transition-colors duration-300 pb-32">
      
      {/* 1. App Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#ffffffcc] dark:bg-[#000000cc] backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <span className="font-semibold text-black dark:text-white tracking-tight flex items-center">
              <Settings size={18} className="mr-2 text-blue-500" /> Mechanics Lab
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5 bg-blue-500/10 dark:bg-blue-500/20 px-3 py-1 rounded-full">
              <Lightbulb size={16} className="text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                Stage {unlockedStage}/4
              </span>
            </div>
            
            {!isPro ? (
              <button 
                onClick={() => setIsPro(true)} // Mocking stripe redirect
                className="text-xs font-semibold uppercase tracking-wider text-white bg-black dark:bg-white dark:text-black px-3 py-1.5 rounded-full hover:scale-105 transition-transform"
              >
                Get Pro
              </button>
            ) : (
              <span className="text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text flex items-center">
                <Unlock size={14} className="mr-1 text-blue-400" /> Pro
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-28 px-4 max-w-3xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-4">
            From Curiosity to Invention.
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg font-light max-w-xl mx-auto">
            Discover the unseen forces that govern the physical world through interactive experimentation.
          </p>
        </div>

        {/* Stage 1: The Layman */}
        <div className={`transition-all duration-700 ease-out transform ${unlockedStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
          <div className="bg-white dark:bg-[#1d1d1f] rounded-3xl p-8 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">01. The Unseen Force</h2>
              {unlockedStage > 1 && <CheckCircle2 size={24} className="text-green-500" />}
            </div>
            
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
              Why does 50kg feel impossible to lift? Slide to introduce a lever and observe the force required.
            </p>

            {/* Interactive Diagram */}
            <div className="relative h-64 bg-gray-50 dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-end p-8 mb-8 overflow-hidden">
              {/* Force Annotations */}
              <div className="absolute top-8 right-8 text-right">
                <div className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">Effort Force</div>
                <div className={`text-3xl font-bold font-mono transition-colors duration-300 ${effortRequired <= 100 ? 'text-green-500' : 'text-red-500'}`}>
                  {effortRequired} N
                </div>
              </div>

              <div className="absolute top-8 left-8">
                <div className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">Load</div>
                <div className="text-3xl font-bold font-mono text-black dark:text-white">50 kg</div>
              </div>

              {/* The mechanical visualization */}
              <div 
                className={`relative w-full max-w-md h-32 border-b border-gray-200 dark:border-gray-800 flex items-end ${unlockedStage <= 1 ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-[#222]' : ''} transition-colors rounded-t-xl`}
                onClick={(e) => {
                  if (unlockedStage > 1) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = ((e.clientX - rect.left) / rect.width) * 100;
                  const val = Math.max(1, Math.min(10, Math.round((pct - 20) / 8)));
                  setLeverLength(val);
                }}
              >
                {/* Fulcrum */}
                <div className="absolute bottom-0 left-[20%] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[24px] border-b-blue-500/80"></div>
                
                {/* Lever */}
                <div 
                  className="absolute bottom-[24px] left-[10%] h-1 bg-black dark:bg-white rounded-full transition-all duration-300 origin-left shadow-sm"
                  style={{ width: `${20 + leverLength * 8}%`, transform: `rotate(${Math.max(0, 15 - leverLength * 2)}deg)` }}
                ></div>

                {/* Heavy Block */}
                <div className="absolute bottom-[26px] left-[10%] w-12 h-12 bg-gray-100 dark:bg-[#2a2a2c] border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm flex items-center justify-center text-gray-500 dark:text-gray-400 font-mono text-[10px]">
                  50kg
                </div>

                {/* Hand Indicator */}
                <div 
                  className="absolute bottom-[36px] flex flex-col items-center transition-all duration-300"
                  style={{ left: `calc(${10 + 20 + leverLength * 8}% - 12px)` }}
                >
                  <TrendingDown size={20} className={effortRequired <= 100 ? 'text-green-500' : 'text-gray-400'} />
                </div>

                {unlockedStage <= 1 && (
                  <div className="absolute top-4 w-full text-center text-[10px] uppercase font-mono text-gray-400 tracking-widest opacity-50 pointer-events-none">
                    Click along the beam to adjust length
                  </div>
                )}
              </div>
            </div>
            
            {unlockedStage > 1 && (
              <div className="mt-6 inline-flex items-center space-x-2 bg-green-500/10 text-green-600 dark:text-green-400 px-4 py-2 rounded-xl text-sm font-medium">
                <CheckCircle2 size={16} />
                <span>You discovered the Lever Rule.</span>
              </div>
            )}
          </div>
        </div>

        {/* Stage 2: The Student */}
        <div className={`transition-all duration-700 ease-out transform ${unlockedStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
          <div className="bg-white dark:bg-[#1d1d1f] rounded-3xl p-8 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5 relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">02. The Rule of the Ratio</h2>
              {unlockedStage > 2 && <CheckCircle2 size={24} className="text-green-500" />}
            </div>
            
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
              Can you balance a 10kg weight using only 1kg of effort? Drag the fulcrum to find the correct mechanical advantage ratio.
            </p>

            <div 
              className={`relative h-64 bg-gray-50 dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center p-8 mb-4 ${unlockedStage <= 2 ? 'cursor-pointer hover:border-blue-500/50' : ''} transition-colors`}
              onClick={(e) => {
                if (unlockedStage > 2) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = ((e.clientX - rect.left) / rect.width) * 100;
                const val = Math.max(1, Math.min(10, Math.round(pct / 9)));
                setFulcrumPos(val);
              }}
            >
              
              <div className="absolute top-6 flex space-x-8 text-center font-mono pointer-events-none">
                <div>
                  <div className="text-xs text-gray-400 uppercase mb-1">Ratio</div>
                  <div className="text-2xl font-bold text-black dark:text-white">{fulcrumPos}:1</div>
                </div>
              </div>

              {/* Balance Beam visualization */}
              <div className="relative w-full max-w-md h-40 flex items-center justify-center pointer-events-none">
                
                {/* Beam */}
                <div 
                  className="absolute top-1/2 w-full h-1 bg-black dark:bg-white rounded-full transition-transform duration-300"
                  style={{ transform: `rotate(${isBalanced ? 0 : 15 - fulcrumPos * 1.5}deg)` }}
                >
                  {/* Left Weight (10kg) */}
                  <div className="absolute -top-10 left-0 w-10 h-10 bg-gray-100 dark:bg-[#2a2a2c] border border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 font-mono text-[10px] shadow-sm">
                    10kg
                  </div>
                  {/* Right Weight (1kg) */}
                  <div className="absolute -top-6 right-0 w-6 h-6 bg-blue-500/10 border border-blue-500/50 rounded flex items-center justify-center text-blue-500 font-mono text-[8px] shadow-sm">
                    1kg
                  </div>
                </div>

                {/* Fulcrum */}
                <div 
                  className="absolute top-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-gray-300 dark:border-b-gray-600 transition-all duration-300 mt-0.5"
                  style={{ left: `${fulcrumPos * 9}%` }}
                ></div>
              </div>

              {unlockedStage <= 2 && (
                  <div className="absolute bottom-6 w-full text-center text-[10px] uppercase font-mono text-gray-400 tracking-widest opacity-50 pointer-events-none">
                    Click anywhere on the track to move the fulcrum
                  </div>
              )}
            </div>
          </div>
        </div>

        {/* Stage 3: The Engineer */}
        <div className={`transition-all duration-700 ease-out transform ${unlockedStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
          <div className="bg-white dark:bg-[#1d1d1f] rounded-3xl p-8 shadow-sm ring-1 ring-gray-900/5 dark:ring-white/5 relative overflow-hidden">
            
            {/* Status Overlays */}
            {machineStatus === 'success' && (
              <div className="absolute inset-0 z-20 bg-green-500/90 backdrop-blur-sm flex flex-col items-center justify-center text-white fade-in">
                <CheckCircle2 size={64} className="mb-4" />
                <h3 className="text-3xl font-bold tracking-tight mb-2">SUCCESS</h3>
                <p className="font-mono text-sm uppercase tracking-widest">Mechanical Advantage Achieved</p>
              </div>
            )}
            
            {machineStatus === 'blunder' && (
              <div className="absolute inset-0 z-20 bg-red-500/90 backdrop-blur-sm flex flex-col items-center justify-center text-white fade-in">
                <AlertTriangle size={64} className="mb-4" />
                <h3 className="text-3xl font-bold tracking-tight mb-2">BLUNDER</h3>
                <p className="font-mono text-sm uppercase tracking-widest">System Failed Under Load</p>
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold tracking-tight text-black dark:text-white">03. The Real-World Hack</h2>
              {unlockedStage > 3 && <CheckCircle2 size={24} className="text-green-500" />}
            </div>
            
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              <strong>Engineer&apos;s Challenge:</strong> A 500kg engine block needs to be lifted 1 meter. Construct a compound machine by selecting components in the correct sequence: Lever, Gear, Pulley.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Toolbox */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-4">Toolbox</h4>
                <button 
                  onClick={() => addPart('lever')}
                  disabled={machineParts.includes('lever') || unlockedStage > 3}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-medium text-black dark:text-white">Lever</span>
                  <Scale size={18} className="text-blue-500" />
                </button>
                <button 
                  onClick={() => addPart('gear')}
                  disabled={machineParts.includes('gear') || unlockedStage > 3}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-medium text-black dark:text-white">Gear System</span>
                  <Settings size={18} className="text-blue-500" />
                </button>
                <button 
                  onClick={() => addPart('pulley')}
                  disabled={machineParts.includes('pulley') || unlockedStage > 3}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="font-medium text-black dark:text-white">Block & Tackle</span>
                  <Activity size={18} className="text-blue-500" />
                </button>
              </div>

              {/* Assembly Schematic */}
              <div className="bg-gray-50 dark:bg-[#111] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col">
                <h4 className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-6">Assembly Schematic</h4>
                
                <div className="flex-grow flex flex-col justify-center space-y-4 relative">
                  {/* Connection lines */}
                  <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200 dark:bg-gray-800 z-0"></div>
                  
                  {/* Slots */}
                  {[0, 1, 2].map((slotIndex) => (
                    <div key={slotIndex} className="relative z-10 flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${machineParts[slotIndex] ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white dark:bg-[#1d1d1f] border-gray-300 dark:border-gray-700 text-gray-400'}`}>
                        {machineParts[slotIndex] === 'lever' && <Scale size={20} />}
                        {machineParts[slotIndex] === 'gear' && <Settings size={20} />}
                        {machineParts[slotIndex] === 'pulley' && <Activity size={20} />}
                        {!machineParts[slotIndex] && <span className="font-mono text-sm">{slotIndex + 1}</span>}
                      </div>
                      <div className="flex-1 h-12 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl flex items-center px-4 bg-white/50 dark:bg-[#1d1d1f]/50">
                        {machineParts[slotIndex] ? (
                          <span className="font-mono text-sm uppercase text-black dark:text-white">
                            {machineParts[slotIndex]} installed
                          </span>
                        ) : (
                          <span className="font-mono text-xs uppercase text-gray-400">Empty Slot</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stage 4: The Inventor (Pro Gate) */}
        <div className={`transition-all duration-700 ease-out transform ${unlockedStage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-1 text-white shadow-xl relative overflow-hidden">
            
            <div className="bg-[#111] rounded-[22px] p-8 md:p-12 h-[400px] flex flex-col justify-center relative overflow-hidden">
              
              {!isPro ? (
                // Freemium Overlay
                <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                    <Lock size={32} className="text-blue-400" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">Your invention lab is locked.</h2>
                  <p className="text-gray-400 text-lg mb-8 max-w-md">
                    Upgrade to SkillByte Pro to save custom machine designs, export schematic blueprints, and unlock advanced linkages and energy sources.
                  </p>
                  <button 
                    onClick={() => setIsPro(true)}
                    className="bg-white text-black font-semibold px-8 py-4 rounded-full hover:scale-105 transition-transform flex items-center"
                  >
                    Upgrade via Stripe <MoveRight size={18} className="ml-2" />
                  </button>
                </div>
              ) : null}

              {/* Pro Interface Background */}
              <div className={`relative z-10 opacity-50 transition-opacity duration-1000 ${isPro ? 'opacity-100' : ''}`}>
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-2 flex items-center">
                      <Zap size={24} className="mr-2 text-yellow-400" /> 04. Patent your Creation
                    </h2>
                    <p className="text-gray-400 font-mono text-sm">PRO SANDBOX ENVIRONMENT</p>
                  </div>
                  {isPro && (
                    <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-mono text-sm uppercase transition-colors">
                      Export Blueprint
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="aspect-square bg-[#1d1d1f] border border-gray-800 rounded-xl flex items-center justify-center">
                      <Settings size={24} className="text-gray-600" />
                    </div>
                  ))}
                </div>
                
                <div className="w-full h-32 border-2 border-dashed border-gray-800 rounded-2xl flex items-center justify-center text-gray-500 font-mono">
                  DRAG COMPONENTS HERE TO INVENT
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Global CSS for animations */}
      <style dangerouslySetInnerHTML={{__html: `
        .fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
    </div>
  );
}
