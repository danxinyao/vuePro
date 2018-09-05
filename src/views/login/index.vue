<template>
    <div class="login_box">
        <el-form :model="form" status-icon :rules="rules" ref="ruleForm" label-width="80px" label-position="left" class="demo-ruleForm login_container">
            <h2 class="title">后台管理系统</h2>
            <el-form-item label="用户名" prop="userName">
                <el-input type="text" v-model="form.userName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
                <el-input type="password" v-model="form.passWord" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="button" type="primary" @click="login">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style lang="less" scoped>
    .login_box {
        position: fixed;
        left:0;
        right:0;
        top:0;
        bottom:0;
        background: url(~assets/images/bg.jpg) 50% 50% no-repeat;
        background-size: cover;
        .login_container {
            position: absolute;
            width: 400px;
            height: 300px;
            top: 50%;
            left: 50%;
            margin-left: -200px;
            margin-top: -150px;
            border-radius: 5px;
            padding: 35px;
            background: #fff;
            border: 1px solid #d5d5d5;
                .title {
                    margin: 0px auto 40px auto;
                    text-align: center;
                    color: #409EFF;
                }
                .button {
                    margin-left: 100px;
                    margin-top:25px;
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