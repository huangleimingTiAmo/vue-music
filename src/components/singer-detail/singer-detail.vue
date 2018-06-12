<template>
  <transition name="slide">
    <musiclist :songs="songs" :bg-image="bgImage" :title="title"></musiclist>    
  </transition>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'
    import {getSingerDetail} from '../../api/singer'
    import {ERR_OK} from '../../api/config'
    import {createSong} from '../../common/js/song'//创建类，，，面向对象思想
    import musiclist from '../music-list/music-list'

    
    export default {
      data(){
        return{
          songs:[]
        }
      },
      computed:{
        title(){
          return this.singer.name
        },
        bgImage(){
          return this.singer.avatar
        },
        ...mapGetters([
          'singer'
        ])
      },
      components:{
        musiclist
      },
      created(){
        // console.log(this.singer)
        this._getDetail()
      },
      methods:{
        _getDetail(){
          if(!this.singer.id){
            this.$router.push('/singer')
            return           
          }
          getSingerDetail(this.singer.id).then((res)=>{
            if(res.code===ERR_OK){
              this.songs = this._normalizeSongs(res.data.list)
              // console.log(res.data.list);
              // console.log(this.songs)
            }
          })         
        },
        _normalizeSongs(list){
          let ret = []
          list.forEach((item)=>{
            let {musicData} = item
            if(musicData.songid && musicData.albumid){
                ret.push(createSong(musicData))
            }
          })
          return ret
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/variable'
  
  .slide-enter-active, .lide-leave-active
    transition all 0.5s
  .slide-enter, .slide-leave-to
    transform translate3d(100%,0,0)
    
</style>