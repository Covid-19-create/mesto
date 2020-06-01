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
const popupClose = body.querySelector('.popup__close')
const popupName = body.querySelector('.popup__field_name')
const popupJob = body.querySelector('.popup__field_job')
const fullName = body.querySelector('.profile__full-name')
const jobs = body.querySelector('.profile__jobs')
const popup = body.querySelector('.popup')
const formSubmit = body.querySelector('.popup__form')
const addButton = body.querySelector('.profile__add-Button')
const popupPlace = body.querySelector('.popup-place')
const placeClose = body.querySelector('.popup__close-place')
const places = body.querySelector('.elements') // общая карточка для мини карточек
const elementTemplate = body.querySelector('#element-template').content //шаблон карты
const inputNamePic = body.querySelector('.popup__name-picture') // поле ввода имя фотографии
const inputUrl = body.querySelector('.popup__url')// поле ввода Url адреса
const createNewCard = body.querySelector('.popup__form-place')
const windowImage = body.querySelector('.window__image') // окно фотографии
const windowText = body.querySelector('.window__text')  //окно текста
const windowPopup = body.querySelector('.window') //popup окно
const closeWindowPopup = body.querySelector('.window__close') //закрытие окна

function openPopup() { //открытие popup
    popup.classList.add('popup_opened');
    popupName.value = fullName.textContent
    popupJob.value = jobs.textContent
}

function closePopup() { //закрытие popup
    popup.classList.remove('popup_opened');
}


function saveSubmit(evt) { //отправка формы popup
    evt.preventDefault();
    fullName.textContent = popupName.value
    jobs.textContent = popupJob.value
    closePopup()
}

function openAddPopup() { //открытие popup(места)
    popupPlace.classList.add('popup-place_opened');
    inputNamePic.value = ''
    inputUrl.value = ''
}

function closeAdd() { //закрытие popup-place
    popupPlace.classList.remove('popup-place_opened');
}

function useLike(event) {
  event.target.classList.toggle('element__heart_like')
}

function deleteCard(event) {
  event.target.closest('.element').remove()
}


function newPlaceCard(evt) { // создание карточек
  evt.preventDefault()
  const place = {
    name: inputNamePic.value,
    link: inputUrl.value
  }
  const PlaceCard = createPlaceCard(place)
  places.prepend(PlaceCard)
  closeAdd()
}


function showWindow() {
  windowPopup.classList.add('window_opened')
}

function closeWindow() {
  windowPopup.classList.remove('window_opened')
}


function openWindow(event) { // открытие фоток попап(окна)
  const { name, link } = event.target.dataset;
  windowImage.src = link
  windowText.textContent = name
  showWindow()
}

function callAction(evt) { //действия карточек
  if (evt.target.classList.contains('element__heart')) useLike(event)
  if (evt.target.classList.contains('element__image')) openWindow(event)
  if (evt.target.classList.contains('element__delete')) deleteCard(event)
}


function createPlaceCard({name, link}) { // 6 карточек из коробки
  const placeCard = elementTemplate.cloneNode(true)
  const placeName = placeCard.querySelector('.element__place')
  const placeImage = placeCard.querySelector('.element__image')
  placeImage.src = link
  placeName.textContent = name
  placeImage.dataset.name = name
  placeImage.dataset.link = link
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
places.addEventListener('click', callAction)
formSubmit.addEventListener('submit', saveSubmit);
editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
addButton.addEventListener('click', openAddPopup);
placeClose.addEventListener('click', closeAdd);
closeWindowPopup.addEventListener('click', closeWindow) 