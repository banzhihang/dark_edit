<template>
<div class="login_container">
  <div class="login_box">
    <div class="avatar_box">
      <img src="../assets/logo.png" alt="">
    </div>
    <el-form  label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
      <!--用户名-->
      <el-form-item prop="username">
        <el-input prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
      </el-form-item>
      <!--密码-->
      <el-form-item prop="password">
        <el-input prefix-icon="iconfont icon-3702mima" v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <!--按钮-->
      <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="resetLoginForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 10, max: 20, message: '长度在10到20个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在5到20个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('/login', this.loginForm)
        if (res.code !== 0) return this.$message.error(res.msg)
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', res.data.token)
        await this.$router.push('/list')
      })
    }
  }
}
</script>

<style scoped lang="less">
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
      background-color: #eee;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom:0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>
