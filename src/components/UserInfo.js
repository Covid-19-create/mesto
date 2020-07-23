export class UserInfo {
    constructor(user) {
        this._userName = user.name;
        this._userInfoAbout = user.text;
        this._userAvatar = user.avatar;
    }
    
    setUserInfo(data) {
        this._userName.textContent = data.name;
        this._userInfoAbout.textContent = data.about;
        this._userAvatar.src = data.avatar;
    }

    getUserInfo() {
        const userProfile = {
            name: this._userName.textContent,
            text: this._userInfoAbout.textContent,
            avatar: this._userAvatar.src
        }
        return userProfile;
    }

    setUserAvatar(data) {
        this._userAvatar.src = data.avatar;
    }
}
