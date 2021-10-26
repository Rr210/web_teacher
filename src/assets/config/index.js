/***
 * @Description: 全局配置项
 * @Author: Harry
 * @Date: 2021-10-21 21:35:38
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-10-26 10:58:44
 * @LastEditors: Harry
 */
// 模拟链接数据库
const urlLink = {
  CLASS_LINK: 'json/class_json/class.json', // 班级地址
  SUBMIT_POST: "http://localhost:3002/api", // 表单POST地址http://localhost:3002/api/
  TITLE_LINK: "json/title_json/title.json", // 标题地址
  TEACHER_LINK: "json/data_json/"
}
// 正式版
// let url = 'static/'
// const urlLink = {
//   CLASS_LINK: `${url}json/class_json/class.json`, // 班级地址
//   SUBMIT_POST: "/", // 表单POST地址http://localhost:3002/api/
//   TITLE_LINK: `${url}json/title_json/title.json`, // 标题地址
//   TEACHER_LINK: `${url}json/data_json/`
// }
export default urlLink