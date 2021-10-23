<template>
  <div id="app">
    <div v-if="isToken">
      <Mypage @layout="getIstoken"></Mypage>
    </div>
    <div v-else>
      <h3 style="text-align: center; padding: 20px; margin-top: 40px">
        山西中医药大学2021-2022学生评教
      </h3>
      <div class="success_w">
        <el-empty
          :image="image"
          :image-size="212"
          description="您已提交成功，请勿重复提交！！"
        ></el-empty>
        <el-card :body-style="bodyStyle" shadow="nerver">{{
          token.time | timeChange
        }}</el-card>
        <el-button @click="clearI" type="primary">清除缓冲</el-button>
        <!-- <Foot></Foot> -->
      </div>
    </div>
  </div>
</template>

<script>
import Mypage from "./components/Mypage.vue";
// import Foot from "./components/Foot.vue";
export default {
  name: "App",
  data() {
    return {
      isToken: true,
      token: {},
      image: "",
      bodyStyle: {
        backgroundColor: "#F2F6FC",
      },
      // image/xy.png
    };
  },
  components: { Mypage },
  created() {
    this.$on("layout", this.getIstoken);
  },
  mounted() {
    this.getTimeCache();
    this.initPage();
  },
  filters: {
    timeChange(time) {
      let date = new Date(time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() + " ";
      let h = date.getHours() + ":";
      let m =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + ":"
          : date.getMinutes() + ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
  },
  methods: {
    getTimeCache() {
      let token = localStorage.getItem("token");
      let newtime = new Date().getTime();
      // 缓冲时间30天
      let sub = token && Math.abs(newtime - JSON.parse(token).time);
      if (token && sub < 2629800000) {
        this.isToken = false;
        // console.log(token.time);
        this.token = JSON.parse(token);
      } else {
        this.clearI();
        this.token = true;
      }
    },
    // 卸载页面
    getIstoken(e) {
      this.isToken = e.isToken;
      this.getTimeCache();
    },
    clearI() {
      localStorage.clear();
      this.isToken = true;
    },
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
        duration: 8000,
      });
    },
    success_w() {},
  },
};
</script>

<style lang="less" scoped>
.success_w {
  position: absolute;
  top: 44%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ccc;
}
</style>
