"use client";

import { useState, useEffect } from "react";

const CountDownClock = () => {
  const [currentDrawIndex, setCurrentDrawIndex] = useState(0);
  const [countdownValues, setCountdownValues] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const drawTimes = [
    new Date().setHours(23, 44, 0),
    new Date().setHours(23, 45, 0),
    new Date().setHours(23, 46, 0),
  ];

  function countDown() {
    console.log(currentDrawIndex);

    const currentTime = new Date().getTime();
    const timeLeft = drawTimes[currentDrawIndex] - currentTime;

    console.log(timeLeft);

    if (timeLeft <= 0) {
      // Move to the next draw time if the current time has passed
      setCurrentDrawIndex((prevIndex) => (prevIndex + 1) % drawTimes.length);
    } else {
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      // Update the countdown values state
      setCountdownValues({
        hours,
        minutes,
        seconds,
      });
    }
  }
  // Set up the countdown interval
  useEffect(() => {
    const countdownInterval = setInterval(countDown, 1000);

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(countdownInterval);
    };
  }, []);

  return (
    <div className="flex flex-col text-gray-900">
      <h3>Time till next draw</h3>
      <div className="flex gap-4 justify-center items-center">
        <span>{countdownValues.hours}</span>
        <span>{countdownValues.minutes}</span>
        <span>{countdownValues.seconds}</span>
      </div>
    </div>
  );
};

export default CountDownClock;
