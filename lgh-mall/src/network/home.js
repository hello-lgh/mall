import {request} from "./request.js";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
//首页tabcontrol数据请求
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
