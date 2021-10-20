<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-10-20 15:02:16
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-10-20 22:13:48
 * @LastEditors: Harry
-->
<template>
  <div>
    <h2 style="text-align: center; padding: 20px">教师评测</h2>
    <el-card>
      <el-form ref="formRef" :model="formData" label-width="0px">
        <el-form-item label="">
          <h3><span style="color: red">*</span>选择年级/班级</h3>
          <el-cascader
            v-model="formData.class_id"
            :options="options"
            :props="props"
            @change="handleChange"
          >
          </el-cascader>
        </el-form-item>
        <div v-if="isSelectedClass">
          <el-form-item>
            <h3><span style="color: red">*</span>开始评分</h3>
            <Teacher
              v-for="item in teacher_lists"
              :key="item.teacher"
              :teacher_name="item.teacher_name"
              :class_name="item.class_name"
              :title_lists="title_lists"
            ></Teacher>
          </el-form-item>
        </div>
        <el-empty description="请选择您的年级/班级" v-else></el-empty>
        <el-button type="primary" @click="onSubmit" disabled
          >点击提交</el-button
        >
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Teacher from "./Teacher.vue";
export default {
  name: "Mypage",
  components: { Teacher },
  data() {
    return {
      isSelectedClass: false,
      formData: {
        class_id: "",
        teacher_lists: "",
      },
      value: [],
      options: [],
      props: {
        children: "class_lists",
        value: "label",
      },
      teacher_lists: [
        { class: "课程1", teacher: "老师A" },
        { class: "课程2", teacher: "老师B" },
        { class: "课程3", teacher: "老师C" },
      ],
      // 题目列表
      title_lists: [],
    };
  },
  mounted() {
    this.getClassList();
    this.getTitle();
    this.getTeacher();
  },
  methods: {
    // 请求数据
    async getClassList() {
      const { data: res } = await this.$http.get(
        "https://cdn.jsdelivr.net/gh/Rr210/image@master/hexo/api/data_10.json"
      );
      this.options = res;
    },
    handleChange(e) {
      console.log(e);
      if (e) {
        this.isSelectedClass = true;
      }
    },
    // 提交表单
    onSubmit(e) {},
    // 题目获取
    async getTitle() {
      const { data: res } = await this.$http.get(
        "https://cdn.jsdelivr.net/gh/Rr210/image@master/hexo/api/data_00.json"
      );
      this.title_lists = res;
      console.log(res);
    },
    // 老师信息获取
    async getTeacher() {
      const { data: res } = await this.$http.get(
        "https://cdn.jsdelivr.net/gh/Rr210/image@master/hexo/api/data_11.json"
      );
      this.teacher_lists = res.data;
      console.log(res);
    },
  },
};
</script>

<style>
</style>