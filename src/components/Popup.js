export class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._keyClose = this._keyClose.bind(this);
        this._mouseClick = this._mouseClick.bind(this);
        this._deletePopup = document.querySelector('.popup__input-save_delete');
    }

    open() { //открытие popup
        this._popup.classList.add('popup_opened');
        this._popup.addEventListener('click', this._mouseClick);
        document.addEventListener('keydown', this._keyClose);
        this._deletePopup.focus();
    }
    
    _keyClose(evt) { //закрытие попапа esc
        if (evt.key === 'Escape') {
            this.close()
        }
    }
      
    _mouseClick(evt) { // закрытие через клик                
        if (evt.target.classList.contains('popup')) {
            this.close()
        }
    }
    
    close() { //закрытие popup 
        this._popup.classList.remove('popup_opened');
        this._popup.removeEventListener('click', this._mouseClick);
        document.removeEventListener('keydown', this._keyClose)
    }
    
    setEventListeners() {
        this._closeButton = this._popup.querySelector('.popup__close');
        this._closeButton.addEventListener('click', () => this.close());
    }
}