import React from "react";
import { TimerProvider } from "../context/TimerContext";
import FloatingTimer from "../components/FloatingTimer";

export default function Root({ children }) {
  return (
    <TimerProvider>
      {children}
      <FloatingTimer />
    </TimerProvider>
  );
}
