import axios from './querys.js'

export function fetchLogin(formData) {
  return axios.post('/login', formData)
}

//修改头像
export function upload(formData) {
  return axios.post('/upload', formData)
}

//收货地址
export function fetchGetUserAddress(user_id) {
  return axios.get('/getaddress/' + user_id)
}

//地址添加
export function fetchAddUserAddress(user_id, formData) {
  return axios.post('/addaddress/' + user_id, formData)
}

//地址修改
export function fetchUpdateAddress(user_id, addressInfo) {
  return axios.post('/updateaddress/' + user_id, addressInfo)
}

//地址删除
export function delAdress(Address_id) {
  return axios.post('/deladdress/' + Address_id)
}