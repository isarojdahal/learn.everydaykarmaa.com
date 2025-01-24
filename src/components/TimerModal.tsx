import React, { useState } from "react";
import { useTimer } from "../context/TimerContext";

interface TimerModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const TimerModal: React.FC<TimerModalProps> = ({ isOpen, closeModal }) => {
  const [time, setTime] = useState<string>("");
  const { startTimer, resetTimer } = useTimer();

  const handleSubmit = () => {
    const seconds = parseInt(time, 10) * 60;
    if (isNaN(seconds) || seconds <= 0) {
      alert("Please enter a valid number of minutes");
      return;
    }
    if (!isNaN(seconds) && seconds > 0) {
      resetTimer();
      startTimer(seconds);
      closeModal();
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg shadow-md">
        <h3>Select Learning Time (minutes):</h3>
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border border-gray-300 p-2 rounded-md w-full"
          placeholder="Minutes"
          required
        />
        <div className="flex mt-4 justify-end gap-4">
          <button
            onClick={closeModal}
            className="text-white px-2 py-1 border-none rounded-sm text-sm bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="text-white px-2 p-1 border-none rounded-sm text-sm bg-green-500"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default TimerModal;
