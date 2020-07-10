export class Card {
    constructor(cardSelector, { initialPlaces, handleCardClick }) {
        this._name = initialPlaces.name;
        this._link = initialPlaces.link;
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement
    }

    _likeCard() {
        this._cardElement.querySelector('.element__heart')
            .classList.toggle('element__heart_like');
    }

    _deleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _allEventListener() {

        this._cardElement.querySelector('.element__heart').addEventListener('click', () => {
            this._likeCard();
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
        this._cardElement.querySelector('.element__image').src = this._link;
        this._cardElement.querySelector('.element__image').alt = this._name;
        this._cardElement.querySelector('.element__place').textContent = this._name;
        return this._cardElement;
    }
}