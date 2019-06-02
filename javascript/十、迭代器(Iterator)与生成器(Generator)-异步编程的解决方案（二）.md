### 迭代器(Iterator)与生成器(Generator)-异步编程的解决方案（二）

#### 一、迭代器(Iterator)的原理与实现

##### 1.  什么是Iterator

从Iterator这个单词的语义上可以得知这是迭代器的意思，意味着就是我们对一个容器对象进行访问时，容器对象都提供了相同的可访问机制（这个机制也就是Iterator，也多称为遍历器）。实际上不仅仅在javascript中有所实现，在Java等语言中都拥有Iterator的概念。

##### 2. Iterator的作用

1. 为我们的数据结构提供一个统一且便捷的访问接口。
2. 让我们数据结构中的成员能够按某种次序排序。
3. ES6中新增了一个遍历方法`for...of`。(目前感觉最强大的遍历方法：支持数组、类数组、字符串、Map、Set等对象的遍历。使用`for...of`循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。)

##### 3. Iterator的遍历过程

1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
2. 第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。
3. 第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。
4. 不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

每一次调用`next`方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含`value`和`done`两个属性的对象。其中，`value`属性是当前成员的值，`done`属性是一个布尔值，表示遍历是否结束。

```javascript
// 模拟Iterator实现与next方法
function makeIterator(array) {
  var index = 0;
  return {
    next: function() {
      // 当遍历到最后一个成员时将done设置为true
      var done = index >= array.length;
      // 如果done为true时，value设置为undefined。
      var value = !done ? array[index++] : undefined;
      return {
        value,
        done
      }
    }
  }
}

var it = makeIterator(['a', 'b']);
it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }
```

##### 4. 认识Iterator接口

1. Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即`for...of`循环。当使用`for...of`循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
2. 一个数据结构只要具有`Symbol.iterator`属性，就可以认为是“可遍历的”（iterable）。`Symbol.iterator`属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名`Symbol.iterator`，它是一个表达式，返回`Symbol`对象的`iterator`属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内.

```javascript
const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};
```

3. 原生具备 Iterator 接口的数据结构: Array、Map、 Set、 String、 arguments、NodeList。

   ```javascript
   // 变量arr是一个数组，原生就具有遍历器接口，部署在arr的Symbol.iterator属性上面。所以，调用这个属性，就得到遍历器对象。
   let arr = ['a', 'b', 'c'];
   let iter = arr[Symbol.iterator]();
   
   iter.next() // { value: 'a', done: false }
   iter.next() // { value: 'b', done: false }
   iter.next() // { value: 'c', done: false }
   iter.next() // { value: undefined, done: true }
   ```

##### 5. Symbol.iterator接口最简单的实现：使Generator函数

```javascript
let myIterable = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  }
}
[...myIterable] // [1, 2, 3]

// 或者采用下面的简洁写法

let obj = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};

for (let x of obj) {
  console.log(x);
}
// "hello"
// "world"
```







