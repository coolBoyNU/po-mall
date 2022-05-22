import Vue from 'vue'
import * as dayjs from 'dayjs'

Vue.filter('dateFormat', (date, str = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(str)
})