const body = document.querySelector('.root')
const editButton = body.querySelector('.profile__editButton')
const popupClose = body.querySelector('.popup__close')
const popupSave = body.querySelector('.popup__inputSave')
const popupName = body.querySelector('.popup__name')
const popupJob = body.querySelector('.popup__job')
const fullname = body.querySelector('.profile__fullname')
const jobs = body.querySelector('.profile__jobs')
const popup = body.querySelector('.popup')
const formSubmit = body.querySelector('.form')

function openPopup() {
    popup.classList.add('popup_opened');
    popupName.value = fullname.textContent
    popupJob.value = jobs.textContent
}

editButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
}

popupClose.addEventListener('click', closePopup);

function saveSubmit (evt) {
    evt.preventDefault();
    fullname.textContent = popupName.value
    jobs.textContent = popupJob.value
    closePopup()
}

formSubmit.addEventListener('submit', saveSubmit)