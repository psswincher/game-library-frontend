import { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/App/Header/Header";
import Main from "./components/App/Main/Main";
import ModalWithForm from "./components/App/ModalWithForm/ModalWithForm";
import Footer from "./components/App/Footer/Footer";
import styleAddGarmentModal from "./components/App/ModalWithForm/ModalWithForm.module.css";
import ItemModal from "./components/App/ItemModal/ItemModal";
import UserProfile from "./components/App/UserProfile/UserProfile"
import FilterBar from "./components/App/FilterBar/FilterBar";
import {Api} from "./utils/api.js";
import userImage from "./assets/terrence-user-image.png";


function App() {
  const user = { name: "Terrence Tegegne", image: userImage };
  const [activeModal, setActiveModal] = useState("");
  const [activeCard, setActiveCard] = useState({});
  const [userProfileVisible, setUserProfileVisible] = useState(false);
  const [gameLibrary, setGameLibrary] = useState({});
  const gamesData = new GameLibrary;
  const api = new Api(apiInfo.baseUrl);

  useEffect(
    () =>
      async function fetchData() {
        if (gamesData.exists === false) {
          api.getGames().then((res) => {
            console.log(res);
            setGameLibrary(res);
            console.log(gameLibrary);
          });      
        } 
        
      }
  );

  const closeActiveModal = () => setActiveModal("");
  const onProfileClick = () => setUserProfileVisible(true);
  const closeUserProfile = () => setUserProfileVisible(false);
  const gameWeight = () => setGameWeight("lightweight");
  
  const onFilterButtonClick = (filterButton) => {
    setActiveCard(filterButton);
    setActiveModal("");
  };

  const onItemClick = (item) => {
    setActiveCard(item);
    setActiveModal("item-preview");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header
          user={user}
          />
        <FilterBar onFilterButtonClick={onFilterButtonClick}/>
        <Main
          onItemClick={onItemClick}
          gameWeight={gameWeight}
          />
        <Footer />
        <ItemModal
          item={activeCard}
          activeModal={activeModal}
          previewItem={activeCard}
          closeModal={closeActiveModal}
        />
        <ModalWithForm
          title="New Garment"
          buttonText="Add garment"
          activeModal={activeModal}
          closeModal={closeActiveModal}
        >
          <label
            htmlFor="garment-name"
            className={styleAddGarmentModal["modal__label"]}
          >
            Name
            <input
              name="garment-name"
              id="garment-name"
              className={styleAddGarmentModal["modal__input"]}
              type="text"
              placeholder="Name"
              required
            />
            <span
              className="modal__input_type_error garment-name-error"
              id="garment-name-input-error"
            ></span>
          </label>
          <label
            htmlFor="garment-imageUrl"
            className={styleAddGarmentModal["modal__label"]}
          >
            Image
            <input
              name="garment-imageUrl"
              id="garment-imageUrl"
              className={styleAddGarmentModal["modal__input"]}
              type="text"
              placeholder="Image URL"
              required
            />
            <span
              className="modal__input_type_error garment-name-input-error"
              id="garment-name-input-error"
            ></span>
          </label>
          <fieldset className={styleAddGarmentModal["modal__radio-buttons"]}>
            <legend className={styleAddGarmentModal["modal__legend"]}>
              <label
                htmlFor="hot"
                className={
                  styleAddGarmentModal["modal__label modal__label_type_radio"]
                }
              >
                <input
                  id="hot"
                  type="radio"
                  className={styleAddGarmentModal["modal__radio-input"]}
                />
                <span>Hot</span>
              </label>
              <label
                htmlFor="warm"
                className={
                  styleAddGarmentModal["modal__label modal__label_type_radio"]
                }
              >
                <input
                  id="warm"
                  type="radio"
                  className={styleAddGarmentModal["modal__radio-input"]}
                />
                <span>Warm</span>
              </label>
              <label
                htmlFor="cold"
                className={
                  styleAddGarmentModal["modal__label modal__label_type_radio"]
                }
              >
                <input
                  id="cold"
                  type="radio"
                  className={styleAddGarmentModal["modal__radio-input"]}
                />
                <span>Cold</span>
              </label>
            </legend>
          </fieldset>
        </ModalWithForm>
        <UserProfile
          user={user}
          onCloseUserProfile={closeUserProfile}
          userProfileVisible={userProfileVisible}
        />
      </div>
    </div>
  );
}

export default App;
