<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-10-20 15:02:16
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-10-21 16:35:00
 * @LastEditors: Harry
-->
<template>
  <div>
    <h3 style="text-align: center; padding: 20px">
      山西中医药大学2021-2022学生评教
    </h3>
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
          <el-form-item prop="teacher_lists" v-model="formData.teacher_lists">
            <h3><span style="color: red">*</span>开始评分</h3>
            <Teacher
              v-for="item in teacher_lists"
              :key="item.teacher"
              :teacher_name="item.teacher_name"
              :teacher_id="item.teacher_id"
              :class_name="item.class_name"
              :title_lists="title_lists"
              @optionresult="handleOption"
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
      props: {
        children: "class_lists",
        value: "label",
      },
      formData: {
        class_id: "",
        teacher_lists: [],
      },
      value: [],
      options: [],
      teacher_lists: [],
      // 题目列表
      title_lists: [],
      rules: {
        class_id: [
          { required: true, message: "请选择年级/班级", trigger: "change" },
        ],
        teacher_lists: [
          { required: true, validator: this.validList, trigger: "submit" },
        ],
      },
    };
  },
  created() {
    //创建后监听
    this.$on("optionresult", this.handleOption);
  },
  mounted() {
    this.getClassList();
    this.getTitle();
  },
  methods: {
    // 自定义判断规则
    validList(rule, value, callback) {
      if (value.length < this.teacher_lists.length) {
        this.$message.error("全部选择完成才可提交！！");
        // callback(new Error('全部选择完成才可提交！！'))
      } else {
        callback();
      }
    },
    // 监听用户点击选项事件
    handleOption(e) {
      // console.log(e);
      const { result_options, teacher_id } = e;
      // console.log(e);
      let lists = this.formData.teacher_lists;
      let state = lists.find((v) => v["teacher_id"] == teacher_id);
      if (!state) return lists.push({ result_options, teacher_id });
      // console.log(state);
      for (let i in lists) {
        if (lists[i]["teacher_id"] == teacher_id)
          return (lists[i]["result_options"] = result_options);
      }
      // lists.forEach((v, i) => {
      //   if (v["teacher_id"] == teacher_id) {
      //     lists[i]["result_options"] = result_options;
      //   }
      // });
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
      this.isSelectedClass = false;
      if (e) return this.getTeacher(class_name);
    },
    // 提交表单
    onSubmit(ref) {
      // console.log(ref);
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
    beforeDestroy(e) {
      // 最好在组件销毁前取消监听
      // console.log(e);
      this.$off("optionresult", this.handleOption);
    },
  },
};
</script>

<style>
/* a{
  color: #004946;
} */
</style>