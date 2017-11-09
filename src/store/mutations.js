/**
 * 突变时处理数据
 */

 import * as types from './mutation-types'

 export default{
     //在搜索列表中，订阅某公众号
     [types.SUBSCRIBE_MP](state,mp){
         state.subscribeList.push(mp);
         for(let item of state.searchList){
             if(item.weixinhao==mp.weixinhao){
                 var index=state.searchList.indexOf(item);
                 state.searchList[index].isSubscribed=true;
                 break;
             }
         }
         window.localStorage.setItem("subscribeList",JSON.stringify(state.subscribeList));
     },
     //在Sidebar中，取消某公众号订阅
     [types.UNSUBSCRIBE_MP](state,weixinhao){
         for(let item of state.searchList){
             var index=state.searchList.indexOf(item);
             state.searchList[index].isSubscribed=false;
             break;
         }
         for(let item of state.subscribeList){
             if(item.weixinhao==weixinhao){
                 var index=state.subscribeList.indexOf(item);
                 console.log('unscribe'+index);
                 break;
             }
         }
         state.subscribeList.splice(index,1);
         window.localStorage.setItem("subscribeList",JSON.stringify(state.subscribeList));
     },

      // 清空订阅列表
    [types.CLEAR_SUBSCRIPTION] (state, info) {
        console.log('clear subscribe result:' + info);
        state.subscribeList=[];
        window.localStorage.removeItem("subscribeList")
    },

     //搜索列表更新
     [types.ADD_SEARCHRESULT_LIST](state,mps){
state.searchList=state.searchList.concat(mps);
     },
    


    //在搜索列表中，取消公众号订阅
     [types.UNSUBSCRIBE_SEARCHRESULT](state,weixinhao){
         for(let item of state.searchList){
             if(item.weixinhao=weixinhao){
                 var index=state.searchList.indexOf(item);
                 state.searchList[index].isSubscribed=false;
                 break;
             }
         }
         for(let item of state.subscribeList){
             if(item.weixinhao==weixinhao){
                 var index=state.subscribeList.indexOf(item);
                 console.log('unscribe:'+index);
                 break;
             }
         }
         state.subscribeList.splice(index,1);
     },

     //清空搜索列表
     [types.CLEAR_SEARCHRESULT](state,info){
         console.log('clear search result '+info);
         state.searchList=[];
         
     },

     //从localStorage中初始化订阅列表
     [types.INIT_FROM_LS](state,info){
         console.log(info+window.localStorage.getItem("subscribeList"));
         if(window.localStorage.getItem("subscribeList")){
             state.subscribeList=JSON.parse(window.localStorage.getItem("subscribeList"));

         }else{
             state.subscribeList=[];
         }
     }
 }