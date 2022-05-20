import axios from './querys.js'

//首页轮播
export function figure() {
  return axios.get('/getlunbo')
}

// 首页商品
export function goodsData(page = 1, limit = 10) {
  return axios.get(`/recommend?page=${page}&limit=${limit}`)
}

//商品页面
export function gIntroduction(num) {
  return axios.get(`/getthumbimages/${num}`)
}

//获取商品详情
export function gDetails(num) {
  return axios.get(`/getgoodsinfo/${num}`)
}

//po超市
export function poColes(page, limit) {
  return axios.get(`/getgoods?pageindex=${page}&pagesize=${limit}`)
}
