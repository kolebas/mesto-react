import { useEffect, useState } from 'react';
import api from '../utils/api.js';
import Card from './Card.js';

const Main = ({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) => {

  const [cards, setCards] = useState([]);
  const [profile, setProfile] = useState({
    userName: '',
    userDescription: '',
    userAvatar: '' 
 });

  useEffect(() => {
    api.getInitialCards().then((data) => {
      setCards(
        data.map((item) => ({
          src: item.link,
          title: item.name,
          likeCount: item.likes.length,
          key: item._id
        }))
      )
    })
    .catch((error) => {
      console.log(error)
    })
  }, []);

  useEffect(() => {
    api.setProfile().then((data) => {
      setProfile({
        userName: data.name,
        userDescription: data.about,
        userAvatar: data.avatar
      }
      )
    })
    .catch((error) => {
      console.log(error)
    })
  }, []);
  
  return (
    <main>
      <section className="profile page__profile">
        <div className="discover profile__info">
          <button onClick={ onEditAvatar } className="discover__avatar-edit">
            <img className="discover__avatar" src={ profile.userAvatar } alt="Аватар"/>
          </button>            
          <h1 className="discover__title">{ profile.userName }</h1>
          <button onClick={ onEditProfile } className="discover__edit-button" type="button" aria-label="OpenProfile" />
          <p className="discover__subtitle">{ profile.userDescription }</p>            
        </div>
        <button onClick={ onAddPlace } className="profile__add-button" type="button" aria-label="AddCard"></button>
      </section>  
      <section className="page__cards cards">
        {cards.map((card) => (<Card {...card} onCardClick={ onCardClick }/>))}
      </section>
    </main> 
  )
}

export default Main