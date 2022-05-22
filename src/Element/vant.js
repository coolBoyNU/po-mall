import Vue from 'vue';
import {
  Checkbox,
  CheckboxGroup,
  CouponCell,
  CouponList,
  Divider,
  GoodsAction,
  GoodsActionButton,
  GoodsActionIcon,
  Grid,
  GridItem,
  Icon,
  ImagePreview,
  Lazyload,
  List,
  NavBar,
  Popup,
  PullRefresh,
  Search,
  Sku,
  Sticky,
  SubmitBar,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Tag,
  Toast,
  SwipeCell,
  Card,
  Button,
  Stepper,

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
Vue.use(PullRefresh);
Vue.use(List);
Vue.use(Sku);
Vue.use(SubmitBar);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(SwipeCell);
Vue.use(Card);
Vue.use(Button);
Vue.use(Stepper);

Vue.use({
  install() {
    Vue.prototype.$Toast = Toast;
    Vue.prototype.$ImagePreview = ImagePreview;
  }
});

Vue.use(Lazyload, {
  lazyComponent: true,
});
