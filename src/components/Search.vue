<template>
  <div class="card">
      <div class="card-header" align="center">
          <form class="form-inline" @submit.prevent>
              <input type="text" class="form-control form-control-lg wide" placeholder="搜索公众号或文章" @keyup.enter="searchMp(1)" v-model="searchInput">
              <button type="button" class="btn btn-outline-success btn-lg" :disabled="searchInput==''" @click="searchMp(1)"><i class="fa fa-search"></i></button>
          </form>
      </div>
      <div class="card-block" v-if="!isSearching&&!searchResultJson">
        <h5 align="center" class="text-muted">输入关键字，搜索公众号</h5>
      </div>
      <div class="card-block" v-if="searchResultJson">
          <h6 align="center" class="text-muted">"{{searchKey}}"搜索到{{searchResultJson.totalItems}}条结果，共{{searchResultJson.totalPages}}页</h6>
      </div>
      <div class="card-block">
          <div class="media" v-for="(mp,index) in searchList">
              <div class="media-left imgbox">
                  <a href="#" class="nav-link">
                      <img :src="mp.image" alt="" class="media-object rounded" style="margin-top:5px">

                  </a>
              </div>
              <div class="media-body">
                  <a :href="mp.encGzhUrl" target="_blank" class=""><h5 v-html="mp.name"></h5></a>
                    <p class="text-muted" style="margin-bottom:0px">
                        <a href="javascript:" @click="subscribe(index)" >
                            <i class="fa fa-lg float-xs-right" :class="{'fa-star text-danger':mp.isSubscribed,'fa-star-o text-muted':!mp.isSubscribed,}"></i>  
                        </a>
                        <small title="粉丝" class="s1"><i class="fa fa-file-text-o"></i>{{mp.rank.fans}}</small>
                        <small title="月平均发表文章" class="s1"><i class="fa fa-title-text-o">{{mp.rank.pnum}}</i></small>
                        <small title="平均阅读次数" class="s2"><i class="fa fa-eye"></i>{{mp.rank.rnum}}</small>
                        <small title="最近更新" class="s2"><i class="fa fa-clock-o"></i>{{mp.date}}</small>
                    </p>
                    <p class="text-muted" style="margin-bottom:30px;"><small class="text-muted s1">
                        <a :href="mp.url" target="_blank" class="nav-link">{{mp.title}}</a>
                        <span v-html="mp.content"></span></small>
                    </p>
                    
              </div>
          </div>
      </div>
        <div class="card-block" v-if="isSearching">
            <h5 align="center"><i class="fa fa-spinner fa-spin fa-lg fa-fw"></i>正在搜索公众号</h5>
        </div>
        <div class="card card-block text-xs-right" v-if="hasNextPage&&searchResultJson&&!isSearching">
            <h5 class="btn btn-outline-success btn-block" @click="searchMp(page)">下一页{{page}}
                <i class="fa fa-angle-double-right"></i>
            </h5>

        </div>
        <div class="cad card-block text-xs-right" v-if="!hasNextPage&&searchResultJson">
            <h5 class="btn btn-outline-success btn-block">最后一页了<i class="fa fa-exclamation-triangle"></i></h5>
        </div>
      </div>
  </div>
</template>

<style lang="scss">
    .form-inline .wide{
        width: 80%;
    }
    .imgbox{
        width: 100px;
        height: 140px;
        overflow: hidden;
    }
    .imgbox img{
        max-width: 100px;

    }
    .s1{
        margin-right: 20px;
    }
    .s2{
        margin-left: 20px;
    }
    .media-body{
        p,h1,h2,h3,h4,h5,h6,a{
            text-align: left;
            
        }
        i{
            margin-right: 5px;
        }
        
    }
</style>

