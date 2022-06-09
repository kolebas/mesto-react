import '../index.css';
import Header from './Header';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import Footer from './Footer.js';
import { useState } from 'react';


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');  

  const popups = [
    {
      key: 1,
      title: 'Редактирование профиля',
      name: 'edit-profile',
      isOpen: isEditProfilePopupOpen,
      children: 
        <>
            <input id="discover" type="text" name="discover" className="popup__input" minLength="2" maxLength="40" required />
            <span id="discover-error" className="popup__error"></span>
            <input id="job" type="text" name="job" className="popup__input" minLength="2" maxLength="200" required />
            <span id="job-error" className="popup__error"></span>
            <button className="popup__button popup__button_disabled" type="submit" aria-label="Save" disabled>Сохранить</button>
            <button onClick={ closeAllPopups } className="popup__close-button" type="button"></button>
        </>
    },
    {
      key: 2,
      title: 'Новое место',
      name: 'new-card',
      isOpen: isAddPlacePopupOpen,
      children: 
        <>
          <input id="title" type="text" placeholder="Название" name="title" className="popup__input" minLength="2" maxLength="30" required/>
          <span id="title-error" className="popup__error"></span>
          <input id="link" type="url" placeholder="Ссылка на картинку" name="link" className="popup__input" required/> 
          <span id="link-error" className="popup__error"></span>
          <button className="popup__button popup__button_disabled" type="submit" aria-label="Save" disabled>Сохранить</button>
          <button onClick={ closeAllPopups } className="popup__close-button" type="button"></button>
        </>
    },
    {
      key: 3,
      title: 'Обновить аватар',
      name: 'edit-avatar',
      isOpen: isEditAvatarPopupOpen,
      children: 
        <>
          <input id="avatar-link" type="url" placeholder="Ссылка на картинку" name="avatar-link" className="popup__input" required /> 
          <span id="avatar-link-error" className="popup__error"></span>
          <button className="popup__button popup__button_disabled" type="submit" aria-label="Save" disabled>Сохранить</button>
          <button onClick={ closeAllPopups } className="popup__close-button" type="button"></button>
        </>
    },
  ]
  
function handleEditAvatarClick() {
  setEditAvatarPopupOpen(true);
}

function handleEditProfileClick() {
  setEditProfilePopupOpen(true);
}

function handleAddPlaceClick() {
  setAddPlacePopupOpen(true)  
}

function closeAllPopups(){
  setEditAvatarPopupOpen(false);
  setEditProfilePopupOpen(false);  
  setAddPlacePopupOpen(false);
  setSelectedCard('');  
}

function handleCardClick(card){
  setSelectedCard(card);  
}

  return (
    <>    
    <div className="page">
      <Header />
      <Main onEditProfile={ handleEditProfileClick } onAddPlace={ handleAddPlaceClick }  onEditAvatar={ handleEditAvatarClick } onCardClick={ handleCardClick } />
        {popups.map((item) =>(<PopupWithForm {...item}> { item.children} </PopupWithForm>))}
        <ImagePopup card={ selectedCard }  />
        <div className="popup" id="popup-submit">
          <div className="popup__container">
            <h2 className="popup__title">Вы уверены?</h2>
            <form className="popup__form" name="popup-submit" action="submit" noValidate>
              <button className="popup__button" type="submit" aria-label="Save">Да</button>
              <button className="popup__close-button" type="button"></button>
            </form>
          </div>
        </div>
        <Footer />
    </div>
  </>  
  );
}


export default App;
