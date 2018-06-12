import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from './config'
import {shuffle} from './util'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted() {
    this.handlePlaylist(this.playlist)
  },
  activated() {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist() {
      throw new Error('component must implement handlePlaylist method')
    }
  }
}

 

export const loveMixin = {
  computed:{
    ...mapGetters([
      'loveHistory'
    ])
  },
  methods:{
    hasLove(song){
      const index = this.loveHistory.findIndex((item)=>{
        return item.id===song.id
      })
      return index > -1
    },
    getIcon(song){
      if(this.hasLove(song)){
        return 'icon-favorite'
      }else{
        return 'icon-not-favorite'
      }
    },
    triggerLove(song){
      if(this.hasLove(song)){
        this.deleteLoveHistory(song)
      }else{
        this.saveLoveHistory(song)
      }
    },
    ...mapActions([
      'saveLoveHistory',
      'deleteLoveHistory'
    ])
  }
}
