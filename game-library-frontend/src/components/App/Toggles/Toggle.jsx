import { useState } from "react";
import { motion } from "framer-motion";
import "./Toggle.css";

const Toggle = ({
  optionOne,
  optionTwo,
  isImage = false,
  onToggle,
  startingOption,
}) => {
  const [isOptionOne, setIsOptionOne] = useState(startingOption);

  const handleClick = () => {
    setIsOptionOne(!isOptionOne);
    onToggle();
  };

  return (
    <div className="toggle-container" onClick={handleClick}>
      <motion.div
        className="toggle"
        initial={{ x: 0 }}
        animate={{ x: isOptionOne ? 2 : "115%" }}
        transition={{ type: "spring", stiffness: 50, duration: 0.05 }}
      ></motion.div>
      <div className="toggle__options">
        {isImage ? (
          <>
            <img
              src={optionOne}
              alt="Option One"
              className={`toggle__image ${isOptionOne ? "active" : ""}`}
            />
            <img
              src={optionTwo}
              alt="Option Two"
              className={`toggle__image ${!isOptionOne ? "active" : ""}`}
            />
          </>
        ) : (
          <>
            <span className={`toggle__text ${isOptionOne ? "active" : ""}`}>
              {optionOne}
            </span>
            <span className={`toggle__text ${!isOptionOne ? "active" : ""}`}>
              {optionTwo}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Toggle;
