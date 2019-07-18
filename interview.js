// 盒模型与box-sizing

/**
 * 盒模型包括： content + padding + border + margin
 * 两种盒子： 
 *  1. W3C标准盒模型：width/height = content的width/height;
 *  2. IE盒模型： width/height = content的width/height + border;
 * box-sizing是CSS3的新属性：允许以特定的方式定义匹配某个区域的特定元素。
 * 属性值：
 *  1. content-box: width/height = content的width/height;
 *  2. border-box: width/height = content的width/height + border;
 *  3. inherit: 从父元素继承;
 */


 // BFC
 /**
  * 1. 什么是FC?
  * 页面中的一块渲染区域，有一套渲染规则，决定了其子元素如何布局，以及和其他元素之间的关系和作用。
  * 最常见的 Formatting context 有 Block fomatting context (简称BFC)和 Inline formatting context (简称IFC)。 
  * 
  * 2. 什么是BFC块格式化上下文?
  * 它是一个独立的渲染区域，只有Block-level box参与， 它规定了内部的Block-levelBox如何布局，并且与这个区域外部毫不相干。
  * 
  * 3. BFC的布局规则？
  *     1. 内部的Box会在垂直方向，一个接一个地放置;Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠;
  *     2. BFC的区域不会与float box重叠;计算BFC的高度时，浮动元素也参与计算;
  *     3. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素；
  * 
  * 4. 如何形成BFC?
  *     1. display 为以下其中之一的值 inline-blocks，table-cells，table-captions； （display: flow-root(为BFC打造,触发BFC,无副作用)）;
  *     2. float的值不为none;
  *     3. overflow的值不为visible;
  *     4. position的值不为relative和static;
  *     5. css3中flex boxes;
  * 
  * 5. BFC解决的问题？
  *     1. 解决父子嵌套元素在垂直方向的margin,父子元素是结合在一起的,他们两个的margi会取其中最大的值;（margin塌陷问题）
  *     2. 不被浮动元素覆盖；
  *     3. 浮动元素无法撑起父元素;
  */


  // 清浮动的方式
  /**
   * 1. 伪元素清浮动
   * .box {content: '', display: block; height: 0; visibility: hidden; clear: both;}
   * 2. 添加额外标签
   * 浮动元素末尾添加一个空的标签例如 <div style=”clear:both”></div>
   * 3. 父元素设置 overflow：hidden
   * 4. 父元素也设置浮动
   */


 // HTTP： 无状态的、无连接的、单向的应用层协议，采用请求/响应模式。即，通信请求只能由客户端发起，服务端对请求做出应答处理。
/**
 * 1. http协议
 * http协议其实就是超文本传输协议，超文本传输协议 (HTTP-Hypertext transfer protocol) 是一种详细规定了浏览器和万维网服务器之间互相通信的规则。
 * 
 * 2. TCP协议
 * 传输控制协议（TCP，Transmission Control Protocol）是为了在不可靠的互联网络上提供可靠的端到端字节流而专门设计的一个传输协议。TCP协议的作用是，保证数据通信的完整性和可靠性，防止丢包。
 * 
 * TCP协议对应于传输层，而HTTP协议对应于应用层，从本质上来说，二者没有可比性。Http协议是建立在TCP协议基础之上的
 * 
 * 3. 影响一个 HTTP 网络请求的因素主要有两个：带宽和延迟。
 * 
 * 4. HTTP1.0和HTTP1.1的一些区别
 * HTTP1.1则在1999年才开始广泛应用于现在的各大浏览器网络请求中，同时HTTP1.1也是当前使用最为广泛的HTTP协议。 
 *  1. 缓存处理，在HTTP1.0中主要使用header里的If-Modified-Since,Expires来做为缓存判断的标准，
 *     HTTP1.1则引入了更多的缓存控制策略例如Entity tag，If-Unmodified-Since, If-Match, If-None-Match等更多可供选择的缓存头来控制缓存策略。
 *  2. 带宽优化及网络连接的使用，HTTP1.0中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能，
 *     HTTP1.1则在请求头引入了range头域，它允许只请求资源的某个部分，即返回码是206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。
 *  3. 错误通知的管理，在HTTP1.1中新增了24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。
 *  4. Host头处理，在HTTP1.0中认为每台服务器都绑定一个唯一的IP地址，因此，请求消息中的URL并没有传递主机名（hostname）。但随着虚拟主机技术的发展，
 *     在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个IP地址。HTTP1.1的请求消息和响应消息都应支持Host头域，
 *     且请求消息中如果没有Host头域会报告一个错误（400 Bad Request）。
 *  5. 长连接，HTTP 1.1支持长连接（PersistentConnection）和请求的流水线（Pipelining）处理，在一个TCP连接上可以传送多个HTTP请求和响应，减少了建立和关闭连接的消耗和延迟，
 *     在HTTP1.1中默认开启Connection： keep-alive，一定程度上弥补了HTTP1.0每次请求都要创建连接的缺点。
 * 
 * 5. HTTPS与HTTP区别
 *  1. 区别
 *      1. https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。
 *      2. http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。
 *      3. http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443.
 *      4. http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。
 * 2. 步骤
 *      1. 客户使用https的URL访问Web服务器，要求与Web服务器建立SSL连接。
 *      2. Web服务器收到客户端请求后，会将网站的证书信息（证书中包含公钥）传送一份给客户端。
 *      3. 客户端的浏览器与Web服务器开始协商SSL连接的安全等级，也就是信息加密的等级。
 *      4. 客户端的浏览器根据双方同意的安全等级，建立会话密钥，然后利用网站的公钥将会话密钥加密，并传送给网站。
 *      5. Web服务器利用自己的私钥解密出会话密钥。
 *      6. Web服务器利用会话密钥加密与客户端之间的通信。
 */

