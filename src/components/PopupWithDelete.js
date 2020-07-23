import { Popup } from './Popup.js';

export class PopupWithDelete extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form_delete');
    }

    setHandleSubmit(eve) {
        this._handleSubmit = eve;
    }

    setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
            this.close();
        })
        super.setEventListeners();
    }
}