import "./MechanicButton.css";

//project stretch goal is to create a description for each mechanic that appears on hover or touch
function MechanicButton({ mechanic }) {
  return (
    <li className="mechanic-button">
      <div className="mechanic-button_text">{mechanic}</div>
    </li>
  );
}

export default MechanicButton;
