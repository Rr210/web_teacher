/***
 * @Description: 
 * @Author: Harry
 * @Date: 2021-10-20 21:46:45
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-11-10 12:07:58
 * @LastEditors: Harry
 */
module.exports = {
  // ...
  publicPath: './',
  productionSourceMap: false,
  // vue.config.js
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '山西中医药大学2021-2022学生评教'
        return args
      })
  }
  // ...
}