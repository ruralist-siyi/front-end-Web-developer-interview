### React-Hooks

#### 一、什么是Hook 

1. Hook是React v16.8（RN v0.59）新增的特性，是一个完全可选的（就是你可以暂时不用它，没啥毛病）,它100%向后兼容，无需担心会带来任何破坏性改动;
2. 更符合我们React的精髓-函数式编程，Hook可以再不编写class的情况下使用state以及其他的React特性；

#### 二、为什么要使用Hook（好处在哪里）

##### 1. 过去我们是如何解决React应用中的状态逻辑复用

- *Hoc* 

  接受React组件作为输入，输出一个新的React组件的组件。高阶组件和装饰器是一个模式，高阶组件可以当作装饰器使用。（更改props、劫持class的render内容等）

- *renderProps*

  1. 通过props.children 传递的一个接受props参数的渲染函数
  2. 通过正常的props传递一个render函数props

###### Hoc与renderProps带来的问题	

*复杂的组件设计会造成Hoc或者renderProps的嵌套过深，让代码变得难以理解；*

##### 2.  传统的生命周期带来的问题

- 同一生命周期函数中可能包含不相关的的逻辑，比如说在`componmentDidMount`中设置事件监听，而之后需要在`componmentWillunmount`中清除；相互关联且需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起。如此很容易产生 bug，并且导致逻辑不一致。
- 在多数情况下，不可能将组件拆分为更小的粒度，因为状态逻辑无处不在。这也给测试带来了一定挑战。同时，这也是很多人将 React 与状态管理库结合使用的原因之一。但是，这往往会引入了很多抽象概念，需要你在不同的文件之间来回切换，使得复用变得更加困难。

##### 3. class component带来的问题

- 现在我们日常开发中使用class component的频率是非常之高的，但是使用class component的成本是不低的。class 语法是我们ES6新增的一个语法糖，核心还是我们的原型（prototype），class语法实际上对于一些新手是不友好的， 更偏向于面向对象编程。并且我们在class component中还要去进行一些bind this的操作，而`this`又是前端较为难以理解的一个知识点。
- 目前项目中使用最多的还是class component与 function component 两种形式的组件，这两种组件的差异还是存在一定的分歧的，我们开发中时常还要考虑说为了某种功能以及特定的场景去区分使用这两种组件：`尽可能将单纯展示的view层抽出来使用function component形式`。（但是好多时候开发者并不能够很好的使用这两种形式，也可以说这样开发也挺心累）
- 在React官方文档上也指出 React 已经发布五年，希望在下一个五年也会与时俱进。现在很多其他的库带来了组件预编译的能力，class componment可能会让这种优化措施无效。并且 class 不能很好的压缩，且会使热重载出现不稳定的情况。

#### 三、常见的Hook有哪些

##### 1. useState

1. 目的

   就是通过useState这个方法让我们可以在函数式组件中也可以拥有以及操作组件内部的state，并且在组件reRender的情况下可以保留这个state。

2. 用法

   useState这个方法有一个参数就是定义的初始的state，方法的返回值是一个数组：包含当前的state以及更新state的方法（类似class component中的 setState({}) 但是不会把新旧state进行合并 ）；如果你要使用多个state，就多次调用useState方法就好了。（注意：通过useState获取的state每一次都是崭新的，不是来自于类似class component 中 挂载在this上的state）

```javascript
// class component example
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
  }
  
  render() {
    return (
    	<>
    	<div> count: {count} </div>
			<button onClick={ () => this.setState({count: count++}) }>Click ++</button>
    </>
    )
  }
}

// react hook example
const Example = () => {
  // 解构赋值
  const [count, setCount] = useState(0);
  
  return (
  	<>
    	<div> count: {count} </div>
			<button onClick={ () => setCount(count++) }>Click ++</button>
    </>
  )
}
```

##### 2. useEffect

1. 目的

   *Effect Hook* 可以让你在函数组件中执行副作用操作（向后台请求、事件监听操作、修改React组件中的Dom等），告诉 React 组件需要在渲染后执行某些操作。React 会保存你传递的函数（我们将它称之为 “effect”），并且在执行 DOM 更新之后调用它。你也可以把它的使用场景看作之前class component中的`componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount`。

