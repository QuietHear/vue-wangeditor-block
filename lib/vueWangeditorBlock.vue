/*
* @Author: aFei
* @Date: 2020-12-30 14:15:17
*/
/*
 * @LastEditors: afei
 * @LastEditTime: 2021-01-13 10:48:16
*/
<template>
  <div :class="['vue-wangeditor-block', cname]">
    <div :id="id" v-if="!onlyShow"></div>
    <div class="w-e-text full" v-html="content" v-else></div>
  </div>
</template>

<script>
import E from "wangeditor";
const { $, BtnMenu, DropListMenu, PanelMenu, DropList, Panel, Tooltip } = E;
// xss安全
import xss from "xss";
// 国际化
import i18next from "i18next";
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
    openXss: {
      // xss防护
      type: Boolean,
      default: true,
    },
    i18next: {
      // 标题开启国际化
      type: Boolean,
      default: false,
    },
    language: {
      // 设置语言种类
      type: String,
      default: "zh-CN",
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
    diyMenus: {
      // 自定义菜单列表
      type: Array,
      default: () => {
        return [];
      },
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
      example: null,
    };
  },
  methods: {
    // 初始化
    init() {
      if (!this.onlyShow) {
        this.example = new E(document.getElementById(this.id));
        // 扩展菜单
        this.diyMenus.forEach((item) => {
          if (item.key) {
            this.extendMenus(item);
          }
        });
        // 设置配置
        for (let keys in this.extraConfig) {
          this.example.config[keys] = this.extraConfig[keys];
        }
        // 语言
        if (this.i18next) {
          this.example.config.lang = this.language;
          this.example.i18next = i18next;
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
    // 自定义扩展菜单
    extendMenus(item) {
      let it = this;
      if (item.menuType === "list") {
        // 列表类型
        class menuItem extends DropListMenu {
          constructor(editor) {
            const $elem = E.$(
              `<div class="w-e-menu" title="${item.title}" data-title="${item.title}">
                ${item.text}
            </div>`
            );
            // 标题必须添加到菜单里
            item.listTitle = item.listTitle ? item.listTitle : "";
            editor.config.languages["zh-CN"].wangEditor.menus.dropListMenu[
              item.listTitle
            ] = item.listTitle;
            editor.config.languages["en"].wangEditor.menus.dropListMenu[
              item.listTitle
            ] = item.listTitleEn ? item.listTitleEn : item.listTitle;
            const dropListConf = {
              width: item.listWidth ? item.listWidth : 100,
              title: item.listTitle,
              type: "list",
              list: item.listMap
                ? item.listMap.map((one) => {
                    return { $elem: E.$(one.key), value: one.value };
                  })
                : [],
              // 菜单列表item点击事件
              clickHandler: (value) => {
                it.$emit(item.key + "Click", value, this, it);
              },
            };
            super($elem, editor, dropListConf);
          }
          // 激活检测
          tryChangeActive() {
            it.$emit(item.key + "CheckActive", this, it);
          }
        }
        this.example.menus.extend(item.key, menuItem);
      } else {
        // 普通类型
        class menuItem extends BtnMenu {
          constructor(editor) {
            const $elem = E.$(
              `<div class="w-e-menu" title="${item.title}" data-title="${item.title}">
                ${item.text}
            </div>`
            );
            super($elem, editor);
          }
          // 菜单点击事件
          clickHandler() {
            it.$emit(item.key + "Click", this, it);
          }
          // 激活检测
          tryChangeActive() {
            it.$emit(item.key + "CheckActive", this, it);
          }
        }
        this.example.menus.extend(item.key, menuItem);
      }
      this.example.config.menus = this.example.config.menus.concat(item.key);
    },
    // 内容改变
    msgChange(value) {
      this.$emit(
        "changeValue",
        this.jsonModel
          ? this.example.txt.getJSON()
          : this.openXss
          ? xss(value)
          : value
      );
      this.$emit(
        "change",
        this.jsonModel
          ? this.example.txt.getJSON()
          : this.openXss
          ? xss(value)
          : value
      );
    },
    // 鼠标在输入框聚焦
    focusInput(value) {
      this.$emit(
        "focus",
        this.jsonModel
          ? this.example.txt.getJSON()
          : this.openXss
          ? xss(value)
          : value
      );
    },
    // 鼠标在输入框失去焦点
    blurInput(value) {
      this.$emit(
        "blur",
        this.jsonModel
          ? this.example.txt.getJSON()
          : this.openXss
          ? xss(value)
          : value
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
    this.init();
  },
  watch: {
    language() {
      if (!this.onlyShow) {
        this.init();
      }
    },
    onlyShow() {
      if (!this.onlyShow) {
        this.$nextTick(() => {
          this.init();
        });
      }
    },
  },
  beforeDestroy() {
    // 销毁编辑器
    if (!this.onlyShow) {
      this.example.destroy();
      this.example = null;
    }
  },
};
</script>

<!--基础样式-->
<style scoped>
@import "style/vueWangeditorBlock.css";
</style>