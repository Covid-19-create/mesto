export const windowImage = document.querySelector('.popup__window-image') // окно фотографии
export const windowText = document.querySelector('.popup__text')  //окно текста
export const windowPopup = document.querySelector('.popup_window') //popup окно

export function openPopup(popup) { //открытие popup
    popup.classList.add('popup_opened');
    popup.addEventListener('click', mouseClick);
    document.addEventListener('keydown', keyClose);
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

export function closePopup(popup) { //закрытие popup 
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', mouseClick);
    document.removeEventListener('keydown', keyClose)
}