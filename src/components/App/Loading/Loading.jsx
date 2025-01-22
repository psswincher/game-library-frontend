import React, { useState, useEffect } from "react";
import RandomStringDisplay from "./RandomStringDisplay/RandomStringDisplay";
import "./Loading.css";
import Spinner from "../Buttons/Spinner/Spinner";

function Loading() {
  const loadingStrings = [
    "Fetching games...",
    "Organizing meeples...",
    "Getting it to the table...",
    "Setting up boards...",
    "Fetching game descriptions...",
    "Organizing games by category...",
    "Sorting game pieces by color...",
    "Testing dice for balance...",
    "Rolling initiative...",
  ];
  return (
    <div className="loading">
      <div className="loading__text">
        <RandomStringDisplay strings={loadingStrings} />
      </div>
      <Spinner />
    </div>
  );
}

export default Loading;
