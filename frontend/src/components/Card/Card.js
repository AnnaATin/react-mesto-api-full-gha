import React, {useContext}  from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import LikeButton from "./LikeButton";

function Card(props){ 
  const { card, onCardClick, onCardDelete } = props;
  const currentUser = useContext(CurrentUserContext);
  
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `elements__remove-button ${
    isOwn ? "" : "elements__remove-button_invalid"
  }`;
  
  const handleCardClick = () => {
    onCardClick(card);
  };
  function handleDeleteClick() {
    onCardDelete(card);
  };

  return (
    <article className="elements__grid-item">
      <img
        src={card.src}
        alt={card.name}
        className="elements__grid-image"
        onClick={handleCardClick}
      />
      <div className="elements__grid-text-area">
        <h2 className="elements__grid-text">{card.name}</h2>
        <div className="elements__like-area">
        <LikeButton
          likes={card.likes}
          userId={currentUser._id}
          cardId={card._id}
        />
        </div>
      </div>
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
    </article>
  );
}

export default Card;
