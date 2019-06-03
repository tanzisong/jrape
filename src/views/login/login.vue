<template>
  <div class="login">
    <div class="input">
      <el-input v-model="input.name" placeholder="请输入用户名"></el-input>
      <el-input placeholder="请输入密码" v-model="input.password" show-password></el-input>
      <div style="margin-top: 20px;">
        <el-button type="primary" @click="login('student')">学生登陆</el-button>
        <el-button type="primary" @click="login('teacher')">教师登陆</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { studentLogin, teacherLogin } from '@/until/api'
export default {
  name: 'login',
  data () {
    return {
      input: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    login (name) {
      if (name === 'teacher') {
        teacherLogin(this.input).then(res => {
          if (res.result === 'success') {
            sessionStorage.setItem('teacherId', res.data.id)
            this.$router.push({ path: '/welcome' })
          }
        })
      } else {
        studentLogin(this.input).then(res => {
          if (res.result === 'success') {
            sessionStorage.setItem('studentId', res.data.id)
            this.$router.push({ path: '/welcome' })
          }
        })
      }
      this.$store.commit('setIdentity', name)
    }
  }
}
</script>

<style scoped lang="scss">
  .login {
    height: 100%;
    background: #000;
  }
  .input {
    padding-top: 90px;
    margin: 0 auto;
    width: 20%;
    text-align: center;
  }
</style>
