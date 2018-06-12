export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {//当前歌曲
    return state.playlist[state.currentIndex] || {}
}

export const recommend = state => state.recommend

export const serachHistory = state => state.serachHistory

export const playHistory = state => state.playHistory

export const loveHistory = state => state.loveHistory