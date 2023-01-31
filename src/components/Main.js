import {useContext, useEffect, useState} from 'react';
import Card from './Card';
import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function setData() {
            await api.getCards()
                .then((userCards) => {
                    setCards(userCards);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        setData();
    }, []);


    return (
        <main className="main">
            <section className="profile">
            <div className="profile__avatar-container">
                <img src={currentUser?.avatar} alt="Аватарка" className="profile__avatar"/>
                <button type="button" className="profile__avatar-overlay" onClick={props.onEditAvatar}></button>
            </div>
            <div className="profile__info">
                <h1 className="profile__name">{currentUser?.name}</h1>
                <button type="button" aria-label="Редактировать профиль" className="profile__edit-btn button" onClick={props.onEditProfile}></button>
                <p className="profile__about">{currentUser?.about}</p>
            </div>
            <button type="button" aria-label="Добавить фотографию" className="profile__add-btn button" onClick={props.onAddPlace}></button>
            </section>

            <section className="gallery" aria-label="Галерея фотографий">
            <ul className="gallery__list">
                {cards.map((card) => (
                            <Card 
                                card={card} 
                                key={card._id}
                                onCardClick={props.onCardClick}
                            />     
                        )
                    )
                }
            </ul>
            </section>
        </main>
    )
}

export default Main;