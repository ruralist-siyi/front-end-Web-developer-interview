##### promise-异步编程的解决方案(一)

######  一. promise是什么？

1. 从这个单词语义上可以得知：这是一个承诺。承诺以一种优雅的方式处理我们的异步操作的回调函数带来的一系列的问题（调用时序、异常捕获等）。目前基于promise实现的API与类库也是很多的，并且广泛被大家使用（fetch、axios、oss sdk等）。

2. 曾几何时，我们在传统前端开发技术中，经常使用callback的方式来解决我们在处理异步数据请求，当业务场景过于复杂时，经常就会写出callback中再callback的代码，也就是大家常说的又臭又长的回调地狱。使用我们的promise方式处理，就可以优雅解决我们的问题。

3. 我们可以在控制台打印一下我们的Promise对象。可以看到Promise是一个构造函数，在它的原型上拥有then、catch、finally等方法，自身拥有all、race、reject、resolve等方法。

   ![promise]()

   