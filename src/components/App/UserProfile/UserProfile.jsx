import "./UserProfile.css";
import closeModalIcon from "../../../assets/close-modal-icon.svg";

function UserProfile({ user, onCloseUserProfile, userProfileVisible }) {
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
      <h2 className="user-profile__name">{user.name}</h2>
    </div>
  );
}

export default UserProfile;
