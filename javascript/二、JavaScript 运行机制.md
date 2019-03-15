#### JavaScript 运行机制

###### 1. 单线程特点

1. 单线程可以避免多线程操作带来的复杂的同步问题。
2. HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。
3. 我们必须清楚一点，触发和执行并不是同一概念，计时器的回调函数一定会在指定delay的时间后被触发，但并不一定立即执行，可能需要等待。所有JavaScript代码是在一个线程里执行的，像鼠标点击和计时器之类的事件只有在JS单线程空闲时才执行。

###### 2. 任务队列

1. 所有同步任务都在主线程上执行，形成一个执行栈。
2. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4. 只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制。

###### 3. Event Loop

JS 会创建一个类似于 while (true) 的循环，每执行一次循环体的过程称之为 Tick。每次 Tick 的过程就是查看是否有待处理事件，如果有则取出相关事件及回调函数放入执行栈中由主线程执行。待处理的事件会存储在一个任务队列中，也就是每次 Tick 会查看任务队列中是否有需要执行的任务。

![event loop](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100802.png)

异步操作会将相关回调添加到任务队列中。而不同的异步操作添加到任务队列的时机也不同，如 onclick, setTimeout, ajax 处理的方式都不同，这些异步操作是由浏览器内核的 webcore 来执行的，webcore 包含上图中的3种 webAPI，分别是 DOM Binding、network、timer模块。

​	1. onclick 由浏览器内核的 DOM Binding 模块来处理，当事件触发的时候，回调函数会立即添加到任务队列中。

​	2. setTimeout 会由浏览器内核的 timer 模块来进行延时处理，当时间到达的时候，才会将回调函数添加到任务队列中。

​	3. ajax 则会由浏览器内核的 network 模块来处理，在网络请求完成返回之后，才将回调添加到任务队列中。

任务队列是在事件循环之上的，事件循环每次 tick 后会查看 ES6 的任务队列中是否有任务要执行，也就是 ES6 的任务队列比事件循环中的任务（事件）队列优先级更高。如 Promise 就使用了 ES6 的任务队列特性。

###### 4. javascript是单线程的，浏览器是多线程的。

浏览器的内核是多线程的，它们在内核控制下相互配合以保持同步，一个浏览器至少实现三个常驻线程：JavaScript引擎线程，GUI渲染线程，浏览器事件触发线程。

1. JavaScript引擎是基于事件驱动单线程执行的，JavaScript引擎一直等待着任务队列中任务的到来，然后加以处理，浏览器无论什么时候都只有一个JavaScript线程在运行JavaScript程序。

2. GUI渲染线程负责渲染浏览器界面，当界面需要重绘（Repaint）或由于某种操作引发回流(Reflow)时,该线程就会执行。但需要注意，GUI渲染线程与JavaScript引擎是互斥的，当JavaScript引擎执行时GUI线程会被挂起，GUI更新会被保存在一个队列中等到JavaScript引擎空闲时立即被执行。

3. 事件触发线程，当一个事件被触发时该线程会把事件添加到待处理队列的队尾，等待JavaScript引擎的处理。这些事件可来自JavaScript引擎当前执行的代码块如setTimeout、也可来自浏览器内核的其他线程如鼠标点击、Ajax异步请求等，但由于JavaScript的单线程关系所有这些事件都得排队等待JavaScript引擎处理（当线程中没有执行任何同步代码的前提下才会执行异步代码）。

###### 5. 多线程的优点和缺点分别是什么？

优点：1、将耗时较长的操作（网络请求、图片下载、音频下载、数据库访问等）放在子线程中执行，可以防止主线程的卡死；2、可以发挥多核处理的优势，提升cpu的使用率。 缺点：1、每开辟一个子线程就消耗一定的资源； 2、会造成代码的可读性变差；3、如果出现多个线程同时访问一个资源，会出现资源争夺的情况。

###### 6.  浏览器的event loop至少包含两个队列，macrotask队列和microtask队列

1. microtask 即微任务，是由js引擎分发的任务，总是添加到当前任务队列末尾执行。另外在处理microtask期间，如果有新添加的microtasks，也会被添加到队列的末尾并执行： setTimeout, setInterval, setImmediate, I/O, UI rendering
2. macrotask队列 等同于我们常说的任务队列，macrotask是由宿主环境分发的异步任务，事件轮询的时候总是一个一个任务队列去查看执行的，"任务队列"是一个先进先出的数据结构，排在前面的事件，优先被主线程读取：process.nextTick, Promise, MutationObserver
3. 经典面试题：

```javascript
async function async1(){
    console.log('async1 start')
    await async2()
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}
console.log('script start')
setTimeout(function(){
    console.log('setTimeout') 
},0)  
async1();
new Promise(function(resolve){
    console.log('promise1')
    resolve();
}).then(function(){
    console.log('promise2')
})
console.log('script end')
解题思路：
首先按照代码的执行顺序从上往下，js始终都是单线程的，先执行的肯定是同步任务，再根据进入任务队列的顺序先进先出，先微后宏。微任务是一次性将队列中存在的微任务执行完毕，宏任务是一个一个先进先出。
Promise是一个构造函数，调用的时候会生成Promise实例。当Promise的状态改变时会调用then函数中定义的回调函数。我们都知道这个回调函数不会立刻执行，他是一个微任务会被添加到当前任务队列中的末尾，在下一轮任务开始执行之前执行。
async/await成对出现，async标记的函数会返回一个Promise对象，可以使用then方法添加回调函数。await后面的语句会同步执行。但 await 下面的语句会被当成微任务添加到当前任务队列的末尾异步执行。
答案： 
> node8版本: script start -> async1 start -> async2 -> promise1 -> script end -> promise2 -> async1 end -> setTimeout
<= node8版本: script start -> async1 start -> async2 -> promise1 -> script end -> async1 end -> promise2 -> setTimeout
这主要是node.js8版本与其他版本的差异，他们对await的执行方法不同
```

4. 当前macrotask队列flush结束时就执行，不用等下一班车，而且microtask queue flush过程中产生的同类型microtask也会被立即处理掉，即允许阻塞。

   下一次检查microtask queue的时候，发现只有一个Promise callback，立即执行，再检查发现又冒出来一个，继续执行，诶检查又刷出来一个，接着执行，再检查，没了，继续事件循环，检查immediate macrotask queue，这时才执行`setImmediate`回调。（也就是只要有微任务我们肯定是执行微任务的，当前进行的会执行，当前执行完的如果执行完后event loop还是检测到微任务，还是执行微任务，检测出没有微任务，我们就执行宏任务队列中的任务。）