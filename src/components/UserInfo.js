export class UserInfo {
    constructor(user) {
        this._userName = user.name;
        this._userInfoAbout = user.text;
    }
    
    setUserInfo(dataUser) {
        this._userName.textContent = dataUser.profile;
        this._userInfoAbout.textContent = dataUser.job;
    }

    getUserInfo() {
        const userProfile = {
            name: this._userName.textContent,
            text: this._userInfoAbout.textContent
        }
        return userProfile;
    }
}