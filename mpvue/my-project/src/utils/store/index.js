import Vue from 'vue'
import Vuex from 'vuex'


import games from './modules/games'
import answers from './modules/answers'
import user from './modules/user'
import prize from './modules/prize'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        games,
        answers,
        user,
        prize
    }
})