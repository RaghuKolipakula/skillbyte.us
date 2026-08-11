"use client";

import React, { useEffect } from 'react';
import { X, Info } from 'lucide-react';

interface ProtocolGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  steps: { title: string; description: string }[];
}

export function ProtocolGuideModal({ isOpen, onClose, title, description, steps }: ProtocolGuideModalProps) {
  
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white dark:bg-[#1c1c1e] rounded-[2rem] shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col max-h-[85vh] fade-in-up">
        
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-100 dark:border-gray-800/50 bg-gray-50/50 dark:bg-black/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
              <Info size={20} className="text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-black dark:text-white tracking-tight">Protocol Guide</h2>
              <p className="text-xs text-gray-500 font-mono uppercase tracking-widest">{title}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-grow custom-scrollbar">
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {description}
          </p>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="flex space-x-4">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-6 h-6 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-mono text-xs font-bold shadow-sm">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h4 className="text-base font-bold text-black dark:text-white tracking-tight mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-800/50 bg-gray-50/50 dark:bg-black/20 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:scale-105 transition-transform"
          >
            Understood
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .fade-in-up {
          animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.3);
          border-radius: 10px;
        }
      `}} />
    </div>
  );
}
