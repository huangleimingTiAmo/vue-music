import * as types from './mutations-types'
import {playMode} from '../common/js/config'
import {shuffle} from '../common/js/util'
import {saveSearch, deleteSearch, clearSearch, savePlay, saveLove, deleteLove} from '../common/js/cache'

export const selectPlay = function ({commit,state},{list,index}){
    commit(types.SET_PLAYLIST,list)
    commit(types.SET_SEQUENCE_LIST,list)
    commit(types.SET_CURRENT_INDEX,index)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)
}

export const randomPlay = function({commit},{list}){

    commit(types.SET_PLAY_MODE,playMode.random)
    commit(types.SET_SEQUENCE_LIST,list)
    let randomlist = shuffle(list)
    commit(types.SET_PLAYLIST,randomlist)
    commit(types.SET_CURRENT_INDEX,0)
    
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)

}


function findIndex(list,song){
    return list.findIndex((item)=>{
        return item.id === song.id
    })
}

export const insertSong = function({commit,state},song){
    let playlist = state.playlist
    let sequenceList = state.sequenceList
    let currentIndex = state.currentIndex
    let currentSong = playlist[currentIndex]
    
    
    let introductionIndex = findIndex(playlist,song) //获取插入歌曲的索引
    currentIndex++
    playlist.splice(currentIndex,0,song)//将歌曲插入到当前播放歌曲的后面
    if(introductionIndex > -1){
        if(currentIndex>introductionIndex){//如果歌曲在当前播放歌曲的前面
            playlist.splice(introductionIndex,1)
            currentIndex--
        }else{
            playlist.splice(introductionIndex+1,1)
        }
    }


    let currentSIndex = findIndex(sequenceList,currentSong) + 1
    let introductionSIndex = findIndex(sequenceList,song)
    sequenceList.splice(currentSIndex,0,song)
    if(introductionSIndex > -1){
        if(currentSIndex > introductionSIndex){
            sequenceList.splice(introductionSIndex, 1)
        }else{
            sequenceList.splice(introductionSIndex + 1, 1)
            
        }
    }

    commit(types.SET_PLAYLIST,playlist)
    commit(types.SET_SEQUENCE_LIST,sequenceList)
    commit(types.SET_CURRENT_INDEX,currentIndex)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)
}


export const saveSearchHistory = function({commit,state},query){
    commit(types.SET_SERACH_HISTORY,saveSearch(query))
}

export const deleteSearchHistory = function({commit},query){
    commit(types.SET_SERACH_HISTORY,deleteSearch(query))
}

export const clearSearchHistory = function({commit}){
    commit(types.SET_SERACH_HISTORY,clearSearch())    
}



export const deleteSong = function({commit,state},song){
    let playlist = state.playlist
    let sequenceList = state.sequenceList
    let currentIndex = state.currentIndex
    let pIndex = findIndex(playlist,song)
    playlist.splice(pIndex,1)
    let sIndex = findIndex(sequenceList,song)
    sequenceList.splice(sIndex,1)

    if(currentIndex>pIndex || currentIndex === playlist.length){
        currentIndex--
    }

    commit(types.SET_SEQUENCE_LIST,sequenceList)
    commit(types.SET_PLAYLIST,playlist)
    commit(types.SET_CURRENT_INDEX,currentIndex)
    if(!playlist.length){
        commit(types.SET_PLAYING_STATE,false)      
    }    
}



export const clearlist = function({commit}){
    commit(types.SET_SEQUENCE_LIST,[])
    commit(types.SET_PLAYLIST,[])
    commit(types.SET_CURRENT_INDEX,-1)
    commit(types.SET_PLAYING_STATE,false)      
    
}

export const savePlayHistory = function({commit},song){
    commit(types.SET_PLAY_HISTORY,savePlay(song))   
}

export const saveLoveHistory = function({commit},song){
    commit(types.SET_LOVE_HISTORY,saveLove(song))
}

export const deleteLoveHistory = function({commit},song){
    commit(types.SET_LOVE_HISTORY,deleteLove(song))    
}