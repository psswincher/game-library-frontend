import { useRef, useEffect } from "react";
import { useAnimate } from "framer-motion";

export function useProgressBar(maxMovesRef, currentIndexRef) {
  const [progressBarRef, animate] = useAnimate();

  const calculateProgressBarWidth = () => {
    return currentIndexRef.current === 0
      ? "5%"
      : `${Math.floor(
          (currentIndexRef.current / (maxMovesRef.current + 1)) * 100
        )}%`;
  };

  const updateProgressBar = () => {
    const width =
      maxMovesRef.current <= 1 ? "100%" : calculateProgressBarWidth();
    console.log("bar width", width);
    animate(progressBarRef.current, { width });
  };

  useEffect(() => {
    updateProgressBar();
  }, [maxMovesRef]);

  return {
    progressBarRef,
    updateProgressBar,
  };
}
