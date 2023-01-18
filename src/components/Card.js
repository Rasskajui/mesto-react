function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
      } 

    return (
        <li className="gallery__element">
            <img src={props.card.link} alt={props.card.name} className="gallery__image" onClick={handleClick}/>
            <button type="button" aria-label="Удалить картинку" className="gallery__delete-image-btn"/>
            <div className="gallery__image-description">
                <h2 className="gallery__image-title">{props.card.name}</h2>
                <div className="gallery__like">
                    <button type="button" aria-label="Мне нравится" className="gallery__image-like-btn"/>
                    <p className="gallery__number-of-likes">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;