import "./Main.css";
import SectionItemCards from "./SectionItemCards/SectionItemCards";

function Main({
  onItemClick,
  gameWeight,
}) {
  return (
    <main className="main">
      <div className="main__container">
        <SectionItemCards onItemClick={onItemClick} gameWeight={gameWeight} title={"Deception"} subtitle={"Figure out who is and isn't on your side!"}/>
      </div>
    </main>
  );
}

export default Main;
