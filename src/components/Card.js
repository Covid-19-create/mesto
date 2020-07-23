export class Card {

    constructor(data, userId, { cardSelector, handleCardClick, deleteCards, handleLike, handleDeleteLike }) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector;
        this._deleteCard = deleteCards;
        this._userId = userId;
        this._id = data._id;
        this._likes = data.likes;
        this._owner = data.owner;
        this._handleLike = handleLike;
        this._handleDeleteLike = handleDeleteLike;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    likeCard() {
        this._cardElement.querySelector('.element__heart')
            .classList.toggle('element__heart_like');
    }

    _showlike() {
        const like = this._cardElement.querySelector('.element__heart');
        like.classList.contains('element__heart_like') 
        ? this._handleDeleteLike() 
        : this._handleLike(); 
    }

    likeScoreCard(arr) {
        const likeScore = this._cardElement.querySelector('.element__heart-score');
        likeScore.textContent = arr.length;
    }

    delete() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _allEventListener() {

        this._cardElement.querySelector('.element__heart').addEventListener('click', () => {
            this._showlike();
        });

        this._cardElement.querySelector('.element__delete').addEventListener('click', () => {
            this._deleteCard();
        });

        this._cardElement.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    cardAssembly() {
        this._cardElement = this._getTemplate(); 
        this._allEventListener(); 
        const elementImage = this._cardElement.querySelector('.element__image') //фото карточки
        const elementPlace = this._cardElement.querySelector('.element__place') //имя карточки
        const elementDelete = this._cardElement.querySelector('.element__delete')// удаление карточки
        const elementLike = this._cardElement.querySelector('.element__heart')//лайк
        const elementLikeScore = this._cardElement.querySelector('.element__heart-score')// счетчик лайков
        elementImage.src = this._link;
        elementImage.alt = this._name;
        elementPlace.textContent = this._name;
        this._cardElement.id = this._id;
        elementLikeScore.textContent = `${this._likes.length}`;

        if (this._likes.find((like) => like._id === this._userId)) {
            elementLike.classList.add('element__heart_like');
        }
        
        if (this._owner._id === this._userId) {
            elementDelete.style.display = 'block';
        }
        
        return this._cardElement; 
    }
} 