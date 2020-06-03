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
const popupClose = body.querySelectorAll('.popup__close')
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
const inputNamePic = body.querySelector('.popup__field_picture') // поле ввода имя фотографии
const inputUrl = body.querySelector('.popup__field_url')// поле ввода Url адреса
const createNewCard = body.querySelector('.popup__form_place')
const windowImage = body.querySelector('.popup__window-image') // окно фотографии
const windowText = body.querySelector('.popup__text')  //окно текста
const windowPopup = body.querySelector('.popup_window') //popup окно


function openPopup(popup) { //открытие popup
  popup.classList.add('popup_opened');
}


function showPopupProfile() {
  popupName.value = fullName.textContent
  popupJob.value = jobs.textContent
  openPopup(popupProfile)
}


function closePopup(popup) { //закрытие popup
  if (popup.target) popup = popup.target.closest('.popup_opened')
  popup.classList.remove('popup_opened');
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
}




function newPlaceCard(evt) { // создание карточек
  evt.preventDefault()
  const place = {
    name: inputNamePic.value,
    link: inputUrl.value
  }
  const PlaceCard = createPlaceCard(place)
  places.prepend(PlaceCard)
  closePopup(popupPlace)
}





function createPlaceCard({name, link}) { // 6 карточек из коробки
  const placeCard = elementTemplate.cloneNode(true)
  const placeName = placeCard.querySelector('.element__place')
  const placeImage = placeCard.querySelector('.element__image')
  placeImage.src = link
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
    initialPlaces.forEach(function(event) {
      addCardPlaces(event)
    })
}

cardOutput()

createNewCard.addEventListener('submit', newPlaceCard)
formSubmit.addEventListener('submit', saveSubmit);
editButton.addEventListener('click', showPopupProfile);
addButton.addEventListener('click', openAddPopup);
popupClose.forEach(function (event) { 
  event.addEventListener('click', closePopup)
});
