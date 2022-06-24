import { useEffect, useState, useContext } from 'react';
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]); 
  
  const profile = {
    key: 1,
    title: "Редактирование профиля",
    name: "edit-profile",
    isOpen: isOpen,
    onClose: onClose,
    buttonText: "Сохранить",
    children: 
      <>
          <input onChange={ e => setName(e.target.value) } id="discover" type="text" name="discover" className="popup__input" minLength="2" maxLength="40" defaultValue={ name } required />
          <span id="discover-error" className="popup__error"></span>
          <input onChange={ e => setDescription(e.target.value) } id="job" type="text" name="job" className="popup__input" minLength="2" maxLength="200" defaultValue={ description } required />
          <span id="job-error" className="popup__error"></span>
      </>
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateUser({
      name: name,
      about: description,
    });
  } 

  return (
    <>
      <PopupWithForm {...profile} onSubmit={ handleSubmit }> { profile.children} </PopupWithForm>
    </>
  )
}

export default EditProfilePopup