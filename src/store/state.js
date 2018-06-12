import {playMode} from '../common/js/config'
import {loadSearch,loadPlay,loadLove} from '../common/js/cache'

const state = {
    singer:{},
   
    playing: false,//播放，暂停
   
    fullScreen: false,//展开，收起
    
    playlist: [],//播放列表
    
    sequenceList: [],//顺序列表，当播放模式不同时，和playlist有区别
    
    mode: playMode.sequence,//播放模式控制
    
    currentIndex: -1,//当前播放索引
    
    recommend:{},//推荐歌单数据
    
    serachHistory: loadSearch(),//搜索历史

    playHistory: loadPlay(),//播放历史

    loveHistory:loadLove()//喜爱的歌曲
}

export default state