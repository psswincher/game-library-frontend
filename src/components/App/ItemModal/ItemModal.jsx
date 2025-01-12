import { useContext } from "react";

import styles from "./ItemModal.module.css";
import Modal from "../Modal/Modal";
import Button from "../Buttons/Button";
import { GameFilterContext } from "../../../contexts/GameFilterContext";
import InteractionBar from "../InteractionBar/InteractionBar";
import { IsLoggedInContext } from "../../../contexts/IsLoggedInContext";
import GameImage from "../GameImage/GameImage";

function ItemModal({ item, isOpen }) {
  const { onFilterOptionClick, isOptionActive } = useContext(GameFilterContext);
  const { isLoggedIn } = useContext(IsLoggedInContext);

  return (
    <Modal isOpen={isOpen}>
      <div className={styles.modal__content}>
        <div className={styles.modal__top}>
          <GameImage game={item} size="small" />
          <div className={styles["item-modal__top-info"]}>
            <h2 className={styles["item-modal__title"]}>{item.name}</h2>
            <div className={styles["item-modal__top-base-data"]}>
              <Button
                text={item.category}
                isOn={isOptionActive("Category", item.category)}
                onClick={() => onFilterOptionClick("Category", item.category)}
                style="attribute-item-modal"
              />
              <Button
                text={item.complexity}
                isOn={isOptionActive("Complexity", item.complexity)}
                onClick={() =>
                  onFilterOptionClick("Complexity", item.complexity)
                }
                style="attribute-item-modal"
              />
              <Button
                text={item.gameLength}
                isOn={isOptionActive("Game Length", item.gameLength)}
                onClick={() =>
                  onFilterOptionClick("Game Length", item.gameLength)
                }
                style="attribute-item-modal"
              />
            </div>
            <p className={styles["item-modal__short-description"]}>
              {item.shortDescription}
            </p>

            <p className={styles["item-modal__data"]}>{item.playerCountSlug}</p>
          </div>
        </div>
        <div className={styles.modal__bottom}>
          <div className={styles["modal__game-mechanics"]}>
            {item.mechanics
              ? item.mechanics.map((mechanic, index) => {
                  return (
                    <Button
                      style="mechanic"
                      size="smallest"
                      text={mechanic}
                      key={index}
                      isOn={isOptionActive("Mechanics", mechanic)}
                      onClick={() => onFilterOptionClick("Mechanics", mechanic)}
                    />
                  );
                })
              : null}
          </div>
          <p className={styles["modal__game-fullDescription"]}>
            {item.fullDescription}
          </p>
          {isLoggedIn && <InteractionBar game={item} />}
          <p className={styles.modal__game_publisher}></p>
          <p className={styles.modal__buttons}></p>
        </div>
      </div>
    </Modal>
  );
}

export default ItemModal;
