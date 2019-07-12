## React Router Config 简介

React Router Config 是 React Router 的一个辅助工具，主要帮你做集中配置式路由

什么是配置式路由呢，如下
```javascript
import App from '../App';
import Child from '../components/route-static/Child';
import GrandChild from '../components/route-static/GrandChild';

const routes = [
  {
    path: "/",
    exact: true,
    component: App
  },
  {
    path: "/child/:id",
    component: Child,
    routes: [
      {
        path: "/child/:id/grand-child",
        component: GrandChild
      }
    ]
  }
];

export default routes;

```

其类似 vue-router 的用法

## 配置路由并使用
1. 路由配置文件
``` javascript
import App from '../App';
import Child from '../components/route-static/Child';
import GrandChild from '../components/route-static/GrandChild';

const routes = [
  {
    path: "/",
    exact: true,
    component: App
  },
  {
    path: "/child/:id",
    component: Child,
    routes: [
      {
        path: "/child/:id/grand-child",
        component: GrandChild
      }
    ]
  }
];

export default routes;

```

2. Root 根组件
```javascript
import React from 'react';
import {renderRoutes} from 'react-router-config';
import {HashRouter as Router} from 'react-router-dom';
import routes from './routes/index'; // 导入路由配置文件

const Root = (props) => {
  console.log('props: ', props);
  /* 
  
    props: {
      history: ...,
      location: ...,
      match: ...,
      route: ...,
      staticContext: ...,
      其他自定义传入的属性: ...
    }
  
  */
  return (
    <Router>
      <div>
        <h1>Root</h1>
        {/* child routes won't render without this */}
        {/* 渲染匹配路径的路由组件 */}
        {renderRoutes(routes)}
      </div>
    </Router>
  );
};

export default Root;
```

3. Child 组件
```javascript
import React from 'react';
import routes from '../../routes/index'; // 只做 matchRoutes API 演示使用
import {renderRoutes, matchRoutes} from 'react-router-config';

const Child = (props) => {
  console.log('props: ', props);

  /* 
    matchRoutes 查找匹配的路由，返回一个匹配的数组
    [
      {
        match: ...,
        route: ...
      },
      ...
    ]
  */
  console.log('matchRoutes', matchRoutes(routes, "/child/23"));
  return (
    <div>
      <h2>Child</h2>
      {/* child routes won't render without this */}
      {/* 渲染当前路由下的子路由所对应的组件，第二个参数是给子路由传入的额外自定义的参数 */}
      {renderRoutes(props.route.routes, { someProp: "these extra props are optional" })}
    </div>
  );
};

export default Child;
```

4. GrandChild 组件
```javascript
import React from 'react';
// import {renderRoutes} from 'react-router-config'; 当前路由下没有子路由了，无需再使用 renderRoutes

const GrandChild = (props) => {
  console.log('props: ', props);
  return (
    <div>
      <h3>Grand Child</h3>
      {/* 拿到父路由组件传入的自定义属性 */}
      <div>{props.someProp}</div>
    </div>
  );
};

export default GrandChild;
```