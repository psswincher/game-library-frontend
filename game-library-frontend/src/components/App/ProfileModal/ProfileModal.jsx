import { useContext } from "react";

import styles from "./ProfileModal.module.css";
import Modal from "../Modal/Modal";
import { AppContext } from "../../../contexts/AppContext";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
function ProfileModal({ isOpen, handleLogout }) {
  const { isLoading, closeActiveModal } = useContext(AppContext);
  const { currentUser } = useContext(CurrentUserContext);

  const onLogoutClick = () => {
    closeActiveModal();
    handleLogout();
  };

  return (
    <Modal isOpen={isOpen}>
      <div className={styles.modal__content}>
        <div className={styles.modal__top}>
          <img className={styles.modal__image} src={currentUser.image} />
        </div>
        <div className={styles.modal__bottom}>
          <div className={styles.modal__game_data}>
            <div className={styles.modal__game_baseData}>
              {currentUser.name}
              {/* {item.category}, {item.complexity}, {item.gameLength} */}
            </div>
            <div className={styles.modal__game_playerData}>
              {/* {item.playerCountSlug} */}
            </div>
          </div>
          <div className={styles.modal__buttons}>
            <button
              type="button"
              className={styles.modal__button}
              onClick={onLogoutClick}
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ProfileModal;
