"use client";

import { useState, useEffect } from "react";

// Created a functional component called CountDownClock
const CountDownClock = () => {
  // Initialized state to hold countdown values (hours, minutes, seconds)
  const [countdownValues, setCountdownValues] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  let currentDrawIndex = 0; // Keep track of the current draw index

  // Array of draw times
  const drawTimes = [
    new Date().setHours(10, 0, 0),
    new Date().setHours(14, 0, 0),
    new Date().setHours(20, 0, 0),
  ];

  // Function to update countdown values based on draw times
  function countDown() {
    const currentTime = new Date().getTime();
    const timeLeft = drawTimes[currentDrawIndex] - currentTime; // Calculate time left until next draw

    if (timeLeft <= 0) {
      currentDrawIndex = currentDrawIndex + 1; // Move to the next draw time index if time left is less than 0
      currentDrawIndex > 2 ? (currentDrawIndex = 0) : null; // Set index to 0 if it's more than 2 because we only have 3 indexes in array
    }

    const updatedTimeLeft = drawTimes[currentDrawIndex] - currentTime; // Calculate time left again

    // Calculate hours, minutes, and seconds from the updated time left
    const hours = Math.floor(
      (updatedTimeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (updatedTimeLeft % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((updatedTimeLeft % (1000 * 60)) / 1000);

    // Update the countdownValues state with the calculated values
    setCountdownValues({
      hours,
      minutes,
      seconds,
    });
  }

  // Set up an effect to run the countDown function every second
  useEffect(() => {
    const countdownInterval = setInterval(countDown, 1000); // Run countDown every 1000ms (1 second)
    return () => {
      clearInterval(countdownInterval); // Clean up interval when component unmounts
    };
  }, []);

  // Render the countdown timer component
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