<script>
export default {
  name:'searchResult',
  data () {
      return {
          searchKey:'',
          searchInput:'',//输入框的值
          searchResultJson:'',
          isSearching:false,
          page:1,
          hasNextPage:true
      }
  },
  computed: {
      subscribeList(){
          //从store中取出数据
          return this.$store.state.subscribeList
      },
      searchList(){
          return this.$store.state.searchList
      }
  },
  methods: {
      searchMp(pg){
          this.isSearching=true
          if(pg==1){
              this.searchKey=this.searchInput;
              this.$store.dispatch('clearSearchResult','clear search result');
              this.page=1;
              this.hasNextPage=true
          }
          this.$nextTick(function(){});
          var _this=this;
        //   http://weixin.sogou.com/weixinwap?_rtype=json&ie=utf8
           this.$http.jsonp("http://weixin.sogou.com/weixinwap?_rtype=json&ie=utf8",
          {
           params:{
               page:pg,
               type:1,//公众号
               query:_this.searchKey
           },
           jsonp:'cb'
          }).then(function(res){
              this.searchResultJson=JSON.parse(res.bodyText);
              var mpXMLs=this.searchResultJson.items;//获取条目
              var i,xmlDoc,mpResult,onePageResults=[];
              for(i in mpXMLs){
                  mpResult={};
                  xmlDoc=new DOMParser().parseFromString(mpXMLs[i],'text/xml');
                  mpResult['title']=xmlDoc.getElementsByTagName("title")[1].childNodes[0].nodeValue;
                  mpResult['name']=xmlDoc.getElementsByTagName("name")[0].childNodes[0].nodeValue.replace('','<span class="text-success"></span>').replace('', '</span>');
                  try {
                      mpResult['summary']=xmlDoc.getElementsByTagName("summary")[0].childNodes[0].nodeValue.replace('', '<span class="text-success">').replace('', '</span>');

                  } catch (error) {
                      mpResult['summary']='无介绍'
                  }

                  mpResult['encGzhUrl']=xmlDoc.getElementsByTagName("encGzhUrl")[0].childNodes[0].nodeValue;//主页链接
                  try {
                      mpResult['url']=xmlDoc.getElementsByTagName("url")[2].childNodes[0].nodeValue;//最新更新文章
                      mpResult['title']=xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;


                  } catch (error) {

                      mpResult['url']='';
                      mpResult['title']='';
                      
                  }
                  try {
                      mpResult['content']=xmlDoc.getElementsByTagName("content")[0].childNodes[0].nodeValue.replace('', '<span class="text-success">').replace('', '</span>');

                  } catch (error) {
                      mpResult['content']='';
                  }

                  mpResult['date']=xmlDoc.getElementsByTagName("date")[1].childNodes[0].nodeValue;
                  mpResult['image']=xmlDoc.getElementsByTagName("image")[0].childNodes[0].nodeValue;
                  mpResult['weixinhao']=xmlDoc.getElementsByTagName("weixinhao")[0].childNodes[0].nodeValue;
                  mpResult['openid']=xmlDoc.getElementsByTagName("id")[0].childNodes[0].nodeValue;
                  var rank=xmlDoc.getElementsByTagName("rank")[0].attributes;
                  mpResult['rank']={};
                  mpResult['rank']['fans']=rank.fans.nodeValue;//粉丝数
                  mpResult['rank']['rnum']=rank.rnum.nodeValue;//月发文数
                  mpResult['rank']['pnum']=rank.pnum.nodeValue;//平均阅读
                  mpResult['isSubscribed']=false;
                  for(let item of this.subscribeList){
                      if(item.weixinhao==mpResult['weixinhao']){
                          mpResult['isSubscribed']=true;
                          break;
                      }
                  }
                  onePageResults.push(mpResult);
              }
              this.$store.dispatch('addSearchResultList',onePageResults);
              this.searchInput='';
              this.page=this.page+1;
              if(this.page>this.searchResultJson.totalPages){
                  this.hasNextPage=false;
              }
              this.isSearching=false;
          },function(response){
              console.log(response);
              this.isSearching=false;
          }); 
          
      },
      subscribe(index){
          if(this.searchList[index].isSubscribed==true){
              //如果已经订阅，再次点击取消订阅
              return this.$store.dispatch('unsubSearchResult',this.searchList[index].weixinhao);
          }
          var mp={
              mpName:this.searchList[index].title,
              image:this.searchList[index].image,
              date:this.searchList[index].date,
              weixinhao:this.searchList[index].weixinhao,
              encGzhUrl:this.searchList[index].encGzhUrl,
              openid:this.searchList[index].openid,
              subscribeDate:new Date().getTime(),
              showRemoveBtn:false
          };
          for(let item of this.subscribeList){
              if(item.mpName==mp.mpName) return false;
          }

          //通知vuex，订阅某公众号
          this.$store.dispatch('subscribeMp', mp)
      }
  }
}
</script>

