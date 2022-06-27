import { useRef, useState } from 'react';
import PopupWithForm from "./PopupWithForm.js";

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {

  const [name, setName] = useState('');
  const link = useRef();

  
  const profile = {
    title: "Новое место",
    name: "new-card",
    isOpen: isOpen,
    onClose: onClose,
    buttonText: "Сохранить",
    children: 
      <>
        <input  onChange={ e => setName(e.target.value) } id="title" type="text" placeholder="Название" name="title" className="popup__input" minLength="2" maxLength="30" required/>
        <span id="title-error" className="popup__error"></span>
        <input ref={ link } id="link" type="url" placeholder="Ссылка на картинку" name="link" className="popup__input" required/> 
        <span id="link-error" className="popup__error"></span>
      </>
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    onAddPlace({
      name: name,
      link: link.current.value,
    });
  } 

  return (
    <>
      <PopupWithForm {...profile} onSubmit={ handleSubmit }> { profile.children} </PopupWithForm>
    </>
  )
}

export default AddPlacePopup