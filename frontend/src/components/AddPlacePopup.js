import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="place-edit"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <fieldset className="popup__inputs-container">
        <div className="popup__input-container">
          <input
            name="name"
            type="text"
            className="popup__input"
            id="name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
            onChange={handleNameChange}
          />
          <span className="popup__input-error placename-input-error"></span>
        </div>
        <div className="popup__input-container">
          <input
            type="url"
            className="popup__input"
            name="link"
            id="link"
            placeholder="Ссылка на картинку"
            required
            onChange={handleLinkChange}
          />
          <span className="popup__input-error imglink-input-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
