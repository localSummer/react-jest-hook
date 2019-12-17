import React from 'react';
import { Counter } from './components/hooks/CounterTrigger';
import { ThemeToggler } from './components/hooks/ThemeToggler';
import CounterClass from './components/hooks/CounterClass';
import ThemeClass from './components/hooks/ThemeClass';
import TestUsePrevious from './components/hooks/TestUsePrevious';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Counter />
      <ThemeToggler />
      <CounterClass />
      
      {/* 使用mobx-react-lite */}
      <ThemeClass/>

      <TestUsePrevious/>
    </div>
  );
}

export default App;