// HTTP状态码(开发中，很多时候状态码与状况不一致。因为返回状态码200， 把错误信息抱在了response中)

 /**
  * 1. 2xx: success状态码.
  *     1. 200: OK; 请求成功且正常返回;
  *     2. 204: NO CONTENT; 请求成功但是没资源返回;
  *     3. 206: PARTIAL CONTENT; 对某部分的资源进行请求成功（通过Header中的字段: 客户端：Range, 服务端响应：Content-Range, 并行下载与断点续传的支持）;
  * 
  * 2. 3xx: Redirction重定向状态码.响应结果表明浏览器需要执行某些特殊的处理以正确处理请求.
  *     1. 301: Moved Permanently; 永久重定向, 资源被永久的分配到新的资源地址URL;
  *     2. 302: Found; 临时性重定向,请求的资源已被分配了新的 URI，希望用户(本次)能使用新的 URI 访问;
  *     3. 304:  Not Modified; 是浏览器和服务器多确认了一次缓存有效性，再用的缓存;
  * 
  * 3. 4xx: Client Error 客户端错误状态码.
  *     1. 400: Bad Request; 请求报文中存在语法错误;
  *     2. 401: Unauthorized; 用来表示缺失或错误的认证(gateway 检测token throw 401);
  *     3. 403: Forbidden; 当用户被认证后，但用户没有被授权在特定资源上执行操作;
  *     4. 404:  Not Found; 请求的资源找不到;
  *    
  * 4. 5xx: Server Error 服务器错误状态码.
  *     1. 502: Bad GateWay; 网关或代理角色的服务器出错。
  *     2. 503: Service Unavailable; 该状态码表明服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。
  */


