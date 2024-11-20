import React from "react";
import "./UserInfo.css";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import { AppContext } from "../../../contexts/AppContext";

function UserInfo() {
  const { currentUser } = React.useContext(CurrentUserContext);
  const { setActiveModal } = React.useContext(AppContext);

  const onUserInfoClick = () => {
    setActiveModal("profile-modal");
  };

  return (
    <button
      type="button"
      className="user-info__container"
      onClick={onUserInfoClick}
    >
      <p className="user-info__user-name">{currentUser.name} </p>
      {currentUser.avatar ? (
        <img
          className={`user-info__user-image`}
          src={currentUser.avatar}
          alt="User Profile Image"
        />
      ) : (
        <span className={`user-info__image-placeholder`}>
          {currentUser.name && currentUser.name[0]}
        </span>
      )}
    </button>
  );
}

export default UserInfo;
