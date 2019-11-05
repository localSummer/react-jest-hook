import React from 'react';
// import {Provider} from 'mobx-react';
// import store from './store/index';
/* import HookDemo01 from './components/hooks/Demo01';
import ClassCom from './components/ClassCom';
import {Counter} from './store/HookStore'; */
import { Counter } from './components/hooks/CounterTrigger';
import { ThemeToggler } from './components/hooks/ThemeToggler';
import CounterClass from './components/hooks/CounterClass';
import './App.scss';

function App() {
  return (
    <div className="App">
      {/* <Counter>
        <HookDemo01></HookDemo01>
        <ClassCom></ClassCom>
      </Counter> */}
      <Counter />
      <ThemeToggler />
      <CounterClass />
    </div>
  );
}

export default App;
