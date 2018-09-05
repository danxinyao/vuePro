export default {
    data() {
        return {
            form: {
                userName: 'danxinwu',
                passWord: '123456',
            },
            rules: {
                userName: [
                    { required: true, message: '请输入账号',  trigger: 'blur' }
                ],
                passWord: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        login() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    sessionStorage.setItem('token','danxinwu')
                    this.$message({
                        type: 'success',
                        message: '登录成功!',
                        duration: 500,
                    })
                    this.$router.push('/home')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}