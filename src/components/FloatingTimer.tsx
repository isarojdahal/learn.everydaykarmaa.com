// src/components/FloatingTimer.tsx
import React, { useState, useEffect } from "react";
import { useTimer } from "../context/TimerContext";
import TimerModal from "./TimerModal";
import formatTime from "../utils/formatTime";
import Draggable from "react-draggable";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const FloatingTimer: React.FC = () => {
  const { remainingTime, timerActive, resetTimer } = useTimer();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const { width, height } = useWindowSize();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    if (remainingTime === 0) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        resetTimer();
      }, 5000); // Confetti will display for 5 seconds
    }
  }, [remainingTime, resetTimer]);

  return (
    <>
      {showConfetti && <Confetti width={width} height={height} />}
      <Draggable>
        <div className="fixed bottom-4 right-4 z-50 bg-[--ifm-color-primary] p-2 shadow-md rounded-lg cursor-move">
          <button
            onClick={openModal}
            className="bg-[--ifm-color-primary] border-none text-xl text-white"
          >
            {timerActive && remainingTime !== null
              ? formatTime(remainingTime)
              : "Start Learning"}
          </button>
        </div>
      </Draggable>
      <TimerModal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};

export default FloatingTimer;
