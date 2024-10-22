import React, { useState } from "react";
import { useTimer } from "../context/TimerContext";

interface TimerModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const TimerModal: React.FC<TimerModalProps> = ({ isOpen, closeModal }) => {
  const [time, setTime] = useState<string>("");
  const { startTimer } = useTimer();

  const handleSubmit = () => {
    const seconds = parseInt(time, 10) * 60;
    if (!isNaN(seconds) && seconds > 0) {
      startTimer(seconds);
      closeModal();
    }
  };

  return isOpen ? (
    <div className="modal">
      <h3>Select Learning Time (minutes):</h3>
      <input
        type="number"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="Minutes"
      />
      <button onClick={handleSubmit}>Start</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  ) : null;
};

export default TimerModal;
