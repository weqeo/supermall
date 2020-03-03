<template>
    <div>
        <detail-nav-bar/>
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-goods-info :goods="detailInfo" @loadImgEvent="loadImgOk"></detail-goods-info>
    </div>
</template>

<script>
import DetailNavBar from "./childComps/detailNavBar"
import {getDetailData, Goods} from "network/detail"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
    export default {
        name: "Detail",
        components:{
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailGoodsInfo
        },
        //用来保存数据
        data(){
            return {
                iid: null,
                topImages:[],
                goods:{},
                detailInfo:{}
            }
        },
        created(){
            // this.$route.params
            this.iid = this.$route.params.iid
            this.getDetailData(this.iid)
        },
        methods: {
            getDetailData(iid){
                getDetailData(iid).then(res =>{
                    console.log(res);
                    
                    this.topImages = res.result.itemInfo.topImages
                    console.log(this.topImages);

                    //获取商品信息
                    this.goods = new Goods(
                        res.result.itemInfo,
                        res.result.columns,
                        res.result.shopInfo.services
                    );
                    //获取宝贝的详细信息
                    this.detailInfo = res.result.detailInfo
                })
            }
        }
    }
</script>

<style scoped>

</style>