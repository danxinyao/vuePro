<template>
	<div class="header">
		<router-link :to="item.path" v-for="item in menuList" :class="{ 'active' : $route.path == item.path}">{{item.name}}</router-link>
	</div>
</template>
<script>
	export default {
		name: 'PgHeader',
		data() {
			return {
				menuList: [
					{
						path: '/home',
						name: '首页2'
					},
					{
						path: '/login',
						name: '登录'
					},
					{
						path: '/register',
						name: '注册'
					},
					{
						path: '/goodslist',
						name: ' 后台管理 '
					},
					{
						path: '/shopList',
						name: '商城'
					},
													
				]
			}
		}
	}	
</script>
<style lang="less" scoped>
	.header {
		width:  100%;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #ccc;
		a {
			display: inline-block;
			padding: 0 30px;
			color: #333;
			text-decoration: none;
			&:hover, &.active {
				color: red;
			}
		}
	}
</style>
