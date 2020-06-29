import {Card} from './Card.js';
import { FormValidator } from './validation.js';
import {closePopup, openPopup, windowPopup} from './utils.js'

const initialPlaces = [
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

const body = document.querySelector('.root')
const editButton = body.querySelector('.profile__edit-Button')
const popupName = body.querySelector('.popup__field_name')
const popupJob = body.querySelector('.popup__field_job')
const fullName = body.querySelector('.profile__full-name')
const jobs = body.querySelector('.profile__jobs')
const popupProfile = body.querySelector('.popup_profile')//popup профиля
const popupPlace = body.querySelector('.popup_place')// popup места
const formSubmit = body.querySelector('.popup__form')
const addButton = body.querySelector('.profile__add-Button')
const places = body.querySelector('.elements') // общая карточка для мини карточек
export const elementTemplate = body.querySelector('#element-template').content //шаблон карты
const inputNamePic = popupPlace.querySelector('.popup__field_picture') // поле ввода имя фотографии
const inputUrl = popupPlace.querySelector('.popup__field_url')// поле ввода Url адреса
const createNewCard = body.querySelector('.popup__form_place')
const profileClose = popupProfile.querySelector('.popup__close')
const placeClose = popupPlace.querySelector('.popup__close')
const windowClose = windowPopup.querySelector('.popup__close')
const popupSubmit = popupPlace.querySelector('.popup__input-save')
const inputList = Array.from(popupPlace.querySelectorAll('.popup__field'));
const formPlace = document.querySelector('.popup__form_place')

function showPopupProfile() {
  popupName.value = fullName.textContent
  popupJob.value = jobs.textContent
  openPopup(popupProfile);
  formNewProfile.hideInputError(popupProfile, popupName)
  formNewProfile.hideInputError(popupProfile, popupJob)
}

function saveSubmit(evt) { //отправка формы popup
  evt.preventDefault();
  fullName.textContent = popupName.value
  jobs.textContent = popupJob.value
  closePopup(popupProfile)
}

function openAddPopup() { //открытие popup(места)
  inputNamePic.value = ''
  inputUrl.value = ''
  openPopup(popupPlace)
  formNewPlace.toggleButtonState(inputList, popupSubmit)
  formNewPlace.hideInputError(popupPlace, inputNamePic)
  formNewPlace.hideInputError(popupPlace, inputUrl)
}

function addCardSite(places, card) {
  places.prepend(card);
}

const newCard = () => {
  initialPlaces.forEach((item) => {
    const card = new Card(item.name, item.link, '#element-template');
    const element = card.cardAssembly();
    addCardSite(places, element);
  }
  )
}

const createCard = () => {
  const card = new Card(inputNamePic.value, inputUrl.value, '#element-template');
  const element = card.cardAssembly();
  addCardSite(places, element);
}

function createNewPlace(e) {
  e.preventDefault();
  createCard();
  closePopup(popupPlace)
}

export const objValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__input-save',
  inactiveButtonClass: 'popup__input-save_disabled',
  inputErrorClass: 'popup__field_error',
  errorClass: 'popup__error-message_active',
};

const formNewProfile = new FormValidator(objValidation, formSubmit);
formNewProfile.enableValidation();

const formNewPlace = new FormValidator(objValidation, formPlace);
formNewPlace.enableValidation();

createNewCard.addEventListener('submit', createNewPlace)
formSubmit.addEventListener('submit', saveSubmit);
editButton.addEventListener('click', showPopupProfile);
addButton.addEventListener('click', openAddPopup);
profileClose.addEventListener('click', () => closePopup(popupProfile));
placeClose.addEventListener('click', () => closePopup(popupPlace));
windowClose.addEventListener('click', () => closePopup(windowPopup));

newCard()