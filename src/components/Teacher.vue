<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-10-20 18:48:57
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-10-20 22:03:03
 * @LastEditors: Harry
-->
<template>
  <div class="teacher_wrap">
    <div class="teacher_t">{{ teacher_name + class_name }}</div>
    <el-progress
      :percentage="parseFloat(percentage)"
      :color="customColors"
    ></el-progress>
    <el-carousel
      :autoplay="false"
      arrow="always"
      height="150px"
      indicator-position="none"
      :initial-index="0"
      @change="getIndex"
      :loop="false"
    >
      <el-carousel-item v-for="(item, index) in title_lists" :key="item.title">
        <span class="title_w">{{ index + 1 + "." + item.title }}</span>
        <Radio></Radio>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import Radio from "./Radio.vue";
export default {
  name: "Teacher",
  components: { Radio },
  props: {
    teacher_name: {
      type: String,
      default: "",
    },
    class_name: {
      type: String,
      default: "",
    },
    title_lists: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      percentage: 0,
      customColors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 },
      ],
      radio: "",
    };
  },
  methods: {
    getIndex(e) {
      this.percentage = ((100 / this.title_lists.length) * (e + 1)).toFixed(0);
      if (this.percentage > 100) {
        this.percentage = 100;
      }
      if (this.percentage < 22) {
        this.percentage = 0;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.teacher_wrap {
  border-bottom: 1px solid #ccc;
}
.el-radio-group {
  padding: 20px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.title_w {
  padding: 5px 0;
  font-weight: 550;
  font-size: 16px;
}
.teacher_t {
  word-break: keep-all; /* 不换行 */
  white-space: nowrap; /* 不换行 */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>