<template>
  <transition name="slide">
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="header">
        <h1 class="title">添加歌曲到列表</h1>
        <div class="close" @click="closeCom">
          <i class="icon-close"></i>
        </div>
      </div>
      <div class="search-box-wrapper">
        <search-box ref="searchBox" placeholder="搜索歌曲" @query="onsearch"></search-box>
      </div>
      <div class="shortcut" v-show="!query">
        <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
        <div class="list-wrapper">
          <scroll ref="songlist" class="list-scroll" v-if="currentIndex===0" :data="playHistory"> 
            <div class="list-inner">
              <song-list :songs="playHistory" @select="selectSong"></song-list>          
            </div>
          </scroll>
          <scroll ref="searchlist" class="list-scroll" v-if="currentIndex===1" :data="serachHistory">
            <div class="list-inner">
              <search-list :searches="serachHistory" @select=""addQuery @delete="deleteSearchHistory"></search-list>
            </div>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest :query="query" :showSinger="false" @select="saveSerach"></suggest>
      </div>
      <top-tip ref="toptip">
        <div class="tip-title">
          <i class="icon-ok"></i>
          <span class="text">添加到播放列表成功</span>
        </div>
      </top-tip>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import SearchBox from '../../base/search-box/search-box'
  import {mapActions,mapGetters} from 'vuex'
  import SongList from '../../base/song-list/song-list'
  import SearchList from '../../base/search-list/search-list'
  import Scroll from '../../base/scroll/scroll'
  import Switches from '../../base/switches/switches'
  import TopTip from '../../base/top-tip/top-tip'
  import Suggest from '../suggest/suggest'
  
  
  import Song from '../../common/js/song'

  export default {
    
    data() {
      return {
        showFlag: false,
        query:'',
        currentIndex:0,
        switches:[
          {name:'最近播放'},
          {name:'搜索历史'}
        ]
      }
    },
    computed:{
      ...mapGetters([
        'playHistory',
        'serachHistory'
      ])
    },
    methods:{
      show(){
        this.showFlag = true
        setTimeout(()=>{
          if(this.currentIndex===0){
            this.$refs.songlist.refresh()
          }else{
            this.$refs.searchlist.refresh()
          }
        },20)
        
      },
      hide(){
        this.showFlag = false
      },
      closeCom(){
        this.hide()
      },
      onsearch(query){
        this.query = query
      },
      saveSerach(){  
        this.saveSearchHistory(this.query)
        this.showTopTip() 
      },
      switchItem(index){
        this.currentIndex = index
      },
      selectSong(song,index){
        if(index!==0){
          this.insertSong(new Song(song)) //转化为song的实例  
          this.showTopTip()     
        }
      },
      addQuery(query){
        this.$refs.searchBox.setQuery(query)
      },
      showTopTip(){
        this.$refs.toptip.show()
      },
      ...mapActions([
        'saveSearchHistory',
        'insertSong',
        'deleteSearchHistory'
      ])
    },
    
    components: {
      SearchBox,
      SongList,
      SearchList,
      Scroll,
      Switches,
      TopTip,
      Suggest
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme

    .search-box-wrapper
      margin: 20px
    .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>