import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';
import { objValidation } from '../utils/utils.js'
import { Api } from '../components/Api.js';
import { PopupWithDelete } from '../components/PopupWithDelete.js';

const popupName = document.querySelector('.popup__field_name')
const popupJob = document.querySelector('.popup__field_job')
const fullName = document.querySelector('.profile__full-name')
const jobs = document.querySelector('.profile__jobs')
const formSubmit = document.querySelector('.popup__form')
const profileAvatar = document.querySelector('.profile__avatar'); //аватар профиля
const popupDelete = document.querySelector('.popup_delete_card'); //попап удаления карточки
const editButton = document.querySelector('.profile__edit-Button')
const addButton = document.querySelector('.profile__add-Button')
const windowPopup = document.querySelector('.popup_window')
const popupProfile = document.querySelector('.popup_profile')//popup профиля
const popupPlace = document.querySelector('.popup_place')// popup места
const inputNamePic = popupPlace.querySelector('.popup__field_picture') // поле ввода имя фотографии
const inputUrl = popupPlace.querySelector('.popup__field_url')// поле ввода Url адреса
const formPlace = document.querySelector('.popup__form_place')
const popupAvatar = document.querySelector('.popup_avatar')
const places = document.querySelector('.elements') // общая карточка для мини карточек
const inputList = Array.from(popupPlace.querySelectorAll('.popup__field'));
const inputListAvatar = Array.from(popupAvatar.querySelectorAll('.popup__field'));
const windowImage = document.querySelector('.popup__window-image') // окно фотографии 
const windowText = document.querySelector('.popup__text')  //окно текста 
const popupSubmit = popupPlace.querySelector('.popup__input-save')
const popupSubmitAvatar = popupAvatar.querySelector('.popup__input-save')
const formAvatar = document.querySelector('.popup__form_avatar'); //форма аватара
const profileButton = document.querySelector('.profile__button')
const inputAvatarUrl = document.querySelector('.popup__field_avatar')

const userFormProfile = {
  name: fullName,
  text: jobs,
  avatar: profileAvatar
}

export const api = new Api({
  apiUrl: 'https://mesto.nomoreparties.co/v1/cohort-13',
  headers: {
    authorization: '30d41b0c-1275-44ad-9e6b-ea62c96daee5',
    'Content-Type': 'application/json'
  }
});

const userInfoProfile = new UserInfo(userFormProfile);


const profileForm = new PopupWithForm(popupProfile, {
  submitForm: () => {
    profileForm.sendLoading(true);
    const inputValues = profileForm.getInputValues();
    api.sendUserInfo(inputValues)
      .then((data) => {
        userInfoProfile.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        profileForm.sendLoading(false);
        profileForm.close();
      })
  }
})


function openProfileForm() {//открытие профиля
  const profile = userInfoProfile.getUserInfo();
  popupName.value = profile.name;
  popupJob.value = profile.text;
  profileForm.open();
  formNewProfile.hideInputError(popupProfile, popupName)
  formNewProfile.hideInputError(popupProfile, popupJob)
}

function openAvatarForm() {
  popupFormAvatar.open();
  inputAvatarUrl.value = ''
  formNewAvatar.hideInputError(popupAvatar, inputAvatarUrl)
  formNewAvatar.toggleButtonState(inputListAvatar, popupSubmitAvatar)
}

profileForm.setEventListeners();// слушатели профиля

const popupPhotoCard = new PopupWithImage(windowPopup, windowImage, windowText);

const popupWithDelete = new PopupWithDelete(popupDelete);

popupWithDelete.setEventListeners();// слушатели попап удаление карты

const popupFormAvatar = new PopupWithForm(popupAvatar, {
  submitForm: () => {
    popupFormAvatar.sendLoading(true);
    const inputValues = popupFormAvatar.getInputValues();
    api.sendUserAvatar(inputValues)
      .then((data) => {
        userInfoProfile.setUserAvatar(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupFormAvatar.sendLoading(false);
        popupFormAvatar.close();
      })
  }
})

popupFormAvatar.setEventListeners();//слушатели попапа аватара

Promise.all([api.getUserInfo(), api.getCards()])
  .then((data) => {
    userInfoProfile.setUserInfo(data[0])

    const userId = data[0]._id;

    const cardSheet = new Section(data[1], {
      renderer: (data) => {
        const card = new Card(data, userId, {
          cardSelector: '#element-template',
          handleCardClick: () => {
            popupPhotoCard.open(data);
          },
          deleteCards: () => {
            popupWithDelete.open();
            popupWithDelete.setHandleSubmit(() => {
              api.deleteCard(data._id)
                .then(() => {
                  card.delete();
                })
                .catch((err) => {
                  console.log(err)
                })
            })
          },
          handleLike: () => {
            api.addLike(data._id)
              .then((data) => {
                card.likeScoreCard(data.likes);
                card.likeCard();
              })
              .catch((err) => {
                console.log(err);
              })
          },
          handleDeleteLike: () => {
            api.deleteLike(data._id)
              .then((data) => {
                card.likeScoreCard(data.likes);
                card.likeCard();
              })
              .catch((err) => {
                console.log(err);
              })
          }
        });
        const cardElement = card.cardAssembly(data);
        cardSheet.addItem(cardElement);
      }
    }, places);

    cardSheet.render()

    const cardForm = new PopupWithForm(popupPlace, {
      submitForm: () => {
        cardForm.sendLoading(true);
        const inputValues = cardForm.getInputValues();
        api.addCard(inputValues)
          .then((data) => {
            const card = new Card(data, userId, {
              cardSelector: '#element-template',
              handleCardClick: () => {
                popupPhotoCard.open(data);
              },
              deleteCards: () => {
                popupWithDelete.open();
                popupWithDelete.setHandleSubmit(() => {
                  api.deleteCard(data._id)
                    .then(() => {
                      card.delete();
                    })
                    .catch((err) => {
                      console.log(err)
                    })
                })
              },
              handleLike: () => {
                api.addLike(data._id)
                  .then((data) => {
                    card.likeScoreCard(data.likes);
                    card.likeCard();
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              },
              handleDeleteLike: () => {
                api.deleteLike(data._id)
                  .then((data) => {
                    card.likeScoreCard(data.likes);
                    card.likeCard();
                  })
                  .catch((err) => {
                    console.log(err);
                  })
              }
            });
            const cardElement = card.cardAssembly(data);
            cardSheet.addItem(cardElement);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            cardForm.sendLoading(false);
            cardForm.close();
          })
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

    addButton.addEventListener('click', openCardForm)


  })
  .catch((err) => {
    console.log(err)
  });

const formNewProfile = new FormValidator(objValidation, formSubmit);
formNewProfile.enableValidation();

const formNewPlace = new FormValidator(objValidation, formPlace);
formNewPlace.enableValidation();

const formNewAvatar = new FormValidator(objValidation, formAvatar);
formNewAvatar.enableValidation();

profileButton.addEventListener('click', openAvatarForm)
editButton.addEventListener('click', openProfileForm);

