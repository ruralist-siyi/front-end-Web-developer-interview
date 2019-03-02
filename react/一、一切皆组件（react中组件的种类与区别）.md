#### 组件

###### 1. 函数式组件（无状态组件）

1. 首先需要去理解纯函数的概念：相同的输入，拥有有相同输出，没有任何副作用。同理： 我们的函数式组件也不会去根据组件的状态（state）的不同输入，不会拥有不同的表现形式。（与state无关，取决于props与context）。
2. 优点：1. 不需要声明Class，也就不需要constructor、extends代码（书写简洁，内存占用小：无需class 的 props context _context 等诸多属性，组件不需要被实例化，无生命周期，提升性能；）。 2. 可以写成无副作用的纯函数。 3. 视图和数据的解耦分离。
3. 缺点：1. 没有实例化，无法使用ref； 2. 没有生命周期方法； 3. shouldComponentUpdate方法没有，重复渲染都没法避免。
4. 应用场景：1. 无需state。 2. 无需生命周期函数。

######  2. 基于Class声明的组件

1. ES5 React.createClass (会自动绑定函数，这样会导致不必要的性能开销。拥有mixin。弃用)
2. ES6 React.Component（按需绑定，HOC）

###### 3. PureComponent （v15.3新增）

1. 原理：正常情况下，父组件每次有state或者props改变，子组件都会重新渲染。但是如果我们在shouldComponentUpdate阶段判断新旧属性和状态是否相等，是否需要重新渲染子组件。减少render()方法的触发，节省了在虚拟DOM生成与对比的过程，性能得到提升。

2. 存在的问题： 这个比较的过程是一个浅比较，无法判断复杂数据类型（引用类型）的变化。

3. 如何优化：1. 不要将复杂的状态写入一个组件，将部分仅需要简单状态类展示型组件抽离。2. 复杂的数据类型带来的副作用可以通过immutable来解决。

4. 为什么不全部改为PureComponent：1. 即使是浅比较，同样是需要消耗性能。 2. 如果不是immutale数据的话你可能会出现问题（同一引用类型改变导致不更新渲染），一旦深层次的结构出现问题，你定位问题可能需要很久。 3. 这不足以成为一个正常应用的性能瓶颈，当你发现已经到不优化不可的地步，那肯定不是PureComponent导致的，优化的优势也就不那么明显了。

   ```
   // 浅比较shallowEqual的源码
   const hasOwn = Object.prototype.hasOwnProperty
   // 这个函数实际上是Object.is()的polyfill
   function is(x, y) {
     if (x === y) {
       return x !== 0 || y !== 0 || 1 / x === 1 / y
     } else {
       return x !== x && y !== y
     }
   }
   
   export default function shallowEqual(objA, objB) {
       // 首先对基本数据类型的比较
     if (is(objA, objB)) return true
    // 由于Obejct.is()可以对基本数据类型做一个精确的比较， 所以如果不等
     // 只有一种情况是误判的，那就是object,所以在判断两个对象都不是object之后，就可以返回false了
     if (typeof objA !== 'object' || objA === null ||
         typeof objB !== 'object' || objB === null) {
       return false
     }
   // 过滤掉基本数据类型之后，就是对对象的比较了
     // 首先拿出key值，对key的长度进行对比
     const keysA = Object.keys(objA)
     const keysB = Object.keys(objB)
   // 长度不等直接返回false
     if (keysA.length !== keysB.length) return false
     for (let i = 0; i < keysA.length; i++) {
     // key值相等的时候
     // 借用原型链上真正的 hasOwnProperty 方法，判断ObjB里面是否有A的key的key值
     // 属性的顺序不影响结果也就是{name:'daisy', age:'24'} 跟{age:'24'，name:'daisy' }是一样的
     // 最后，对对象的value进行一个基本数据类型的比较，返回结果
       if (!hasOwn.call(objB, keysA[i]) ||
           !is(objA[keysA[i]], objB[keysA[i]])) {
         return false
       }
     }
   
     return true
   }
   ```

###### 4. 高阶组件

1. 高阶组件的概念实际上是来源于我们的高阶函数：接收函数作为输入，或者输出另一个函数的一类函数，被称作高阶函数。高阶组件: 接受React组件作为输入，输出一个新的React组件的组件。

2. 在React的ES5写法中，我们可以抽象出一个包含公共功能的组件（通过Mixin）。高阶组件其实就是一个函数，接受一个组件作为参数，返回一个包装过的组件。高阶组件和装饰器是一个模式，高阶组件可以当作装饰器使用。

