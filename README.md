# ueditor组件 vue版

## 安装
	npm i vue-editor-block

### 0. 依赖组件
* 安装依赖 `npm i vue-ueditor-wrap`

### 1. 下载静态资源到本地
在本node包中下载static中的资源，前端的为UEditor文件夹，后端根据类型自己选择需要版本的.zip文件

### 2. 参数
* `v-model`：输入区对应的内容，双向绑定-->String;非必传
* `static-url`：静态资源文件地址,指向index.html-->String;非必传;默认'/static/UEditor/'
* `cname`：自定义class-->String;非必传
* `upload-url`：图片上传的接口,后端可以看[文档](http://fex.baidu.com/ueditor/#server-deploy '后端文档')-->String;非必传
* `http-params`：请求附带参数-->Object;非必传
* `only-show`：只展示内容-->Boolean;非必传;默认false
* `extra-config`：ueditor配置项,如与预设相同,则会覆盖之前的-->Object;非必传
* `@change`：内容改变监听-->返回当前内容

## 3. 方法
* `getExample`：获取当前ueditor的实例，可以使用其API

### 4. 组件预设ueditor配置
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

### 5. 官方文档
[http://fex.baidu.com/ueditor/#start-start](http://fex.baidu.com/ueditor/#start-start '文档')