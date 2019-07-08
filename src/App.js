import React from 'react';
import {Provider} from 'mobx-react';
import store from './store/index';
import HookDemo01 from './components/hooks/Demo01';
import ClassCom from './components/ClassCom';
import './App.scss';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <HookDemo01></HookDemo01>
        <ClassCom></ClassCom>
      </div>
    </Provider>
  );
}

export default App;