3. 常见用法： 1.属性代理（Props Proxy） 2. 反向继承（Inheritance Inversion）

   1. 属性代理：1. 更改props 2. 抽象state 3. 通过refs访问组件实例 4. 封装样式、布局等。
   2. 反向继承：劫持被继承class的render内容，进行修改，过滤后，返回新的显示内容。（super.render()、super.Fn()）

4. 案例：

   1. react-redux中的connect(mapStateToProps, mapDispatchToProps, mergeProps,options): 此方法会将react组件连接到redux的store。connect通过函数参数`mapStateToProps`，从全局store中取出当前组件需要的state，并把state转化成当前组件的props；同时通过函数参数`mapDispatchToProps`，把当前组件用到的Redux的action creator，以props的方式传递给当前组件。`connect`并不会修改传递进去的组件的定义，而是它会返回一个新的组件。
   2. react-router中的withRouter: 通过`withRouter`包装的组件，我们可以在props中访问到`location, router`等对象，这正是`withRouter`通过高阶组件的方式传递过来的。
   3. UI框架中的受控组件：[react-hoc-example](https://github.com/franleplant/react-hoc-examples/blob/master/pp_state.js)

5. 注意事项：

   1. 不要在组件的render方法中使用高阶组件，尽量也不要在组件的其他生命周期方法中使用高阶组件。因为高阶组件每次都会返回一个新的组件，在render中使用会导致每次渲染出来的组件都不相等（`===`），于是每次render，组件都会卸载（unmount），然后重新挂载（mount），既影响了效率，又丢失了组件及其子组件的状态。高阶组件最适合使用的地方是在组件定义的外部，这样就不会受到组件生命周期的影响了。

   2. 如果需要使用被包装组件的静态方法，那么必须手动拷贝这些静态方法。因为高阶组件返回的新组件，是不包含被包装组件的静态方法。[hoist-non-react-statics](https://link.jianshu.com/?t=https%3A%2F%2Fgithub.com%2Fmridgway%2Fhoist-non-react-statics)可以帮助我们方便的拷贝组件所有的自定义静态方法。

   3. Refs不会被传递给被包装组件。尽管在定义高阶组件时，我们会把所有的属性都传递给被包装组件，但是`ref`并不会传递给被包装组件，因为`ref`根本不属于React组件的属性。如果你在高阶组件的返回组件中定义了`ref`，那么它指向的是这个返回的新组件，而不是内部被包装的组件。如果你希望获取被包装组件的引用，你可以把`ref`的回调函数定义成一个普通属性（给它一个ref以外的名字）。

      ```
      function FocusInput({ inputRef, ...rest }) {
        return <input ref={inputRef} {...rest} />;
      }
      
      //enhance 是一个高阶组件
      const EnhanceInput = enhance(FocusInput);
      
      // 在一个组件的render方法中...
      return (<EnhanceInput 
        inputRef={(input) => {
          this.input = input
        }
      }>)
      
      // 让FocusInput自动获取焦点
      this.input.focus();
      ```

###### 5. React.memo（v16.6新增）

类组件使用PureComponent或者shouldComponentUpdate能够优化props值不变时候的渲染性能(默认是shallowEqual)。现在， 你可以通过使用React.memo对function组件进行同样的优化。当然你也可以在方法的第二个参数自定义compare方法。**实际意义是：*函数式组件也有“shouldComponentUpdate”生命周期了***

```
const MyComponent = React.memo(function MyComponent(props) {
  /* 只在props更改的时候才会重新渲染 */
});

function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
function MyComponent(props) {
     /* render using props */
}
export default React.memo(MyComponent, areEqual);
```

###### 6. 关于为什么在react组件中this会丢失

类声明和类表达式的主体以 严格模式 执行，主要包括构造函数、静态方法和原型方法。Getter 和 setter 函数也在严格模式下执行。不是React的原因，这是JavaScript中本来就有的。如果你传递一个函数名给一个变量，然后通过在变量后加括号()来调用这个方法，此时方法内部的this的指向就会丢失.

箭头函数没有 this，所以需要通过查找作用域链来确定 this 的值。这就意味着如果箭头函数被非箭头函数包含，this 绑定的就是最近一层非箭头函数的 this。this 是有词法约束力的。这意味它可以使用封闭的函数上下文或者全局上下文作为 this 的值