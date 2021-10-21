/***
 * @Description: 
 * @Author: Harry
 * @Date: 2021-10-21 11:22:34
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-10-21 11:25:19
 * @LastEditors: Harry
 */
//vue-bus.js
const VueBus= function (Vue){
  const Bus = new Vue({
      methods: {
         emit(event,...args){
              //分发事件
              this.$emit(event,...args);   
          },
          on(event,callback){
              //监听事件，回调
              this.$on(event,callback);
          },
          off(event,callback){
              //取消监听事件，回调
              this.$off(event,callback);
          }
      },
  });
  Vue.prototype.$bus = Bus;
};
export default VueBus;
