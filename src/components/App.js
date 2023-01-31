import React, {useEffect, useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function setUser() {
      await api.getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {console.log(err)})
    }
    setUser();
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm
          name='edit-profile'
          title='Редактировать&nbsp;профиль'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          children={(
            <>
              <input type="text" name="name" className="popup__form-item popup__form-item_el_name" placeholder="Имя пользователя" minLength="2" maxLength="40" required/>
              <span className="popup__input-error input-error-name"></span>
              <input type="text" name="about" className="popup__form-item popup__form-item_el_about" placeholder="Род деятельности" minLength="2" maxLength="200" required/>
              <span className="popup__input-error input-error-about"></span>
            </>
          )}
          buttonText='Сохранить'
        />

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
