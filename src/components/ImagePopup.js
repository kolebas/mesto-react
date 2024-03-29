const ImagePopup = ({card, onClose}) => {
    return (
      <div className={`popup popup_show-card ${card.link && 'popup_opened'}`} id="popup-show-card">
        <div className="popup__container popup__container_show-card">
          <img id="card-image" className="popup__image" src={ card.link } alt="Изображение" />
          <h2 id="card-title" className="popup__title popup__title_show-card">{ card.name }</h2>
          <button onClick={ onClose } className="popup__close-button" type="button"></button>
        </div>
      </div>  
    )
}

export default ImagePopup