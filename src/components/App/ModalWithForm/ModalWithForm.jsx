import Modal from "../Modal/Modal";
import style from "./ModalWithForm.module.css";
import Button from "../Buttons/Button";

function ModalWithForm({
  children,
  submitButtonText,
  closeModal,
  isOpen,
  handleSubmit,
  altButtonText,
  handleAltButton,
}) {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <form className={style["modal__form"]} onSubmit={handleSubmit}>
        {children}
        <div className={`${style["modal__button-container"]}`}>
          <Button
            type="submit"
            text={submitButtonText}
            onClick={handleSubmit}
          />
          {altButtonText && handleAltButton && (
            <Button type="submit" variant="secondary" text={altButtonText} />
          )}
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
