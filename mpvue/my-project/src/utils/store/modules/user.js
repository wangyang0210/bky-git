import request from "../../services/axiosUtils";

const state = {
    gold: 0,
    isLogin: false,
    address: {},
    userinfo: {}
}

const mutations = {
    setUser(state, payload) {
        // console.log(payload,'payload')
        state.userinfo = payload;
        state.isLogin = true;
        // state.gold = useri
    },
    setLocalUser(state) {
        console.log('setlocaluser')
        let str = JSON.stringify(state.userinfo);
        localStorage.setItem('userinfo', str);
    },
    getLocalUser(state) {
        console.log('getlocal')
        let user = JSON.parse(localStorage.getItem('userinfo') || '{}');
        state.userinfo = user;
    },
    setLogin(state) {
        state.isLogin = true;
    },
    getGold(state, payload) {
        // let user = JSON.parse(localStorage.getItem('userinfo') || '{}');
        // state.userinfo = user;
    },
    setGold(state, payload) {
        state.userinfo.userInfo.gold = payload.data;
    },
    logout(state) {
        console.log("logou store")
        state.userinfo = {};
        state.isLogin = false;
    },
    setAddress(state, payload) {
        state.address = payload.data;
        console.log("address store")
    },
    setAddress(state, payload) {
        state.address = payload.data;
        // alert(payload.data)
    },
    isLogin(state) {

    },
}

const actions = {
    getUserInfo({
        commit
    }, payload) {
        return request({
                method: 'post',
                url: API.api.getUserInfo,
            })
            .then(res => {
                // console.log("res,'eeee", res)
                let data = res.data;
                if (res.status == 1) {
                    let gold = res.data.gold;
                    let address = res.data.address || {};
                    commit({
                        type: 'setGold',
                        data: gold
                    })
                    commit({
                        type: 'setAddress',
                        data: address
                    });
                    return res;
                }
                return Promise.reject();
            })
    },
    getWx({
        commit
    }, payload) {
        return request({
                method: 'post',
                url: API.wx.get_wx_auth,
                params: {
                    code: payload,
                    type: "base_info",
                    isCallBack: 1,
                    user_source: 1,
                }
            })
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            })
    },
    getWxPay({
        commit
    }, payload) {
        return request({
                method: 'post',
                url: API.wx.get_wx_auth,
                params: {
                    code: payload.code,
                    //type: "",
                    //isCallBack: 1,
                    user_source: 1,
                    is_base: 1,
                }
            })
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            })
    },
    getLogin({
        commit,
        state
    }, payload) {
        return request({
                method: 'post',
                url: API.user.loign,
                params: {
                    type: "wx",
                    openid: payload.openid,
                    userInfo: payload.userInfo,
                    deviceid: payload.uuid,
                    user_source: 1,
                }
            })
            .then(res => {
                if (res.status == 1) {
                    let userinfo = res.data;
                    let obj = {
                        uid: userinfo.uid,
                        token: userinfo.token,
                        username: userinfo.username,
                        userInfo: userinfo
                    }
                    commit('setUser', obj);
                    commit({
                        type: 'setGold',
                        data: userinfo.gold
                    })
                    commit({
                        type: 'setAddress',
                        data: userinfo.address || {}
                    });
                }
                return Promise.resolve(res);
            })
            .catch(err => {
                log(err);
                return Promise.reject(err);
            })
    },
    addressAdd({
        commit
    }, payload) {
        return request({
                method: 'post',
                url: API.user.addressAdd,
                params: payload
            })
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            })
    },
    addressUpdate({ commit }, payload) {
        return request({
                method: 'post',
                url: API.user.addressUpdate,
                params: payload
            })
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            })
    },
    addressDelete({ commit }, payload) {
        return request({
                method: 'post',
                url: API.user.addressDelete,
                params: payload
            })
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            })
    },
    getAddressList({
        commit
    }, payload) {
        return request({
                method: 'post',
                url: API.user.addressList,
            })
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            })
    },
}

export default {
    state,
    mutations,
    actions
}