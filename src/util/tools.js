import { nanoid } from 'nanoid'
import dayjs from "dayjs";

// 生成唯一的订单号
export function genOrderId() {
  let date = dayjs().format('YYYYMMDDHH') + nanoid()
  return date;
}

//节流
export function throttle(fn, delay) {
  // 记录上一次函数触发的时间
  var lastTime = 0; // 闭包变量，用来记录保存上一次的执行时间
  return function () {
    // 记录当前函数触发的时间
    var nowTime = Date.now();
    var context = this;
    var args = [ ...arguments ];
    if (nowTime - lastTime > delay) {
      // 修正this指向问题
      fn.apply(context, arguments);
      // 更新上一次的时间
      lastTime = nowTime;
    }
  }
}