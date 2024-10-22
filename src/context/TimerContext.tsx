// src/context/TimerContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

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
  const startTimeRef = useRef<number | null>(null);

  // Load initial state from localStorage
  useEffect(() => {
    const savedTime = localStorage.getItem("remainingTime");
    const savedStartTime = localStorage.getItem("startTime");

    if (savedTime && savedStartTime) {
      const parsedTime = parseInt(savedTime, 10);
      const parsedStartTime = parseInt(savedStartTime, 10);
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime - parsedStartTime) / 1000);

      const adjustedTime = parsedTime - elapsedTime;
      if (adjustedTime > 0) {
        setRemainingTime(adjustedTime);
        setTimerActive(true);
        startInterval(adjustedTime);
      } else {
        resetTimer();
      }
    }
  }, []);

  const startInterval = (time: number) => {
    const id = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev !== null && prev > 0) {
          const newTime = prev - 1;
          localStorage.setItem("remainingTime", newTime.toString());
          return newTime;
        } else {
          clearInterval(id);
          setTimerActive(false);
          resetTimer();
          return 0;
        }
      });
    }, 1000);

    setIntervalId(id);
  };

  const startTimer = (time: number) => {
    setRemainingTime(time);
    setTimerActive(true);
    localStorage.setItem("remainingTime", time.toString());
    startTimeRef.current = Date.now();
    localStorage.setItem("startTime", startTimeRef.current.toString());

    startInterval(time);
  };

  const resetTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setRemainingTime(null);
    setTimerActive(false);
    localStorage.removeItem("remainingTime");
    localStorage.removeItem("startTime");
  };

  useEffect(() => {
    if (remainingTime === 0) {
      resetTimer();
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
