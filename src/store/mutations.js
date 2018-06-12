import * as types from './mutations-types'
const mutations = {
    [types.SET_SINGER](state,singer){
        state.singer = singer
    },
    [types.SET_PLAYING_STATE](state, flag) {
        state.playing = flag
    },
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state, list) {
        state.playlist = list
    },
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list
    },
    [types.SET_PLAY_MODE](state, mode) {
        state.mode = mode
    },  
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index
    },
    [types.SET_RECOMMEND](state,recommend) {
        state.recommend = recommend
    },
    [types.SET_SERACH_HISTORY](state,serachHistory) {
        state.serachHistory = serachHistory
    },
    [types.SET_PLAY_HISTORY](state,playHistory) {
        state.playHistory = playHistory
    },
    [types.SET_LOVE_HISTORY](state,loveHistory) {
        state.loveHistory = loveHistory
    }
}
export default mutations