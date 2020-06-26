import {Card} from './Card.js';
import { formValidator } from './validation.js';

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
export const windowImage = body.querySelector('.popup__window-image') // окно фотографии
export const windowText = body.querySelector('.popup__text')  //окно текста
export const windowPopup = body.querySelector('.popup_window') //popup окно
const profileClose = popupProfile.querySelector('.popup__close')
const placeClose = popupPlace.querySelector('.popup__close')
const windowClose = windowPopup.querySelector('.popup__close')
const popupSubmit = popupPlace.querySelector('.popup__input-save')
const inputList = Array.from(popupPlace.querySelectorAll('.popup__field'));
const formPlace = document.querySelector('.popup__form_place')




export function openPopup(popup) { //открытие popup
  popup.classList.add('popup_opened');
  popup.addEventListener('click', mouseClick);
  document.addEventListener('keydown', keyClose);
}

function showPopupProfile() {
  popupName.value = fullName.textContent
  popupJob.value = jobs.textContent
  openPopup(popupProfile);
}

function closePopup(event) { //закрытие popup 
  event.classList.remove('popup_opened');
  event.removeEventListener('click', mouseClick);
  document.removeEventListener('keydown', keyClose)
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

function keyClose(evt) { //закрытие попапа esc
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function mouseClick(evt) { // закрытие через клик                
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
}

export const objValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__input-save',
  inactiveButtonClass: 'popup__input-save_disabled',
  inputErrorClass: 'popup__field_error',
  errorClass: 'popup__error-message_active',
};

const formNewProfile = new formValidator(objValidation, formSubmit);
formNewProfile.enableValidation();

const formNewPlace = new formValidator(objValidation, formPlace);
formNewPlace.enableValidation();

createNewCard.addEventListener('submit', createNewPlace)
formSubmit.addEventListener('submit', saveSubmit);
editButton.addEventListener('click', showPopupProfile);
addButton.addEventListener('click', openAddPopup);
profileClose.addEventListener('click', () => closePopup(popupProfile));
placeClose.addEventListener('click', () => closePopup(popupPlace));
windowClose.addEventListener('click', () => closePopup(windowPopup));

newCard()