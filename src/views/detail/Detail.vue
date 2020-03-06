<template>
    <div>
        <detail-nav-bar/>
        <detail-swiper :top-images="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-goods-info :goods="detailInfo" @loadImgEvent="loadImgOk"></detail-goods-info>
        <detail-params :param-info="paramInfo" ref="paramsRef"></detail-params>
    </div>
</template>

<script>
import DetailNavBar from "./childComps/detailNavBar"
import {getDetailData, Goods, GoodsParam,Shop} from "network/detail"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailBaseInfo from "./childComps/DetailBaseInfo"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
import {itemListenerMinxin, backTopMinxin} from "commonjs/mixin.js"
import DetailParams from "./childComps/DetailParams"
    export default {
        name: "Detail",
        components:{
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailGoodsInfo,
            DetailParams
        },
        //用来保存数据
        data(){
            return {
                iid: null,
                topImages:[],
                goods:{},
                detailInfo:{},
                paramInfo:{}
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
                    //获取商品的参数
                    this.paramInfo = new GoodsParam(
                        res.result.itemParams.info,
                        res.result.itemParams.rule
                    )
                })
            },
            //img load success will 
            loadImgOk(){
                console.log('loadImgOk!!!!!!!!');
                
            }
        }
    }
</script>

<style scoped>

</style>