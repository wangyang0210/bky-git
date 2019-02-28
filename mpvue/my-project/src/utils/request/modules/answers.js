import request from "../../services/axiosUtils";
import api from '../api.js';
import store from '../index';

const state = {
    TOTAL_NUM: 3,
    TOTAL_TIME: 20,
    currentNum: 0,
    remainTime: 20,
    rightAnswerNum: 0,
    giftImg: '',
    timer: '',
    questionDetail: {},
    enterId: '',
    gameId: ''
}

const mutations = {
    // 初始化做题信息
    initData(state) {
        state.currentNum = 0;
        state.remainTime = 20;
        state.rightAnswerNum = 0;
        state.giftImg = '';
        state.timer = '';
        state.questionDetail = {};
    },
    // 做题时间倒数
    countDown(state) {
        state.remainTime = state.TOTAL_TIME;
        state.timer = setInterval(() => {
            state.remainTime--
                if (state.remainTime <= 0) {
                    clearInterval(state.timer);
                }
        }, 1000);
    },
    clearTimer(state) {
        if (state.timer) {
            clearInterval(state.timer);
        }
    },
    // 获取题目
    updateQuestion(state, payload) {
        console.log(payload)
        state.questionDetail = payload.data;
    },
    // 下一题
    nextQuestion(state, payload) {
        state.currentNum++;
    },
    // 更新enter信息
    updateEnterId(state, payload) {
        state.enterId = payload.data;
    },
    // 更新gameid信息
    updateGameId(state, payload) {
        state.gameId = payload.gameId;
    },
    updateRightAnswerNum(state, payload) {
        state.rightAnswerNum = payload.data;
    }
}

const actions = {
    // 参与答题
    joinAnswer({ commit, state }, payload) {
        //console.log(payload)
        return request({
                method: 'post',
                url: api.api.joinGame,
                params: {
                    id: payload.id,
                    user_source: 1,
                }
            })
            .then(res => {
                if (res.status == 1) {
                    commit({
                        type: 'updateGameId',
                        gameId: payload.id
                    })
                    commit({
                        type: 'updateEnterId',
                        data: res.data.enter_id
                    })
                }
                return res;
            })
    },
    // 获取题目
    getQuestion({ commit, state }, payload) {
        return request({
                method: 'post',
                url: api.api.getQuestion,
                params: {
                    enter_id: state.enterId,
                    id: state.gameId,
                    // uid: store.state.user.userinfo.uid,
                    // token: store.state.user.userinfo.token
                }
            })
            .then(res => {
                if (res.status == 1) {
                    commit({
                        type: 'updateQuestion',
                        data: res.data
                    })
                    commit({
                        type: 'nextQuestion'
                    })
                    commit({
                        type: 'clearTimer'
                    })
                    commit({
                        type: 'countDown'
                    })
                    return res;
                }
                return Promise.reject(res.data.message);
            })
    },
    // 回答题目
    answerQueston({ commit, state }, payload) {
        // console.log(payload,'loady')
        commit({
            type: 'clearTimer'
        })
        return request({
                method: 'post',
                url: api.api.answerQuestion,
                params: {
                    id: state.gameId,
                    enter_id: state.enterId,
                    qid: state.questionDetail.question.question_id,
                    answer: payload,
                    user_source: 1,
                    // uid: store.state.user.userinfo.uid,
                    // token: store.state.user.userinfo.token
                }
            })
            .then(res => {
                commit({
                    type: 'updateRightAnswerNum',
                    data: res.data.base_game_answer
                })
                return res;
            })
    }

}

export default {
    state,
    mutations,
    actions
}