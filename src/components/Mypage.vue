<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-10-20 15:02:16
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-10-21 11:40:13
 * @LastEditors: Harry
-->
<template>
  <div>
    <h2 style="text-align: center; padding: 20px">教师评测</h2>
    <el-card>
      <el-form ref="formRef" :rules="rules" :model="formData" label-width="0px">
        <el-form-item prop="class_id">
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
              :teacher_id="item.teacher_id"
              :class_name="item.class_name"
              :title_lists="title_lists"
            ></Teacher>
          </el-form-item>
        </div>
        <el-empty description="请选择您的年级/班级" v-else></el-empty>
        <el-button
          type="primary"
          @click="onSubmit('formRef')"
          :disabled="isDisabled"
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
      isDisabled: false,
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
      teacher_lists: [],
      // 题目列表
      title_lists: [],
      rules: {
        class_id: [
          { required: true, message: "请选择年级/班级", trigger: "change" },
        ],
      },
    };
  },
  created() {
    //创建后监听
    this.$bus.on("options_t", this.handleOption);
  },
  mounted() {
    this.getClassList();
    this.getTitle();
  },
  methods: {
    // 监听用户点击选项事件
    handleOption(e) {
      console.log(e);
    },
    // 请求数据
    async getClassList() {
      const { data: res } = await this.$http.get(
        "https://cdn.jsdelivr.net/gh/Rr210/image@master/hexo/api/data_10.json"
      );
      this.options = res;
    },
    handleChange(e) {
      let class_name = e[1];
      if (e) {
        this.getTeacher(class_name);
      }
    },
    // 提交表单
    onSubmit(ref) {
      console.log(ref);
      this.$refs[ref].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 题目获取
    async getTitle() {
      const { data: res } = await this.$http.get(
        "https://cdn.jsdelivr.net/gh/Rr210/image@master/hexo/api/data_00.json"
      );
      this.title_lists = res;
      // console.log(res);
    },
    // 老师信息获取
    async getTeacher(class_name) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      const { data: res } = await this.$http.get(
        `data_json/${class_name}.json`
      );
      console.log(res);
      this.teacher_lists = res.data;
      this.isSelectedClass = true;
      if (res) loading.close();
    },
    beforeDestroy() {
      // 最好在组件销毁前取消监听
      this.$bus.off("options_t", this.handleOption);
    },
  },
};
</script>

<style>
</style>