<!--
 * @Author: Harry
 * @Date: 2022-05-27 18:09:25
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-05-31 00:11:52
 * @FilePath: \hello-world\src\components\NewView.vue
-->
<template>
  <div class="i-a-i">
    <div v-for="(item, index) in title_lists" :key="item.title" :class="index === 0 ? 'i-a i-c' : 'i-c'">
      <span class="title_w">{{ index + 1 + "." + item.title }}</span>
      <Radio @options_t="getOption" :tindex="index" :tid="teacher_id" />
    </div>
    <div class="a-i">
      <el-button @click="changeId(-1)">上一个</el-button>
      <div class="progress_w">
        <el-progress :width="38" type="circle" :percentage="parseFloat(percentage)" :stroke-width="3"></el-progress>
      </div>
      <el-button @click="changeId(1)">下一个</el-button>
      <div @click="changeId(0)" style="color:#999;margin:10px">取消</div>
    </div>
  </div>
</template>

<script>
import Radio from './Radio.vue';
export default {
  components: { Radio },
  data() {
    return {
      percentage: 0,
      radio: "",
      newarr: [],
    }
  },
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
  emits: ["optionresult", 'changeids'],
  created() {
    this.$bus.on("options_t", this.getOption);
  },
  methods: {
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
        this.$bus.emit("optionresult", data);
      }
      this.percentage = ((100 / this.title_lists.length) * len).toFixed(0);
      if (this.percentage > 100) {
        this.percentage = 100;
      }
      if (this.percentage < 11) {
        this.percentage = 0;
      }
    },
    changeId(e) {
      this.$bus.emit('changeids', e)
    }
  },
  mounted() {

  },
  beforeDestroy() {
    //销毁监听事件
    this.$bus.off("options_t", this.getOption);
  }
}
</script>
<style lang='less' scoped>
.i-a {
  margin-top: 50px;
  position: relative;
}

.i-a-i {
  padding-bottom: 50px;
}

.i-c {
  margin-left: 5px;
  margin-right: 5px;
}

.a-i {
  position: fixed;
  bottom: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
  background-color: #fff;
  box-shadow: 0 -3px 10px #ccc;

  .el-button,
  .progress_w {
    margin: 10px;
  }
}
</style>