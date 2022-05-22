const myStore = {
  state: () => ({
    cartGoods: [],
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
    //修改复选框状态
    cartState(state, stateVal) {
      let isSta = state.cartGoods.filter(item => item.id === stateVal.id)
      isSta[0].selected = stateVal.state
    },
    //商品数量加减
    setModified(state, val) {
      let isResult = state.cartGoods.filter(item => item.id === val.id)
      isResult[0].number = val.e
    },
    //全选，全部选
    setCheck(state) {
      let sel = state.cartGoods.every(item => item.selected)
      if (!sel) {
        for (let key of state.cartGoods) {
          key.selected = true
        }
      } else {
        for (let key of state.cartGoods) {
          key.selected = false
        }
      }
    }

  },
  getters: {
    sta(state) {
      let objMap = {}
      state.cartGoods.forEach(item => {
        objMap[item.id] = item.selected
      })
      return objMap
    }
  }

}

export default myStore