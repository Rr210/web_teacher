/***
 * @Description: 全局配置项
 * @Author: Harry
 * @Date: 2021-10-21 21:35:38
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-11-10 10:06:42
 * @LastEditors: Harry
 */
// 模拟链接数据库
const urlLink = {
  CLASS_LINK: 'json/class_json/class.json', // 班级地址
  SUBMIT_POST: "https://school.mr90.top/", // 表单POST地址http://localhost:3002/api/
  TITLE_LINK: "json/title_json/title.json", // 评测题目地址
  TEACHER_LINK: "json/data_json/",        // 教师数据列表（以班级为单位，教师列表）
  CACHE_TIME: 2629800000     // 缓冲存在时间 单位毫秒 该实例表示30天
}
// 正式版
// let url = 'static/'
// const urlLink = {
//   CLASS_LINK: `${url}json/class_json/class.json`, // 班级地址
//   SUBMIT_POST: "/", // 表单POST地址http://localhost:3002/api/
//   TITLE_LINK: `${url}json/title_json/title.json`, // 标题地址
//   TEACHER_LINK: `${url}json/data_json/`,   // 教师数据（以班级为单位，教师列表）
//   CACHE_TIME: 2629800000     // 缓冲存在时间 单位毫秒 该实例表示30天
// }
export default urlLink