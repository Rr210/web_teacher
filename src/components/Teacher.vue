<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-10-20 18:48:57
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-11-10 12:00:40
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
    <swiper ref="mySwiper" class="swiper" :options="swiperOption">
      <swiper-slide v-for="(item, index) in title_lists" :key="item.title">
        <span class="title_w">{{ index + 1 + "." + item.title }}</span>
        <Radio @options_t="getOption" :tindex="index" :tid="teacher_id"></Radio>
      </swiper-slide>
    </swiper>
    <!-- <el-carousel
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
            @options_t.self="getOption"
            :tindex="index"
            :tid="teacher_id"
          ></Radio>
        </v-touch>
      </el-carousel-item>
    </el-carousel> -->
  </div>
</template>

<script>
import Radio from "./Radio.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
export default {
  name: "Teacher",
  components: { Radio, swiper, swiperSlide },
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
      swiperOption:{
        loop: false  // 阻止循环
      },
      percentage: 0,
      radio: "",
      newarr: [],
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  emits: ["optionresult"],
  created() {
    this.$on("options_t", this.getOption);
  },
  mounted() {
    this.newarr = new Array(this.title_lists.length).fill(0);
  },
  beforeUpdate() {},
  methods: {
    onSlideChange() {},
    onSwiper() {},
    getOption(e) {
      // 执行了点击事件
      const { tid, tindex, option } = e;
      this.newarr[tindex] = option;
      let len = this.newarr.filter((v) => v !== 0).length;
      if (len == this.newarr.length) {
        let data = {
          teacher_id: tid,
          result_options: this.newarr.join(""),
          teacher_name: this.teacher_name,
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
    // //设置滑动切换轮播图
    // swiperleft: function (index) {
    //   //上一页
    //   this.$refs.carousel.next();
    //   this.$refs.carousel.setActiveItem(index + 1);
    // },
    // swiperright: function (index) {
    //   //下一页
    //   this.$refs.carousel.prev();
    //   //设置幻灯片的索引
    //   this.$refs.carousel.setActiveItem(index - 1);
    // },
  },
};
</script>

<style lang="less" scoped>
.teacher_wrap {
  border-bottom: 1px solid #ccc;
  position: relative;
  margin: 10px 0 20px 0;
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; //作为弹性伸缩盒子模型显示。
  -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
  -webkit-line-clamp: 2; //显示的行
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