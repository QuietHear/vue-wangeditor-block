/*
* @Author: aFei
* @Date: 2020-12-30 14:15:17
*/
/*
 * @LastEditors: afei
 * @LastEditTime: 2020-12-31 15:40:17
*/
<template>
  <div :class="['vue-wangeditor-block', cname]">
    <div :id="id" v-if="!onlyShow"></div>
    <div class="w-e-text" v-html="content" v-else></div>
  </div>
</template>

<script>
import E from "wangeditor";
import xss from "xss";
export default {
  name: "vueWangeditorBlock",
  model: {
    prop: "content",
    event: "changeValue",
  },
  props: {
    id: {
      // 组件唯一值
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    cname: {
      // 额外class
      type: String,
      default: "",
    },
    jsonModel: {
      // 数据绑定与返回设置为json格式
      type: Boolean,
      default: false,
    },
    diyAlert: {
      // 自定义提示事件
      type: Function,
    },
    uploadUrl: {
      // 图片上传的接口
      type: String,
      default: "",
    },
    httpParams: {
      // 请求附带参数
      type: Object,
      default: function () {
        return {};
      },
    },
    diyUploadImg: {
      // 自定义上传图片事件
      type: Function,
    },
    extraConfig: {
      // wangeditor配置项
      type: Object,
      default: function () {
        return {
          placeholder: "", // 空值提示字
          focus: true, // 初始化是否自动鼠标聚焦
        };
      },
    },
    onlyShow: {
      // 只展示内容
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      example: "",
    };
  },
  methods: {
    // 内容改变
    msgChange(value) {
      this.$emit(
        "changeValue",
        this.jsonModel ? this.example.txt.getJSON() : xss(value)
      );
      this.$emit(
        "change",
        this.jsonModel ? this.example.txt.getJSON() : xss(value)
      );
    },
    // 鼠标在输入框聚焦
    focusInput(value) {
      this.$emit(
        "focus",
        this.jsonModel ? this.example.txt.getJSON() : xss(value)
      );
    },
    // 鼠标在输入框失去焦点
    blurInput(value) {
      this.$emit(
        "blur",
        this.jsonModel ? this.example.txt.getJSON() : xss(value)
      );
    },
    // 返回错误信息
    alertMsg(message, type) {
      switch (type) {
        case "success":
        case "info":
        case "warning":
        case "error":
          this.$message({ type: type, message: message });
          break;
        default:
          this.$message(message);
          break;
      }
    },
    // 返回实例
    getExample() {
      return this.example;
    },
  },
  mounted() {
    if (!this.onlyShow) {
      this.example = new E(document.getElementById(this.id));
      for (let keys in this.extraConfig) {
        this.example.config[keys] = this.extraConfig[keys];
      }
      // 鼠标进入
      this.example.config.onfocus = this.focusInput;
      // 鼠标移出
      this.example.config.onblur = this.blurInput;
      // 改变事件
      this.example.config.onchange = this.msgChange;
      // 自定义提示消息
      this.example.config.customAlert = this.diyAlert
        ? this.diyAlert
        : this.alertMsg;
      // 上传本地图片url
      this.example.config.uploadImgServer = this.uploadUrl;
      // 接口请求参数
      this.example.config.uploadImgParams = { ...this.httpParams };
      // 自定义上传方法
      if (this.diyUploadImg) {
        this.example.config.customUploadImg = this.diyUploadImg;
      }
      this.example.create();
      if (this.jsonModel) {
        this.example.txt.setJSON(this.content);
      } else {
        this.example.txt.html(this.content);
      }
    }
  },
};
</script>

<!--基础样式-->
<style scoped>
@import "style/vueWangeditorBlock.css";
</style>