"use client";

import React, { useState } from 'react';
import { Lock, Smartphone, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface StripeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function StripeModal({ isOpen, onClose, onSuccess }: StripeModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate Apple Pay / Stripe API call delay
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
      router.push('/daily');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-white dark:bg-[#1c1c1e] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 text-center border-b border-gray-100 dark:border-white/10">
          <div className="w-12 h-12 bg-black dark:bg-white rounded-full mx-auto flex items-center justify-center mb-4 shadow-sm">
            <Lock size={20} className="text-white dark:text-black" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white mb-1">
            SkillByte Pro
          </h2>
          <p className="text-gray-500 text-sm">Unlock The Daily Flow</p>
        </div>

        {/* Pricing */}
        <div className="p-6 bg-gray-50 dark:bg-[#121212]">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-600 dark:text-gray-300 font-medium">Billed Monthly</span>
            <span className="text-xl font-bold text-black dark:text-white">$4.99</span>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full h-12 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-70 disabled:hover:scale-100"
          >
            {isProcessing ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <Smartphone size={18} className="mr-2" />
                Pay with Apple Pay
              </>
            )}
          </button>
          
          <p className="text-center text-xs text-gray-400 mt-4 font-medium flex items-center justify-center">
            <Lock size={10} className="mr-1" /> Secured by Stripe
          </p>
        </div>
      </div>
    </div>
  );
}
