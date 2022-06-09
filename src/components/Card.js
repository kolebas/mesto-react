const Card = ({ src, title, likeCount, onCardClick}) => {

  function handleClick() {
    onCardClick({src, title});
  }

  return (  
    <div className="card">
      <img onClick={ handleClick } className="card__image" src={ src } alt={`Изображение ${title}`}/>
      <button className="card__delete-button"></button>
      <div className="card__rectangle">
        <h2 className="card__title">{ title }</h2>
        <div className="card__like-template">
          <button className="card__like-button" type="button" aria-label="Like"></button>
          <p className="card__like-counter">{ likeCount }</p>
        </div>  
      </div>
    </div>
  )  
}



export default Card