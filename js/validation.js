export class formValidator {
    constructor(objValidation, form) {
        this._form = form;
        this._inputSelector = objValidation.inputSelector;
        this._submitButtonSelector = objValidation.submitButtonSelector;
        this._inactiveButtonClass = objValidation.inactiveButtonClass;
        this._inputErrorClass = objValidation.inputErrorClass;
        this._errorClass = objValidation.errorClass;
    }

    _showInputError(form, inputElement, errorMessage) {
        const errorElement = form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideInputError(form, inputElement) {
        const errorElement = form.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity(form, inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(form, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(form, inputElement);
        }
    };

    toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    _setEventListener() {
        const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        const buttonElement = this._form.querySelector(this._submitButtonSelector);
        this.toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(this._form, inputElement);
                this.toggleButtonState(inputList, buttonElement);
            });
        });
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    enableValidation() {
        this._setEventListener(this._form);
    };
}