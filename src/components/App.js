import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }

  return (
    <div className="page">

      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}/>
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
            <button type="submit" className="popup__save-btn">Сохранить</button>
          </>
        )}
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
            <button type="submit" className="popup__save-btn">Сохранить</button>
          </>
        )}
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
            <button type="submit" className="popup__save-btn">Создать</button>
          </>
        )}
      />

      <template id="card">
        <li className="gallery__element">
          <img src="<%=require('./images/profile/profile-pic.jpg')%>" alt="Картинка" className="gallery__image"/>
          <button type="button" aria-label="Удалить картинку" className="gallery__delete-image-btn"></button>
          <div className="gallery__image-description">
            <h2 className="gallery__image-title">Карачаевск</h2>
            <div className="gallery__like">
              <button type="button" aria-label="Мне нравится" className="gallery__image-like-btn"></button>
              <p className="gallery__number-of-likes">0</p>
            </div>
          </div>
        </li>
      </template>

      <div className="popup popup_type_open-picture">
        <div className="picture popup__content">
          <button type="button" aria-label="Закрыть фотографию" className="popup__close-btn picture__close-btn close-btn"></button>
          <img src="<%=require('./images/profile/profile-pic.jpg')%>" alt="Картинка" className="picture__image"/>
          <h2 className="picture__title">Карачаево-Черкессия</h2>
        </div>
      </div>

      <div className="popup popup_type_delete-card">
        <div className="popup__container popup__content">
          <button type="button" aria-label="Закрыть модальное окно" className="popup__close-btn close-btn"></button>
          <h2 className="popup__title popup__title_small-margin-bottom">Вы&nbsp;уверены?</h2>
          <button type="submit" className="popup__save-btn popup__save-btn_size_large">Да</button>
        </div>
      </div>

    </div>
  );
}

export default App;
