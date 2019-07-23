// 盒模型与box-sizing

/**
 * 盒模型包括： content + padding + border + margin
 * 两种盒子： 
 *  1. W3C标准盒模型：width/height = content的width/height;
 *  2. IE盒模型： width/height = content的width/height + border + padding;
 * 
 * box-sizing是CSS3的新属性：允许以特定的方式定义匹配某个区域的特定元素。
 * 属性值：
 *  1. content-box: width/height = content的width/height;
 *  2. border-box: width/height = content的width/height + border + padding;
 *  3. inherit: 从父元素继承;
 */


 // 选择器
 /**
  * 1. 标签选择器 p {color: red;}
  * 2. id选择器  #text {color: blue;}
  * 3. 类选择器   .header {height: 100px;}
  * 4. 交集选择器  选择p并且class="text"的元素: p.text{background: yellow;}
  * 5. 并集选择器  选择p以及class="text"的元素  p,.text {background: yellow}
  * 6. 后代选择器  也叫包含选择器： 不管层级，后面的所有   .box p a{font-size: 10px;}
  * 7. 子元素选择器  不是所有,而是仅仅下一个层级 .box>p>a{font-size: 20px;}
  * 8. 属性选择器   input[type="text"]{color: blue;}
  * 9. 结构伪类选择器    a:link{ color: #ff6600 }
  * 10. UI状态伪类选择器 a:hover {color: red;}
  * 11. 兄弟选择器  子元素之后的同级兄弟元素: span~p{color: blue;}  选择紧接在另一个元素后的元素，而且二者有相同的父元素: span+p {color: red;}
  * 12. 通配符选择器  *{padding: 0; margin: 0;}
  * 13. 伪元素选择器 div::before {content: '我是插入的内容', background: red;}
  * 
  * 选择器权重
  * !important > 内联(1000) > ID(0100) > 伪类|类 | 属性选择(0010) > 标签(0001) > 通配符、子选择器、相邻选择器(0000) > 继承 > 浏览器默认属性
  * 
  * CSS选择除前两个和最后两个以外的所有子元素：
  * :nth-child(n+3):not(:nth-last-child(-n+2))
  * :nth-child(n+3):nth-last-child(n+3)
  */


 // 伪类与伪元素
 /**
  * 1. 二者区别
  *     1. 伪类本质上是为了弥补常规CSS选择器的不足，以便获取到更多信息；
  *     2. 伪元素本质上是创建了一个额外的元素；
  *     3. CSS3规范中要求使用双冒号(::)表示伪元素，以此来区分伪元素和伪类。（IE8及以下的一些浏览器不兼容双冒号）;
  * 
  * 2. 伪类：
  *     1. 表示状态: 
  *         1. :link　　　选择未访问的链接；
  *         2. :visited　 选择已访问的链接；
  *         3. :hover　　选择鼠标指针移入链接；
  *         4. :active　　被激活的链接，即按下单击鼠标左键但未松开；
  *         5. :focus　　选择获取焦点的输入字段；
  *     2. 结构化伪类：
  *         1. :not　　　　　　否定伪类，用于匹配不符合参数选择器的元素；
  *         2. :first-child　　 匹配元素的第一个子元素；
  *         3. :last-child　　  匹配元素的最后一个子元素；
  *         4. :nth-child　　  :nth-child根据元素的位置匹配一个或者多个元素，它接受一个an+b形式的参数（an+b最大数为匹配元素的个数）； :nth-of-type(odd) 奇数 :nth-of-type(even) 偶数
  *     3. 表单相关伪类：
  *         1. :checked　　匹配被选中的input元素，这个input元素包括radio和checkbox；
  *         2. :default　　  匹配默认选中的元素，例如：提交按钮总是表单的默认按钮；
  *         3. :disabled　  匹配禁用的表单元素；
  *         4. :required　　匹配设置了required属性的表单元素；
  * 
  * 3. 伪元素：
  *     1. ::before/:before　 　在某个元素之前插入一些内容；
  *     2. ::after/:after　　　　在某个元素之后插入一些内容；
  *     3. ::first-letter/:first-letter　　为某个元素中的文字的首字母或第一个字使用样式；
  *     4. ::first-line/:first-line　　　　为某个元素的第一行文字使用样式
  *     5. ::selection　　　　 匹配用户被用户选中或者处于高亮状态的部分；
  *     6. ::placeholder　  　 匹配占位符的文本，只有元素设置了placeholder属性时，该伪元素才能生效；
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
   * .box::after {content: '', display: block; height: 0; visibility: hidden; clear: both;}
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
 * 传输控制协议（TCP，Transmission Control Protocol）是为了在不可靠的互联网络上提供可靠的端到端字节流而专门设计的一个传输协议。
 * TCP协议的作用是，保证数据通信的完整性和可靠性，防止丢包。
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

  // DOM事件流
  /**
   * 当一个DOM事件触发时，它不是在触发的对象上只触发一次的，而是经历三个阶段。
   * 1. 一开始从文档的根节点流向目标对象（捕获阶段）：它认为当某个事件发生时，父元素应该更早接收到事件，具体元素则最后接收到事件。
   * 2. 然后在目标对向上被触发（目标阶段）
   * 3. 之后再回溯到文档的根节点（冒泡阶段）：事件冒泡即事件开始时，由最具体的元素接收（也就是事件发生所在的节点），然后逐级传播到较为不具体的节点。（IE事件流）
   * 
   * 任何发生在w3c事件模型中的事件，首是进入捕获阶段，直到达到目标元素，再进入冒泡阶段
   * 
   * 可以选择是在捕获阶段还是冒泡阶段绑定事件处理函数，这是通过addEventListener()方法实现的，如果这个函数的最后一个参数是true(默认false)，则在捕获阶段绑定函数，反之false，在冒泡阶段绑定函数。
   * 
   * stopPropagation()阻止冒泡
   * 
   * 事件委托： 利用事件的冒泡原理来实现的，既然点击子元素，也会触发父元素的点击事件，那我们完全可以将子元素的事件要做的事写到父元素的事件里，
   * 也就是将子元素的事件处理程序写到父元素的事件处理程序中，这就是事件委托；利用事件委托，只指定一个事件处理程序，就可以管理某一个类型的所有事件；
   * 
   * DOM0级事件: 通过将元素的事件处理程序属性（如onclick）的值设置为一个函数来指定事件处理程序的方法称为DOM0级方法，
   * 它被认为是元素的方法，这时候的事件处理程序是在元素的作用域中运行（也就是this引用当前元素);
   * 
   * DOM2级事件：通过addEventListener()方法和removeEventListener()方法来处理指定和删除事件处理程序，这里添加的事件处理程序也是在其依附的元素的作用域中运行。DOM2级方法的好处是可以添加多个事件处理程序。
   * 需要注意的是通过addEventListener()添加的事件只能使用removeEventListener()来移除，而且移除时传入的参数与添加时使用的参数要相同。
	 * 
	 * IE7、8兼容写法：attachEvent、detachEvent
   */
  
   // DOM 0 级
  var btn = document.getElementById('myBtn');
  btn.onclick = function() {};

  // DOM 2级
  var handler = function() {};
  btn.addEventListener("click",handler,false);

  /**
	 * instanceof: 判断一个实例是否属于某种类型，也可以在继承关系中用来判断一个实例是否属于它的父类型；
	 * 
	 * 对象都拥有__proto__属性指向其构造函数的prototype属性 也就是我们的原型；
	 * 函数对象才拥有prototype属性；
	 * 实例 __proto__ 到 原型对象 constructor 到 构造函数；
	 * 
	 * 几乎所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例。
	 * 
	 * 在 ES2015/ES6 中引入了 class 关键字，但那只是语法糖，JavaScript 仍然是基于原型的;
	 * 
	 * [[Prototype]] 可以通过 Object.getPrototypeOf() 和 Object.setPrototypeOf() 访问器来访问。这个等同于 JavaScript 的非标准但许多浏览器实现的属性 __proto__。
	 * 
	 * 每个实例对象（ object ）都有一个私有属性（称之为 __proto__ ）指向它的构造函数的原型对象（prototype ）。
	 * 该原型对象也有一个自己的原型对象( __proto__ ) ，层层向上直到一个对象的原型对象为 null。这就是原型链。
	 * 
   */

	var dog1 = new Dog();
	dog1.__proto__ === Dog.prototype; // true
	dog1.__proto__ === Object.prototype; // true
	Dog.prototype.constructor === Dog; // true

	// 实现new操作符
   function myInstanceof(L, R) {
			let RPrototype = R.prototype;
			let LProto = L.__proto__;
			while(true) {
				if(LProto === null) {
					return false;
				}else if(LProto === RPrototype) {
					return true;
				}
				LProto = LProto.__proto__;
			}
		}
		
		/**
		 *  new 的过程
		 * var obj = new Base();
		 * 
		 * 新生成了一个对象 var obj  = {};
		 * 链接到原型绑定  obj.__proto__ = Base.prototype;
		 * this返回新对象 Base.call(obj);
		 */

		 /**
			* redux
			* 把所有的state集中到组件顶部，能够灵活的将所有state各取所需的分发给所有的组件.给 React 应用提供「可预测化的状态管理」机制。
			*
			* 组件改变state的唯一方法是通过调用store的dispatch方法，触发一个action，这个action被对应的reducer处理，于是state完成更新.
			*	组件可以派发(dispatch)行为(action)给store,而不是直接通知其它组件.其它组件可以通过订阅store中的状态(state)来刷新自己的视图.
			*
			* 1. action
			*	用户是接触不到state的，只能有view触发，这个action可以理解为指令，需要发出多少动作就有多少指令
			* action是一个对象，必须有一个叫type的参数，定义action类型
			*
			* 2. reducer
			*	使用单独的一个reducer,也可以将多个reducer合并为一个reducer，即：combineReducers();
			* action发出命令后将state放入reucer加工函数中，返回新的state,对state进行加工处理
			*
			* 3. store
			* 使用createStore创建，整个应用状态(其实也就是数据)存储到到一个地方，称为store，这个store里面保存一棵状态树(state tree)；
			* 提供subscribe，dispatch，getState这些方法。
			*
			* view在redux中会派发一个action，action通过store的dispatch方法派发给store,store接收到action，
			* 连同之前到state，一起传给reducer，reducer返回一个新到数据给store,store去改变自己到state。这是redux的一个标准流程
			*
			* react-redux
			* 单纯的redux是借用了全局变量来进行管理store中的state，缺点太多。
			* react-redux把store直接集成到React应用的顶层props里面，只要各个子组件能访问到顶层props就行了.也就是利用了context;
			*
			*	1. Provider
			*	 接受Redux的store作为props，并将其声明为context的属性，这个组件的目的是让所有组件都能够访问到Redux中的数据。 
			*
			* 2. connect
			*	connect(mapStateToProps, mapDispatchToProps)(MyComponent)
			*
			*	 1. mapStateToProps
			*			把state映射到props中去 ,其实也就是把Redux中的数据映射到React中的props中去。
			*	 2. mapDispatchToProps
			*			把各种dispatch也变成了props让你可以直接使用
			* 
			* 中间件(中间件都是对store.dispatch()的增强)
			*	redux的中间件指的是action和store之间。之前我们说action只能是一个对象，所以action是一个对象直接派发给了store。但是现在，当我们使用了redux-thunk之后，action可以是函数了。
			*	const store = createStore(
      * 	reducers, 
      * 	applyMiddleware(thunk, logger)
      * );

			* 实际上redux中间件非常多，比如说我们说的redux-log，可以记录action每次派发的日志，那他怎么记录呢？其实也很简单，
			* 每次调用 action的时候，都会通过dispatch把这个action传递给store，那么我可以对dispatch做一个升级，dispatch不仅仅把action传递给store，
			* 而且在每次传递之前呢，还通过console.log把state打印出来；
			*
			* reducer又是一个纯函数，也就是不能再reducer中进行异步操作，往往实际中，组件中发生的action后，在进入reducer之前需要完成一个异步任务,比如发送ajax请求后拿到数据后，再进入reducer,显然原生的redux是不支持这种操作的；
			* 
			* redux-thunk、redux-saga
			*	redux-thunk是把异步操作放在action里面操作。而redux-saga采用的设计思想是，单独的把一个异步逻辑拆分出来，放在一个异步文件里面管理;
			*	redux-thunk最重要的思想，就是可以接受一个返回函数的action creator。
			*
			*
			* thunk与sage的区别
			* 1. saga 是通过 Generator 函数来创建的，意味着可以用同步的方式写异步的代码；
			* 2. Thunks 是在 action 被创建时才调用，Sagas 在应用启动时就开始调用，监听action 并做相应处理； （通过创建 Sagas 将所有的异步操作逻辑收集在一个地方集中处理）
			* 3. saga启动的任务可以在任何时候通过手动取消，也可以把任务和其他的 Effects 放到 race 方法里可以自动取消；
			* 4. 实际上 redux-saga 所有的任务都通用 yield Effects 来完成。
			* 
			* saga的优点
			* 1. 流程拆分更细，异步的action 以及特殊要求的action（更复杂的action）都在sagas中做统一处理，流程逻辑更清晰，模块更干净；
			* 2. 以用同步的方式写异步代码，可以做一些async 函数做不到的事情 (无阻塞并发、取消请求)
			* 3. 能容易地测试 Generator 里所有的业务逻辑
			*
			* saga的缺点
			* 1. action 任务拆分更细，原有流程上相当于多了一个环节。对开发者的设计和抽象拆分能力更有要求，代码复杂性也有所增加。
			* 2. 异步请求相关的问题较难调试排查;
		  */

			/**
			 * Flux 架构
			 * 分为四个部分：View、 Action、 Dispatcher、 Store
			 * 
			 * 视图先要告诉 Dispatcher，让 Dispatcher dispatch 一个 action，Dispatcher 就像是个中转站，收到 View 发出的 action，然后转发给 Store。
			 * 
			 * Dispatcher 的作用是接收所有的 Action，然后发给所有的 Store。这里的 Action 可能是 View 触发的，也有可能是其他地方触发的，比如测试用例。转发的话也不是转发给某个 Store，而是所有 Store。
			 * Store 的改变只能通过 Action，不能通过其他方式。也就是说 Store 不应该有公开的 Setter，所有 Setter 都应该是私有的，只能有公开的 Getter。
			 * 
			 * 
			 * Redux 与 Flux 异同点
			 * 1. redux 单一数据源：Flux 的数据源可以是多个。
			 * 2. redux State 是只读的：Flux 的 State 可以随便改。
			 * 3. redux 使用纯函数来执行修改：Flux 执行修改的不一定是纯函数。
			 * 4. Redux 和 Flux 一样都是单向数据流。
			 * 
			 * Vuex
			 * 1. State Vuex 使用单一状态树——是的，用一个对象就包含了全部的应用层级状态，将所需要的数据写放这里，类似于data。
			 * 2. Getter 有时候我们需要从 store 中的 state 中派生出一些状态，使用Getter，类似于computed。
			 * 3. Mutation 更改 Vuex 的 store 中的状态的唯一方法，类似methods。(mutation 是必须同步的，这个很好理解，和之前的  reducer 类似，不同步修改的话，会很难调试，不知道改变什么时候发生，也很难确定先后顺序)
			 * 4. Action Action 提交的是 mutation，而不是直接变更状态，可以包含任意异步操作，这里主要是操作异步操作的，使用起来几乎和mutations方法一模一样,类似methods。
			 * 5. Module 当应用变得非常复杂时，store 对象就有可能变得相当臃肿。Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。
			 * 
			 * Redux： view——>actions——>reducer——>state变化——>view变化（同步异步一样）
			 * Vuex： view——>commit——>mutations——>state变化——>view变化（同步操作） view——>dispatch——>actions——>mutations——>state变化——>view变化（异步操作）
			 */

			 /**
				* Mobx
				* 目前Mobx（3.x)和Vue（2.x)采用了相同的响应式原理: 为每个组件创建一个Watcher，在数据的getter和setter上加钩子，
				* 当组件渲染的时候（例如，调用render方法）会触发getter，然后把这个组件对应的Watcher添加到getter相关的数据的依赖中（例如，一个Set）。
				* 当setter被触发时，就能知道数据发生了变化，然后同时对应的Watcher去重绘组件。
				*
				* 在Mobx中，需要把数据声明为observable。
				* 在Mobx中，数组并不是一个Array，而是一个类Array的对象，这是为了能监听到数据下标的赋值。相对的，在Vue中数组是一个Array，但是数组下标赋值要使用splice来进行，否则无法被检测到。
			  */
				
			/**
			 * react this.props.children： 表示组件的所有子节点
			 * 可能值：1. 当前组件没有子节点，为 undefined 2.  若只有一个子节点，类型为 Object  3. 若有多个子节点，类型为 Array
			 * 
			 * React.Children 这个API我们虽然使用的比较少, 但是我们通过这个API可以操作children： React.Children.map(this.props.children, c => [[c, c]])
			 * 
			 * React.cloneElement(element,[props],[...children])
			 * 
			 * const {children} = this.props,
			 * newChildren = React.Children.map(children, child =>
			 * 	 React.cloneElement(
			 * 	 child,
			 * 	 { onChange: e => alert(e.target.value) }
			 * ));
			 */

			 /**
				* Vue与React对比
				* 1. Vue 进行数据拦截/代理，它对侦测数据的变化更敏感、更精确，也间接对一些后续实现（比如 hooks，function based API）提供了很大的便利。
				* 2. React setState 引起局部重新刷新。为了达到更好的性能，React 暴漏给开发者 shouldComponentUpdate 这个生命周期 hook. Vue 由于采用依赖追踪，默认就是优化状态：你动了多少数据，就触发多少更新，不多也不少，而 React 对数据变化毫无感知，它就提供 React.createElement 调用已生成 virtual dom.
				* 3. 在 JavaScript 中，原始值类型如 string 和 number 是只有值，没有引用的。不管是使用 Object.defineProperty 还是 Proxy，我们无法追踪原始变量后续的变化。。因此 Vue 不得不返回一个包装对象，不然对于基本类型，它无法做到数据的代理和拦截.
				* 4. Mobx 在 React 社区很流行，Mobx 采用了响应式的思想，实际上 Vue 也采用了几乎相同的反应系统。.React + Mobx 也可以被认为是更繁琐的 Vue。
				* 5. Vue template 对比 JSX: 这只是「解决同一个问题的不同实现思路」，完全可以由开发者的个人偏好来决定。退一步讲，Vue 中也不是不可以使用 JSX；同样，JSX 也不是无法实现 Vue template 的特性，比如模版指令
				* 6. Vue 和 React 实现复用: Vue 和 React 都是经历了：Mixin -> Hoc（Vue 比较少用，模版套模版，有点奇怪了）-> render prop（Vue 有类似思想的实现为 slot） -> hooks（Vue3.0 function based API）

				* Vue 向上扩展就是 React，Vue 向下兼容后就类似于 jQuery，渐进式有时候比革命性更符合时代的要求。
			  */

				/**
				 * React hook 底层是基于链表（Array）实现，每次组件被 render 的时候都会顺序执行所有的 hooks，
				 * 因为底层是链表，每一个 hook 的 next 是指向下一个 hook 的，所以要求开发者不能在不同 hooks 调用中使用判断条件，因为 if 会导致顺序不正确，从而导致报错。
				 * 
				 * vue hook 只会被注册调用一次，vue 之所以能避开这些麻烦的问题，根本原因在于它对数据的响应是基于响应式的，是对数据进行了代理的。他不需要链表进行 hooks 记录，它对数据直接代理观察。
				 * 但是 Vue 这种响应式的方案，也有自己的困扰。在 JavaScript 中，原始值类型如 string 和 number 是只有值，没有引用的。不管是使用 Object.defineProperty 还是 Proxy，我们无法追踪原始变量后续的变化。
				 * vue 不得不返回一个包装对象，不然对于基本类型，它无法做到数据的代理和拦截。这算是因为设计理念带来的一个非常非常微小的 side effect。
				 */

				 /**
					* React 为了弥补不必要的更新，会对 setState 的行为进行合并操作。因此 setState 有时候会是异步更新，但并不是总是“异步”
					* 1. 在组件生命周期中或者react事件绑定中，setState是通过异步更新的。 
					* 2. 在延时的回调或者原生事件绑定的回调中调用setState不一定是异步的。
					*
					* 调用setState发生了什么？
					* 1. 当调用setState时，实际上会执行enqueueSetState方法，并对partialState以及_pendingStateQueue更新队列进行合并，最终通过enqueueUpdate执行state更新
					* 2. 如果组件当前正处于update事务中，则先将Component存入dirtyComponent中。否则调用batchedUpdates处理。
					* 
					* 在代码中调用setState函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程（Reconciliation）。 
					* 经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个UI界面。 
					* 在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。 
					* 在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。
				  */

					/**
					 * React Diff
					 * 传统 diff 算法 通过循环递归对节点进行依次对比。：效率低下，算法复杂度达到 O(n^3)。 React Diff算法将 O(n^3) 复杂度的问题转换成 O(n) 复杂度的问题。
					 * 
					 * 与传统diff多了三个优化点
					 * 1. tree diff： 对树进行分层比较，两棵树只会对同一层次的节点进行比较。
					 * 2. Component Diff：相同类生成相似树形结构，不同类生成不同树形结构 1. 同一类型的组件，按照原策略继续比较 virtual DOM tree。 2. 如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点;即使这个这两个不同类型的组件中子节点都相同未改变，也是直接全部更新掉。因为不同类型的 component 是很少存在相似 DOM tree 的机会。
					 * 3. Element Diff： 允许开发者对同一层级的同组子节点，添加唯一 key 进行区分，新老集合进行 diff 差异化对比，通过 key 发现新老集合中的节点都是相同的节点，因此无需进行节点删除和创建，只需要将老集合中节点的位置进行移动，更新为新集合中节点的位置。
					 * 
					 * 
					 * 
					 * Fiber（JavaScript运行时间过长，就会阻塞这些其他工作，可能导致掉帧）
					 * Fiber解决这个问题的思路是增量更新。把渲染/更新过程（递归diff）拆分成一系列小任务，每次检查树上的一小部分，
					 * 做完看是否还有时间继续下一个任务，有的话继续，没有的话把自己挂起，主线程不忙的时候再继续。
					 * 
					 * React 中调用 render() 和 setState() 方法进行渲染和更新时，主要包含两个阶段：
					 * 1. 调度阶段(Reconciler)： Fiber 之前的 reconciler（被称为 Stack reconciler）是自顶向下的递归算法，遍历新数据生成新的Virtual DOM，通过 Diff 算法，找出需要更新的元素，放到更新队列中去。
					 * 2. 渲染阶段(Renderer)： 根据所在的渲染环境，遍历更新队列，调用渲染宿主环境的 API, 将对应元素更新渲染。在浏览器中，就是更新对应的DOM元素，除浏览器外，渲染环境还可以是 Native、WebGL 等等。
					 * 
					 * Fiber 改进思路是将调度阶段拆分成一系列小任务，每次加入一个节点至任务中，做完看是否还有时间继续下一个任务，有的话继续，没有的话把自己挂起，主线程不忙的时候再继续。
					 * 每次只做一小段，做完一段就把时间控制权交还给主线程，而不像之前长时间占用，从而实现对任务的暂停、恢复、复用灵活控制，这样主线程上的用户交互及动画可以快速响应，从而解决卡顿的问题。
					 * 背后支持 API 是 requestIdleCallback；其作用是会在浏览器空闲时期依次调用函数， 这就可以在主事件循环中执行后台或低优先级的任务
					 * 
					 * Fiber对生命周期的影响
					 * reconciliation阶段：componentWillMount componentWillReceiveProps shouldComponentUpdate componentWillUpdate
					 * commit阶段：componentDidMount componentDidUpdate componentWillUnmount
					 * 
					 * 在reconciliation阶段，生命周期函数会被多次调用，开发者慎重调用这个阶段的生命周期。
					 * 16.3+版本：警告componentWillMount，componentWillReceiveProps和componentWillUpdate即将废弃。
					 * 17.0版本：正式废弃componentWillMount，componentWillReceiveProps和componentWillUpdate，这个阶段只有新的带UNSAFE_前缀的3个函数能用，旧的不会再触发。
					 * 
					 * getDerivedStateFromProps: 是一个静态方法，主要取代componentWillReceiveProps。
					 * getSnapshotBeforeUpdate: 会在 render 之后执行，而执行之时 DOM 元素还没有被更新，给了一个机会去获取 DOM 信息，计算得到一个 snapshot。
					 */

					/**
					 * 什么是函数式编程
					 * 1. 不可变性(Immutability)：函数式编程中，你无法更改数据，也不能更改。 如果要改变或更改数据，则必须复制数据副本来更改。
					 * 2. 纯函数(Pure Functions)：纯函数是始终接受一个或多个参数并计算参数并返回数据或函数的函数。 它没有副作用，例如设置全局状态，更改应用程序状态，它总是将参数视为不可变数据。
					 * 3. 高阶函数 (Higher-Order Functions)
					 * 4. 组合：在React中，我们将功能划分为小型可重用的纯函数，我们必须将所有这些可重用的函数放在一起，最终使其成为产品。
					 */
					

					/**
					 * git-flow 流程
					 * 主要分支： 1. master: 永远处在即将发布(production-ready)状态 2. develop: 最新的开发状态
					 * 辅助分支： 1. feature: 开发新功能的分支, 基于 develop, 完成后 merge 回 develop； 2.准备要发布版本的分支, 用来修复 bug. 基于 develop, 完成后 merge 回 develop 和 master
					 * 					3. hotfix: 修复 master 上的问题, 等不及 release 版本就必须马上上线. 基于 master, 完成后 merge 回 master 和 develop；
					 * 
					 * rebase会把你当前分支的 commit 放到公共分支的最后面,所以叫变基。就好像你从公共分支又重新拉出来这个分支一样。
					 * 如果你从 master 拉了个feature分支出来,然后你提交了几个 commit,这个时候刚好有人把他开发的东西合并到 master 了,这个时候 master 就比你拉分支的时候多了几个 commit,如果这个时候你 rebase develop 的话，就会把你当前的几个 commit，放到那个人 commit 的后面。
					 * 
					 */

					/**
					 * Code-Splitting 部分，提出拆分组件的最佳方式（best way） 是使用动态的 import 方式。
					 * React.lazy 和 suspense 并不适用于服务端渲染。
					 * 
					 */