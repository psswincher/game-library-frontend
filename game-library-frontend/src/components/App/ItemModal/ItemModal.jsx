import { useContext, useState, useEffect } from "react";

import styles from "./ItemModal.module.css";
// import closeModalIcon from "../../../assets/close-modal-icon.svg";
import MechanicButton from "../MechanicButton/MechanicButton";
import Modal from "../Modal/Modal";
import { AppContext } from "../../../contexts/AppContext";

function ItemModal({ item, isOpen }) {
  const { isLoading } = useContext(AppContext);

  return (
    <Modal isOpen={isOpen}>
      <div className={styles.modal__content}>
        <div className={styles.modal__top}>
          <img className={styles.modal__image} src={item.imageUrl} />
        </div>
        <div className={styles.modal__bottom}>
          <div className={styles.modal__game_data}>
            <div className={styles.modal__game_baseData}>
              {item.category}, {item.complexity}, {item.gameLength}
            </div>
            <div className={styles.modal__game_playerData}>
              {item.playerCountSlug}
            </div>
          </div>
          <div className={styles.modal__game_mechanics}>
            {item.mechanics
              ? item.mechanics.map((mechanic, index) => {
                  return <MechanicButton key={index} mechanic={mechanic} />;
                })
              : null}
          </div>
          <div className={styles.modal__game_shortDescription}>
            {item.shortDescription}
          </div>
          <div className={styles.modal__game_publisher}></div>
          <div className={styles.modal__buttons}></div>
        </div>
      </div>
    </Modal>
  );
}

export default ItemModal;
