import "../index.css";
import api from '../utils/api.js';
import Header from "./Header";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ImagePopup from "./ImagePopup.js";
import Footer from "./Footer.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useEffect, useState } from "react";


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.setProfile().then((data) => {
      setCurrentUser(data);
    })
    .catch((error) => {
      console.log(error)
    })
  }, []);

  const popups = [
    {
      key: 2,
      title: "Новое место",
      name: "new-card",
      isOpen: isAddPlacePopupOpen,
      onClose: closeAllPopups,
      buttonText: "Сохранить",
      children: 
        <>
          <input id="title" type="text" placeholder="Название" name="title" className="popup__input" minLength="2" maxLength="30" required/>
          <span id="title-error" className="popup__error"></span>
          <input id="link" type="url" placeholder="Ссылка на картинку" name="link" className="popup__input" required/> 
          <span id="link-error" className="popup__error"></span>
        </>
    },
  ]

function handleUpdateUser(value){
  api.updateUserInfo(value).then((data) => {
    setCurrentUser(data);
  })
  .catch((error) => {
    console.log(error)
  })
  closeAllPopups();
}

function handleUpdateAvatar(value){
  console.log(value)
  api.updateAvatar(value).then((data) => {
    setCurrentUser(data);
  })
  .catch((error) => {
    console.log(error)
  })
  closeAllPopups();
}

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
  setSelectedCard({});  
}

function handleCardClick(card){
  setSelectedCard(card);
}

function onClose(){
  setSelectedCard({}); 
}

  return (
    <>
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={ handleEditProfileClick } onAddPlace={ handleAddPlaceClick }  onEditAvatar={ handleEditAvatarClick } onCardClick={ handleCardClick } />
          {popups.map((item) =>(<PopupWithForm {...item}> { item.children} </PopupWithForm>))}
          <EditProfilePopup isOpen={ isEditProfilePopupOpen } onClose={ closeAllPopups } onUpdateUser={ handleUpdateUser }/> 
          <EditAvatarPopup isOpen={ isEditAvatarPopupOpen } onClose={ closeAllPopups } onUpdateAvatar= { handleUpdateAvatar } /> 
          <ImagePopup card={ selectedCard } onClose={ onClose } />
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
    </CurrentUserContext.Provider>
  </>  
  );
}


export default App;
