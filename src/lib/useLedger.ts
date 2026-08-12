"use client";

import React, { useState, useEffect } from 'react';

export interface LedgerState {
  resonanceSessions: number;
  chronoScores: number[];
  bellyFatWorkouts: number;
  nBackMaxLevel: number;
  compoundingSimulations: number;
  lastActiveDate: string | null;
  currentStreak: number;
}

const DEFAULT_STATE: LedgerState = {
  resonanceSessions: 0,
  chronoScores: [],
  bellyFatWorkouts: 0,
  nBackMaxLevel: 1,
  compoundingSimulations: 0,
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
          const parsed = JSON.parse(stored);
          setLedger({ ...DEFAULT_STATE, ...parsed });
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

  const updateNBackMaxLevel = React.useCallback((level: number) => {
    setLedger((prev) => {
      if (level > prev.nBackMaxLevel) {
        const newState = { nBackMaxLevel: level };
        saveLedger(newState);
        return { ...prev, ...newState };
      }
      return prev;
    });
  }, []);

  const addCompoundingSimulation = React.useCallback(() => {
    setLedger((prev) => {
      const newState = { compoundingSimulations: (prev.compoundingSimulations || 0) + 1 };
      saveLedger(newState);
      return { ...prev, ...newState };
    });
  }, []);

  return {
    ledger, // Keep original ledger object for backward compatibility
    ...ledger, // Spread properties so things like currentStreak can be directly destructured
    isLoaded,
    addResonanceSession,
    addChronoScore,
    addBellyFatWorkout,
    updateNBackMaxLevel,
    addCompoundingSimulation
  };
}
