import React, { useState, useEffect } from "react";

const RandomStringDisplay = ({ strings, interval = 2000 }) => {
  const [remainingStrings, setRemainingStrings] = useState([...strings]);
  const [displayedStrings, setDisplayedStrings] = useState([]);
  const [currentString, setCurrentString] = useState("Loading...");

  useEffect(() => {
    if (strings.length === 0) return;

    const timer = setInterval(() => {
      if (remainingStrings.length === 0) {
        // Reset the cycle
        setRemainingStrings([...strings]);
        setDisplayedStrings([]);
        setCurrentString("Loading...");
      } else {
        // Grab a random string
        const randomIndex = Math.floor(Math.random() * remainingStrings.length);
        const randomString = remainingStrings[randomIndex];

        // Update the state
        setRemainingStrings((prev) =>
          prev.filter((_, index) => index !== randomIndex)
        );
        setDisplayedStrings((prev) => [...prev, randomString]);
        setCurrentString(randomString);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [remainingStrings, strings, interval]);

  return <>{currentString}</>;
};

export default RandomStringDisplay;
