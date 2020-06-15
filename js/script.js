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
const elementTemplate = body.querySelector('#element-template').content //шаблон карты
const inputNamePic = popupPlace.querySelector('.popup__field_picture') // поле ввода имя фотографии
const inputUrl = popupPlace.querySelector('.popup__field_url')// поле ввода Url адреса
const createNewCard = body.querySelector('.popup__form_place')
const windowImage = body.querySelector('.popup__window-image') // окно фотографии
const windowText = body.querySelector('.popup__text')  //окно текста
const windowPopup = body.querySelector('.popup_window') //popup окно
const profileClose = popupProfile.querySelector('.popup__close')
const placeClose = popupPlace.querySelector('.popup__close')
const windowClose = windowPopup.querySelector('.popup__close')


function openPopup(popup) { //открытие popup
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
  setEventListener(popupPlace)
  openPopup(popupPlace)
}

function newPlaceCard(evt) { // создание карточек
  evt.preventDefault()
  const place = {
    name: inputNamePic.value,
    link: inputUrl.value
  }
  const placeCard = createPlaceCard(place)
  places.prepend(placeCard)
  closePopup(popupPlace)
}

function createPlaceCard({ name, link }) { // 6 карточек из коробки
  const placeCard = elementTemplate.cloneNode(true)
  const placeName = placeCard.querySelector('.element__place')
  const placeImage = placeCard.querySelector('.element__image')
  placeImage.src = link
  placeImage.alt = name
  placeName.textContent = name
  placeImage.dataset.name = name
  placeImage.dataset.link = link
  placeCard.querySelector('.element__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__heart_like');
  });

  placeCard.querySelector('.element__delete').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });

  placeImage.addEventListener('click', function () {
    windowImage.src = link;
    windowImage.alt = name;
    windowText.textContent = name; 
    openPopup(windowPopup);
  });
  return placeCard
}

function addCardPlaces({ name, link }) { //добавление карточки .elements
  const card = createPlaceCard({ name, link })
  places.append(card)
}

function cardOutput() { //Вывод карточек
  initialPlaces.forEach(function (event) {
    addCardPlaces(event)
  })
}

cardOutput()



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

createNewCard.addEventListener('submit', newPlaceCard)
formSubmit.addEventListener('submit', saveSubmit);
editButton.addEventListener('click', showPopupProfile);
addButton.addEventListener('click', openAddPopup);
profileClose.addEventListener('click', () => closePopup(popupProfile));
placeClose.addEventListener('click', () => closePopup(popupPlace));
windowClose.addEventListener('click', () => closePopup(windowPopup));

