<template>
  <transition name="slide">
    <musiclist :bgImage="bgImage" :title="title" :songs="songs"></musiclist>    
  </transition>
</template>

<script type="text/ecmascript-6">
    
    import musiclist from '../music-list/music-list'
    import {mapGetters} from 'vuex'
    import {getSongList} from '../../api/recommend'
    import {ERR_OK} from '../../api/config'
    
    export default {
      data(){
        return{
          songs:[]
        }
      },
      

      
      computed:{
        title(){
          return this.recommend.songListAuthor
        },
        bgImage(){
          return this.recommend.picUrl
        },
        ...mapGetters([
          'recommend'
        ])
      },
      created(){
        this._getSongList()
      },
      methods:{
        _getSongList(){
          if(!this.recommend.id){
            this.$router.push('/recommend')
            return           
          }
          getSongList(this.recommend.id).then((res)=>{
            if(res.code===ERR_OK){
              
            }
          })
        }
      },
      components:{
        musiclist
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