2. 用法

   useEffect第一个参数为副作用方法，第二个参数为副作用的依赖项（依赖改变，副作用方法执行）。如果依赖项为空数组，则副作用方法只执行一次；而依赖项为空时，每次render都会触发副作用方法。（注意：与我们之前常使用的生命周期`componentDidMount`、`componentDidUpdate`不同，使用 `useEffect` 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，effect 不需要同步地执行。在个别情况下（例如测量布局），有单独的 `useLayoutEffect`Hook 供你使用，其 API 与 `useEffect` 相同。）如果你的 effect 返回一个函数，React 将会在执行清除操作时调用它。（比如说清除定时器，取消订阅等操作都可以通过此操作）（注意： 并不是你设置了依赖就一定依赖变了就会触发effect，依赖应该是我们effect内部需要的数据，最好是将effect依赖的数据都放在依赖项中；）

   ```javascript
   const Example = () => {
     const [data, setData] = useState(null);
     
     useEffect(() => {
       fetchData().then((res) => setData(res.data))
     }, [])
     
     return data;
   }
   ```

##### 3. useContext

1. 目的

   以前我们获取context对象，通过上层组件：class 组件中的 `static contextType = MyContext` 或者 `<MyContext.Consumer>`进行传递，子组件再读取。会存在只支持class组件亦或是嵌套层次过深的问题。`useContext`用起来就是一个字：爽；

2. 用法

   接收一个 context 对象（`React.createContext` 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` prop 决定。当组件上层最近的 `<MyContext.Provider>` 更新时，该 Hook 会触发重渲染，并使用最新传递给 `MyContext` provider 的 context `value` 值。（注意：调用了 `useContext` 的组件总会在 context 值变化时重新渲染。如果重渲染组件的开销较大，你可以 [通过使用 memoization 来优化](https://github.com/facebook/react/issues/15156#issuecomment-474590693)。）

```javascript
  const ExampleContext =  React.createContext(0);

  function App() {
    return (
      <ExampleContext.Provider value={count: 1}>
      <Child />
      </ExampleContext.Provider>
  );
  }

  function Child() {
    const exapmle = useContext(ExampleContext);

    return (
      <div>{exapmle.count}</div>
    )
  }
```

##### 4. useReducer

1. 目的

   为了适用于 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等情景，作为useState的替代方案。它接收一个形如 `(state, action) => newState` 的 reducer，并返回当前的 state 以及与其配套的 `dispatch` 方法。

2. 用法

   1. 第一个参数接收一个形如 `(state, action) => newState` 的 reducer，和redux中的reducer很相似，传入上一次的state和本次的action；
   2. 第二个参数指定初始的state；
   3. 第三个参数为惰性地创建初始 state。为此，需要将 `init` 函数作为 `useReducer` 的第三个参数传入，这样初始 state 将被设置为 `init(initialArg)`；

   ```javascript
   function init(initialCount) {
     return {count: initialCount};
   }
   
   function reducer(state, action) {
     switch (action.type) {
       case 'increment':
         return {count: state.count + 1};
       case 'decrement':
         return {count: state.count - 1};
       case 'reset':
         return init(action.payload);
       default:
         throw new Error();
     }
   }
   
   function Counter({initialCount}) {
     const [state, dispatch] = useReducer(reducer, initialCount, init);
     return (
       <>
         Count: {state.count}
         <button
           onClick={() => dispatch({type: 'reset', payload: initialCount})}>
   
           Reset
         </button>
         <button onClick={() => dispatch({type: 'decrement'})}>-</button>
         <button onClick={() => dispatch({type: 'increment'})}>+</button>
       </>
     );
   }
   
   ```

##### 5. useMemo

1. 目的

   `useMemo`返回一个memoized的值，有助于避免在每次渲染时都进行高开销的计算。。（React v16.6新增的`React.Memo`：可以参考：[一次性彻底弄懂组件（函数式组件、PureComponent、React.memo、高阶组件）](https://juejin.im/post/5d118039e51d4556db694a40)）

2. 用法

   把“创建”函数和依赖项数组作为参数传入 `useMemo`，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。（记住，传入 `useMemo` 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 `useEffect` 的适用范畴，而不是 `useMemo`。）

   ```javascript
   const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
   ```

   

##### 6. useCallback

1. 目的

   `useCallback`返回一个memoized的回调函数，当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 `shouldComponentUpdate`）的子组件时，它将非常有用。

2. 用法

   把内联回调函数及依赖项数组作为参数传入 `useCallback`，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`

   ```javascript
   const memoizedCallback = useCallback(
     () => {
       doSomething(a, b);
     },
     [a, b],
   );
   ```

