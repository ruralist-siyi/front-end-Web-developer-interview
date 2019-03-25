#### JavaScript 的数据类型与类型检测

###### 1.  一共有七种数据类型，六种简单数据类型，一种复杂数据类型。

1. 简单数据类型：String、Number、Boolean、Null、Undefined、Symbol。
2. 复杂数据类型：Object是唯一的复杂数据类型。 Array Function 这些引用类型值最终都可以归结为 Object 复杂数据类型。

###### 2. 特殊的基本类型：基本包装类型

​	js为了方便操作基本类型值，ECMAscript 提供了3个特殊的引用类型：Boolean、Number 和 String。每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而让我们能够调用一些方法来操作这些数据。

```javascript
var s1 = "some text";
// 在这里创建了一个字符串保存在了变量s1，字符串当然是基本类型值。
// 但是此刻我们又调用了s1的方法，基本类型值不是对象，理论上不应该有方法。
//其实，为了让我们实现这种直观的操作，后台已经帮助我们完成了一系列的操作。当我们在第二行代码中访问 s1 变量时，访问过程处于读取模式，而在读取模式中访问字符串时，后台都会自动完成下列处理。
var s2 = s1.substring(2);
/*
1. 创建 String 类型的一个实例；
2. 在实例上调用指定的方法；
3. 销毁这个实例。
var s1 = new String("some text");
var s2 = s1.substring(2);
s1 = null;
*/
```

###### 3. 数据类型的检测方法

1. typeof: 对于基本类型出了null（返回 obejct）以外，均可以正确返回。对于复杂类型除了function（返回 function）以外，一律返回object。

2. instanceof：instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。（也就是只能用来判断两个对象是否属于实例关系，而不能判断一个对象实例具体属于哪种类型）。

      ```javascript
       var str = 'text';
       str instanceof String;  // false (包装类型)
       var arr = [1, 2, 3];
       arr instanceof Array;   // true
       arr instanceof Object;  // true
       // 会返回 true ，是因为 Object 构造函数的 prototype 属性存在与 arr 这个数组实例的原型链上。
      ```

3. 用对象的 constructor 来判断对象类型（当检测 null 或者 undefined 类型的 constructor 属性时，js会报错！因为 null 和 undefined 根本就没有 constructor 属性）

  ```javascript
  function cstor(variable) {
   if (variable === null || variable === undefined) {
       return 'Null or Undefined';
   }
   
   var cst = variable.constructor;
   
   switch (cst) {
       case Number:
           return 'Number'
       case String:
           return 'String'
       case Boolean:
           return 'Boolean'
       case Array:
           return 'Array'
       case Object:
           return 'Object'
   }
   }
  ```

4.  Object.prototype.toString.call(): 获取所有对象都拥有的[[Class]]这个内部属性, 返回字符串`"[object class]"`.

   ```javascript
   /**
    * @param type 字符串，要检测的类型的字符串
    * @return 类型检测函数
    * 根据传入的数据类型，返回该类型的类型检测函数
    * 类型检测使用 toString 函数
    */
   function isType(type) {
     return function (val) {
       if (Object.prototype.toString.call(val) === `[object ${type}]`) {
         return true;
       }
       return false;
     };
   }
   
   export let isString = isType('String');
   export let isArray = isType('Array');
   export let isFunction = isType('Function');
   export let isObject = isType('Object');
   export let isNumber = isType('Number');
   ```

   