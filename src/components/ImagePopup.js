function ImagePopup(props) {
    return (
        <div className={`popup popup_type_open-picture ${props.selectedCard ? 'popup_opened' : ''}`}>
            <div className="picture popup__content">
                <button type="button" aria-label="Закрыть фотографию" className="popup__close-btn picture__close-btn close-btn" onClick={props.onClose}/>
                <img src={props.selectedCard ? props.selectedCard.link : ''} alt="Картинка" className="picture__image"/>
                <h2 className="picture__title">{props.selectedCard? props.selectedCard.name : ''}</h2>
            </div>
      </div>
    );
}

export default ImagePopup;