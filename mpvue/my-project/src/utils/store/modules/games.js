import request from "../../services/axiosUtils";
import api from "../api";
import store from '../index'

const state = {
    allGames: [],
    date: '',
    gameDetail: {
        gift_info: {
            use_gold: 0,
        }
    }
}

const mutations = {
    getGames(state, payload) {
        state.allGames = payload.data;
    },
    setCurrentDate(state, payload) {
        state.date = payload.date;
    },
    getGameDetail(state, payload) {
        state.gameDetail = payload.data;
    }
}

const getters = {
    getAllDates: state => {
        return _.keys(state.allGames);
    }
}

const actions = {

    getAllGames({ commit }) {
        return request({
                method: 'post',
                url: api.api.getAllGames,
                user_source: 1,
            })
            .then(res => {
                if (res.status == 1) {
                    commit({
                        type: 'getGames',
                        data: res.data
                    })
                    return Promise.resolve(res);
                }
                return Promise.reject(res.message);
            })
    },
    getGameById({ commit }, payload) {
        return request({
                method: 'post',
                url: api.api.getOneGame,
                params: {
                    id: payload.id

                }
            })
            .then(res => {
                if (res.status == 1) {
                    commit({
                        type: 'getGameDetail',
                        data: res.data
                    })
                    return res
                }
                return Promise.reject(res.message);
            })
    },
    getDrawPrize({ commit }, payload) {
        return request({
                method: 'post',
                url: api.api.getPrizeDraw,
                params: {
                    id: payload.id,
                    current_page: payload.current_page,
                    user_source: 1
                }
            })
            .then(res => {
                if (res.status == 1) {
                    // commit({
                    //     type: 'getGames',
                    //     data: res.data
                    // })
                    return Promise.resolve(res);
                }
                return Promise.reject(res.message);
            })
    },

    contactUs({ commit }, payload) {
        return request({
                method: 'post',
                url: api.api.contactUs,
                params: {
                    userName: payload.data.userName,
                    mobile: payload.data.mobile,
                    remark: payload.data.remark
                }
            })
            .then(res => {
                if (res.status == 1) {
                    // commit({
                    //     type: 'getGames',
                    //     data: res.data
                    // })
                    return Promise.resolve(res);
                }
                return Promise.reject(res.message);
            })
    },

    drawPrize({ commit }, payload) {
        // console.log(payload)
        return request({
                method: 'post',
                url: api.api.drawPrize,
                params: {
                    username: payload.data.userName,
                    mobile: payload.data.mobile,
                    remark: payload.data.remark,
                    gift_name: payload.data.prizeName,
                    gift_url: payload.data.goodsLink,
                    gift_num: payload.data.prizeNumber,
                    img_url: payload.img,
                    // img_url: payload.imgbase
                }
            })
            .then(res => {
                if (res.status == 1) {
                    // commit({
                    //     type: 'getGames',
                    //     data: res.data
                    // })
                    return Promise.resolve(res);
                }
                return Promise.reject(res.message);
            })
    },

    getAttendList({ commit }) {
        return request({
                method: 'post',
                url: api.api.getAttendList,
            })
            .then(res => {
                if (res.status == 1) {
                    // commit({
                    //     type: 'getGames',
                    //     data: res.data
                    // })
                    return Promise.resolve(res);
                }
                return Promise.reject(res.message);
            })
    },

    getPrizeUser({ commit }) {
        return request({
                method: 'post',
                url: api.api.getPrizeUser,
            })
            .then(res => {
                if (res.status == 1) {
                    // commit({
                    //     type: 'getGames',
                    //     data: res.data
                    // })
                    return Promise.resolve(res);
                }
                return Promise.reject(res.message);
            })
    },

    getPrize({ commit, state }, payload) {
        console.log(payload)
        return request({
                method: 'post',
                url: api.api.getGift,
                params: {
                    id: payload.id,
                    uid: store.state.user.userinfo.uid,
                    aid: payload.aid,
                }
            })
            .then(res => {
                if (res.status == 1) {
                    return res;
                }
                return Promise.reject(res.message);
            })
    },
    getPrizeList({ commit, state }, payload) {
        return request({
                method: 'post',
                url: api.api.prizeList,
                params: {}
            })
            .then(res => {
                if (res.status == 1) {
                    return res;
                }
                return Promise.reject(res.message);
            })
    },
    getEnterList({ commit, state }, payload) {
        return request({
                method: 'post',
                url: api.api.giftDetail,
                params: {}
            })
            .then(res => {
                if (res.status == 1) {
                    return res;
                }
                return Promise.reject(res.message);
            })
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}