// HTTP缓存机制

  /**
   * 1. 强制缓存(服务器通知浏览器一个缓存时间，在缓存时间内，下次请求，直接用缓存，不在时间内，执行比较缓存策略。200(from cache))
   
   * 强缓存相关的HTTP header 的字段有两个 Expires以及Cache-Control
   *    1. Expires: 缓存的过期时间：时间期限是服务器生成，存在着客户端和服务器的时间误差。(效果等同于Cache-Control的max-age,
   *       如果有max-age会覆盖expires，如果二者都设置可能是为了兼容性，Expires是HTTP 1.0的，Cache-Control 是 HTTP 1.1 的字段。)
   *    2. Cache-Control: 字段值定义为no-cache并不是说，不准使用缓存，而是需要走接下来的优先级相对较低的另一类--协商缓存。真正决定不用缓存内的资源是将该值定义为no-store。
   * 
   * 2. 协商缓存(将缓存信息中的Etag和Last-Modified通过请求发送给服务器，由服务器校验. 304)
   
   *    1. Last-Modified/If-Modified-Since: Last-Modified是服务器在响应请求时，告诉浏览器资源的最后修改时间。If-Modified-Since：再次请求服务器时，
   *       通过此字段通知服务器上次请求时，服务器返回的资源最后修改时间。服务器收到请求后发现有头If-Modified-Since 则与被请求资源的最后修改时间进行比对。
   *       若资源的最后修改时间大于If-Modified-Since，说明资源又被改动过，则响应整片资源内容，返回状态码200；若资源的最后修改时间小于或等于If-Modified-Since，
   *       说明资源无新修改，则响应HTTP 304，告知浏览器继续使用所保存的cache。

   *    2. Etag/If-None-Match（优先级高于Last-Modified/If-Modified-Since）: Etag:服务器响应请求时，告诉浏览器当前资源在服务器的唯一标识（生成规则由服务器决定）;
   *       If-None-Match: 再次请求服务器时，通过此字段通知服务器客户段缓存数据的唯一标识。服务器收到请求后发现有头If-None-Match 则与被请求资源的唯一标识进行比对，
   *       不同，说明资源又被改动过，则响应整片资源内容，返回状态码200；相同，说明资源无新修改，则响应HTTP 304，告知浏览器继续使用所保存的cache。
   */


   // 输入url到页面加载发生了什么？
   /**
    * 1. DNS解析 （1. 浏览器先搜索自己的DNS缓存。 2. 搜索操作系统中的缓存。 3. 搜索hosts文件。 4. 请求本地域名服务器。 5. 请求根域名服务器）.
    * 2. TCP连接
    * 3. 发送HTTP请求
    * 4. 服务器处理请求并返回HTTP报文
    * 5. 浏览器解析渲染页面
    * 
    * TCP的三次握手与四次挥手（https://www.imooc.com/article/20402）
    * 
    * 1. 名词解释
    * tcp:transmission control protocol（传输控制协议）
    * SYN:synchronous，表示建立连接
    * ACK:acknowledgement，确认，表示响应
    * PSH:push 表示有data数据的传送
    * FIN:finish 结束，即关闭连接
    * RST:reset 重置
    * URG:urgent 紧急
    * Sequence number:顺序号码
    * Acknowledge number:确认号码
    * 
    * 2. 三次握手
    *  1. client发送SYN=1，随机产生seq=m的数据包到server，并进入SYN_SENT状态，server发现SYN=1，知道client要建立连接。
    *  2. server要发 送确认信息，向client发送ack number（m+1），SYN=1，ACK=1，以及自己随机产生的seq=n，并进入SYN_RCVD状态。
    *  3. client检查ack number是否正确，以及ACK=1，如果正确，则发送ack number（n+1）和ACK=1，server收到后确认seq和ACK=1，
    *     确认后则连接成功，双方进入ESTABLISHED状态。
    * 
    * 3. 四次挥手
    *   1. client发送一个FIN=1，和一个seq=m，用来关闭和server的数据传输，并进入FIN_WAIT_1的状态。（注意：这里client发出FIN，只是代表client不会向server传送数据，但是server依然可以向client传送数据）
    *   2. server收到FIN之后，发送一个ACK=1加上m+1到client，并进入CLOSE_WAIT状态。
    *   3. server发送一个FIN=1加上一个seq=k到client，用来关闭和client的数据传输，并进入LAST_ACK状态。
    *   4. client收到FIN后，发送ACK=1加上k+1到server，并进入TIME_WAIT状态，server收到后进入CLOSED状态，双方连接关闭。
    */

 // Websocket
 /**
  * 浏览器可以通过JavaScript借助现有的HTTP协议来向服务器发出WebSocket连接的请求，当连接建立后，客户端和服务器端就可以直接通过TCP连接来直接进行数据交换。
  * 这是由于websocket协议本质上就是一个TCP连接，所以在数据传输的稳定性和传输量上有所保证.
  * 
  * ws协议：普通请求，占用与HTTP相同的80端口。
  * wss协议：基于SSL的安全传输，占用与TLS相同的443端口。
  * 
  * 
  * Socket.IO就是对WebSocket的封装，并且实现了WebSocket的服务端代码。
  * Socket.IO将WebSocket和轮询（Polling）机制以及其它的实时通信方式封装成了通用的接口，并且在服务端实现了这些实时机制的相应代码。
  * 
  * 心跳检测（reconnecting-websocket库）
  */ 

 const ws = new WebSocket();
 const heartCheck = {
    timeout: 60000,
    timeoutObj: null,
    reset: function(){
        clearTimeout(this.timeoutObj);
        this.start();
    },
    start: function(){
        this.timeoutObj = setTimeout(() => {
            ws.send('HeartBeat');
        },this.timeout)
    },
  };
  
  ws.onopen = function(){
    heartCheck.start();
  };
  ws.onmessage = function(event){
    heartCheck.reset();
  };

