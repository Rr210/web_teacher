<!--
 * @Description: 
 * @Author: Harry
 * @Date: 2021-10-20 15:02:16
 * @Url: https://u.mr90.top
 * @github: https://github.com/rr210
 * @LastEditTime: 2022-05-27 23:44:07
 * @LastEditors: harry
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
          <el-cascader v-model="formData.class_id" :options="options" :props="props" @change="handleChange">
          </el-cascader>
        </el-form-item>
        <div style="margin:10px 0">
          <el-radio v-model="version_i" label="1">版本一</el-radio>
          <el-radio v-model="version_i" label="2">版本二</el-radio>
        </div>
        <div v-if="isSelectedClass">
          <el-form-item prop="teacher_lists" v-model="formData.teacher_lists">
            <h3>
              <span style="color: red">*</span>开始评分
            </h3>
            <div v-if="version_i === '1'">
              <div class="remind_w">
                本班共<em style="color: red">{{ this.teacher_lists.length }}</em>位老师,每位老师<em style="color: red">{{ 9
                }}</em>个评价指标,<em style="color: red;text-decoration: underline;">左滑</em>切换
              </div>
              <Teacher v-for="item in teacher_lists" :key="item.teacher" :teacher_name="item.teacher_name"
                :teacher_id="item.teacher_id" :class_name="item.class_name" :title_lists="title_lists"
                @optionresult="handleOption" />
            </div>
            <div v-else>
              <div class="remind_w">
                本班共<em style="color: red">{{ this.teacher_lists.length }}</em>位老师,每位老师<em style="color: red">{{ 9
                }}</em>个评价指标
              </div>
              <el-collapse v-model="CollactiveName" accordion>
                <el-collapse-item :name="item.teacher_id" v-for="(item, index) in teacher_lists" :key="item.teacher"
                  :class="CollactiveName == item.teacher_id ? 'item_active' : ''">
                  <template slot="title">
                    <span style="font-size:17px">{{ `${(index + 1)}.${item.teacher_name}--` }}</span>
                    <span>{{
                        item.class_name
                    }}</span>
                  </template>
                  <new-view :teacher_name="item.teacher_name" :teacher_id="item.teacher_id"
                    :class_name="item.class_name" :title_lists="title_lists" @optionresult="handleOption"
                    @changeids="handleChangetindex" />
                </el-collapse-item>
              </el-collapse>
            </div>
          </el-form-item>
        </div>
        <el-empty description="请选择您的年级/班级" v-else></el-empty>
        <el-button type="primary" @click="onSubmit('formRef')" :disabled="isDisabled">点击提交</el-button>
      </el-form>
      <Foot></Foot>
    </el-card>
  </div>
</template>

<script>
import urlLink from "../assets/config";
import Teacher from "./Teacher.vue";
import Foot from "./Foot.vue";
import NewView from './NewView.vue'
let { CLASS_LINK, SUBMIT_POST, TITLE_LINK, TEACHER_LINK } = urlLink;
export default {
  name: "Mypage",
  components: { Teacher, Foot, NewView },
  data() {
    return {
      isDisabled: false,
      isSelectedClass: false,
      props: {
        children: "class_lists",
        value: "label",
      },
      version_i: '1',
      percentage: 0,
      CollactiveName: '',
      formData: {
        class_id: "",
        teacher_lists: [],
      },
      value: [],
      options: [],
      t_index: 0,
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
    this.$on('changeids', this.handleChangetindex)
  },
  watch: {
    CollactiveName(newvalue, oldvalue) {
      if (newvalue) {
        const a = this.teacher_lists.findIndex(v => v.teacher_id == newvalue)
        this.t_index = a
      }
    }
  },
  mounted() {
    this.getClassList();
    this.getTitle();
    // console.log({ time: new Date().getTime(), message: this.guid() });
  },
  methods: {
    handleVersion(e) {
      this.version_i = e
    },
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
    handleChangetindex(e) {
      if (e !== 0) {
        const a = this.t_index + e
        if (a >= 0 && a <= this.teacher_lists.length - 1) {
          this.CollactiveName = this.teacher_lists[a]['teacher_id']
        } else {
          console.log('已经是第一个');
        }
      } else {
        console.log(1);
        this.CollactiveName = ''
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
  margin: 5px 0;
  background-color: #f8f8f8;
  border-radius: 10px;
  // color:#606266;
}

.remind_w {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 13px;
  // color: red;
}

.el-card {
  box-shadow: 0 0 2px rgba(245, 240, 240, 0.7) !important;
}
</style>>