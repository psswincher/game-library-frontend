import { useState, useEffect } from "react";
import Spinner from "./Spinner/Spinner";
import "./Button.css";
function Button({ onClick, text, isActive, variant, type }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const buttonVariants = ["default", "secondary", "mechanic"];

  const buttonVariantClass = () => {
    if (variant) {
      return buttonVariants.includes(variant) ? "button_" + variant : "";
    }
    return "";
  };

  const buttonActiveClass = () => {
    return isButtonActive ? "button_on" : "";
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
    setIsButtonActive(isActive);
  }, [isActive]);

  return (
    <button
      className={`button ${buttonVariantClass()} ${buttonActiveClass()}`}
      type={type ? type : "button"}
      onClick={onButtonClick}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <span
          className={`button__text ${buttonVariantClass()} ${buttonActiveClass()}`}
        >
          {text}
        </span>
      )}
    </button>
  );
}

export default Button;