##### 7. useRef

1. 目的

   获取Ref对象，其 `.current` 属性可以通过传入参数设置；而我们之前使用createRef方法，React 都会将 ref 对象的 `.current` 属性设置为相应的 DOM 节点。

2. 用法

   1. `useRef` 就像是可以在其 `.current` 属性中保存一个可变值的“盒子”。
   2. `useRef()` 和自建一个 `{current: ...}` 对象的唯一区别是，`useRef` 会在每次渲染时返回同一个 ref 对象。
   3. 当 ref 对象内容发生变化时，`useRef` 并*不会*通知你。变更 `.current` 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用[回调 ref](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node) 来实现。

   ```javascript
   function TextInputWithFocusButton() {
     const inputEl = useRef(null);
     const onButtonClick = () => {
       // `current` 指向已挂载到 DOM 上的文本输入元素
       inputEl.current.focus();
     };
     return (
       <>
         <input ref={inputEl} type="text" />
         <button onClick={onButtonClick}>Focus the input</button>
       </>
     );
   }
   ```

##### 8. useImperativeHandle

1. 目的

   `useImperativeHandle` 可以让你在使用 `ref` 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。`useImperativeHandle` 应当与 `forwardRef` 一起使用

2. 用法

   ```javascript
   // 在本例中，渲染 <FancyInput ref={fancyInputRef} /> 的父组件可以调用 fancyInputRef.current.focus()
   
   function FancyInput(props, ref) {
     const inputRef = useRef();
     useImperativeHandle(ref, () => ({
       focus: () => {
         inputRef.current.focus();
       }
     }));
     return <input ref={inputRef} ... />;
   }
   FancyInput = forwardRef(FancyInput);
   ```

##### 9. useLayoutEffect

其函数签名与 `useEffect` 相同，但它会在所有的 DOM 变更之后同步调用 effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，`useLayoutEffect` 内部的更新计划将被同步刷新。尽可能使用标准的 `useEffect` 以避免阻塞视觉更新。

##### 10. useDebugValue

`useDebugValue` 可用于在 React 开发者工具中显示自定义 hook 的标签。(几乎不用，详细可见官方文档)

#### 四、原理解析

##### 为什么只在顶层使用Hook,不要在循环，条件或嵌套函数中调用 Hook ?

​	这和react hook的原理有关：**React hook是通过Array实现的**。如下代码所示，如果我们在hook中使用条件语句，hook渲染的顺序就可能与之前渲染的不相同，我们是根据cursor对应的数据就会错乱，也就是我们找不到应该处理的数据了。

```javascript
// 所有的state都存储在这个states数组中；
const states = [];
// 根据useState方法次数的调用，将根据cursor这个指针设置states这个数组对应下标的值；
const cursor = 0;

function useState(initialState) {
  const currentCursor = cursor; // 将当前的cursor值用变量保存下来
  states[currentCursor] = initialState; // 把此次调用初始的state根据当前的cursor存入states对应的位置
  
  // 改变State的方法
  function setState(newState) {
    states[currentCursor] = newState;
    render();
  }
  
  ++cursor; // useState每调用一次cursor自增一次
  
  return [states[currentCursor], setState];
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
  cursor = 0; // 重置cursor
}
```

#### 五、使用React Hooks进行状态管理















