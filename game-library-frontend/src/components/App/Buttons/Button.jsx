import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Spinner from "./Spinner/Spinner";
import "./Button.css";
function Button({ onClick, text, isOn, style, type, size, children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonOn, setIsButtonOn] = useState(false);

  const buttonStyles = ["default", "secondary", "danger", "mechanic", "tab"];
  const buttonSizes = [
    "smallest",
    "smaller",
    "small",
    "default",
    "large",
    "larger",
    "largest",
  ];

  const buttonSizeClass = () => {
    if (size !== undefined && size !== null) {
      if (size !== "") {
        return buttonSizes.includes(size)
          ? "button__size_" + size
          : "button__size_default";
      } else {
        console.log(`Invalid button size: ${size}`);
      }
    }
    return "button__size_default";
  };

  const buttonStyleClass = () => {
    if (style !== undefined && style !== null) {
      return buttonStyles.includes(style)
        ? "button__style_" + style
        : "button__style_default";
    } else {
      console.log(`Invalid button style: ${style}`);
    }
    return "button__style_default";
  };

  const buttonOnClass = () => {
    return isButtonOn ? "button_on" : "";
  };

  const onButtonClick = async (event) => {
    event.stopPropagation();
    try {
      const result = onClick(event);
      if (result instanceof Promise) {
        setIsLoading(true);
        await result;
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsButtonOn(isOn);
  }, [isOn]);

  return (
    <motion.button
      className={`button ${buttonStyleClass()} ${buttonOnClass()} ${buttonSizeClass()}`}
      type={type ? type : "button"}
      onClick={onButtonClick}
      initial={{ scale: 1 }}
      whileTap={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
      <div className="button__content">
        {isLoading ? (
          <Spinner />
        ) : (
          <span className={`button__text`}>{text}</span>
        )}
      </div>
    </motion.button>
  );
}

export default Button;
