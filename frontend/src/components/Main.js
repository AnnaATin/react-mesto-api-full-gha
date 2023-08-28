import React from "react";
import Card from "./Card/Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  handleCardLike,
  handleCardDelete,
  cardsData,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
          />
          <button
            type="button"
            className="profile__avatar-edit-button"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__block">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
          </div>
          <h2 className="profile__description">{currentUser.description}</h2>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cardsData.map((card) =>
           (
          <Card
            key={card._id}
            card={card}
            // cardsData={cardsData}
            onCardClick={onCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          )
          )}
      </section>
    </main>
  );
}

export default Main;

