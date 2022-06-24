import { useEffect, useState, useContext } from 'react';
import api from '../utils/api.js';
import Card from './Card.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const Main = ({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) => {

  const currentUser = useContext(CurrentUserContext);
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
    });
  }
  
  function handleCardDelete(card) {
    api.deleteCard("DELETE", card._id).then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }
  
  return (
    <main>
      <section className="profile page__profile">
        <div className="discover profile__info">
          <button onClick={ onEditAvatar } className="discover__avatar-edit">
            <img className="discover__avatar" src={ currentUser.avatar } alt="Аватар"/>
          </button>            
          <h1 className="discover__title">{ currentUser.name }</h1>
          <button onClick={ onEditProfile } className="discover__edit-button" type="button" aria-label="OpenProfile" />
          <p className="discover__subtitle">{ currentUser.about }</p>            
        </div>
        <button onClick={ onAddPlace } className="profile__add-button" type="button" aria-label="AddCard"></button>
      </section>  
      <section className="page__cards cards">
        {cards.map((card) => (<Card {...card} key={card._id} card={ card } onCardClick={ onCardClick } onCardLike={ handleCardLike } onCardDelete= { handleCardDelete }/>))}
      </section>
    </main> 
  )
}

export default Main