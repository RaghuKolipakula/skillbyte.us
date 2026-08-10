"use client";

import React, { useState, useEffect } from 'react';

export interface LedgerState {
  resonanceSessions: number;
  chronoScores: number[];
  bellyFatWorkouts: number;
  lastActiveDate: string | null;
  currentStreak: number;
}

const DEFAULT_STATE: LedgerState = {
  resonanceSessions: 0,
  chronoScores: [],
  bellyFatWorkouts: 0,
  lastActiveDate: null,
  currentStreak: 0,
};

const LEDGER_KEY = 'skillbyte_identity_ledger';

export function useLedger() {
  const [ledger, setLedger] = useState<LedgerState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state on mount
  useEffect(() => {
    setTimeout(() => {
      try {
        const stored = localStorage.getItem(LEDGER_KEY);
        if (stored) {
          setLedger(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to parse Identity Ledger", e);
      } finally {
        setIsLoaded(true);
      }
    }, 0);
  }, []);

  // Save state helper
  const saveLedger = (newState: Partial<LedgerState>) => {
    setLedger((prev) => {
      const updated = { ...prev, ...newState };
      
      // Streak calculation logic
      const today = new Date().toDateString();
      if (updated.lastActiveDate !== today) {
        if (updated.lastActiveDate) {
          const lastActive = new Date(updated.lastActiveDate);
          const diffTime = Math.abs(new Date().getTime() - lastActive.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            updated.currentStreak += 1;
          } else if (diffDays > 1) {
            updated.currentStreak = 1; // Streak broken
          }
        } else {
          updated.currentStreak = 1; // First active day
        }
        updated.lastActiveDate = today;
      }

      localStorage.setItem(LEDGER_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const addResonanceSession = React.useCallback(() => {
    setLedger((prev) => {
      const newState = { resonanceSessions: prev.resonanceSessions + 1 };
      saveLedger(newState);
      return { ...prev, ...newState };
    });
  }, []);

  const addChronoScore = React.useCallback((score: number) => {
    setLedger((prev) => {
      const newState = { chronoScores: [...prev.chronoScores, score] };
      saveLedger(newState);
      return { ...prev, ...newState };
    });
  }, []);

  const addBellyFatWorkout = React.useCallback(() => {
    setLedger((prev) => {
      const newState = { bellyFatWorkouts: prev.bellyFatWorkouts + 1 };
      saveLedger(newState);
      return { ...prev, ...newState };
    });
  }, []);

  return {
    ledger,
    isLoaded,
    addResonanceSession,
    addChronoScore,
    addBellyFatWorkout
  };
}
