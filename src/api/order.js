import axios from './querys.js'

//获取商品图片名称
export function getGoodsId(orderData) {
  return axios.get('/getshopcarlist/' + orderData)
}

//提交订单
export function fetchCommitOrder(orderData) {
  return axios.post('/commitorder', orderData)
}

//获取用户订单
export function fetchUserorder(user_order) {
  return axios.post('/userorder/' + user_order)
}

//获取订单信息
export function fetchOrderInfo(order_id) {
  return axios.post('/getorder/' + order_id)
}

//获取物流信息
export function fetchLogistics() {
  return axios.get('/kuaidi100')
}

// 模拟用户支付订单成功
export function fetchPayOrder(order_id) {
  return axios.post(`/payorder/${order_id}`)
}