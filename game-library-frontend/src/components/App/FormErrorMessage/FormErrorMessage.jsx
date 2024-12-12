import { motion } from "framer-motion";
import "./FormErrorMessage.css";

function FormErrorMessage({ message }) {
  const errorVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        y: {
          duration: 0.8,
          type: "spring",
        },
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        y: {
          duration: 0.8,
          type: "spring",
        },
      },
    },
  };

  return (
    <motion.div
      className="form-error-message"
      variants={errorVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {message}
    </motion.div>
  );
}

export default FormErrorMessage;
