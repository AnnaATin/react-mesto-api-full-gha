import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose }) {
  const avatarRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar-edit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Обновить"
    >
      <input
        type="url"
        className="popup__input"
        name="userAvatar"
        id="avatarLink"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span className="popup__input-error avatarLink-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