// less中的要点
/**
 * 1. mixins and extend
 *  1. mixins可以带来样式的复用这个有点，但是编译出来的时候每一个使用了mixins的选择器都重复出现你的复用样式，很冗余。
 *  2. extend可以解决mixins编译出来冗余的问题，但是如果你想进行传入参数这种操作，还是选择mixins.
 * 
 *2. mixins带参数，参数还有默认值(多行文本溢出)
 *  .text-ellipsis(@line: 1) {
 *      overflow:hidden; //超出的文本隐藏
 *      text-overflow:ellipsis; //溢出用省略号显示
 *      white-space:nowrap; //溢出不换行
 *      display: -webkit-box;
 *      -webkit-line-clamp: @line;
 *      -webkit-box-orient: vertical;
 *  }
 * .use {.text-ellipsis(3)}
 * 
 * 3. 继承的写法
 * .box {height: 100px}  
 * .box1: extend(.box) {width: 100px;}
 * 
 * 4. 定义变量
 * @color: #61A34F;
 * 
 * 5. 注释格式
 * 
 * 6. 导入
 * @import "path"
 * */   
/* 这种类型的格式会被转换到生成的css文件 */ 
// 这种类型的格式不会被转换到生成的css文件



// 认识requestAnimationFrame

/**
 * 定义：将告知浏览器你马上要开始动画效果了，后者需要在下次动画前调用相应方法来更新画面。这个方法就是传递给window.requestAnimationFrame()的回调函数。
 * 接收一个函数作为回调，返回一个ID值，通过把这个ID值传给window.cancelAnimationFrame()可以取消该次动画。
 * requestAnimationFrame 不需要程序员自己设置时间间隔。setTimeout 和 setInterval 的问题是精确度低。
 * 它们的内在运行机制决定了时间间隔参数实际上只是指定了把动画代码添加到浏览器 UI 线程队列中以等待执行的时间。如果队列前面已经加入了其他任务，那动画代码就要等前面的任务完成后再执行。
 * 
 * 与setTimeout相比，requestAnimationFrame最大的优势是由系统来决定回调函数的执行时机 。
 * 具体一点讲，如果屏幕刷新率是60Hz,那么回调函数就每16.7ms被执行一次，如果刷新率是75Hz，那么这个时间间隔就变成了1000/75=13.3ms，
 * 换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，
 * 这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。
 * 
 *  1. CPU节能：使用setTimeout实现的动画，当页面被隐藏或最小化时，setTimeout 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费CPU资源。
 *  2. 函数节流：在高频率事件(resize,scroll等)中，为了防止在一个刷新间隔内发生多次函数执行，使用requestAnimationFrame可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。
 */


 // 手写一个快速排序

 function quickSort(arr) {
    if(Array.isArray(arr) && arr.length > 1) {
        // 找出基准坐标
        let pivotIndex = Math.floor(arr.length/2);
        // 找到基准坐标的值
        let privot = arr.splice(pivotIndex, 1)[0];
        let left = [], right = [];
        for(let value of arr) {
            if(value < privot) {
                left.push(value)
            }else {
                right.push(value)
            }
        }
        return quickSort(left).concat(privot).quickSort(right);
    }else {
        return arr;
    }
 }

// 手动实现call、appy、bind

Function.prototype.myCall = function (newThis, ...rest) {
    if (typeof this !== 'function') {
        throw new Error(this + 'must be a function');
    }
    newThis = newThis || window; // 如果传入的是undifined、null指向window
    newThis.fn = this;
    const result = newThis.fn(...rest.slice(1));
    delete newThis.fn;
    return result;
}

Function.prototype.myBind = function (newThis, ...rest) {
    if (typeof this !== 'function') {
        throw new Error(this + 'must be a function');
    }
    const _this = this;
    const bind = function (...args) {
        // 可能返回了一个构造函数，我们可以 new F()，所以需要判断
        if (this instanceof bind) {
            return new _this(...args, ...arguments)
        }
        return _this.apply(newThis, rest.concat(args));
    }
    return bind;
}

