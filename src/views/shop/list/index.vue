<template>
    <div class="shop">
        <div class="banner">
            <img src="~assets/images/bg.jpg" alt="">
        </div>
        <h2 class="title">商品列表</h2>
        <div class="list_content">
            <a href="javascript:;" class="item" v-for="item in list" @click="goDetail(item)">
                <img src="../../../assets/images/list_300X300.png" alt="">
                <div class="des">
                    <div class="name">{{item.name}}</div>
                    <div class="price">￥{{item.price}}</div>
                </div>
            </a>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .shop {
        .banner{
            width: 100%;
            height: 350px;
            img {
                display: black;
                width: 100%;
                height: 100%;
            }
        }
        .list_content {
            padding: 20px 10px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .item {
                width: 30%;
                text-align: center;
                border: 1px solid #fff;
                &:hover {
                    border: 1px solid yellow;
                }
                img {
                    display: block;
                    height: 300px;
                    height: 300px;
                    margin:0 auto;
                }
                .des {
                    border: 1px solid #f2f2f2;
                    border-top: none;
                    padding: 5px 0; 
                }
                .name {
                    color: #000;
                    font-size: 16px;
                    line-height: 1.5;
                }
                .price {
                    color: red;
                }
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