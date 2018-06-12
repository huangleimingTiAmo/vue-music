<template>
  <scroll class="suggest" 
          :data="result"
          :pullup="pullup"
          @scrollToEnd="serachMore">
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconClass(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
      
    </ul>
    <div class="no-result-wrappwe" v-show="!hasMore && !result.length">
      <no-result title="没有搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll'
  import Loading from '../../base/loading/loading'
  import NoResult from '../../base/no-result/no-result' 
  import {ERR_OK} from '../../api/config'
  import {createSong} from '../../common/js/song'
  import {mapMutations, mapActions} from 'vuex'
  import Singer from '../../common/js/singer'
  import {search} from '../../api/search'  
  const TYPE_SINGER = 'singer'
  const perpage = 20
 

  export default {
    props: {
      showSinger: {
        type: Boolean,
        default: true
      },
      query: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        page:1,
        result:[],
        pullup:true,
        hasMore:true
      }
    },
    watch:{
      query(){
        this._search()
      }
    },
    methods:{
      _search(){
        this.hasMore = true
        search(this.query, this.page, this.showSinger,perpage).then((res)=>{
          if(res.code===ERR_OK){
            this.result = this._normalizeResult(res.data)
            // console.log(this.result)
            this._checkMore(res.data)
          }
        })
      },
      serachMore(){
        if(!this.hasMore){
          return
        }else{
          this.page++
          search(this.query, this.page, this.showSinger,perpage).then((res)=>{
          if(res.code===ERR_OK){
            this.result = this.result.concat(this._normalizeResult(res.data))
            this._checkMore(res.data)
          }
        })
        }
      },
      _checkMore(data){
        const song = data.song
        if(!song.list.length  || song.curnum + song.page*perpage > song.totalnum){
          this.hasMore = false
        }
      },
      _normalizeResult(data){
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          // console.log(this._normalizeSongList(data.song.list));
          ret = ret.concat(this._normalizeSongList(data.song.list))
        }
        return ret
      },
      _normalizeSongList(list){
        let ret = []
        list.forEach((musicData)=>{
          if(musicData.songid && musicData.albumid){
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      getIconClass(item){
        if(item.type===TYPE_SINGER){
          return 'icon-mine'
        }else{
          return 'icon-music'
        }
      },
      getName(item){
        if(item.type===TYPE_SINGER){
          return item.singername
        }else{
          return `${item.name}-${item.singer}` 
        }
      },
      selectItem(item){
        if(item.type===TYPE_SINGER){
          const singer = new Singer({
            id:item.singermid,
            name:item.singername
          })
          this.$router.push({
            path:`/search/${singer.id}`
          })
          this.setSinger(singer)
        }else{
          this.insertSong(item)
        }
        this.$emit('select',item)

      },
      ...mapMutations({
        setSinger:'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ])
      
    },
    components:{
      Scroll,
      Loading,
      NoResult
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrappwe
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>