<template>
  <div id="app">
   <div class="container">
     <nav class="navbar navbar-dark bg-inverse navbar-fixed-top">
       <router-link to="/" class="navbar-brand text-success">简记</router-link>
       <ul class="nav navbar-nav">
         <li class="nav-item">
           <router-link to="/home" class="nav-link">
           <i class="fa fa-home">Home</i>
           </router-link>
         </li>
         <li class="nav-item">
            <a href="#" class="nav-link"><i class="fa fa-flag"></i>Hot</a>

         </li>
       </ul>
        <form class="form-inline float-xs-right">
          <input class="form-control" type="text" placeholder="搜索文章">
          <router-link to="/search"><i class="fa fa-search btn btn-outline-success" @click=""></i></router-link>
          <i class="fa fa-user-o btn btn-outline-success"></i>
        </form>
     </nav>
   </div>
   <div class="container" style="margin-top:80px">
      <div class="row">
        <div class="col-xs-12 col-md-3 push-md-9 col-xl-3 push-xl-9">
          <sidebar></sidebar>
        </div>
        <div class="col-xs-12 col-md-9 pull-md-3 col-xl-9 pull-xl-3">
          <router-view></router-view>
        </div>
      </div>
   </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'

export default {
  components: {
    'sidebar':Sidebar
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
