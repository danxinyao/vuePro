// 导入 Account 组件
const Main = () => import('views/main/index.vue')
const Home = () => import('views/home/index.vue')
const Login = () => import('views/login/index.vue')
const goodslist = () => import('views/main/GoodsList.vue')
const logins = () => import('views/subcom/login.vue')
const register = () => import('views/subcom/register.vue')
const shopList = () => import('views/shop/list/index.vue') //商品列表
const shopDetail = () => import('views/shop/detail/index.vue') //商品详情
var routers = [
    { path: '/main', component: Main },
    {
      path: '/',
      component: Main,
      children: [
        { path: '/home', component: Home },
        { path: 'logins', component: logins },
        { path: 'register', component: register },
        { path: '/goodslist', component: goodslist },
        { path: '/shopList', component: shopList },
        { path: '/shopDetail', component: shopDetail },
      ]
    },   
    { path: '/login', component: Login },
]

// 把路由对象暴露出去
export default routers