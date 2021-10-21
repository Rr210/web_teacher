<template>
  <div id="app">
    <div v-if="isToken">
      <Mypage></Mypage>
    </div>
    <div v-else>您已提交成功！！</div>
  </div>
</template>

<script>
import Mypage from "./components/Mypage.vue";
export default {
  name: "App",
  data() {
    return {
      isToken: true,
    };
  },
  components: { Mypage },
  created() {
    let token = localStorage.getItem("token");
    if (token) {
      this.isToken = false;
    }
    this.initPage();
  },
  methods: {
    initPage() {
      const h = this.$createElement;
      this.$notify({
        title: "山西中医药大学学生评教系统",
        message: h(
          "span",
          { style: "color: #004946" },
          "同学们:你们好，欢迎你使用“山西中医药大学学生评教系统”，学生评教旨在从学生的角度了解教师教学质量情况，学生评教采用无记名的方式，请如实对你的代课教师进行评价。谢谢合作!"
        ),
        offset: 200,
        duration: 10000,
      });
    },
  },
};
</script>

<style lang="less">
</style>
