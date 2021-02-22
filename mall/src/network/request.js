import  axios from 'axios'
//最终的封装方法
export function request(config) {
 //1、创建axios的实例
 const instance = axios.create({
   baseURL: 'http://152.136.185.210:7878/api/m5',
   timeout: 5000
  })
  //2.axios的拦截器
  // 全局拦截 axios.interceptors, 请求拦截作用：1.比如config中的信息不符合服务器的要求；2、每次发送网络请求是，都希望在界面中显示一个请求图标；3、需要携带特殊要求的请求，登录（token）
  instance.interceptors.request.use(config => {
    //console.log(config)
    return config
  }, err => {
    //console.log(err)
  })
  //响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
   console.log(err)
  })
 //3、发送真正的网络请求
  return instance(config)
}
