import { useContext } from "react";

import "./Profile.css";

import { IsLoggedInContext } from "../../../contexts/IsLoggedInContext";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";

import SectionItemCards from "../Main/SectionTextItemCards/SectionTextItemCards";
function Profile({ onItemClick, onFilterModalClick }) {
  const { isLoggedIn } = useContext(IsLoggedInContext);
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="profile">
      {isLoggedIn ? (
        <div className="profile__logged-in_true">
          <div className="profile__hero">
            <div className="profile__header">Welcome, {currentUser.name}</div>
          </div>
          <div className="profile__games">
            <div className="profile__games-title">Liked Games</div>
            <SectionItemCards
              onItemClick={onItemClick}
              onFilterModalClick={onFilterModalClick}
              sectionFilter="Likes"
            />
          </div>
          <div className="profile__games">
            <div className="profile__games-title">Interested in Playing</div>
            <SectionItemCards
              onItemClick={onItemClick}
              onFilterModalClick={onFilterModalClick}
              sectionFilter="Interested"
            />
          </div>
          <div className="profile__games">
            <div className="profile__games-title">Played Games</div>
            <SectionItemCards
              onItemClick={onItemClick}
              onFilterModalClick={onFilterModalClick}
              sectionFilter="Has Played"
            />
          </div>
        </div>
      ) : (
        <div className="profile__logged-in_false">
          <div className="profile__hero">
            <div className="profile__header">Hey! Listen!</div>
            <div className="profile__subheader">
              Log in to view games that you've liked, played or flagged as
              interested in.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
