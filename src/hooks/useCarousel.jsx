import { useRef, useEffect } from "react";
import { useAnimate } from "framer-motion";

export function useCarousel(itemArray, moveTransition, itemWidth, itemGap) {
  const [carouselScope, animate] = useAnimate();
  const positionRef = useRef(0);
  const indexRef = useRef(0);
  const moveDistanceRef = useRef((80 / 100) * window.innerWidth);
  const maxMovesRef = useRef(
    Math.floor(
      (itemArray.length * (itemWidth + itemGap)) / moveDistanceRef.current
    )
  );

  const updateDimensions = () => {
    moveDistanceRef.current = (80 / 100) * window.innerWidth;
    maxMovesRef.current = Math.floor(
      (itemArray.length * (itemWidth + itemGap)) / moveDistanceRef.current
    );
  };

  useEffect(() => {
    const handleResize = () => {
      updateDimensions();
    };

    if (itemArray.length > 0) {
      updateDimensions();
    }

    if (indexRef.current > itemArray.length) {
      moveToLast();
    }

    if (maxMovesRef.current === 1 || maxMovesRef.current === 0) {
      moveToFirst();
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [itemArray]);

  const animateCarousel = (position) => {
    console.log("Animating carousel to position", position);
    animate(carouselScope.current, { x: position }, moveTransition);
  };

  const moveToFirst = () => {
    indexRef.current = 0;
    positionRef.current = 0;
    animateCarousel(positionRef.current);
  };

  const moveToLast = () => {
    indexRef.current = maxMovesRef.current;
    positionRef.current = -(moveDistanceRef.current * maxMovesRef.current);
    animateCarousel(positionRef.current);
  };

  const advanceCarousel = () => {
    positionRef.current -= moveDistanceRef.current;
    indexRef.current += 1;
    animateCarousel(positionRef.current);
  };

  const retreatCarousel = () => {
    positionRef.current += moveDistanceRef.current;
    indexRef.current -= 1;
    animateCarousel(positionRef.current);
  };

  const moveToNext = () => {
    console.log("move to next called");
    console.log("indexRef", indexRef.current);
    console.log("maxMovesRef", maxMovesRef.current);
    if (indexRef.current < maxMovesRef.current) {
      advanceCarousel();
    } else if (indexRef.current === maxMovesRef.current) {
      moveToFirst();
    }
  };

  const moveToPrevious = () => {
    if (indexRef.current > 0) {
      retreatCarousel();
    } else if (indexRef.current === 0) {
      moveToLast();
    }
  };

  return {
    carouselScope,
    positionRef,
    indexRef,
    maxMovesRef,
    moveToFirst,
    moveToLast,
    moveToNext,
    moveToPrevious,
    updateDimensions,
  };
}
