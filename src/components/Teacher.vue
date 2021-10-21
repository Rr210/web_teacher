<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-10-20 18:48:57
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-10-21 22:34:50
 * @LastEditors: Harry
-->
<template>
  <div class="teacher_wrap">
    <div class="teacher_t">
      <span class="t_n">{{ teacher_name }}</span>
      <span>{{ class_name }}</span>
    </div>
    <!-- <el-progress
      :percentage="parseFloat(percentage)"
      :color="customColors"
    ></el-progress> -->
    <div class="progress_w">
      <el-progress
        :width="38"
        type="circle"
        :percentage="parseFloat(percentage)"
        :stroke-width="3"
      ></el-progress>
    </div>
    <!-- @change="getIndex" -->
    <el-carousel
      ref="carousel"
      :autoplay="false"
      arrow="never"
      height="150px"
      indicator-position="none"
      :initial-index="0"
      :loop="false"
    >
      <el-carousel-item v-for="(item, index) in title_lists" :key="item.title">
        <v-touch
          :swipe-options="{ direction: 'horizontal' }"
          @swipeleft="swiperleft(index)"
          @swiperight="swiperright(index)"
          class="wrapper"
        >
          <span class="title_w">{{ index + 1 + "." + item.title }}</span>
          <Radio
            @options_t="getOption"
            :tindex="index"
            :tid="teacher_id"
          ></Radio>
        </v-touch>
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
    teacher_id: {
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
      newarr: [],
    };
  },
  emits: ["optionresult"],
  created() {
    this.$on("options_t", this.getOption);
  },
  mounted() {
    this.newarr = new Array(9).fill(0);
  },
  beforeUpdate() {},
  methods: {
    getIndex(e) {},
    getOption(e) {
      const { tid, tindex, option } = e;
      this.newarr[tindex] = option;
      let len = this.newarr.filter((v) => v !== 0).length;
      if (len == this.newarr.length) {
        let data = {
          teacher_id: tid,
          result_options: this.newarr.join(""),
        };
        this.$emit("optionresult", data);
      }
      this.percentage = ((100 / this.title_lists.length) * len).toFixed(0);
      if (this.percentage > 100) {
        this.percentage = 100;
      }
      if (this.percentage < 11) {
        this.percentage = 0;
      }
    },
    //设置滑动切换轮播图
    swiperleft: function (index) {
      //上一页
      this.$refs.carousel.next();
      this.$refs.carousel.setActiveItem(index + 1);
    },
    swiperright: function (index) {
      //下一页
      this.$refs.carousel.prev();
      //设置幻灯片的索引
      this.$refs.carousel.setActiveItem(index - 1);
    },
  },
};
</script>

<style lang="less" scoped>
.teacher_wrap {
  border-bottom: 1px solid #ccc;
  position: relative;
  .progress_w {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.title_w {
  padding: 5px 0;
  font-weight: 550;
  // font-size: 16px;
}
.teacher_t {
  background-color: rgb(248, 248, 248);
  border-radius: 5px;
  padding: 2px 5px;
  margin: 5px 0;
  word-break: keep-all; /* 不换行 */
  white-space: nowrap; /* 不换行 */
  overflow: hidden;
  text-overflow: ellipsis;
}
.t_n {
  font-size: 16px;
  font-weight: 550;
  padding-right: 20px;
}
.wrapper {
  touch-action: pan-y !important;
  height: 100%;
}

</style>