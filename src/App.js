import React from 'react';
import {Provider} from 'mobx-react';
import store from './store/index';
import HookDemo01 from './components/hooks/Demo01';
import ClassCom from './components/ClassCom';
import {Counter} from './store/HookStore';
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Counter>
          <HookDemo01></HookDemo01>
          <ClassCom></ClassCom>
        </Counter>
      </div>
    </Provider>
  );
}

export default App;
