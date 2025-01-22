import Modal from "../Modal/Modal";
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
      <form className="modal__form" onSubmit={handleSubmit}>
        {children}
        <div className="modal__button-container">
          <Button
            type="submit"
            text={submitButtonText}
            onClick={handleSubmit}
            style="primary"
          />
          {altButtonText && handleAltButton && (
            <Button
              type="button"
              style="secondary"
              text={altButtonText}
              onClick={handleAltButton}
            />
          )}
        </div>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
