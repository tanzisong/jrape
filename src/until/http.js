'use strict'
import axios from 'axios'
import { Loading } from 'element-ui'

const service = axios.create({
  baseURL: 'http://106.15.92.48:8090', // api 的 base_url
  // baseURL: process.env.VUE_APP_API,
  withCredentials: false, // 跨域请求时发送 cookies
  timeout: 10000 // request timeout
})

export default {
  post (url, data, type = 'post') {
    // NProgress.start() // 开始请求 显示加载条
    let loadingInstance1 = Loading.service({ fullscreen: true })
    return service({
      method: 'post',
      url,
      data: type === 'post' ? data : data,
      headers: {
        teacherId: sessionStorage.getItem('teacherId'),
        studentId: sessionStorage.getItem('studentId')
      },
      timeout: 10000
    }).then(
      (response) => {
        loadingInstance1.close()
        return response.data
      }
    ).catch(err => {
      console.log(err)
      loadingInstance1.close()
    })
  }
}
