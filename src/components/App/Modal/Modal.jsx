import { useEffect, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import closeModalIcon from "../../../assets/close-modal-icon.svg";
import "./Modal.css";
import { AppContext } from "../../../contexts/AppContext";

function Modal({ children, isOpen }) {
  const { closeActiveModal } = useContext(AppContext);
  const modalWrapperRef = useRef(null);

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [closeActiveModal]);

  const handleOverlay = (e) => {
    if (
      modalWrapperRef.current &&
      !modalWrapperRef.current.contains(e.target)
    ) {
      console.log("Close modal clicked.");
      closeActiveModal();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`modal ${isOpen && "modal__open"}`}
          onClick={handleOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            ref={modalWrapperRef}
            className="modal__wrapper"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              type="button"
              className={`modal__close-button`}
              onClick={closeActiveModal}
              style={{ right: "2%", top: "2%" }}
            >
              <img
                className={"modal__close-icon"}
                alt="Close Modal"
                src={closeModalIcon}
              />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
