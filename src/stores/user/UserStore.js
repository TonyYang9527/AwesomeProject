import { observable, action, toJS, set } from 'mobx';

class UserStore {
    constructor() {
    }

    @observable
    isLogin = false;

    @action
    _updateUserInfo = (userInfo) => {

    };
    register = async (reqData) => {

    };
    @action
    login = (data) => {

    };

    logout = async () => {
    };

}

const userStore = new UserStore();
export default userStore;