import React, {useEffect, useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function setUser() {
      await api.getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {console.log(err)})
    }
    setUser();
    async function setData() {
      await api.getCards()
        .then((userCards) => {
            setCards(userCards);
        })
        .catch((err) => {
            console.log(err)
        })
    }
    setData();
  }, []);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(clickedCard) {
    setSelectedCard(clickedCard);
  }

  function handleCardLike(card, isLiked) {
    if (!isLiked) {
        api.likeCard(card._id)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {console.log(err)});
    } else {
        api.removeLike(card._id)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {console.log(err)});
    }
}

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id))
      })
      .catch((err) => {console.log(err)})
  }

  function handleUpdateUser(newUserInfo) {
    api.updateUserInfo(newUserInfo.name, newUserInfo.about)
      .then((updatedUser) => {setCurrentUser(updatedUser)})
      .then(() => {closeAllPopups()})
      .catch((err) => {console.log(err)})
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header />
        <Main
          cards = {cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

        <PopupWithForm
          name='change-avatar'
          title='Обновить&nbsp;аватар'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          children={(
            <>
              <input type="url" name="avatar" className="popup__form-item popup__form-item_el_link" placeholder="Ссылка на картинку" required/>
              <span className="popup__input-error input-error-avatar"></span>
            </>
          )}
          buttonText='Сохранить'
        />

        <PopupWithForm
          name='add-picture'
          title='Новое&nbsp;место'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          children={(
            <>
              <input type="text" name="picture-name" className="popup__form-item popup__form-item_el_card-name" placeholder="Название" minLength="2" maxLength="30" required/>
              <span className="popup__input-error input-error-picture-name"></span>
              <input type="url" name="picture-link" className="popup__form-item popup__form-item_el_link" placeholder="Ссылка на картинку" required/>
              <span className="popup__input-error input-error-picture-link"></span>
            </>
          )}
          buttonText='Создать'
        />

        <ImagePopup
          selectedCard = {selectedCard}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>

          );
}

export default App;
