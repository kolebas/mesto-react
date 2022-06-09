const ImagePopup = (props) => {
  return (
    <div className={`popup popup_show-card ${props.card.src ? 'popup_opened' : ''}`} id="popup-show-card">
      <div className="popup__container popup__container_show-card">
        <img id="card-image" className="popup__image" src={ props.card.src } alt="Изображение" />
        <h2 id="card-title" className="popup__title popup__title_show-card">{ props.card.title }</h2>
        <button className="popup__close-button" type="button"></button>
      </div>
    </div>  
  )
}

export default ImagePopup