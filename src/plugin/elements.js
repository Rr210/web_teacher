/***
 * @Description:
 * @Author: Harry
 * @Date: 2021-09-22 21:36:25
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-10-21 17:09:37
 * @LastEditors: Harry
 */
// 导入自己需要的组件
import {
  MessageBox,
  Cascader,
  CarouselItem,
  Radio,
  Card,
  Loading,
  Progress,
  Carousel,
  RadioGroup,
  Input,
  Form,
  FormItem,
  Button,
  Message,
  Notification,
  Empty
} from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Progress)
    Vue.use(Carousel)
    Vue.use(RadioGroup)
    Vue.use(Radio)
    Vue.use(Empty)
    Vue.use(Cascader)
    Vue.use(CarouselItem)
    Vue.use(Card)
    Vue.use(Input)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Button)
  },
  other: {
    Message, MessageBox,Notification,Loading
  }
}
export default element
