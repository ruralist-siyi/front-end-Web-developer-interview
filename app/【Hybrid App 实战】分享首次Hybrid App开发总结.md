![home image](https://user-gold-cdn.xitu.io/2019/11/4/16e35a571f2b91af?w=454&h=307&f=jpeg&s=14726)
### 一、前言：为什么要选用Hybrid App技术?
#### 1. 背景
之前就职于一家较小的金融科技公司（base HangZhou），由于大环境的不景气，公司同事也变动比较大，原先的ios工程师已离职，android工程师已转为java后台开发。公司本来打算放弃掉app端的业务，但是今年6月中旬又意外接到某民营银行的p2p外包业务，需要开发终端app（工期两个月）。
#### 2. 技术选型

##### 1. 原生开发
实际上公司之前是有开发过相同业务场景的app的，我们首先想到的第一个解决方案是否可以将相似app仅修改少部分UI来避免二次开发。后来派我方产品人员进行需求沟通的时候发现与之前开发的那套app主流程基本不一致，而且没有ios同学进行二次开发遂放弃。

##### 2. Flutter
Flutter是目前非常火热的一门跨平台技术。利用Dart语言，也支持AOT以及JIT两种编译方式。Flutter的渲染不依靠原生平台，而是通过自己的SKia渲染引擎，所以对于多端的表现一致性上是比RN优秀的。但是能力有限，我也只是demo阶段学习。遂本次开发也不会采用。（目前自己也是学习 中）

##### 3. React Native
之前公司前端团队（也就在1-3人浮动）一直由我主导使用的是React技术栈，但是大多都是应用在中后台管理系统，H5端使用的是Vue技术栈。RN只有之前我只是简单的写过demo，也没有过实战经验。RN虽然支持跨端，但是在各平台的表现形式上还是有一定差异,RN中与原生的交互需要太多的原生平台知识的支撑。考虑成本以及可行性遂放弃。（目前自己在研究RN 中）

##### 4. Hybrid

Hybrid技术也就是混合开发，将我们的H5页面嵌到Native App的Webview中。通过JSBridge来作为H5与Native之间的桥梁，H5可以传递数据以及调用Natvie的方法，反之Native亦可与H5通信。这样我们通过一套h5页面就是可以同时覆盖到安卓与ios两端。（目前市面上有较多成熟的Hybird框架：AppCan、cordova等）时间成本最低但是性能最差的方案（与客户沟通后，客户同意使用此技术方案）。

### 二、Hybrid技术原生与H5交互的实现方式有哪些？（JsBridage 原理）
##### 1. 拦截 URL SCHEME

1. URL SCHEME 是一种类似于url的链接，是为了方便app直接互相调用设计的，形式和普通的 url 近似，主要区别是 protocol 和 host 一般是自定义的。例如: jsbridge://methodName?param1=value1&param2=value2；
2. 主要流程是：Web 端通过某种方式（例如 iframe.src）发送 URL Scheme 请求，之后 Native 拦截到请求并根据 URL SCHEME（包括所带的参数）进行相关操作。
3. 缺点：使用 iframe.src 发送 URL SCHEME 会有 url 长度的隐患。
4. 注意点：为什么选择 iframe.src 不选择 locaiton.href ？因为如果通过 location.href 连续调用 Native，很容易丢失一些调用。

##### 2. 注入api/对象

原理：通过WebView提供的接口向js的context（window）注入一个对象或者方法，js调用时，直接执行对应的Native代码逻辑。

##### 3. 改写浏览器原有对象

1. 原理：使用prompt,console.log,alert方式，在android webview这一层可以重写这些方法。一般常使用prompt，因为这个在js里使用的不多，用来和native通讯副作用比较少。
2. 举例：Web页面通过调用prompt()方法，安卓客户端通过监听onJsPrompt事件，拦截传入的参数，如果参数符合一定协议规范，那么就解析参数，扔给后续的Java去处理。这种协议规范，最好是跟iOS的协议规范一样，这样跨端调起协议是一致的，但具体实现不一样而已。比如：hybrid://action?arg1=1这样的协议，而其他格式的prompt参数，是不会监听的，即除了hybrid://action?arg1=1这样的规范协议，prompt还是原来的prompt。

### 三、我在项目中是如何进行原生与H5交互的
##### 1. h5调用app里的方法（暴露一个java对象给js，使得js可以直接调用方法）
```
// android端代码
// 将Android里面定义的类对象AndroidJs暴露给javascript
webView.addJavascriptInterface(new AppJs(mContext), "AppJs");

// h5端代码
closeKeyboard() {
    AppJs.closeKeyboard();
 },
```
##### 2. app调用h5中的方法（拦截到指定的url调用js挂在window对象上的方法）
```
// h5端代码
mounted() {
    window["getAppResult"] = result => {
      if (result) {
        router.push({
          path: "/account/open/next",
          query: { bankAccountName: this.name, certNo: this.certNo }
        });
      } else {
        Toast.succeed("活体检测失败");
      }
    };
  }
  
 // android端代码
  webView.evaluateJavascript("javascript:getAppResult(true)",
    new ValueCallback<String>() {
        @Override
        public void onReceiveValue(String s) {
    
        }
    });
```
### 四、 Hybrid的缺点
1. 基于Webview,WebView 的渲染性能比Native差很多;
2. JavaScript 是解释执行语言，运行效率也比 Native 差;

###  五、如果采用Hybrid技术，如何优化我们的项目
1. 使用离线包来解决网页加载速度慢的问题；（好文推荐:[转转hybrid app web静态资源离线系统实践](https://www.cnblogs.com/zhuanzhuanfe/archive/2018/02/22/8458414.html)）
2. H5代码自身优化Dom渲染等提升网页渲染效率；

#### 参考文献
* [Hybrid 开发：JsBridge - Web和客户端的桥 ](sohu.com/a/129512991_463970)
* [移动混合开发中的 JSBridge](https://blog.csdn.net/lovenjoe/article/details/78423616)