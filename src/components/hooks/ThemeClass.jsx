import React from 'react';
import { inject, observer } from 'mobx-react'; 

@inject('store')
@observer
class ThemeClass extends React.Component {
  handleIncrement = () => {
    this.props.store.counterStore.increment();
  }
  handleDecrement = () => {
    this.props.store.counterStore.decrement();
  }
  render() {
    const {counterStore, themeStore} = this.props.store;
    return (
      <div>
        <p>mobx-react Provider</p>
        count: {counterStore.count}
        theme: {themeStore.theme}
        <button onClick={this.handleIncrement}>add</button>
        <button onClick={this.handleDecrement}>dec</button>
      </div>
    )
  }
}

export default ThemeClass;