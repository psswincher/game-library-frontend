import { useState, useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import "./IconButton.css";
function IconButton({ onClick, isActive, alt, variant, type, icon, children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const buttonVariants = ["default", "secondary"];

  const buttonVariantClass = () => {
    if (variant) {
      return buttonVariants.includes(variant) ? "iconButton_" + variant : "";
    }
    return "";
  };

  const buttonActiveClass = () => {
    return isButtonActive ? "iconButton_on" : "";
  };

  const onButtonClick = async (event) => {
    event.preventDefault();
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
      className={`iconButton ${buttonVariantClass()} ${buttonActiveClass()}`}
      type={type ? type : "button"}
      onClick={onButtonClick}
    >
      {children}
      {isLoading ? (
        <Spinner />
      ) : (
        <img
          src={icon}
          className={`iconButton__icon ${buttonVariantClass()} ${buttonActiveClass()}`}
          alt={alt}
        />
      )}
    </button>
  );
}

export default IconButton;
