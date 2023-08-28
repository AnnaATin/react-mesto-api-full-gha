import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

import { api } from "../utils/api";
import {
  CurrentUserContext
} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const backendCard = (card) => {
    return {
        src: card.link,
        name: card.name,
        likes: card.likes,
        _id: card._id,
        owner: card.owner,
    };
  };
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [isInfoTooltipPopup, setIsInfoTooltipPopup] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [checkToken, setCheckToken] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  
  const navigate = useNavigate();
  

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function onCardClick(card) {
    setSelectedCard(card);
  }

  function openInfoTooltipPopup(isSignIn) {
    setIsInfoTooltipPopup(true);
    setIsSignIn(isSignIn);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopup(false);
  }

  function handleUpdateUser(userData) {
    api.setUserInfoByApi(userData)
      .then((data) => {
        const {name, about: description, ...rest} = data.user;
        setCurrentUser({name, description, ...rest});
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  function onUpdateAvatar(userData) {
    api
      .handleUserAvatar(userData)
      .then((data) => {
        const {name, about: description, ...rest} = data.user;
        setCurrentUser({name, description, ...rest});
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((i) => i._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard.name, newCard.link)
      .then((newCard) => {
        setCards([backendCard(newCard), ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(regData) {
    auth
      .register(regData)
      .then((res) => {
        if (res && res.data) {
          openInfoTooltipPopup(true);
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltipPopup(false);
      });
  }

  function handleLogin(loginData) {
    auth
      .authorize(loginData)
      .then((res) => {
        if (res && res.token) {
          setCurrentUser({ ...currentUser, email: loginData.email });
          setLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltipPopup(false);
      });
  }

  useEffect(() => {
    api.getUserInfo()
        .then((res) => {
            if (res) {
                setLoggedIn(true);
                navigate('/');
            }
        })
        .catch(() => {
            setLoggedIn(false);
        });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSignOut() {
    auth.logout();
    navigate('/sign-up');
    setLoggedIn(false);
    setCards([]);
    setCurrentUser({});
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([data, cardsData]) => {
          const {name, about: description, ...rest} = data.user;
          const card = cardsData.cards.map((item) => {
            return {
                src: item.link,
                name: item.name,
                likes: item.likes,
                _id: item._id,
                owner: item.owner,
            };
        });
          setCards(card.reverse());
          setCurrentUser({name, description, ...rest});
        })
        .catch((err) => {
          console.log(err);
          openInfoTooltipPopup(false);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          email={currentUser.email}
          onSignOut={onSignOut}
        />
        <Routes>
          <Route path="*" element={<Navigate to="/sign-in" replace />} />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                checkToken={checkToken}
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={onCardClick}
                //handleCardLike={handleCardLike}
                handleCardDelete={handleCardDelete}
                cardsData={cards}
              />
            }
          />
        </Routes>
        <Footer loggedIn={loggedIn} />
      </div>
      <InfoTooltip
        name="tooltip"
        isOpen={isInfoTooltipPopup}
        onClose={closeAllPopups}
        isSignIn={isSignIn}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={onUpdateAvatar}
      />
      <PopupWithForm
        title="Вы уверены?"
        name="submit-delete"
        onClose={closeAllPopups}
        buttonText="Да"
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;

