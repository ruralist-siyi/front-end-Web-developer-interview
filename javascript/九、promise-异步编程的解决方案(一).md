##### promise-异步编程的解决方案(一)

######  一. promise是什么

1. 从这个单词语义上可以得知：这是一个承诺。承诺以一种优雅的方式处理我们的异步操作的回调函数带来的一系列的问题（调用时序、异常捕获等）。目前基于promise实现的API与类库也是很多的，并且广泛被大家使用（fetch、axios、oss sdk等）。

2. 曾几何时，我们在传统前端开发技术中，经常使用callback的方式来解决我们在处理异步数据请求，当业务场景过于复杂时，经常就会写出callback中再callback的代码，也就是大家常说的又臭又长的回调地狱。使用我们的promise方式处理，就可以优雅解决我们的问题。

3. 我们可以在控制台打印一下我们的Promise对象。可以看到Promise是一个构造函数，在它的原型上拥有then、catch、finally等方法，自身拥有all、race、reject、resolve等方法。

   ![promise](<https://github.com/ruralist-siyi/front-end-Web-developer-interview/blob/master/javascript/codeImg/promise-console.png>)

###### 二、 Promises/A+ 规范

ES6 中的 promise 实现是基于 Promises/A+ 规范。主要是对promise的状态、thenable对象、执行过程等进行规范。

1. 状态：promise是一个拥有状态的对象，并且它的状态必须`等待中（Pending）`、`执行成功(Fulfilled)`、`执行失败(Rejected)`这三种中的一种。promsie状态 只能由 pending => fulfilled/rejected, 一旦修改就不能再变。
2. thenable对象：拥有then方法的对象就是thenable对象，只要是promise就必须要会有then方法，then方法接受两个可选参数：`onFulfilled`、`onRejected`。这两个参数一般来说都是函数，如果传入的不是函数将会被忽略。onFulfilled回调函数是在promise对象的状态变为resolved时调用，onRejected回调函数是在promise对象的状态变为rejected时调用。then方法同意也必须返回一个promise对象，这样就形成了链式调用。

###### 三、API方法

1. 静态方法

   1.  `Promise.resolve` 返回一个fulfillled状态的promise对象。`Promise.reject`返回一个rejected状态的promise对象。可以认为是`new Promise()`的快捷方式。

      ```javascript
      Promise.reslove('hahaha');
      // 相当于
      new Promise((relove, reject) => {
        reslove('hahahha');
      })
      
      Promise.reject('hahaha');
      // 相当于
      new Promise((relove, reject) => {
        reject('hahahha');
      })
      ```

      

   2. `Promise.all` 接收一个promise对象数组为参数:  多个promise任务同时执行，如果全部成功执行，则以数组的方式返回所有 Promise 任务的执行结果。 如果有一个 Promise 任务 rejected，则只返回 rejected 任务的结果。

      ```javascript
      const promise1 = new Promise((reslove, reject) => {
      	reslove(1);
      })
      const promise2 = new Promise((reslove, reject) => {
      	reslove(2);
      })
      const promise3 = new Promise((reslove, reject) => {
      	reject(3);
      })
      
      Promise.all([promise1, promise2]).then(data => {
        console.log('data', data); //  [1, 2]
      }, err => {
        console.log('err', err);
      })
      
      Promise.all([promise1, promise2, promise3]).then(data => {
        console.log('data', data);
      }, err => {
        console.log('err', err); // err 3
      })
      ```

   3. `Promise.race`接收一个promise对象数组为参数: 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理。

      ```javascript
      // 之前有遇到给fetch设置timeout time的需求： 思路就是我们先定义超时promise，当我们的定时器在一定time后这个promise对象 reject. 将我们的请求方法与这个timeoutPromise同时放入Promise.race中就可以达到timeout的效果。
      
       const timeoutPromise = new Promise((resolve, reject) => {
          setTimeout(
            () => reject(new RequestException('网络超时', '当前网络环境不稳定，请稍后再试。')),
            timeout,
          );
        })
       
       Promise.race([fetchPromise, timeoutPromise]).then(data => ....);
      ```

2. promise对象方法

   1. Promise.prototype.then方法：then方法接受两个可选参数：`onFulfilled`、`onRejected`。`then方法是异步执行的.`

   ```javascript
   // onFulfilled 是用来接收promise成功的值
   // onRejected 是用来接收promise失败的原因
   promise.then(onFulfilled, onRejected);
   ```

   2. Promise.prototype.catch方法：在链式写法中可以捕获前面then中发送的异常。

   ```javascript
   // 注意
   // onRejected 不能捕获当前onFulfilled中的异常
   promise.then(onFulfilled, onRrejected); 
   
   // 可以写成：
   promise.then(onFulfilled)
          .catch(onRrejected);  
   ```

   3. Promise.prototype.finally方法：不管 Promise 对象最后状态如何，都会执行的操作。（不再ES6中，ES2018引入标准）

      ```javascript
      // 不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数。finally方法的回调函数不接受任何参数，这意味着没有办法知道，前面的 Promise 状态到底是fulfilled还是rejected。这表明，finally方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。
      promise
      .then(result => {···})
      .catch(error => {···})
      .finally(() => {···});
      ```

   4. Promise.prototype.done方法：注意此方法并不在ES6以及Promise A+规范中规定以及实现。（但是很多第三方库提供了此方法的实现）

      ```javascript
      if (typeof Promise.prototype.done === 'undefined') {
          Promise.prototype.done = function (onFulfilled, onRejected) {
              this.then(onFulfilled, onRejected).catch(function (error) {
                  setTimeout(function () {
                      throw error;
                  }, 0);
              });
          };
      }
      var promise = Promise.resolve();
      promise.done(function () {
          JSON.parse('this is not json');    // => SyntaxError: JSON.parse
      });
      
      // done 对比 then
      // 1. then方法并不会捕获当前onFulfilled中的错误，必须后面再跟catch。done中发生的异常直接抛出。
      // 2. done之后不会反悔promise对象，就是done之后不能使用catch等方法组成方法链。
      ```

   

四、微任务

```javascript
new Promise((resolve, reject) => {
  resolve(1);
}).then(data => console.log(data));
console.log(2);

// 上面的代码是先输出2， 再输出1.
// Promise立即执行，then函数分发到微任务Event Queue，Node.js中的process.nextTick同样也是分发到微任务Event Queue。
// Promise 的回调函数不是正常的异步任务，而是微任务（microtask）。宏任务必然是在微任务之后才执行的（因为微任务实际上是宏任务的其中一个步骤）。
// tip: process.nextTick()的意思就是定义出一个动作，并且让这个动作在下一个事件轮询的时间点上执行。
```

##### 参考文档

1. [Promise 对象](<https://javascript.ruanyifeng.com/advanced/promise.html>)
2. [【翻译】Promises/A+规范](<http://www.ituring.com.cn/article/66566>)
3. [JavaScript Promise迷你书（中文版）](<http://liubin.org/promises-book/#promises-overview>)