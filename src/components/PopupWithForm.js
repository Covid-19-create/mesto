import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popup, { submitForm }) {
        super(popup);
        this._submitForm = submitForm;
        this._submitButton = this._popup.querySelector('.popup__input-save');
        this._buttonText = this._submitButton.textContent;
    }
    
    getInputValues() { //поля формы
        this._inputList = this._popup.querySelectorAll('.popup__field');
        this._formValue = {};
        this._inputList.forEach(item => {
            this._formValue[item.name] = item.value;
        });
        return this._formValue;
    }

    sendLoading(isLoading) {
        if (isLoading) {
           this._submitButton.classList.add('popup__button_loading');
           this._submitButton.textContent = 'Сохранение...'
        }
        else if (!isLoading) {
          this._submitButton.classList.remove('popup__button_loading');
          this._submitButton.textContent = this._buttonText;

        }
    }


    setEventListeners() { //накидываем слушатели
        this._submit = this._sendForm.bind(this);
        this._popup.addEventListener('submit', this._submit);
        super.setEventListeners();
    }

    _sendForm(evt) {// отправка формы
        evt.preventDefault();
        this._submitForm(this.getInputValues());
    }
}