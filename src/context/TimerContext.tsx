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
  const timerActiveRef = useRef(timerActive);

  useEffect(() => {
    timerActiveRef.current = timerActive;
  }, [timerActive]);

  // Load initial state from localStorage if available
  useEffect(() => {
    const savedTime = localStorage.getItem("remainingTime");
    if (savedTime) {
      const parsedTime = parseInt(savedTime, 10);
      if (parsedTime > 0) {
        setRemainingTime(parsedTime);
        setTimerActive(true);
        startInterval(parsedTime);
      }
    }
  }, []);

  // Handle tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (intervalId) clearInterval(intervalId); // Pause the timer when the tab is inactive
      } else {
        // Resume the timer if it was active and there is remaining time
        if (timerActiveRef.current && remainingTime !== null) {
          startInterval(remainingTime);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [remainingTime, intervalId]);

  const startInterval = (initialTime: number) => {
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
    startInterval(time);
  };

  const resetTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setRemainingTime(null);
    setTimerActive(false);
    localStorage.removeItem("remainingTime");
  };

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
