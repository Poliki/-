<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="title">
        <strong>注册</strong>
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="el-icon-s-tools" type="password"></el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input v-model="loginForm.phone" prefix-icon="el-icon-phone"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="email">
          <el-input v-model="loginForm.email" prefix-icon="el-icon-message"></el-input>
        </el-form-item>
        <!-- 性别 -->
        <el-form-item prop="sex">
          <el-radio-group v-model="loginForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button @click="register">已有账号，去登录</el-button>
          <el-button type="primary" @click="login">注册</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // 这是登录表单的数据绑定对象
        loginForm: {
          username: '',
          password: ''
        },
        // 这是表单的验证规则对象
        loginFormRules: {
          // 验证用户名是否合法
          username: [{
              required: true,
              message: '请输入登录名称',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 10,
              message: '长度在 2 到 10 个字符',
              trigger: 'blur'
            }
          ],
          // 验证密码是否合法
          password: [{
              required: true,
              message: '请输入登录密码',
              trigger: 'blur'
            },
            {
              min: 5,
              max: 15,
              message: '长度在 6 到 15 个字符',
              trigger: 'blur'
            }
          ],
          email: [{
              required: true,
              message: '请输入邮箱地址',
              trigger: 'blur'
            },
            {
              type: 'email',
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change']
            }
          ],
          phone: [{
              /* type: 'number', */
              required: true,
              message: '请输入手机号',
              trigger: 'blur'
            },
            {
              pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
              message: '手机号格式不对',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      // 点击重置按钮，重置登录表单
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields()
      },
      register() {
        this.$router.push('/login')
      },
      login() {
        this.$refs.loginFormRef.validate(async valid => {
          if (!valid) return
          const {
            data: res
          } = await this.$http.post('register', this.loginForm)
          if (res.code !== 200) return this.$message.error('注册失败！')
          /* console.log(this.loginForm)
          console.log(typeof(this.loginForm)) */
          this.$message.success('注册成功')
          this.$router.push('/login')
        })
      }
    }
  }

</script>
<style lang="less" scoped>
  .login_container {

    background-image: linear-gradient(to bottom right, #CCFBFF , #EF96C5);
    height: 100%;
  }

  .login_box {
    width: 650px;
    height: 600px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }

    .title {
      position: absolute;
      left: 50%;
      transform: translate(-50%, 200%);
      font-size: 22px;
    }
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }

</style>
