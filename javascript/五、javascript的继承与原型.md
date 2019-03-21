#### 五、javascript的原型与原型链

######1. prototype、__proto__、constructor

1. prototype:  这是一个属性，在javascript中的每一个函数都会有一个prototype属性，普通的对象是没有这个属性的。构造函数的prototype属性的属性值就是该构造函数而创建的实例的原型。
2. __proto__：每一个JavaScript对象（除了null）都具有的一个属性，叫__proto__,这个属性会指向该对象的原型。

```javascript
function Person() {

}
var person = new Person();
console.log(person.__proto__ === Person.prototype); //true;
```

3. constructor: 每一个原型都有一个`constructor`属性指向关联的构造函数。

```javascript
function Person() {

}
var person = new Person();
console.log(Person === Person.prototype.constructor); //true
//其实 person 中并没有constructor 属性,当不能读取到constructor属性时，会从 person 的原型也就是 Person.prototype中读取，正好原型中有该属性
console.log(person.constructor === Person); // true
```

###### 2. 原型链

JavaScript中所有的对象都是由它的原型对象继承而来。而原型对象自身也是一个对象，它也有自己的原型对象，这样层层上溯，就形成了一个类似链表的结构，这就是原型链（prototype chain）。所有原型链的终点都是Object函数的prototype属性，因为在JavaScript中的对象都默认由Object()构造。Objec.prototype指向的原型对象同样拥有原型，不过它的原型是null，而null则没有原型。



