"use client";

import React, { useState, useRef } from 'react';
import { Lock, Unlock, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const SCENARIOS = [
  {
    id: 1,
    title: "The Conjunction Fallacy (The Linda Problem)",
    prompt: "Linda is 31 years old, single, outspoken, and very bright. She majored in philosophy. As a student, she was deeply concerned with issues of discrimination and social justice.\n\nWhich is more probable?\nA: Linda is a bank teller.\nB: Linda is a bank teller and is active in the feminist movement.",
    leftLabel: "A is more probable",
    rightLabel: "B is more probable",
    truth: "A is mathematically more probable. The probability of two events occurring together (in conjunction) is always less than or equal to the probability of either one occurring alone. Most people choose B because it 'feels' more representative, overriding their statistical logic.",
    book: {
      title: "Thinking, Fast and Slow (Ch. 15)",
      author: "Daniel Kahneman",
      link: "https://www.amazon.com/dp/0374533555"
    }
  },
  {
    id: 2,
    title: "System 1 Override (The Bat and Ball)",
    prompt: "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball.\n\nHow much does the ball cost?",
    leftLabel: "10 cents",
    rightLabel: "5 cents",
    truth: "5 cents. Your intuitive 'System 1' immediately shouts '10 cents'. But if the ball is 10 cents, the bat would be $1.10, making the total $1.20. You must manually engage the slower 'System 2' to perform the actual algebra.",
    book: {
      title: "Thinking, Fast and Slow (Ch. 3)",
      author: "Daniel Kahneman",
      link: "https://www.amazon.com/dp/0374533555"
    }
  },
  {
    id: 3,
    title: "Base Rate Neglect (Steve the Librarian)",
    prompt: "An individual has been described by a neighbor as follows: 'Steve is very shy and withdrawn, invariably helpful but with little interest in people or in the world of reality.'\n\nIs Steve more likely to be a librarian or a farmer?",
    leftLabel: "Librarian",
    rightLabel: "Farmer",
    truth: "Farmer. While Steve perfectly matches the stereotype of a librarian, there are statistically vastly more farmers in the world than male librarians. People tend to ignore base rates (the actual statistics) when presented with descriptive, anecdotal details.",
    book: {
      title: "Thinking, Fast and Slow (Ch. 14)",
      author: "Daniel Kahneman",
      link: "https://www.amazon.com/dp/0374533555"
    }
  },
  {
    id: 4,
    title: "Loss Aversion (The Coin Toss)",
    prompt: "You are offered a gamble on the toss of a coin.\nIf it shows tails, you lose $100.\nIf it shows heads, you win $150.\n\nDo you accept the gamble?",
    leftLabel: "Reject the gamble",
    rightLabel: "Accept the gamble",
    truth: "Mathematically, the expected value is positive (+$25), so a purely rational actor accepts. However, most people reject it. Humans are hardwired for 'Loss Aversion'—the psychological pain of losing $100 is far more intense than the pleasure of winning $150.",
    book: {
      title: "Thinking, Fast and Slow (Ch. 26)",
      author: "Daniel Kahneman",
      link: "https://www.amazon.com/dp/0374533555"
    }
  },
  {
    id: 5,
    title: "The Anchoring Effect",
    prompt: "You are negotiating to buy a house. The seller starts with an outrageously high, unreasonable asking price of $2,000,000 for a standard suburban home.\n\nWill this absurd number affect the final price you end up paying?",
    leftLabel: "No, I am objective",
    rightLabel: "Yes, it shifts the price up",
    truth: "Yes. Even if you know the number is absurd, your brain unconsciously uses it as a psychological anchor. Every subsequent offer will be measured against that anchor, inevitably pulling the final settlement price higher than if they had started with a reasonable number.",
    book: {
      title: "Thinking, Fast and Slow (Ch. 11)",
      author: "Daniel Kahneman",
      link: "https://www.amazon.com/dp/0374533555"
    }
  }
];

export function EpochEngine() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);
  const [isLocked, setIsLocked] = useState(true);
  const [showToll, setShowToll] = useState(false);
  const [steelManText, setSteelManText] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  
  const sliderRef = useRef<HTMLInputElement>(null);
  const currentScenario = SCENARIOS[scenarioIndex];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLocked) {
      // Trigger visual resistance
      setIsShaking(true);
      setShowToll(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }
    setSliderValue(Number(e.target.value));
  };

  const handleUnlockSubmit = () => {
    if (steelManText.length > 10) {
      setIsLocked(false);
      setShowToll(false);
    }
  };

  const handleNextScenario = () => {
    setScenarioIndex((prev) => (prev + 1) % SCENARIOS.length);
    setSliderValue(50);
    setIsLocked(true);
    setShowToll(false);
    setSteelManText("");
    setIsRevealed(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 flex flex-col items-center">
      
      {/* Title */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          The Epoch Engine.
        </h1>
        <p className="text-lg text-gray-400 font-light max-w-lg mx-auto">
          Probability is simple. The ego is complex. Overcome your cognitive biases by steel-manning the opposition.
        </p>
      </div>

      {/* Scenario Box */}
      <div className="w-full bg-[#111] border border-gray-800 rounded-3xl p-8 mb-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 via-gray-400 to-gray-800"></div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500">{currentScenario.title}</h3>
          <span className="text-xs font-mono text-gray-600 bg-gray-900 px-2 py-1 rounded">Scenario {scenarioIndex + 1}/{SCENARIOS.length}</span>
        </div>
        <p className="text-xl md:text-2xl font-medium leading-relaxed whitespace-pre-wrap">
          {currentScenario.prompt}
        </p>
      </div>

      {/* The Belief Slider Area */}
      <div className="w-full mb-16 relative">
        <div className="flex justify-between text-sm font-semibold tracking-wider text-gray-500 uppercase mb-6 px-2">
          <span>{currentScenario.leftLabel}</span>
          <span>{currentScenario.rightLabel}</span>
        </div>
        
        <div className={`relative ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
          <input 
            ref={sliderRef}
            type="range" 
            min="0" 
            max="100" 
            value={sliderValue}
            onChange={handleSliderChange}
            className={`w-full h-4 rounded-full appearance-none outline-none transition-all duration-300 ${isLocked ? 'bg-red-900/30 cursor-not-allowed' : 'bg-gray-800 cursor-pointer'}`}
            style={{
              background: isLocked 
                ? 'linear-gradient(to right, #450a0a, #450a0a)' 
                : `linear-gradient(to right, #ffffff ${sliderValue}%, #1f2937 ${sliderValue}%)`
            }}
          />
        </div>

        {/* Lock Status */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 flex items-center space-x-2 text-sm font-bold tracking-widest uppercase">
          {isLocked ? (
            <span className="flex items-center text-red-500">
              <Lock size={16} className="mr-2" /> Locked (Scenarios 2–5 require Pro)
            </span>
          ) : (
            <span className="flex items-center text-green-500">
              <Unlock size={16} className="mr-2" /> Unlocked
            </span>
          )}
        </div>
      </div>

      {/* The Steel-Man Toll (Conditional) */}
      {showToll && isLocked && (
        <div className="w-full bg-[#1c1c1e] border border-red-900/50 rounded-2xl p-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-start mb-4">
            <Lock className="text-red-500 mt-1 mr-3 flex-shrink-0" size={20} />
            <div>
              <h4 className="text-red-500 font-bold tracking-tight mb-1">Ego Disruption Matrix Engaged</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                The slider refuses to move. Before you may cast your judgment, you must articulate the strongest possible argument for the opposing view. 
              </p>
            </div>
          </div>
          <textarea 
            value={steelManText}
            onChange={(e) => setSteelManText(e.target.value)}
            placeholder="Type your steel-man argument here..."
            className="w-full bg-black border border-gray-800 rounded-xl p-4 text-white focus:outline-none focus:border-gray-500 transition-colors min-h-[100px] mb-4"
          />
          <button 
            onClick={handleUnlockSubmit}
            disabled={steelManText.length <= 10}
            className="w-full bg-white text-black font-bold py-3 rounded-xl disabled:opacity-30 transition-opacity flex justify-center items-center"
          >
            Submit to Unlock <Unlock size={16} className="ml-2" />
          </button>
        </div>
      )}

      {/* Final Action */}
      {!isLocked && !isRevealed && (
        <button 
          onClick={() => setIsRevealed(true)}
          className="bg-white text-black px-12 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)] animate-in fade-in zoom-in duration-500"
        >
          Lock in Belief
        </button>
      )}

      {/* Revelation & Monetization */}
      {isRevealed && (
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="w-full bg-[#111] border border-gray-800 rounded-3xl p-8 mb-8 text-center shadow-2xl">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">The Truth</h3>
            <p className="text-xl leading-relaxed">
              {currentScenario.truth}
            </p>
          </div>

          <Link href={currentScenario.book.link} target="_blank" className="group w-full bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-2xl p-6 flex items-center justify-between hover:border-gray-500 transition-colors mb-8">
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Recommended Reading</span>
              <span className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors flex items-center">
                {currentScenario.book.title} <ExternalLink size={16} className="ml-2" />
              </span>
              <span className="text-sm text-gray-400">by {currentScenario.book.author}</span>
            </div>
            <div className="bg-white text-black p-3 rounded-full group-hover:scale-110 transition-transform">
              <ArrowRight size={20} />
            </div>
          </Link>

          {/* Next Scenario Loop */}
          <button 
            onClick={handleNextScenario}
            className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <span>Proceed to Next Scenario</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Add shake animation to global styles via style tag just for this component */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
      `}</style>

    </div>
  );
}
