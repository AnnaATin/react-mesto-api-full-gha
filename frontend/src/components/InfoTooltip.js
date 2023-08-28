import React from "react";
import success from "../images/success.svg";
import unsuccess from "../images/unsuccess.svg";

function InfoTooltip(props) {
  const { name, isSignIn, isOpen, onClose } = props;
  const icon = isSignIn ? success : unsuccess;
  const message = isSignIn
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";
  return (
    <section className={`popup popup_${name} ${isOpen ? "popup_opened" : " "}`}>
      <div className="popup__container popup__container-tooltip">
        <button className="popup__close-button" onClick={onClose}></button>
        <img className="popup__tooltip-img" src={icon} />
        <h2 className="popup__text">{message}</h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
