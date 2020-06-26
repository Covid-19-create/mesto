import {windowImage, windowText, openPopup, windowPopup} from './script.js'

export class Card {
    constructor(name, link, template) {
        this._name = name;
        this._link = link;
        this._template = template
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._template)
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
    }

    _popup() {
        windowImage.src = this._link;
        windowText.textContent = this._name;
        openPopup(windowPopup);
    }


    _allEventListener() {

        this._cardElement.querySelector('.element__heart').addEventListener('click', () => {
            this._likeCard();
        });

        this._cardElement.querySelector('.element__delete').addEventListener('click', () => {
            this._deleteCard();
        });

        this._cardElement.querySelector('.element__image').addEventListener('click', () => {
            this._popup();
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