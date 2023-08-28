import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onUpdateUser, onClose}) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.description)
  }, [currentUser, isOpen])

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: name,
      description: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile-edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <fieldset className="popup__inputs-container">
        <div className="popup__input-container">
          <input
            name="name"
            type="text"
            className="popup__input"
            id="name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
            value={name}
            onChange={handleNameChange}
          />
          <span className="popup__input-error name-input-error"></span>
        </div>
        <div className="popup__input-container">
          <input
            name="description"
            type="text"
            className="popup__input"
            id="description"
            placeholder="Описание"
            minLength="2"
            maxLength="200"
            required
            value={description}
            onChange={handleDescriptionChange}
          />
          <span className="popup__input-error description-input-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
