import React, { useEffect, useState}  from "react";
import { api } from "../../utils/api";
 
const LikeButton = ({likes, userId, cardId}) => {
  const [isLiked, setIsLike] = useState(false);
  const [count, setCount] = useState(likes.length);

  useEffect(() => {
      setIsLike(likes.some((elem) => userId === elem));
  }, [likes, userId]);

  function handleLikeClick() {
      api
          .changeLikeCardStatus(cardId, isLiked)
          .then((newCard) => {
              setIsLike(newCard.likes.some((i) => i === userId));
              setCount(newCard.likes.length);
          })
          .catch((err) => {
              console.log(`Error: ${err}`);
          });
  }

  const cardLikeButtonClassName = `elements__like-button ${
      isLiked ? "elements__like-button_active" : ""
  }`;

  return (
        <div className="elements__like-area">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="elements__like-count">{count}</p>
        </div>
  );
}

export default LikeButton;
