import "./Loading.css";
import Spinner from "../Buttons/Spinner/Spinner";

function Loading() {
  return (
    <div className="loading">
      <div className="loading__text">Loading</div>
      <Spinner />
    </div>
  );
}

export default Loading;
