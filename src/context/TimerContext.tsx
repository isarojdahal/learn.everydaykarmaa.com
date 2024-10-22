// src/context/TimerContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

interface TimerContextType {
  remainingTime: number | null;
  timerActive: boolean;
  startTimer: (time: number) => void;
  resetTimer: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: React.FC = ({ children }) => {
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startTimer = (time: number) => {
    setRemainingTime(time);
    setTimerActive(true);

    const id = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev !== null && prev > 0) {
          return prev - 1;
        } else {
          clearInterval(id);
          setTimerActive(false);
          return 0;
        }
      });
    }, 1000);

    setIntervalId(id);
  };

  const resetTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setRemainingTime(null);
    setTimerActive(false);
  };

  useEffect(() => {
    if (remainingTime === 0) {
      resetTimer();
      // You can add code here to show confetti when timer completes
    }
  }, [remainingTime]);

  return (
    <TimerContext.Provider
      value={{ remainingTime, timerActive, startTimer, resetTimer }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
};
