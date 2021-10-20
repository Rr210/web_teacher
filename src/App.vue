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
  },
};
</script>

<style lang="less">
</style>
