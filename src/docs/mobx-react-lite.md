
## Hook 简介
> 官方原话：Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

随着 Hook API 的发布，使得函数式组件生态也逐渐丰富起来，Github 上基于 Hook 封装的组件库也不断增多。

今天就来说说 `[mobx-react-lite](https://github.com/mobxjs/mobx-react-lite)`，它是基于 `React 16.8` 和 `Hooks` 的 `MobX` 的轻量级React绑定。

这里通过 `mobx + mobx-react` 与 `mobx-react-lite + Context API` 两种使用方式对比说明

## mobx的使用

1. 创建 `store`
```javascript
// store.js
import {observable, action} from 'mobx';

class Store {
  @observable
  count = 0;

  @action
  handleCount() {
    this.count += 1;
  }
}

export default new Store();
```

2. 根组件通过 `Provider` 注入 `store`
```javascript
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CounterClass></CounterClass>
        <CounterFunction></CounterFunction>
      </div>
    </Provider>
  );
}

export default App;
```

3. 类组件（class）访问 `store`
```javascript
import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import {toJS} from 'mobx'; // 查看store中原始JavaScript数据结构

@inject('store')
@observer
class CounterClass extends Component {
  handleClick = () => {
    this.props.store.handleCount();
  };

  render() {
    console.log(toJS(this.props.store));
    return (
      <div>
        count: {this.props.store.count}
        <button onClick={this.handleClick}>add one</button>
      </div>
    )
  }
}

export default CounterClass;
```

4. 函数组件使用 `store`
```javascript
import React from 'react'
import {inject, observer} from 'mobx-react';

const CounterFunction = ({store}) => {
  return (
    <div>
      <p>you clicked {store.count} times</p>
      <button onClick={() => store.handleCount()}>Add</button>
    </div>
  );
}

export default inject('store')(observer(CounterFunction));
```

## mobx-react-lite 基于 Hook API 的使用

1. 创建 `Counter store` 组件
```javascript
// HookStore.js
import React, {createContext} from 'react';
import {useLocalStore, observer} from 'mobx-react-lite';

export const MyContext = createContext(null);

export const Counter = observer((props) => {
  const store = useLocalStore(() => (
    {
      count: 1,
      get getCount() {
        return store.count;
      },
      handleCount() {
        store.count += 2;
      }
    }
  ));
  return (
    <MyContext.Provider value={store}>
      {props.children}
    </MyContext.Provider>
  );
});
```

2. 使用 `Counter` 组件，子组件是class类组件时，通过 `MyContext.Consumer` 访问 `store`，函数组件通过 `useContext` Hook API 访问 `store`
```javascript
import React from 'react';
import {Counter} from './store/HookStore';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Counter>
        <HookDemo01></HookDemo01>
        <ClassCom></ClassCom>
      </Counter>
    </div>
  );
}

export default App;
```

3. 类组件（class）连接 `store`
```javascript
import React, { Component } from 'react';
import {Observer} from 'mobx-react-lite';
import {MyContext} from '../store/HookStore';
import {toJS} from 'mobx';

class CounterClass extends Component {
  render() {
    return (
      <div>
        <MyContext.Consumer>
          {
            store => {
              {/* 使用 Object.is 比较store是否发生变化，store的引用不变，导致不会重渲染，获取最新依赖值需使用 Observer 组件 */}
              console.log('store: ', toJS(store));
              return (
                <>
                  <p>counter2: {store.count}</p> {/* 这种方式在 class 组件中无效，不会引发重渲染 */}
                  <Observer>{() => <p>counter2: {store.count}</p>}</Observer> {/* 必须这样写，Observer 组件是mobx-react-lite提供的唯一可在类组件中使用的组件 */}
                  <button onClick={() => store.handleCount()}>Counter Add</button>
                </>
              )
            }
          }
        </MyContext.Consumer>
      </div>
    )
  }
}

export default CounterClass;
```

4. 函数组件连接 `store`
```javascript
import React, {useState, useEffect, useContext} from 'react'
import {Observer, observer} from 'mobx-react-lite';
import {MyContext} from '../../store/HookStore';

const CounterFunction = (props) => {
  const [num, setNum] = useState(10);
  const store = useContext(MyContext); // 当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值。

  useEffect(() => {
    console.log('num change', MyContext);
  }, [num]);

  return (
    <div>
      <p>num: {num}</p>
      <button onClick={() => setNum(num + 1)}>set num</button>

      {/* 深度监听 store 变化并进行重渲染，导致下面两行结果相同 */}
      <p>Count: {store.getCount}</p>
      <Observer>{() => <p>Count2: {store.getCount}</p>}</Observer>
      <button onClick={() => store.handleCount()}>Counter Add</button>
    </div>
  );
}

export default observer(CounterFunction);
```