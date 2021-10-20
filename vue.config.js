/***
 * @Description: 
 * @Author: Harry
 * @Date: 2021-10-20 21:46:45
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-10-20 21:46:45
 * @LastEditors: Harry
 */
 module.exports = {
  // ...
  publicPath: './',
  // vue.config.js
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '山西中医药大学-教师评测'
        return args
      })
  }
  // ...
}