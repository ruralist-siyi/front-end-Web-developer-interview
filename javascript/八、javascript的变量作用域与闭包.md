#### javascript的变量作用域与闭包

###### 1. 变量的作用域

1. 变量的作用域只有两种： 全局变量与局部变量。
2. javascript你可以在函数内部直接读取全局变量，函数外部无法读取函数内的局部变量。
3. 如果想得到函数内部的局部变量你可以在函数内部再定义一个函数。javascript特有"链式作用域"结构。子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见的，反之则不成立。

###### 2. 闭包

1. 闭包的定义（大多数认知）

   JavaScript中的函数会形成*闭包*。 闭包是由函数以及创建该函数的词法环境组合而成。这个环境包含了这个闭包创建时所能访问的所有局部变量。（闭包就是能够读取其他函数内部变量的函数。在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。）

2. 闭包实例

   ```javascript
   for (var i = 0; i < 5; i++) {
       setTimeout(function() {
           console.log(new Date, i);
       }, 1000);
   }
   console.log(new Date, i);
   /*
   结果：第 1 个 5 直接输出，1 秒之后，输出 5 个 5
   Tue Mar 26 2019 11:25:19 GMT+0800 (中国标准时间) 5
   Tue Mar 26 2019 11:25:20 GMT+0800 (中国标准时间) 5
   Tue Mar 26 2019 11:25:20 GMT+0800 (中国标准时间) 5
   Tue Mar 26 2019 11:25:20 GMT+0800 (中国标准时间) 5
   Tue Mar 26 2019 11:25:20 GMT+0800 (中国标准时间) 5
   Tue Mar 26 2019 11:25:20 GMT+0800 (中国标准时间) 5
   */
   
   // 如果期望代码的输出变成：5 -> 0,1,2,3,4 改造方法
   1. 方案1: 匿名函数
   for (var i = 0; i < 5; i++) {
       (function(j) {  // j = i
           setTimeout(function() {
               console.log(new Date, j);
           }, 1000);
       })(i);
   }
   console.log(new Date, i);
   2. 方案2: 块级作用域
   for (let i = 0; i < 5; i++) {
       setTimeout(function() {
           console.log(new Date, i);
       }, 1000);
   }
   ```

3. 闭包的弊端

   闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。

4. 网上对闭包的定义很多，IIFE是不是闭包呢？

   在requireJS出现之前，实现模块化编程主要通过IIFE，而在IIFE中常见的操作就是通过window.fn = fn来暴露接口，而这个fn就是闭包，而IIFE只是一个包含闭包的函数调用

   ```javascript
   (function(){
       var a = 0;
       function fn(){
           console.log(a); 
       }
       window.fn = fn;
   })()
   fn();
   
   // 定义一：需要通过作用域链查找变量的函数就是闭包
   var a = 2;
   (function foo(){
       console.log(a);//2
   })();
   
   // 定义二: 访问上层函数的作用域的内层函数就是闭包
   function foo(){
       var a = 2;
       function bar(){
           console.log(a); // 2
       }
       bar();
   }
   foo();
   
   // 定义三： 在函数声明时的作用域以外的地方调用函数，需要通过将该函数作为返回值或者作为参数被传递
   function foo(){
       var a = 2;
       function bar(){
           console.log(a); //2
       }
       return bar;
   }
   foo()();
   ```

5. 个人认同：因为作用域链，所有函数都为闭包。

   1. 从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
   2. 从实践角度：以下函数才算是闭包：1. 即使创建它的上下文销毁，仍然存在（比如内部函数从父函数返回） 2. 代码中引用了自由变量(跨了自己的作用域的变量都叫自由变量)

##### 参考文献

1. [学习javascript闭包](<http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html>)
2. [深入理解javascript系列（16）:闭包](https://www.cnblogs.com/TomXu/archive/2012/01/31/2330252.html)
3. [破解前端面试：从闭包说起](https://zhuanlan.zhihu.com/p/25855075)

