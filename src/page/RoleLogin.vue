<template>
  <div id="login">
    <div style="margin: 0 auto">
      <img src="../assets/img/photo.jpg" width="200" height="200" style="margin-bottom: 30px" />
      <div style="width: 300px; margin: 0 auto;">
        <el-form :label-position="labelPosition" label-width="40px" :model="formLabelAlign">
          <el-form-item label="邮箱" style="text-align: center">
            <el-input v-model="formLabelAlign.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formLabelAlign.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" @click="clickLogin">登录</el-button>
      <el-button type="primary" @click="reset">重置</el-button>
      <p>
      <router-link  to="/customer-regist" style="text-color:blue;margin-right: -143px;">
        没有账号？请点击注册
      </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { SELECT_ROLE, LOGIN_INFORMATION, GET_LOGIN_INFO, SAVE_TOKEN } from '../store/const-types'
import { getSelfEmployee } from '../api/employee'

export default {
  name: 'RoleLogin',
  data () {
    return {
      role: this.$route.params.selectedRole,
      labelPosition: 'right',
      formLabelAlign: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    fullWidth: function () {
      const clientWidth = document.documentElement.offsetWidth
      return clientWidth > 500 ? '50%' : clientWidth - 100 + 'px'
    }
  },
  methods: {
    clickLogin () {
      if (
        this.formLabelAlign.email === '' ||
        this.formLabelAlign.password === ''
      ) {
        MessageBox.alert('邮箱或者密码不能为空', '提示信息')
      } else {
        const self = this
        this.$store.dispatch(GET_LOGIN_INFO, { ...this.formLabelAlign })
          .then(response => {
            self.$store.commit(SAVE_TOKEN, response.data.data)
            return getSelfEmployee()
          })
          .then(response => {
            self.$store.commit(SELECT_ROLE, { roleSelected: response.data.data.role })
            self.$store.commit(LOGIN_INFORMATION, response.data.data)
            const role = this.$store.state.loginInformation.role
            if (role === 1) {
              self.$router.push('/grabbing-order')
            } else if (role === 2 || role === 3) {
              self.$router.push('/web-home')
            } else if (role === 4) {
              self.$router.push('/creating-order')
            }
          })
          .catch(() => {
            MessageBox.alert('用户名或密码错误', '提示信息')
          })
      }
    },
    reset () {
      this.formLabelAlign.email = ''
      this.formLabelAlign.password = ''
      this.formLabelAlign.password = ''
    }
  }
}
</script>

<style scoped>
#login {
  padding-top: 100px;
}
</style>
