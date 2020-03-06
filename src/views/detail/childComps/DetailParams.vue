<template>
    <div id="detail-params" v-if="Object.keys(paramInfo).length != 0">
        <table class="params-rule">
            <tbody>
                <template v-for="(item, index) in paramInfo.sizes[0]">
                    <tr :key="index" v-if="item[1] != '-'">
                        <th>{{item[0]}}</th>
                        <td v-for="(td_item,td_index) in item.length - 1" :key="td_index">{{item[td_item]}}</td>
                    </tr>
                </template>
            </tbody>
        </table>
        <table class="params-set">
            <tbody>
                <tr v-for="(item, index) in paramInfo.infos" :key="index">
                    <th>{{item.key}}</th>
                    <td>{{item.value}}</td>
                </tr>
            </tbody>
        </table>
        <div class="info_img" v-if="paramInfo.image != ''">
            <img :src="paramInfo.image" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailParams",
        props: {
            paramInfo: {
                type: Object,
                default(){
                    return{};
                }
            }
        }
    }
</script>

<style scoped>
#detail-params {
    font-size: 0.65rem;
    padding: 0.42rem 0.34rem;
}
.params-rule,.params-set {
    border-bottom: 0.3rem solid rgba(128, 128, 128, 0.5);
    /* 可以合并邻近的边框，且可以让tr显示出边框 */
    border-collapse: collapse;
    margin: 0 auto;
    margin-bottom: 0.42rem;
    width: 13.568rem;
}
.params-rule tr,.params-set tr {
    border-bottom: 0.04rem solid rgba(128, 128, 128, 0.5);
}
.params-rule th {
    text-align: left;
    padding-right: 1rem;
    white-space: nowrap;
}
.params-rule td {
    padding: 0.5rem;
}
.params-set th {
    text-align: left;
    padding: 0.5rem 3.5rem 0.5rem 0rem;
    white-space: nowrap;
}
.params-set td {
    color: var(--color-high-text);
}
.info_img img {
    width: 100%;
}
</style>