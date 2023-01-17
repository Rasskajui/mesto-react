import avatar from '../images/profile/profile-pic.jpg';

function Main(props) {
    return (
        <main className="main">
            <section className="profile">
            <div className="profile__avatar-container">
                <img src={avatar} alt="Аватарка" className="profile__avatar"/>
                <button type="button" className="profile__avatar-overlay" onClick={props.onEditAvatar}></button>
            </div>
            <div className="profile__info">
                <h1 className="profile__name">Жак-Ив Кусто</h1>
                <button type="button" aria-label="Редактировать профиль" className="profile__edit-btn button" onClick={props.onEditProfile}></button>
                <p className="profile__about">Исследователь океана</p>
            </div>
            <button type="button" aria-label="Добавить фотографию" className="profile__add-btn button" onClick={props.onAddPlace}></button>
            </section>

            <section className="gallery" aria-label="Галерея фотографий">
            <ul className="gallery__list">
            </ul>
            </section>
        </main>
    )
}

export default Main;