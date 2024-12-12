import "./UserProfile.css";
import closeModalIcon from "../../../assets/close-modal-icon.svg";

function UserProfile({
  user,
  onCloseUserProfile,
  userProfileVisible,
}) {
  return (
    <div
      className={`user-profile ${
        userProfileVisible === true && "user-profile_open"
      }`}
    >
      <button
        type="button"
        className="user-profile__close-button"
        onClick={onCloseUserProfile}
      >
        {" "}
        <img
          className="modal__close-icon"
          alt="Close Modal"
          src={closeModalIcon}
        />
      </button>
      <div className="user-profile__info-container">
        <h2 className="user-profile__name">{user.name}</h2>
        <img
          className="user-profile__image"
          alt="Profile image"
          src={user.image}
        />
      </div>
    </div>
  );
}

export default UserProfile;
