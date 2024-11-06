import styles from "./ItemModal.module.css";
import closeModalIcon from "../../../assets/close-modal-icon.svg";

function ItemModal({ activeModal, item, closeModal, onItemClick }) {
  //   debugger;
  return (
    <div
      className={`modal ${activeModal === "item-preview" && "modal_open"}`}
      onClick={onItemClick}
    >
      <div className={styles.modal__content}>
        <button
          type="button"
          className={styles["modal__close-button"]}
          onClick={closeModal}
        >
          <img
            className="modal__close-icon"
            alt="Close Modal"
            src={closeModalIcon}
          />
        </button>
        <img className={styles.modal__image} src={item.image} />
        <div className={styles.modal__text}>
          <h2 className={styles.modal__title}>{item.name}</h2>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
