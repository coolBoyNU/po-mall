import axios from './querys.js'

export function figure() {
  return axios.get('/getlunbo')
}

export function goodsData(page = 1, limit = 10) {
  return axios.get(`/recommend?page=${page}&limit=${limit}`)
}

export function gIntroduction(num) {
  return axios.get(`/getthumbimages/${num}`)
}

export function gDetails(num) {
  return axios.get(`/getgoodsinfo/${num}`)
}