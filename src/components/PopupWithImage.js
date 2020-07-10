import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popup, windowImage, windowText) {
        super(popup);
        this._windowImage = windowImage;
        this._windowText = windowText;
    }

    open(data) {
        this._windowImage.src = data.link;
        this._windowImage.alt = data.name;
        this._windowText.textContent = data.name;
        super.open();
    }
}