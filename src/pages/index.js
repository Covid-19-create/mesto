import './index.css';

import { Card } from '../components/Card.js';
import { initialPlaces } from '../utils/utils.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { popupSubmit, objValidation, windowImage, windowText, editButton, addButton, windowPopup, popupProfile, popupPlace, formPlace, places, inputList } from '../utils/utils.js'

const popupName = document.querySelector('.popup__field_name')
const popupJob = document.querySelector('.popup__field_job')
const fullName = document.querySelector('.profile__full-name')
const jobs = document.querySelector('.profile__jobs')
const formSubmit = document.querySelector('.popup__form')
const inputNamePic = popupPlace.querySelector('.popup__field_picture') // поле ввода имя фотографии
const inputUrl = popupPlace.querySelector('.popup__field_url')// поле ввода Url адреса


const userFormProfile = {
  name: fullName,
  text: jobs,
}

const userInfoProfile = new UserInfo(userFormProfile);


const profileForm = new PopupWithForm(popupProfile, {
  submitForm: (item) => {
    userInfoProfile.setUserInfo(item);
    profileForm.close();
  }
});

function openProfileForm() {//открытие профиля
  const profile = userInfoProfile.getUserInfo();
  popupName.value = profile.name;
  popupJob.value = profile.text;
  profileForm.open();
  formNewProfile.hideInputError(popupProfile, popupName)
  formNewProfile.hideInputError(popupProfile, popupJob)
}

profileForm.setEventListeners();

const popupPhotoCard = new PopupWithImage(windowPopup, windowImage, windowText);

function addCards(item) {
  const card = new Card('#element-template', {
    initialPlaces: item, handleCardClick: () => {
      popupPhotoCard.open(item);
    }
  });
  const cardElement = card.cardAssembly();
  cardSheet.addItem(cardElement);
}

const cardSheet = new Section({
  items: initialPlaces, renderer: (item) => {
    addCards(item);
  }
}, places);

cardSheet.renderItems(initialPlaces);


const cardForm = new PopupWithForm(popupPlace, {
  submitForm: (item) => {
    addCards(item)
    cardForm.close()
  }
})

// слушатели на window
popupPhotoCard.setEventListeners()

const openCardForm = () => {//открытие попап place
  cardForm.open();
  inputNamePic.value = ''
  inputUrl.value = ''
  formNewPlace.toggleButtonState(inputList, popupSubmit)
  formNewPlace.hideInputError(popupPlace, inputNamePic)
  formNewPlace.hideInputError(popupPlace, inputUrl)
}

//слушатели на попап карточки
cardForm.setEventListeners();

const formNewProfile = new FormValidator(objValidation, formSubmit);
formNewProfile.enableValidation();

const formNewPlace = new FormValidator(objValidation, formPlace);
formNewPlace.enableValidation();


editButton.addEventListener('click', openProfileForm);
addButton.addEventListener('click', openCardForm)
