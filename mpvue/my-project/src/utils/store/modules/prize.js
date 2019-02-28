import request from '../../services/axiosUtils';
import api from '../api';

const state = {
  prizeList: [],
  myList: []
  // myPrize: {}
}

const mutations = {
  getPrizeInfo(state, payload) {
    state.prizeList = payload.data || [];
  }
}

const actions = {
  getPrizeInfo({ commit }, payload) {
    console.log(payload);
    
    return request({
      method: 'post',
      url: api.api.getPrizeList,
      params: {
        open_time: payload.open_time,
      }
    })
    .then(res=>{
      if(res.status == 1) {
        commit({
          type: 'getPrizeInfo',
          data: res.data
        })
        return Promise.resolve(res.data || []);
      }
      return Promise.resolve([])
    })
  }
}

export default {
  state,
  mutations,
  actions
}