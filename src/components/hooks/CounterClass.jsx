import React from 'react';
import { observer } from 'mobx-react';
import { StoresContext } from '../../contexts';

@observer
class CounterClass extends React.Component {
  static contextType = StoresContext;
  handleIncrement = () => {
    this.context.counterStore.increment();
  }
  handleDecrement = () => {
    this.context.counterStore.decrement();
  }
  render() {
    return (
      <div>
        count: {this.context.counterStore.count}
        theme: {this.context.themeStore.theme}
        <button onClick={this.handleIncrement}>add</button>
        <button onClick={this.handleDecrement}>dec</button>
      </div>
    )
  }
}

export default CounterClass;
