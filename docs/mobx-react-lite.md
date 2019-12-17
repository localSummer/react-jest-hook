### mobx-react-lite 不完全指南

> `mobx-react-lite` 是 `mobx-react` 的轻量版，增加了对函数式组件 `hooks` 的支持

随着 `React Hooks` 的推出，让我们在不编写 class 的情况下使用 state 以及其他的 React 特性，现在项目中使用Hooks的函数式组件日益增多，而多个组件之间的状态管理变得日益复杂。

那么在多层级的函数式组件中如何维护好 `state` 呢？

#### React Hooks 自带的 useReducer 配合 Context 进行状态管理
使用过Redux的就会非常熟悉了，`useReducer` 可以看成Redux的简版，使用过程中需要通过 `Context` 将 `useReducer` 返回的 `state` `dispatch` 传递下去，子孙组件通过 `useContext` 获取到 `state` `dispatch`，通过 `dispatch` 修改状态，使得组件更新

这种方式针对一些没有复杂状态的层级组件 和 熟悉 Redux 的同学比较友好，而针对复杂的表单状态管理和大量异步操作的层级组件显得有点力不从心。

#### mobx-react-lite 配合 Context 进行状态管理
习惯 mobx 风格进行状态管理的开发者会更倾向于这一种，不管是复杂状态的管理还是异步操作都支持的很好。

下文主要结合 `mobx`、`mobx-react-lite`、`Context` 进行示例描述。（我要贴代码了）

1. 创建 `store`
``` javascript
// store/index.js
import { observable, action, computed } from 'mobx'

export class CounterStore {
  @observable
  count = 0

  @action
  increment() {
    this.count++
  }

  @action
  decrement() {
    this.count--
  }

  @computed
  get doubleCount() {
    return this.count * 2
  }
}

export class ThemeStore {
  @observable
  theme = 'light'

  @action
  setTheme(newTheme) {
    this.theme = newTheme
  }
}
```
这一步创建了两个 store 并导出

2. 创建 `Context` 
``` javascript
// contexts/index.js
import React from 'react';
import { CounterStore, ThemeStore } from '../store';

export const StoresContext = React.createContext({
  counterStore: new CounterStore(),
  themeStore: new ThemeStore()
})
```

创建 `StoresContext` 并导出，那么后代组件在 `useContext` 时便可以得到包含 `CounterStore` `ThemeStore` 实例的对象

3. 由于多组件都需要使用 `useContext`，我们将其封装为 `hook` 函数
``` javascript
// hooks/useStores.js
import React from 'react'
import { StoresContext } from '../contexts'

export const useStores = () => React.useContext(StoresContext)
```

通过 `useStores` 获取 `React.createContext` 给的初始值对象（前提是没有 `StoresContext.Provider` 组件，如果使用了该组件，则拿到的是 `StoresContext.Provider` 的 `value` 属性对应的值）

4. 后代组件获取 store 并调用 action 修改状态，使用 `mobx-react-lite` 更新组件
``` javascript
import React from 'react';
import { useStores } from '../../hooks/user-store';
import { useObserver } from 'mobx-react-lite';

const Counter = () => {
  let store = useStores(); // 获取store

  const {counterStore, themeStore} = store;

  const handleIncrement = () => {
    counterStore.increment();
  }
  const handleDecrement = () => {
    counterStore.decrement();
  }

  return useObserver(() => (
    <div>
      <p>count: {counterStore.count}</p>
      <p>theme: {themeStore.theme}</p>
      <button onClick={handleIncrement}>add</button>
      <button onClick={handleDecrement}>dec</button>
    </div>
  ))
}

export default Counter;
```

通过 useStores 获取state进行展示，调用 action 修改 store 状态，会被 useObserver 监听到，并更新组件

#### 总结
这里只用到 `mobx-react-lite` 中的 `useObserver` API，其他的常用 API 还有 `useLocalStore observer` 等，文档在 [mobx-react](https://mobx-react.js.org/)

[Using MobX with React Hooks and TypeScript](https://blog.mselee.com/posts/2019/06/08/using-mobx-with-react-hooks-typescript/)
这篇文章做了详细实例，其中使用了 `useLocalStore observer` 并配合 Typescript 做了优化