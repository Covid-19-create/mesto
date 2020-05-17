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
 
function openPopup() { //открытие popup
    popup.classList.add('popup_opened'); 
    popupName.value = fullname.textContent 
    popupJob.value = jobs.textContent 
} 
 
function closePopup() { //закрытие popup
    popup.classList.remove('popup_opened'); 
} 
 
function saveSubmit (evt) { //отправка формы popup
    evt.preventDefault(); 
    fullname.textContent = popupName.value 
    jobs.textContent = popupJob.value 
    closePopup() 
} 
 
formSubmit.addEventListener('submit', saveSubmit);
editButton.addEventListener('click', openPopup); 
popupClose.addEventListener('click', closePopup); 