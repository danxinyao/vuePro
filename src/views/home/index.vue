<template>
    <div class="content">
         <swiper :options="swiperOption" class="swiper_box">
    		<swiper-slide class="item">
    			 <img src="~assets/images/list_300x300.png" alt="">
    		</swiper-slide>
            <swiper-slide class="item">
                 <img src="~assets/images/bg.jpg" alt="">
            </swiper-slide>  
            <swiper-slide class="item">
                 <img src="~assets/images/list_300x300.png" alt="">
            </swiper-slide>        
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
  		</swiper>
    </div>
</template>
<style lang="less" scoped>
	.content {
		width: 100%;
		height: 400px;
		.swiper_box {
			width: 100%;
			height: 400px;
            .item {
                width: 100%;
                height: 100%;
                img {
                    display: block;
                    width: 100%;
                    height: 100%;
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