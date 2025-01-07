import "./UserInfo.css";

function UserInfo({ name, onClick }) {
  return (
    <div to="/profile" className="user-info__container" onClick={onClick}>
      <p className="user-info__user-name">{name} </p>
    </div>
  );
}

export default UserInfo;
