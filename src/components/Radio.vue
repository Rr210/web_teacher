<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-10-20 20:48:47
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-10-20 21:38:33
 * @LastEditors: Harry
-->
<template>
  <div class="options" style="text-algin: center">
    <el-radio-group v-model="radio">
      <el-radio :label="1">满意</el-radio>
      <el-radio :label="2">基本满意</el-radio>
      <el-radio :label="3">一般满意</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: "Radio",
  data() {
    return {
      radio: "",
    };
  },
};
</script>

<style lang="less" scoped>
.options {
  margin-top: 10px;
}
</style>