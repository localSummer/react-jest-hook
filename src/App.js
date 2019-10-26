import React from 'react';
import {Provider} from 'mobx-react';
import store from './store/index';
import HookDemo01 from './components/hooks/Demo01';
import ClassCom from './components/ClassCom';
import {Counter} from './store/HookStore';
import NavList from './components/navList';
import NavItem from './components/navItem';
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Counter>
          <HookDemo01></HookDemo01>
          <ClassCom></ClassCom>
        </Counter>
        <NavList selectKey="1" secondKey="1">
          <NavItem activeKey="1" hrefs={
            [
              {
                href: '/a',
                content: '链接1'
              }
            ]
          }></NavItem>
          <NavItem activeKey="2" title="我是打开子选项的" hrefs={
            [
              {
                href: '/b',
                content: '链接2'
              },
              {
                href: '/c',
                content: '链接3'
              },
            ]
          }></NavItem>
        </NavList>
      </div>
    </Provider>
  );
}

export default App;
