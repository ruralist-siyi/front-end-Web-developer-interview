#### 六、javascript的继承

###### 1. js的继承机制

它没有"子类"和"父类"的概念，也没有"类"（class）和"实例"（instance）的区分，全靠一种很奇特的"原型链"（prototype chain）模式，来实现继承。继承意味着复制操作，然而 JavaScript 默认并不会复制对象的属性，相反，JavaScript 只是在两个对象之间创建一个关联，这样，一个对象就可以通过委托访问另一个对象的属性和函数，所以与其叫继承，委托的说法反而更准确些。

###### 2. js继承的实现方式

1. 原型链继承: 拿父类实例来充当子类原型对象

```javascript
function Super(){
    this.val = 1;
    this.arr = [1];
}
function Sub(){
    // ...
}
Sub.prototype = new Super();    // 核心

var sub1 = new Sub();
var sub2 = new Sub();
sub1.val = 2;
sub1.arr.push(2);
alert(sub1.val);    // 2
alert(sub2.val);    // 1

alert(sub1.arr);    // 1, 2
alert(sub2.arr);    // 1, 2
// 优点： 简单，易于实现
// 缺点： 1. 修改sub1.arr后sub2.arr也变了，因为来自原型对象的引用属性是所有实例共享的。 2. 创建子类实例时，无法向父类构造函数传参
```

2. 借用构造函数继承：借父类的构造函数来增强子类实例,等于是把父类的实例属性复制了一份给子类实例装上了（完全没有用到原型）

```javascript
function Super(val){
    this.val = val;
    this.arr = [1];

    this.fun = function(){
        // ...
    }
}
function Sub(val){
    Super.call(this, val);   // 核心
    // ...
}

var sub1 = new Sub(1);
var sub2 = new Sub(2);
sub1.arr.push(2);
alert(sub1.val);    // 1
alert(sub2.val);    // 2

alert(sub1.arr);    // 1, 2
alert(sub2.arr);    // 1

alert(sub1.fun === sub2.fun);   // false
// 优点： 1. 解决了子类实例共享父类引用属性的问题 2. 创建子类实例时，可以向父类构造函数传参 
// 缺点： 无法实现函数复用，每个子类实例都持有一个新的fun函数，太多了就会影响性能，内存爆炸。。
```

3. 组合继承（常用）： 把实例函数都放在原型对象上，以实现函数复用。同时还要保留借用构造函数方式的优点。

```javascript
// 通过Super.call(this);继承父类的基本属性和引用属性并保留能传参的优点；通过Sub.prototype = new Super();继承父类函数，实现函数复用
function Super(){
    // 只在此处声明基本属性和引用属性
    this.val = 1;
    this.arr = [1];
}
//  在此处声明函数
Super.prototype.fun1 = function(){};
Super.prototype.fun2 = function(){};
//Super.prototype.fun3...
function Sub(){
    Super.call(this);   // 核心
    // ...
}
Sub.prototype = new Super();    // 核心

var sub1 = new Sub(1);
var sub2 = new Sub(2);
alert(sub1.fun === sub2.fun);   // true
// 优点： 1. 不存在引用属性共享问题 2. 可传参 3. 函数可复用
// 缺点：（一点小瑕疵）子类原型上有一份多余的父类实例属性，因为父类构造函数被调用了两次，生成了两份，而子类实例上的那一份屏蔽了子类原型上的。。。又是内存浪费，比刚才情况好点，不过确实是瑕疵
```

4. 寄生组合继承（最佳方式）：切掉了原型对象上多余的那份父类实例属性。

```javascript
function beget(obj){   // 生孩子函数 beget：龙beget龙，凤beget凤。
    var F = function(){};
    F.prototype = obj;
    return new F();
}
function Super(){
    // 只在此处声明基本属性和引用属性
    this.val = 1;
    this.arr = [1];
}
//  在此处声明函数
Super.prototype.fun1 = function(){};
Super.prototype.fun2 = function(){};
//Super.prototype.fun3...
function Sub(){
    Super.call(this);   // 核心
    // ...
}
// 用beget(Super.prototype);切掉了原型对象上多余的那份父类实例属性
var proto = beget(Super.prototype); // 核心
proto.constructor = Sub;            // 核心
Sub.prototype = proto;              // 核心

var sub = new Sub();
alert(sub.val);
alert(sub.arr);
```

5. 原型式：用生孩子函数得到得到一个“纯洁”的新对象（“纯洁”是因为没有实例属性），再逐步增强之（填充实例属性）

```javascript
function beget(obj){   // 生孩子函数 beget：龙beget龙，凤beget凤。
    var F = function(){};
    F.prototype = obj;
    return new F();
}
function Super(){
    this.val = 1;
    this.arr = [1];
}

// 拿到父类对象
var sup = new Super();
// 生孩子
var sub = beget(sup);   // 核心
// 增强
sub.attr1 = 1;
sub.attr2 = 2;
//sub.attr3...

alert(sub.val);     // 1
alert(sub.arr);     // 1
alert(sub.attr1);   // 1
//ES5提供了Object.create()函数，内部就是原型式继承，IE9+支持
// 优点：从已有对象衍生新对象，不需要创建自定义类型（更像是对象复制，而不是继承。。
// 缺点： 1. 原型引用属性会被所有实例共享，因为是用整个父类对象来充当了子类原型对象，所以这个缺陷无可避免 2. 无法实现代码复用（新对象是现取的，属性是现添的，都没用函数封装，怎么复用）
```



5. 寄生式：给原型式继承穿了个马甲而已,创建新对象 -> 增强 -> 返回该对象，这样的过程叫寄生式继承，新对象是如何创建的并不重要。

```javascript
// 有缺陷的寄生式继承 + 不完美的组合继承 = 完美的寄生组合式继承
function beget(obj){   // 生孩子函数 beget：龙beget龙，凤beget凤。
    var F = function(){};
    F.prototype = obj;
    return new F();
}
function Super(){
    this.val = 1;
    this.arr = [1];
}
function getSubObject(obj){
    // 创建新对象
    var clone = beget(obj); // 核心
    // 增强
    clone.attr1 = 1;
    clone.attr2 = 2;
    //clone.attr3...

    return clone;
}

var sub = getSubObject(new Super());
alert(sub.val);     // 1
alert(sub.arr);     // 1
alert(sub.attr1);   // 1
// 优点： 还是不需要创建自定义类型
// 缺点： 无法实现函数复用（没用到原型，当然不行）
```