// web安全（XSS攻击、CSRF攻击、点击劫持、SQL注入）
/**
 * 1. 什么是XSS攻击
 *  XSS(Cross-Site Scripting，跨站脚本攻击)是一种代码注入攻击。攻击者在目标网站上注入恶意代码，当被攻击者登陆网站时就会执行这些恶意代码，这些脚本可以读取 cookie，session tokens，
 *  或者其它敏感的网站信息，对用户进行钓鱼欺诈，甚至发起蠕虫攻击等。（本质：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行。）
 * 2. 如何预防
 *  1. 输入内容长度控制
 *  2. 输入内容限制（过滤特殊字符等）
 *  3. 服务器端对 Cookie 设置HTTP-only Cookie: 禁止 JavaScript 读取某些敏感 Cookie
 *  4. 验证码：防止脚本冒充用户提交危险操作。
 * 
 * 1. CSRF（Cross-site request forgery）跨站请求伪造
 *  它与XSS非常不同，XSS利用站点内的信任用户，而CSRF则通过伪装成受信任用户的请求来利用受信任的网站。
 *  与XSS攻击相比，CSRF攻击往往不大流行（因此对其进行防范的资源也相当稀少）和难以防范，所以被认为比XSS更具危险性。
 *  CSRF攻击是源于Web的隐式身份验证机制。Web的身份验证机制虽然可以保证一个请求是来自于某个用户的浏览器，但却无法保证该请求是用户批准发送的。CSRF攻击的一般是由服务端解决。
 * 2. 如何预防
 *  1. 不让第三方网站访问到用户 Cookie，阻止第三方网站请求接口。判断请求的来源：检测Referer(并不安全，Referer可以被更改)
 *  2. 使用Token(主流)
 * 
 * 1. 点击劫持
 *  点击劫持是指在一个Web页面中隐藏了一个透明的iframe，用外层假页面诱导用户点击，实际上是在隐藏的frame上触发了点击事件进行一些用户不知情的操作。
 * 2. 如何预防
 * 1. 配置 nginx 发送 X-Frame-Options 响应头，这样浏览器就会阻止嵌入网页的渲染。
 * 2. 判断顶层视口的域名是不是和本页面的域名一致，如果不一致就让恶意网页自动跳转到我方的网页。if (top.location.hostname !== self.location.hostname)
 * 
 * 1. SQL注入
 *  通过把SQL命令插入到Web表单提交或输入域名或页面请求的查询字符串，最终达到欺骗服务器执行恶意的SQL命令。
 * 2. 如何预防
 *  1. 永远不要信任用户的输入。对用户的输入进行校验，可以通过正则表达式，或限制长度；对单引号和 双"-"进行转换等。
 *  2. 永远不要使用管理员权限的数据库连接，为每个应用使用单独的权限有限的数据库连接。
 *  3. 不要把机密信息直接存放，加密或者hash掉密码和敏感的信息。
 */


 // 前端路由
 /**
  * 1. hash模式
  * hash 值的变化不会导致浏览器像服务器发送请求，而且 hash 的改变会触发 hashchange 事件，浏览器的前进后退也能对其进行控制，所以在 H5 的 history 模式出现之前，基本都是使用 hash 模式来实现前端路由。
  * 
  * 2. history 模式
  *     1. HTML5 之前，浏览器就已经有了 history 对象。但在早期的 history 中只能用于多页面的跳转 history.go(-1); history.forward(); history.back();   
  *     2. 在 HTML5 的规范中，history 新增了以下几个 API;
  *         1. history.pushState();  // 添加新的状态到历史状态栈 ,在保留现有历史记录的同时，将 url 加入到历史记录中。
  *         2. history.replaceState();  // 用新的状态代替当前状态,  会将历史记录中的当前页面历史替换为 url。
  *         3. history.state // 返回当前状态对象
  * 
  *     history.pushState() 和 history.replaceState() 可以改变 url 同时，不会刷新页面，所以在 HTML5 中的 histroy 具备了实现前端路由的能力。
  * 
  * 3. hash 模式相比于 history 模式
  *   优点： 1. 兼容性更好，可以兼容到IE8 2. 无需服务端配合处理非单页的url地址
  *   缺点： 1. 相同 hash 值不会触发动作将记录加入到历史栈中，而 pushState 则可以。 2. 看起来更丑。 3. 会导致锚点功能失效
  */