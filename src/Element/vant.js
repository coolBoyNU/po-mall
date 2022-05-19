import Vue from 'vue';
import {
  CouponCell,
  CouponList,
  Divider,
  Grid,
  GridItem,
  Icon,
  ImagePreview,
  Lazyload,
  NavBar,
  Popup,
  Search,
  Sticky,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Tag,
  Toast,
  GoodsAction,
  GoodsActionButton,
  GoodsActionIcon,
} from 'vant';
import 'vant/lib/index.css';

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Search);
Vue.use(Icon);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Divider);
Vue.use(Tag);
Vue.use(Sticky);
Vue.use(CouponCell);
Vue.use(CouponList);
Vue.use(Popup);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);

Vue.use({
  install() {
    Vue.prototype.$Toast = Toast;
    Vue.prototype.$ImagePreview = ImagePreview;
  }
});

Vue.use(Lazyload, {
  lazyComponent: true,
});
