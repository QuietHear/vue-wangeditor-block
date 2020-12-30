/*
* @Author: aFei
* @Date: 2020-12-30 14:15:17
*/
/*
 * @LastEditors: afei
 * @LastEditTime: 2020-12-30 14:15:35
*/
<template>
  <vue-ueditor-wrap
    :class="['vue-wangeditor-block', onlyShow ? 'only-show' : '', cname]"
    v-model="msg"
    :config="config"
    @ready="ready"
    :init="myInit"
  ></vue-ueditor-wrap>
</template>

<script>
// 1、引入VueUeditorWrap组件
import VueUeditorWrap from "vue-ueditor-wrap";

export default {
  name: "vueWangeditorBlock",
  // 2、注册组件
  components: {
    VueUeditorWrap,
  },
  model: {
    prop: "content",
    event: "changeValue",
  },
  props: {
    content: {
      type: String,
      default: "",
    },
    staticUrl: {
      // 静态资源文件地址
      type: String,
      default: "/static/UEditor/",
    },
    cname: {
      // 额外class
      type: String,
      default: "",
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
        return {
          none: true,
        };
      },
    },
    onlyShow: {
      // 只展示内容，不展示菜单
      type: Boolean,
      default: false,
    },
    extraConfig: {
      // ueditor配置项
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      // 3、v-model绑定数据
      msg: "",
      // 4、根据项目需求自行配置,具体配置参见ueditor.config.js源码或 http://fex.baidu.com/ueditor/#start-start
      config: {
        // 如果需要上传功能,找后端小伙伴要服务器接口地址
        serverUrl: this.uploadUrl,
        // 你的UEditor资源存放的路径,相对于打包后的index.html
        UEDITOR_HOME_URL: this.staticUrl,
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 定制菜单
        toolbars: [
          [
            "fullscreen",
            "bold",
            "italic",
            "underline",
            "fontsize",
            "insertimage",
            "insertorderedlist",
            "insertunorderedlist",
          ],
          ["source"], // 调试时候使用
        ],
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 关闭自动保存
        enableAutoSave: false,
        // 是否启用元素路径
        elementPathEnabled: false,
        // 内容只读
        readonly: false,
        // 开启字数统计
        wordCount: true,
      },
      example: "",
    };
  },
  methods: {
    // 5、 你可以在ready方法中拿到editorInstance实例,之后的所有API就和官方的实例一样了,Just Do What You Want! http://fex.baidu.com/ueditor/#api-common
    ready(ue) {
      this.example = ue;
      if (!this.httpParams.none) {
        ue.execCommand("serverparam", this.httpParams);
      }
      ue.addListener("contentChange", this.msgChange);
      ue.addListener("catchRemoteImage", this.msgChange);
    },
    msgChange() {
      this.$emit("changeValue", this.msg);
      this.$emit("change", this.msg);
    },
    // 6. 结合init方法,自定义按钮
    myInit() {
      // this.$refs.ueditor.forEach((vm) => {
      //   vm.registerButton({
      //     name: 'test',
      //     icon: './public/test-button.png',
      //     tip: 'this is a test tip',
      //     handler: (editor, name) => {
      //       editor.execCommand('inserthtml', `<span>text inserted by test button</span>`)
      //     }
      //   })
      //   vm.registerButton({
      //     name: 'center',
      //     icon: './public/center.png',
      //     tip: '表格居中',
      //     handler: (editor, name) => {
      //       var tables = editor.document.querySelectorAll('table')
      //       if (tables.length) {
      //         tables.forEach((table) => {
      //           table.style.margin = '0 auto'
      //         })
      //       } else {
      //         editor.trigger('showmessage', {
      //           content: '没有表格',
      //           timeout: 2000
      //         })
      //       }
      //     }
      //   })
      // })
    },
    getExample() {
      return this.example;
    },
  },
  created() {
    if (this.onlyShow) {
      this.config.autoHeightEnabled = true;
      this.config.toolbars = [];
      this.config.wordCount = false;
      this.config.readonly = true;
    }
    for (let key in this.extraConfig) {
      this.config[key] = this.extraConfig[key];
    }
    this.msg = this.content;
  },
};
</script>

<!--基础样式-->
<style scoped>
@import "style/vueWangeditorBlock.css";
</style>