<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-10-20 20:48:47
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-10-21 11:36:44
 * @LastEditors: Harry
-->
<template>
  <div class="options" style="text-algin: center">
    <el-radio-group v-model="radio" @change="getOption">
      <el-radio :label="0">满意</el-radio>
      <el-radio :label="1">基本满意</el-radio>
      <el-radio :label="2">一般满意</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: "Radio",
  props: {
    tindex: {
      type: Number,
      required: true,
    },
    tid: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      radio: "",
    };
  },
  emits: [],
  methods: {
    getOption(e) {
      let data = {
        tid:this.tid,
        tindex:this.tindex,
        option: e,
      };
      this.$bus.emit("options_t", data);
    },
  },
  beforeDestroy(e) {
    console.log(e);
  },
};
</script>

<style lang="less" scoped>
.options {
  margin-top: 10px;
}
.el-radio-group {
  padding: 20px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>