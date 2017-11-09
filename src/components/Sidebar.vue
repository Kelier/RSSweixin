<template>
  <div class="card">
      <div class="card-header" align="center">
        <img src="http://avatar.csdn.net/1/E/E/1_kevin_qq.jpg" class="avatar img-circle img-responsive" alt=""/>
      <p><strong>非梦</strong></p>
      <p class="card-title">订阅列表</p>
      </div>
     <div class="card-block">
      <p v-for="(mp,index) in subscribeList" @mouseover="showRemove(index)" @mouseout="hideRemove(index)">
        <small>
          <a :href="mp.encGzhUrl" class="nav-link" target="_blank">
           <img :src="mp.image" class="mpavatar img-circle img-responsive" /> {{ mp.mpName }}
          </a>
          <a href="javascript:" @click="unsubscribeMp(mp.weixinhao)">
            <i class="fa fa-lg float-xs-right text-danger sidebar-remove" :class="{'fa-minus-circle':mp.showRemoveBtn}"></i>
          </a>
        </small>

      </p>
    </div>

  </div>
  
</template>

<style>
  .avatar{
    height: 75px;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .mpavatar{
    height: 30px;
    margin: 0 auto;
    margin-top: 2px;
    margin-bottom: 2px;

  }

  .img-circle{
    border-radius: 50%;
  }


  .tag{
    margin: 6px;
    border-radius: 50%;
  }
</style>

<script>
export default {
  name:'Sidebar',
  data(){
    return{}
  },
  created () {
    return this.$store.dispatch("initFromLS",'init form LS');
  },
  computed: {
    subscribeList(){
      //从store中拿数据
      return this.$store.state.subscribeList
    }
  },
  methods: {
    unsubscribeMp(weixinhao){
      //删除该公众号
      return this.$store.dispatch('unsubscribeMp',weixinhao);
    },
    showRemove(index){
      return this.subscribeList[index]['showRemoveBtn']=true;

    },
    hideRemove(index){
      return this.subscribeList[index]['showRemoveBtn']=false;
    }
  }
}
</script>


