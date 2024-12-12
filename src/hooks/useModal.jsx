import { useState } from "react";

export const useModal = () => {
  const [activeModal, setActiveModal] = useState();

  const isOpen = (modalName) => {
    return modalName === activeModal;
  };

  const closeActiveModal = () => setActiveModal("");

  return {
    isOpen,
    activeModal,
    setActiveModal,
    closeActiveModal,
  };
};
