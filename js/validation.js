const objValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__input-save',
    inactiveButtonClass: 'popup__input-save_disabled',
    inputErrorClass: 'popup__field_error',
    errorClass: 'popup__error-message_active',
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__field_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__error-message_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__field_error');
    errorElement.classList.remove('popup__error-message_active');
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};


function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__input-save_disabled');
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove('popup__input-save_disabled');
        buttonElement.disabled = false;
    }
}

const setEventListener = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__field'));
    const buttonElement = formElement.querySelector('.popup__input-save');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
}

const enableValidation = (objValidation) => {
    const formList = Array.from(document.querySelectorAll(objValidation.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListener(formElement);
    });
};


function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

enableValidation(objValidation);