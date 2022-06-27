const PopupWithForm = ({title, name, buttonText, children, isOpen, onClose, onSubmit }) => {
  return (
    <div className={`popup ${isOpen && 'popup_opened'}` } id={`popup-${name}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={ onSubmit } noValidate>
          { children }        
          <button className="popup__button " type="submit" aria-label="Save" >{ buttonText }</button>
          <button onClick={ onClose } className="popup__close-button" type="button"></button>
        </form>
      </div>
    </div>
  )
}
export default PopupWithForm