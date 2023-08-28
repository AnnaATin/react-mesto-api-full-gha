function ImagePopup(props) {
  return (
    <div
      className={`popup popup_open-image ${props.card ? "popup_opened" : ""}`}
    >
      <div className="popup__img-container">
        <button
          type="button"
          className="popup__close-button popup__close-button_zoom-image"
          onClick={props.onClose}
        ></button>
        <figure className="popup__img">
          <img
            src={props.card ? props.card.src : "#"}
            className="popup__image"
            alt={props.card ? props.card.name : ""}
          />
          <figcaption className="popup__caption">
            {props.card ? props.card.name : ""}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
