### 一、Iterator（遍历器）

#### 1. javascript表示集合的对象有哪些
Array、Object、Map、Set

#### 2. Iterator是什么
它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

#### 3. Iterator 的作用
1. 是为各种数据结构，提供一个统一的、简便的访问接口；
2. 使得数据结构的成员能够按某种次序排列；
3. ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费；

#### 4. Iterator 的遍历过程
1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
2. 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
3. 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
4. 不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。
```
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

#### 5. 原生具备 Iterator 接口的数据结构
- Array
- Map
- Set
- String
- TypedArray（描述一个底层的二进制数据缓存区的一个类似数组(array-like)：const typedArray1 = new Int8Array(8);typedArray1[0] = 32;）
- 函数的 arguments 对象
- NodeList 对象

#### 6. Symbol.iterator属性
一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。至于属性名Symbol.iterator，它是一个表达式，返回Symbol对象的iterator属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内。
```
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

#### 7. Symbol.iterator接口最简单的实现：使用Generator函数
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
#### 8. 调用 Iterator 接口的场合
- for...of
- 解构赋值
- 扩展运算符
- yield*
- Array.from()
- Promise.all()、Promise.race()
- Map(), Set(), WeakMap(), WeakSet()

#### 9. 遍历器对象的 return()，throw()
1. 遍历器对象除了具有next方法，还可以具有return方法和throw方法。如果你自己写遍历器对象生成函数，那么next方法是必须部署的，return方法和throw方法是否部署是可选的。
2. return方法的使用场合是，如果for...of循环提前退出（通常是因为出错，或者有break语句），就会调用return方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署return方法。
3. throw方法主要是配合 Generator 函数使用，一般的遍历器对象用不到这个方法。

### 二、for...of与其他几种遍历方法的比较
#### 1. for...of 
1. ES6 借鉴 C++、Java、C# 和 Python 语言，引入了for...of循环，作为**遍历所有数据结构的统一的方法**。
2. 一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。也就是说，**for...of循环内部调用的是数据结构的Symbol.iterator方法**。
3. for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、Generator 对象，以及字符串。(并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用Array.from方法将其转为数组。)

#### 2. for...in
1. for...in语句以**任意顺序**遍历一个对象的**除Symbol以外的可枚举属性**。（像 Array和 Object使用内置构造函数所创建的对象都会继承自Object.prototype和String.prototype的不可枚举属性，例如 String 的 indexOf()  方法或 Object的toString()方法。）
2. 循环将遍历对象本身的所有可枚举属性，以及对象从其构造函数原型中继承的属性（更接近原型链中对象的属性覆盖原型属性）。
3. for...in循环主要是为遍历对象而设计的，不适用于遍历数组。

#### 3. 其他几种遍历方法
1. 一般for循环：写法比较麻烦。（但有时候需要index、value同时判断用起来也挺方便）

2. 数组提供内置的forEach方法： break命令或return命令都不能奏效。（for...of 可以）

