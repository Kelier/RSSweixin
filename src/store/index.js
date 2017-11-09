/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-11-08 10:26:55 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-11-08 10:28:25
 */
 /**
 将一些订阅、搜索列表的状态放到vuex统一管理
  */

  import Vue from 'vue'
  import Vuex from 'vuex'
  import mutations from './mutations'
  import actions from './actions'

  Vue.use(Vuex);

  const state={
      searchList:[], //搜索结果列表
      subscribeList:[] //订阅列表
  };

  export default new Vuex.Store({
      state,
      mutations,
      actions
  })
