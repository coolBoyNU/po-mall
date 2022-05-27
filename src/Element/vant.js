import Vue from 'vue';
import {
  ActionSheet,
  AddressEdit,
  AddressList,
  Badge,
  Button,
  Card,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  CouponCell,
  CouponList,
  Dialog,
  Divider,
  Field,
  Form,
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
  Step,
  Stepper,
  Steps,
  Sticky,
  SubmitBar,
  Swipe,
  SwipeCell,
  SwipeItem,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs,
  Tag,
  Toast,
  Uploader,
  DropdownMenu,
  DropdownItem,
} from 'vant';
import 'vant/lib/index.css';


Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Step);
Vue.use(Steps);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Tabbar);
Vue.use(AddressEdit);
Vue.use(AddressList);
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
Vue.use(Form);
Vue.use(Field);
Vue.use(ActionSheet);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Badge);
Vue.use(Uploader);

Vue.use({
  install() {
    Vue.prototype.$Toast = Toast;
    Vue.prototype.$ImagePreview = ImagePreview;
    Vue.prototype.$Dialog = Dialog;
  }
});

Vue.use(Lazyload, {
  lazyComponent: true,
});
