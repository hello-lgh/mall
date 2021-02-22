<template>
  <div class="goods-item" >
    <img :src="goodsItem.show.img" alt=""/>
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    // computed: {
    //   // showImge() {
    //   //   return this.goodsItem.img || this.goodsItem.showLarge.img ||this.goodsItem.show.img
    //   // }
    // },
    methods: {
      // itemClick() {
      //   //1、获取ID
      //   const iid = this.goodsItem.iid;
      //   //2、跳转到详情页面
      //   this.$router.push({path: '/detail',query :{iid}})
      // },
      imgLoad() {
        this.$bus.$emit('itemImageLoad') //v-lazy="showImge"
      }
    }
  }
</script>

<style scoped>
.goods-item{width: 48%; padding-bottom: 40px;position: relative;}
.goods-item img{width: 100%;border-radius: 5px;}
.goods-info{font-size: 12px;position: absolute;bottom: 5px;left: 0;right: 0;overflow: hidden;text-align: center;}
.goods-info p{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;margin-bottom: 3px;}
.goods-info .price{color: var(--color-high-text);margin-right: 20px;}
.goods-info .collect{position: relative;}
.goods-info .collect::before{content: '';position: absolute;left: -15px;top: 1px;width: 14px;height: 14px;background: url(~assets/img/home/collect.svg) 0 0/14px 14px;}
</style>
