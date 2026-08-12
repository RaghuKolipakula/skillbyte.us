"use client";

import React, { useState, useRef } from 'react';

export function ForbiddenButton() {
  const [clicks, setClicks] = useState(0);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [isEvading, setIsEvading] = useState(false);
  const [clones, setClones] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getMessage = () => {
    if (clicks === 0) return "Do Not Push.";
    if (clicks === 1) return "I said don't push it.";
    if (clicks === 2) return "Last warning.";
    if (clicks === 3) return "Let's see you find the real one.";
    if (clicks === 4) return "SYSTEM BREACHED. INITIALIZING TERMINAL.";
    if (clicks >= 5 && clicks < 12) return "D E M O N   P R O T O C O L   E N G A G E D";
    if (clicks >= 12 && clicks < 15) return "I T S   W E A K E N E D   F I N I S H   I T";
    if (clicks >= 15 && clicks < 20) return "S I N G U L A R I T Y   C O R E   B R E A C H";
    if (clicks === 20) return "S P E E D   V E R S E   E N T E R E D";
    return "";
  };

  const handleRealClick = () => {
    if (isGameOver) return;
    const newClicks = clicks + 1;
    setClicks(newClicks);

    if (newClicks > 0 && newClicks < 5) {
      setIsEvading(true);
      moveButton();
    }

    if (newClicks === 3) {
      spawnClones(3);
    } else if (newClicks >= 4) {
      setClones([]);
    }
    
    if (newClicks >= 5 && newClicks < 15) {
      // Wolf phases - chaotic evasion
      setIsEvading(true);
      moveButton();
    }
    
    if (newClicks >= 15 && newClicks < 20) {
      // Cutscene phase - button stops evading
      setIsEvading(false);
      setButtonPos({ x: 0, y: 0 });
    }

    if (newClicks === 20) {
      // Speed verse
      setIsEvading(false);
      setButtonPos({ x: 0, y: 0 });
    }

    if (newClicks >= 21) {
      setIsGameOver(true);
    }
  };

  const moveButton = () => {
    if (containerRef.current) {
      const maxX = window.innerWidth - 150;
      const maxY = window.innerHeight - 150;
      setButtonPos({
        x: (Math.random() - 0.5) * maxX,
        y: (Math.random() - 0.5) * maxY,
      });
    }
  };

  const handleHover = () => {
    if (isEvading && (clicks < 2 || (clicks >= 5 && clicks < 15))) {
      setTimeout(() => {
        moveButton();
      }, clicks >= 12 ? 20 : clicks >= 5 ? 50 : 150); // Gets insanely fast at wolf phases
    }
  };

  const spawnClones = (count: number) => {
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 150;
    const newClones = [];
    for (let i = 0; i < count; i++) {
      newClones.push({
        id: Math.random(),
        x: (Math.random() - 0.5) * maxX,
        y: (Math.random() - 0.5) * maxY,
      });
    }
    setClones(newClones);
    moveButton(); 
  };

  if (isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#020202] overflow-hidden relative">
        <div className="z-50 text-center animate-[fadeIn_2s_ease-out_forwards] opacity-0" style={{ animationDelay: '1s' }}>
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 tracking-[0.4em] drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            GAME OVER
          </h1>
          <p className="text-gray-500 mt-6 tracking-[0.2em] uppercase text-sm md:text-base font-semibold">The timeline has been restored.</p>
        </div>
        
        {/* Broken Button Animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none">
           {/* Left Half */}
           <div className="absolute inset-0 bg-red-600 rounded-full shadow-[0_0_50px_rgba(220,38,38,0.5)] border-4 border-red-800" 
                style={{ 
                  clipPath: 'polygon(0 0, 45% 0, 55% 100%, 0 100%)', 
                  animation: 'breakLeft 2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' 
                }}>
           </div>
           {/* Right Half */}
           <div className="absolute inset-0 bg-red-700 rounded-full shadow-[0_0_50px_rgba(220,38,38,0.5)] border-4 border-red-800" 
                style={{ 
                  clipPath: 'polygon(45% 0, 100% 0, 100% 100%, 55% 100%)', 
                  animation: 'breakRight 2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' 
                }}>
           </div>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes breakLeft {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
            100% { transform: translate(-100px, 50px) rotate(-20deg); opacity: 0; }
          }
          @keyframes breakRight {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
            100% { transform: translate(100px, 50px) rotate(20deg); opacity: 0; }
          }
          @keyframes fadeIn {
            to { opacity: 1; }
          }
        `}} />
      </div>
    );
  }

  // Visual phases mapping
  const getContainerStyle = () => {
    if (clicks === 4) return "bg-black font-mono text-green-500 relative overflow-hidden";
    if (clicks >= 5 && clicks < 15) return "bg-black relative overflow-hidden"; // Wolf phases use inline style for bg
    if (clicks >= 15 && clicks < 20) return "bg-black relative overflow-hidden"; // Cutscene uses inline
    if (clicks === 20) return "bg-black relative overflow-hidden"; // Speed Verse uses inline
    return "bg-[#050505] relative overflow-hidden";
  };

  const getContainerInlineStyle = () => {
    if (clicks >= 5 && clicks < 12) {
      return {
        backgroundImage: 'url(/images/better-cyber-wolf.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: `hue-rotate(${Math.random() * 360}deg) saturate(2)`,
        transform: `rotate(${(Math.random() - 0.5) * 2}deg) scale(1.05)`,
        transition: 'none'
      };
    }
    if (clicks >= 12 && clicks < 15) {
      return {
        backgroundImage: 'url(/images/damaged-cyber-wolf.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: `hue-rotate(${Math.random() * 45}deg) saturate(3) contrast(1.2)`,
        transform: `rotate(${(Math.random() - 0.5) * 5}deg) scale(1.1)`,
        transition: 'none'
      };
    }
    if (clicks >= 15 && clicks < 20) {
      const isBreach1 = clicks % 2 === 0;
      return {
        backgroundImage: `url(${isBreach1 ? '/images/core-breach-1.jpg' : '/images/core-breach-2.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 0.1s ease-in-out'
      };
    }
    if (clicks === 20) {
       return {
        backgroundImage: 'url(/images/speed-verse.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: 'warpPulse 0.5s ease-in-out infinite alternate'
      };
    }
    return { transition: 'transform 0.3s ease-out' };
  };

  const renderMatrixRain = () => {
    // OPTIMIZATION: Drastically reduced element count for matrix rain.
    // Down from 40 elements to 10 elements to prevent DOM lagging.
    if (clicks === 4 || (clicks >= 15 && clicks < 20)) {
      return (
        <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-screen z-10">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute text-green-500 font-mono font-bold whitespace-pre"
                 style={{
                   left: `${(i / 10) * 100}%`,
                   top: `-${Math.random() * 100}%`,
                   fontSize: clicks >= 15 ? '32px' : '16px',
                   animation: `fall ${Math.random() * 2 + 1}s linear infinite`,
                 }}>
              {Array.from({ length: 25 }).map(() => (clicks >= 15 ? (Math.random() > 0.5 ? '1' : '0') : String.fromCharCode(33 + Math.random() * 94))).join('\n')}
            </div>
          ))}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fall {
              to { transform: translateY(150vh); }
            }
            @keyframes warpPulse {
              from { filter: brightness(1) contrast(1.2); transform: scale(1); }
              to { filter: brightness(1.5) contrast(1.5); transform: scale(1.02); }
            }
          `}} />
        </div>
      );
    }
    return null;
  };

  const getButtonContent = () => {
    if (clicks === 4) {
      return <span className="text-green-500 font-mono text-2xl drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">[ PUSH ]</span>;
    }
    if (clicks >= 15 && clicks < 20) {
       return <span className="text-white font-bold text-4xl tracking-widest uppercase mix-blend-difference">OVERRIDE</span>;
    }
    if (clicks === 20) {
       return <span className="text-white font-bold text-4xl tracking-[0.3em] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,1)]">WARP</span>;
    }
    return (
      <>
        <div className="absolute inset-2 border-2 border-cyan-500/30 rounded-full animate-[spin_4s_linear_infinite] border-t-cyan-400"></div>
        <div className="absolute inset-4 border border-fuchsia-500/20 rounded-full animate-[spin_6s_linear_infinite_reverse] border-b-fuchsia-500"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-full pointer-events-none"></div>
        <div className="absolute top-[5%] left-[15%] right-[15%] h-[30%] bg-gradient-to-b from-white/20 to-transparent rounded-full pointer-events-none blur-[1px]"></div>
        
        <span className="text-white font-bold text-2xl md:text-3xl tracking-[0.2em] drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10 relative group-hover:scale-110 transition-transform">
          {clicks === 3 ? '???' : clicks >= 5 && clicks < 15 ? 'KILL' : 'PUSH'}
        </span>
      </>
    );
  };

  const getButtonClass = () => {
    if (clicks === 4) {
      return "border border-green-500 bg-black/80 backdrop-blur-sm p-6 shadow-[0_0_30px_rgba(34,197,94,0.4)] animate-pulse hover:bg-green-900/50 transition-colors";
    }
    
    let base = `
      group relative
      rounded-full 
      bg-black/40 backdrop-blur-xl
      border border-white/10
      shadow-[0_0_50px_rgba(6,182,212,0.2),inset_0_0_30px_rgba(255,255,255,0.05),inset_0_0_10px_rgba(255,255,255,0.1)]
      hover:shadow-[0_0_80px_rgba(6,182,212,0.4),inset_0_0_30px_rgba(255,255,255,0.1)]
      active:scale-95 active:shadow-[0_0_20px_rgba(6,182,212,0.6)]
      flex items-center justify-center
      transition-all duration-300 ease-out
      overflow-hidden
    `;
    
    if (clicks >= 15 && clicks < 20) {
      base = `
        group relative rounded-full 
        bg-white
        shadow-[0_0_100px_rgba(255,255,255,1),0_0_200px_rgba(255,255,255,0.8)]
        active:scale-90
        flex items-center justify-center transition-all duration-100 ease-out
        w-64 h-64 animate-[pulse_0.2s_infinite] mix-blend-screen
      `;
      return base;
    }
    
    if (clicks === 20) {
      // Speed verse button
      base = `
        group relative rounded-full 
        bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600
        shadow-[0_0_100px_rgba(99,102,241,1),inset_0_0_30px_rgba(255,255,255,0.5)]
        border-4 border-white
        hover:scale-110 active:scale-90
        flex items-center justify-center transition-all duration-200 ease-out
        w-72 h-72 animate-[pulse_1s_infinite]
      `;
      return base;
    }

    if (clicks >= 5 && clicks < 15) {
       // Wolf phases red overriding core
       base = base.replace('rgba(6,182,212,0.2)', 'rgba(220,38,38,0.8)').replace('rgba(6,182,212,0.4)', 'rgba(220,38,38,1)');
       base += " border-red-500/50 bg-red-950/80 animate-[shake_0.1s_infinite]";
    }
    
    base += " w-48 h-48 md:w-56 md:h-56";
    
    if (clicks < 2) base += ' scale-100';
    else if (clicks === 2) base += ' scale-90';
    else if (clicks >= 3 && clicks < 5) base += ' scale-75 opacity-80';

    return base;
  };

  return (
    <div ref={containerRef} className={`flex flex-col items-center justify-center min-h-screen ${getContainerStyle()}`}
      style={getContainerInlineStyle()}
    >
      
      {/* Background Overlays */}
      <div className={`absolute inset-0 transition-all pointer-events-none z-0 ${clicks >= 5 && clicks < 12 ? 'bg-red-900/40 mix-blend-multiply' : ''} ${clicks >= 12 && clicks < 15 ? 'bg-red-900/60 mix-blend-multiply' : ''} ${clicks >= 15 && clicks < 20 ? 'bg-black/60' : ''}`}></div>
      
      {renderMatrixRain()}

      {/* Main UI Text */}
      <div className={`z-20 text-center pointer-events-none absolute top-[15%] md:top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 ${clicks === 4 ? 'text-green-500' : 'text-white'}`}>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]">
          {getMessage()}
        </h2>
        
        {clicks >= 5 && clicks < 15 && (
           <div className="mt-4 animate-pulse">
             <span className="bg-red-600 text-white font-mono font-bold px-4 py-1 text-xl">WOLF HP: {15 - clicks}</span>
           </div>
        )}
      </div>

      {/* The Button Container */}
      <div className="relative z-30" style={{
        transform: isEvading ? `translate(${buttonPos.x}px, ${buttonPos.y}px)` : 'none',
        transition: clicks < 3 || clicks === 4 ? 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0s'
      }}>
        <button
          onPointerDown={handleRealClick}
          onMouseEnter={handleHover}
          className={getButtonClass()}
        >
          {getButtonContent()}
        </button>
      </div>

      {/* The Clones */}
      {clicks === 3 && clones.map((clone) => (
        <div key={clone.id} className="absolute z-10" style={{
          left: '50%', top: '50%',
          transform: `translate(calc(-50% + ${clone.x}px), calc(-50% + ${clone.y}px))`,
        }}>
          <button
            onPointerDown={() => {
              setClones(prev => prev.map(c => c.id === clone.id ? {
                ...c,
                x: (Math.random() - 0.5) * (window.innerWidth - 150),
                y: (Math.random() - 0.5) * (window.innerHeight - 150),
              } : c));
            }}
            className={getButtonClass()}
          >
            <div className="absolute inset-2 border-2 border-cyan-500/30 rounded-full animate-[spin_4s_linear_infinite] border-t-cyan-400"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-full pointer-events-none"></div>
            <span className="text-white font-bold text-2xl md:text-3xl tracking-[0.2em] drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10 relative">
              ???
            </span>
          </button>
        </div>
      ))}

    </div>
  );
}
