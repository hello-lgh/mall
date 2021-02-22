<template>
  <div id="home" class="wrapper">
    <!--导航组件-->
      <nav-bar class="home-nav">
        <div slot="center">购物街</div>
      </nav-bar>
      <scroll class="content" ref="scroll"
              :probe-type="3"
              @scroll="contentScroll"
              :pull-up-load="true"
              @pullingUp="loadMore">
        <!--轮播图组件-->
         <home-swiper class="home-swiper" :banners="banners"/>
        <!--热门推荐-->
         <recommend-view :recommends="recommends"/>
         <!--特色展示-->
         <feature-view/>
         <!--tab切换效果-->
         <tab-control class="tab-control"
                      :titles="['流行','新款','精选']"
                      @tabClick="tabClick"></tab-control>
         <!--商品展示-->
         <goods-list :goods="showGoods"/>
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView.vue'



  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'


  import {getHomeMultidata,getHomeGoods} from '../../network/home'


  export default {
    name:"Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page:0 ,list:[]},
          'new': {page:0 ,list:[]},
          'sell': {page:0 ,list:[]}
        },
        currentType: 'pop',
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //1、请求多个数据
      this.getHomeMultidata()
      //2、请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
      
      //3、监听item中图片加载完成
      this.$bus.$on('itemImageLoad',() => {
        this.$refs.scroll.refresh()
      })
    },
    methods:{
      //事件监听相关的方法
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000
      },
      //加载更多方法
      loadMore(){
        this.getHomeGoods(this.currentType)

        this.$refs.scroll.scroll.refresh()
      },
      //网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
           this.banners = res.data.banner.list;
           this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page =this.goods[type].page +1;
        getHomeGoods(type,page).then( res => {
          //console.log(res)
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1

          //this.$refs.scroll.fininshPullUp()
        })
      }
    }
  }
</script>

<style scoped>
#home{padding-top:44px;height: 100vh;position: relative;}
.home-swiper{overflow: hidden;}
.home-nav{background-color: var(--color-tint);color: #FFF;position: fixed;left: 0;top: 0;right: 0; z-index: 10;width: 100%;height: 44px;}
.tab-control{position: sticky;top: 44px;z-index: 10;background: #FFFFFF;}
.wrapper{height:calc(100% - 93px);}
.content{hoverflow: hidden;position: absolute;top: 44px;bottom: 49px;left: 0;right: 0;}
/*.content{height:calc(100% - 93px);overflow:hidden;margin-top:44px} */

</style>
