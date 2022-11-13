# wangeditor组件 vue2版(包含防止xss攻击)
[**vue3版本**](https://github.com/QuietHear/vue-wangeditor-block-plus '浏览') | ***vue2版本*** 


## 安装
	npm i vue-wangeditor-block

## 使用
	import vueWangeditorBlock from 'vue-wangeditor-block';
	
	Vue.use(vueWangeditorBlock);


## 0. 依赖组件
>
	// 已经集成了的
	wangeditor、xss、i18next
>
* 选择安装 `npm i element-ui`


## 1. 参数
* `id`：组件唯一值-->String;必传;
* `v-model`：输入区对应的内容，双向绑定-->String;非必传
* `cname`：自定义class-->String;非必传
* `json-model`：数据绑定与返回设置为json格式-->Boolean;非必传;默认false
* `open-xss`：开启xss防护,开启后可能会丢失部分样式-->Boolean;非必传;默认true
* `i18next`：标题开启国际化-->Boolean;非必传;默认false
* `language`：设置语言种类-->String;非必传;默认'zh-CN'
>
	zh-CN/en
>

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

* `diy-menus`：自定义菜单列表-->Array;非必传
>
	// 菜单添加成功后默认是放在最后一个,可以使用config进行调整位置
	// 数组每个item必须为对象格式,如下:
	{
		// 菜单的唯一值,必须有,必须不能重复,且不能与系统预设的冲突
	    key: "alertMenuKey",
		// 菜单的填充html片段内容
	    text:'<button>alert</button>',
		// 鼠标放上提示
	    title:'提示',
		// 菜单类型:normal(默认值,单按钮)、list(下拉列表)
		menuType:'',
		// type-->list,列表宽,不写默认100
		listWidth:100,
		// type-->list,列表头部标题,不写默认''
		listTitle:'设置标题',
		// type-->list,英文格式,不写默认去中文标题
        listTitleEn:'',
		// type-->list,下拉列表,不写默认为空
		listMap:[
			{
				key:'列表项对应的html片段内容',
				value:'点击事件返回的唯一值',
			}
		]
		//
		//
		// 1. 当内容改变的时候会返回一个菜单激活事件 key+'CheckActive'(menu,editor);
		// 事件名例如alertMenuKeyCheckActive(返回当前按钮对象,返回当前编辑器对象);
		// menu.active()/menu.unActive();为设置菜单激活/取消激活
        // 菜单是否被激活（如果不需要，这个函数可以空着）
        // ①. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活
        // ②. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
		//
		//
		// 2. type-->normal,单击事件会返回一个事件 key+'Click'(menu,editor);
		// 事件名例如alertMenuKeyClick(返回当前按钮对象,返回当前编辑器对象);
		//
		//
		// 3. type-->list,列表项单击事件会返回一个事件 key+'Click'(value,menu,editor);
		// 事件名例如alertMenuKeyClick(返回当前点击项对应的value值,返回当前按钮对象,返回当前编辑器对象);
	}
>

* `only-show`：只展示内容-->Boolean;非必传;默认false
* `extra-config`：wangeditor配置项,如与预设相同,则会覆盖之前的,除了自定义添加的菜单-->Object;非必传
* `@focus`：鼠标在输入框聚焦-->返回当前内容
* `@blur`：鼠标在输入框失去焦点-->返回当前内容
* `@change`：内容改变监听-->返回当前内容


## 2. 方法
* `getExample`：获取当前ueditor的实例，可以使用其API


## 3. 组件预设wangeditor配置项
	// 空值提示字
	placeholder: "",
	// 初始化是否自动鼠标聚焦
	focus: true, 


## 4. 注意事项
extra-config传入的配置中`onfocus`、`onblur`、`onchange`、`customAlert`、`uploadImgServer`、`uploadImgParams`、`customUploadImg`是不会生效的，必须使用对应参数才行


## 5. 官方文档
[http://www.wangeditor.com/doc/](http://www.wangeditor.com/doc/ '文档')


## todo:
自定义菜单目前只扩展了普通按键与下拉列表,其他的还未实现