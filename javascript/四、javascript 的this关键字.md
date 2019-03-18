#### javascript 的this关键字

######  1. this是什么

this是javascript中的关键字之一。他是使用对象自动生成的一个内部对象，只能在对象内部使用。它会根据上下文而进行变化，并且会在不同的 JavaScript的模式（是否为*严格模式*）下表现出差异。

######  2. this的指向关键

this的指向取决于什么地方以什么方式调用，而不是创建时。箭头函数中的 `this` 的作用域继承自执行上下文，箭头函数自身不绑定 `this`，因此 `this` 的值将在调用堆栈中查找。

###### 3. this的绑定规则

1. 默认绑定: 直接使用不带任何修饰的函数调用，默认且只能应用默认绑定。一般绑定到window,严格模式下是 undefined;
2. 隐形绑定：obj.foo() 函数执行时就有了上下文对象,就是obj。这种情况下,函数默认绑定的是它的上下文对象。如果是链性关系，xx.yy.obj.foo()；上下文取函数的直接上级,也就是紧挨着的obj，或者说对象链的最后一个。(隐式丢失：绑定至上下文对象的函数被赋值给一个新的函数，然后调用这个新的函数时。传入回调函数时：其实这就是第一种情况的变种，实际上参数传递就是一种隐式赋值。除了开发人员自定义的函数，在将函数传入语言内置的函数比如 setTimeout 时，同样会发生隐式丢失的情况。)
3. 显性绑定: (隐形绑定的话：必须要有一个上下文包含我们的函数，这样就需要显性绑定了)1. call,appy,bind. 2. new。this绑定的是新创建的对象，例:var bar = new foo(); 函数 foo 中的 this 就是一个叫foo的新创建的对象 , 然后将这个对象赋给bar , 这样的绑定方式叫 new绑定 .
4. new绑定：js中的只要用new修饰的 函数就是'构造函数'，准确来说是 函数的构造调用，因为在js中并不存在所谓的'构造函数'。用new 做到函数的`构造调用`后，js帮我们做了什么工作：
    	1. 创建一个新对象；
    	2. 把这个新对象的`__proto__`属性指向 原函数的`prototype`属性。(即继承原函数的原型)；
    	3. 将这个新对象绑定到 此函数的this上 。
    	4. 返回新对象，如果这个函数没有返回其他对象。
5. 箭头中的 this的作用域继承自执行上下文，箭头函数自身不绑定 this，箭头函数的this绑定无法被修改.

######  4. this绑定优先级

new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定

###### 5. call,apply,bind

1. 都是用来改变函数的this对象的指向的。
2. 第一个参数都是this要指向的对象。
3. 都可以利用后续参数传参。
4. call：从第二个参数开始素有参数都是原函数的参数。apply：只接受两个参数,且第二个参数必须是数组，这个数组代表原函数的参数列表。 bind：只有一个函数，且不会立刻执行，只是将一个值绑定到函数的this上,并将绑定好的函数返回。bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 .

###### 6. 代码实例

```javascript
1. 默认绑定

function foo(){
    var a = 1 ;
    console.log(this.a);    // 10
}
var a = 10;
foo();

2. 隐性绑定

function foo(){
    console.log(this.a);
}
var obj = {
    a : 10,
    foo : foo
}
foo();                // undefined (默认绑定)

obj.foo();            // 10

3. 显性绑定

function foo(){
    console.log(this.a);
}
var obj = { a : 10 };

foo = foo.bind(obj);
foo();                    // 10

function foo(){
    this.a = 10;
    console.log(this);
}
foo();                    // window对象
console.log(window.a);    // 10   默认绑定

var obj = new foo();      // foo{ a : 10 }  创建的新对象的默认名为函数名
                          // 然后等价于 foo { a : 10 };  var obj = foo;
console.log(obj.a);       // 10    new绑定

<!-使用new调用函数后，函数会 以自己的名字 命名 和 创建 一个新的对象，并返回。如果原函数返回一个对象类型，那么将无法返回新对象,你将丢失绑定this的新对象-->
function foo(){
    this.a = 10;
    return new String("捣蛋鬼");
}
var obj = new foo();
console.log(obj.a);       // undefined
console.log(obj);         // "捣蛋鬼"
```

