const myStore = {
  state: () => ({
    cartGoods: [],//购物车数据
    token: '',
    userInfo: {}, //登录用户
  }),
  mutations: {
    //加入购物车的数据进行存储
    getPrint(state, addCart) {
      let index = state.cartGoods.findIndex((item) => item.id === addCart.id)
      if (index === -1) {
        //新数据添加到头部
        state.cartGoods.unshift(addCart)
      } else {
        state.cartGoods[index].number += addCart.number
      }
    },
    //商品数量加减
    setModified(state, val) {
      let isResult = state.cartGoods.filter(item => item.id === val.id)
      isResult[0].number = val.e
    },
    //全选，全部选
    checkAll(state, allVal) {
      state.cartGoods.map((item) => {
        return item.selected = allVal
      })
    },
    checkOne(state, val) {
      //单选框
      let status = state.cartGoods.findIndex(item => item.id === val.i)
      //传递过来的状态 val.status 进行取反
      state.cartGoods[status].selected = !val.status
    },
    setToken(state, token) {
      //保存token到本地存储
      state.token = token;
    },
    setUserInfo(state, userInfo) {
      //用户数据
      state.userInfo = userInfo;
    },
    clearUerInfo(state) {
      //token错误清空
      state.cartGoods = []
      state.token = ''
      state.userInfo = {}
    },
    ModifyPicture(state, Picture) {
      //修改头像 后修改本地存储
      state.userInfo.avatar = Picture;
    },
    isDel(state, id) {
      //删除
      let delData = state.cartGoods.filter(item => item.id === id)
      state.cartGoods.splice(delData, 1)
    },
    clearShopCar(state) {
      //提交订单成功后清空购物车
      state.cartGoods = [];
    }

  },
  getters: {
    sta(state) {
      let objMap = {}
      state.cartGoods.forEach(item => {
        objMap[item.id] = item.selected
      })
      return objMap
    },
    getCart(state) {
      //获取商品id
      return state.cartGoods.map(item => item.id).join(',')
    },
    totalPrices(state) {
      return state.cartGoods.reduce((amt, item) => amt += item.number, 0)
    },
    allnumber(state) {
      //购买商品数量
      let idNumMap = {}
      state.cartGoods.forEach(item => {
        idNumMap[item.id] = item.number;
      })
      return idNumMap
    }
  }

}

export default myStore