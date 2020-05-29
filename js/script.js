const initialPlaces = [
    {
      name: 'Фредди Крюгер',
      link: 'https://24smi.org/public/media/person/2017/10/26/edKm5w4h8qGy_freddi-kriuger.jpg'
    },
    {
      name: 'Майкл Майерс',
      link: 'https://i.ytimg.com/vi/4d-pvmgpYxg/maxresdefault.jpg'
    },
    {
      name: 'Пеннивайз',
      link: 'https://cdn.fishki.net/upload/post/2019/09/20/3091494/tn/bill-skarsgard-scares-bill-hader-with-eyes-pennywise-it-7-5d8389d077a33-700.jpg'
    },
    {
      name: 'Пирамидоголовый',
      link: 'https://sun9-28.userapi.com/c849328/v849328093/9a669/IuvTUs9IXM8.jpg'
    },
    {
      name: 'Пила',
      link: 'https://okno.world/wp-content/uploads/2018/10/1.Kramer-min.jpg'
    },
    {
      name: 'Крик',
      link: 'https://img07.rl0.ru/afisha/e1425x712p521x232f2400x1200q65i/s4.afisha.ru/mediastorage/06/fb/ced8d534e94f4e008157070dfb06.jpg'
    }
  ];

const body = document.querySelector('.root')
const editButton = body.querySelector('.profile__edit-Button')
const popupClose = body.querySelector('.popup__close')
const popupSave = body.querySelector('.popup__input-save')
const popupName = body.querySelector('.popup__field_name')
const popupJob = body.querySelector('.popup__field_job')
const fullname = body.querySelector('.profile__full-name')
const jobs = body.querySelector('.profile__jobs')
const popup = body.querySelector('.popup')
const formSubmit = body.querySelector('.popup__form')
const addButton = body.querySelector('.profile__add-Button')
const popupPlace = body.querySelector('.popup-place')
const placeClose = body.querySelector('.popup__close-place')
const Places = body.querySelector('.elements') // общая карточка для мини карточек
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
    popupName.value = fullname.textContent
    popupJob.value = jobs.textContent
}

function closePopup() { //закрытие popup
    popup.classList.remove('popup_opened');
}


function saveSubmit(evt) { //отправка формы popup
    evt.preventDefault();
    fullname.textContent = popupName.value
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

function Like(event) {
  event.target.classList.toggle('element__heart_like')
}

function delCard(event) {
  event.target.closest('.element').remove()
}


function newPlaceCard(evt) { // создание карточек
  evt.preventDefault()
  const placeCard = elementTemplate.cloneNode(true)
  const placeName = placeCard.querySelector('.element__place')
  const placeImage = placeCard.querySelector('.element__image')
  placeName.textContent = inputNamePic.value
  placeImage.src = inputUrl.value
  Places.prepend(placeCard)
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
  if (evt.target.classList.contains('element__heart')) Like(event)
  if (evt.target.classList.contains('element__image')) openWindow(event)
  if (evt.target.classList.contains('element__delete')) delCard(event)
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
    Places.append(card)
}
  
  
function cardOutput() { //Вывод карточек
    initialPlaces.forEach(function(event) {
      addCardPlaces(event)
    })
}

cardOutput()

createNewCard.addEventListener('submit', newPlaceCard)
Places.addEventListener('click', callAction)
formSubmit.addEventListener('submit', saveSubmit);
editButton.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
addButton.addEventListener('click', openAddPopup);
placeClose.addEventListener('click', closeAdd);
closeWindowPopup.addEventListener('click', closeWindow)