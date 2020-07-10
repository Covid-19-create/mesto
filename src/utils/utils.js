export const initialPlaces = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  export const objValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__input-save',
    inactiveButtonClass: 'popup__input-save_disabled',
    inputErrorClass: 'popup__field_error',
    errorClass: 'popup__error-message_active',
  };

  export const editButton = document.querySelector('.profile__edit-Button')
  export const addButton = document.querySelector('.profile__add-Button')
  export const windowPopup = document.querySelector('.popup_window')
  export const popupProfile = document.querySelector('.popup_profile')//popup профиля
  export const popupPlace = document.querySelector('.popup_place')// popup места
  export const formPlace = document.querySelector('.popup__form_place')
  export const places = document.querySelector('.elements') // общая карточка для мини карточек
  export const inputList = Array.from(popupPlace.querySelectorAll('.popup__field'));
  export const windowImage = document.querySelector('.popup__window-image') // окно фотографии 
  export const windowText = document.querySelector('.popup__text')  //окно текста 
  export const popupSubmit = popupPlace.querySelector('.popup__input-save')
