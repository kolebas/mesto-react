const PopupWithForm = ({title, name, children, isOpen}) => (
  <div className={`popup ${isOpen ? 'popup_opened' : ''}` } id={`popup-${name}`}>
    <div className="popup__container">
      <h2 className="popup__title">{title}</h2>
      <form className="popup__form" name={name} action="submit" noValidate>
        { children }
      </form>
    </div>
  </div>
)

export default PopupWithForm