import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popup, { submitForm }) {
        super(popup);
        this._submitForm = submitForm;
    }
    
    _getInputValues() { //поля формы
        this._inputList = this._popup.querySelectorAll('.popup__field');
        this._formValue = {};
        this._inputList.forEach(item => {
            this._formValue[item.name] = item.value;
        });
        return this._formValue;
    }

    close() {// закрытие формы
        super.close();
    }

    setEventListeners() { //накидываем слушатели
        this._submit = this._sendForm.bind(this);
        this._popup.addEventListener('submit', this._submit);
        super.setEventListeners();
    }

    _sendForm(evt) {// отправка формы
        evt.preventDefault();
        this._submitForm(this._getInputValues());
    }
}