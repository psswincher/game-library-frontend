import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Spinner from "./Spinner/Spinner";
import "./Button.css";
function Button({ onClick, text, isOn, style, type, size, children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonOn, setIsButtonOn] = useState(false);

  const buttonStyles = [
    "default",
    "secondary",
    "danger",
    "mechanic",
    "attribute",
    "attribute_item-modal",
    "tab",
  ];
  const buttonSizes = [
    "smallest",
    "smaller",
    "small",
    "default",
    "large",
    "larger",
    "largest",
  ];

  const animationKey = {
    default: {
      initial: "defaultInitial",
      visible: "defaultVisible",
      exit: "defaultExit",
    },
    secondary: {
      initial: "defaultInitial",
      visible: "defaultVisible",
      exit: "defaultExit",
    },
    danger: {
      initial: "defaultInitial",
      visible: "defaultVisible",
      exit: "defaultExit",
    },
    mechanic: {
      initial: "mechanicInitial",
      visible: "mechanicVisible",
      exit: "defaultExit",
    },
    attribute: {
      initial: "mechanicInitial",
      visible: "mechanicVisible",
      exit: "defaultExit",
    },
    "attribute_item-modal": {
      initial: "mechanicInitial",
      visible: "mechanicVisible",
      exit: "defaultExit",
    },
    tab: {
      initial: "defaultInitial",
      visible: "defaultVisible",
      exit: "defaultExit",
    },
  };

  const getAnimation = (type) => {
    return animationKey?.[style]
      ? animationKey[style][type]
      : animationKey.default[type];
  };

  const itemVariants = {
    mechanicInitial: {
      opacity: 0,
      y: -20,
    },
    defaultInitial: {
      x: 0,
      opacity: 1,
    },
    defaultVisible: {
      x: 0,
      opacity: 1,
    },
    mechanicVisible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        type: "spring",
        stiffness: 150,
        damping: 20,
      },
    },
  };

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
      variants={itemVariants}
      viewport={{ once: true }}
      initial={getAnimation("initial")}
      animate={getAnimation("visible")}
      exit={getAnimation("exit")}
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
