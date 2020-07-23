export class Api {
    constructor({ apiUrl, headers }) {
        this.apiUrl = apiUrl;
        this.headers = headers;
    }

    //отправка запроса
    _sendingRequest(path, parameter) {
        return fetch(`${this.apiUrl}${path}`, parameter)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            else if (!res.ok) {
                return Promise.reject(res.status);
            }
        })
    }

    //информация о пользователе с сервера
    getUserInfo() {
        return this._sendingRequest(`/users/me`, {
            headers: this.headers
        })
    }

    addCard(card) { //отправка данных на сервер
        return this._sendingRequest(`/cards`, {
            method: 'POST',
            body: JSON.stringify({
                name: card.name,
                link: card.link
            }),
            headers: this.headers
        })
    }

    //обновления аватара
    sendUserAvatar(avatar) {
        return this._sendingRequest(`/users/me/avatar`, {
            method: 'PATCH',
            body: JSON.stringify({ avatar: avatar.avatar}),
            headers: this.headers
        })
    }

    //запроса карточек с сервера
    getCards() {
        return this._sendingRequest(`/cards`, {
            method: 'GET',
            headers: this.headers
        })
    }

    //новая информация пользователя
    sendUserInfo(newUserInfo) {
        return this._sendingRequest(`/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: newUserInfo.profile,
                about: newUserInfo.job
            })
        })
    }

    //добавления лайка у карточки
    addLike(id) {
        return this._sendingRequest(`/cards/likes/${id}`, {
            method: 'PUT',
            headers: this.headers
        })
    }

    //удаления лайка
    deleteLike(id) {
        return this._sendingRequest(`/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this.headers
        })
    }

    //удаления карточки
    deleteCard(id) {
        return this._sendingRequest(`/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers
        })
    }
}