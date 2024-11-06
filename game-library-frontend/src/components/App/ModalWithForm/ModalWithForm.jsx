import "../modal.css";
import style from "./ModalWithForm.module.css";
import closeModalIcon from "../../../assets/close-modal-icon.svg";

function ModalWithForm({
  activeModal,
  children,
  title,
  buttonText,
  closeModal,
}) {
  return (
    <div className={`modal ${activeModal === "add-garment" && "modal_open"}`}>
      <div className="modal__content">
        <button
          type="button"
          className={style["modal__close-button"]}
          onClick={closeModal}
        >
          <img
            className={style["modal__close-icon"]}
            alt="Close Modal"
            src={closeModalIcon}
          />
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className={style["modal__form"]}>{children}</form>
        <button className={style["modal__submit"]}>{buttonText}</button>
      </div>
    </div>
  );
}

export default ModalWithForm;
