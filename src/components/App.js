import "../index.css";
import api from '../utils/api.js';
import Header from "./Header";
import Main from "./Main.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
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

const [cards, setCards] = useState([]);

useEffect(() => {
  api.getInitialCards().then((data) => {
    setCards(
      data.map((item) => ({
        src: item.link,
        title: item.name,
        likes: item.likes,
        _id: item._id,
        key: item._id,
        owner: item.owner,
      }))
    )
  })
  .catch((error) => {
    console.log(error)
  })
}, []);

function handleCardLike(card) {
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  api.changeLikeCard(!isLiked ? "PUT" : "DELETE", card._id).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  })
  .catch((error) => {
    console.log(error)
  })
}

function handleCardDelete(card) {
  api.deleteCard("DELETE", card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
  })
  .catch((error) => {
    console.log(error)
  })
}

function handleAddPlaceSubmit(card) {
  api.addCard("POST", card).then((newCard) => {
    setCards([newCard, ...cards]); 
  })
  .catch((error) => {
    console.log(error)
  })
  closeAllPopups();
}

function handleCardClick(card){
  setSelectedCard(card);
}

function onClose(){
  setSelectedCard({}); 
}

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main cards={ cards } handleCardLike={ handleCardLike } handleCardDelete={ handleCardDelete } onEditProfile={ handleEditProfileClick } onAddPlace={ handleAddPlaceClick }  onEditAvatar={ handleEditAvatarClick } onCardClick={ handleCardClick } />
          <EditProfilePopup isOpen={ isEditProfilePopupOpen } onClose={ closeAllPopups } onUpdateUser={ handleUpdateUser }/> 
          <EditAvatarPopup isOpen={ isEditAvatarPopupOpen } onClose={ closeAllPopups } onUpdateAvatar= { handleUpdateAvatar } />
          <AddPlacePopup isOpen={ isAddPlacePopupOpen } onClose={ closeAllPopups } onAddPlace={ handleAddPlaceSubmit }/>
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
  );
}


export default App;
