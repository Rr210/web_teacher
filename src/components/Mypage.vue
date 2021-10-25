<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-10-20 15:02:16
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2021-10-25 16:59:54
 * @LastEditors: Harry
-->
<template>
  <div>
    <el-card>
      <h4><span style="color: red">*</span>告知</h4>
      <div class="content_w">
        <div>同学们:</div>
        <div style="text-indent: 2rem">
          你们好，欢迎你们使用“山西中医药大学学生评教系统”，学生评教旨在从学生的角度了解教师教学质量情况，学生评教采用无记名的方式，请如实对你的代课教师进行评价。谢谢合作!
        </div>
      </div>
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
            <h3>
              <span style="color: red">*</span>开始评分<span class="remind_w"
                >(共{{ this.teacher_lists.length }}位老师,共{{
                  this.teacher_lists.length * 9
                }}道,<em style="color:#000">左滑</em>切换题目)</span
              >
            </h3>
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
      <Foot></Foot>
    </el-card>
  </div>
</template>

<script>
import urlLink from "../assets/config";
import Teacher from "./Teacher.vue";
import Foot from "./Foot.vue";
let { CLASS_LINK, SUBMIT_POST, TITLE_LINK, TEACHER_LINK } = urlLink;
export default {
  name: "Mypage",
  components: { Teacher, Foot },
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
  emits: ["layout"],
  created() {
    //创建后监听
    this.$on("optionresult", this.handleOption);
  },
  mounted() {
    this.getClassList();
    this.getTitle();
    // console.log({ time: new Date().getTime(), message: this.guid() });
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
      const { result_options, teacher_id, teacher_name } = e;
      // console.log(e);
      let lists = this.formData.teacher_lists;
      let state = lists.find((v) => v["teacher_id"] == teacher_id);
      if (!state)
        return lists.push({ result_options, teacher_id, teacher_name });
      // console.log(state);
      for (let i in lists) {
        if (lists[i]["teacher_id"] == teacher_id)
          return (lists[i]["result_options"] = result_options);
      }
    },
    // 请求数据
    async getClassList() {
      const { data: res } = await this.$http.get(CLASS_LINK);
      this.options = res;
    },
    handleChange(e) {
      let class_name = e[1];
      this.isSelectedClass = false;
      this.formData.teacher_lists = [];
      if (e) return this.getTeacher(class_name);
    },
    // 提交表单
    onSubmit(ref) {
      // console.log(ref);
      this.$refs[ref].validate(async (valid) => {
        if (valid) {
          const res = await this.$confirm("确认提交评分, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then((res) => res)
            .catch((err) => err);
          if (res === "confirm") {
            this.FormDataSubmit();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 表单数据的提交，数据处理
    async FormDataSubmit() {
      let data = {
        class_name: this.formData.class_id[1],
        result: this.formData.teacher_lists,
      };
      // http://localhost:3002/api/
      try {
        const { data: res } = await this.$http.post(SUBMIT_POST, data);
        // console.log(res);
        if (res && res.code == "1") {
          this.$message.success(res.message);
          let token = {
            time: new Date().getTime(),
            message: this.guid(),
          };
          localStorage.setItem("token", JSON.stringify(token));
          this.$emit("layout", { istoken: false });
        }
      } catch (error) {
        this.$message.error("提交错误,请联系管理员修复");
        console.error(error);
      }
    },
    // 获取唯一id
    guid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    // 题目获取
    async getTitle() {
      const { data: res } = await this.$http.get(TITLE_LINK);
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
        `${TEACHER_LINK + class_name}.json`
      );
      // console.log(res);
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

<style lang="less" scoped>
.content_w {
  font-size: 15px;
  padding: 10px 5px;
  // color:#606266;
}
.remind_w {
  font-size: 13px;
  color: red;
}

.el-card {
  box-shadow: 0 0 2px rgba(245, 240, 240, 0.7) !important;
}
</style>>