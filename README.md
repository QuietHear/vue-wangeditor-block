# wangeditor组件 vue版(包含防止xss攻击)

## 安装
	npm i vue-wangeditor-block

### 0. 依赖组件
* 安装依赖 `npm i wangeditor`
* 安装依赖 `npm i xss`
* 选择安装 `npm i element-ui`

### 1. 参数
* `id`：组件唯一值-->String;必传;
* `v-model`：输入区对应的内容，双向绑定-->String;非必传
* `cname`：自定义class-->String;非必传
* `json-model`：数据绑定与返回设置为json格式-->Boolean;非必传;默认false
* `diy-alert`：自定义提示事件-->Function;非必传;默认使用element的$message
* `upload-url`：图片上传的接口,后端要看最后的文档-->String;非必传
* `http-params`：请求附带参数-->Object;非必传
* `diy-upload-img`：自定义上传图片事件-->Function;非必传
>
	function (resultFiles, insertImgFn) {
	    // resultFiles 是 input 中选中的文件列表
	    // insertImgFn 是获取图片 url 后，插入到编辑器的方法
	    // 上传图片，返回结果，将图片插入到编辑器中
	    insertImgFn(imgUrl)
	}
>

* `only-show`：只展示内容-->Boolean;非必传;默认false
* `extra-config`：wangeditor配置项,如与预设相同,则会覆盖之前的-->Object;非必传
* `@focus`：鼠标在输入框聚焦-->返回当前内容
* `@blur`：鼠标在输入框失去焦点-->返回当前内容
* `@change`：内容改变监听-->返回当前内容

## 2. 方法
* `getExample`：获取当前ueditor的实例，可以使用其API

### 3. 组件预设wangeditor配置项
	// 空值提示字
	placeholder: "",
	// 初始化是否自动鼠标聚焦
	focus: true, 

### 4. 注意事项
extra-config传入的配置中`onfocus`、`onblur`、`onchange`、`customAlert`、`uploadImgServer`、`uploadImgParams`、`customUploadImg`是不会生效的，必须使用对应参数才行

### 5. 官方文档
[http://www.wangeditor.com/doc/](http://www.wangeditor.com/doc/ '文档')