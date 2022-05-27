/*
 * @Author: Harry
 * @Date: 2021-10-26 11:03:05
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-05-27 18:12:18
 * @FilePath: \hello-world\src\plugin\elements.js
 */
/***
 * @Description:
 * @Author: Harry
 * @Date: 2021-09-22 21:36:25
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-10-26 10:57:43
 * @LastEditors: Harry
 */
// 导入自己需要的组件
import {
  MessageBox,
  Cascader,
  CarouselItem,
  Radio,
  Collapse,
  CollapseItem,
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
    Vue.use(Collapse)
    Vue.use(CollapseItem)
    Vue.use(Input)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Button)
  },
  other: {
    Message, MessageBox,Loading
  }
}
export default element
