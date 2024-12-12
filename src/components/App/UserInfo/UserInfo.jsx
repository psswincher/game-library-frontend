import "./UserInfo.css";

function UserInfo({ name, avatar, onClick }) {
  return (
    <div to="/profile" className="user-info__container" onClick={onClick}>
      <p className="user-info__user-name">{name} </p>
      {avatar ? (
        <img
          className={`user-info__user-image`}
          src={avatar}
          alt="User Profile Image"
        />
      ) : (
        <span className={`user-info__image-placeholder`}>{name}</span>
      )}
    </div>
  );
}

export default UserInfo;
