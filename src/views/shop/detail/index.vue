<template>
    <div class="detail">
        <h2 class="title">商品详情 </h2>
        <div class="content">
             <img src="../../../assets/images/list_300X300.png" alt="">
             <div class="name">{{shopDetail.name}}</div>
             <div class="price">${{shopDetail.price}}</div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .detail {
        height: 500px;
        padding: 30px;
        .content {
            width: 450px;
            height: 450px;
            border: 1px solid #999;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }

    }
</style>
<script>
import index from './index.js'
export default {
    ...index
}
</script>