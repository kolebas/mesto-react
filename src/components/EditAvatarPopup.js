import { useRef } from 'react';
import PopupWithForm from "./PopupWithForm.js";

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {

  const avatarLink = useRef();

  const profile = {
      title: "Обновить аватар",
      name: "edit-avatar",
      isOpen: isOpen,
      onClose: onClose,
      buttonText: "Сохранить",
      children: 
        <>
          <input ref={ avatarLink } id="avatar-link" type="url" placeholder="Ссылка на картинку" name="avatar-link" className="popup__input" required /> 
          <span id="avatar-link-error" className="popup__error"></span>
        </>
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarLink.current.value,
    });
  } 

  return (
    <>
      <PopupWithForm {...profile} onSubmit={ handleSubmit }> { profile.children} </PopupWithForm>
    </>
  )
}

export default EditAvatarPopup